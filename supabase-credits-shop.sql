-- ══════════════════════════════════════════════════════════════════════════
--  Referral CREDITS + chapter SHOP + anti-tamper hardening
--  Run this in the Supabase SQL editor. Idempotent: re-running changes nothing.
--
--  Supersedes supabase-referral-rewards.sql (never run; deleted). The tier
--  ladder it described is replaced by credits.
--
--  ─────────────────────────────────────────────────────────────────────────
--  PART 0 IS A LIVE SECURITY FIX AND IS THE MOST IMPORTANT THING IN THIS FILE.
--  Read it before anything else. It is not about credits.
--  ─────────────────────────────────────────────────────────────────────────
--
--  THE MODEL
--    · A referral pays the referrer credits ONLY once the referred family's
--      child has actually answered a practice question. That is the anti-abuse
--      rule: creating a shell account is cheap, sitting a child in front of it
--      is not. It is not airtight — nothing client-triggered can be — but the
--      award is computed entirely in the database from the student's own
--      session token, so a browser cannot claim it for an account it does not
--      hold.
--    · Credits buy 30-day chapter unlocks. Prices are admin-configured.
--    · A purchased chapter stays live for its full window EVEN IF THE ACCOUNT
--      EXPIRES. An expired account can still sign in; it just gets nothing but
--      its still-live purchases.
--
--  WHERE THE ENFORCEMENT ACTUALLY IS
--    Credits and entitlements are never trusted from the browser:
--      · credit_ledger / chapter_entitlements / security_events have NO
--        insert, update or delete grant to anon or authenticated. Not a policy
--        that could be mis-set — no grant at all. Only SECURITY DEFINER
--        functions and the service role can write them.
--      · The only way to spend is purchase_chapter(), which re-reads the price
--        from mm_data server-side and moves the balance under a row lock.
--      · What a child may actually DOWNLOAD is decided in
--        netlify/functions/questions.js with the service role. A devtools edit
--        can unlock a button; it cannot make the server send the questions.
-- ══════════════════════════════════════════════════════════════════════════


-- ══════════════════════════════════════════════════════════════════════════
--  PART 0 — Close the self-service privilege escalation on profiles/students
--
--  ⚠ THIS IS A PRE-EXISTING HOLE, not something the shop introduced.
--
--  public.profiles has a table-wide UPDATE grant to anon/authenticated, and
--  policy profiles_update allows `id = auth.uid()` with no column restriction.
--  So today, any signed-in parent can open devtools and run
--
--      _sb.from('profiles').update({ role: 'admin' }).eq('id', <their own id>)
--
--  and is_admin() — which reads exactly that column — then returns true for
--  them everywhere, including the admin panel and every is_admin() policy in
--  the schema. The same statement can clear their own `expires_at` or
--  `disabled`. public.students is the same shape: policy students_parent is FOR
--  ALL over a parent's own children with no column restriction, so a parent can
--  clear a child's `expires_at`.
--
--  Adding a credits column to profiles without fixing this would have made
--  credits mintable in one line, so the fix is a prerequisite, not a nicety.
--
--  The fix is a BEFORE UPDATE trigger that reverts privileged columns unless
--  the caller is already an admin. Two things make it safe:
--    · In a BEFORE UPDATE trigger the row is not written yet, so is_admin()
--      reading profiles sees the OLD value — someone setting role='admin' in
--      the same statement cannot bootstrap themselves past this check.
--    · SECURITY DEFINER functions below set a session flag before their own
--      writes, so the legitimate paths (awarding credits, spending them) still
--      work while a direct PostgREST update does not.
-- ══════════════════════════════════════════════════════════════════════════

-- Set by the SECURITY DEFINER functions in this file around their own writes.
-- A PostgREST client cannot set it: `set_config` is not reachable through the
-- REST API, and these functions never take it as an argument.
create or replace function public.priv_write_allowed()
returns boolean
language sql
stable
set search_path = public, pg_temp
as $$
  select coalesce(current_setting('psac.priv_write', true), '') = 'on';
$$;

create or replace function public.guard_profiles_privileged()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
DECLARE v_tampered text[] := '{}';
BEGIN
  IF public.is_admin() OR public.priv_write_allowed() THEN
    RETURN NEW;
  END IF;

  -- ⚠ Record WHAT was attempted before reverting it. Comparing NEW to OLD after
  -- the assignments below can only ever be false, which would make the security
  -- log permanently empty.
  IF NEW.role           IS DISTINCT FROM OLD.role           THEN v_tampered := array_append(v_tampered, 'role'); END IF;
  IF NEW.is_super_admin IS DISTINCT FROM OLD.is_super_admin THEN v_tampered := array_append(v_tampered, 'is_super_admin'); END IF;
  IF NEW.credits        IS DISTINCT FROM OLD.credits        THEN v_tampered := array_append(v_tampered, 'credits'); END IF;
  IF NEW.expires_at     IS DISTINCT FROM OLD.expires_at     THEN v_tampered := array_append(v_tampered, 'expires_at'); END IF;
  IF NEW.disabled       IS DISTINCT FROM OLD.disabled       THEN v_tampered := array_append(v_tampered, 'disabled'); END IF;
  IF NEW.blocked_until  IS DISTINCT FROM OLD.blocked_until  THEN v_tampered := array_append(v_tampered, 'blocked_until'); END IF;
  IF NEW.referral_code  IS DISTINCT FROM OLD.referral_code  THEN v_tampered := array_append(v_tampered, 'referral_code'); END IF;

  -- Silently reverted rather than raised: the app updates whole rows in places,
  -- and erroring on an UNCHANGED privileged column would break ordinary saves.
  NEW.role           := OLD.role;
  NEW.is_super_admin := OLD.is_super_admin;
  NEW.disabled       := OLD.disabled;
  NEW.expires_at     := OLD.expires_at;
  NEW.referral_code  := OLD.referral_code;
  NEW.credits        := OLD.credits;
  NEW.blocked_until  := OLD.blocked_until;

  -- ⚠ teacher_status / teacher_tier / teacher_decided_* are deliberately NOT in
  -- that list. request_teacher_access() is SECURITY DEFINER but runs for a
  -- non-admin applicant, so guarding those columns would silently break every
  -- teacher application. They are also inert on their own: is_approved_teacher()
  -- requires role='teacher' AND teacher_status='approved', and `role` is
  -- guarded above — so setting the status by hand grants nothing.
  -- deleted_at is likewise left alone: delete_my_account() and
  -- restore_my_account() are the owner's own to use.

  IF array_length(v_tampered, 1) > 0 THEN
    INSERT INTO public.security_events (user_id, kind, detail)
    VALUES (OLD.id, 'privileged_update_blocked',
            jsonb_build_object('table', 'profiles', 'columns', to_jsonb(v_tampered)));
  END IF;

  RETURN NEW;
END;
$$;

create or replace function public.guard_students_privileged()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
BEGIN
  IF public.is_admin() OR public.priv_write_allowed() THEN
    RETURN NEW;
  END IF;

  IF NEW.expires_at IS DISTINCT FROM OLD.expires_at THEN
    INSERT INTO public.security_events (user_id, student_id, kind, detail)
    VALUES (auth.uid(), OLD.id, 'privileged_update_blocked',
            jsonb_build_object('table', 'students', 'columns', jsonb_build_array('expires_at')));
  END IF;

  -- Expiry is an entitlement control now, so a parent clearing it on their own
  -- child would be granting themselves access.
  NEW.expires_at := OLD.expires_at;

  -- ⚠ session_version is deliberately NOT guarded. verify_student_pin() bumps it
  -- on every login and runs for an anon caller with no admin rights, so guarding
  -- it would freeze the account-sharing guard at its first value. It is not an
  -- entitlement control either — the worst a parent can do by writing it is log
  -- their own child out.
  RETURN NEW;
END;
$$;


-- ══════════════════════════════════════════════════════════════════════════
--  PART 1 — Columns
-- ══════════════════════════════════════════════════════════════════════════

-- profiles has a TABLE-WIDE select grant, so new columns here inherit it.
-- (Contrast public.students, whose grants are per column — see CLAUDE.md.
-- Nothing in this file adds a column to students, deliberately.)
alter table public.profiles add column if not exists credits integer not null default 0;
alter table public.profiles add column if not exists blocked_until timestamptz;

alter table public.referrals add column if not exists activated_at timestamptz;
alter table public.referrals add column if not exists credits_awarded integer not null default 0;

-- A negative balance should be impossible by construction, not just by the
-- code path that spends. If this constraint ever fires, something wrote the
-- column that should not have.
do $c$ begin
  alter table public.profiles add constraint profiles_credits_nonneg check (credits >= 0);
exception when duplicate_object then null; end $c$;


-- ══════════════════════════════════════════════════════════════════════════
--  PART 2 — Tables
-- ══════════════════════════════════════════════════════════════════════════

-- Append-only audit trail. profiles.credits is the working balance; this is
-- what explains it. balance_after is stored so a disputed balance can be
-- reconstructed without replaying arithmetic.
create table if not exists public.credit_ledger (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  delta         integer not null,
  balance_after integer not null,
  reason        text not null,
  ref_id        uuid,
  created_at    timestamptz not null default now()
);
create index if not exists credit_ledger_user_idx on public.credit_ledger (user_id, created_at desc);

create table if not exists public.chapter_entitlements (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  chapter_id    text not null,
  source        text not null default 'credits',
  credits_spent integer not null default 0,
  granted_at    timestamptz not null default now(),
  expires_at    timestamptz not null
);
-- One row per (user, chapter): buying again EXTENDS the window rather than
-- stacking rows, so "is this chapter live" is a single-row question for the
-- questions function on every request.
create unique index if not exists chapter_entitlements_user_chapter_key
  on public.chapter_entitlements (user_id, chapter_id);
create index if not exists chapter_entitlements_live_idx
  on public.chapter_entitlements (user_id, expires_at);

create table if not exists public.security_events (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid,
  student_id uuid,
  kind       text not null,
  detail     jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists security_events_user_idx on public.security_events (user_id, created_at desc);
create index if not exists security_events_kind_idx on public.security_events (kind, created_at desc);

alter table public.credit_ledger         enable row level security;
alter table public.chapter_entitlements  enable row level security;
alter table public.security_events       enable row level security;

drop policy if exists credit_ledger_select_own on public.credit_ledger;
create policy credit_ledger_select_own on public.credit_ledger for select to public
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists chapter_entitlements_select_own on public.chapter_entitlements;
create policy chapter_entitlements_select_own on public.chapter_entitlements for select to public
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists security_events_select_admin on public.security_events;
create policy security_events_select_admin on public.security_events for select to public
  using (public.is_admin());

-- ⚠ SELECT only. There is deliberately NO insert/update/delete grant on any of
-- these three tables for anon or authenticated. That is stronger than an RLS
-- policy: with no grant, PostgREST rejects the write before a policy is even
-- consulted, so a mistake in a policy later cannot open a hole here. Every
-- legitimate write goes through a SECURITY DEFINER function below, which runs
-- as the owner and is not subject to these grants.
revoke all on public.credit_ledger        from anon, authenticated;
revoke all on public.chapter_entitlements from anon, authenticated;
revoke all on public.security_events      from anon, authenticated;
grant select on public.credit_ledger        to anon, authenticated;
grant select on public.chapter_entitlements to anon, authenticated;
grant select on public.security_events      to authenticated;

-- Triggers last: security_events must exist before guard_profiles_privileged
-- can insert into it.
drop trigger if exists trg_guard_profiles_privileged on public.profiles;
create trigger trg_guard_profiles_privileged
  before update on public.profiles
  for each row execute function public.guard_profiles_privileged();

drop trigger if exists trg_guard_students_privileged on public.students;
create trigger trg_guard_students_privileged
  before update on public.students
  for each row execute function public.guard_students_privileged();


-- ══════════════════════════════════════════════════════════════════════════
--  PART 3 — Settings helper
--
--  Shop settings live in mm_data under 'shop_settings' (admin-writable only,
--  world-readable — same shape as global_settings). Reading them HERE rather
--  than taking a price from the caller is the whole point: the browser never
--  gets to say what something costs.
-- ══════════════════════════════════════════════════════════════════════════

create or replace function public.shop_settings()
returns jsonb
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce((select value from public.mm_data where key = 'shop_settings'), '{}'::jsonb);
$$;

create or replace function public.shop_subject_price(p_subject_id text)
returns integer
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
DECLARE v jsonb := public.shop_settings(); v_price integer;
BEGIN
  v_price := nullif(v -> 'subject_prices' ->> p_subject_id, '')::integer;
  IF v_price IS NULL THEN
    v_price := nullif(v ->> 'default_subject_price', '')::integer;
  END IF;
  RETURN coalesce(v_price, 1500);
END;
$$;

create or replace function public.shop_chapter_price(p_chapter_id text)
returns integer
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
DECLARE v jsonb := public.shop_settings(); v_price integer;
BEGIN
  v_price := nullif(v -> 'chapter_prices' ->> p_chapter_id, '')::integer;
  IF v_price IS NULL THEN
    v_price := nullif(v ->> 'default_chapter_price', '')::integer;
  END IF;
  RETURN coalesce(v_price, 250);
END;
$$;


-- ══════════════════════════════════════════════════════════════════════════
--  PART 4 — Earning: the referral activation
-- ══════════════════════════════════════════════════════════════════════════

-- Called by a signed-in STUDENT after they answer a practice question.
--
-- Identity comes from current_student_id(), i.e. the opaque session token, and
-- never from an argument — so this can only ever activate the caller's own
-- family's referral. There is nothing to point at somebody else.
--
-- Idempotent and cheap to call repeatedly: after the first success the
-- referral row has activated_at set and every later call short-circuits.
create or replace function public.record_student_activity()
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
DECLARE
  v_student  uuid := public.current_student_id();
  v_parent   uuid;
  v_ref      record;
  v_cfg      jsonb := public.shop_settings();
  v_credits  integer;
  v_bal      integer;
  v_burst    integer;
  v_age_min  integer;
  v_cap      integer;
  v_done     integer;
  v_created  timestamptz;
BEGIN
  IF v_student IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_student_session');
  END IF;

  -- Master switch. Turning earning off does not touch anybody's balance or any
  -- chapter they already bought — it only stops new credits being minted.
  IF coalesce((v_cfg ->> 'referral_earning_enabled')::boolean, true) IS NOT TRUE THEN
    RETURN jsonb_build_object('ok', true, 'awarded', 0, 'note', 'earning_disabled');
  END IF;

  SELECT f.parent_id INTO v_parent
  FROM public.students s
  JOIN public.families f ON f.id = s.family_id
  WHERE s.id = v_student;

  IF v_parent IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_family');
  END IF;

  -- FOR UPDATE so two devices answering at the same moment cannot both award.
  SELECT * INTO v_ref FROM public.referrals
   WHERE referred_id = v_parent AND activated_at IS NULL
   FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', true, 'awarded', 0, 'note', 'nothing_pending');
  END IF;

  -- Minimum account age. The cheapest farm is: make an account, answer one
  -- question, collect, repeat. Requiring the referred account to have existed
  -- for a while makes that take real time instead of a minute.
  -- ⚠ activated_at is deliberately NOT set here — the referral stays pending so
  -- the next question the child answers, after the wait, still pays out.
  v_age_min := coalesce(nullif(v_cfg ->> 'min_account_age_minutes', '')::integer, 0);
  IF v_age_min > 0 THEN
    SELECT created_at INTO v_created FROM public.profiles WHERE id = v_parent;
    IF v_created IS NOT NULL AND v_created > now() - make_interval(mins => v_age_min) THEN
      RETURN jsonb_build_object('ok', true, 'awarded', 0, 'note', 'account_too_new');
    END IF;
  END IF;

  v_credits := coalesce(nullif(v_cfg ->> 'referral_credits', '')::integer, 15);

  -- Lifetime cap per referrer. 0 (the default) means no cap. Over the cap the
  -- referral IS marked activated, with zero credits: leaving it pending would
  -- make every future question the child answers re-run this check for ever.
  v_cap := coalesce(nullif(v_cfg ->> 'max_credited_referrals', '')::integer, 0);
  IF v_cap > 0 THEN
    SELECT count(*) INTO v_done FROM public.referrals
     WHERE referrer_id = v_ref.referrer_id AND credits_awarded > 0;
    IF v_done >= v_cap THEN
      UPDATE public.referrals SET activated_at = now(), credits_awarded = 0 WHERE id = v_ref.id;
      INSERT INTO public.security_events (user_id, student_id, kind, detail)
      VALUES (v_ref.referrer_id, v_student, 'referral_cap_reached',
              jsonb_build_object('cap', v_cap, 'credited', v_done));
      RETURN jsonb_build_object('ok', true, 'awarded', 0, 'note', 'referrer_cap_reached');
    END IF;
  END IF;

  UPDATE public.referrals
     SET activated_at = now(), credits_awarded = v_credits, status = 'joined'
   WHERE id = v_ref.id;

  PERFORM set_config('psac.priv_write', 'on', true);
  UPDATE public.profiles SET credits = credits + v_credits
   WHERE id = v_ref.referrer_id
   RETURNING credits INTO v_bal;
  PERFORM set_config('psac.priv_write', 'off', true);

  INSERT INTO public.credit_ledger (user_id, delta, balance_after, reason, ref_id)
  VALUES (v_ref.referrer_id, v_credits, coalesce(v_bal, 0), 'referral_activated', v_ref.id);

  -- Not a block, a flag. A genuinely popular referrer looks exactly like a
  -- farm for the first few hours, and locking one out would be worse than
  -- reviewing them. An administrator sees this in the security log.
  SELECT count(*) INTO v_burst FROM public.referrals
   WHERE referrer_id = v_ref.referrer_id AND activated_at > now() - interval '1 hour';
  IF v_burst > coalesce(nullif(v_cfg ->> 'activation_burst_limit', '')::integer, 8) THEN
    INSERT INTO public.security_events (user_id, student_id, kind, detail)
    VALUES (v_ref.referrer_id, v_student, 'referral_burst',
            jsonb_build_object('activations_last_hour', v_burst));
  END IF;

  RETURN jsonb_build_object('ok', true, 'awarded', v_credits);
END;
$$;


-- The invite list has to distinguish "joined" from "earned you credits", or a
-- parent with three sign-ups and no credits has no idea why. Adding a column
-- changes the return type, which CREATE OR REPLACE cannot do — hence the drop.
drop function if exists public.my_referrals();
create function public.my_referrals()
returns table (referred_name text, status text, created_at timestamptz,
               activated_at timestamptz, credits_awarded integer)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select p.full_name, r.status, r.created_at, r.activated_at, r.credits_awarded
  from public.referrals r
  join public.profiles p on p.id = r.referred_id
  where r.referrer_id = auth.uid()
  order by r.created_at desc;
$$;
revoke all on function public.my_referrals() from public;
grant execute on function public.my_referrals() to authenticated;


-- ══════════════════════════════════════════════════════════════════════════
--  PART 5 — Spending: the shop
-- ══════════════════════════════════════════════════════════════════════════

create or replace function public.my_credits()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  RETURN jsonb_build_object(
    'ok', true,
    'balance',   coalesce((SELECT credits FROM public.profiles WHERE id = v_uid), 0),
    'earned',    coalesce((SELECT sum(delta) FROM public.credit_ledger WHERE user_id = v_uid AND delta > 0), 0),
    'spent',     coalesce((SELECT -sum(delta) FROM public.credit_ledger WHERE user_id = v_uid AND delta < 0), 0),
    'referred',  (SELECT count(*) FROM public.referrals WHERE referrer_id = v_uid),
    'activated', (SELECT count(*) FROM public.referrals WHERE referrer_id = v_uid AND activated_at IS NOT NULL),
    'blocked_until', (SELECT blocked_until FROM public.profiles WHERE id = v_uid)
  );
END;
$$;

create or replace function public.my_credit_ledger(p_limit integer default 30)
returns table (delta integer, balance_after integer, reason text, created_at timestamptz)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select l.delta, l.balance_after, l.reason, l.created_at
  from public.credit_ledger l
  where l.user_id = auth.uid()
  order by l.created_at desc
  limit greatest(1, least(coalesce(p_limit, 30), 200));
$$;

create or replace function public.my_entitlements()
returns table (chapter_id text, expires_at timestamptz, source text)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select e.chapter_id, e.expires_at, e.source
  from public.chapter_entitlements e
  where e.user_id = auth.uid() and e.expires_at > now()
  order by e.expires_at desc;
$$;

-- The child's side of the same question. A student is not a Supabase Auth user
-- and cannot read their parent's rows, so identity comes from the session token
-- and the answer is only ever a list of chapter ids — nothing about money.
create or replace function public.family_entitlements()
returns table (chapter_id text, expires_at timestamptz)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select e.chapter_id, e.expires_at
  from public.chapter_entitlements e
  where e.expires_at > now()
    and e.user_id = (
      select f.parent_id
      from public.students s join public.families f on f.id = s.family_id
      where s.id = public.current_student_id()
    )
  order by e.expires_at desc;
$$;

-- The ONLY way credits are ever spent.
--
-- Everything that decides the outcome is read here, server-side: the price, the
-- balance, the window length. The caller supplies one thing — which chapter —
-- and even that is checked against the admin-published catalogue when one
-- exists. The profile row is locked for the whole transaction so two tabs
-- cannot spend the same credits twice.
create or replace function public.purchase_chapter(p_chapter_id text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
DECLARE
  v_uid      uuid := auth.uid();
  v_cfg      jsonb := public.shop_settings();
  v_price    integer;
  v_days     integer;
  v_bal      integer;
  v_blocked  timestamptz;
  v_from     timestamptz;
  v_new_exp  timestamptz;
  v_fails    integer;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF coalesce((v_cfg ->> 'shop_enabled')::boolean, true) IS NOT TRUE THEN
    RETURN jsonb_build_object('ok', false, 'error', 'shop_closed');
  END IF;

  -- Shape check first: this string becomes a row a Lambda later compares
  -- chapter ids against, so it must not be arbitrary text.
  IF p_chapter_id IS NULL OR p_chapter_id !~ '^[A-Za-z0-9][A-Za-z0-9_-]{1,63}$' THEN
    INSERT INTO public.security_events (user_id, kind, detail)
    VALUES (v_uid, 'purchase_bad_chapter_id', jsonb_build_object('value', left(coalesce(p_chapter_id, ''), 80)));
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_chapter');
  END IF;

  -- When the admin has published a catalogue, membership of it is required.
  -- Before that the shape check alone stands, so the shop works out of the box.
  IF jsonb_typeof(v_cfg -> 'catalog') = 'array'
     AND jsonb_array_length(v_cfg -> 'catalog') > 0
     AND NOT EXISTS (
       SELECT 1 FROM jsonb_array_elements(v_cfg -> 'catalog') c
       WHERE c ->> 'id' = p_chapter_id
     ) THEN
    INSERT INTO public.security_events (user_id, kind, detail)
    VALUES (v_uid, 'purchase_off_catalog', jsonb_build_object('chapter', p_chapter_id));
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_chapter');
  END IF;

  SELECT credits, blocked_until INTO v_bal, v_blocked
    FROM public.profiles WHERE id = v_uid FOR UPDATE;

  IF v_blocked IS NOT NULL AND v_blocked > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_blocked', 'until', v_blocked);
  END IF;

  v_price := public.shop_chapter_price(p_chapter_id);
  v_days  := coalesce(nullif(v_cfg ->> 'entitlement_days', '')::integer, 30);

  IF coalesce(v_bal, 0) < v_price THEN
    -- One failed purchase is a person mis-reading a price. A run of them is
    -- somebody probing, so it is worth a look — but never an auto-block, or a
    -- confused parent tapping Buy repeatedly would lock themselves out.
    INSERT INTO public.security_events (user_id, kind, detail)
    VALUES (v_uid, 'purchase_insufficient', jsonb_build_object('chapter', p_chapter_id, 'price', v_price, 'balance', coalesce(v_bal, 0)));
    SELECT count(*) INTO v_fails FROM public.security_events
     WHERE user_id = v_uid AND kind = 'purchase_insufficient' AND created_at > now() - interval '10 minutes';
    RETURN jsonb_build_object('ok', false, 'error', 'insufficient_credits',
                              'price', v_price, 'balance', coalesce(v_bal, 0), 'attempts', v_fails);
  END IF;

  -- Buying a chapter you already hold EXTENDS it from its current expiry, so
  -- nobody loses days by renewing early.
  SELECT expires_at INTO v_from FROM public.chapter_entitlements
   WHERE user_id = v_uid AND chapter_id = p_chapter_id;
  v_new_exp := greatest(coalesce(v_from, now()), now()) + make_interval(days => v_days);

  INSERT INTO public.chapter_entitlements (user_id, chapter_id, source, credits_spent, expires_at)
  VALUES (v_uid, p_chapter_id, 'credits', v_price, v_new_exp)
  -- ⚠ The existing row is referenced by the BARE table name in ON CONFLICT DO
  -- UPDATE — `public.chapter_entitlements.credits_spent` is not accepted there.
  ON CONFLICT (user_id, chapter_id) DO UPDATE
    SET expires_at    = excluded.expires_at,
        credits_spent = chapter_entitlements.credits_spent + excluded.credits_spent,
        granted_at    = now();

  PERFORM set_config('psac.priv_write', 'on', true);
  UPDATE public.profiles SET credits = credits - v_price WHERE id = v_uid RETURNING credits INTO v_bal;
  PERFORM set_config('psac.priv_write', 'off', true);

  INSERT INTO public.credit_ledger (user_id, delta, balance_after, reason)
  VALUES (v_uid, -v_price, v_bal, 'chapter:' || p_chapter_id);

  RETURN jsonb_build_object('ok', true, 'balance', v_bal, 'price', v_price,
                            'chapter', p_chapter_id, 'expires_at', v_new_exp);
END;
$$;


-- Buy a WHOLE SUBJECT in one go.
--
-- There is no second entitlement mechanism for this: it grants an ordinary
-- chapter_entitlements row for every chapter of that subject, so
-- netlify/functions/questions.js needs no change and "is this chapter live" is
-- still one row lookup. One ledger entry records the subject price.
--
-- ⚠ Unlike a chapter purchase, this REQUIRES the admin to have published the
-- catalogue: the database has no other way to know which chapters belong to a
-- subject (they live in the JS manifests). Without it there is nothing to grant,
-- so it refuses rather than taking credits for nothing.
create or replace function public.purchase_subject(p_subject_id text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
DECLARE
  v_uid     uuid := auth.uid();
  v_cfg     jsonb := public.shop_settings();
  v_price   integer;
  v_days    integer;
  v_bal     integer;
  v_blocked timestamptz;
  v_new_exp timestamptz;
  v_from    timestamptz;
  v_count   integer := 0;
  r         record;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF coalesce((v_cfg ->> 'shop_enabled')::boolean, true) IS NOT TRUE THEN
    RETURN jsonb_build_object('ok', false, 'error', 'shop_closed');
  END IF;

  IF p_subject_id IS NULL OR p_subject_id !~ '^[A-Za-z0-9][A-Za-z0-9_-]{1,63}$' THEN
    INSERT INTO public.security_events (user_id, kind, detail)
    VALUES (v_uid, 'purchase_bad_subject_id', jsonb_build_object('value', left(coalesce(p_subject_id, ''), 80)));
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_subject');
  END IF;

  IF jsonb_typeof(v_cfg -> 'catalog') <> 'array'
     OR jsonb_array_length(v_cfg -> 'catalog') = 0 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'catalog_not_published');
  END IF;

  SELECT count(*) INTO v_count FROM jsonb_array_elements(v_cfg -> 'catalog') c
   WHERE c ->> 'subject' = p_subject_id;
  IF v_count = 0 THEN
    INSERT INTO public.security_events (user_id, kind, detail)
    VALUES (v_uid, 'purchase_off_catalog', jsonb_build_object('subject', p_subject_id));
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_subject');
  END IF;

  SELECT credits, blocked_until INTO v_bal, v_blocked
    FROM public.profiles WHERE id = v_uid FOR UPDATE;

  IF v_blocked IS NOT NULL AND v_blocked > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_blocked', 'until', v_blocked);
  END IF;

  v_price := public.shop_subject_price(p_subject_id);
  v_days  := coalesce(nullif(v_cfg ->> 'entitlement_days', '')::integer, 30);

  IF coalesce(v_bal, 0) < v_price THEN
    INSERT INTO public.security_events (user_id, kind, detail)
    VALUES (v_uid, 'purchase_insufficient',
            jsonb_build_object('subject', p_subject_id, 'price', v_price, 'balance', coalesce(v_bal, 0)));
    RETURN jsonb_build_object('ok', false, 'error', 'insufficient_credits',
                              'price', v_price, 'balance', coalesce(v_bal, 0));
  END IF;

  -- Each chapter extends from its OWN current expiry, so a subject bought over
  -- a chapter already held adds days to it rather than shortening it.
  FOR r IN SELECT c ->> 'id' AS id FROM jsonb_array_elements(v_cfg -> 'catalog') c
            WHERE c ->> 'subject' = p_subject_id
  LOOP
    -- INTO leaves v_from NULL when the parent holds no entitlement for this
    -- chapter yet, which is exactly the "start from now" case.
    v_from := NULL;
    SELECT expires_at INTO v_from FROM public.chapter_entitlements
     WHERE user_id = v_uid AND chapter_id = r.id;
    v_new_exp := greatest(coalesce(v_from, now()), now()) + make_interval(days => v_days);

    INSERT INTO public.chapter_entitlements (user_id, chapter_id, source, credits_spent, expires_at)
    VALUES (v_uid, r.id, 'credits:subject', 0, v_new_exp)
    ON CONFLICT (user_id, chapter_id) DO UPDATE
      SET expires_at = excluded.expires_at,
          source     = 'credits:subject',
          granted_at = now();
  END LOOP;

  PERFORM set_config('psac.priv_write', 'on', true);
  UPDATE public.profiles SET credits = credits - v_price WHERE id = v_uid RETURNING credits INTO v_bal;
  PERFORM set_config('psac.priv_write', 'off', true);

  INSERT INTO public.credit_ledger (user_id, delta, balance_after, reason)
  VALUES (v_uid, -v_price, v_bal, 'subject:' || p_subject_id);

  RETURN jsonb_build_object('ok', true, 'balance', v_bal, 'price', v_price,
                            'subject', p_subject_id, 'chapters', v_count);
END;
$$;


-- ══════════════════════════════════════════════════════════════════════════
--  PART 6 — Security events and temporary blocks
-- ══════════════════════════════════════════════════════════════════════════

-- Lets the CLIENT report something it noticed (a tampered balance in its own
-- cache, a purchase button that should not have been clickable).
--
-- ⚠ Treat what arrives here as a hint, never as proof. A real attacker simply
-- does not call it, and a bored one calls it with nonsense — which is why the
-- rate limit exists and why nothing here can block anybody on its own. The
-- events that matter are the ones the DATABASE and the questions function write
-- about what they were actually asked to do.
create or replace function public.flag_security_event(p_kind text, p_detail jsonb default '{}'::jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
DECLARE
  v_uid uuid := auth.uid();
  v_stu uuid := public.current_student_id();
  v_recent integer;
BEGIN
  IF v_uid IS NULL AND v_stu IS NULL THEN
    RETURN jsonb_build_object('ok', false);
  END IF;
  IF p_kind IS NULL OR p_kind !~ '^[a-z_]{3,40}$' THEN
    RETURN jsonb_build_object('ok', false);
  END IF;

  SELECT count(*) INTO v_recent FROM public.security_events
   WHERE created_at > now() - interval '5 minutes'
     AND ((v_uid IS NOT NULL AND user_id = v_uid) OR (v_stu IS NOT NULL AND student_id = v_stu));
  IF v_recent > 20 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'rate_limited');
  END IF;

  INSERT INTO public.security_events (user_id, student_id, kind, detail)
  VALUES (v_uid, v_stu, 'client:' || p_kind,
          coalesce(p_detail, '{}'::jsonb) || jsonb_build_object('reported_by', 'client'));
  RETURN jsonb_build_object('ok', true);
END;
$$;

create or replace function public.admin_block_user(p_user uuid, p_minutes integer, p_reason text default null)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
DECLARE v_until timestamptz;
BEGIN
  IF NOT public.is_admin() THEN RETURN jsonb_build_object('ok', false, 'error', 'not_admin'); END IF;
  v_until := CASE WHEN coalesce(p_minutes, 0) <= 0 THEN NULL
                  ELSE now() + make_interval(mins => least(p_minutes, 60 * 24 * 365)) END;

  PERFORM set_config('psac.priv_write', 'on', true);
  UPDATE public.profiles SET blocked_until = v_until WHERE id = p_user;
  PERFORM set_config('psac.priv_write', 'off', true);

  INSERT INTO public.security_events (user_id, kind, detail)
  VALUES (p_user, CASE WHEN v_until IS NULL THEN 'admin_unblock' ELSE 'admin_block' END,
          jsonb_build_object('minutes', p_minutes, 'reason', left(coalesce(p_reason, ''), 200), 'by', auth.uid()));

  RETURN jsonb_build_object('ok', true, 'blocked_until', v_until);
END;
$$;

create or replace function public.admin_security_events(p_limit integer default 100)
returns table (id uuid, user_id uuid, student_id uuid, kind text, detail jsonb,
               created_at timestamptz, user_name text, blocked_until timestamptz)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select e.id, e.user_id, e.student_id, e.kind, e.detail, e.created_at,
         p.full_name, p.blocked_until
  from public.security_events e
  left join public.profiles p on p.id = e.user_id
  where public.is_admin()
  order by e.created_at desc
  limit greatest(1, least(coalesce(p_limit, 100), 500));
$$;

-- Lets an admin credit or debit an account by hand (support, refunds, clawing
-- back a farmed balance). Goes through the ledger like everything else, so a
-- manual adjustment is as auditable as an earned one.
create or replace function public.admin_adjust_credits(p_user uuid, p_delta integer, p_reason text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
DECLARE v_bal integer;
BEGIN
  IF NOT public.is_admin() THEN RETURN jsonb_build_object('ok', false, 'error', 'not_admin'); END IF;
  IF p_delta IS NULL OR p_delta = 0 THEN RETURN jsonb_build_object('ok', false, 'error', 'no_delta'); END IF;

  PERFORM set_config('psac.priv_write', 'on', true);
  UPDATE public.profiles
     SET credits = greatest(0, credits + p_delta)
   WHERE id = p_user
   RETURNING credits INTO v_bal;
  PERFORM set_config('psac.priv_write', 'off', true);

  IF v_bal IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'no_such_user'); END IF;

  INSERT INTO public.credit_ledger (user_id, delta, balance_after, reason)
  VALUES (p_user, p_delta, v_bal, 'admin:' || left(coalesce(p_reason, 'adjustment'), 60));

  RETURN jsonb_build_object('ok', true, 'balance', v_bal);
END;
$$;


-- ══════════════════════════════════════════════════════════════════════════
--  PART 7 — Grants
--
--  execute is granted to anon as well as authenticated wherever a STUDENT has
--  to be able to call it: a student session is not a Supabase Auth user, so it
--  arrives as anon carrying x-student-token. Those functions derive identity
--  from current_student_id() and take no id argument, so anon buys nothing.
-- ══════════════════════════════════════════════════════════════════════════

revoke all on function public.priv_write_allowed()                     from public;
revoke all on function public.shop_settings()                          from public;
revoke all on function public.shop_chapter_price(text)                 from public;
revoke all on function public.shop_subject_price(text)                 from public;
revoke all on function public.purchase_subject(text)                   from public;
revoke all on function public.record_student_activity()                from public;
revoke all on function public.my_credits()                             from public;
revoke all on function public.my_credit_ledger(integer)                from public;
revoke all on function public.my_entitlements()                        from public;
revoke all on function public.family_entitlements()                    from public;
revoke all on function public.purchase_chapter(text)                   from public;
revoke all on function public.flag_security_event(text, jsonb)         from public;
revoke all on function public.admin_block_user(uuid, integer, text)    from public;
revoke all on function public.admin_security_events(integer)           from public;
revoke all on function public.admin_adjust_credits(uuid, integer, text) from public;

grant execute on function public.shop_settings()                       to anon, authenticated;
grant execute on function public.shop_chapter_price(text)              to anon, authenticated;
grant execute on function public.shop_subject_price(text)              to anon, authenticated;
grant execute on function public.record_student_activity()             to anon, authenticated;
grant execute on function public.family_entitlements()                 to anon, authenticated;
grant execute on function public.flag_security_event(text, jsonb)      to anon, authenticated;
grant execute on function public.my_credits()                          to authenticated;
grant execute on function public.my_credit_ledger(integer)             to authenticated;
grant execute on function public.my_entitlements()                     to authenticated;
grant execute on function public.purchase_chapter(text)                to authenticated;
-- Whole-subject buying. Revoked from public above like every other function here,
-- but the matching grant was missing, so purchase_subject() answered 42501
-- permission denied for every caller - and _rpcMissing() only recognises
-- PGRST202/42883, so the parent saw the raw Postgres error, not the friendly one.
grant execute on function public.purchase_subject(text)                to authenticated;
grant execute on function public.admin_block_user(uuid, integer, text) to authenticated;
grant execute on function public.admin_security_events(integer)        to authenticated;
grant execute on function public.admin_adjust_credits(uuid, integer, text) to authenticated;
-- priv_write_allowed() is called only by the trigger functions, which run as
-- the owner. No client ever needs it.


-- ══════════════════════════════════════════════════════════════════════════
--  PART 8 — Default settings row
--
--  ⚠ BACKFILLS, never overwrites. `do nothing` was wrong the moment this file
--  gained a second version: a database that already ran an earlier copy has a
--  shop_settings row, so `do nothing` skipped it entirely and every key added
--  since — default_subject_price, subject_prices, the anti-farming knobs —
--  stayed missing. `excluded.value || mm_data.value` is jsonb concat with the
--  RIGHT side winning, so an admin's configured values are kept exactly as they
--  are and only the keys they have never seen are added.
-- ══════════════════════════════════════════════════════════════════════════
insert into public.mm_data (key, value)
values ('shop_settings', jsonb_build_object(
  'shop_enabled',             true,
  'referral_earning_enabled', true,
  'referral_credits',         15,
  'default_chapter_price',    250,
  'default_subject_price',    1500,
  'entitlement_days',         30,
  'activation_burst_limit',   8,
  'min_account_age_minutes',  0,
  'max_credited_referrals',   0,
  'chapter_prices',         '{}'::jsonb,
  'subject_prices',         '{}'::jsonb,
  'catalog',                '[]'::jsonb
))
on conflict (key) do update
  set value = excluded.value || public.mm_data.value,
      updated_at = now();
