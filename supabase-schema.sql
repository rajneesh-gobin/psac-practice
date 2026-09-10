-- ══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — CONSOLIDATED DATABASE SCHEMA
--
--  GENERATED FROM THE LIVE DATABASE on 2026-09-10
--  (project xawvjwsiqhtxgpocdqgm, PostgreSQL 17.6).
--
--  This one file replaces 31 incremental migrations — every supabase-*.sql,
--  plus guest.sql, report_error.sql and
--  migrations/20260902_extend_student_sessions.sql. Every object below was read
--  back out of the live database, so it records what is ACTUALLY deployed, not
--  what a migration file claimed it did. All 31 had been applied.
--
--  ── HOW TO USE IT ────────────────────────────────────────────────────
--  • Rebuilding a fresh project: run top to bottom. The sections are ordered so
--    that each one's dependencies already exist when it runs.
--  • Answering "what is really deployed?": read this, not a migration file.
--  • Re-running it against production: every statement is idempotent, so it is
--    safe — but it is a SNAPSHOT, not a diff. It drops nothing, so an object
--    added to production since 2026-09-10 survives; and it overwrites function,
--    policy and trigger definitions with the ones recorded here, so regenerate
--    before you re-run or you will roll a later fix backwards.
--
--  ── WHAT IS DELIBERATELY NOT HERE ─────────────────────────────────────
--  • Table data, except public.plans (§11) — the app cannot run without those
--    rows, and one backfill row per family (§12). mm_data holds runtime settings, which are data, not schema, and the
--    app already coalesces its own defaults for every one of them.
--  • auth.* and storage.* internals — Supabase owns them. Only the two buckets
--    this app creates and their policies are recorded (§10).
--
--  ── ⚠ THE TRAP THIS SCHEMA KEEPS SPRINGING ─────────────────────────────
--  public.students has COLUMN-LEVEL SELECT grants, not a table-wide one, so
--  that pin, pin_hash, pin_attempts and pin_locked_until stay unreadable.
--  ANY COLUMN ADDED TO students LATER INHERITS NO GRANT, and is then as
--  unreadable as the PIN: every query touching it fails 42501 "permission
--  denied for table students" — a message that never names the column — and the
--  client turns that into an empty result. That is how adding deleted_at
--  emptied the parent dashboard. Put a GRANT SELECT (col) beside every
--  ALTER TABLE students ADD COLUMN. The live column grants are in §9.
--
--  ── ⚠ NEVER AUTHOR A POLICY CHANGE FROM THIS FILE ─────────────────────
--  It is a snapshot, and it goes stale the moment anyone runs SQL by hand.
--  Query pg_policies on the live database first. Writing a policy against the
--  previous dump once produced one that would have silently un-restricted the
--  forum.
--
--  Sections: 1 extensions · 2 tables · 3 constraints · 4 functions ·
--            5 deferred defaults · 6 indexes · 7 triggers ·
--            8 RLS & policies · 9 grants · 10 storage · 11 seed ·
--            12 backfill · 13 not yet applied
-- ══════════════════════════════════════════════════════════════════════════


-- ═══ 1 · EXTENSIONS ═══════════════════════════════════════════════════════════
-- ⚠ pgcrypto lives in the extensions schema, and several column defaults call
--   into it UNQUALIFIED — public.student_invites.secret is
--   encode(gen_random_bytes(32), 'hex'). On Supabase that resolves because the
--   postgres role carries search_path = "$user", public, extensions. Pin it
--   here rather than inherit it, or a rebuild on any other cluster dies at
--   CREATE TABLE with "function gen_random_bytes(integer) does not exist".
SET search_path = public, extensions;

-- Supabase provisions these on every project; listed so a fresh one matches.
-- pgcrypto is required: gen_random_uuid() and digest() are used throughout.
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto    WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


-- ═══ 2a · SEQUENCES ═══════════════════════════════════════════════════════════
-- ⚠ BEFORE §2 on purpose. A table whose id defaults to nextval() cannot be
--   created until its sequence exists, and CREATE TABLE does not create one
--   unless the column is declared serial/identity - which it is not here,
--   because these columns are dumped with their resolved default.
--   OWNED BY is set after the tables exist, in §2b.
CREATE SEQUENCE IF NOT EXISTS public.teacher_guest_pupil_names_id_seq;


-- ═══ 2 · TABLES ═══════════════════════════════════════════════════════════════
-- Columns only. Constraints are §3, so no table here depends on a table
-- created after it. The one default that calls a public function is deferred
-- to §5. The ADD COLUMN IF NOT EXISTS lines after each CREATE are what make
-- this section idempotent against a database that already has the table but
-- is missing a later column, and the SET NOT NULL lines converge its
-- nullability. Both are no-ops against production, which is where these were
-- read from.
--
-- ⚠ Do not "tidy" the ADD COLUMN lines into the CREATE TABLE and delete them.
--   CREATE TABLE IF NOT EXISTS does nothing at all when the table is already
--   there, so on an existing database the ALTERs are the only thing that runs.
--
-- Those ALTERs are pure noise on a fresh build, so notices are turned down here
-- and back up before §13, whose entire job is to tell you something.
SET client_min_messages = warning;

CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  assignment_id uuid,
  classroom_id uuid,
  student_id uuid NOT NULL,
  attempt integer DEFAULT 1 NOT NULL,
  score integer DEFAULT 0 NOT NULL,
  total integer DEFAULT 0 NOT NULL,
  pct integer DEFAULT 0 NOT NULL,
  answers jsonb DEFAULT '[]'::jsonb NOT NULL,
  retry_allowed boolean DEFAULT false NOT NULL,
  submitted_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS assignment_id uuid;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS attempt integer DEFAULT 1;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS score integer DEFAULT 0;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS total integer DEFAULT 0;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS pct integer DEFAULT 0;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS answers jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS retry_allowed boolean DEFAULT false;
ALTER TABLE public.assignment_submissions ADD COLUMN IF NOT EXISTS submitted_at timestamp with time zone DEFAULT now();
ALTER TABLE public.assignment_submissions ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.assignment_submissions ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.assignment_submissions ALTER COLUMN attempt SET NOT NULL;
ALTER TABLE public.assignment_submissions ALTER COLUMN score SET NOT NULL;
ALTER TABLE public.assignment_submissions ALTER COLUMN total SET NOT NULL;
ALTER TABLE public.assignment_submissions ALTER COLUMN pct SET NOT NULL;
ALTER TABLE public.assignment_submissions ALTER COLUMN answers SET NOT NULL;
ALTER TABLE public.assignment_submissions ALTER COLUMN retry_allowed SET NOT NULL;
ALTER TABLE public.assignment_submissions ALTER COLUMN submitted_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.chapter_entitlements (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  chapter_id text NOT NULL,
  source text DEFAULT 'credits'::text NOT NULL,
  credits_spent integer DEFAULT 0 NOT NULL,
  granted_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone NOT NULL
);
ALTER TABLE public.chapter_entitlements ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.chapter_entitlements ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.chapter_entitlements ADD COLUMN IF NOT EXISTS chapter_id text;
ALTER TABLE public.chapter_entitlements ADD COLUMN IF NOT EXISTS source text DEFAULT 'credits'::text;
ALTER TABLE public.chapter_entitlements ADD COLUMN IF NOT EXISTS credits_spent integer DEFAULT 0;
ALTER TABLE public.chapter_entitlements ADD COLUMN IF NOT EXISTS granted_at timestamp with time zone DEFAULT now();
ALTER TABLE public.chapter_entitlements ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.chapter_entitlements ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.chapter_entitlements ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.chapter_entitlements ALTER COLUMN chapter_id SET NOT NULL;
ALTER TABLE public.chapter_entitlements ALTER COLUMN source SET NOT NULL;
ALTER TABLE public.chapter_entitlements ALTER COLUMN credits_spent SET NOT NULL;
ALTER TABLE public.chapter_entitlements ALTER COLUMN granted_at SET NOT NULL;
ALTER TABLE public.chapter_entitlements ALTER COLUMN expires_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.classroom_materials (
  material_id uuid NOT NULL,
  classroom_id uuid NOT NULL,
  assigned_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.classroom_materials ADD COLUMN IF NOT EXISTS material_id uuid;
ALTER TABLE public.classroom_materials ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.classroom_materials ADD COLUMN IF NOT EXISTS assigned_at timestamp with time zone DEFAULT now();
ALTER TABLE public.classroom_materials ALTER COLUMN material_id SET NOT NULL;
ALTER TABLE public.classroom_materials ALTER COLUMN classroom_id SET NOT NULL;
ALTER TABLE public.classroom_materials ALTER COLUMN assigned_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.classroom_pin_attempts (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  classroom_slug text NOT NULL,
  ip_hash text NOT NULL,
  success boolean DEFAULT false NOT NULL,
  attempted_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.classroom_pin_attempts ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.classroom_pin_attempts ADD COLUMN IF NOT EXISTS classroom_slug text;
ALTER TABLE public.classroom_pin_attempts ADD COLUMN IF NOT EXISTS ip_hash text;
ALTER TABLE public.classroom_pin_attempts ADD COLUMN IF NOT EXISTS success boolean DEFAULT false;
ALTER TABLE public.classroom_pin_attempts ADD COLUMN IF NOT EXISTS attempted_at timestamp with time zone DEFAULT now();
ALTER TABLE public.classroom_pin_attempts ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.classroom_pin_attempts ALTER COLUMN classroom_slug SET NOT NULL;
ALTER TABLE public.classroom_pin_attempts ALTER COLUMN ip_hash SET NOT NULL;
ALTER TABLE public.classroom_pin_attempts ALTER COLUMN success SET NOT NULL;
ALTER TABLE public.classroom_pin_attempts ALTER COLUMN attempted_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.classroom_post_refs (
  post_id uuid NOT NULL,
  classroom_id uuid NOT NULL
);
ALTER TABLE public.classroom_post_refs ADD COLUMN IF NOT EXISTS post_id uuid;
ALTER TABLE public.classroom_post_refs ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.classroom_post_refs ALTER COLUMN post_id SET NOT NULL;
ALTER TABLE public.classroom_post_refs ALTER COLUMN classroom_id SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.classroom_posts (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  classroom_id uuid NOT NULL,
  teacher_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  file_path text,
  file_name text,
  file_size integer,
  youtube_url text,
  pinned boolean DEFAULT false NOT NULL,
  scheduled_at timestamp with time zone,
  view_count integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS teacher_id uuid;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS type text;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS body text;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS file_path text;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS file_name text;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS file_size integer;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS youtube_url text;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS pinned boolean DEFAULT false;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS scheduled_at timestamp with time zone;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0;
ALTER TABLE public.classroom_posts ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.classroom_posts ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.classroom_posts ALTER COLUMN classroom_id SET NOT NULL;
ALTER TABLE public.classroom_posts ALTER COLUMN teacher_id SET NOT NULL;
ALTER TABLE public.classroom_posts ALTER COLUMN type SET NOT NULL;
ALTER TABLE public.classroom_posts ALTER COLUMN title SET NOT NULL;
ALTER TABLE public.classroom_posts ALTER COLUMN pinned SET NOT NULL;
ALTER TABLE public.classroom_posts ALTER COLUMN view_count SET NOT NULL;
ALTER TABLE public.classroom_posts ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.classroom_sessions (
  token uuid DEFAULT gen_random_uuid() NOT NULL,
  classroom_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone DEFAULT (now() + '24:00:00'::interval) NOT NULL
);
ALTER TABLE public.classroom_sessions ADD COLUMN IF NOT EXISTS token uuid DEFAULT gen_random_uuid();
ALTER TABLE public.classroom_sessions ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.classroom_sessions ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.classroom_sessions ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone DEFAULT (now() + '24:00:00'::interval);
ALTER TABLE public.classroom_sessions ALTER COLUMN token SET NOT NULL;
ALTER TABLE public.classroom_sessions ALTER COLUMN classroom_id SET NOT NULL;
ALTER TABLE public.classroom_sessions ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.classroom_sessions ALTER COLUMN expires_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.classrooms (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  teacher_id uuid NOT NULL,
  name text NOT NULL,
  subject text,
  grade_level integer,
  schedule text,
  invite_code text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS teacher_id uuid;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS subject text;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS grade_level integer;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS schedule text;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS invite_code text;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.classrooms ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.classrooms ALTER COLUMN teacher_id SET NOT NULL;
ALTER TABLE public.classrooms ALTER COLUMN name SET NOT NULL;
ALTER TABLE public.classrooms ALTER COLUMN invite_code SET NOT NULL;
ALTER TABLE public.classrooms ALTER COLUMN is_active SET NOT NULL;
ALTER TABLE public.classrooms ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.credit_ledger (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  delta integer NOT NULL,
  balance_after integer NOT NULL,
  reason text NOT NULL,
  ref_id uuid,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.credit_ledger ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.credit_ledger ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.credit_ledger ADD COLUMN IF NOT EXISTS delta integer;
ALTER TABLE public.credit_ledger ADD COLUMN IF NOT EXISTS balance_after integer;
ALTER TABLE public.credit_ledger ADD COLUMN IF NOT EXISTS reason text;
ALTER TABLE public.credit_ledger ADD COLUMN IF NOT EXISTS ref_id uuid;
ALTER TABLE public.credit_ledger ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.credit_ledger ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.credit_ledger ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.credit_ledger ALTER COLUMN delta SET NOT NULL;
ALTER TABLE public.credit_ledger ALTER COLUMN balance_after SET NOT NULL;
ALTER TABLE public.credit_ledger ALTER COLUMN reason SET NOT NULL;
ALTER TABLE public.credit_ledger ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.enrollments (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id uuid NOT NULL,
  classroom_id uuid NOT NULL,
  joined_at timestamp with time zone DEFAULT now() NOT NULL,
  is_active boolean DEFAULT true NOT NULL
);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS joined_at timestamp with time zone DEFAULT now();
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
ALTER TABLE public.enrollments ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.enrollments ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.enrollments ALTER COLUMN classroom_id SET NOT NULL;
ALTER TABLE public.enrollments ALTER COLUMN joined_at SET NOT NULL;
ALTER TABLE public.enrollments ALTER COLUMN is_active SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.families (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  parent_id uuid NOT NULL,
  family_name text DEFAULT 'My Family'::text NOT NULL,
  family_code character(6) DEFAULT upper(substr(md5((random())::text), 1, 6)) NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.families ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.families ADD COLUMN IF NOT EXISTS parent_id uuid;
ALTER TABLE public.families ADD COLUMN IF NOT EXISTS family_name text DEFAULT 'My Family'::text;
ALTER TABLE public.families ADD COLUMN IF NOT EXISTS family_code character(6) DEFAULT upper(substr(md5((random())::text), 1, 6));
ALTER TABLE public.families ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.families ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.families ALTER COLUMN parent_id SET NOT NULL;
ALTER TABLE public.families ALTER COLUMN family_name SET NOT NULL;
ALTER TABLE public.families ALTER COLUMN family_code SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.family_invites (
  token_hash text NOT NULL,
  family_id uuid NOT NULL,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  used_at timestamp with time zone,
  used_by uuid
);
ALTER TABLE public.family_invites ADD COLUMN IF NOT EXISTS token_hash text;
ALTER TABLE public.family_invites ADD COLUMN IF NOT EXISTS family_id uuid;
ALTER TABLE public.family_invites ADD COLUMN IF NOT EXISTS created_by uuid;
ALTER TABLE public.family_invites ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.family_invites ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.family_invites ADD COLUMN IF NOT EXISTS used_at timestamp with time zone;
ALTER TABLE public.family_invites ADD COLUMN IF NOT EXISTS used_by uuid;
ALTER TABLE public.family_invites ALTER COLUMN token_hash SET NOT NULL;
ALTER TABLE public.family_invites ALTER COLUMN family_id SET NOT NULL;
ALTER TABLE public.family_invites ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.family_invites ALTER COLUMN expires_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.family_members (
  family_id uuid NOT NULL,
  user_id uuid NOT NULL,
  role text DEFAULT 'coparent'::text NOT NULL,
  invited_by uuid,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS family_id uuid;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS role text DEFAULT 'coparent'::text;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS invited_by uuid;
ALTER TABLE public.family_members ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.family_members ALTER COLUMN family_id SET NOT NULL;
ALTER TABLE public.family_members ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.family_members ALTER COLUMN role SET NOT NULL;
ALTER TABLE public.family_members ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.forum_posts (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  author_name text DEFAULT 'Anonymous'::text NOT NULL,
  author_type text DEFAULT 'parent'::text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  reply_count integer DEFAULT 0,
  status text DEFAULT 'open'::text NOT NULL,
  author_id uuid DEFAULT auth.uid(),
  author_student_id uuid
);
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS body text;
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS author_name text DEFAULT 'Anonymous'::text;
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS author_type text DEFAULT 'parent'::text;
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS reply_count integer DEFAULT 0;
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS status text DEFAULT 'open'::text;
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS author_id uuid DEFAULT auth.uid();
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS author_student_id uuid;
ALTER TABLE public.forum_posts ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.forum_posts ALTER COLUMN category SET NOT NULL;
ALTER TABLE public.forum_posts ALTER COLUMN title SET NOT NULL;
ALTER TABLE public.forum_posts ALTER COLUMN body SET NOT NULL;
ALTER TABLE public.forum_posts ALTER COLUMN author_name SET NOT NULL;
ALTER TABLE public.forum_posts ALTER COLUMN author_type SET NOT NULL;
ALTER TABLE public.forum_posts ALTER COLUMN status SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.forum_replies (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  post_id uuid NOT NULL,
  body text NOT NULL,
  author_name text DEFAULT 'Anonymous'::text NOT NULL,
  author_type text DEFAULT 'parent'::text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  author_id uuid DEFAULT auth.uid(),
  author_student_id uuid
);
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS post_id uuid;
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS body text;
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS author_name text DEFAULT 'Anonymous'::text;
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS author_type text DEFAULT 'parent'::text;
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS author_id uuid DEFAULT auth.uid();
ALTER TABLE public.forum_replies ADD COLUMN IF NOT EXISTS author_student_id uuid;
ALTER TABLE public.forum_replies ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.forum_replies ALTER COLUMN post_id SET NOT NULL;
ALTER TABLE public.forum_replies ALTER COLUMN body SET NOT NULL;
ALTER TABLE public.forum_replies ALTER COLUMN author_name SET NOT NULL;
ALTER TABLE public.forum_replies ALTER COLUMN author_type SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.guest_assignment_attempts (
  assignment_id uuid NOT NULL,
  fails integer DEFAULT 0 NOT NULL,
  window_start timestamp with time zone DEFAULT now() NOT NULL,
  locked_until timestamp with time zone
);
ALTER TABLE public.guest_assignment_attempts ADD COLUMN IF NOT EXISTS assignment_id uuid;
ALTER TABLE public.guest_assignment_attempts ADD COLUMN IF NOT EXISTS fails integer DEFAULT 0;
ALTER TABLE public.guest_assignment_attempts ADD COLUMN IF NOT EXISTS window_start timestamp with time zone DEFAULT now();
ALTER TABLE public.guest_assignment_attempts ADD COLUMN IF NOT EXISTS locked_until timestamp with time zone;
ALTER TABLE public.guest_assignment_attempts ALTER COLUMN assignment_id SET NOT NULL;
ALTER TABLE public.guest_assignment_attempts ALTER COLUMN fails SET NOT NULL;
ALTER TABLE public.guest_assignment_attempts ALTER COLUMN window_start SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.guest_assignments (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  code text NOT NULL,
  teacher_id uuid NOT NULL,
  teacher_label text,
  classroom_label text,
  title text NOT NULL,
  subject_pack_id text NOT NULL,
  chapter_ids jsonb DEFAULT '[]'::jsonb NOT NULL,
  question_ids jsonb DEFAULT '[]'::jsonb NOT NULL,
  question_count integer DEFAULT 10 NOT NULL,
  duration_mins integer,
  pin_hash text NOT NULL,
  due_at timestamp with time zone,
  expires_at timestamp with time zone DEFAULT (now() + '48:00:00'::interval) NOT NULL,
  max_students integer DEFAULT 15 NOT NULL,
  status text DEFAULT 'active'::text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  deleted_at timestamp with time zone
);
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS code text;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS teacher_id uuid;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS teacher_label text;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS classroom_label text;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS subject_pack_id text;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS chapter_ids jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS question_ids jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS question_count integer DEFAULT 10;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS duration_mins integer;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS pin_hash text;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS due_at timestamp with time zone;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone DEFAULT (now() + '48:00:00'::interval);
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS max_students integer DEFAULT 15;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS status text DEFAULT 'active'::text;
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;
ALTER TABLE public.guest_assignments ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN code SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN teacher_id SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN title SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN subject_pack_id SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN chapter_ids SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN question_ids SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN question_count SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN pin_hash SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN expires_at SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN max_students SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN status SET NOT NULL;
ALTER TABLE public.guest_assignments ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.guest_material_completions (
  material_id uuid NOT NULL,
  classroom_id uuid NOT NULL,
  name_key text NOT NULL,
  name_display text,
  done_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.guest_material_completions ADD COLUMN IF NOT EXISTS material_id uuid;
ALTER TABLE public.guest_material_completions ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.guest_material_completions ADD COLUMN IF NOT EXISTS name_key text;
ALTER TABLE public.guest_material_completions ADD COLUMN IF NOT EXISTS name_display text;
ALTER TABLE public.guest_material_completions ADD COLUMN IF NOT EXISTS done_at timestamp with time zone DEFAULT now();
ALTER TABLE public.guest_material_completions ALTER COLUMN material_id SET NOT NULL;
ALTER TABLE public.guest_material_completions ALTER COLUMN classroom_id SET NOT NULL;
ALTER TABLE public.guest_material_completions ALTER COLUMN name_key SET NOT NULL;
ALTER TABLE public.guest_material_completions ALTER COLUMN done_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.guest_pin_attempts (
  assignment_id uuid NOT NULL,
  name_key text NOT NULL,
  attempts integer DEFAULT 0 NOT NULL,
  locked_until timestamp with time zone,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.guest_pin_attempts ADD COLUMN IF NOT EXISTS assignment_id uuid;
ALTER TABLE public.guest_pin_attempts ADD COLUMN IF NOT EXISTS name_key text;
ALTER TABLE public.guest_pin_attempts ADD COLUMN IF NOT EXISTS attempts integer DEFAULT 0;
ALTER TABLE public.guest_pin_attempts ADD COLUMN IF NOT EXISTS locked_until timestamp with time zone;
ALTER TABLE public.guest_pin_attempts ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();
ALTER TABLE public.guest_pin_attempts ALTER COLUMN assignment_id SET NOT NULL;
ALTER TABLE public.guest_pin_attempts ALTER COLUMN name_key SET NOT NULL;
ALTER TABLE public.guest_pin_attempts ALTER COLUMN attempts SET NOT NULL;
ALTER TABLE public.guest_pin_attempts ALTER COLUMN updated_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.guest_submissions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  assignment_id uuid NOT NULL,
  name_display text NOT NULL,
  name_key text NOT NULL,
  answers jsonb DEFAULT '[]'::jsonb NOT NULL,
  score integer DEFAULT 0 NOT NULL,
  total integer DEFAULT 0 NOT NULL,
  pct integer DEFAULT 0 NOT NULL,
  attempt integer DEFAULT 1 NOT NULL,
  retry_allowed boolean DEFAULT false NOT NULL,
  started_at timestamp with time zone DEFAULT now() NOT NULL,
  submitted_at timestamp with time zone,
  ip text,
  user_agent text,
  elapsed_secs integer,
  over_time boolean DEFAULT false NOT NULL,
  open_token_hash text,
  session_token_hash text
);
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS assignment_id uuid;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS name_display text;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS name_key text;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS answers jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS score integer DEFAULT 0;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS total integer DEFAULT 0;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS pct integer DEFAULT 0;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS attempt integer DEFAULT 1;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS retry_allowed boolean DEFAULT false;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS started_at timestamp with time zone DEFAULT now();
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS submitted_at timestamp with time zone;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS ip text;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS user_agent text;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS elapsed_secs integer;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS over_time boolean DEFAULT false;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS open_token_hash text;
ALTER TABLE public.guest_submissions ADD COLUMN IF NOT EXISTS session_token_hash text;
ALTER TABLE public.guest_submissions ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN assignment_id SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN name_display SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN name_key SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN answers SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN score SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN total SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN pct SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN attempt SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN retry_allowed SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN started_at SET NOT NULL;
ALTER TABLE public.guest_submissions ALTER COLUMN over_time SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.learning_materials (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  teacher_id uuid,
  title text NOT NULL,
  description text,
  subject text,
  grade integer,
  file_path text,
  file_name text,
  file_size integer,
  created_at timestamp with time zone DEFAULT now(),
  link_expiry_seconds integer DEFAULT 3600 NOT NULL,
  source_type text DEFAULT 'file'::text NOT NULL,
  external_url text
);
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS teacher_id uuid;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS subject text;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS grade integer;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS file_path text;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS file_name text;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS file_size integer;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS link_expiry_seconds integer DEFAULT 3600;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS source_type text DEFAULT 'file'::text;
ALTER TABLE public.learning_materials ADD COLUMN IF NOT EXISTS external_url text;
ALTER TABLE public.learning_materials ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.learning_materials ALTER COLUMN title SET NOT NULL;
ALTER TABLE public.learning_materials ALTER COLUMN link_expiry_seconds SET NOT NULL;
ALTER TABLE public.learning_materials ALTER COLUMN source_type SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.login_events (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id text NOT NULL,
  user_type text DEFAULT 'student'::text NOT NULL,
  ip_address text,
  user_agent text,
  fingerprint text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.login_events ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.login_events ADD COLUMN IF NOT EXISTS user_id text;
ALTER TABLE public.login_events ADD COLUMN IF NOT EXISTS user_type text DEFAULT 'student'::text;
ALTER TABLE public.login_events ADD COLUMN IF NOT EXISTS ip_address text;
ALTER TABLE public.login_events ADD COLUMN IF NOT EXISTS user_agent text;
ALTER TABLE public.login_events ADD COLUMN IF NOT EXISTS fingerprint text;
ALTER TABLE public.login_events ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.login_events ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.login_events ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.login_events ALTER COLUMN user_type SET NOT NULL;
ALTER TABLE public.login_events ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.minigame_polls (
  code text NOT NULL,
  student_id uuid NOT NULL,
  question text NOT NULL,
  options jsonb NOT NULL,
  votes jsonb DEFAULT '[0, 0, 0, 0]'::jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone NOT NULL
);
ALTER TABLE public.minigame_polls ADD COLUMN IF NOT EXISTS code text;
ALTER TABLE public.minigame_polls ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.minigame_polls ADD COLUMN IF NOT EXISTS question text;
ALTER TABLE public.minigame_polls ADD COLUMN IF NOT EXISTS options jsonb;
ALTER TABLE public.minigame_polls ADD COLUMN IF NOT EXISTS votes jsonb DEFAULT '[0, 0, 0, 0]'::jsonb;
ALTER TABLE public.minigame_polls ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.minigame_polls ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.minigame_polls ALTER COLUMN code SET NOT NULL;
ALTER TABLE public.minigame_polls ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.minigame_polls ALTER COLUMN question SET NOT NULL;
ALTER TABLE public.minigame_polls ALTER COLUMN options SET NOT NULL;
ALTER TABLE public.minigame_polls ALTER COLUMN votes SET NOT NULL;
ALTER TABLE public.minigame_polls ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.minigame_polls ALTER COLUMN expires_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.mm_data (
  key text NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.mm_data ADD COLUMN IF NOT EXISTS key text;
ALTER TABLE public.mm_data ADD COLUMN IF NOT EXISTS value jsonb;
ALTER TABLE public.mm_data ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();
ALTER TABLE public.mm_data ALTER COLUMN key SET NOT NULL;
ALTER TABLE public.mm_data ALTER COLUMN value SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.parent_pin_attempts (
  user_id uuid NOT NULL,
  attempts integer DEFAULT 0 NOT NULL,
  locked_until timestamp with time zone,
  last_try timestamp with time zone DEFAULT now() NOT NULL,
  last_ok timestamp with time zone,
  lockouts integer DEFAULT 0 NOT NULL
);
ALTER TABLE public.parent_pin_attempts ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.parent_pin_attempts ADD COLUMN IF NOT EXISTS attempts integer DEFAULT 0;
ALTER TABLE public.parent_pin_attempts ADD COLUMN IF NOT EXISTS locked_until timestamp with time zone;
ALTER TABLE public.parent_pin_attempts ADD COLUMN IF NOT EXISTS last_try timestamp with time zone DEFAULT now();
ALTER TABLE public.parent_pin_attempts ADD COLUMN IF NOT EXISTS last_ok timestamp with time zone;
ALTER TABLE public.parent_pin_attempts ADD COLUMN IF NOT EXISTS lockouts integer DEFAULT 0;
ALTER TABLE public.parent_pin_attempts ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.parent_pin_attempts ALTER COLUMN attempts SET NOT NULL;
ALTER TABLE public.parent_pin_attempts ALTER COLUMN last_try SET NOT NULL;
ALTER TABLE public.parent_pin_attempts ALTER COLUMN lockouts SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.payments (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  plan_id text NOT NULL,
  amount_mur integer DEFAULT 0 NOT NULL,
  provider text DEFAULT 'manual'::text NOT NULL,
  provider_ref text,
  status text DEFAULT 'pending'::text NOT NULL,
  notes text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  processed_at timestamp with time zone,
  reference text,
  months integer DEFAULT 1 NOT NULL,
  payer_note text,
  claimed_at timestamp with time zone
);
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS plan_id text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS amount_mur integer DEFAULT 0;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS provider text DEFAULT 'manual'::text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS provider_ref text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending'::text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS processed_at timestamp with time zone;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS reference text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS months integer DEFAULT 1;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS payer_note text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS claimed_at timestamp with time zone;
ALTER TABLE public.payments ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.payments ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.payments ALTER COLUMN plan_id SET NOT NULL;
ALTER TABLE public.payments ALTER COLUMN amount_mur SET NOT NULL;
ALTER TABLE public.payments ALTER COLUMN provider SET NOT NULL;
ALTER TABLE public.payments ALTER COLUMN status SET NOT NULL;
ALTER TABLE public.payments ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.payments ALTER COLUMN months SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.physical_homework (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  teacher_id uuid NOT NULL,
  classroom_id uuid NOT NULL,
  title text NOT NULL,
  subject text,
  description text,
  file_path text,
  file_name text,
  file_size bigint,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS teacher_id uuid;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS subject text;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS file_path text;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS file_name text;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS file_size bigint;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.physical_homework ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.physical_homework ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.physical_homework ALTER COLUMN teacher_id SET NOT NULL;
ALTER TABLE public.physical_homework ALTER COLUMN classroom_id SET NOT NULL;
ALTER TABLE public.physical_homework ALTER COLUMN title SET NOT NULL;
ALTER TABLE public.physical_homework ALTER COLUMN expires_at SET NOT NULL;
ALTER TABLE public.physical_homework ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.plans (
  id text NOT NULL,
  name text NOT NULL,
  price_mur integer DEFAULT 0 NOT NULL,
  max_children integer DEFAULT 1 NOT NULL,
  features jsonb DEFAULT '{}'::jsonb NOT NULL,
  is_active boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS id text;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS price_mur integer DEFAULT 0;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS max_children integer DEFAULT 1;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT false;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.plans ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.plans ALTER COLUMN name SET NOT NULL;
ALTER TABLE public.plans ALTER COLUMN price_mur SET NOT NULL;
ALTER TABLE public.plans ALTER COLUMN max_children SET NOT NULL;
ALTER TABLE public.plans ALTER COLUMN features SET NOT NULL;
ALTER TABLE public.plans ALTER COLUMN is_active SET NOT NULL;
ALTER TABLE public.plans ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  role text NOT NULL,
  full_name text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  disabled boolean DEFAULT false,
  expires_at timestamp with time zone,
  is_super_admin boolean DEFAULT false NOT NULL,
  teacher_tier text DEFAULT 'unverified'::text NOT NULL,
  teacher_status text DEFAULT 'none'::text NOT NULL,
  teacher_note text,
  teacher_requested_at timestamp with time zone,
  teacher_decided_at timestamp with time zone,
  teacher_decided_by uuid,
  referral_code text DEFAULT upper(substr(md5((gen_random_uuid())::text), 1, 8)) NOT NULL,
  preferences jsonb DEFAULT '{}'::jsonb NOT NULL,
  deleted_at timestamp with time zone,
  credits integer DEFAULT 0 NOT NULL,
  blocked_until timestamp with time zone,
  parent_pin_hash text,
  forum_nickname text
);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS id uuid;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS disabled boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_super_admin boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS teacher_tier text DEFAULT 'unverified'::text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS teacher_status text DEFAULT 'none'::text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS teacher_note text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS teacher_requested_at timestamp with time zone;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS teacher_decided_at timestamp with time zone;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS teacher_decided_by uuid;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code text DEFAULT upper(substr(md5((gen_random_uuid())::text), 1, 8));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS credits integer DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS blocked_until timestamp with time zone;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS parent_pin_hash text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS forum_nickname text;
ALTER TABLE public.profiles ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN role SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN full_name SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN is_super_admin SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN teacher_tier SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN teacher_status SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN referral_code SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN preferences SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN credits SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id uuid NOT NULL,
  subscription jsonb NOT NULL,
  reminder_time text,
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.push_subscriptions ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.push_subscriptions ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.push_subscriptions ADD COLUMN IF NOT EXISTS subscription jsonb;
ALTER TABLE public.push_subscriptions ADD COLUMN IF NOT EXISTS reminder_time text;
ALTER TABLE public.push_subscriptions ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.push_subscriptions ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.push_subscriptions ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.push_subscriptions ALTER COLUMN subscription SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.question_report_messages (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  report_id uuid NOT NULL,
  author_type text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.question_report_messages ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.question_report_messages ADD COLUMN IF NOT EXISTS report_id uuid;
ALTER TABLE public.question_report_messages ADD COLUMN IF NOT EXISTS author_type text;
ALTER TABLE public.question_report_messages ADD COLUMN IF NOT EXISTS message text;
ALTER TABLE public.question_report_messages ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.question_report_messages ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.question_report_messages ALTER COLUMN report_id SET NOT NULL;
ALTER TABLE public.question_report_messages ALTER COLUMN author_type SET NOT NULL;
ALTER TABLE public.question_report_messages ALTER COLUMN message SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.question_reports (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  question_id text,
  question_text text,
  message text,
  student_id uuid,
  status text DEFAULT 'open'::text,
  updated_at timestamp with time zone DEFAULT now(),
  admin_note text,
  chapter_id text,
  report_type text DEFAULT 'other'::text,
  student_last_seen_at timestamp with time zone,
  reporter_id uuid DEFAULT auth.uid()
);
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS question_id text;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS question_text text;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS message text;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS status text DEFAULT 'open'::text;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS admin_note text;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS chapter_id text;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS report_type text DEFAULT 'other'::text;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS student_last_seen_at timestamp with time zone;
ALTER TABLE public.question_reports ADD COLUMN IF NOT EXISTS reporter_id uuid DEFAULT auth.uid();
ALTER TABLE public.question_reports ALTER COLUMN id SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.questions (
  id text NOT NULL,
  subject_id text NOT NULL,
  chapter_id text,
  grade smallint NOT NULL,
  difficulty smallint DEFAULT 1 NOT NULL,
  is_past_paper boolean DEFAULT false NOT NULL,
  data jsonb NOT NULL,
  imported_at timestamp with time zone DEFAULT now(),
  protected boolean DEFAULT false NOT NULL
);
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS id text;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS subject_id text;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS chapter_id text;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS grade smallint;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS difficulty smallint DEFAULT 1;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS is_past_paper boolean DEFAULT false;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS data jsonb;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS imported_at timestamp with time zone DEFAULT now();
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS protected boolean DEFAULT false;
ALTER TABLE public.questions ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.questions ALTER COLUMN subject_id SET NOT NULL;
ALTER TABLE public.questions ALTER COLUMN grade SET NOT NULL;
ALTER TABLE public.questions ALTER COLUMN difficulty SET NOT NULL;
ALTER TABLE public.questions ALTER COLUMN is_past_paper SET NOT NULL;
ALTER TABLE public.questions ALTER COLUMN data SET NOT NULL;
ALTER TABLE public.questions ALTER COLUMN protected SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  referrer_id uuid NOT NULL,
  referred_id uuid NOT NULL,
  status text DEFAULT 'joined'::text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  activated_at timestamp with time zone,
  credits_awarded integer DEFAULT 0 NOT NULL
);
ALTER TABLE public.referrals ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.referrals ADD COLUMN IF NOT EXISTS referrer_id uuid;
ALTER TABLE public.referrals ADD COLUMN IF NOT EXISTS referred_id uuid;
ALTER TABLE public.referrals ADD COLUMN IF NOT EXISTS status text DEFAULT 'joined'::text;
ALTER TABLE public.referrals ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.referrals ADD COLUMN IF NOT EXISTS activated_at timestamp with time zone;
ALTER TABLE public.referrals ADD COLUMN IF NOT EXISTS credits_awarded integer DEFAULT 0;
ALTER TABLE public.referrals ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.referrals ALTER COLUMN referrer_id SET NOT NULL;
ALTER TABLE public.referrals ALTER COLUMN referred_id SET NOT NULL;
ALTER TABLE public.referrals ALTER COLUMN status SET NOT NULL;
ALTER TABLE public.referrals ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.referrals ALTER COLUMN credits_awarded SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.schedule_entries (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  schedule_id uuid NOT NULL,
  student_id text NOT NULL,
  date date NOT NULL,
  chapter_id text,
  topic_label text NOT NULL,
  duration_mins integer,
  entry_type text DEFAULT 'study'::text,
  notes text,
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  subject_id text
);
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS schedule_id uuid;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS student_id text;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS date date;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS chapter_id text;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS topic_label text;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS duration_mins integer;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS entry_type text DEFAULT 'study'::text;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS completed boolean DEFAULT false;
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.schedule_entries ADD COLUMN IF NOT EXISTS subject_id text;
ALTER TABLE public.schedule_entries ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.schedule_entries ALTER COLUMN schedule_id SET NOT NULL;
ALTER TABLE public.schedule_entries ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.schedule_entries ALTER COLUMN date SET NOT NULL;
ALTER TABLE public.schedule_entries ALTER COLUMN topic_label SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.security_events (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid,
  student_id uuid,
  kind text NOT NULL,
  detail jsonb DEFAULT '{}'::jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.security_events ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.security_events ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.security_events ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.security_events ADD COLUMN IF NOT EXISTS kind text;
ALTER TABLE public.security_events ADD COLUMN IF NOT EXISTS detail jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.security_events ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.security_events ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.security_events ALTER COLUMN kind SET NOT NULL;
ALTER TABLE public.security_events ALTER COLUMN detail SET NOT NULL;
ALTER TABLE public.security_events ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.student_assignments (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id text NOT NULL,
  parent_id uuid,
  subject_id text,
  chapter_id text,
  difficulty integer,
  note text,
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  show_answers boolean DEFAULT true NOT NULL,
  source_type text DEFAULT 'parent'::text,
  classroom_id uuid,
  due_date date,
  show_hints boolean DEFAULT true NOT NULL
);
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS student_id text;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS parent_id uuid;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS subject_id text;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS chapter_id text;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS difficulty integer;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS note text;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS completed_at timestamp with time zone;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS show_answers boolean DEFAULT true;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS source_type text DEFAULT 'parent'::text;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS due_date date;
ALTER TABLE public.student_assignments ADD COLUMN IF NOT EXISTS show_hints boolean DEFAULT true;
ALTER TABLE public.student_assignments ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.student_assignments ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.student_assignments ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.student_assignments ALTER COLUMN show_answers SET NOT NULL;
ALTER TABLE public.student_assignments ALTER COLUMN show_hints SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.student_friends (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id_a uuid NOT NULL,
  student_id_b uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.student_friends ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.student_friends ADD COLUMN IF NOT EXISTS student_id_a uuid;
ALTER TABLE public.student_friends ADD COLUMN IF NOT EXISTS student_id_b uuid;
ALTER TABLE public.student_friends ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_friends ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.student_friends ALTER COLUMN student_id_a SET NOT NULL;
ALTER TABLE public.student_friends ALTER COLUMN student_id_b SET NOT NULL;
ALTER TABLE public.student_friends ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.student_invites (
  token_hash text NOT NULL,
  student_id uuid NOT NULL,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  used_at timestamp with time zone
);
ALTER TABLE public.student_invites ADD COLUMN IF NOT EXISTS token_hash text;
ALTER TABLE public.student_invites ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.student_invites ADD COLUMN IF NOT EXISTS created_by uuid;
ALTER TABLE public.student_invites ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_invites ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.student_invites ADD COLUMN IF NOT EXISTS used_at timestamp with time zone;
ALTER TABLE public.student_invites ALTER COLUMN token_hash SET NOT NULL;
ALTER TABLE public.student_invites ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.student_invites ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.student_invites ALTER COLUMN expires_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.student_point_events (
  id bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  student_id uuid NOT NULL,
  kind text NOT NULL,
  ref text NOT NULL,
  points integer NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.student_point_events ADD COLUMN IF NOT EXISTS id bigint GENERATED BY DEFAULT AS IDENTITY;
ALTER TABLE public.student_point_events ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.student_point_events ADD COLUMN IF NOT EXISTS kind text;
ALTER TABLE public.student_point_events ADD COLUMN IF NOT EXISTS ref text;
ALTER TABLE public.student_point_events ADD COLUMN IF NOT EXISTS points integer;
ALTER TABLE public.student_point_events ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_point_events ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.student_point_events ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.student_point_events ALTER COLUMN kind SET NOT NULL;
ALTER TABLE public.student_point_events ALTER COLUMN ref SET NOT NULL;
ALTER TABLE public.student_point_events ALTER COLUMN points SET NOT NULL;
ALTER TABLE public.student_point_events ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.student_points (
  student_id uuid NOT NULL,
  points bigint DEFAULT 0 NOT NULL,
  legacy_bonus integer DEFAULT 0 NOT NULL,
  level smallint DEFAULT 1 NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.student_points ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.student_points ADD COLUMN IF NOT EXISTS points bigint DEFAULT 0;
ALTER TABLE public.student_points ADD COLUMN IF NOT EXISTS legacy_bonus integer DEFAULT 0;
ALTER TABLE public.student_points ADD COLUMN IF NOT EXISTS level smallint DEFAULT 1;
ALTER TABLE public.student_points ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_points ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.student_points ALTER COLUMN points SET NOT NULL;
ALTER TABLE public.student_points ALTER COLUMN legacy_bonus SET NOT NULL;
ALTER TABLE public.student_points ALTER COLUMN level SET NOT NULL;
ALTER TABLE public.student_points ALTER COLUMN updated_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.student_progress (
  student_id text NOT NULL,
  data jsonb DEFAULT '{}'::jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.student_progress ADD COLUMN IF NOT EXISTS student_id text;
ALTER TABLE public.student_progress ADD COLUMN IF NOT EXISTS data jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.student_progress ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_progress ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.student_progress ALTER COLUMN data SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.student_question_progress (
  student_id uuid NOT NULL,
  question_id text NOT NULL,
  subject_pack_id text,
  chapter_id text NOT NULL,
  first_seen_at timestamp with time zone DEFAULT now() NOT NULL,
  last_seen_at timestamp with time zone DEFAULT now() NOT NULL,
  attempts integer DEFAULT 0 NOT NULL,
  correct_attempts integer DEFAULT 0 NOT NULL,
  wrong_attempts integer DEFAULT 0 NOT NULL,
  consecutive_correct integer DEFAULT 0 NOT NULL,
  last_result text,
  ever_wrong boolean DEFAULT false NOT NULL,
  recovered_at timestamp with time zone,
  state text DEFAULT 'not_tried'::text NOT NULL,
  last_event_key text,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS question_id text;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS subject_pack_id text;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS chapter_id text;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS first_seen_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS last_seen_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS attempts integer DEFAULT 0;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS correct_attempts integer DEFAULT 0;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS wrong_attempts integer DEFAULT 0;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS consecutive_correct integer DEFAULT 0;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS last_result text;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS ever_wrong boolean DEFAULT false;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS recovered_at timestamp with time zone;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS state text DEFAULT 'not_tried'::text;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS last_event_key text;
ALTER TABLE public.student_question_progress ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_question_progress ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN question_id SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN chapter_id SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN first_seen_at SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN last_seen_at SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN attempts SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN correct_attempts SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN wrong_attempts SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN consecutive_correct SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN ever_wrong SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN state SET NOT NULL;
ALTER TABLE public.student_question_progress ALTER COLUMN updated_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.student_sessions (
  token_hash text NOT NULL,
  student_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  user_agent text
);
ALTER TABLE public.student_sessions ADD COLUMN IF NOT EXISTS token_hash text;
ALTER TABLE public.student_sessions ADD COLUMN IF NOT EXISTS student_id uuid;
ALTER TABLE public.student_sessions ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.student_sessions ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.student_sessions ADD COLUMN IF NOT EXISTS user_agent text;
ALTER TABLE public.student_sessions ALTER COLUMN token_hash SET NOT NULL;
ALTER TABLE public.student_sessions ALTER COLUMN student_id SET NOT NULL;
ALTER TABLE public.student_sessions ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.student_sessions ALTER COLUMN expires_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.students (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  family_id uuid NOT NULL,
  username text NOT NULL,
  display_name text NOT NULL,
  avatar text DEFAULT '??'::text NOT NULL,
  grade integer DEFAULT 5 NOT NULL,
  pin text NOT NULL,
  settings jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  session_version integer DEFAULT 0 NOT NULL,
  expires_at timestamp with time zone,
  pin_hash text,
  pin_attempts integer DEFAULT 0 NOT NULL,
  pin_locked_until timestamp with time zone,
  deleted_at timestamp with time zone,
  friend_code text
);
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS family_id uuid;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS username text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS avatar text DEFAULT '??'::text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS grade integer DEFAULT 5;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS pin text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS settings jsonb;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS session_version integer DEFAULT 0;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS pin_hash text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS pin_attempts integer DEFAULT 0;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS pin_locked_until timestamp with time zone;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS friend_code text;
ALTER TABLE public.students ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN family_id SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN username SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN display_name SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN avatar SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN grade SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN pin SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN settings SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN session_version SET NOT NULL;
ALTER TABLE public.students ALTER COLUMN pin_attempts SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.study_schedules (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id text NOT NULL,
  parent_id uuid,
  settings jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE public.study_schedules ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.study_schedules ADD COLUMN IF NOT EXISTS student_id text;
ALTER TABLE public.study_schedules ADD COLUMN IF NOT EXISTS parent_id uuid;
ALTER TABLE public.study_schedules ADD COLUMN IF NOT EXISTS settings jsonb;
ALTER TABLE public.study_schedules ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.study_schedules ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();
ALTER TABLE public.study_schedules ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.study_schedules ALTER COLUMN student_id SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  plan_id text NOT NULL,
  status text DEFAULT 'active'::text NOT NULL,
  started_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS plan_id text;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS status text DEFAULT 'active'::text;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS started_at timestamp with time zone DEFAULT now();
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.subscriptions ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.subscriptions ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.subscriptions ALTER COLUMN plan_id SET NOT NULL;
ALTER TABLE public.subscriptions ALTER COLUMN status SET NOT NULL;
ALTER TABLE public.subscriptions ALTER COLUMN started_at SET NOT NULL;
ALTER TABLE public.subscriptions ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.teacher_guest_access (
  assignment_id uuid NOT NULL,
  mode text NOT NULL,
  classroom_id uuid
);
ALTER TABLE public.teacher_guest_access ADD COLUMN IF NOT EXISTS assignment_id uuid;
ALTER TABLE public.teacher_guest_access ADD COLUMN IF NOT EXISTS mode text;
ALTER TABLE public.teacher_guest_access ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.teacher_guest_access ALTER COLUMN assignment_id SET NOT NULL;
ALTER TABLE public.teacher_guest_access ALTER COLUMN mode SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.teacher_guest_archives (
  assignment_id uuid NOT NULL,
  previous_status text NOT NULL,
  archived_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.teacher_guest_archives ADD COLUMN IF NOT EXISTS assignment_id uuid;
ALTER TABLE public.teacher_guest_archives ADD COLUMN IF NOT EXISTS previous_status text;
ALTER TABLE public.teacher_guest_archives ADD COLUMN IF NOT EXISTS archived_at timestamp with time zone DEFAULT now();
ALTER TABLE public.teacher_guest_archives ALTER COLUMN assignment_id SET NOT NULL;
ALTER TABLE public.teacher_guest_archives ALTER COLUMN previous_status SET NOT NULL;
ALTER TABLE public.teacher_guest_archives ALTER COLUMN archived_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.teacher_guest_classes (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  teacher_id uuid NOT NULL,
  name text NOT NULL,
  active boolean DEFAULT true NOT NULL,
  secret text DEFAULT encode(gen_random_bytes(32), 'hex'::text) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  deleted_at timestamp with time zone,
  access_type text DEFAULT 'per_student'::text NOT NULL,
  expected_students integer DEFAULT 25 NOT NULL,
  class_pin_cipher bytea,
  class_pin_lookup text,
  grade smallint
);
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS teacher_id uuid;
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS secret text DEFAULT encode(gen_random_bytes(32), 'hex'::text);
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS access_type text DEFAULT 'per_student'::text;
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS expected_students integer DEFAULT 25;
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS class_pin_cipher bytea;
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS class_pin_lookup text;
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS grade smallint;
ALTER TABLE public.teacher_guest_classes ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.teacher_guest_classes ALTER COLUMN teacher_id SET NOT NULL;
ALTER TABLE public.teacher_guest_classes ALTER COLUMN name SET NOT NULL;
ALTER TABLE public.teacher_guest_classes ALTER COLUMN active SET NOT NULL;
ALTER TABLE public.teacher_guest_classes ALTER COLUMN secret SET NOT NULL;
ALTER TABLE public.teacher_guest_classes ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.teacher_guest_classes ALTER COLUMN access_type SET NOT NULL;
ALTER TABLE public.teacher_guest_classes ALTER COLUMN expected_students SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.teacher_guest_devices (
  classroom_id uuid NOT NULL,
  device_code text NOT NULL,
  name_display text NOT NULL,
  name_key text NOT NULL,
  first_seen_at timestamp with time zone DEFAULT now() NOT NULL,
  last_seen_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.teacher_guest_devices ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.teacher_guest_devices ADD COLUMN IF NOT EXISTS device_code text;
ALTER TABLE public.teacher_guest_devices ADD COLUMN IF NOT EXISTS name_display text;
ALTER TABLE public.teacher_guest_devices ADD COLUMN IF NOT EXISTS name_key text;
ALTER TABLE public.teacher_guest_devices ADD COLUMN IF NOT EXISTS first_seen_at timestamp with time zone DEFAULT now();
ALTER TABLE public.teacher_guest_devices ADD COLUMN IF NOT EXISTS last_seen_at timestamp with time zone DEFAULT now();
ALTER TABLE public.teacher_guest_devices ALTER COLUMN classroom_id SET NOT NULL;
ALTER TABLE public.teacher_guest_devices ALTER COLUMN device_code SET NOT NULL;
ALTER TABLE public.teacher_guest_devices ALTER COLUMN name_display SET NOT NULL;
ALTER TABLE public.teacher_guest_devices ALTER COLUMN name_key SET NOT NULL;
ALTER TABLE public.teacher_guest_devices ALTER COLUMN first_seen_at SET NOT NULL;
ALTER TABLE public.teacher_guest_devices ALTER COLUMN last_seen_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.teacher_guest_pupil_names (
  id bigint DEFAULT nextval('teacher_guest_pupil_names_id_seq'::regclass) NOT NULL,
  pupil_id uuid NOT NULL,
  old_name text,
  new_name text NOT NULL,
  changed_by text NOT NULL,
  changed_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.teacher_guest_pupil_names ADD COLUMN IF NOT EXISTS id bigint DEFAULT nextval('teacher_guest_pupil_names_id_seq'::regclass);
ALTER TABLE public.teacher_guest_pupil_names ADD COLUMN IF NOT EXISTS pupil_id uuid;
ALTER TABLE public.teacher_guest_pupil_names ADD COLUMN IF NOT EXISTS old_name text;
ALTER TABLE public.teacher_guest_pupil_names ADD COLUMN IF NOT EXISTS new_name text;
ALTER TABLE public.teacher_guest_pupil_names ADD COLUMN IF NOT EXISTS changed_by text;
ALTER TABLE public.teacher_guest_pupil_names ADD COLUMN IF NOT EXISTS changed_at timestamp with time zone DEFAULT now();
ALTER TABLE public.teacher_guest_pupil_names ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.teacher_guest_pupil_names ALTER COLUMN pupil_id SET NOT NULL;
ALTER TABLE public.teacher_guest_pupil_names ALTER COLUMN new_name SET NOT NULL;
ALTER TABLE public.teacher_guest_pupil_names ALTER COLUMN changed_by SET NOT NULL;
ALTER TABLE public.teacher_guest_pupil_names ALTER COLUMN changed_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.teacher_guest_pupils (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  classroom_id uuid NOT NULL,
  name text NOT NULL,
  active boolean DEFAULT true NOT NULL,
  pin_cipher bytea NOT NULL,
  pin_lookup text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.teacher_guest_pupils ADD COLUMN IF NOT EXISTS id uuid DEFAULT gen_random_uuid();
ALTER TABLE public.teacher_guest_pupils ADD COLUMN IF NOT EXISTS classroom_id uuid;
ALTER TABLE public.teacher_guest_pupils ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE public.teacher_guest_pupils ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;
ALTER TABLE public.teacher_guest_pupils ADD COLUMN IF NOT EXISTS pin_cipher bytea;
ALTER TABLE public.teacher_guest_pupils ADD COLUMN IF NOT EXISTS pin_lookup text;
ALTER TABLE public.teacher_guest_pupils ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
ALTER TABLE public.teacher_guest_pupils ALTER COLUMN id SET NOT NULL;
ALTER TABLE public.teacher_guest_pupils ALTER COLUMN classroom_id SET NOT NULL;
ALTER TABLE public.teacher_guest_pupils ALTER COLUMN name SET NOT NULL;
ALTER TABLE public.teacher_guest_pupils ALTER COLUMN active SET NOT NULL;
ALTER TABLE public.teacher_guest_pupils ALTER COLUMN pin_cipher SET NOT NULL;
ALTER TABLE public.teacher_guest_pupils ALTER COLUMN pin_lookup SET NOT NULL;
ALTER TABLE public.teacher_guest_pupils ALTER COLUMN created_at SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.teacher_guest_roster (
  assignment_id uuid NOT NULL,
  pupil_id uuid NOT NULL
);
ALTER TABLE public.teacher_guest_roster ADD COLUMN IF NOT EXISTS assignment_id uuid;
ALTER TABLE public.teacher_guest_roster ADD COLUMN IF NOT EXISTS pupil_id uuid;
ALTER TABLE public.teacher_guest_roster ALTER COLUMN assignment_id SET NOT NULL;
ALTER TABLE public.teacher_guest_roster ALTER COLUMN pupil_id SET NOT NULL;

CREATE TABLE IF NOT EXISTS public.teacher_guest_throttle (
  assignment_id uuid NOT NULL,
  source text NOT NULL,
  attempts integer DEFAULT 0 NOT NULL,
  since timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.teacher_guest_throttle ADD COLUMN IF NOT EXISTS assignment_id uuid;
ALTER TABLE public.teacher_guest_throttle ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE public.teacher_guest_throttle ADD COLUMN IF NOT EXISTS attempts integer DEFAULT 0;
ALTER TABLE public.teacher_guest_throttle ADD COLUMN IF NOT EXISTS since timestamp with time zone DEFAULT now();
ALTER TABLE public.teacher_guest_throttle ALTER COLUMN assignment_id SET NOT NULL;
ALTER TABLE public.teacher_guest_throttle ALTER COLUMN source SET NOT NULL;
ALTER TABLE public.teacher_guest_throttle ALTER COLUMN attempts SET NOT NULL;
ALTER TABLE public.teacher_guest_throttle ALTER COLUMN since SET NOT NULL;


-- ═══ 2b · SEQUENCE OWNERSHIP ══════════════════════════════════════════════════
-- Re-attaches each sequence to the column it feeds, so dropping the table
-- drops the sequence too. Cannot run in §2a: the table does not exist yet.
ALTER SEQUENCE public.teacher_guest_pupil_names_id_seq OWNED BY public.teacher_guest_pupil_names.id;


-- ═══ 3 · CONSTRAINTS ══════════════════════════════════════════════════════════
-- ⚠ ORDERED BY KIND ACROSS ALL TABLES, NOT BY TABLE: every primary key and
--   unique first, then checks, then every foreign key. A foreign key needs a
--   unique constraint ALREADY on the table it points at, so grouping these per
--   table fails on a fresh build the moment two tables reference each other in
--   alphabetical order — assignment_submissions → student_assignments dies with
--   "there is no unique constraint matching given keys for referenced table".
--   Measured on postgres:17-alpine; the live database cannot show this, because
--   there every target key already exists.
--
-- PostgreSQL has no ADD CONSTRAINT IF NOT EXISTS, so each is guarded by an
-- explicit pg_constraint lookup rather than by catching the exception — a
-- catch-all would swallow genuine errors like the one above and report success.

-- ── PRIMARY KEYS
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'assignment_submissions_pkey'
                    AND conrelid = 'assignment_submissions'::regclass) THEN
    ALTER TABLE assignment_submissions ADD CONSTRAINT assignment_submissions_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'chapter_entitlements_pkey'
                    AND conrelid = 'chapter_entitlements'::regclass) THEN
    ALTER TABLE chapter_entitlements ADD CONSTRAINT chapter_entitlements_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_materials_pkey'
                    AND conrelid = 'classroom_materials'::regclass) THEN
    ALTER TABLE classroom_materials ADD CONSTRAINT classroom_materials_pkey PRIMARY KEY (material_id, classroom_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_pin_attempts_pkey'
                    AND conrelid = 'classroom_pin_attempts'::regclass) THEN
    ALTER TABLE classroom_pin_attempts ADD CONSTRAINT classroom_pin_attempts_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_post_refs_pkey'
                    AND conrelid = 'classroom_post_refs'::regclass) THEN
    ALTER TABLE classroom_post_refs ADD CONSTRAINT classroom_post_refs_pkey PRIMARY KEY (post_id, classroom_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_posts_pkey'
                    AND conrelid = 'classroom_posts'::regclass) THEN
    ALTER TABLE classroom_posts ADD CONSTRAINT classroom_posts_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_sessions_pkey'
                    AND conrelid = 'classroom_sessions'::regclass) THEN
    ALTER TABLE classroom_sessions ADD CONSTRAINT classroom_sessions_pkey PRIMARY KEY (token);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classrooms_pkey'
                    AND conrelid = 'classrooms'::regclass) THEN
    ALTER TABLE classrooms ADD CONSTRAINT classrooms_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'credit_ledger_pkey'
                    AND conrelid = 'credit_ledger'::regclass) THEN
    ALTER TABLE credit_ledger ADD CONSTRAINT credit_ledger_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'enrollments_pkey'
                    AND conrelid = 'enrollments'::regclass) THEN
    ALTER TABLE enrollments ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'families_pkey'
                    AND conrelid = 'families'::regclass) THEN
    ALTER TABLE families ADD CONSTRAINT families_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_invites_pkey'
                    AND conrelid = 'family_invites'::regclass) THEN
    ALTER TABLE family_invites ADD CONSTRAINT family_invites_pkey PRIMARY KEY (token_hash);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_members_pkey'
                    AND conrelid = 'family_members'::regclass) THEN
    ALTER TABLE family_members ADD CONSTRAINT family_members_pkey PRIMARY KEY (family_id, user_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'forum_posts_pkey'
                    AND conrelid = 'forum_posts'::regclass) THEN
    ALTER TABLE forum_posts ADD CONSTRAINT forum_posts_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'forum_replies_pkey'
                    AND conrelid = 'forum_replies'::regclass) THEN
    ALTER TABLE forum_replies ADD CONSTRAINT forum_replies_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignment_attempts_pkey'
                    AND conrelid = 'guest_assignment_attempts'::regclass) THEN
    ALTER TABLE guest_assignment_attempts ADD CONSTRAINT guest_assignment_attempts_pkey PRIMARY KEY (assignment_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignments_pkey'
                    AND conrelid = 'guest_assignments'::regclass) THEN
    ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_material_completions_pkey'
                    AND conrelid = 'guest_material_completions'::regclass) THEN
    ALTER TABLE guest_material_completions ADD CONSTRAINT guest_material_completions_pkey PRIMARY KEY (material_id, name_key);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_pin_attempts_pkey'
                    AND conrelid = 'guest_pin_attempts'::regclass) THEN
    ALTER TABLE guest_pin_attempts ADD CONSTRAINT guest_pin_attempts_pkey PRIMARY KEY (assignment_id, name_key);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_submissions_pkey'
                    AND conrelid = 'guest_submissions'::regclass) THEN
    ALTER TABLE guest_submissions ADD CONSTRAINT guest_submissions_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'learning_materials_pkey'
                    AND conrelid = 'learning_materials'::regclass) THEN
    ALTER TABLE learning_materials ADD CONSTRAINT learning_materials_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'login_events_pkey'
                    AND conrelid = 'login_events'::regclass) THEN
    ALTER TABLE login_events ADD CONSTRAINT login_events_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'minigame_polls_pkey'
                    AND conrelid = 'minigame_polls'::regclass) THEN
    ALTER TABLE minigame_polls ADD CONSTRAINT minigame_polls_pkey PRIMARY KEY (code);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'mm_data_pkey'
                    AND conrelid = 'mm_data'::regclass) THEN
    ALTER TABLE mm_data ADD CONSTRAINT mm_data_pkey PRIMARY KEY (key);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'parent_pin_attempts_pkey'
                    AND conrelid = 'parent_pin_attempts'::regclass) THEN
    ALTER TABLE parent_pin_attempts ADD CONSTRAINT parent_pin_attempts_pkey PRIMARY KEY (user_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'payments_pkey'
                    AND conrelid = 'payments'::regclass) THEN
    ALTER TABLE payments ADD CONSTRAINT payments_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'physical_homework_pkey'
                    AND conrelid = 'physical_homework'::regclass) THEN
    ALTER TABLE physical_homework ADD CONSTRAINT physical_homework_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'plans_pkey'
                    AND conrelid = 'plans'::regclass) THEN
    ALTER TABLE plans ADD CONSTRAINT plans_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_pkey'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'push_subscriptions_pkey'
                    AND conrelid = 'push_subscriptions'::regclass) THEN
    ALTER TABLE push_subscriptions ADD CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_report_messages_pkey'
                    AND conrelid = 'question_report_messages'::regclass) THEN
    ALTER TABLE question_report_messages ADD CONSTRAINT question_report_messages_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_reports_pkey'
                    AND conrelid = 'question_reports'::regclass) THEN
    ALTER TABLE question_reports ADD CONSTRAINT question_reports_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'questions_pkey'
                    AND conrelid = 'questions'::regclass) THEN
    ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'referrals_pkey'
                    AND conrelid = 'referrals'::regclass) THEN
    ALTER TABLE referrals ADD CONSTRAINT referrals_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'schedule_entries_pkey'
                    AND conrelid = 'schedule_entries'::regclass) THEN
    ALTER TABLE schedule_entries ADD CONSTRAINT schedule_entries_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'security_events_pkey'
                    AND conrelid = 'security_events'::regclass) THEN
    ALTER TABLE security_events ADD CONSTRAINT security_events_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_assignments_pkey'
                    AND conrelid = 'student_assignments'::regclass) THEN
    ALTER TABLE student_assignments ADD CONSTRAINT student_assignments_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_friends_pkey'
                    AND conrelid = 'student_friends'::regclass) THEN
    ALTER TABLE student_friends ADD CONSTRAINT student_friends_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_invites_pkey'
                    AND conrelid = 'student_invites'::regclass) THEN
    ALTER TABLE student_invites ADD CONSTRAINT student_invites_pkey PRIMARY KEY (token_hash);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_point_events_pkey'
                    AND conrelid = 'student_point_events'::regclass) THEN
    ALTER TABLE student_point_events ADD CONSTRAINT student_point_events_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_points_pkey'
                    AND conrelid = 'student_points'::regclass) THEN
    ALTER TABLE student_points ADD CONSTRAINT student_points_pkey PRIMARY KEY (student_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_progress_pkey'
                    AND conrelid = 'student_progress'::regclass) THEN
    ALTER TABLE student_progress ADD CONSTRAINT student_progress_pkey PRIMARY KEY (student_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_question_progress_pkey'
                    AND conrelid = 'student_question_progress'::regclass) THEN
    ALTER TABLE student_question_progress ADD CONSTRAINT student_question_progress_pkey PRIMARY KEY (student_id, question_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_sessions_pkey'
                    AND conrelid = 'student_sessions'::regclass) THEN
    ALTER TABLE student_sessions ADD CONSTRAINT student_sessions_pkey PRIMARY KEY (token_hash);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'students_pkey'
                    AND conrelid = 'students'::regclass) THEN
    ALTER TABLE students ADD CONSTRAINT students_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'study_schedules_pkey'
                    AND conrelid = 'study_schedules'::regclass) THEN
    ALTER TABLE study_schedules ADD CONSTRAINT study_schedules_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'subscriptions_pkey'
                    AND conrelid = 'subscriptions'::regclass) THEN
    ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_access_pkey'
                    AND conrelid = 'teacher_guest_access'::regclass) THEN
    ALTER TABLE teacher_guest_access ADD CONSTRAINT teacher_guest_access_pkey PRIMARY KEY (assignment_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_archives_pkey'
                    AND conrelid = 'teacher_guest_archives'::regclass) THEN
    ALTER TABLE teacher_guest_archives ADD CONSTRAINT teacher_guest_archives_pkey PRIMARY KEY (assignment_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_classes_pkey'
                    AND conrelid = 'teacher_guest_classes'::regclass) THEN
    ALTER TABLE teacher_guest_classes ADD CONSTRAINT teacher_guest_classes_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_devices_pkey'
                    AND conrelid = 'teacher_guest_devices'::regclass) THEN
    ALTER TABLE teacher_guest_devices ADD CONSTRAINT teacher_guest_devices_pkey PRIMARY KEY (classroom_id, device_code);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_pupil_names_pkey'
                    AND conrelid = 'teacher_guest_pupil_names'::regclass) THEN
    ALTER TABLE teacher_guest_pupil_names ADD CONSTRAINT teacher_guest_pupil_names_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_pupils_pkey'
                    AND conrelid = 'teacher_guest_pupils'::regclass) THEN
    ALTER TABLE teacher_guest_pupils ADD CONSTRAINT teacher_guest_pupils_pkey PRIMARY KEY (id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_roster_pkey'
                    AND conrelid = 'teacher_guest_roster'::regclass) THEN
    ALTER TABLE teacher_guest_roster ADD CONSTRAINT teacher_guest_roster_pkey PRIMARY KEY (assignment_id, pupil_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_throttle_pkey'
                    AND conrelid = 'teacher_guest_throttle'::regclass) THEN
    ALTER TABLE teacher_guest_throttle ADD CONSTRAINT teacher_guest_throttle_pkey PRIMARY KEY (assignment_id, source);
  END IF;
END $$;

-- ── UNIQUE CONSTRAINTS
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classrooms_invite_code_key'
                    AND conrelid = 'classrooms'::regclass) THEN
    ALTER TABLE classrooms ADD CONSTRAINT classrooms_invite_code_key UNIQUE (invite_code);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'enrollments_student_id_classroom_id_key'
                    AND conrelid = 'enrollments'::regclass) THEN
    ALTER TABLE enrollments ADD CONSTRAINT enrollments_student_id_classroom_id_key UNIQUE (student_id, classroom_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'families_family_code_key'
                    AND conrelid = 'families'::regclass) THEN
    ALTER TABLE families ADD CONSTRAINT families_family_code_key UNIQUE (family_code);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'families_parent_id_key'
                    AND conrelid = 'families'::regclass) THEN
    ALTER TABLE families ADD CONSTRAINT families_parent_id_key UNIQUE (parent_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignments_code_key'
                    AND conrelid = 'guest_assignments'::regclass) THEN
    ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_code_key UNIQUE (code);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_submissions_assignment_id_name_key_key'
                    AND conrelid = 'guest_submissions'::regclass) THEN
    ALTER TABLE guest_submissions ADD CONSTRAINT guest_submissions_assignment_id_name_key_key UNIQUE (assignment_id, name_key);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_referral_code_key'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_referral_code_key UNIQUE (referral_code);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'push_subscriptions_student_id_key'
                    AND conrelid = 'push_subscriptions'::regclass) THEN
    ALTER TABLE push_subscriptions ADD CONSTRAINT push_subscriptions_student_id_key UNIQUE (student_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'referrals_referred_id_key'
                    AND conrelid = 'referrals'::regclass) THEN
    ALTER TABLE referrals ADD CONSTRAINT referrals_referred_id_key UNIQUE (referred_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_friends_unique'
                    AND conrelid = 'student_friends'::regclass) THEN
    ALTER TABLE student_friends ADD CONSTRAINT student_friends_unique UNIQUE (student_id_a, student_id_b);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_point_events_unique'
                    AND conrelid = 'student_point_events'::regclass) THEN
    ALTER TABLE student_point_events ADD CONSTRAINT student_point_events_unique UNIQUE (student_id, kind, ref);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'students_friend_code_key'
                    AND conrelid = 'students'::regclass) THEN
    ALTER TABLE students ADD CONSTRAINT students_friend_code_key UNIQUE (friend_code);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_pupils_classroom_id_pin_lookup_key'
                    AND conrelid = 'teacher_guest_pupils'::regclass) THEN
    ALTER TABLE teacher_guest_pupils ADD CONSTRAINT teacher_guest_pupils_classroom_id_pin_lookup_key UNIQUE (classroom_id, pin_lookup);
  END IF;
END $$;

-- ── CHECK CONSTRAINTS
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_posts_body_check'
                    AND conrelid = 'classroom_posts'::regclass) THEN
    ALTER TABLE classroom_posts ADD CONSTRAINT classroom_posts_body_check CHECK ((length(body) <= 2000));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_posts_title_check'
                    AND conrelid = 'classroom_posts'::regclass) THEN
    ALTER TABLE classroom_posts ADD CONSTRAINT classroom_posts_title_check CHECK (((length(title) >= 1) AND (length(title) <= 120)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_posts_type_check'
                    AND conrelid = 'classroom_posts'::regclass) THEN
    ALTER TABLE classroom_posts ADD CONSTRAINT classroom_posts_type_check CHECK ((type = ANY (ARRAY['note'::text, 'file'::text, 'youtube'::text, 'announcement'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classrooms_grade_level_check'
                    AND conrelid = 'classrooms'::regclass) THEN
    ALTER TABLE classrooms ADD CONSTRAINT classrooms_grade_level_check CHECK (((grade_level IS NULL) OR ((grade_level >= 1) AND (grade_level <= 9))));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_members_role_chk'
                    AND conrelid = 'family_members'::regclass) THEN
    ALTER TABLE family_members ADD CONSTRAINT family_members_role_chk CHECK ((role = ANY (ARRAY['owner'::text, 'coparent'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'forum_posts_body_len_ck'
                    AND conrelid = 'forum_posts'::regclass) THEN
    ALTER TABLE forum_posts ADD CONSTRAINT forum_posts_body_len_ck CHECK (((body IS NULL) OR (length(body) <= 5000)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'forum_posts_category_check'
                    AND conrelid = 'forum_posts'::regclass) THEN
    ALTER TABLE forum_posts ADD CONSTRAINT forum_posts_category_check CHECK ((category = ANY (ARRAY['general'::text, 'maths'::text, 'english'::text, 'science'::text, 'french'::text, 'history'::text, 'tips'::text, 'suggest'::text, 'report'::text, 'announce'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'forum_posts_status_check'
                    AND conrelid = 'forum_posts'::regclass) THEN
    ALTER TABLE forum_posts ADD CONSTRAINT forum_posts_status_check CHECK ((status = ANY (ARRAY['open'::text, 'closed'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'forum_posts_title_len_ck'
                    AND conrelid = 'forum_posts'::regclass) THEN
    ALTER TABLE forum_posts ADD CONSTRAINT forum_posts_title_len_ck CHECK (((title IS NULL) OR (length(title) <= 200)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'forum_replies_body_len_ck'
                    AND conrelid = 'forum_replies'::regclass) THEN
    ALTER TABLE forum_replies ADD CONSTRAINT forum_replies_body_len_ck CHECK (((body IS NULL) OR (length(body) <= 5000)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignments_classroom_label_len_ck'
                    AND conrelid = 'guest_assignments'::regclass) THEN
    ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_classroom_label_len_ck CHECK (((classroom_label IS NULL) OR (length(classroom_label) <= 120)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignments_status_chk'
                    AND conrelid = 'guest_assignments'::regclass) THEN
    ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_status_chk CHECK ((status = ANY (ARRAY['active'::text, 'closed'::text, 'expired'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignments_teacher_label_len_ck'
                    AND conrelid = 'guest_assignments'::regclass) THEN
    ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_teacher_label_len_ck CHECK (((teacher_label IS NULL) OR (length(teacher_label) <= 120)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignments_title_len_ck'
                    AND conrelid = 'guest_assignments'::regclass) THEN
    ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_title_len_ck CHECK (((title IS NULL) OR (length(title) <= 200)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'learning_materials_description_len_ck'
                    AND conrelid = 'learning_materials'::regclass) THEN
    ALTER TABLE learning_materials ADD CONSTRAINT learning_materials_description_len_ck CHECK (((description IS NULL) OR (length(description) <= 500)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'learning_materials_external_url_len_ck'
                    AND conrelid = 'learning_materials'::regclass) THEN
    ALTER TABLE learning_materials ADD CONSTRAINT learning_materials_external_url_len_ck CHECK (((external_url IS NULL) OR (length(external_url) <= 2000)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'learning_materials_file_name_len_ck'
                    AND conrelid = 'learning_materials'::regclass) THEN
    ALTER TABLE learning_materials ADD CONSTRAINT learning_materials_file_name_len_ck CHECK (((file_name IS NULL) OR (length(file_name) <= 260)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'learning_materials_source_ck'
                    AND conrelid = 'learning_materials'::regclass) THEN
    ALTER TABLE learning_materials ADD CONSTRAINT learning_materials_source_ck CHECK ((((source_type = 'file'::text) AND (file_path IS NOT NULL) AND (file_name IS NOT NULL)) OR ((source_type = 'link'::text) AND (external_url IS NOT NULL) AND (external_url ~* '^https?://[^[:space:]]+$'::text))));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'learning_materials_subject_len_ck'
                    AND conrelid = 'learning_materials'::regclass) THEN
    ALTER TABLE learning_materials ADD CONSTRAINT learning_materials_subject_len_ck CHECK (((subject IS NULL) OR (length(subject) <= 60)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'learning_materials_title_len_ck'
                    AND conrelid = 'learning_materials'::regclass) THEN
    ALTER TABLE learning_materials ADD CONSTRAINT learning_materials_title_len_ck CHECK (((title IS NULL) OR (length(title) <= 200)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'payments_status_check'
                    AND conrelid = 'payments'::regclass) THEN
    ALTER TABLE payments ADD CONSTRAINT payments_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'sent'::text, 'confirmed'::text, 'rejected'::text, 'failed'::text, 'completed'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_credits_nonneg'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_credits_nonneg CHECK ((credits >= 0));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_forum_nickname_len'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_forum_nickname_len CHECK ((char_length(forum_nickname) <= 60));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_full_name_len_ck'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_full_name_len_ck CHECK (((full_name IS NULL) OR (length(full_name) <= 120)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_role_check'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK ((role = ANY (ARRAY['parent'::text, 'teacher'::text, 'admin'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_teacher_status_chk'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_teacher_status_chk CHECK ((teacher_status = ANY (ARRAY['none'::text, 'pending'::text, 'approved'::text, 'rejected'::text, 'suspended'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_teacher_tier_chk'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_teacher_tier_chk CHECK ((teacher_tier = ANY (ARRAY['unverified'::text, 'verified'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_report_messages_author_type_check'
                    AND conrelid = 'question_report_messages'::regclass) THEN
    ALTER TABLE question_report_messages ADD CONSTRAINT question_report_messages_author_type_check CHECK ((author_type = ANY (ARRAY['admin'::text, 'student'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'referrals_no_self_chk'
                    AND conrelid = 'referrals'::regclass) THEN
    ALTER TABLE referrals ADD CONSTRAINT referrals_no_self_chk CHECK ((referrer_id <> referred_id));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'referrals_status_chk'
                    AND conrelid = 'referrals'::regclass) THEN
    ALTER TABLE referrals ADD CONSTRAINT referrals_status_chk CHECK ((status = ANY (ARRAY['joined'::text, 'subscribed'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'schedule_entries_entry_type_check'
                    AND conrelid = 'schedule_entries'::regclass) THEN
    ALTER TABLE schedule_entries ADD CONSTRAINT schedule_entries_entry_type_check CHECK ((entry_type = ANY (ARRAY['study'::text, 'exam'::text, 'holiday'::text, 'blocked'::text, 'other'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'schedule_entries_notes_len_ck'
                    AND conrelid = 'schedule_entries'::regclass) THEN
    ALTER TABLE schedule_entries ADD CONSTRAINT schedule_entries_notes_len_ck CHECK (((notes IS NULL) OR (length(notes) <= 1000)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_assignments_source_type_chk'
                    AND conrelid = 'student_assignments'::regclass) THEN
    ALTER TABLE student_assignments ADD CONSTRAINT student_assignments_source_type_chk CHECK ((source_type = ANY (ARRAY['parent'::text, 'teacher'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_friends_order'
                    AND conrelid = 'student_friends'::regclass) THEN
    ALTER TABLE student_friends ADD CONSTRAINT student_friends_order CHECK ((student_id_a < student_id_b));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_question_progress_last_result_check'
                    AND conrelid = 'student_question_progress'::regclass) THEN
    ALTER TABLE student_question_progress ADD CONSTRAINT student_question_progress_last_result_check CHECK (((last_result IS NULL) OR (last_result = ANY (ARRAY['correct'::text, 'wrong'::text, 'unknown'::text]))));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_question_progress_state_check'
                    AND conrelid = 'student_question_progress'::regclass) THEN
    ALTER TABLE student_question_progress ADD CONSTRAINT student_question_progress_state_check CHECK ((state = ANY (ARRAY['not_tried'::text, 'needs_practice'::text, 'improved'::text, 'secure'::text, 'legacy_seen'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'students_display_name_len_ck'
                    AND conrelid = 'students'::regclass) THEN
    ALTER TABLE students ADD CONSTRAINT students_display_name_len_ck CHECK (((display_name IS NULL) OR (length(display_name) <= 80)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'students_username_len_ck'
                    AND conrelid = 'students'::regclass) THEN
    ALTER TABLE students ADD CONSTRAINT students_username_len_ck CHECK (((username IS NULL) OR (length(username) <= 60)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_access_mode_check'
                    AND conrelid = 'teacher_guest_access'::regclass) THEN
    ALTER TABLE teacher_guest_access ADD CONSTRAINT teacher_guest_access_mode_check CHECK ((mode = ANY (ARRAY['classroom_pin'::text, 'nickname'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_pin_needs_class'
                    AND conrelid = 'teacher_guest_access'::regclass) THEN
    ALTER TABLE teacher_guest_access ADD CONSTRAINT teacher_guest_pin_needs_class CHECK (((mode <> 'classroom_pin'::text) OR (classroom_id IS NOT NULL)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_classes_access_type_check'
                    AND conrelid = 'teacher_guest_classes'::regclass) THEN
    ALTER TABLE teacher_guest_classes ADD CONSTRAINT teacher_guest_classes_access_type_check CHECK ((access_type = ANY (ARRAY['per_student'::text, 'shared'::text])));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_classes_grade_range'
                    AND conrelid = 'teacher_guest_classes'::regclass) THEN
    ALTER TABLE teacher_guest_classes ADD CONSTRAINT teacher_guest_classes_grade_range CHECK (((grade IS NULL) OR ((grade >= 1) AND (grade <= 9))));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_classes_name_check'
                    AND conrelid = 'teacher_guest_classes'::regclass) THEN
    ALTER TABLE teacher_guest_classes ADD CONSTRAINT teacher_guest_classes_name_check CHECK (((length(name) >= 1) AND (length(name) <= 80)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_classes_name_len_ck'
                    AND conrelid = 'teacher_guest_classes'::regclass) THEN
    ALTER TABLE teacher_guest_classes ADD CONSTRAINT teacher_guest_classes_name_len_ck CHECK (((name IS NULL) OR (length(name) <= 80)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_devices_code_ck'
                    AND conrelid = 'teacher_guest_devices'::regclass) THEN
    ALTER TABLE teacher_guest_devices ADD CONSTRAINT teacher_guest_devices_code_ck CHECK ((device_code ~ '^[0-9a-f]{32}$'::text));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_devices_name_ck'
                    AND conrelid = 'teacher_guest_devices'::regclass) THEN
    ALTER TABLE teacher_guest_devices ADD CONSTRAINT teacher_guest_devices_name_ck CHECK (((length(btrim(name_display)) >= 1) AND (length(btrim(name_display)) <= 40)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_pupils_name_check'
                    AND conrelid = 'teacher_guest_pupils'::regclass) THEN
    ALTER TABLE teacher_guest_pupils ADD CONSTRAINT teacher_guest_pupils_name_check CHECK (((length(name) >= 1) AND (length(name) <= 40)));
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_pupils_name_len_ck'
                    AND conrelid = 'teacher_guest_pupils'::regclass) THEN
    ALTER TABLE teacher_guest_pupils ADD CONSTRAINT teacher_guest_pupils_name_len_ck CHECK (((name IS NULL) OR (length(name) <= 80)));
  END IF;
END $$;

-- ── FOREIGN KEYS
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'assignment_submissions_assignment_id_fkey'
                    AND conrelid = 'assignment_submissions'::regclass) THEN
    ALTER TABLE assignment_submissions ADD CONSTRAINT assignment_submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES student_assignments(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'assignment_submissions_classroom_id_fkey'
                    AND conrelid = 'assignment_submissions'::regclass) THEN
    ALTER TABLE assignment_submissions ADD CONSTRAINT assignment_submissions_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'assignment_submissions_student_id_fkey'
                    AND conrelid = 'assignment_submissions'::regclass) THEN
    ALTER TABLE assignment_submissions ADD CONSTRAINT assignment_submissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'chapter_entitlements_user_id_fkey'
                    AND conrelid = 'chapter_entitlements'::regclass) THEN
    ALTER TABLE chapter_entitlements ADD CONSTRAINT chapter_entitlements_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_materials_classroom_id_fkey'
                    AND conrelid = 'classroom_materials'::regclass) THEN
    ALTER TABLE classroom_materials ADD CONSTRAINT classroom_materials_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES teacher_guest_classes(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_materials_material_id_fkey'
                    AND conrelid = 'classroom_materials'::regclass) THEN
    ALTER TABLE classroom_materials ADD CONSTRAINT classroom_materials_material_id_fkey FOREIGN KEY (material_id) REFERENCES learning_materials(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_post_refs_classroom_id_fkey'
                    AND conrelid = 'classroom_post_refs'::regclass) THEN
    ALTER TABLE classroom_post_refs ADD CONSTRAINT classroom_post_refs_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_post_refs_post_id_fkey'
                    AND conrelid = 'classroom_post_refs'::regclass) THEN
    ALTER TABLE classroom_post_refs ADD CONSTRAINT classroom_post_refs_post_id_fkey FOREIGN KEY (post_id) REFERENCES classroom_posts(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_posts_classroom_id_fkey'
                    AND conrelid = 'classroom_posts'::regclass) THEN
    ALTER TABLE classroom_posts ADD CONSTRAINT classroom_posts_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_posts_teacher_id_fkey'
                    AND conrelid = 'classroom_posts'::regclass) THEN
    ALTER TABLE classroom_posts ADD CONSTRAINT classroom_posts_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classroom_sessions_classroom_id_fkey'
                    AND conrelid = 'classroom_sessions'::regclass) THEN
    ALTER TABLE classroom_sessions ADD CONSTRAINT classroom_sessions_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'classrooms_teacher_id_fkey'
                    AND conrelid = 'classrooms'::regclass) THEN
    ALTER TABLE classrooms ADD CONSTRAINT classrooms_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'credit_ledger_user_id_fkey'
                    AND conrelid = 'credit_ledger'::regclass) THEN
    ALTER TABLE credit_ledger ADD CONSTRAINT credit_ledger_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'enrollments_classroom_id_fkey'
                    AND conrelid = 'enrollments'::regclass) THEN
    ALTER TABLE enrollments ADD CONSTRAINT enrollments_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'enrollments_student_id_fkey'
                    AND conrelid = 'enrollments'::regclass) THEN
    ALTER TABLE enrollments ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'families_parent_id_fkey'
                    AND conrelid = 'families'::regclass) THEN
    ALTER TABLE families ADD CONSTRAINT families_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_invites_created_by_fkey'
                    AND conrelid = 'family_invites'::regclass) THEN
    ALTER TABLE family_invites ADD CONSTRAINT family_invites_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_invites_family_id_fkey'
                    AND conrelid = 'family_invites'::regclass) THEN
    ALTER TABLE family_invites ADD CONSTRAINT family_invites_family_id_fkey FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_invites_used_by_fkey'
                    AND conrelid = 'family_invites'::regclass) THEN
    ALTER TABLE family_invites ADD CONSTRAINT family_invites_used_by_fkey FOREIGN KEY (used_by) REFERENCES profiles(id) ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_members_family_id_fkey'
                    AND conrelid = 'family_members'::regclass) THEN
    ALTER TABLE family_members ADD CONSTRAINT family_members_family_id_fkey FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_members_invited_by_fkey'
                    AND conrelid = 'family_members'::regclass) THEN
    ALTER TABLE family_members ADD CONSTRAINT family_members_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES profiles(id) ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'family_members_user_id_fkey'
                    AND conrelid = 'family_members'::regclass) THEN
    ALTER TABLE family_members ADD CONSTRAINT family_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'forum_replies_post_id_fkey'
                    AND conrelid = 'forum_replies'::regclass) THEN
    ALTER TABLE forum_replies ADD CONSTRAINT forum_replies_post_id_fkey FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignment_attempts_assignment_id_fkey'
                    AND conrelid = 'guest_assignment_attempts'::regclass) THEN
    ALTER TABLE guest_assignment_attempts ADD CONSTRAINT guest_assignment_attempts_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_assignments_teacher_id_fkey'
                    AND conrelid = 'guest_assignments'::regclass) THEN
    ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_material_completions_classroom_id_fkey'
                    AND conrelid = 'guest_material_completions'::regclass) THEN
    ALTER TABLE guest_material_completions ADD CONSTRAINT guest_material_completions_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES teacher_guest_classes(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_material_completions_material_id_fkey'
                    AND conrelid = 'guest_material_completions'::regclass) THEN
    ALTER TABLE guest_material_completions ADD CONSTRAINT guest_material_completions_material_id_fkey FOREIGN KEY (material_id) REFERENCES learning_materials(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_pin_attempts_assignment_id_fkey'
                    AND conrelid = 'guest_pin_attempts'::regclass) THEN
    ALTER TABLE guest_pin_attempts ADD CONSTRAINT guest_pin_attempts_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'guest_submissions_assignment_id_fkey'
                    AND conrelid = 'guest_submissions'::regclass) THEN
    ALTER TABLE guest_submissions ADD CONSTRAINT guest_submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'learning_materials_teacher_id_fkey'
                    AND conrelid = 'learning_materials'::regclass) THEN
    ALTER TABLE learning_materials ADD CONSTRAINT learning_materials_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'minigame_polls_student_id_fkey'
                    AND conrelid = 'minigame_polls'::regclass) THEN
    ALTER TABLE minigame_polls ADD CONSTRAINT minigame_polls_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'parent_pin_attempts_user_id_fkey'
                    AND conrelid = 'parent_pin_attempts'::regclass) THEN
    ALTER TABLE parent_pin_attempts ADD CONSTRAINT parent_pin_attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'payments_plan_id_fkey'
                    AND conrelid = 'payments'::regclass) THEN
    ALTER TABLE payments ADD CONSTRAINT payments_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES plans(id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'payments_user_id_fkey'
                    AND conrelid = 'payments'::regclass) THEN
    ALTER TABLE payments ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'physical_homework_classroom_id_fkey'
                    AND conrelid = 'physical_homework'::regclass) THEN
    ALTER TABLE physical_homework ADD CONSTRAINT physical_homework_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES teacher_guest_classes(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'physical_homework_teacher_id_fkey'
                    AND conrelid = 'physical_homework'::regclass) THEN
    ALTER TABLE physical_homework ADD CONSTRAINT physical_homework_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_id_fkey'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'profiles_teacher_decided_by_fkey'
                    AND conrelid = 'profiles'::regclass) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_teacher_decided_by_fkey FOREIGN KEY (teacher_decided_by) REFERENCES profiles(id) ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'push_subscriptions_student_id_fkey'
                    AND conrelid = 'push_subscriptions'::regclass) THEN
    ALTER TABLE push_subscriptions ADD CONSTRAINT push_subscriptions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_report_messages_report_id_fkey'
                    AND conrelid = 'question_report_messages'::regclass) THEN
    ALTER TABLE question_report_messages ADD CONSTRAINT question_report_messages_report_id_fkey FOREIGN KEY (report_id) REFERENCES question_reports(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_reports_reporter_id_fkey'
                    AND conrelid = 'question_reports'::regclass) THEN
    ALTER TABLE question_reports ADD CONSTRAINT question_reports_reporter_id_fkey FOREIGN KEY (reporter_id) REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'question_reports_student_id_fkey'
                    AND conrelid = 'question_reports'::regclass) THEN
    ALTER TABLE question_reports ADD CONSTRAINT question_reports_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'referrals_referred_id_fkey'
                    AND conrelid = 'referrals'::regclass) THEN
    ALTER TABLE referrals ADD CONSTRAINT referrals_referred_id_fkey FOREIGN KEY (referred_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'referrals_referrer_id_fkey'
                    AND conrelid = 'referrals'::regclass) THEN
    ALTER TABLE referrals ADD CONSTRAINT referrals_referrer_id_fkey FOREIGN KEY (referrer_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'schedule_entries_schedule_id_fkey'
                    AND conrelid = 'schedule_entries'::regclass) THEN
    ALTER TABLE schedule_entries ADD CONSTRAINT schedule_entries_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES study_schedules(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_assignments_classroom_id_fkey'
                    AND conrelid = 'student_assignments'::regclass) THEN
    ALTER TABLE student_assignments ADD CONSTRAINT student_assignments_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_assignments_parent_id_fkey'
                    AND conrelid = 'student_assignments'::regclass) THEN
    ALTER TABLE student_assignments ADD CONSTRAINT student_assignments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_friends_student_id_a_fkey'
                    AND conrelid = 'student_friends'::regclass) THEN
    ALTER TABLE student_friends ADD CONSTRAINT student_friends_student_id_a_fkey FOREIGN KEY (student_id_a) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_friends_student_id_b_fkey'
                    AND conrelid = 'student_friends'::regclass) THEN
    ALTER TABLE student_friends ADD CONSTRAINT student_friends_student_id_b_fkey FOREIGN KEY (student_id_b) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_invites_created_by_fkey'
                    AND conrelid = 'student_invites'::regclass) THEN
    ALTER TABLE student_invites ADD CONSTRAINT student_invites_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_invites_student_id_fkey'
                    AND conrelid = 'student_invites'::regclass) THEN
    ALTER TABLE student_invites ADD CONSTRAINT student_invites_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_point_events_student_id_fkey'
                    AND conrelid = 'student_point_events'::regclass) THEN
    ALTER TABLE student_point_events ADD CONSTRAINT student_point_events_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_points_student_id_fkey'
                    AND conrelid = 'student_points'::regclass) THEN
    ALTER TABLE student_points ADD CONSTRAINT student_points_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_question_progress_student_id_fkey'
                    AND conrelid = 'student_question_progress'::regclass) THEN
    ALTER TABLE student_question_progress ADD CONSTRAINT student_question_progress_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'student_sessions_student_id_fkey'
                    AND conrelid = 'student_sessions'::regclass) THEN
    ALTER TABLE student_sessions ADD CONSTRAINT student_sessions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'students_family_id_fkey'
                    AND conrelid = 'students'::regclass) THEN
    ALTER TABLE students ADD CONSTRAINT students_family_id_fkey FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'subscriptions_plan_id_fkey'
                    AND conrelid = 'subscriptions'::regclass) THEN
    ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES plans(id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'subscriptions_user_id_fkey'
                    AND conrelid = 'subscriptions'::regclass) THEN
    ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_access_assignment_id_fkey'
                    AND conrelid = 'teacher_guest_access'::regclass) THEN
    ALTER TABLE teacher_guest_access ADD CONSTRAINT teacher_guest_access_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_access_classroom_id_fkey'
                    AND conrelid = 'teacher_guest_access'::regclass) THEN
    ALTER TABLE teacher_guest_access ADD CONSTRAINT teacher_guest_access_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES teacher_guest_classes(id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_archives_assignment_id_fkey'
                    AND conrelid = 'teacher_guest_archives'::regclass) THEN
    ALTER TABLE teacher_guest_archives ADD CONSTRAINT teacher_guest_archives_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_classes_teacher_id_fkey'
                    AND conrelid = 'teacher_guest_classes'::regclass) THEN
    ALTER TABLE teacher_guest_classes ADD CONSTRAINT teacher_guest_classes_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_devices_classroom_id_fkey'
                    AND conrelid = 'teacher_guest_devices'::regclass) THEN
    ALTER TABLE teacher_guest_devices ADD CONSTRAINT teacher_guest_devices_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES teacher_guest_classes(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_pupil_names_pupil_id_fkey'
                    AND conrelid = 'teacher_guest_pupil_names'::regclass) THEN
    ALTER TABLE teacher_guest_pupil_names ADD CONSTRAINT teacher_guest_pupil_names_pupil_id_fkey FOREIGN KEY (pupil_id) REFERENCES teacher_guest_pupils(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_pupils_classroom_id_fkey'
                    AND conrelid = 'teacher_guest_pupils'::regclass) THEN
    ALTER TABLE teacher_guest_pupils ADD CONSTRAINT teacher_guest_pupils_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES teacher_guest_classes(id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_roster_assignment_id_fkey'
                    AND conrelid = 'teacher_guest_roster'::regclass) THEN
    ALTER TABLE teacher_guest_roster ADD CONSTRAINT teacher_guest_roster_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_roster_pupil_id_fkey'
                    AND conrelid = 'teacher_guest_roster'::regclass) THEN
    ALTER TABLE teacher_guest_roster ADD CONSTRAINT teacher_guest_roster_pupil_id_fkey FOREIGN KEY (pupil_id) REFERENCES teacher_guest_pupils(id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = 'teacher_guest_throttle_assignment_id_fkey'
                    AND conrelid = 'teacher_guest_throttle'::regclass) THEN
    ALTER TABLE teacher_guest_throttle ADD CONSTRAINT teacher_guest_throttle_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
  END IF;
END $$;


-- ═══ 4 · FUNCTIONS ════════════════════════════════════════════════════════════
-- 129 functions, verbatim from pg_get_functiondef().
--
-- ⚠ SECURITY DEFINER and the pinned search_path on each are part of the
--   definition, not decoration. Do not strip either when editing one.
--
-- Functions come before the policies in §8 because the policies call them
-- (is_admin(), is_family_member(), current_student_id(), owns_student(), …),
-- and before the indexes in §6 because some are expression indexes.
--
-- ⚠ check_function_bodies is turned OFF for this section. SQL-language function
--   bodies are validated at CREATE time, and these functions call each other
--   (admin_security_events calls is_admin, which sorts after it), so in any
--   fixed order some forward reference fails with "function does not exist".
--   plpgsql bodies were never checked; it is the 29 SQL ones that need this.
--   It is turned back on straight after, so §6 onwards still validates.
SET check_function_bodies = off;

-- ── _award_points(p_student uuid, p_kind text, p_ref text, p_points integer)
CREATE OR REPLACE FUNCTION public._award_points(p_student uuid, p_kind text, p_ref text, p_points integer)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_new   bigint;
  v_got   integer;
BEGIN
  IF p_student IS NULL OR p_ref IS NULL OR p_points IS NULL OR p_points <= 0 THEN
    RETURN 0;
  END IF;
  -- A ref is a key, not free text. Anything longer is a caller bug or an
  -- attempt to make the unique index useless by minting unbounded distinct refs.
  IF length(p_ref) > 160 THEN
    RETURN 0;
  END IF;

  INSERT INTO public.student_point_events (student_id, kind, ref, points)
  VALUES (p_student, p_kind, p_ref, p_points)
  ON CONFLICT (student_id, kind, ref) DO NOTHING;

  IF NOT FOUND THEN
    RETURN 0;                      -- already paid for this exact thing
  END IF;

  INSERT INTO public.student_points AS sp (student_id, points, level, updated_at)
  VALUES (p_student, p_points, public.points_level(p_points), now())
  ON CONFLICT (student_id) DO UPDATE
    SET points     = sp.points + excluded.points,
        level      = public.points_level(sp.points + excluded.points),
        updated_at = now()
  RETURNING sp.points INTO v_new;

  v_got := p_points;
  RETURN v_got;
END;
$function$;

-- ── _forum_dec_reply_count()
CREATE OR REPLACE FUNCTION public._forum_dec_reply_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE forum_posts SET reply_count = GREATEST(0, COALESCE(reply_count, 0) - 1) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$function$;

-- ── _forum_inc_reply_count()
CREATE OR REPLACE FUNCTION public._forum_inc_reply_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE forum_posts SET reply_count = COALESCE(reply_count, 0) + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$function$;

-- ── _points_today(p_student uuid, p_kind text)
CREATE OR REPLACE FUNCTION public._points_today(p_student uuid, p_kind text)
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT coalesce(count(*), 0)::integer
  FROM public.student_point_events
  WHERE student_id = p_student
    AND kind = p_kind
    AND (created_at AT TIME ZONE 'Indian/Mauritius')::date
        = (now() AT TIME ZONE 'Indian/Mauritius')::date;
$function$;

-- ── _qr_on_message()
CREATE OR REPLACE FUNCTION public._qr_on_message()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.question_reports SET updated_at = NOW()
  WHERE id = NEW.report_id;
  -- When an admin replies, advance status from 'open' to 'in_review' so the
  -- student sees a visual change in their inbox without the admin having to
  -- manually set it.
  IF NEW.author_type = 'admin' THEN
    UPDATE public.question_reports
    SET status = 'in_review'
    WHERE id = NEW.report_id AND status = 'open';
  END IF;
  RETURN NEW;
END;
$function$;

-- ── accept_coparent_invite(p_token text)
CREATE OR REPLACE FUNCTION public.accept_coparent_invite(p_token text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_inv    public.family_invites%ROWTYPE;
  v_now    timestamptz := now();
  v_count  int;
  v_owner  uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF p_token IS NULL OR p_token !~ '^[0-9a-f]{64}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;

  SELECT * INTO v_inv FROM public.family_invites
   WHERE token_hash = encode(digest(p_token, 'sha256'), 'hex');

  -- One generic answer for missing / used / expired, so a probe cannot learn
  -- which tokens ever existed.
  IF NOT FOUND OR v_inv.used_at IS NOT NULL OR v_inv.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;

  SELECT f.parent_id INTO v_owner FROM public.families f WHERE f.id = v_inv.family_id;
  IF v_owner = auth.uid() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'self');
  END IF;

  -- Idempotent: re-opening the link after it worked is a success, not an error.
  IF EXISTS (SELECT 1 FROM public.family_members m
              WHERE m.family_id = v_inv.family_id AND m.user_id = auth.uid()) THEN
    UPDATE public.family_invites
       SET used_at = coalesce(used_at, v_now), used_by = coalesce(used_by, auth.uid())
     WHERE token_hash = v_inv.token_hash;
    RETURN jsonb_build_object('ok', true, 'family_id', v_inv.family_id, 'already', true);
  END IF;

  -- One adult, one family (see family_members_one_family_per_user).
  IF EXISTS (SELECT 1 FROM public.family_members m WHERE m.user_id = auth.uid())
     OR EXISTS (SELECT 1 FROM public.families f WHERE f.parent_id = auth.uid()) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_in_a_family');
  END IF;

  SELECT 1 + count(*) INTO v_count
    FROM public.family_members m WHERE m.family_id = v_inv.family_id AND m.role <> 'owner';
  IF v_count >= public.family_member_cap() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cap_reached');
  END IF;

  INSERT INTO public.family_members (family_id, user_id, role, invited_by)
  VALUES (v_inv.family_id, auth.uid(), 'coparent', v_inv.created_by);

  UPDATE public.family_invites
     SET used_at = v_now, used_by = auth.uid()
   WHERE token_hash = v_inv.token_hash;

  RETURN jsonb_build_object('ok', true, 'family_id', v_inv.family_id);
END;
$function$;

-- ── add_friend(p_friend_code text)
CREATE OR REPLACE FUNCTION public.add_friend(p_friend_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_caller  uuid := public.current_student_id();
  v_target  uuid;
  v_a       uuid;
  v_b       uuid;
  v_count   int;
  v_created timestamptz;
  v_new     boolean := false;
  v_pts     integer := 0;
  v_paid    integer;
BEGIN
  IF v_caller IS NULL THEN
    RETURN jsonb_build_object('error', 'not_authenticated');
  END IF;

  SELECT id, created_at INTO v_target, v_created
  FROM   public.students
  WHERE  friend_code = upper(p_friend_code)
    AND  deleted_at IS NULL;

  IF v_target IS NULL THEN
    RETURN jsonb_build_object('error', 'not_found');
  END IF;

  IF v_target = v_caller THEN
    RETURN jsonb_build_object('error', 'self');
  END IF;

  SELECT count(*) INTO v_count
  FROM   public.student_friends
  WHERE  student_id_a = v_caller OR student_id_b = v_caller;

  IF v_count >= 20 THEN
    RETURN jsonb_build_object('error', 'max_friends');
  END IF;

  IF v_caller < v_target THEN
    v_a := v_caller; v_b := v_target;
  ELSE
    v_a := v_target; v_b := v_caller;
  END IF;

  INSERT INTO public.student_friends (student_id_a, student_id_b)
  VALUES (v_a, v_b)
  ON CONFLICT DO NOTHING;
  v_new := FOUND;

  -- ── POINTS ──────────────────────────────────────────────────────────────
  -- Only on a genuinely new friendship, and only when the other account has
  -- existed for a day. A pair that has ever paid cannot pay again, whatever
  -- happened to the friendship in between.
  IF v_new AND v_created IS NOT NULL AND v_created < now() - interval '24 hours' THEN
    SELECT count(*)::integer INTO v_paid
    FROM public.student_point_events
    WHERE student_id = v_caller AND kind = 'friend';

    IF v_paid < 10 THEN
      v_pts := public._award_points(v_caller, 'friend', v_target::text, 25);
      -- The other child is paid too: they did not ask for the friendship, but
      -- a leaderboard where only the inviter gains rewards spamming codes.
      -- Their own lifetime cap is checked against their own ledger.
      IF (SELECT count(*) FROM public.student_point_events
           WHERE student_id = v_target AND kind = 'friend') < 10 THEN
        PERFORM public._award_points(v_target, 'friend', v_caller::text, 25);
      END IF;
    END IF;
  END IF;
  -- ────────────────────────────────────────────────────────────────────────

  RETURN jsonb_build_object('ok', true, 'awarded', v_pts);
END;
$function$;

-- ── add_report_message(p_report_id uuid, p_message text)
CREATE OR REPLACE FUNCTION public.add_report_message(p_report_id uuid, p_message text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_sid   uuid;
  v_new   uuid;
BEGIN
  v_sid := current_student_id();
  IF v_sid IS NULL THEN
    RAISE EXCEPTION 'no_student';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.question_reports
    WHERE id = p_report_id AND student_id = v_sid
  ) THEN
    RAISE EXCEPTION 'not_authorized';
  END IF;

  p_message := trim(left(p_message, 1000));
  IF length(p_message) = 0 THEN
    RAISE EXCEPTION 'empty_message';
  END IF;

  INSERT INTO public.question_report_messages (report_id, author_type, message)
  VALUES (p_report_id, 'student', p_message)
  RETURNING id INTO v_new;

  -- Re-open a resolved/closed report so admin notices the follow-up.
  UPDATE public.question_reports
  SET status = 'open', updated_at = NOW()
  WHERE id = p_report_id AND status IN ('resolved', 'wont_fix');

  RETURN v_new;
END;
$function$;

-- ── admin_adjust_credits(p_user uuid, p_delta integer, p_reason text)
CREATE OR REPLACE FUNCTION public.admin_adjust_credits(p_user uuid, p_delta integer, p_reason text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── admin_block_user(p_user uuid, p_minutes integer, p_reason text)
CREATE OR REPLACE FUNCTION public.admin_block_user(p_user uuid, p_minutes integer, p_reason text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── admin_pending_counts()
CREATE OR REPLACE FUNCTION public.admin_pending_counts()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_teachers int; v_reports int;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  SELECT count(*) INTO v_teachers FROM public.profiles WHERE teacher_status = 'pending';
  SELECT count(*) INTO v_reports  FROM public.question_reports WHERE status = 'open';
  RETURN jsonb_build_object('ok', true,
    'teacher_requests', v_teachers,
    'open_reports',     v_reports,
    'total',            v_teachers + v_reports);
END;
$function$;

-- ── admin_security_events(p_limit integer)
CREATE OR REPLACE FUNCTION public.admin_security_events(p_limit integer DEFAULT 100)
 RETURNS TABLE(id uuid, user_id uuid, student_id uuid, kind text, detail jsonb, created_at timestamp with time zone, user_name text, blocked_until timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  select e.id, e.user_id, e.student_id, e.kind, e.detail, e.created_at,
         p.full_name, p.blocked_until
  from public.security_events e
  left join public.profiles p on p.id = e.user_id
  where public.is_admin()
  order by e.created_at desc
  limit greatest(1, least(coalesce(p_limit, 100), 500));
$function$;

-- ── admin_set_teacher_status(p_user_id uuid, p_status text, p_tier text)
CREATE OR REPLACE FUNCTION public.admin_set_teacher_status(p_user_id uuid, p_status text, p_tier text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_target public.profiles%ROWTYPE;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  IF p_status NOT IN ('pending','approved','rejected','suspended','none') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_status');
  END IF;
  IF p_tier IS NOT NULL AND p_tier NOT IN ('unverified','verified') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_tier');
  END IF;

  SELECT * INTO v_target FROM public.profiles WHERE id = p_user_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_target.role = 'admin' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cannot_modify_admin');
  END IF;

  UPDATE public.profiles
     SET teacher_status = p_status,
         teacher_tier   = coalesce(p_tier, teacher_tier, 'unverified'),
         role = CASE
                  WHEN p_status = 'approved' THEN 'teacher'
                  -- Losing teacher access returns them to a plain parent account
                  -- rather than leaving a role that no longer means anything.
                  WHEN p_status IN ('rejected','suspended','none') AND role = 'teacher' THEN 'parent'
                  ELSE role
                END,
         teacher_decided_at = now(),
         teacher_decided_by = auth.uid()
   WHERE id = p_user_id;

  RETURN jsonb_build_object('ok', true, 'status', p_status);
END;
$function$;

-- ── admin_teacher_requests()
CREATE OR REPLACE FUNCTION public.admin_teacher_requests()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_rows jsonb;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id', p.id, 'full_name', p.full_name, 'role', p.role,
           'status', p.teacher_status, 'tier', coalesce(p.teacher_tier,'unverified'),
           'note', p.teacher_note, 'requested_at', p.teacher_requested_at,
           'decided_at', p.teacher_decided_at)
         ORDER BY (p.teacher_status = 'pending') DESC, p.teacher_requested_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows
    FROM public.profiles p
   WHERE p.teacher_status <> 'none' OR p.role = 'teacher';
  RETURN jsonb_build_object('ok', true, 'requests', v_rows);
END;
$function$;

-- ── award_activity_points(p_kind text, p_ref text)
CREATE OR REPLACE FUNCTION public.award_activity_points(p_kind text, p_ref text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_student uuid := public.current_student_id();
  v_amount  integer;
  v_cap     integer;
  v_awarded integer;
  v_total   bigint;
BEGIN
  IF v_student IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_student_session');
  END IF;

  IF p_kind = 'game' THEN
    v_amount := 5;  v_cap := 3;
  ELSIF p_kind = 'timetable' THEN
    v_amount := 10; v_cap := 3;
  ELSE
    -- 'question', 'friend' and 'legacy' are minted by their own code paths and
    -- are deliberately unreachable from here.
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_kind');
  END IF;

  IF p_ref IS NULL OR p_ref !~ '^[A-Za-z0-9][A-Za-z0-9:._-]{0,127}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_ref');
  END IF;

  IF public._points_today(v_student, p_kind) >= v_cap THEN
    RETURN jsonb_build_object('ok', true, 'awarded', 0, 'note', 'daily_cap');
  END IF;

  v_awarded := public._award_points(v_student, p_kind, p_ref, v_amount);

  SELECT points INTO v_total FROM public.student_points WHERE student_id = v_student;

  RETURN jsonb_build_object(
    'ok', true,
    'awarded', v_awarded,
    'points', coalesce(v_total, 0),
    'level', public.points_level(coalesce(v_total, 0)));
END;
$function$;

-- ── backfill_question_progress(p_student uuid)
CREATE OR REPLACE FUNCTION public.backfill_question_progress(p_student uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_caller uuid := public.current_student_id();
  v_n      integer := 0;
BEGIN
  IF p_student IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_student');
  END IF;
  IF v_caller IS DISTINCT FROM p_student
     AND NOT public.owns_student(p_student)
     AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorized');
  END IF;

  INSERT INTO public.student_question_progress (
    student_id, question_id, chapter_id, first_seen_at, last_seen_at,
    attempts, correct_attempts, wrong_attempts, consecutive_correct,
    last_result, ever_wrong, state, updated_at
  )
  SELECT p_student,
         qid.value #>> '{}',
         ch.key,
         now(), now(), 0, 0, 0, 0,
         'unknown', false, 'legacy_seen', now()
  FROM public.student_progress sp
  CROSS JOIN LATERAL jsonb_each(coalesce(sp.data -> 'chapters', '{}'::jsonb)) AS ch(key, value)
  CROSS JOIN LATERAL jsonb_array_elements(
         CASE WHEN jsonb_typeof(ch.value -> 'answeredIds') = 'array'
              THEN ch.value -> 'answeredIds' ELSE '[]'::jsonb END) AS qid(value)
  WHERE sp.student_id = p_student::text
  ON CONFLICT (student_id, question_id) DO NOTHING;

  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN jsonb_build_object('ok', true, 'inserted', v_n);
END;
$function$;

-- ── classroom_manage(p_action text, p_slug text, p_name text, p_description text, p_emoji text, p_color text, p_pin text)
CREATE OR REPLACE FUNCTION public.classroom_manage(p_action text, p_slug text DEFAULT NULL::text, p_name text DEFAULT NULL::text, p_description text DEFAULT NULL::text, p_emoji text DEFAULT NULL::text, p_color text DEFAULT NULL::text, p_pin text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_classroom public.classrooms%ROWTYPE;
  v_rows      JSONB;
  v_pin_hash  TEXT;
BEGIN
  IF NOT public.classroom_teacher_ok() THEN
    RAISE EXCEPTION 'Teacher access required';
  END IF;

  -- LIST all classrooms for this teacher
  IF p_action = 'list' THEN
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id',           c.id,
        'slug',         c.classroom_slug,
        'name',         c.name,
        'description',  c.description,
        'emoji',        c.emoji,
        'color',        c.color,
        'archived',     c.archived_at IS NOT NULL,
        'created_at',   c.created_at,
        'post_count',   (SELECT COUNT(*) FROM public.classroom_posts p WHERE p.classroom_id = c.id)
      ) ORDER BY c.created_at DESC
    ), '[]') INTO v_rows
    FROM public.classrooms c
    WHERE c.teacher_id = auth.uid();
    RETURN jsonb_build_object('ok', TRUE, 'classrooms', v_rows);
  END IF;

  -- CREATE a new classroom
  IF p_action = 'create' THEN
    IF p_slug IS NULL OR p_slug !~ '^[a-z0-9]{4,20}$' THEN
      RETURN jsonb_build_object('ok', FALSE, 'error', 'Classroom ID must be 4–20 lowercase letters/numbers');
    END IF;
    IF p_name IS NULL OR LENGTH(BTRIM(p_name)) = 0 THEN
      RETURN jsonb_build_object('ok', FALSE, 'error', 'Enter a classroom name');
    END IF;
    IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
      RETURN jsonb_build_object('ok', FALSE, 'error', 'PIN must be exactly 4 digits');
    END IF;
    IF EXISTS (SELECT 1 FROM public.classrooms WHERE classroom_slug = p_slug) THEN
      RETURN jsonb_build_object('ok', FALSE, 'error', 'That classroom ID is already taken — choose another');
    END IF;
    v_pin_hash := encode(sha256(p_pin::bytea), 'hex');
    INSERT INTO public.classrooms (teacher_id, classroom_slug, name, description, emoji, color, pin_hash)
    VALUES (
      auth.uid(), p_slug, BTRIM(p_name),
      NULLIF(BTRIM(COALESCE(p_description, '')), ''),
      COALESCE(p_emoji, '🏫'),
      COALESCE(p_color, 'blue'),
      v_pin_hash
    )
    RETURNING * INTO v_classroom;
    RETURN jsonb_build_object('ok', TRUE, 'id', v_classroom.id, 'slug', v_classroom.classroom_slug);
  END IF;

  -- All remaining actions need the classroom to exist and belong to this teacher
  SELECT * INTO v_classroom FROM public.classrooms
  WHERE classroom_slug = p_slug AND teacher_id = auth.uid();
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', FALSE, 'error', 'Classroom not found');
  END IF;

  IF p_action = 'update' THEN
    UPDATE public.classrooms SET
      name        = COALESCE(NULLIF(BTRIM(p_name), ''),        name),
      description = COALESCE(NULLIF(BTRIM(p_description), ''), description),
      emoji       = COALESCE(p_emoji,                          emoji),
      color       = COALESCE(p_color,                          color)
    WHERE id = v_classroom.id;
    RETURN jsonb_build_object('ok', TRUE);
  END IF;

  IF p_action = 'reset_pin' THEN
    IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
      RETURN jsonb_build_object('ok', FALSE, 'error', 'PIN must be exactly 4 digits');
    END IF;
    UPDATE public.classrooms
    SET pin_hash = encode(sha256(p_pin::bytea), 'hex')
    WHERE id = v_classroom.id;
    -- Invalidate all active sessions for this classroom
    DELETE FROM public.classroom_sessions WHERE classroom_id = v_classroom.id;
    RETURN jsonb_build_object('ok', TRUE);
  END IF;

  IF p_action = 'archive' THEN
    UPDATE public.classrooms
    SET archived_at = CASE WHEN archived_at IS NULL THEN NOW() ELSE NULL END
    WHERE id = v_classroom.id;
    RETURN jsonb_build_object('ok', TRUE);
  END IF;

  IF p_action = 'delete' THEN
    -- Deletes cascade to posts, refs, sessions
    DELETE FROM public.classrooms WHERE id = v_classroom.id;
    RETURN jsonb_build_object('ok', TRUE);
  END IF;

  RETURN jsonb_build_object('ok', FALSE, 'error', 'Unknown action');
END;
$function$;

-- ── classroom_post_manage(p_action text, p_classroom_id uuid, p_post_id uuid, p_type text, p_title text, p_body text, p_file_path text, p_file_name text, p_file_size integer, p_youtube_url text, p_pinned boolean, p_scheduled_at timestamp with time zone, p_share_to uuid[])
CREATE OR REPLACE FUNCTION public.classroom_post_manage(p_action text, p_classroom_id uuid DEFAULT NULL::uuid, p_post_id uuid DEFAULT NULL::uuid, p_type text DEFAULT NULL::text, p_title text DEFAULT NULL::text, p_body text DEFAULT NULL::text, p_file_path text DEFAULT NULL::text, p_file_name text DEFAULT NULL::text, p_file_size integer DEFAULT NULL::integer, p_youtube_url text DEFAULT NULL::text, p_pinned boolean DEFAULT NULL::boolean, p_scheduled_at timestamp with time zone DEFAULT NULL::timestamp with time zone, p_share_to uuid[] DEFAULT NULL::uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_classroom public.classrooms%ROWTYPE;
  v_post      public.classroom_posts%ROWTYPE;
  v_rows      JSONB;
  v_cid       UUID;
BEGIN
  IF NOT public.classroom_teacher_ok() THEN
    RAISE EXCEPTION 'Teacher access required';
  END IF;

  -- LIST posts in a classroom
  IF p_action = 'list' THEN
    SELECT * INTO v_classroom FROM public.classrooms
    WHERE id = p_classroom_id AND teacher_id = auth.uid();
    IF NOT FOUND THEN RETURN jsonb_build_object('ok', FALSE, 'error', 'Classroom not found'); END IF;

    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'id',           p.id,
        'type',         p.type,
        'title',        p.title,
        'body',         p.body,
        'file_path',    p.file_path,
        'file_name',    p.file_name,
        'file_size',    p.file_size,
        'youtube_url',  p.youtube_url,
        'pinned',       p.pinned,
        'scheduled_at', p.scheduled_at,
        'view_count',   p.view_count,
        'created_at',   p.created_at
      ) ORDER BY p.pinned DESC, p.created_at DESC
    ), '[]') INTO v_rows
    FROM public.classroom_posts p
    WHERE p.classroom_id = p_classroom_id;
    RETURN jsonb_build_object('ok', TRUE, 'posts', v_rows);
  END IF;

  -- CREATE a new post
  IF p_action = 'create' THEN
    SELECT * INTO v_classroom FROM public.classrooms
    WHERE id = p_classroom_id AND teacher_id = auth.uid() AND archived_at IS NULL;
    IF NOT FOUND THEN RETURN jsonb_build_object('ok', FALSE, 'error', 'Classroom not found or archived'); END IF;
    IF p_type NOT IN ('note','file','youtube','announcement') THEN
      RETURN jsonb_build_object('ok', FALSE, 'error', 'Invalid post type');
    END IF;
    IF p_title IS NULL OR LENGTH(BTRIM(p_title)) = 0 THEN
      RETURN jsonb_build_object('ok', FALSE, 'error', 'Enter a title');
    END IF;

    INSERT INTO public.classroom_posts
      (classroom_id, teacher_id, type, title, body, file_path, file_name, file_size, youtube_url, pinned, scheduled_at)
    VALUES
      (p_classroom_id, auth.uid(), p_type, BTRIM(p_title),
       NULLIF(BTRIM(COALESCE(p_body,'')), ''),
       p_file_path, p_file_name, p_file_size, p_youtube_url,
       COALESCE(p_pinned, FALSE), p_scheduled_at)
    RETURNING * INTO v_post;

    -- Cross-post to additional classrooms (only those the teacher owns)
    IF p_share_to IS NOT NULL THEN
      FOREACH v_cid IN ARRAY p_share_to LOOP
        IF EXISTS (SELECT 1 FROM public.classrooms WHERE id = v_cid AND teacher_id = auth.uid()) THEN
          INSERT INTO public.classroom_post_refs (post_id, classroom_id)
          VALUES (v_post.id, v_cid)
          ON CONFLICT DO NOTHING;
        END IF;
      END LOOP;
    END IF;

    RETURN jsonb_build_object('ok', TRUE, 'id', v_post.id);
  END IF;

  -- Remaining actions need the post to exist and belong to this teacher
  SELECT * INTO v_post FROM public.classroom_posts
  WHERE id = p_post_id AND teacher_id = auth.uid();
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', FALSE, 'error', 'Post not found');
  END IF;

  IF p_action = 'update' THEN
    UPDATE public.classroom_posts SET
      title        = COALESCE(NULLIF(BTRIM(p_title),''),   title),
      body         = COALESCE(NULLIF(BTRIM(p_body),''),    body),
      pinned       = COALESCE(p_pinned,                    pinned),
      scheduled_at = COALESCE(p_scheduled_at,              scheduled_at)
    WHERE id = v_post.id;
    RETURN jsonb_build_object('ok', TRUE);
  END IF;

  IF p_action = 'toggle_pin' THEN
    UPDATE public.classroom_posts SET pinned = NOT pinned WHERE id = v_post.id;
    RETURN jsonb_build_object('ok', TRUE);
  END IF;

  IF p_action = 'delete' THEN
    DELETE FROM public.classroom_posts WHERE id = v_post.id;
    RETURN jsonb_build_object('ok', TRUE);
  END IF;

  RETURN jsonb_build_object('ok', FALSE, 'error', 'Unknown action');
END;
$function$;

-- ── classroom_post_view(p_post_id uuid, p_token uuid)
CREATE OR REPLACE FUNCTION public.classroom_post_view(p_post_id uuid, p_token uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.classroom_sessions
    WHERE token = p_token AND expires_at > NOW()
  ) THEN
    UPDATE public.classroom_posts
    SET view_count = view_count + 1
    WHERE id = p_post_id;
  END IF;
END;
$function$;

-- ── classroom_sessions_cleanup()
CREATE OR REPLACE FUNCTION public.classroom_sessions_cleanup()
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  DELETE FROM public.classroom_sessions WHERE expires_at < NOW() - INTERVAL '1 day';
$function$;

-- ── classroom_teacher_ok()
CREATE OR REPLACE FUNCTION public.classroom_teacher_ok()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND NOT COALESCE(disabled, FALSE)
      AND (expires_at IS NULL OR expires_at > NOW())
      AND (role = 'admin' OR (role = 'teacher' AND teacher_status = 'approved'))
  );
$function$;

-- ── create_coparent_invite(p_hours integer)
CREATE OR REPLACE FUNCTION public.create_coparent_invite(p_hours integer DEFAULT 48)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_family uuid;
  v_token  text;
  v_exp    timestamptz;
  v_hours  int := least(greatest(coalesce(p_hours, 48), 1), 168);
  v_count  int;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT f.id INTO v_family FROM public.families f WHERE f.parent_id = auth.uid();
  IF v_family IS NULL THEN
    -- A co-parent asking to invite another co-parent lands here.
    RETURN jsonb_build_object('ok', false, 'error', 'not_owner');
  END IF;

  SELECT 1 + count(*) INTO v_count
    FROM public.family_members m WHERE m.family_id = v_family AND m.role <> 'owner';
  IF v_count >= public.family_member_cap() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cap_reached',
                              'cap', public.family_member_cap());
  END IF;

  -- Replace any outstanding invite, so the last link sent is the only one that
  -- works — same rule as create_student_invite.
  DELETE FROM public.family_invites WHERE family_id = v_family AND used_at IS NULL;
  DELETE FROM public.family_invites WHERE expires_at < now();   -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  v_exp   := now() + (v_hours || ' hours')::interval;

  INSERT INTO public.family_invites (token_hash, family_id, created_by, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_family, auth.uid(), v_exp);

  RETURN jsonb_build_object('ok', true, 'token', v_token, 'expires_at', v_exp);
END;
$function$;

-- ── create_student_invite(p_student uuid, p_hours integer)
CREATE OR REPLACE FUNCTION public.create_student_invite(p_student uuid, p_hours integer DEFAULT 48)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_token text;
  v_exp   timestamptz;
  v_hours int := least(greatest(coalesce(p_hours, 48), 1), 168);
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.students s
      JOIN public.families f ON f.id = s.family_id
     WHERE s.id = p_student AND s.deleted_at IS NULL
       AND (f.parent_id = auth.uid() OR public.is_admin())
  ) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  DELETE FROM public.student_invites WHERE student_id = p_student AND used_at IS NULL;
  DELETE FROM public.student_invites WHERE expires_at < now();   -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  v_exp   := now() + (v_hours || ' hours')::interval;

  INSERT INTO public.student_invites (token_hash, student_id, created_by, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), p_student, auth.uid(), v_exp);

  RETURN jsonb_build_object('ok', true, 'token', v_token, 'expires_at', v_exp);
END;
$function$;

-- ── create_student_with_pin(p_family_id uuid, p_username text, p_display_name text, p_avatar text, p_grade integer, p_pin text, p_settings jsonb)
CREATE OR REPLACE FUNCTION public.create_student_with_pin(p_family_id uuid, p_username text, p_display_name text, p_avatar text DEFAULT NULL::text, p_grade integer DEFAULT 5, p_pin text DEFAULT NULL::text, p_settings jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_id  uuid;
  v_row jsonb;
BEGIN
  -- Only the owning parent (or an admin) may add a child to a family.
  -- SECURITY DEFINER bypasses RLS, so this check is the access control.
  IF NOT (
    EXISTS (SELECT 1 FROM public.families f
             WHERE f.id = p_family_id AND public.is_family_member(f.id))
    OR public.is_admin()
  ) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  IF p_username IS NULL OR btrim(p_username) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_username');
  END IF;

  -- Same username, under a DIFFERENT family that happens to share this family's
  -- name. The child would exist but could never log in, because the two are
  -- indistinguishable at the login screen.
  --
  -- Reported as plain 'username_taken' — the same code the unique violation
  -- below returns — ON PURPOSE. A distinct code would tell one parent that some
  -- other family exists, shares their family name, and has a child called this,
  -- and it would say so in the network response whatever the UI printed. The
  -- parent does not need to know why; they need to pick another username.
  IF EXISTS (
    SELECT 1
    FROM   public.students s
    JOIN   public.families f2 ON f2.id = s.family_id
    JOIN   public.families f1 ON f1.id = p_family_id
    WHERE  s.deleted_at IS NULL
      AND  f2.id <> f1.id
      AND  lower(trim(f2.family_name)) = lower(trim(f1.family_name))
      AND  lower(s.username) = lower(btrim(p_username))
  ) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'username_taken');
  END IF;

  BEGIN
    INSERT INTO public.students
      (family_id, username, display_name, avatar, grade, pin, settings)
    VALUES (
      p_family_id,
      lower(btrim(p_username)),
      btrim(coalesce(p_display_name, p_username)),
      coalesce(nullif(btrim(coalesce(p_avatar, '')), ''), '🧒'),
      coalesce(p_grade, 5),
      crypt(p_pin, gen_salt('bf')),          -- hashed DURING insert
      coalesce(p_settings, '{"lockedChapters":[],"maxDifficulty":4,"examDisabled":false}'::jsonb)
    )
    RETURNING id INTO v_id;
  EXCEPTION
    WHEN unique_violation THEN
      RETURN jsonb_build_object('ok', false, 'error', 'username_taken');
  END;

  -- Return the row WITHOUT pin/pin_hash.
  SELECT jsonb_build_object(
           'id', id, 'family_id', family_id, 'username', username,
           'display_name', display_name, 'avatar', avatar, 'grade', grade,
           'settings', settings, 'session_version', session_version,
           'expires_at', expires_at, 'created_at', created_at)
    INTO v_row
    FROM public.students WHERE id = v_id;

  RETURN jsonb_build_object('ok', true, 'student', v_row);
END;
$function$;

-- ── current_student_id()
CREATE OR REPLACE FUNCTION public.current_student_id()
 RETURNS uuid
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_raw text;
  v_tok text;
  v_id  uuid;
BEGIN
  BEGIN
    v_raw := current_setting('request.headers', true);   -- NULL outside PostgREST
  EXCEPTION WHEN others THEN
    RETURN NULL;
  END;

  IF v_raw IS NULL OR v_raw = '' THEN RETURN NULL; END IF;

  BEGIN
    v_tok := (v_raw::json ->> 'x-student-token');
  EXCEPTION WHEN others THEN
    RETURN NULL;
  END;

  IF v_tok IS NULL OR length(v_tok) < 32 THEN RETURN NULL; END IF;

  SELECT s.student_id INTO v_id
  FROM public.student_sessions s
  WHERE s.token_hash = encode(digest(v_tok, 'sha256'), 'hex')
    AND s.expires_at > now()
  LIMIT 1;

  RETURN v_id;
END;
$function$;

-- ── delete_my_account()
CREATE OR REPLACE FUNCTION public.delete_my_account()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_fam uuid;
  v_now timestamptz := now();
  v_kids int := 0;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  -- An admin deleting themselves through the parent UI would be an
  -- unrecoverable lockout, not a feature. Admin removal stays in the admin
  -- panel, where another admin has to do it.
  IF EXISTS (SELECT 1 FROM public.profiles
              WHERE id = v_uid AND (role = 'admin' OR is_super_admin)) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'admin_cannot_self_delete');
  END IF;

  SELECT id INTO v_fam FROM public.families WHERE parent_id = v_uid;

  IF v_fam IS NOT NULL THEN
    -- Children go with the parent, and their usernames are freed so the family
    -- can recreate the same child by name if they come back.
    UPDATE public.students
       SET deleted_at = v_now,
           username   = username || '.del.' || left(replace(id::text, '-', ''), 8)
     WHERE family_id = v_fam AND deleted_at IS NULL;
    GET DIAGNOSTICS v_kids = ROW_COUNT;

    -- Kick every child off every device immediately.
    DELETE FROM public.student_sessions
     WHERE student_id IN (SELECT id FROM public.students WHERE family_id = v_fam);
  END IF;

  UPDATE public.profiles SET deleted_at = v_now WHERE id = v_uid;

  RETURN jsonb_build_object('ok', true, 'children', v_kids);
END;
$function$;

-- ── end_student_session()
CREATE OR REPLACE FUNCTION public.end_student_session()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_id uuid := public.current_student_id();
BEGIN
  IF v_id IS NOT NULL THEN
    DELETE FROM public.student_sessions WHERE student_id = v_id;
  END IF;
END;
$function$;

-- ── enforce_max_children()
CREATE OR REPLACE FUNCTION public.enforce_max_children()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_parent uuid;
  v_max    integer;
  v_count  integer;
BEGIN
  IF NOT public.plan_enforcement_on() THEN RETURN NEW; END IF;
  -- An admin adding a child on someone's behalf (support, migration) is not
  -- the person being sold to.
  IF public.is_admin() THEN RETURN NEW; END IF;

  SELECT f.parent_id INTO v_parent
    FROM public.families f WHERE f.id = NEW.family_id;
  IF v_parent IS NULL THEN RETURN NEW; END IF;

  -- Read it NULLABLE, then decide. `coalesce(..., 1)` here was a fail-CLOSED
  -- bug: a composite-returning function in FROM always yields a row, so when
  -- plan_for_user() returns NULL (no 'free' row, or an unseeded plans table)
  -- p.max_children is NULL, the coalesce turned that into 1, and every family
  -- was hard-capped at one child - with the IF below unreachable dead code.
  -- No plan information must mean NO limit, the same as everywhere else here.
  SELECT p.max_children INTO v_max
    FROM public.plan_for_user(v_parent) p;
  IF v_max IS NULL THEN RETURN NEW; END IF;

  -- Soft-deleted children do not count: a parent who removed one has freed the
  -- slot, and charging them for a row they cannot see would be indefensible.
  SELECT count(*) INTO v_count
    FROM public.students s
   WHERE s.family_id = NEW.family_id
     AND s.deleted_at IS NULL;

  IF v_count >= v_max THEN
    RAISE EXCEPTION 'plan_child_limit:%', v_max
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$function$;

-- ── family_entitlements()
CREATE OR REPLACE FUNCTION public.family_entitlements()
 RETURNS TABLE(chapter_id text, expires_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  select e.chapter_id, e.expires_at
  from public.chapter_entitlements e
  where e.expires_at > now()
    and e.user_id = (
      select f.parent_id
      from public.students s join public.families f on f.id = s.family_id
      where s.id = public.current_student_id()
    )
  order by e.expires_at desc;
$function$;

-- ── family_member_cap()
CREATE OR REPLACE FUNCTION public.family_member_cap()
 RETURNS integer
 LANGUAGE sql
 IMMUTABLE
AS $function$ SELECT 3 $function$;

-- ── family_referral_count(p_parent uuid)
CREATE OR REPLACE FUNCTION public.family_referral_count(p_parent uuid)
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  select count(*)::integer
  from public.referrals
  where referrer_id = p_parent;
$function$;

-- ── flag_security_event(p_kind text, p_detail jsonb)
CREATE OR REPLACE FUNCTION public.flag_security_event(p_kind text, p_detail jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── forum_set_author()
CREATE OR REPLACE FUNCTION public.forum_set_author()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_sid  uuid := current_student_id();
  v_name text;
  v_type text;
BEGIN
  IF v_uid IS NULL AND v_sid IS NULL THEN
    RAISE EXCEPTION 'not_authenticated' USING ERRCODE = '42501';
  END IF;

  IF v_sid IS NOT NULL THEN
    -- A child. display_name is the only name they can post under.
    SELECT s.display_name INTO v_name FROM public.students s WHERE s.id = v_sid;
    v_type := 'student';
    NEW.author_student_id := v_sid;
    NEW.author_id         := NULL;
  ELSE
    -- Prefer forum_nickname when the user has set one; fall back to full_name.
    -- ROLE COLUMN still decides the badge, not the browser.
    SELECT COALESCE(NULLIF(btrim(p.forum_nickname), ''), p.full_name),
           CASE WHEN p.is_super_admin THEN 'admin' ELSE COALESCE(p.role, 'parent') END
      INTO v_name, v_type
      FROM public.profiles p WHERE p.id = v_uid;
    v_type := COALESCE(v_type, 'parent');
    NEW.author_id         := v_uid;
    NEW.author_student_id := NULL;
  END IF;

  -- Only fall back to what the client sent when there is genuinely no name on
  -- the account (a parent who never completed setup).
  v_name := NULLIF(btrim(COALESCE(v_name, '')), '');
  IF v_name IS NULL THEN
    v_name := NULLIF(btrim(COALESCE(NEW.author_name, '')), '');
  END IF;
  NEW.author_name := left(COALESCE(v_name, 'Anonymous'), 60);
  NEW.author_type := v_type;

  RETURN NEW;
END;
$function$;

-- ── gen_guest_code()
CREATE OR REPLACE FUNCTION public.gen_guest_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  alphabet CONSTANT text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  out text; i int;
BEGIN
  LOOP
    out := '';
    FOR i IN 1..6 LOOP
      out := out || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.guest_assignments a WHERE a.code = out);
  END LOOP;
  RETURN out;
END;
$function$;

-- ── gen_invite_code()
CREATE OR REPLACE FUNCTION public.gen_invite_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  alphabet CONSTANT text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  out text;
  i   int;
BEGIN
  LOOP
    out := '';
    FOR i IN 1..8 LOOP
      out := out || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.classrooms c WHERE c.invite_code = out);
  END LOOP;
  RETURN out;
END;
$function$;

-- ── get_classroom_feed(p_slug text, p_token uuid)
CREATE OR REPLACE FUNCTION public.get_classroom_feed(p_slug text, p_token uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_session    public.classroom_sessions%ROWTYPE;
  v_classroom  public.classrooms%ROWTYPE;
  v_posts      JSONB;
BEGIN
  -- Validate token
  SELECT s.* INTO v_session
  FROM public.classroom_sessions s
  JOIN public.classrooms c ON c.id = s.classroom_id
  WHERE s.token       = p_token
    AND c.classroom_slug = LOWER(BTRIM(p_slug))
    AND s.expires_at  > NOW();

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', FALSE, 'error', 'invalid_session');
  END IF;

  SELECT * INTO v_classroom FROM public.classrooms WHERE id = v_session.classroom_id;

  -- Get posts: own classroom + cross-posted refs, scheduled posts hidden until due
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id',          p.id,
      'type',        p.type,
      'title',       p.title,
      'body',        p.body,
      'file_path',   p.file_path,
      'file_name',   p.file_name,
      'youtube_url', p.youtube_url,
      'pinned',      p.pinned,
      'view_count',  p.view_count,
      'created_at',  p.created_at
    ) ORDER BY p.pinned DESC, p.created_at DESC
  ), '[]') INTO v_posts
  FROM public.classroom_posts p
  WHERE (
    p.classroom_id = v_session.classroom_id
    OR EXISTS (
      SELECT 1 FROM public.classroom_post_refs r
      WHERE r.post_id = p.id AND r.classroom_id = v_session.classroom_id
    )
  )
  AND (p.scheduled_at IS NULL OR p.scheduled_at <= NOW());

  RETURN jsonb_build_object(
    'ok',        TRUE,
    'name',      v_classroom.name,
    'emoji',     v_classroom.emoji,
    'color',     v_classroom.color,
    'posts',     v_posts
  );
END;
$function$;

-- ── get_my_friend_code()
CREATE OR REPLACE FUNCTION public.get_my_friend_code()
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT friend_code
  FROM   public.students
  WHERE  id = public.current_student_id()
    AND  deleted_at IS NULL;
$function$;

-- ── get_my_friends()
CREATE OR REPLACE FUNCTION public.get_my_friends()
 RETURNS TABLE(id uuid, display_name text, avatar text, grade text, friend_code text, xp integer, level integer, streak integer, total_attempted integer, total_correct integer)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    s.id,
    s.display_name,
    s.avatar,
    s.grade::text,
    s.friend_code,
    coalesce(pts.points, (sp.data->>'xp')::int, 0)::int         AS xp,
    coalesce(pts.level, public.points_level(coalesce(pts.points, 0)))::int AS level,
    coalesce((sp.data->'stats'->>'streak')::int, 0)             AS streak,
    coalesce((sp.data->'stats'->>'totalAttempted')::int, 0)     AS total_attempted,
    coalesce((sp.data->'stats'->>'totalCorrect')::int,   0)     AS total_correct
  FROM public.student_friends f
  JOIN public.students s
    ON s.id = CASE
                WHEN f.student_id_a = public.current_student_id() THEN f.student_id_b
                ELSE f.student_id_a
              END
  LEFT JOIN public.student_progress sp ON sp.student_id = s.id::text
  LEFT JOIN public.student_points   pts ON pts.student_id = s.id
  WHERE (f.student_id_a = public.current_student_id()
     OR  f.student_id_b = public.current_student_id())
    AND s.deleted_at IS NULL
  ORDER BY xp DESC;
$function$;

-- ── get_my_points()
CREATE OR REPLACE FUNCTION public.get_my_points()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_student uuid := public.current_student_id();
  v_row     public.student_points%ROWTYPE;
BEGIN
  IF v_student IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_student_session');
  END IF;

  SELECT * INTO v_row FROM public.student_points WHERE student_id = v_student;

  RETURN jsonb_build_object(
    'ok', true,
    'points', coalesce(v_row.points, 0),
    'legacy_bonus', coalesce(v_row.legacy_bonus, 0),
    'level', public.points_level(coalesce(v_row.points, 0)));
END;
$function$;

-- ── get_my_points_rank(p_grade integer)
CREATE OR REPLACE FUNCTION public.get_my_points_rank(p_grade integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_student uuid := public.current_student_id();
  v_points  bigint;
  v_rank    integer;
  v_total   integer;
BEGIN
  IF v_student IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_student_session');
  END IF;

  -- ⚠ A distinct error, not a zero rank. The client needs to tell "the board is
  --   off" from "you are last" — one hides the screen, the other is a score.
  IF NOT public.leaderboard_enabled() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'leaderboard_disabled');
  END IF;

  SELECT coalesce(points, 0) INTO v_points
  FROM public.student_points WHERE student_id = v_student;
  v_points := coalesce(v_points, 0);

  SELECT count(*)::integer + 1 INTO v_rank
  FROM public.student_points sp
  JOIN public.students s ON s.id = sp.student_id
  WHERE s.deleted_at IS NULL
    AND sp.points > v_points
    AND (p_grade IS NULL OR s.grade = p_grade);

  SELECT count(*)::integer INTO v_total
  FROM public.student_points sp
  JOIN public.students s ON s.id = sp.student_id
  WHERE s.deleted_at IS NULL
    AND sp.points > 0
    AND (p_grade IS NULL OR s.grade = p_grade);

  RETURN jsonb_build_object('ok', true, 'points', v_points, 'rank', v_rank, 'total', v_total);
END;
$function$;

-- ── get_points_leaderboard(p_grade integer, p_limit integer)
CREATE OR REPLACE FUNCTION public.get_points_leaderboard(p_grade integer DEFAULT NULL::integer, p_limit integer DEFAULT 50)
 RETURNS TABLE(rank integer, display_name text, avatar text, grade integer, points bigint, level smallint, is_me boolean)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT
    row_number() OVER (ORDER BY sp.points DESC, s.created_at ASC)::integer AS rank,
    s.display_name,
    s.avatar,
    s.grade::integer,
    sp.points,
    sp.level,
    (s.id = public.current_student_id()) AS is_me
  FROM public.student_points sp
  JOIN public.students s ON s.id = sp.student_id
  -- ⚠ The switch is the FIRST predicate: off means no rows, for everyone,
  -- whatever the client asked for.
  WHERE public.leaderboard_enabled()
    AND s.deleted_at IS NULL
    AND sp.points > 0
    AND (p_grade IS NULL OR s.grade = p_grade)
  ORDER BY sp.points DESC, s.created_at ASC
  LIMIT greatest(1, least(200, coalesce(p_limit, 50)));
$function$;

-- ── get_student_reports(p_student_id uuid)
CREATE OR REPLACE FUNCTION public.get_student_reports(p_student_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(id uuid, question_id text, question_text text, message text, status text, report_type text, chapter_id text, created_at timestamp with time zone, updated_at timestamp with time zone, student_last_seen_at timestamp with time zone, reply_count bigint, last_admin_message text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_sid uuid;
BEGIN
  v_sid := current_student_id();

  IF v_sid IS NULL THEN
    -- Parent previewing a child (no student token, but has a JWT)
    IF p_student_id IS NOT NULL AND auth.uid() IS NOT NULL THEN
      IF EXISTS (
        SELECT 1 FROM public.students s
        JOIN public.families f ON f.id = s.family_id
        WHERE s.id = p_student_id
          AND (f.parent_id = auth.uid()
               OR EXISTS (
                 SELECT 1 FROM public.family_members fm
                 WHERE fm.family_id = f.id AND fm.user_id = auth.uid()
               ))
      ) THEN
        v_sid := p_student_id;
      ELSE
        RAISE EXCEPTION 'not_authorized';
      END IF;
    ELSE
      RETURN; -- no identity: return empty
    END IF;
  END IF;

  RETURN QUERY
  SELECT
    qr.id,
    qr.question_id,
    left(coalesce(qr.question_text, ''), 300)::text,
    qr.message,
    coalesce(qr.status, 'open'),
    coalesce(qr.report_type, 'other'),
    qr.chapter_id,
    qr.created_at,
    coalesce(qr.updated_at, qr.created_at),
    qr.student_last_seen_at,
    (SELECT count(*) FROM public.question_report_messages m
     WHERE m.report_id = qr.id AND m.author_type = 'admin')::bigint,
    (SELECT m2.message FROM public.question_report_messages m2
     WHERE m2.report_id = qr.id AND m2.author_type = 'admin'
     ORDER BY m2.created_at DESC LIMIT 1)::text
  FROM public.question_reports qr
  WHERE qr.student_id = v_sid
  ORDER BY coalesce(qr.updated_at, qr.created_at) DESC;
END;
$function$;

-- ── guard_profiles_privileged()
CREATE OR REPLACE FUNCTION public.guard_profiles_privileged()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── guard_students_privileged()
CREATE OR REPLACE FUNCTION public.guard_students_privileged()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── guest_assignment_create(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_pin text, p_classroom_label text, p_duration_mins integer, p_due_at timestamp with time zone, p_expires_hours integer)
CREATE OR REPLACE FUNCTION public.guest_assignment_create(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_pin text, p_classroom_label text DEFAULT NULL::text, p_duration_mins integer DEFAULT NULL::integer, p_due_at timestamp with time zone DEFAULT NULL::timestamp with time zone, p_expires_hours integer DEFAULT 48)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_role    text; v_tier text; v_status text; v_name text;
  v_today   int;  v_max_day int; v_max_stu int;
  v_code    text; v_id uuid;     v_count int;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT role, coalesce(teacher_tier,'unverified'), teacher_status, full_name
    INTO v_role, v_tier, v_status, v_name
    FROM public.profiles WHERE id = v_uid;

  -- Approval gate. 'pending' and 'suspended' get their own codes so the UI can
  -- say something useful instead of a generic refusal.
  IF v_role = 'admin' THEN
    NULL;
  ELSIF v_role <> 'teacher' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_teacher', 'status', coalesce(v_status,'none'));
  ELSIF v_status = 'pending' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'pending_approval');
  ELSIF v_status <> 'approved' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_approved', 'status', coalesce(v_status,'none'));
  END IF;

  -- An admin is billed at the verified rate, exactly as before this file. That
  -- is one behaviour, stated once here rather than as a third settings column
  -- nobody would remember to keep in step.
  SELECT l.per_day, l.max_students INTO v_max_day, v_max_stu
    FROM public.guest_assignment_limits(
      CASE WHEN v_tier = 'verified' OR v_role = 'admin' THEN 'verified' ELSE 'unverified' END) l;

  SELECT count(*) INTO v_today FROM public.guest_assignments
   WHERE teacher_id = v_uid AND created_at >= date_trunc('day', now());
  IF v_today >= v_max_day THEN
    RETURN jsonb_build_object('ok', false, 'error', 'daily_limit', 'limit', v_max_day, 'tier', v_tier);
  END IF;

  IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  v_count := coalesce(jsonb_array_length(p_question_ids), 0);
  IF v_count = 0 THEN RETURN jsonb_build_object('ok', false, 'error', 'no_questions'); END IF;

  v_code := public.gen_guest_code();

  INSERT INTO public.guest_assignments (
    code, teacher_id, teacher_label, classroom_label, title, subject_pack_id,
    chapter_ids, question_ids, question_count, duration_mins, pin_hash,
    due_at, expires_at, max_students
  ) VALUES (
    v_code, v_uid, v_name, p_classroom_label, btrim(p_title), p_subject_pack_id,
    coalesce(p_chapter_ids, '[]'::jsonb), p_question_ids, v_count,
    p_duration_mins, crypt(p_pin, gen_salt('bf')),
    p_due_at, now() + (coalesce(p_expires_hours, 48) || ' hours')::interval, v_max_stu
  ) RETURNING id INTO v_id;

  RETURN jsonb_build_object('ok', true, 'id', v_id, 'code', v_code,
    'max_students', v_max_stu, 'assignments_left_today', v_max_day - v_today - 1);
END;
$function$;

-- ── guest_assignment_limits(p_tier text)
CREATE OR REPLACE FUNCTION public.guest_assignment_limits(p_tier text)
 RETURNS TABLE(per_day integer, max_students integer)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT least(greatest(coalesce(CASE WHEN jsonb_typeof(v->k->'per_day')='number'
                                      THEN (v->k->>'per_day')::integer END, def_day), 0), 1000),
         least(greatest(coalesce(CASE WHEN jsonb_typeof(v->k->'max_students')='number'
                                      THEN (v->k->>'max_students')::integer END, def_stu), 1), 500)
  FROM (SELECT
      coalesce((SELECT value FROM public.mm_data WHERE key='guest_assignment_limits'), '{}'::jsonb) AS v,
      CASE WHEN p_tier='verified' THEN 'verified' ELSE 'unverified' END AS k,
      CASE WHEN p_tier='verified' THEN 3  ELSE 1  END AS def_day,
      CASE WHEN p_tier='verified' THEN 40 ELSE 15 END AS def_stu
  ) t;
$function$;

-- ── guest_assignment_quota()
CREATE OR REPLACE FUNCTION public.guest_assignment_quota()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_role text; v_tier text; v_status text;
  v_day integer; v_stu integer; v_today integer;
BEGIN
  IF v_uid IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  SELECT role, coalesce(teacher_tier,'unverified'), teacher_status
    INTO v_role, v_tier, v_status FROM public.profiles WHERE id = v_uid;
  IF NOT (v_role='admin' OR (v_role='teacher' AND v_status='approved')) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_teacher');
  END IF;
  SELECT l.per_day, l.max_students INTO v_day, v_stu
    FROM public.guest_assignment_limits(
      CASE WHEN v_tier='verified' OR v_role='admin' THEN 'verified' ELSE 'unverified' END) l;
  SELECT count(*) INTO v_today FROM public.guest_assignments
   WHERE teacher_id = v_uid AND created_at >= date_trunc('day', now());
  RETURN jsonb_build_object('ok', true, 'tier', CASE WHEN v_role='admin' THEN 'admin' ELSE v_tier END,
    'per_day', v_day, 'max_students', v_stu, 'used_today', v_today,
    'left_today', greatest(v_day - v_today, 0));
END $function$;

-- ── guest_cleanup()
CREATE OR REPLACE FUNCTION public.guest_cleanup()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_expired int; v_deleted int; v_attempts int;
BEGIN
  UPDATE public.guest_assignments SET status = 'expired'
   WHERE status = 'active' AND expires_at < now();
  GET DIAGNOSTICS v_expired = ROW_COUNT;

  -- Submissions older than 90 days (children's data - do not keep it forever).
  DELETE FROM public.guest_submissions WHERE submitted_at < now() - interval '90 days';
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  DELETE FROM public.guest_pin_attempts
   WHERE updated_at < now() - interval '7 days'
     AND (locked_until IS NULL OR locked_until < now());
  GET DIAGNOSTICS v_attempts = ROW_COUNT;

  RETURN jsonb_build_object('ok', true, 'expired', v_expired,
    'submissions_deleted', v_deleted, 'attempt_rows_deleted', v_attempts);
END;
$function$;

-- ── guest_device_claim(p_code text, p_device text, p_name text)
CREATE OR REPLACE FUNCTION public.guest_device_claim(p_code text, p_device text, p_name text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a      public.guest_assignments%ROWTYPE;
  v_class  public.teacher_guest_classes%ROWTYPE;
  v_name   text;
  v_key    text;
  v_owner  text;
  v_subkey text;
BEGIN
  IF p_device IS NULL OR p_device !~ '^[0-9a-f]{32}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_device');
  END IF;

  v_name := btrim(regexp_replace(coalesce(p_name, ''), '[[:cntrl:]]+', ' ', 'g'));
  v_name := regexp_replace(v_name, '\s+', ' ', 'g');
  IF length(v_name) < 1 OR length(v_name) > 40 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_name');
  END IF;
  v_key := lower(v_name);

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.status <> 'active' OR v_a.expires_at < now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'expired');
  END IF;

  SELECT c.* INTO v_class FROM public.teacher_guest_classes c
    JOIN public.teacher_guest_access ac ON ac.classroom_id = c.id
   WHERE ac.assignment_id = v_a.id AND c.active;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_classroom'); END IF;
  -- ⚠ Shared classes only. A per-pupil-PIN class already has a real roster and
  --   a real identity; adding a device claim there would be a second, weaker
  --   way to become a pupil.
  IF v_class.access_type <> 'shared' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_shared');
  END IF;

  -- Is this name already registered to a DIFFERENT device in this classroom?
  SELECT device_code INTO v_owner FROM public.teacher_guest_devices
   WHERE classroom_id = v_class.id AND name_key = v_key;
  IF v_owner IS NOT NULL AND v_owner <> p_device THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_taken');
  END IF;

  -- Register (or refresh) this device. A device may change its name: the row is
  -- keyed on the device, so the old name is released for someone else.
  INSERT INTO public.teacher_guest_devices (classroom_id, device_code, name_display, name_key)
  VALUES (v_class.id, p_device, v_name, v_key)
  ON CONFLICT (classroom_id, device_code)
  DO UPDATE SET name_display = EXCLUDED.name_display,
                name_key     = EXCLUDED.name_key,
                last_seen_at = now();

  -- ⚠ THE LOCKOUT FIX. teacher_guest_open() refuses to reopen while an
  --   UNSUBMITTED row exists for this name. Now that the name is proven to
  --   belong to this device, that row is this child's own abandoned attempt —
  --   a reload, a flat battery, a closed tab — so it is cleared and they get a
  --   fresh start. A SUBMITTED row is never touched: that is real work.
  v_subkey := 'shared:' || v_key;
  DELETE FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_subkey AND submitted_at IS NULL;

  RETURN jsonb_build_object('ok', true, 'name', v_name);
END;
$function$;

-- ── guest_grant_retry(p_assignment_id uuid, p_name_key text)
CREATE OR REPLACE FUNCTION public.guest_grant_retry(p_assignment_id uuid, p_name_key text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_a public.guest_assignments%ROWTYPE;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE id = p_assignment_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.teacher_id <> auth.uid() AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  UPDATE public.guest_submissions SET retry_allowed = true
   WHERE assignment_id = p_assignment_id AND name_key = lower(btrim(p_name_key));
  RETURN jsonb_build_object('ok', FOUND);
END;
$function$;

-- ── guest_keep_session_token()
CREATE OR REPLACE FUNCTION public.guest_keep_session_token()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF NEW.open_token_hash IS NOT NULL THEN
    NEW.session_token_hash := NEW.open_token_hash;
  END IF;
  RETURN NEW;
END;
$function$;

-- ── guest_mark_material(p_code text, p_name text, p_token text, p_material_id uuid, p_done boolean)
CREATE OR REPLACE FUNCTION public.guest_mark_material(p_code text, p_name text, p_token text, p_material_id uuid, p_done boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a     public.guest_assignments%ROWTYPE;
  v_key   text := lower(btrim(p_name));
  v_sub   public.guest_submissions%ROWTYPE;
  v_class uuid;
BEGIN
  IF p_material_id IS NULL OR v_key = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_request');
  END IF;

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  -- Only the browser that passed the PIN for this pupil. Unlike guest_submit
  -- this hash survives submission, because ticking a worksheet afterwards is
  -- the normal case rather than an attack.
  IF v_sub.session_token_hash IS NULL
     OR p_token IS NULL
     OR encode(digest(p_token, 'sha256'), 'hex') <> v_sub.session_token_hash THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_token');
  END IF;

  SELECT classroom_id INTO v_class FROM public.teacher_guest_access WHERE assignment_id = v_a.id;
  IF v_class IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'no_classroom'); END IF;

  IF NOT EXISTS (SELECT 1 FROM public.classroom_materials
                  WHERE material_id = p_material_id AND classroom_id = v_class) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_shared');
  END IF;

  IF coalesce(p_done, true) THEN
    INSERT INTO public.guest_material_completions (material_id, classroom_id, name_key, name_display)
    VALUES (p_material_id, v_class, v_key, btrim(p_name))
    ON CONFLICT (material_id, name_key)
    DO UPDATE SET done_at = now(), name_display = EXCLUDED.name_display;
  ELSE
    -- A pupil may untick: they tapped it by mistake, or went back to finish it.
    DELETE FROM public.guest_material_completions
     WHERE material_id = p_material_id AND name_key = v_key;
  END IF;

  RETURN jsonb_build_object('ok', true, 'done', coalesce(p_done, true), 'material_id', p_material_id);
END;
$function$;

-- ── guest_my_assignments()
CREATE OR REPLACE FUNCTION public.guest_my_assignments()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_rows jsonb;
BEGIN
  IF auth.uid() IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id', a.id, 'code', a.code, 'title', a.title, 'classroom', a.classroom_label,
           'subject_pack_id', a.subject_pack_id, 'question_count', a.question_count,
           'chapter_ids', coalesce(a.chapter_ids, '[]'::jsonb),
           'duration_mins', a.duration_mins, 'due_at', a.due_at, 'expires_at', a.expires_at,
           'status', a.status, 'max_students', a.max_students, 'created_at', a.created_at,
           'submissions', (SELECT count(*) FROM public.guest_submissions s
                            WHERE s.assignment_id = a.id AND s.submitted_at IS NOT NULL))
         ORDER BY a.created_at DESC), '[]'::jsonb)
    INTO v_rows FROM public.guest_assignments a WHERE a.teacher_id = auth.uid();
  RETURN jsonb_build_object('ok', true, 'assignments', v_rows);
END;
$function$;

-- ── guest_note_failure(p_assignment uuid)
CREATE OR REPLACE FUNCTION public.guest_note_failure(p_assignment uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_max     CONSTANT int := 40;                       -- fails per hour, all names
  v_lock    CONSTANT interval := interval '15 minutes';
  v_row     public.guest_assignment_attempts%ROWTYPE;
BEGIN
  INSERT INTO public.guest_assignment_attempts (assignment_id, fails, window_start)
  VALUES (p_assignment, 1, now())
  ON CONFLICT (assignment_id) DO UPDATE
    SET fails = CASE WHEN public.guest_assignment_attempts.window_start < now() - interval '1 hour'
                     THEN 1 ELSE public.guest_assignment_attempts.fails + 1 END,
        window_start = CASE WHEN public.guest_assignment_attempts.window_start < now() - interval '1 hour'
                            THEN now() ELSE public.guest_assignment_attempts.window_start END
  RETURNING * INTO v_row;

  IF v_row.fails >= v_max THEN
    UPDATE public.guest_assignment_attempts
       SET locked_until = now() + v_lock WHERE assignment_id = p_assignment;
    RETURN true;
  END IF;
  RETURN false;
END;
$function$;

-- ── guest_open(p_code text, p_name text, p_pin text, p_ip text, p_ua text)
CREATE OR REPLACE FUNCTION public.guest_open(p_code text, p_name text, p_pin text, p_ip text DEFAULT NULL::text, p_ua text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a          public.guest_assignments%ROWTYPE;
  v_key        text;
  v_att        public.guest_pin_attempts%ROWTYPE;
  v_glob       public.guest_assignment_attempts%ROWTYPE;
  v_max_tries  CONSTANT int := 5;
  v_lock_mins  CONSTANT int := 10;
  v_taken      int;
  v_sub        public.guest_submissions%ROWTYPE;
  v_locked_all boolean;
  v_token      text;
BEGIN
  IF p_name IS NULL OR btrim(p_name) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_required');
  END IF;
  v_key := lower(btrim(p_name));

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  SELECT * INTO v_glob FROM public.guest_assignment_attempts WHERE assignment_id = v_a.id;
  IF FOUND AND v_glob.locked_until IS NOT NULL AND v_glob.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked',
      'secsLeft', extract(epoch FROM (v_glob.locked_until - now()))::int, 'scope', 'assignment');
  END IF;

  SELECT * INTO v_att FROM public.guest_pin_attempts
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF FOUND AND v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked',
      'secsLeft', extract(epoch FROM (v_att.locked_until - now()))::int, 'scope', 'name');
  END IF;

  IF v_a.status <> 'active' OR v_a.expires_at < now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'expired');
  END IF;

  IF v_a.pin_hash IS NULL OR crypt(p_pin, v_a.pin_hash) <> v_a.pin_hash THEN
    v_locked_all := public.guest_note_failure(v_a.id);
    INSERT INTO public.guest_pin_attempts (assignment_id, name_key, attempts, updated_at)
    VALUES (v_a.id, v_key, 1, now())
    ON CONFLICT (assignment_id, name_key) DO UPDATE
      SET attempts     = public.guest_pin_attempts.attempts + 1,
          locked_until = CASE WHEN public.guest_pin_attempts.attempts + 1 >= v_max_tries
                              THEN now() + (v_lock_mins || ' minutes')::interval END,
          updated_at   = now()
    RETURNING * INTO v_att;

    IF v_locked_all THEN
      RETURN jsonb_build_object('ok', false, 'error', 'locked', 'secsLeft', 900, 'scope', 'assignment');
    END IF;
    IF v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
      RETURN jsonb_build_object('ok', false, 'error', 'locked',
        'secsLeft', v_lock_mins * 60, 'scope', 'name');
    END IF;
    RETURN jsonb_build_object('ok', false, 'error', 'bad_pin',
      'attemptsLeft', greatest(0, v_max_tries - v_att.attempts));
  END IF;

  DELETE FROM public.guest_pin_attempts WHERE assignment_id = v_a.id AND name_key = v_key;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;

  IF FOUND AND v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_taken',
      'name', v_sub.name_display, 'pct', v_sub.pct);
  END IF;

  -- B1: a fresh token for every successful open.
  v_token := encode(gen_random_bytes(32), 'hex');

  IF NOT FOUND THEN
    SELECT count(*) INTO v_taken FROM public.guest_submissions
     WHERE assignment_id = v_a.id
       AND (submitted_at IS NOT NULL OR started_at > now() - interval '2 hours');
    IF v_taken >= v_a.max_students THEN
      RETURN jsonb_build_object('ok', false, 'error', 'full', 'max', v_a.max_students);
    END IF;
    INSERT INTO public.guest_submissions
      (assignment_id, name_display, name_key, ip, user_agent, open_token_hash)
    VALUES (v_a.id, btrim(p_name), v_key, p_ip, p_ua,
            encode(digest(v_token, 'sha256'), 'hex'));
  ELSE
    -- B2: the clock restarts ONLY for a genuine granted retry. Reopening an
    -- unfinished attempt keeps the original started_at, so refreshing the page
    -- no longer buys more time.
    UPDATE public.guest_submissions
       SET open_token_hash = encode(digest(v_token, 'sha256'), 'hex'),
           started_at = CASE WHEN v_sub.retry_allowed THEN now() ELSE started_at END
     WHERE id = v_sub.id;
  END IF;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object(
      'id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'teacher', v_a.teacher_label, 'classroom', v_a.classroom_label,
      'subject_pack_id', v_a.subject_pack_id, 'question_ids', v_a.question_ids,
      'question_count', v_a.question_count, 'duration_mins', v_a.duration_mins,
      'due_at', v_a.due_at, 'expires_at', v_a.expires_at),
    'name', btrim(p_name),
    'token', v_token,
    'is_retry', coalesce(v_sub.retry_allowed, false));
END;
$function$;

-- ── guest_results(p_assignment_id uuid)
CREATE OR REPLACE FUNCTION public.guest_results(p_assignment_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_a public.guest_assignments%ROWTYPE; v_rows jsonb;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE id = p_assignment_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.teacher_id <> auth.uid() AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'name', s.name_display, 'name_key', s.name_key,
           'score', s.score, 'total', s.total, 'pct', s.pct,
           'attempt', s.attempt, 'retry_allowed', s.retry_allowed,
           'elapsed_secs', s.elapsed_secs, 'over_time', s.over_time,
           'answers', s.answers, 'submitted_at', s.submitted_at)
         ORDER BY s.submitted_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows FROM public.guest_submissions s WHERE s.assignment_id = v_a.id;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object('id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'question_ids', v_a.question_ids, 'question_count', v_a.question_count,
      'classroom', v_a.classroom_label, 'due_at', v_a.due_at,
      'expires_at', v_a.expires_at, 'status', v_a.status, 'max_students', v_a.max_students),
    'submissions', v_rows);
END;
$function$;

-- ── guest_set_my_name(p_code text, p_name text, p_token text, p_new_name text)
CREATE OR REPLACE FUNCTION public.guest_set_my_name(p_code text, p_name text, p_token text, p_new_name text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a     public.guest_assignments%ROWTYPE;
  v_key   text := lower(btrim(p_name));
  v_sub   public.guest_submissions%ROWTYPE;
  v_new   text;
  v_pupil public.teacher_guest_pupils%ROWTYPE;
BEGIN
  -- ⚠ Collapse whitespace and strip control characters. This string is rendered
  --   into the teacher's results list and into a share message; the escaping at
  --   those ends is the guard, but a name should not carry newlines regardless.
  v_new := btrim(regexp_replace(coalesce(p_new_name, ''), '[[:cntrl:]]+', ' ', 'g'));
  v_new := regexp_replace(v_new, '\s+', ' ', 'g');
  IF length(v_new) < 2 OR length(v_new) > 40 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_name');
  END IF;

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  IF v_sub.session_token_hash IS NULL
     OR p_token IS NULL
     OR encode(digest(p_token, 'sha256'), 'hex') <> v_sub.session_token_hash THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_token');
  END IF;

  -- ⚠ Only per-pupil-PIN sign-ins. There name_key is the pupil's UUID, so the
  --   name is a label and renaming is safe. In shared-PIN mode the name IS the
  --   key — see the header.
  IF v_key !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_supported');
  END IF;

  SELECT * INTO v_pupil FROM public.teacher_guest_pupils WHERE id = v_key::uuid AND active;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_pupil'); END IF;

  -- The roster name. The trigger above writes the history row.
  UPDATE public.teacher_guest_pupils SET name = v_new WHERE id = v_pupil.id;

  -- ⚠ Existing submissions carry a name_display snapshot. Leaving it stale
  --   would show the teacher the OLD name against work already handed in, which
  --   is exactly the confusion this feature is meant to remove. name_key is
  --   untouched — that is the identity and it does not move.
  UPDATE public.guest_submissions SET name_display = v_new WHERE name_key = v_key;
  UPDATE public.guest_material_completions SET name_display = v_new WHERE name_key = v_key;

  RETURN jsonb_build_object('ok', true, 'name', v_new);
END;
$function$;

-- ── guest_submit(p_code text, p_name text, p_answers jsonb, p_score integer, p_total integer, p_token text)
CREATE OR REPLACE FUNCTION public.guest_submit(p_code text, p_name text, p_answers jsonb, p_score integer, p_total integer, p_token text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a    public.guest_assignments%ROWTYPE;
  v_key  text := lower(btrim(p_name));
  v_sub  public.guest_submissions%ROWTYPE;
  v_pct  int := CASE WHEN coalesce(p_total,0) > 0 THEN round(p_score::numeric / p_total * 100) ELSE 0 END;
  v_el   int;
  v_over boolean := false;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  -- B1: only the browser that opened this attempt may submit it.
  IF v_sub.open_token_hash IS NULL
     OR p_token IS NULL
     OR encode(digest(p_token, 'sha256'), 'hex') <> v_sub.open_token_hash THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_token');
  END IF;

  IF v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_submitted', 'pct', v_sub.pct);
  END IF;

  v_el := extract(epoch FROM (now() - v_sub.started_at))::int;
  IF v_a.duration_mins IS NOT NULL THEN
    v_over := v_el > (v_a.duration_mins * 60) + 60;
  END IF;

  UPDATE public.guest_submissions
     SET answers = coalesce(p_answers, '[]'::jsonb),
         score = p_score, total = p_total, pct = v_pct,
         attempt = CASE WHEN v_sub.submitted_at IS NOT NULL THEN v_sub.attempt + 1 ELSE v_sub.attempt END,
         retry_allowed = false, submitted_at = now(),
         elapsed_secs = v_el, over_time = v_over,
         open_token_hash = NULL          -- one token, one submission
   WHERE id = v_sub.id;

  RETURN jsonb_build_object('ok', true, 'score', p_score, 'total', p_total, 'pct', v_pct,
    'title', v_a.title, 'teacher', v_a.teacher_label,
    'elapsed_secs', v_el, 'over_time', v_over);
END;
$function$;

-- ── is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce((SELECT p.role = 'admin' FROM public.profiles p WHERE p.id = auth.uid()), false);
$function$;

-- ── is_approved_teacher()
CREATE OR REPLACE FUNCTION public.is_approved_teacher()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce((
    SELECT (p.role = 'admin')
        OR (p.role = 'teacher' AND p.teacher_status = 'approved')
    FROM public.profiles p WHERE p.id = auth.uid()
  ), false);
$function$;

-- ── is_family_member(p_family uuid)
CREATE OR REPLACE FUNCTION public.is_family_member(p_family uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM public.families f
             WHERE f.id = p_family AND f.parent_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM public.family_members m
             WHERE m.family_id = p_family AND m.user_id = auth.uid())
  );
$function$;

-- ── is_family_owner(p_family uuid)
CREATE OR REPLACE FUNCTION public.is_family_owner(p_family uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.families f
                  WHERE f.id = p_family AND f.parent_id = auth.uid());
$function$;

-- ── is_super_admin()
CREATE OR REPLACE FUNCTION public.is_super_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce((SELECT p.is_super_admin FROM public.profiles p WHERE p.id = auth.uid()), false);
$function$;

-- ── is_teacher()
CREATE OR REPLACE FUNCTION public.is_teacher()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce((SELECT p.role = 'teacher' FROM public.profiles p WHERE p.id = auth.uid()), false);
$function$;

-- ── join_classroom(p_invite_code text, p_student_id uuid)
CREATE OR REPLACE FUNCTION public.join_classroom(p_invite_code text, p_student_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_class public.classrooms%ROWTYPE;
BEGIN
  IF NOT (p_student_id = public.current_student_id()
          OR public.owns_student(p_student_id)
          OR public.is_admin()) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  SELECT * INTO v_class FROM public.classrooms
  WHERE upper(invite_code) = upper(trim(p_invite_code)) AND is_active LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_code');
  END IF;

  INSERT INTO public.enrollments (student_id, classroom_id)
  VALUES (p_student_id, v_class.id)
  ON CONFLICT (student_id, classroom_id)
  DO UPDATE SET is_active = true;

  RETURN jsonb_build_object(
    'ok', true,
    'classroom', jsonb_build_object(
      'id', v_class.id, 'name', v_class.name, 'subject', v_class.subject,
      'grade_level', v_class.grade_level, 'schedule', v_class.schedule)
  );
END;
$function$;

-- ── leaderboard_enabled()
CREATE OR REPLACE FUNCTION public.leaderboard_enabled()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT coalesce(
    (SELECT (value ->> 'leaderboard_enabled')::boolean
       FROM public.mm_data WHERE key = 'global_settings'),
    false);
$function$;

-- ── list_family_members()
CREATE OR REPLACE FUNCTION public.list_family_members()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_family uuid;
  v_rows   jsonb;
  v_invite jsonb;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT f.id INTO v_family FROM public.families f WHERE f.parent_id = auth.uid();
  IF v_family IS NULL THEN
    SELECT m.family_id INTO v_family FROM public.family_members m WHERE m.user_id = auth.uid();
  END IF;
  IF v_family IS NULL THEN
    RETURN jsonb_build_object('ok', true, 'members', '[]'::jsonb, 'pending', null);
  END IF;

  SELECT coalesce(jsonb_agg(x ORDER BY x->>'role' DESC, x->>'name'), '[]'::jsonb)
    INTO v_rows
    FROM (
      -- The owner, from families.parent_id, so this is correct even for a
      -- family that predates the backfill in Part 5.
      SELECT jsonb_build_object(
               'user_id', p.id, 'name', p.full_name, 'role', 'owner',
               'is_me', p.id = auth.uid(), 'since', f.created_at
             ) AS x
        FROM public.families f JOIN public.profiles p ON p.id = f.parent_id
       WHERE f.id = v_family
      UNION ALL
      SELECT jsonb_build_object(
               'user_id', p.id, 'name', p.full_name, 'role', m.role,
               'is_me', p.id = auth.uid(), 'since', m.created_at
             )
        FROM public.family_members m JOIN public.profiles p ON p.id = m.user_id
       WHERE m.family_id = v_family AND m.role <> 'owner'
    ) s;

  -- An unused, unexpired invite, so the owner can see one is outstanding and
  -- revoke it. The token itself is NOT returned — it exists only in the link
  -- that was already shared.
  SELECT jsonb_build_object('created_at', i.created_at, 'expires_at', i.expires_at)
    INTO v_invite
    FROM public.family_invites i
   WHERE i.family_id = v_family AND i.used_at IS NULL AND i.expires_at > now()
   ORDER BY i.created_at DESC LIMIT 1;

  RETURN jsonb_build_object(
    'ok', true, 'family_id', v_family, 'members', v_rows,
    'pending', v_invite, 'cap', public.family_member_cap(),
    'is_owner', public.is_family_owner(v_family)
  );
END;
$function$;

-- ── mark_report_seen(p_report_id uuid)
CREATE OR REPLACE FUNCTION public.mark_report_seen(p_report_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_sid uuid;
BEGIN
  v_sid := current_student_id();
  IF v_sid IS NULL THEN RETURN; END IF;

  UPDATE public.question_reports
  SET student_last_seen_at = NOW()
  WHERE id = p_report_id AND student_id = v_sid;
END;
$function$;

-- ── minigame_poll_create(p_question text, p_options jsonb)
CREATE OR REPLACE FUNCTION public.minigame_poll_create(p_question text, p_options jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_student uuid := public.current_student_id(); v_code text; v_n integer;
BEGIN
  IF v_student IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_signed_in'); END IF;
  IF p_question IS NULL OR length(btrim(p_question)) NOT BETWEEN 1 AND 4000 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_question');
  END IF;
  IF jsonb_typeof(p_options) <> 'array' OR jsonb_array_length(p_options) NOT BETWEEN 2 AND 4 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_options');
  END IF;

  -- Housekeeping ON CREATE, not a cron: a day-old poll is unreadable anyway
  -- (results checks expiry), this just stops the table growing forever.
  DELETE FROM public.minigame_polls WHERE expires_at < now() - interval '1 day';

  -- The game hands out one crowd poll per climb; 12/hour absorbs enthusiastic
  -- replays while making the endpoint useless as free bulk storage.
  SELECT count(*) INTO v_n FROM public.minigame_polls
   WHERE student_id = v_student AND created_at > now() - interval '1 hour';
  IF v_n >= 12 THEN RETURN jsonb_build_object('ok', false, 'error', 'too_many'); END IF;

  v_code := upper(substr(encode(gen_random_bytes(6), 'hex'), 1, 8));
  INSERT INTO public.minigame_polls(code, student_id, question, options, votes, expires_at)
  VALUES (v_code, v_student, p_question, p_options,
          -- one zero per option, so a 2-option poll never reports phantom slots
          (SELECT jsonb_agg(0) FROM jsonb_array_elements(p_options)),
          now() + interval '3 minutes');

  RETURN jsonb_build_object('ok', true, 'code', v_code, 'seconds', 180);
END $function$;

-- ── minigame_poll_results(p_code text)
CREATE OR REPLACE FUNCTION public.minigame_poll_results(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE p public.minigame_polls%ROWTYPE;
BEGIN
  SELECT * INTO p FROM public.minigame_polls WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  RETURN jsonb_build_object('ok', true,
    'question', p.question, 'options', p.options, 'votes', p.votes,
    'seconds_left', greatest(0, floor(extract(epoch from (p.expires_at - now()))))::integer);
END $function$;

-- ── minigame_poll_vote(p_code text, p_option integer)
CREATE OR REPLACE FUNCTION public.minigame_poll_vote(p_code text, p_option integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE p public.minigame_polls%ROWTYPE; total integer;
BEGIN
  SELECT * INTO p FROM public.minigame_polls WHERE code = upper(btrim(p_code)) FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF p.expires_at < now() THEN RETURN jsonb_build_object('ok', false, 'error', 'closed'); END IF;
  IF p_option IS NULL OR p_option < 0 OR p_option >= jsonb_array_length(p.options) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_option');
  END IF;
  SELECT coalesce(sum(v::integer), 0) INTO total FROM jsonb_array_elements_text(p.votes) v;
  IF total >= 500 THEN RETURN jsonb_build_object('ok', false, 'error', 'full'); END IF;

  UPDATE public.minigame_polls
     SET votes = jsonb_set(votes, ARRAY[p_option::text],
                           to_jsonb(coalesce((votes->>p_option)::integer, 0) + 1))
   WHERE code = p.code
   RETURNING votes INTO p.votes;

  RETURN jsonb_build_object('ok', true, 'votes', p.votes);
END $function$;

-- ── mint_student_session(p_username text, p_pin text)
CREATE OR REPLACE FUNCTION public.mint_student_session(p_username text, p_pin text)
 RETURNS jsonb
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT public.verify_student_pin(p_username, p_pin);
$function$;

-- ── my_credit_ledger(p_limit integer)
CREATE OR REPLACE FUNCTION public.my_credit_ledger(p_limit integer DEFAULT 30)
 RETURNS TABLE(delta integer, balance_after integer, reason text, created_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  select l.delta, l.balance_after, l.reason, l.created_at
  from public.credit_ledger l
  where l.user_id = auth.uid()
  order by l.created_at desc
  limit greatest(1, least(coalesce(p_limit, 30), 200));
$function$;

-- ── my_credits()
CREATE OR REPLACE FUNCTION public.my_credits()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── my_entitlements()
CREATE OR REPLACE FUNCTION public.my_entitlements()
 RETURNS TABLE(chapter_id text, expires_at timestamp with time zone, source text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  select e.chapter_id, e.expires_at, e.source
  from public.chapter_entitlements e
  where e.user_id = auth.uid() and e.expires_at > now()
  order by e.expires_at desc;
$function$;

-- ── my_member_family()
CREATE OR REPLACE FUNCTION public.my_member_family()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_row jsonb;
BEGIN
  IF auth.uid() IS NULL THEN RETURN NULL; END IF;
  SELECT jsonb_build_object(
           'id', f.id, 'family_name', f.family_name, 'family_code', f.family_code,
           'parent_id', f.parent_id, 'created_at', f.created_at, 'my_role', m.role
         )
    INTO v_row
    FROM public.family_members m JOIN public.families f ON f.id = m.family_id
   WHERE m.user_id = auth.uid()
   LIMIT 1;
  RETURN v_row;
END;
$function$;

-- ── my_referrals()
CREATE OR REPLACE FUNCTION public.my_referrals()
 RETURNS TABLE(referred_name text, status text, created_at timestamp with time zone, activated_at timestamp with time zone, credits_awarded integer)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  select p.full_name, r.status, r.created_at, r.activated_at, r.credits_awarded
  from public.referrals r
  join public.profiles p on p.id = r.referred_id
  where r.referrer_id = auth.uid()
  order by r.created_at desc;
$function$;

-- ── my_teacher_status()
CREATE OR REPLACE FUNCTION public.my_teacher_status()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_p public.profiles%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  SELECT * INTO v_p FROM public.profiles WHERE id = auth.uid();
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_profile'); END IF;
  RETURN jsonb_build_object('ok', true,
    'role', v_p.role, 'status', v_p.teacher_status,
    'tier', coalesce(v_p.teacher_tier, 'unverified'),
    'requested_at', v_p.teacher_requested_at,
    'is_teacher', (v_p.role = 'admin') OR (v_p.role = 'teacher' AND v_p.teacher_status = 'approved'));
END;
$function$;

-- ── owns_classroom(p_classroom uuid)
CREATE OR REPLACE FUNCTION public.owns_classroom(p_classroom uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.classrooms c
    WHERE c.id = p_classroom AND c.teacher_id = auth.uid()
  );
$function$;

-- ── owns_student(p_student uuid)
CREATE OR REPLACE FUNCTION public.owns_student(p_student uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.students s
    JOIN public.families f ON f.id = s.family_id
    WHERE s.id = p_student
      AND public.is_family_member(f.id)
  );
$function$;

-- ── owns_student_txt(p_student text)
CREATE OR REPLACE FUNCTION public.owns_student_txt(p_student text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT CASE
           WHEN p_student ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
           THEN public.owns_student(p_student::uuid)
           ELSE false
         END;
$function$;

-- ── parent_of_classroom_member(p_classroom uuid)
CREATE OR REPLACE FUNCTION public.parent_of_classroom_member(p_classroom uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.enrollments e
    JOIN public.students s ON s.id = e.student_id
    JOIN public.families f ON f.id = s.family_id
    WHERE e.classroom_id = p_classroom AND public.is_family_member(f.id)
  );
$function$;

-- ── payment_admin_confirm(p_payment_id uuid, p_provider_ref text)
CREATE OR REPLACE FUNCTION public.payment_admin_confirm(p_payment_id uuid, p_provider_ref text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_row     public.payments%ROWTYPE;
  v_from    timestamptz;
  v_new_exp timestamptz;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_admin');
  END IF;

  SELECT * INTO v_row FROM public.payments WHERE id = p_payment_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_payment');
  END IF;

  -- ⚠ Idempotent, and deliberately NOT an error. Two admins on the same queue,
  --   or one double-tap, must not grant two months for one transfer.
  IF v_row.status = 'confirmed' THEN
    RETURN jsonb_build_object('ok', true, 'already', true,
      'expires_at', (SELECT expires_at FROM public.profiles WHERE id = v_row.user_id));
  END IF;
  IF v_row.status = 'rejected' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_rejected');
  END IF;

  -- ⚠ Extend from whichever is later. Confirming a renewal three days early
  --   must not throw away the days already paid for.
  SELECT greatest(now(), coalesce(expires_at, now())) INTO v_from
    FROM public.profiles WHERE id = v_row.user_id FOR UPDATE;
  IF v_from IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_account');
  END IF;
  v_new_exp := v_from + (v_row.months || ' months')::interval;

  -- One active subscription per user. A superseded row keeps its history but
  -- stops selecting a plan, so an old tier cannot outlive the payment for it.
  UPDATE public.subscriptions
     SET status = 'superseded'
   WHERE user_id = v_row.user_id AND status = 'active';

  INSERT INTO public.subscriptions (user_id, plan_id, status, started_at, expires_at)
  VALUES (v_row.user_id, v_row.plan_id, 'active', now(), v_new_exp);

  -- THE gate questions.js reads.
  UPDATE public.profiles SET expires_at = v_new_exp WHERE id = v_row.user_id;

  UPDATE public.payments
     SET status       = 'confirmed',
         processed_at = now(),
         provider_ref = coalesce(nullif(btrim(coalesce(p_provider_ref, '')), ''), provider_ref)
   WHERE id = v_row.id;

  RETURN jsonb_build_object('ok', true, 'already', false,
    'user_id', v_row.user_id, 'plan_id', v_row.plan_id,
    'months', v_row.months, 'expires_at', v_new_exp);
END
$function$;

-- ── payment_admin_reject(p_payment_id uuid, p_reason text)
CREATE OR REPLACE FUNCTION public.payment_admin_reject(p_payment_id uuid, p_reason text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_row public.payments%ROWTYPE;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_admin');
  END IF;

  SELECT * INTO v_row FROM public.payments WHERE id = p_payment_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_payment');
  END IF;
  -- ⚠ A confirmed payment is never rejected here. Access has already been
  --   granted; taking it back is a separate, deliberate act with its own
  --   audit trail, not a one-tap undo on a queue screen.
  IF v_row.status = 'confirmed' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_confirmed');
  END IF;

  UPDATE public.payments
     SET status       = 'rejected',
         processed_at = now(),
         notes        = nullif(btrim(coalesce(p_reason, '')), '')
   WHERE id = v_row.id;

  RETURN jsonb_build_object('ok', true, 'status', 'rejected');
END
$function$;

-- ── payment_mark_sent(p_payment_id uuid, p_payer_note text)
CREATE OR REPLACE FUNCTION public.payment_mark_sent(p_payment_id uuid, p_payer_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.payments%ROWTYPE;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT * INTO v_row FROM public.payments
   WHERE id = p_payment_id AND user_id = v_uid FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_payment');
  END IF;
  IF v_row.status = 'confirmed' THEN
    RETURN jsonb_build_object('ok', true, 'status', 'confirmed', 'already', true);
  END IF;
  IF v_row.status NOT IN ('pending','sent') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_open');
  END IF;

  UPDATE public.payments
     SET status     = 'sent',
         claimed_at = coalesce(claimed_at, now()),
         payer_note = nullif(btrim(coalesce(p_payer_note, '')), '')
   WHERE id = v_row.id;

  RETURN jsonb_build_object('ok', true, 'status', 'sent');
END
$function$;

-- ── payment_settings()
CREATE OR REPLACE FUNCTION public.payment_settings()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT jsonb_build_object(
    'juice_enabled', coalesce((v ->> 'juice_enabled')::boolean, false),
    'juice_number',  coalesce(v ->> 'juice_number', ''),
    'juice_name',    coalesce(v ->> 'juice_name', ''),
    'juice_note',    coalesce(v ->> 'juice_note', '')
  )
  FROM (SELECT coalesce((SELECT value FROM public.mm_data WHERE key = 'payment_settings'), '{}'::jsonb) AS v) s;
$function$;

-- ── payment_start_juice(p_plan_id text, p_months integer)
CREATE OR REPLACE FUNCTION public.payment_start_juice(p_plan_id text, p_months integer DEFAULT 1)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions', 'pg_temp'
AS $function$
DECLARE
  -- No 0/O/1/I/L: this gets read off a screen and typed into a Juice message.
  ALPHABET constant text := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  v_uid    uuid := auth.uid();
  v_cfg    jsonb := public.payment_settings();
  v_plan   public.plans%ROWTYPE;
  v_months integer := greatest(1, least(12, coalesce(p_months, 1)));
  v_open   integer;
  v_row    public.payments%ROWTYPE;
  v_ref    text;
  i        integer;
  t        integer;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF coalesce((v_cfg ->> 'juice_enabled')::boolean, false) IS NOT TRUE
     OR coalesce(v_cfg ->> 'juice_number', '') = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'juice_disabled');
  END IF;

  SELECT * INTO v_plan FROM public.plans WHERE id = p_plan_id;
  IF NOT FOUND OR v_plan.is_active IS NOT TRUE THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unknown_plan');
  END IF;
  -- A free plan has nothing to pay for, and charging Rs 0 would produce a
  -- reference an admin can never match to a transfer.
  IF coalesce(v_plan.price_mur, 0) <= 0 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'plan_not_purchasable');
  END IF;

  -- ⚠ Reuse rather than pile up. A parent who taps Buy four times must end up
  --   with ONE reference, or the admin sees four rows for one transfer and has
  --   to guess which to confirm.
  SELECT * INTO v_row FROM public.payments
   WHERE user_id = v_uid AND plan_id = p_plan_id AND months = v_months
     AND status IN ('pending','sent') AND reference IS NOT NULL
   ORDER BY created_at DESC LIMIT 1;
  IF FOUND THEN
    RETURN jsonb_build_object('ok', true, 'reused', true,
      'payment_id', v_row.id, 'reference', v_row.reference,
      'amount_mur', v_row.amount_mur, 'months', v_row.months,
      'status', v_row.status, 'plan_name', v_plan.name,
      'juice_number', v_cfg ->> 'juice_number', 'juice_name', v_cfg ->> 'juice_name',
      'juice_note', v_cfg ->> 'juice_note');
  END IF;

  SELECT count(*) INTO v_open FROM public.payments
   WHERE user_id = v_uid AND status IN ('pending','sent');
  IF v_open >= 5 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'too_many_open');
  END IF;

  FOR t IN 1..20 LOOP
    v_ref := '';
    FOR i IN 1..6 LOOP
      v_ref := v_ref || substr(ALPHABET, 1 + (get_byte(gen_random_bytes(1), 0) % length(ALPHABET)), 1);
    END LOOP;
    BEGIN
      INSERT INTO public.payments (user_id, plan_id, amount_mur, provider, status, reference, months)
      VALUES (v_uid, v_plan.id, v_plan.price_mur * v_months, 'juice', 'pending', v_ref, v_months)
      RETURNING * INTO v_row;
      EXIT;
    EXCEPTION WHEN unique_violation THEN
      v_row.id := NULL;   -- collided; go round again
    END;
  END LOOP;

  IF v_row.id IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'reference_unavailable');
  END IF;

  RETURN jsonb_build_object('ok', true, 'reused', false,
    'payment_id', v_row.id, 'reference', v_row.reference,
    'amount_mur', v_row.amount_mur, 'months', v_row.months,
    'status', v_row.status, 'plan_name', v_plan.name,
    'juice_number', v_cfg ->> 'juice_number', 'juice_name', v_cfg ->> 'juice_name',
    'juice_note', v_cfg ->> 'juice_note');
END
$function$;

-- ── plan_enforcement_on()
CREATE OR REPLACE FUNCTION public.plan_enforcement_on()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce(
    (SELECT d.value -> 'plan_enforcement_enabled' = 'true'::jsonb
       FROM public.mm_data d
      WHERE d.key = 'global_settings'
      LIMIT 1),
    false)
$function$;

-- ── plan_features_for_student(p_student uuid)
CREATE OR REPLACE FUNCTION public.plan_features_for_student(p_student uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_parent uuid;
  v_plan   public.plans;
BEGIN
  IF NOT public.plan_enforcement_on() THEN RETURN NULL; END IF;

  SELECT f.parent_id INTO v_parent
    FROM public.students s
    JOIN public.families f ON f.id = s.family_id
   WHERE s.id = p_student AND s.deleted_at IS NULL;

  IF v_parent IS NULL THEN RETURN NULL; END IF;

  SELECT p.* INTO v_plan FROM public.plan_for_user(v_parent) p;
  RETURN coalesce(v_plan.features, '{}'::jsonb);
END;
$function$;

-- ── plan_features_for_user(p_uid uuid)
CREATE OR REPLACE FUNCTION public.plan_features_for_user(p_uid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_plan public.plans;
BEGIN
  IF NOT public.plan_enforcement_on() THEN RETURN NULL; END IF;
  SELECT p.* INTO v_plan FROM public.plan_for_user(p_uid) p;
  RETURN coalesce(v_plan.features, '{}'::jsonb);
END;
$function$;

-- ── plan_for_user(p_uid uuid)
CREATE OR REPLACE FUNCTION public.plan_for_user(p_uid uuid)
 RETURNS plans
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_plan public.plans;
BEGIN
  IF p_uid IS NULL THEN
    SELECT p.* INTO v_plan FROM public.plans p WHERE p.id = 'free' LIMIT 1;
    RETURN v_plan;
  END IF;

  SELECT p.* INTO v_plan
    FROM public.subscriptions s
    JOIN public.plans p ON p.id = s.plan_id
   WHERE s.user_id = p_uid
     AND s.status  = 'active'
     AND (s.expires_at IS NULL OR s.expires_at > now())
   ORDER BY s.started_at DESC
   LIMIT 1;

  IF FOUND THEN RETURN v_plan; END IF;

  SELECT p.* INTO v_plan FROM public.plans p WHERE p.id = 'free' LIMIT 1;
  RETURN v_plan;   -- NULL if no 'free' row exists; callers must tolerate that
END;
$function$;

-- ── points_level(p_points bigint)
CREATE OR REPLACE FUNCTION public.points_level(p_points bigint)
 RETURNS smallint
 LANGUAGE sql
 IMMUTABLE PARALLEL SAFE
AS $function$
  SELECT CASE
    WHEN p_points >= 13000 THEN 12
    WHEN p_points >= 11000 THEN 11
    WHEN p_points >=  9300 THEN 10
    WHEN p_points >=  7700 THEN 9
    WHEN p_points >=  6200 THEN 8
    WHEN p_points >=  4800 THEN 7
    WHEN p_points >=  3500 THEN 6
    WHEN p_points >=  2400 THEN 5
    WHEN p_points >=  1500 THEN 4
    WHEN p_points >=   801 THEN 3
    WHEN p_points >=   301 THEN 2
    ELSE 1
  END::smallint;
$function$;

-- ── priv_write_allowed()
CREATE OR REPLACE FUNCTION public.priv_write_allowed()
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO 'public', 'pg_temp'
AS $function$
  select coalesce(current_setting('psac.priv_write', true), '') = 'on';
$function$;

-- ── purchase_chapter(p_chapter_id text)
CREATE OR REPLACE FUNCTION public.purchase_chapter(p_chapter_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── purchase_subject(p_subject_id text)
CREATE OR REPLACE FUNCTION public.purchase_subject(p_subject_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── question_points(p_question_id text)
CREATE OR REPLACE FUNCTION public.question_points(p_question_id text)
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT coalesce(
    (SELECT greatest(1, least(4, q.difficulty))::integer
       FROM public.questions q
      WHERE q.id = p_question_id),
    1);
$function$;

-- ── record_question_progress(p_items jsonb, p_student uuid)
CREATE OR REPLACE FUNCTION public.record_question_progress(p_items jsonb, p_student uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_student uuid := public.current_student_id();
  v_item    jsonb;
  v_written integer := 0;
  v_skipped integer := 0;
  v_qid     text;
  v_chapter text;
  v_pack    text;
  v_key     text;
  v_correct boolean;
  v_row     public.student_question_progress%ROWTYPE;
  v_state   text;
  v_cc      integer;
  v_rec     timestamptz;
  v_found   boolean;
  v_pts     integer := 0;
  v_total   bigint;
BEGIN
  -- A child's own token wins. An adult may name a child they own.
  IF v_student IS NULL THEN
    IF p_student IS NULL THEN
      RETURN jsonb_build_object('ok', false, 'error', 'no_student');
    END IF;
    IF NOT public.owns_student(p_student) THEN
      RETURN jsonb_build_object('ok', false, 'error', 'not_authorized');
    END IF;
    v_student := p_student;
  ELSIF p_student IS NOT NULL AND p_student <> v_student THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorized');
  END IF;

  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_items');
  END IF;
  IF jsonb_array_length(p_items) > 100 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'too_many_items');
  END IF;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_qid     := nullif(trim(v_item ->> 'question_id'), '');
    v_chapter := nullif(trim(v_item ->> 'chapter_id'), '');
    v_pack    := nullif(trim(v_item ->> 'subject_pack_id'), '');
    v_key     := nullif(trim(v_item ->> 'event_key'), '');
    v_correct := (v_item ->> 'correct')::boolean;

    CONTINUE WHEN v_qid IS NULL OR v_chapter IS NULL OR v_correct IS NULL;
    CONTINUE WHEN length(v_qid) > 128 OR length(v_chapter) > 128;

    SELECT * INTO v_row
    FROM public.student_question_progress
    WHERE student_id = v_student AND question_id = v_qid;
    v_found := FOUND;

    -- Idempotency: the same answer event replayed by a retry changes nothing.
    IF v_found AND v_key IS NOT NULL AND v_row.last_event_key = v_key THEN
      v_skipped := v_skipped + 1;
      CONTINUE;
    END IF;

    v_cc  := CASE WHEN v_correct THEN coalesce(v_row.consecutive_correct, 0) + 1 ELSE 0 END;
    v_rec := v_row.recovered_at;

    IF NOT v_correct THEN
      v_state := 'needs_practice';
    ELSIF NOT coalesce(v_row.ever_wrong, false) THEN
      v_state := 'secure';
    ELSIF v_cc >= 2 THEN
      v_state := 'secure';
      v_rec   := coalesce(v_rec, now());
    ELSE
      v_state := 'improved';
      v_rec   := coalesce(v_rec, now());
    END IF;

    -- ── POINTS ────────────────────────────────────────────────────────────
    -- Paid on the FIRST correct answer to this question and never again. Note
    -- what is deliberately NOT required: getting it right first time. A child
    -- who gets a question wrong, learns it, and comes back is exactly who this
    -- app is for, and they are paid the same as one who guessed it right.
    --
    -- _award_points() is idempotent on (student, 'question', question_id), so
    -- this is belt AND braces: even if the counter above were wrong, the ledger
    -- refuses the second payment.
    IF v_correct AND coalesce(v_row.correct_attempts, 0) = 0 THEN
      v_pts := v_pts + public._award_points(
                 v_student, 'question', v_qid, public.question_points(v_qid));
    END IF;
    -- ──────────────────────────────────────────────────────────────────────

    INSERT INTO public.student_question_progress AS t (
      student_id, question_id, subject_pack_id, chapter_id,
      first_seen_at, last_seen_at, attempts, correct_attempts, wrong_attempts,
      consecutive_correct, last_result, ever_wrong, recovered_at, state,
      last_event_key, updated_at
    ) VALUES (
      v_student, v_qid, v_pack, v_chapter,
      now(), now(), 1,
      CASE WHEN v_correct THEN 1 ELSE 0 END,
      CASE WHEN v_correct THEN 0 ELSE 1 END,
      v_cc,
      CASE WHEN v_correct THEN 'correct' ELSE 'wrong' END,
      NOT v_correct,
      v_rec, v_state, v_key, now()
    )
    ON CONFLICT (student_id, question_id) DO UPDATE SET
      subject_pack_id     = coalesce(excluded.subject_pack_id, t.subject_pack_id),
      chapter_id          = excluded.chapter_id,
      last_seen_at        = now(),
      attempts            = t.attempts + 1,
      correct_attempts    = t.correct_attempts + CASE WHEN v_correct THEN 1 ELSE 0 END,
      wrong_attempts      = t.wrong_attempts   + CASE WHEN v_correct THEN 0 ELSE 1 END,
      consecutive_correct = v_cc,
      last_result         = CASE WHEN v_correct THEN 'correct' ELSE 'wrong' END,
      ever_wrong          = t.ever_wrong OR NOT v_correct,
      recovered_at        = v_rec,
      state               = v_state,
      last_event_key      = v_key,
      updated_at          = now();

    v_written := v_written + 1;
  END LOOP;

  SELECT points INTO v_total FROM public.student_points WHERE student_id = v_student;

  RETURN jsonb_build_object(
    'ok', true,
    'written', v_written,
    'skipped', v_skipped,
    'awarded', v_pts,
    'points', coalesce(v_total, 0),
    'level', public.points_level(coalesce(v_total, 0)));
END;
$function$;

-- ── record_referral(p_code text)
CREATE OR REPLACE FUNCTION public.record_referral(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_referrer uuid;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF p_code IS NULL OR btrim(p_code) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_code');
  END IF;

  -- Idempotent: a retried call (flaky network, double-tap) must not error out
  -- or create a second row — it just reports the no-op.
  IF EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = v_uid) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_referred');
  END IF;

  SELECT id INTO v_referrer FROM public.profiles
    WHERE referral_code = upper(btrim(p_code));

  IF v_referrer IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_code');
  END IF;

  IF v_referrer = v_uid THEN
    RETURN jsonb_build_object('ok', false, 'error', 'self_referral');
  END IF;

  INSERT INTO public.referrals (referrer_id, referred_id) VALUES (v_referrer, v_uid);

  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN unique_violation THEN
  -- Race: two calls landed together. Same outcome as the EXISTS check above.
  RETURN jsonb_build_object('ok', false, 'error', 'already_referred');
END;
$function$;

-- ── record_student_activity()
CREATE OR REPLACE FUNCTION public.record_student_activity()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

-- ── redeem_student_invite(p_token text)
CREATE OR REPLACE FUNCTION public.redeem_student_invite(p_token text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_inv public.student_invites%ROWTYPE;
  v_student public.students%ROWTYPE;
  v_token text;
  v_now timestamptz := now();
  v_ttl CONSTANT interval := interval '90 days';
BEGIN
  IF p_token IS NULL OR p_token !~ '^[0-9a-f]{64}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;
  SELECT * INTO v_inv FROM public.student_invites
    WHERE token_hash = encode(digest(p_token, 'sha256'), 'hex');
  IF NOT FOUND OR v_inv.used_at IS NOT NULL OR v_inv.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;
  SELECT * INTO v_student FROM public.students
    WHERE id = v_inv.student_id AND deleted_at IS NULL;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_link');
  END IF;
  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;
  UPDATE public.student_invites SET used_at = v_now WHERE token_hash = v_inv.token_hash;
  UPDATE public.students SET pin_attempts = 0, pin_locked_until = NULL WHERE id = v_student.id;
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;
  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
    VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);
  RETURN jsonb_build_object('ok', true, 'session_token', v_token,
    'student', jsonb_build_object('id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at));
END;
$function$;

-- ── remove_family_member(p_user uuid)
CREATE OR REPLACE FUNCTION public.remove_family_member(p_user uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_family uuid;
  v_owner  uuid;
  v_n      int;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT m.family_id INTO v_family FROM public.family_members m WHERE m.user_id = p_user;
  IF v_family IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_member');
  END IF;

  SELECT f.parent_id INTO v_owner FROM public.families f WHERE f.id = v_family;
  IF p_user = v_owner THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cannot_remove_owner');
  END IF;

  IF auth.uid() <> v_owner AND auth.uid() <> p_user THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  -- .select('id') equivalent: a DELETE that matches nothing must not read as
  -- success. That misreading is how a deleted child came back as a duplicate.
  DELETE FROM public.family_members WHERE family_id = v_family AND user_id = p_user;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n = 0 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_member');
  END IF;

  RETURN jsonb_build_object('ok', true, 'removed', p_user, 'left', auth.uid() = p_user);
END;
$function$;

-- ── remove_friend(p_friend_id uuid)
CREATE OR REPLACE FUNCTION public.remove_friend(p_friend_id uuid)
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  DELETE FROM public.student_friends
  WHERE (student_id_a = public.current_student_id() AND student_id_b = p_friend_id)
     OR (student_id_b = public.current_student_id() AND student_id_a = p_friend_id);
$function$;

-- ── request_teacher_access(p_note text)
CREATE OR REPLACE FUNCTION public.request_teacher_access(p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_cur text; v_role text;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT teacher_status, role INTO v_cur, v_role FROM public.profiles WHERE id = v_uid;
  IF v_cur IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_profile');
  END IF;

  IF v_role = 'admin' OR (v_role = 'teacher' AND v_cur = 'approved') THEN
    RETURN jsonb_build_object('ok', true, 'status', 'approved', 'note', 'already_a_teacher');
  END IF;
  IF v_cur = 'pending'   THEN RETURN jsonb_build_object('ok', true, 'status', 'pending'); END IF;
  -- A rejection is not permanent, but it must be re-reviewed, so re-applying is
  -- allowed and simply puts them back in the queue.
  IF v_cur = 'suspended' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'suspended');
  END IF;

  UPDATE public.profiles
     SET teacher_status = 'pending',
         teacher_note   = left(btrim(coalesce(p_note, '')), 500),
         teacher_requested_at = now(),
         teacher_decided_at = NULL,
         teacher_decided_by = NULL
   WHERE id = v_uid;

  RETURN jsonb_build_object('ok', true, 'status', 'pending');
END;
$function$;

-- ── restore_my_account()
CREATE OR REPLACE FUNCTION public.restore_my_account()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_fam  uuid;
  v_kids int := 0;
  r      record;
  v_name text;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  UPDATE public.profiles SET deleted_at = NULL WHERE id = v_uid;

  SELECT id INTO v_fam FROM public.families WHERE parent_id = v_uid;
  IF v_fam IS NOT NULL THEN
    FOR r IN SELECT id, username FROM public.students
              WHERE family_id = v_fam AND deleted_at IS NOT NULL LOOP
      v_name := regexp_replace(r.username, '\.del\.[0-9a-f]{8}$', '');
      IF v_name <> r.username AND NOT EXISTS (
           SELECT 1 FROM public.students
            WHERE family_id = v_fam AND username = v_name AND deleted_at IS NULL) THEN
        UPDATE public.students SET username = v_name, deleted_at = NULL WHERE id = r.id;
      ELSE
        UPDATE public.students SET deleted_at = NULL WHERE id = r.id;
      END IF;
      v_kids := v_kids + 1;
    END LOOP;
  END IF;

  RETURN jsonb_build_object('ok', true, 'children', v_kids);
END;
$function$;

-- ── revoke_coparent_invite()
CREATE OR REPLACE FUNCTION public.revoke_coparent_invite()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_family uuid;
  v_n      int;
BEGIN
  SELECT f.id INTO v_family FROM public.families f WHERE f.parent_id = auth.uid();
  IF v_family IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_owner');
  END IF;
  DELETE FROM public.family_invites WHERE family_id = v_family AND used_at IS NULL;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN jsonb_build_object('ok', true, 'revoked', v_n);
END;
$function$;

-- ── set_student_pin(p_student_id uuid, p_pin text)
CREATE OR REPLACE FUNCTION public.set_student_pin(p_student_id uuid, p_pin text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_found uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unauthorized');
  END IF;

  IF p_pin !~ '^[0-9]{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  SELECT s.id INTO v_found
  FROM families f
  JOIN students s ON s.family_id = f.id
  WHERE s.id = p_student_id
    AND (public.is_family_member(f.id) OR public.is_admin())
  LIMIT 1;

  IF v_found IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'forbidden');
  END IF;

  -- Clears the lockout in BOTH places it has ever been kept, so a PIN reset
  -- always lifts it.
  UPDATE students
     SET pin              = crypt(p_pin, gen_salt('bf', 8)),
         pin_hash         = NULL,
         pin_attempts     = 0,
         pin_locked_until = NULL,
         settings         = coalesce(settings, '{}'::jsonb)
                              - 'pin_attempts' - 'pin_locked_until'
   WHERE id = p_student_id;

  RETURN jsonb_build_object('ok', true);
END;
$function$;

-- ── shop_chapter_price(p_chapter_id text)
CREATE OR REPLACE FUNCTION public.shop_chapter_price(p_chapter_id text)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE v jsonb := public.shop_settings(); v_price integer;
BEGIN
  v_price := nullif(v -> 'chapter_prices' ->> p_chapter_id, '')::integer;
  IF v_price IS NULL THEN
    v_price := nullif(v ->> 'default_chapter_price', '')::integer;
  END IF;
  RETURN coalesce(v_price, 250);
END;
$function$;

-- ── shop_settings()
CREATE OR REPLACE FUNCTION public.shop_settings()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  select coalesce((select value from public.mm_data where key = 'shop_settings'), '{}'::jsonb);
$function$;

-- ── shop_subject_price(p_subject_id text)
CREATE OR REPLACE FUNCTION public.shop_subject_price(p_subject_id text)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE v jsonb := public.shop_settings(); v_price integer;
BEGIN
  v_price := nullif(v -> 'subject_prices' ->> p_subject_id, '')::integer;
  IF v_price IS NULL THEN
    v_price := nullif(v ->> 'default_subject_price', '')::integer;
  END IF;
  RETURN coalesce(v_price, 1500);
END;
$function$;

-- ── soft_delete_student(p_student uuid)
CREATE OR REPLACE FUNCTION public.soft_delete_student(p_student uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ok  boolean;
  v_hit int;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  -- SECURITY DEFINER bypasses RLS, so this is the access control.
  SELECT EXISTS (
    SELECT 1 FROM public.students s
      JOIN public.families f ON f.id = s.family_id
     WHERE s.id = p_student AND (public.is_family_member(f.id) OR public.is_admin())
  ) INTO v_ok;
  IF NOT v_ok THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  -- The rename is what frees the name for immediate re-use; students_live_username_key
  -- then only sees live rows.
  UPDATE public.students
     SET deleted_at = now(),
         username   = username || '.del.' || left(replace(id::text, '-', ''), 8)
   WHERE id = p_student AND deleted_at IS NULL;
  GET DIAGNOSTICS v_hit = ROW_COUNT;

  DELETE FROM public.student_sessions   WHERE student_id = p_student;
  DELETE FROM public.push_subscriptions WHERE student_id = p_student;

  -- Report a no-op rather than claiming success: the caller hides the child on
  -- the strength of this answer.
  IF v_hit = 0 THEN
    RETURN jsonb_build_object('ok', true, 'already_deleted', true);
  END IF;

  RETURN jsonb_build_object('ok', true);
END;
$function$;

-- ── student_plan_features(p_student uuid)
CREATE OR REPLACE FUNCTION public.student_plan_features(p_student uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_student uuid; v_parent uuid; v_plan text; v_features jsonb;
BEGIN
  v_student := coalesce(p_student, public.current_student_id());
  IF v_student IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_student');
  END IF;

  -- Asking about a child that is not the token holder requires an adult who
  -- actually belongs to that family. A child probing a sibling's id has no
  -- auth.uid(), so every arm below is false for them.
  IF public.current_student_id() IS DISTINCT FROM v_student THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.students s
        JOIN public.families f ON f.id = s.family_id
       WHERE s.id = v_student
         AND (f.parent_id = auth.uid() OR public.is_family_member(f.id) OR public.is_admin())
    ) THEN
      RETURN jsonb_build_object('ok', false, 'error', 'not_authorized');
    END IF;
  END IF;

  SELECT f.parent_id INTO v_parent
    FROM public.students s JOIN public.families f ON f.id = s.family_id
   WHERE s.id = v_student;
  IF v_parent IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_family');
  END IF;

  SELECT sub.plan_id, p.features INTO v_plan, v_features
    FROM public.subscriptions sub
    JOIN public.plans p ON p.id = sub.plan_id
   WHERE sub.user_id = v_parent AND sub.status = 'active'
   ORDER BY sub.started_at DESC
   LIMIT 1;

  -- No active subscription is a real answer, not a failure: it means free. The
  -- client must be able to tell that apart from "could not find out", because
  -- only the first one may switch capping on.
  IF v_plan IS NULL THEN
    SELECT p.id, p.features INTO v_plan, v_features FROM public.plans p WHERE p.id = 'free';
  END IF;

  RETURN jsonb_build_object('ok', true,
    'plan_id',  coalesce(v_plan, 'free'),
    'features', coalesce(v_features, '{}'::jsonb));
END $function$;

-- ── teacher_guest_admin_recover(p_action text, p_classroom uuid)
CREATE OR REPLACE FUNCTION public.teacher_guest_admin_recover(p_action text, p_classroom uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE out_rows jsonb;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Admin access required'; END IF;
  IF p_action='list_deleted' THEN
    SELECT coalesce(jsonb_agg(jsonb_build_object(
      'id',x.id,'name',x.name,'teacher_id',x.teacher_id,
      'deleted_at',x.deleted_at,'active',x.active) ORDER BY x.deleted_at DESC),'[]')
      INTO out_rows FROM public.teacher_guest_classes x WHERE deleted_at IS NOT NULL;
    RETURN jsonb_build_object('ok',true,'classes',out_rows);
  ELSIF p_action='recover' THEN
    IF p_classroom IS NULL THEN RAISE EXCEPTION 'p_classroom required'; END IF;
    UPDATE public.teacher_guest_classes SET deleted_at=NULL WHERE id=p_classroom;
    IF NOT FOUND THEN RAISE EXCEPTION 'Classroom not found'; END IF;
    -- Also un-delete orphaned assignments that were deleted with this classroom
    UPDATE public.guest_assignments SET deleted_at=NULL
      WHERE deleted_at IS NOT NULL
        AND id IN (
          SELECT assignment_id FROM public.teacher_guest_access WHERE classroom_id=p_classroom
        );
    RETURN jsonb_build_object('ok',true);
  ELSE RAISE EXCEPTION 'Unknown action';
  END IF;
END $function$;

-- ── teacher_guest_archive_assignment(p_id uuid, p_archive boolean)
CREATE OR REPLACE FUNCTION public.teacher_guest_archive_assignment(p_id uuid, p_archive boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE g public.guest_assignments%ROWTYPE; old_status text;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;
  SELECT * INTO g FROM public.guest_assignments WHERE id=p_id AND teacher_id=auth.uid() FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Assignment unavailable'; END IF;
  IF p_archive THEN
    INSERT INTO public.teacher_guest_archives(assignment_id,previous_status) VALUES(g.id,g.status) ON CONFLICT DO NOTHING;
    UPDATE public.guest_assignments SET status='closed' WHERE id=g.id;
  ELSE
    DELETE FROM public.teacher_guest_archives WHERE assignment_id=g.id RETURNING previous_status INTO old_status;
    IF FOUND THEN UPDATE public.guest_assignments SET status=CASE WHEN expires_at<=now() THEN 'expired' ELSE old_status END WHERE id=g.id; END IF;
  END IF;
  RETURN jsonb_build_object('ok',true);
END $function$;

-- ── teacher_guest_assignment_modes()
CREATE OR REPLACE FUNCTION public.teacher_guest_assignment_modes()
 RETURNS jsonb
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT jsonb_build_object('ok',public.teacher_guest_authorized(),'modes',coalesce(jsonb_agg(
    jsonb_build_object('id',g.id,'mode',coalesce(a.mode,'legacy'),'classroom_id',a.classroom_id,
      'classroom_name',c.name,'archived',ar.assignment_id IS NOT NULL)),'[]'))
    FROM public.guest_assignments g LEFT JOIN public.teacher_guest_access a ON a.assignment_id=g.id
    LEFT JOIN public.teacher_guest_classes c ON c.id=a.classroom_id
    LEFT JOIN public.teacher_guest_archives ar ON ar.assignment_id=g.id
    WHERE g.teacher_id=auth.uid() AND public.teacher_guest_authorized();
$function$;

-- ── teacher_guest_authorized()
CREATE OR REPLACE FUNCTION public.teacher_guest_authorized()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS(SELECT 1 FROM public.profiles WHERE id=auth.uid()
    AND NOT coalesce(disabled,false) AND (expires_at IS NULL OR expires_at > now())
    AND (role='admin' OR (role='teacher' AND teacher_status='approved')));
$function$;

-- ── teacher_guest_class_state_guard()
CREATE OR REPLACE FUNCTION public.teacher_guest_class_state_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF TG_OP='INSERT' OR NEW.submitted_at IS DISTINCT FROM OLD.submitted_at THEN
    IF EXISTS(SELECT 1 FROM public.teacher_guest_archives WHERE assignment_id=NEW.assignment_id) THEN
      RAISE EXCEPTION 'Assignment archived';
    END IF;
    IF EXISTS(SELECT 1 FROM public.teacher_guest_access a JOIN public.teacher_guest_classes c ON c.id=a.classroom_id
      WHERE a.assignment_id=NEW.assignment_id AND NOT c.active) THEN RAISE EXCEPTION 'Classroom archived'; END IF;
  END IF;
  RETURN NEW;
END $function$;

-- ── teacher_guest_create_assignment(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_access text, p_classroom uuid, p_duration_mins integer, p_due_at timestamp with time zone, p_pupil_ids jsonb)
CREATE OR REPLACE FUNCTION public.teacher_guest_create_assignment(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_access text, p_classroom uuid DEFAULT NULL::uuid, p_duration_mins integer DEFAULT NULL::integer, p_due_at timestamp with time zone DEFAULT NULL::timestamp with time zone, p_pupil_ids jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  c        public.teacher_guest_classes%ROWTYPE;
  r        jsonb;
  n        integer;
  v_hours  integer := 48;
  v_chosen uuid[]  := NULL;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;
  IF p_access IS NULL OR p_access NOT IN ('classroom_pin','nickname') THEN RAISE EXCEPTION 'Choose assignment access'; END IF;

  -- A due date in the past would create work nobody can open. Refuse it with
  -- words the form can show rather than letting the row be born closed.
  IF p_due_at IS NOT NULL THEN
    IF p_due_at <= now() THEN RAISE EXCEPTION 'Choose a due date in the future'; END IF;
    v_hours := greatest(1, ceil(extract(epoch FROM (p_due_at - now())) / 3600.0))::integer;
  END IF;

  IF p_classroom IS NOT NULL THEN
    SELECT * INTO c FROM public.teacher_guest_classes WHERE id=p_classroom AND teacher_id=auth.uid() AND active FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Choose an active classroom you own'; END IF;
  END IF;

  -- Optional pupil subset. Only ids that are ACTIVE pupils of THIS classroom
  -- count; anything else in the array is ignored rather than trusted.
  IF p_pupil_ids IS NOT NULL AND jsonb_typeof(p_pupil_ids) = 'array' AND jsonb_array_length(p_pupil_ids) > 0 THEN
    IF c.id IS NULL THEN RAISE EXCEPTION 'Choose a classroom before choosing pupils'; END IF;
    SELECT array_agg(s.id) INTO v_chosen
      FROM public.teacher_guest_pupils s
      WHERE s.classroom_id = c.id AND s.active
        AND s.id::text IN (SELECT jsonb_array_elements_text(p_pupil_ids));
    IF v_chosen IS NULL OR cardinality(v_chosen) = 0 THEN RAISE EXCEPTION 'Choose at least one pupil from this classroom'; END IF;
  END IF;

  IF p_access='classroom_pin' THEN
    IF c.id IS NULL THEN RAISE EXCEPTION 'Choose a classroom for pupil PINs'; END IF;
    IF v_chosen IS NOT NULL THEN
      n := cardinality(v_chosen);
    ELSE
      SELECT count(*) INTO n FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND active;
    END IF;
    IF n=0 THEN RAISE EXCEPTION 'Add pupils first or choose nickname entry'; END IF;
  END IF;

  r:=public.guest_assignment_create(p_title,p_subject_pack_id,p_chapter_ids,p_question_ids,'0000',c.name,p_duration_mins,p_due_at,v_hours);
  IF NOT coalesce((r->>'ok')::boolean,false) THEN RETURN r; END IF;

  UPDATE public.guest_assignments SET pin_hash=crypt(encode(gen_random_bytes(32),'hex'),gen_salt('bf')),
    max_students=CASE WHEN p_access='classroom_pin' THEN greatest(max_students,n) ELSE max_students END WHERE id=(r->>'id')::uuid;
  INSERT INTO public.teacher_guest_access(assignment_id,mode,classroom_id) VALUES((r->>'id')::uuid,p_access,c.id);

  IF p_access='classroom_pin' THEN
    IF v_chosen IS NOT NULL THEN
      INSERT INTO public.teacher_guest_roster SELECT (r->>'id')::uuid,id FROM public.teacher_guest_pupils
        WHERE classroom_id=c.id AND active AND id = ANY(v_chosen);
    ELSE
      INSERT INTO public.teacher_guest_roster SELECT (r->>'id')::uuid,id FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND active;
    END IF;
  END IF;

  RETURN r || jsonb_build_object('access_mode',p_access,'classroom_id',c.id,
    'due_at',p_due_at,'selected_pupils',CASE WHEN v_chosen IS NULL THEN NULL ELSE cardinality(v_chosen) END,
    'max_students',CASE WHEN p_access='classroom_pin' THEN greatest((r->>'max_students')::integer,n) ELSE (r->>'max_students')::integer END);
END $function$;

-- ── teacher_guest_device_list(p_classroom_id uuid)
CREATE OR REPLACE FUNCTION public.teacher_guest_device_list(p_classroom_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_out jsonb;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.teacher_guest_classes
                  WHERE id = p_classroom_id AND teacher_id = auth.uid()) THEN
    RAISE EXCEPTION 'Classroom unavailable';
  END IF;
  -- ⚠ Only the last 6 characters of the device code leave the database. It is
  --   enough for a teacher to tell two tablets apart, and it is not a handle
  --   anyone can use to impersonate a device.
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'name', name_display,
           'device_tag', right(device_code, 6),
           'first_seen_at', first_seen_at,
           'last_seen_at', last_seen_at) ORDER BY last_seen_at DESC), '[]'::jsonb)
    INTO v_out
    FROM public.teacher_guest_devices WHERE classroom_id = p_classroom_id;
  RETURN jsonb_build_object('ok', true, 'devices', v_out);
END;
$function$;

-- ── teacher_guest_entry(p_code text, p_name text, p_pin text, p_ip text, p_info boolean)
CREATE OR REPLACE FUNCTION public.teacher_guest_entry(p_code text, p_name text DEFAULT ''::text, p_pin text DEFAULT ''::text, p_ip text DEFAULT ''::text, p_info boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF EXISTS(SELECT 1 FROM public.guest_assignments g JOIN public.teacher_guest_access a ON a.assignment_id=g.id
    JOIN public.teacher_guest_classes c ON c.id=a.classroom_id WHERE g.code=upper(btrim(p_code)) AND NOT c.active) THEN
    RETURN jsonb_build_object('ok',false,'error','expired');
  END IF;
  RETURN public.teacher_guest_open(p_code,p_name,p_pin,p_ip,p_info);
END $function$;

-- ── teacher_guest_log_pupil_name()
CREATE OR REPLACE FUNCTION public.teacher_guest_log_pupil_name()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  -- Only an actual change. A save that does not alter the name writes nothing,
  -- or the trail fills with noise and stops being readable.
  IF TG_OP = 'UPDATE' AND coalesce(OLD.name, '') IS NOT DISTINCT FROM coalesce(NEW.name, '') THEN
    RETURN NEW;
  END IF;
  INSERT INTO public.teacher_guest_pupil_names (pupil_id, old_name, new_name, changed_by)
  VALUES (NEW.id,
          CASE WHEN TG_OP = 'UPDATE' THEN OLD.name ELSE NULL END,
          NEW.name,
          CASE WHEN auth.uid() IS NOT NULL THEN 'teacher' ELSE 'pupil' END);
  RETURN NEW;
END;
$function$;

-- ── teacher_guest_manage(p_action text, p_id uuid, p_classroom uuid, p_name text, p_access_type text, p_expected_students integer, p_grade integer)
CREATE OR REPLACE FUNCTION public.teacher_guest_manage(p_action text, p_id uuid DEFAULT NULL::uuid, p_classroom uuid DEFAULT NULL::uuid, p_name text DEFAULT NULL::text, p_access_type text DEFAULT NULL::text, p_expected_students integer DEFAULT NULL::integer, p_grade integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  c       public.teacher_guest_classes%ROWTYPE;
  s       public.teacher_guest_pupils%ROWTYPE;
  pin     text;
  lookup  text;
  out_rows jsonb;
  tries   integer;
  i       integer;
  all_pins jsonb;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;

  -- Grades 1-9 are the registered range. Clamping instead of raising would turn
  -- a typed 0 into Grade 1 and say nothing about it.
  IF p_grade IS NOT NULL AND p_grade NOT BETWEEN 1 AND 9 THEN
    RAISE EXCEPTION 'Choose a grade between 1 and 9';
  END IF;

  -- ── LIST ──────────────────────────────────────────────────────────────
  IF p_action = 'list' THEN
    SELECT coalesce(jsonb_agg(jsonb_build_object(
      'id',         x.id,
      'name',       x.name,
      'active',     x.active,
      'access_type',x.access_type,
      'grade',      x.grade,
      'pupils',    (SELECT count(*) FROM public.teacher_guest_pupils WHERE classroom_id=x.id AND active)
    ) ORDER BY x.created_at DESC), '[]')
    INTO out_rows
    FROM public.teacher_guest_classes x
    WHERE teacher_id = auth.uid() AND deleted_at IS NULL;
    RETURN jsonb_build_object('ok', true, 'classes', out_rows);
  END IF;

  -- ── CREATE CLASS ──────────────────────────────────────────────────────
  IF p_action = 'create_class' THEN
    IF p_name IS NULL OR length(btrim(p_name)) NOT BETWEEN 1 AND 80 THEN
      RAISE EXCEPTION 'Enter a classroom name';
    END IF;
    DECLARE
      access_t  text    := coalesce(p_access_type, 'per_student');
      exp_count integer := greatest(1, least(200, coalesce(p_expected_students, 25)));
      class_pin text;
      class_lookup text;
    BEGIN
      IF access_t NOT IN ('per_student','shared') THEN access_t := 'per_student'; END IF;

      IF access_t = 'shared' THEN
        -- Generate a 4-digit class PIN
        FOR tries IN 1..1000 LOOP
          class_pin := lpad(((get_byte(gen_random_bytes(2),0)*256+get_byte(gen_random_bytes(2),1)) % 9000 + 1000)::text, 4, '0');
          EXIT;
        END LOOP;
      END IF;

      INSERT INTO public.teacher_guest_classes(teacher_id, name, access_type, expected_students, grade)
        VALUES(auth.uid(), btrim(p_name), access_t, exp_count, p_grade)
        RETURNING * INTO c;

      IF access_t = 'shared' THEN
        class_lookup := encode(hmac(class_pin, c.secret, 'sha256'), 'hex');
        UPDATE public.teacher_guest_classes
          SET class_pin_cipher = pgp_sym_encrypt(class_pin, c.secret),
              class_pin_lookup = class_lookup
          WHERE id = c.id;
        RETURN jsonb_build_object('ok', true, 'id', c.id, 'access_type', access_t, 'class_pin', class_pin);
      ELSE
        -- Per-student: auto-create expected_students numbered slots
        FOR i IN 1..exp_count LOOP
          FOR tries IN 1..1000 LOOP
            pin    := lpad(((get_byte(gen_random_bytes(2),0)*256+get_byte(gen_random_bytes(2),1)) % 9000 + 1000)::text, 4, '0');
            lookup := encode(hmac(pin, c.secret, 'sha256'), 'hex');
            EXIT WHEN NOT EXISTS(SELECT 1 FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND pin_lookup=lookup);
          END LOOP;
          INSERT INTO public.teacher_guest_pupils(classroom_id, name, pin_cipher, pin_lookup)
            VALUES(c.id, 'Student ' || i, pgp_sym_encrypt(pin, c.secret), lookup);
        END LOOP;
        RETURN jsonb_build_object('ok', true, 'id', c.id, 'access_type', access_t);
      END IF;
    END;
  END IF;

  -- All remaining actions require identifying the classroom
  SELECT * INTO c FROM public.teacher_guest_classes
    WHERE id = p_classroom AND teacher_id = auth.uid() FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Classroom unavailable'; END IF;

  -- ── RENAME ────────────────────────────────────────────────────────────
  IF p_action = 'rename_class' THEN
    UPDATE public.teacher_guest_classes SET name = btrim(p_name) WHERE id = c.id;

  -- ── TOGGLE ACTIVE ─────────────────────────────────────────────────────
  ELSIF p_action = 'toggle_class' THEN
    UPDATE public.teacher_guest_classes SET active = NOT active WHERE id = c.id;

  -- ── SET GRADE ─────────────────────────────────────────────────────────
  -- ⚠ NULL is a real answer, not a missing one. "I have not said which grade"
  --   must stay expressible: Set Work opens on the lowest live grade when a
  --   class has no grade, and inventing one for a teacher is worse than asking.
  ELSIF p_action = 'set_grade' THEN
    UPDATE public.teacher_guest_classes SET grade = p_grade WHERE id = c.id;

  -- ── DELETE (soft) ─────────────────────────────────────────────────────
  ELSIF p_action = 'delete_class' THEN
    UPDATE public.teacher_guest_classes SET deleted_at = now() WHERE id = c.id;
    UPDATE public.guest_assignments SET deleted_at = now()
      WHERE teacher_id = auth.uid() AND deleted_at IS NULL
        AND id IN (
          SELECT a.assignment_id FROM public.teacher_guest_access a
          WHERE a.classroom_id = c.id
            AND NOT EXISTS (
              SELECT 1 FROM public.teacher_guest_access b
              WHERE b.assignment_id = a.assignment_id AND b.classroom_id <> c.id
            )
        );

  -- ── ROSTER ────────────────────────────────────────────────────────────
  ELSIF p_action = 'roster' THEN
    SELECT coalesce(jsonb_agg(jsonb_build_object(
      'id', id, 'name', name, 'active', active
    ) ORDER BY name), '[]')
    INTO out_rows FROM public.teacher_guest_pupils WHERE classroom_id = c.id;
    DECLARE
      class_pin_plain text := NULL;
    BEGIN
      IF c.access_type = 'shared' AND c.class_pin_cipher IS NOT NULL THEN
        class_pin_plain := pgp_sym_decrypt(c.class_pin_cipher, c.secret);
      END IF;
      RETURN jsonb_build_object('ok', true, 'pupils', out_rows,
        'access_type', c.access_type, 'class_pin', class_pin_plain, 'grade', c.grade);
    END;

  -- ── REVEAL ALL PINs (teacher only, per_student classrooms) ────────────
  ELSIF p_action = 'reveal_all_pins' THEN
    SELECT coalesce(jsonb_agg(jsonb_build_object(
      'id',   id,
      'name', name,
      'pin',  pgp_sym_decrypt(pin_cipher, c.secret),
      'active', active
    ) ORDER BY name), '[]')
    INTO all_pins
    FROM public.teacher_guest_pupils WHERE classroom_id = c.id AND active;
    RETURN jsonb_build_object('ok', true, 'pupils', all_pins);

  -- ── PUPIL ACTIONS ─────────────────────────────────────────────────────
  ELSIF p_action IN ('add_pupil','reset_pin','reveal_pin','rename_pupil','toggle_pupil') THEN
    IF p_action <> 'add_pupil' THEN
      SELECT * INTO s FROM public.teacher_guest_pupils
        WHERE id = p_id AND classroom_id = c.id FOR UPDATE;
      IF NOT FOUND THEN RAISE EXCEPTION 'Pupil unavailable'; END IF;
    END IF;
    IF p_action IN ('add_pupil','reset_pin') THEN
      IF NOT c.active THEN RAISE EXCEPTION 'Restore this classroom first'; END IF;
      IF p_action = 'add_pupil' AND (SELECT count(*) FROM public.teacher_guest_pupils WHERE classroom_id=c.id) >= 200 THEN
        RAISE EXCEPTION 'Classroom limit is 200 pupils';
      END IF;
      FOR tries IN 1..1000 LOOP
        pin    := lpad(((get_byte(gen_random_bytes(2),0)*256+get_byte(gen_random_bytes(2),1)) % 9000 + 1000)::text, 4, '0');
        lookup := encode(hmac(pin, c.secret, 'sha256'), 'hex');
        EXIT WHEN NOT EXISTS(SELECT 1 FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND pin_lookup=lookup);
      END LOOP;
      IF p_action = 'add_pupil' THEN
        IF p_name IS NULL OR length(btrim(p_name)) NOT BETWEEN 1 AND 40 THEN RAISE EXCEPTION 'Enter a pupil name (1–40 characters)'; END IF;
        INSERT INTO public.teacher_guest_pupils(classroom_id, name, pin_cipher, pin_lookup)
          VALUES(c.id, btrim(p_name), pgp_sym_encrypt(pin, c.secret), lookup) RETURNING * INTO s;
      ELSE
        UPDATE public.teacher_guest_pupils
          SET pin_cipher = pgp_sym_encrypt(pin, c.secret), pin_lookup = lookup WHERE id = s.id;
        UPDATE public.guest_submissions SET open_token_hash = NULL WHERE name_key = s.id::text
          AND assignment_id IN (SELECT assignment_id FROM public.teacher_guest_access WHERE classroom_id=c.id);
      END IF;
      RETURN jsonb_build_object('ok', true, 'id', s.id, 'pin', pin);
    ELSIF p_action = 'reveal_pin' THEN
      RETURN jsonb_build_object('ok', true, 'pin', pgp_sym_decrypt(s.pin_cipher, c.secret));
    ELSIF p_action = 'rename_pupil' THEN
      UPDATE public.teacher_guest_pupils SET name = btrim(p_name) WHERE id = s.id;
    ELSE
      UPDATE public.teacher_guest_pupils SET active = NOT active WHERE id = s.id;
    END IF;

  ELSE
    RAISE EXCEPTION 'Unknown action';
  END IF;

  RETURN jsonb_build_object('ok', true);
END $function$;

-- ── teacher_guest_open(p_code text, p_name text, p_pin text, p_ip text, p_info boolean)
CREATE OR REPLACE FUNCTION public.teacher_guest_open(p_code text, p_name text DEFAULT ''::text, p_pin text DEFAULT ''::text, p_ip text DEFAULT ''::text, p_info boolean DEFAULT false)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  a      public.guest_assignments%ROWTYPE;
  access public.teacher_guest_access%ROWTYPE;
  c      public.teacher_guest_classes%ROWTYPE;
  pupil  public.teacher_guest_pupils%ROWTYPE;
  sub    public.guest_submissions%ROWTYPE;
  key    text; display text; token text;
  t      public.teacher_guest_throttle%ROWTYPE;
  effective_mode text;
BEGIN
  SELECT * INTO a FROM public.guest_assignments WHERE code=upper(btrim(p_code)) FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok',false,'error','not_found'); END IF;
  SELECT * INTO access FROM public.teacher_guest_access WHERE assignment_id=a.id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok',true,'legacy',true,'access_mode','legacy'); END IF;
  IF a.status <> 'active' OR a.expires_at < now() THEN RETURN jsonb_build_object('ok',false,'error','expired'); END IF;
  IF NOT EXISTS(SELECT 1 FROM public.profiles WHERE id=a.teacher_id AND NOT coalesce(disabled,false)
    AND (expires_at IS NULL OR expires_at>now()) AND (role='admin' OR (role='teacher' AND teacher_status='approved'))) THEN
    RETURN jsonb_build_object('ok',false,'error','expired');
  END IF;
  -- Resolve effective mode: classroom_pin with shared access_type = shared_pin
  effective_mode := access.mode;
  IF access.mode = 'classroom_pin' AND access.classroom_id IS NOT NULL THEN
    SELECT * INTO c FROM public.teacher_guest_classes WHERE id=access.classroom_id AND active;
    IF NOT FOUND THEN RETURN jsonb_build_object('ok',false,'error','expired'); END IF;
    IF c.access_type = 'shared' THEN effective_mode := 'shared_pin'; END IF;
  END IF;
  IF p_info THEN
    RETURN jsonb_build_object('ok',true,'access_mode',effective_mode,'title',a.title);
  END IF;
  DELETE FROM public.teacher_guest_throttle WHERE assignment_id=a.id AND since<now()-interval '1 day';
  INSERT INTO public.teacher_guest_throttle(assignment_id,source)
    VALUES(a.id,encode(digest(coalesce(p_ip,''),'sha256'),'hex')) ON CONFLICT DO NOTHING;
  SELECT * INTO t FROM public.teacher_guest_throttle
    WHERE assignment_id=a.id AND source=encode(digest(coalesce(p_ip,''),'sha256'),'hex') FOR UPDATE;
  IF t.since < now()-interval '10 minutes' THEN t.attempts:=0; t.since:=now(); END IF;
  IF t.attempts >= (CASE WHEN effective_mode IN ('nickname','shared_pin') THEN 100 ELSE 10 END) THEN
    RETURN jsonb_build_object('ok',false,'error','locked');
  END IF;

  IF effective_mode = 'classroom_pin' THEN
    -- Per-student PIN: each pupil has their own PIN
    SELECT s.* INTO pupil FROM public.teacher_guest_pupils s JOIN public.teacher_guest_roster r ON r.pupil_id=s.id
      WHERE r.assignment_id=a.id AND s.classroom_id=c.id AND s.active
        AND p_pin ~ '^\d{4}$' AND s.pin_lookup=encode(hmac(p_pin,c.secret,'sha256'),'hex');
    IF NOT FOUND THEN
      UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;
      RETURN jsonb_build_object('ok',false,'error','bad_pin','attemptsLeft',greatest(0,10-t.attempts-1));
    END IF;
    key := pupil.id::text; display := pupil.name;

  ELSIF effective_mode = 'shared_pin' THEN
    -- Shared class PIN: verify PIN then use name
    IF c.class_pin_lookup IS NULL OR NOT (p_pin ~ '^\d{4}$') OR
       encode(hmac(p_pin, c.secret, 'sha256'), 'hex') <> c.class_pin_lookup THEN
      UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;
      RETURN jsonb_build_object('ok',false,'error','bad_pin','attemptsLeft',greatest(0,10-t.attempts-1));
    END IF;
    display := btrim(p_name);
    IF display IS NULL OR length(display) NOT BETWEEN 1 AND 40 THEN
      RETURN jsonb_build_object('ok',false,'error','name_required');
    END IF;
    key := 'shared:' || lower(display);
    UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;

  ELSE
    -- Nickname mode: name only
    display := btrim(p_name);
    IF display IS NULL OR length(display) NOT BETWEEN 1 AND 40 THEN
      RETURN jsonb_build_object('ok',false,'error','name_required');
    END IF;
    key := lower(display);
    UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;
  END IF;

  SELECT * INTO sub FROM public.guest_submissions WHERE assignment_id=a.id AND name_key=key FOR UPDATE;
  IF FOUND AND sub.submitted_at IS NOT NULL AND NOT sub.retry_allowed THEN
    RETURN jsonb_build_object('ok',false,'error','name_taken');
  END IF;
  IF FOUND AND effective_mode IN ('nickname','shared_pin') AND sub.submitted_at IS NULL THEN
    RETURN jsonb_build_object('ok',false,'error','name_taken');
  END IF;
  token := encode(gen_random_bytes(32),'hex');
  IF NOT FOUND THEN
    INSERT INTO public.guest_submissions(assignment_id,name_key,name_display,open_token_hash)
      VALUES(a.id,key,display,encode(digest(token,'sha256'),'hex'));
  ELSE
    UPDATE public.guest_submissions SET name_display=display,
      open_token_hash=encode(digest(token,'sha256'),'hex'),submitted_at=NULL,answers='[]'
      WHERE assignment_id=a.id AND name_key=key;
  END IF;
  RETURN jsonb_build_object('ok',true,'name',display,'submit_name',key,'token',token,
    'assignment',to_jsonb(a),'questions',
    '[]'::jsonb);
END $function$;

-- ── teacher_guest_results(p_assignment_id uuid)
CREATE OR REPLACE FUNCTION public.teacher_guest_results(p_assignment_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE result jsonb; missing jsonb;
BEGIN
  IF NOT public.teacher_guest_authorized() OR NOT EXISTS(SELECT 1 FROM public.guest_assignments
    WHERE id=p_assignment_id AND teacher_id=auth.uid()) THEN RAISE EXCEPTION 'Assignment unavailable'; END IF;
  result:=public.guest_results(p_assignment_id);
  SELECT coalesce(jsonb_agg(jsonb_build_object('name',s.name,'name_key',s.id::text,'not_started',true,
    'submitted_at',NULL,'answers','[]'::jsonb)),'[]') INTO missing
    FROM public.teacher_guest_roster r JOIN public.teacher_guest_pupils s ON s.id=r.pupil_id
    WHERE r.assignment_id=p_assignment_id AND NOT EXISTS(SELECT 1 FROM public.guest_submissions g
      WHERE g.assignment_id=r.assignment_id AND g.name_key=s.id::text);
  RETURN jsonb_set(result,'{submissions}',coalesce(result->'submissions','[]'::jsonb)||missing);
END $function$;

-- ── teacher_guest_submission_guard()
CREATE OR REPLACE FUNCTION public.teacher_guest_submission_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE a public.teacher_guest_access%ROWTYPE; g public.guest_assignments%ROWTYPE;
BEGIN
  SELECT * INTO a FROM public.teacher_guest_access WHERE assignment_id=NEW.assignment_id;
  IF NOT FOUND THEN RETURN NEW; END IF;
  SELECT * INTO g FROM public.guest_assignments WHERE id=NEW.assignment_id;
  IF coalesce(auth.role(),'') <> 'service_role' THEN
    IF NOT (public.teacher_guest_authorized() AND g.teacher_id=auth.uid()) THEN RAISE EXCEPTION 'Not authorized'; END IF;
    IF TG_OP='INSERT' THEN RAISE EXCEPTION 'Use the submission service'; END IF;
    IF NEW.score IS DISTINCT FROM OLD.score OR NEW.answers IS DISTINCT FROM OLD.answers
       OR NEW.total IS DISTINCT FROM OLD.total OR NEW.submitted_at IS DISTINCT FROM OLD.submitted_at THEN
      RAISE EXCEPTION 'Use the submission service';
    END IF;
  END IF;
  IF NEW.submitted_at IS NOT NULL AND (TG_OP='INSERT' OR NEW.submitted_at IS DISTINCT FROM OLD.submitted_at) THEN
    IF g.status <> 'active' OR g.expires_at<now() THEN RAISE EXCEPTION 'Assignment closed'; END IF;
    IF NOT EXISTS(SELECT 1 FROM public.profiles WHERE id=g.teacher_id AND NOT coalesce(disabled,false)
      AND (expires_at IS NULL OR expires_at>now()) AND (role='admin' OR (role='teacher' AND teacher_status='approved'))) THEN
      RAISE EXCEPTION 'Teacher unavailable';
    END IF;
    IF a.mode='classroom_pin' AND NOT EXISTS(SELECT 1 FROM public.teacher_guest_pupils s
      JOIN public.teacher_guest_classes c ON c.id=s.classroom_id
      JOIN public.teacher_guest_roster r ON r.pupil_id=s.id AND r.assignment_id=g.id
      WHERE s.id::text=NEW.name_key AND c.id=a.classroom_id AND s.active AND c.active) THEN
      RAISE EXCEPTION 'Pupil access removed';
    END IF;
  END IF;
  RETURN NEW;
END $function$;

-- ── teacher_material_completions(p_classroom_id uuid)
CREATE OR REPLACE FUNCTION public.teacher_material_completions(p_classroom_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_out jsonb;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.teacher_guest_classes
                  WHERE id = p_classroom_id AND teacher_id = auth.uid()) THEN
    RAISE EXCEPTION 'Classroom unavailable';
  END IF;
  SELECT coalesce(jsonb_object_agg(material_id, entry), '{}'::jsonb) INTO v_out
    FROM (
      SELECT material_id,
             jsonb_build_object(
               'done', count(*),
               'names', coalesce(jsonb_agg(coalesce(name_display, name_key) ORDER BY done_at DESC), '[]'::jsonb),
               'last_at', max(done_at)
             ) AS entry
        FROM public.guest_material_completions
       WHERE classroom_id = p_classroom_id
       GROUP BY material_id
    ) t;
  RETURN jsonb_build_object('ok', true,
    'expected', (SELECT count(*) FROM public.teacher_guest_pupils
                  WHERE classroom_id = p_classroom_id AND active),
    'materials', v_out);
END;
$function$;

-- ── teacher_pupil_name_history(p_classroom_id uuid)
CREATE OR REPLACE FUNCTION public.teacher_pupil_name_history(p_classroom_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_out jsonb;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.teacher_guest_classes
                  WHERE id = p_classroom_id AND teacher_id = auth.uid()) THEN
    RAISE EXCEPTION 'Classroom unavailable';
  END IF;
  -- ⚠ Only renames, not the row created when the teacher first added the pupil
  --   (old_name IS NULL). A "history" that lists every pupil once, saying they
  --   were named when created, is noise a teacher has to read past.
  SELECT coalesce(jsonb_agg(e ORDER BY e->>'changed_at' DESC), '[]'::jsonb) INTO v_out
    FROM (
      SELECT jsonb_build_object(
               'pupil_id', h.pupil_id, 'old_name', h.old_name, 'new_name', h.new_name,
               'changed_by', h.changed_by, 'changed_at', h.changed_at) AS e
        FROM public.teacher_guest_pupil_names h
        JOIN public.teacher_guest_pupils p ON p.id = h.pupil_id
       WHERE p.classroom_id = p_classroom_id AND h.old_name IS NOT NULL
       ORDER BY h.changed_at DESC
       LIMIT 200
    ) t;
  RETURN jsonb_build_object('ok', true, 'changes', v_out);
END;
$function$;

-- ── verify_classroom_pin(p_slug text, p_pin text, p_ip_hash text)
CREATE OR REPLACE FUNCTION public.verify_classroom_pin(p_slug text, p_pin text, p_ip_hash text DEFAULT ''::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_classroom public.classrooms%ROWTYPE;
  v_attempts  INTEGER;
  v_token     UUID;
BEGIN
  -- Rate limit: max 5 failed attempts per IP per 15 minutes
  SELECT COUNT(*) INTO v_attempts
  FROM public.classroom_pin_attempts
  WHERE classroom_slug = p_slug
    AND ip_hash        = p_ip_hash
    AND success        = FALSE
    AND attempted_at   > NOW() - INTERVAL '15 minutes';

  IF v_attempts >= 5 THEN
    RETURN jsonb_build_object(
      'ok', FALSE, 'error', 'too_many_attempts', 'lockout_minutes', 15
    );
  END IF;

  -- Find classroom
  SELECT * INTO v_classroom
  FROM public.classrooms
  WHERE classroom_slug = LOWER(BTRIM(p_slug))
    AND archived_at IS NULL;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', FALSE, 'error', 'not_found');
  END IF;

  -- Verify PIN
  IF v_classroom.pin_hash <> encode(sha256(p_pin::bytea), 'hex') THEN
    INSERT INTO public.classroom_pin_attempts (classroom_slug, ip_hash, success)
    VALUES (p_slug, p_ip_hash, FALSE);
    RETURN jsonb_build_object('ok', FALSE, 'error', 'wrong_pin');
  END IF;

  -- Issue session token (24 hours)
  INSERT INTO public.classroom_sessions (classroom_id)
  VALUES (v_classroom.id)
  RETURNING token INTO v_token;

  INSERT INTO public.classroom_pin_attempts (classroom_slug, ip_hash, success)
  VALUES (p_slug, p_ip_hash, TRUE);

  -- Clean up old attempts for this slug (keep last 100)
  DELETE FROM public.classroom_pin_attempts
  WHERE classroom_slug = p_slug
    AND id NOT IN (
      SELECT id FROM public.classroom_pin_attempts
      WHERE classroom_slug = p_slug
      ORDER BY attempted_at DESC
      LIMIT 100
    );

  RETURN jsonb_build_object(
    'ok',    TRUE,
    'token', v_token,
    'name',  v_classroom.name,
    'emoji', v_classroom.emoji,
    'color', v_classroom.color
  );
END;
$function$;

-- ── verify_student_pin(p_username text, p_pin text, p_family_name text)
CREATE OR REPLACE FUNCTION public.verify_student_pin(p_username text, p_pin text, p_family_name text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_student public.students%ROWTYPE;
  v_max_tries CONSTANT int := 5;
  v_lockout_secs CONSTANT int := 300;
  v_ttl CONSTANT interval := interval '90 days';
  v_attempts int;
  v_locked_until timestamptz;
  v_matches int;
  v_now timestamptz := now();
  v_ok boolean;
  v_token text;
BEGIN
  IF p_family_name IS NOT NULL AND trim(p_family_name) <> '' THEN
    SELECT count(*) INTO v_matches FROM public.students s
      JOIN public.families f ON f.id = s.family_id
      WHERE lower(s.username) = lower(p_username)
        AND lower(trim(f.family_name)) = lower(trim(p_family_name))
        AND s.deleted_at IS NULL;
    IF v_matches > 1 THEN
      RETURN jsonb_build_object('ok', false, 'error', 'ambiguous_family');
    END IF;
    SELECT s.* INTO v_student FROM public.students s
      JOIN public.families f ON f.id = s.family_id
      WHERE lower(s.username) = lower(p_username)
        AND lower(trim(f.family_name)) = lower(trim(p_family_name))
        AND s.deleted_at IS NULL;
  ELSE
    SELECT * INTO v_student FROM public.students
      WHERE lower(username) = lower(p_username) AND deleted_at IS NULL LIMIT 1;
  END IF;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials');
  END IF;
  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  v_attempts := greatest(coalesce(v_student.pin_attempts, 0),
    coalesce((coalesce(v_student.settings, '{}'::jsonb) ->> 'pin_attempts')::int, 0));
  v_locked_until := coalesce(v_student.pin_locked_until,
    (coalesce(v_student.settings, '{}'::jsonb) ->> 'pin_locked_until')::timestamptz);
  IF v_locked_until IS NOT NULL AND v_locked_until > v_now THEN
    RETURN jsonb_build_object('ok', false, 'locked', true,
      'secsLeft', extract(epoch FROM (v_locked_until - v_now))::int);
  END IF;

  IF v_student.pin IS NULL THEN v_ok := false;
  ELSIF v_student.pin = p_pin THEN v_ok := true;
  ELSE v_ok := (crypt(p_pin, v_student.pin) = v_student.pin);
  END IF;
  IF NOT v_ok THEN
    v_attempts := v_attempts + 1;
    IF v_attempts >= v_max_tries THEN
      UPDATE public.students SET pin_attempts = v_attempts,
        pin_locked_until = v_now + (v_lockout_secs || ' seconds')::interval,
        settings = settings - 'pin_attempts' - 'pin_locked_until' WHERE id = v_student.id;
      RETURN jsonb_build_object('ok', false, 'locked', true,
        'secsLeft', v_lockout_secs, 'attemptsLeft', 0);
    END IF;
    UPDATE public.students SET pin_attempts = v_attempts,
      settings = settings - 'pin_attempts' - 'pin_locked_until' WHERE id = v_student.id;
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials',
      'attemptsLeft', v_max_tries - v_attempts);
  END IF;

  UPDATE public.students SET pin_attempts = 0, pin_locked_until = NULL,
    settings = settings - 'pin_attempts' - 'pin_locked_until' WHERE id = v_student.id;
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;
  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
    VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);
  RETURN jsonb_build_object('ok', true, 'session_token', v_token,
    'student', jsonb_build_object('id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at));
END;
$function$;

-- ── verify_student_pin_core(p_username text, p_pin text)
CREATE OR REPLACE FUNCTION public.verify_student_pin_core(p_username text, p_pin text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_student      public.students%ROWTYPE;
  v_max_tries    CONSTANT int := 5;
  v_lockout_secs CONSTANT int := 300;
  v_ttl          CONSTANT interval := interval '30 days';
  v_attempts     int;
  v_locked_until timestamptz;
  v_settings     jsonb;
  v_now          timestamptz := now();
  v_ok           boolean;
  v_token        text;
BEGIN
  SELECT * INTO v_student FROM public.students
  WHERE lower(username) = lower(p_username) LIMIT 1;

  -- Same generic error whether or not the user exists: no enumeration.
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials');
  END IF;

  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  v_settings     := coalesce(v_student.settings, '{}'::jsonb);
  v_attempts     := coalesce((v_settings ->> 'pin_attempts')::int, 0);
  v_locked_until := (v_settings ->> 'pin_locked_until')::timestamptz;

  IF v_locked_until IS NOT NULL AND v_locked_until > v_now THEN
    RETURN jsonb_build_object('ok', false, 'locked', true,
      'secsLeft', extract(epoch FROM (v_locked_until - v_now))::int);
  END IF;

  -- bcrypt, with a plaintext fallback for un-migrated dev rows
  IF v_student.pin IS NULL THEN
    v_ok := false;
  ELSIF v_student.pin = p_pin THEN
    v_ok := true;
  ELSE
    v_ok := (crypt(p_pin, v_student.pin) = v_student.pin);
  END IF;

  -- ── wrong PIN ──
  IF NOT v_ok THEN
    v_attempts := v_attempts + 1;
    IF v_attempts >= v_max_tries THEN
      UPDATE public.students
         SET settings = settings || jsonb_build_object(
               'pin_attempts', v_attempts,
               'pin_locked_until', v_now + (v_lockout_secs || ' seconds')::interval)
       WHERE id = v_student.id;
      RETURN jsonb_build_object('ok', false, 'locked', true,
        'secsLeft', v_lockout_secs, 'attemptsLeft', 0);
    END IF;
    UPDATE public.students
       SET settings = settings || jsonb_build_object('pin_attempts', v_attempts)
     WHERE id = v_student.id;
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials',
      'attemptsLeft', v_max_tries - v_attempts);
  END IF;

  -- ── correct PIN ──
  UPDATE public.students
     SET settings = settings - 'pin_attempts' - 'pin_locked_until'
   WHERE id = v_student.id;

  -- Anti-sharing: a fresh login invalidates every other device instantly
  -- (previously this relied on a 5-minute session_version poll).
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;  -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);

  RETURN jsonb_build_object(
    'ok', true,
    'session_token', v_token,            -- ← NEW: client must send as x-student-token
    'student', jsonb_build_object(
      'id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at
    )
  );
END;
$function$;

SET check_function_bodies = on;


-- ═══ 5 · DEFERRED COLUMN DEFAULTS ═════════════════════════════════════════════
-- 3 column defaults call a function created in §4, so they cannot be
-- set back in §2: a fresh CREATE TABLE carrying one fails outright with
-- "function ... does not exist". They are found through pg_depend whenever this
-- file is regenerated, never from a hand-kept list, so a new one cannot be
-- missed the way current_student_id() was.
ALTER TABLE public.classrooms ALTER COLUMN invite_code SET DEFAULT gen_invite_code();
ALTER TABLE public.forum_posts ALTER COLUMN author_student_id SET DEFAULT current_student_id();
ALTER TABLE public.forum_replies ALTER COLUMN author_student_id SET DEFAULT current_student_id();


-- ═══ 6 · INDEXES ══════════════════════════════════════════════════════════════
-- Indexes that back a constraint are omitted — §3 creates those with the
-- constraint itself. 72 standalone indexes.
CREATE INDEX IF NOT EXISTS submissions_assignment_idx ON public.assignment_submissions USING btree (assignment_id);
CREATE INDEX IF NOT EXISTS submissions_classroom_idx ON public.assignment_submissions USING btree (classroom_id);
CREATE INDEX IF NOT EXISTS submissions_student_idx ON public.assignment_submissions USING btree (student_id);
CREATE INDEX IF NOT EXISTS chapter_entitlements_live_idx ON public.chapter_entitlements USING btree (user_id, expires_at);
CREATE UNIQUE INDEX IF NOT EXISTS chapter_entitlements_user_chapter_key ON public.chapter_entitlements USING btree (user_id, chapter_id);
CREATE INDEX IF NOT EXISTS classroom_materials_assigned_idx ON public.classroom_materials USING btree (classroom_id, assigned_at DESC);
CREATE INDEX IF NOT EXISTS cm_classroom_idx ON public.classroom_materials USING btree (classroom_id);
CREATE INDEX IF NOT EXISTS cm_material_idx ON public.classroom_materials USING btree (material_id);
CREATE INDEX IF NOT EXISTS idx_classroom_pin_attempts_slug ON public.classroom_pin_attempts USING btree (classroom_slug, ip_hash, attempted_at);
CREATE INDEX IF NOT EXISTS idx_classroom_posts_classroom ON public.classroom_posts USING btree (classroom_id, pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_classroom_sessions_token ON public.classroom_sessions USING btree (token, expires_at);
CREATE INDEX IF NOT EXISTS classrooms_code_idx ON public.classrooms USING btree (invite_code);
CREATE INDEX IF NOT EXISTS classrooms_teacher_idx ON public.classrooms USING btree (teacher_id);
CREATE INDEX IF NOT EXISTS credit_ledger_user_idx ON public.credit_ledger USING btree (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS enrollments_classroom_idx ON public.enrollments USING btree (classroom_id);
CREATE INDEX IF NOT EXISTS enrollments_student_idx ON public.enrollments USING btree (student_id);
CREATE INDEX IF NOT EXISTS family_invites_family_idx ON public.family_invites USING btree (family_id);
CREATE INDEX IF NOT EXISTS family_members_family_idx ON public.family_members USING btree (family_id);
CREATE UNIQUE INDEX IF NOT EXISTS family_members_one_family_per_user ON public.family_members USING btree (user_id);
CREATE INDEX IF NOT EXISTS forum_replies_post_idx ON public.forum_replies USING btree (post_id, created_at);
CREATE INDEX IF NOT EXISTS guest_assignments_code_idx ON public.guest_assignments USING btree (code);
CREATE INDEX IF NOT EXISTS guest_assignments_teacher_idx ON public.guest_assignments USING btree (teacher_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ga_deleted_at ON public.guest_assignments USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);
CREATE INDEX IF NOT EXISTS guest_material_completions_class_idx ON public.guest_material_completions USING btree (classroom_id, done_at DESC);
CREATE INDEX IF NOT EXISTS guest_submissions_assignment_idx ON public.guest_submissions USING btree (assignment_id);
CREATE INDEX IF NOT EXISTS learning_materials_teacher_created_idx ON public.learning_materials USING btree (teacher_id, created_at DESC);
CREATE INDEX IF NOT EXISTS login_events_user_idx ON public.login_events USING btree (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS payments_plan_idx ON public.payments USING btree (plan_id);
CREATE UNIQUE INDEX IF NOT EXISTS payments_provider_ref_uq ON public.payments USING btree (provider, provider_ref) WHERE (provider_ref IS NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS payments_reference_uq ON public.payments USING btree (reference) WHERE (reference IS NOT NULL);
CREATE INDEX IF NOT EXISTS payments_status_idx ON public.payments USING btree (status, created_at DESC);
CREATE INDEX IF NOT EXISTS payments_user_idx ON public.payments USING btree (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS ph_classroom_idx ON public.physical_homework USING btree (classroom_id);
CREATE INDEX IF NOT EXISTS ph_expires_idx ON public.physical_homework USING btree (expires_at);
CREATE INDEX IF NOT EXISTS ph_teacher_idx ON public.physical_homework USING btree (teacher_id);
CREATE INDEX IF NOT EXISTS profiles_referral_code_idx ON public.profiles USING btree (referral_code);
CREATE INDEX IF NOT EXISTS profiles_teacher_decided_idx ON public.profiles USING btree (teacher_decided_by);
CREATE INDEX IF NOT EXISTS profiles_teacher_pending_idx ON public.profiles USING btree (teacher_requested_at DESC) WHERE (teacher_status = 'pending'::text);
CREATE INDEX IF NOT EXISTS qrmsgs_report_idx ON public.question_report_messages USING btree (report_id, created_at);
CREATE INDEX IF NOT EXISTS qreports_qid_idx ON public.question_reports USING btree (question_id);
CREATE INDEX IF NOT EXISTS qreports_status_idx ON public.question_reports USING btree (status, created_at DESC);
CREATE INDEX IF NOT EXISTS qreports_student_idx ON public.question_reports USING btree (student_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS question_reports_student_idx ON public.question_reports USING btree (student_id);
CREATE INDEX IF NOT EXISTS questions_chapter_id_idx ON public.questions USING btree (chapter_id);
CREATE INDEX IF NOT EXISTS questions_grade_paper_idx ON public.questions USING btree (grade, is_past_paper);
CREATE INDEX IF NOT EXISTS questions_protected_idx ON public.questions USING btree (protected) WHERE (protected = true);
CREATE INDEX IF NOT EXISTS questions_subject_id_idx ON public.questions USING btree (subject_id);
CREATE INDEX IF NOT EXISTS referrals_referrer_idx ON public.referrals USING btree (referrer_id);
CREATE INDEX IF NOT EXISTS schedule_entries_schedule_date_idx ON public.schedule_entries USING btree (schedule_id, date);
CREATE INDEX IF NOT EXISTS schedule_entries_student_type_idx ON public.schedule_entries USING btree (student_id, entry_type);
CREATE INDEX IF NOT EXISTS security_events_kind_idx ON public.security_events USING btree (kind, created_at DESC);
CREATE INDEX IF NOT EXISTS security_events_user_idx ON public.security_events USING btree (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS assignments_classroom_idx ON public.student_assignments USING btree (classroom_id);
CREATE INDEX IF NOT EXISTS assignments_source_idx ON public.student_assignments USING btree (source_type);
CREATE INDEX IF NOT EXISTS student_assignments_completed_idx ON public.student_assignments USING btree (student_id, completed_at DESC) WHERE (completed_at IS NOT NULL);
CREATE INDEX IF NOT EXISTS student_assignments_parent_idx ON public.student_assignments USING btree (parent_id);
CREATE INDEX IF NOT EXISTS student_assignments_student_created_idx ON public.student_assignments USING btree (student_id, created_at DESC);
CREATE INDEX IF NOT EXISTS student_friends_b_idx ON public.student_friends USING btree (student_id_b);
CREATE INDEX IF NOT EXISTS student_invites_creator_idx ON public.student_invites USING btree (created_by);
CREATE INDEX IF NOT EXISTS student_invites_student_idx ON public.student_invites USING btree (student_id);
CREATE INDEX IF NOT EXISTS student_point_events_student_day_idx ON public.student_point_events USING btree (student_id, created_at DESC);
CREATE INDEX IF NOT EXISTS student_points_points_idx ON public.student_points USING btree (points DESC);
CREATE INDEX IF NOT EXISTS student_question_progress_student_chapter_idx ON public.student_question_progress USING btree (student_id, chapter_id);
CREATE INDEX IF NOT EXISTS student_sessions_expiry_idx ON public.student_sessions USING btree (expires_at);
CREATE INDEX IF NOT EXISTS student_sessions_student_idx ON public.student_sessions USING btree (student_id);
CREATE UNIQUE INDEX IF NOT EXISTS students_live_username_key ON public.students USING btree (family_id, username) WHERE (deleted_at IS NULL);
CREATE INDEX IF NOT EXISTS subscriptions_plan_idx ON public.subscriptions USING btree (plan_id);
CREATE INDEX IF NOT EXISTS subscriptions_user_status_idx ON public.subscriptions USING btree (user_id, status, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_tgc_deleted_at ON public.teacher_guest_classes USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS tgc_teacher_name_unique ON public.teacher_guest_classes USING btree (teacher_id, name) WHERE (deleted_at IS NULL);
CREATE UNIQUE INDEX IF NOT EXISTS teacher_guest_devices_name_uq ON public.teacher_guest_devices USING btree (classroom_id, name_key);
CREATE INDEX IF NOT EXISTS teacher_guest_pupil_names_pupil_idx ON public.teacher_guest_pupil_names USING btree (pupil_id, changed_at DESC);


-- ═══ 7 · TRIGGERS ═════════════════════════════════════════════════════════════
-- ⚠ forum_set_author is what makes forum identity trustworthy: author_name
--   and author_type are derived from the session by the trigger, never from
--   what the browser sent. The guard_*_privileged triggers are what stop a
--   parent granting themselves role='admin' with a one-line PostgREST call,
--   because profiles_update allows a parent to update their own row with no
--   column restriction.

DROP TRIGGER IF EXISTS forum_posts_set_author ON public.forum_posts;
CREATE TRIGGER forum_posts_set_author BEFORE INSERT ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION forum_set_author();

DROP TRIGGER IF EXISTS forum_replies_set_author ON public.forum_replies;
CREATE TRIGGER forum_replies_set_author BEFORE INSERT ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION forum_set_author();

DROP TRIGGER IF EXISTS trg_reply_delete ON public.forum_replies;
CREATE TRIGGER trg_reply_delete AFTER DELETE ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION _forum_dec_reply_count();

DROP TRIGGER IF EXISTS trg_reply_insert ON public.forum_replies;
CREATE TRIGGER trg_reply_insert AFTER INSERT ON public.forum_replies FOR EACH ROW EXECUTE FUNCTION _forum_inc_reply_count();

DROP TRIGGER IF EXISTS guest_submissions_keep_session_token ON public.guest_submissions;
CREATE TRIGGER guest_submissions_keep_session_token BEFORE INSERT OR UPDATE OF open_token_hash ON public.guest_submissions FOR EACH ROW EXECUTE FUNCTION guest_keep_session_token();

DROP TRIGGER IF EXISTS teacher_guest_class_state_guard ON public.guest_submissions;
CREATE TRIGGER teacher_guest_class_state_guard BEFORE INSERT OR UPDATE ON public.guest_submissions FOR EACH ROW EXECUTE FUNCTION teacher_guest_class_state_guard();

DROP TRIGGER IF EXISTS teacher_guest_submission_guard ON public.guest_submissions;
CREATE TRIGGER teacher_guest_submission_guard BEFORE INSERT OR UPDATE ON public.guest_submissions FOR EACH ROW EXECUTE FUNCTION teacher_guest_submission_guard();

DROP TRIGGER IF EXISTS trg_guard_profiles_privileged ON public.profiles;
CREATE TRIGGER trg_guard_profiles_privileged BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION guard_profiles_privileged();

DROP TRIGGER IF EXISTS qr_on_message ON public.question_report_messages;
CREATE TRIGGER qr_on_message AFTER INSERT ON public.question_report_messages FOR EACH ROW EXECUTE FUNCTION _qr_on_message();

DROP TRIGGER IF EXISTS students_max_children ON public.students;
CREATE TRIGGER students_max_children BEFORE INSERT ON public.students FOR EACH ROW EXECUTE FUNCTION enforce_max_children();

DROP TRIGGER IF EXISTS trg_guard_students_privileged ON public.students;
CREATE TRIGGER trg_guard_students_privileged BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION guard_students_privileged();

DROP TRIGGER IF EXISTS teacher_guest_pupils_name_log ON public.teacher_guest_pupils;
CREATE TRIGGER teacher_guest_pupils_name_log AFTER INSERT OR UPDATE OF name ON public.teacher_guest_pupils FOR EACH ROW EXECUTE FUNCTION teacher_guest_log_pupil_name();


-- ═══ 8 · ROW LEVEL SECURITY & POLICIES ════════════════════════════════════════
-- ⚠ A policy's USING clause is checked on INSERT too — whenever the statement
--   carries a RETURNING, which PostgREST emits for every .insert().select().
--   So a USING predicate that has to LOOK THE ROW UP answers false for a row
--   being created in that same statement: it is STABLE, and the new tuple is
--   not in its snapshot. That is how widening families_own from
--   parent_id = auth.uid() to is_family_member(id) broke creating a family
--   outright for two days, for four real parents, while every family that
--   already existed still read back fine.
--   ⚠ The 42501 names the wrong half: "new row violates row-level security
--   policy" reads as a WITH CHECK failure, and the WITH CHECK was passing
--   throughout. Tell the two apart by running both forms as authenticated in a
--   rolled-back transaction — plain INSERT succeeds, INSERT … RETURNING does
--   not.
--   ALWAYS KEEP A SAME-ROW COLUMN PREDICATE IN A USING CLAUSE YOU WIDEN.
--   families_own below still carries parent_id = auth.uid() for exactly that.
--
-- ⚠ The forum is adults-only IN THE DATABASE (auth.uid() IS NOT NULL), not by
--   hiding a button. A child session is anon and is excluded by construction.
--
-- RLS is enabled on all 55 public tables.

ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_pin_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_post_refs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_assignment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_material_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_pin_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.minigame_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mm_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_pin_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.physical_homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_report_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_point_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_question_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_pupil_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_pupils ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_roster ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_throttle ENABLE ROW LEVEL SECURITY;

-- ── assignment_submissions
DROP POLICY IF EXISTS subs_parent_read ON public.assignment_submissions;
CREATE POLICY subs_parent_read ON public.assignment_submissions
  FOR SELECT
  TO public
  USING (owns_student_txt((student_id)::text));
DROP POLICY IF EXISTS subs_student_insert ON public.assignment_submissions;
CREATE POLICY subs_student_insert ON public.assignment_submissions
  FOR INSERT
  TO public
  WITH CHECK ((student_id = current_student_id()));
DROP POLICY IF EXISTS subs_student_read ON public.assignment_submissions;
CREATE POLICY subs_student_read ON public.assignment_submissions
  FOR SELECT
  TO public
  USING ((student_id = current_student_id()));
DROP POLICY IF EXISTS subs_teacher ON public.assignment_submissions;
CREATE POLICY subs_teacher ON public.assignment_submissions
  FOR ALL
  TO public
  USING ((owns_classroom(classroom_id) OR is_admin()))
  WITH CHECK ((owns_classroom(classroom_id) OR is_admin()));

-- ── chapter_entitlements
DROP POLICY IF EXISTS chapter_entitlements_select_own ON public.chapter_entitlements;
CREATE POLICY chapter_entitlements_select_own ON public.chapter_entitlements
  FOR SELECT
  TO public
  USING (((user_id = auth.uid()) OR is_admin()));

-- ── classroom_materials
DROP POLICY IF EXISTS classroom_materials_teacher ON public.classroom_materials;
CREATE POLICY classroom_materials_teacher ON public.classroom_materials
  FOR ALL
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM learning_materials m
  WHERE ((m.id = classroom_materials.material_id) AND (m.teacher_id = auth.uid())))))
  WITH CHECK ((EXISTS ( SELECT 1
   FROM learning_materials m
  WHERE ((m.id = classroom_materials.material_id) AND (m.teacher_id = auth.uid())))));

-- ── classrooms
DROP POLICY IF EXISTS classrooms_member_read ON public.classrooms;
CREATE POLICY classrooms_member_read ON public.classrooms
  FOR SELECT
  TO public
  USING ((parent_of_classroom_member(id) OR (EXISTS ( SELECT 1
   FROM enrollments e
  WHERE ((e.classroom_id = classrooms.id) AND (e.student_id = current_student_id()))))));
DROP POLICY IF EXISTS classrooms_teacher ON public.classrooms;
CREATE POLICY classrooms_teacher ON public.classrooms
  FOR ALL
  TO public
  USING (((teacher_id = auth.uid()) OR is_admin()))
  WITH CHECK ((((teacher_id = auth.uid()) AND is_teacher()) OR is_admin()));

-- ── credit_ledger
DROP POLICY IF EXISTS credit_ledger_select_own ON public.credit_ledger;
CREATE POLICY credit_ledger_select_own ON public.credit_ledger
  FOR SELECT
  TO public
  USING (((user_id = auth.uid()) OR is_admin()));

-- ── enrollments
DROP POLICY IF EXISTS enroll_parent_read ON public.enrollments;
CREATE POLICY enroll_parent_read ON public.enrollments
  FOR SELECT
  TO public
  USING (owns_student_txt((student_id)::text));
DROP POLICY IF EXISTS enroll_student_read ON public.enrollments;
CREATE POLICY enroll_student_read ON public.enrollments
  FOR SELECT
  TO public
  USING ((student_id = current_student_id()));
DROP POLICY IF EXISTS enroll_teacher ON public.enrollments;
CREATE POLICY enroll_teacher ON public.enrollments
  FOR ALL
  TO public
  USING ((owns_classroom(classroom_id) OR is_admin()))
  WITH CHECK ((owns_classroom(classroom_id) OR is_admin()));

-- ── families
DROP POLICY IF EXISTS families_own ON public.families;
CREATE POLICY families_own ON public.families
  FOR ALL
  TO public
  USING (((parent_id = auth.uid()) OR is_family_member(id) OR is_admin()))
  WITH CHECK (((parent_id = auth.uid()) OR is_admin()));

-- ── forum_posts
DROP POLICY IF EXISTS posts_delete ON public.forum_posts;
CREATE POLICY posts_delete ON public.forum_posts
  FOR DELETE
  TO public
  USING (((author_id = auth.uid()) OR (author_student_id = current_student_id()) OR is_admin()));
DROP POLICY IF EXISTS posts_insert ON public.forum_posts;
CREATE POLICY posts_insert ON public.forum_posts
  FOR INSERT
  TO public
  WITH CHECK (((auth.uid() IS NOT NULL) AND ((author_id IS NULL) OR (author_id = auth.uid())) AND (author_student_id IS NULL)));
DROP POLICY IF EXISTS posts_read ON public.forum_posts;
CREATE POLICY posts_read ON public.forum_posts
  FOR SELECT
  TO public
  USING ((auth.uid() IS NOT NULL));
DROP POLICY IF EXISTS posts_update_admin ON public.forum_posts;
CREATE POLICY posts_update_admin ON public.forum_posts
  FOR UPDATE
  TO public
  USING (is_admin())
  WITH CHECK (is_admin());

-- ── forum_replies
DROP POLICY IF EXISTS replies_delete ON public.forum_replies;
CREATE POLICY replies_delete ON public.forum_replies
  FOR DELETE
  TO public
  USING (((author_id = auth.uid()) OR (author_student_id = current_student_id()) OR is_admin()));
DROP POLICY IF EXISTS replies_insert ON public.forum_replies;
CREATE POLICY replies_insert ON public.forum_replies
  FOR INSERT
  TO public
  WITH CHECK (((auth.uid() IS NOT NULL) AND ((author_id IS NULL) OR (author_id = auth.uid())) AND (author_student_id IS NULL)));
DROP POLICY IF EXISTS replies_read ON public.forum_replies;
CREATE POLICY replies_read ON public.forum_replies
  FOR SELECT
  TO public
  USING ((auth.uid() IS NOT NULL));

-- ── guest_material_completions
DROP POLICY IF EXISTS "teachers read material completions" ON public.guest_material_completions;
CREATE POLICY "teachers read material completions" ON public.guest_material_completions
  FOR SELECT
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM teacher_guest_classes c
  WHERE ((c.id = guest_material_completions.classroom_id) AND (c.teacher_id = auth.uid())))));

-- ── learning_materials
DROP POLICY IF EXISTS "teachers can delete materials" ON public.learning_materials;
CREATE POLICY "teachers can delete materials" ON public.learning_materials
  FOR DELETE
  TO authenticated
  USING (((teacher_id = auth.uid()) AND (( SELECT profiles.role
   FROM profiles
  WHERE (profiles.id = auth.uid())) = ANY (ARRAY['teacher'::text, 'admin'::text]))));
DROP POLICY IF EXISTS "teachers can insert materials" ON public.learning_materials;
CREATE POLICY "teachers can insert materials" ON public.learning_materials
  FOR INSERT
  TO authenticated
  WITH CHECK (((teacher_id = auth.uid()) AND (( SELECT profiles.role
   FROM profiles
  WHERE (profiles.id = auth.uid())) = ANY (ARRAY['teacher'::text, 'admin'::text]))));
DROP POLICY IF EXISTS "teachers can read materials" ON public.learning_materials;
CREATE POLICY "teachers can read materials" ON public.learning_materials
  FOR SELECT
  TO authenticated
  USING (((teacher_id = auth.uid()) OR is_admin()));

-- ── login_events
DROP POLICY IF EXISTS login_insert ON public.login_events;
CREATE POLICY login_insert ON public.login_events
  FOR INSERT
  TO public
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)));
DROP POLICY IF EXISTS login_select_admin ON public.login_events;
CREATE POLICY login_select_admin ON public.login_events
  FOR SELECT
  TO public
  USING (is_admin());

-- ── mm_data
DROP POLICY IF EXISTS mmdata_delete_admin ON public.mm_data;
CREATE POLICY mmdata_delete_admin ON public.mm_data
  FOR DELETE
  TO public
  USING (is_admin());
DROP POLICY IF EXISTS mmdata_read_geo_map ON public.mm_data;
CREATE POLICY mmdata_read_geo_map ON public.mm_data
  FOR SELECT
  TO public
  USING ((key = 'geo_map_content'::text));
DROP POLICY IF EXISTS mmdata_read_global ON public.mm_data;
CREATE POLICY mmdata_read_global ON public.mm_data
  FOR SELECT
  TO public
  USING (((key = 'global_settings'::text) OR is_admin()));
DROP POLICY IF EXISTS mmdata_update_admin ON public.mm_data;
CREATE POLICY mmdata_update_admin ON public.mm_data
  FOR UPDATE
  TO public
  USING (is_admin())
  WITH CHECK (is_admin());
DROP POLICY IF EXISTS mmdata_write_admin ON public.mm_data;
CREATE POLICY mmdata_write_admin ON public.mm_data
  FOR INSERT
  TO public
  WITH CHECK (is_admin());

-- ── payments
DROP POLICY IF EXISTS pay_select ON public.payments;
CREATE POLICY pay_select ON public.payments
  FOR SELECT
  TO public
  USING (((user_id = auth.uid()) OR is_admin()));
DROP POLICY IF EXISTS pay_write ON public.payments;
CREATE POLICY pay_write ON public.payments
  FOR ALL
  TO public
  USING (is_admin())
  WITH CHECK (is_admin());

-- ── physical_homework
DROP POLICY IF EXISTS physical_homework_teacher ON public.physical_homework;
CREATE POLICY physical_homework_teacher ON public.physical_homework
  FOR ALL
  TO authenticated
  USING ((teacher_id = auth.uid()))
  WITH CHECK ((teacher_id = auth.uid()));

-- ── plans
DROP POLICY IF EXISTS plans_delete ON public.plans;
CREATE POLICY plans_delete ON public.plans
  FOR DELETE
  TO public
  USING (is_admin());
DROP POLICY IF EXISTS plans_insert ON public.plans;
CREATE POLICY plans_insert ON public.plans
  FOR INSERT
  TO public
  WITH CHECK (is_admin());
DROP POLICY IF EXISTS plans_read ON public.plans;
CREATE POLICY plans_read ON public.plans
  FOR SELECT
  TO public
  USING (true);
DROP POLICY IF EXISTS plans_write ON public.plans;
CREATE POLICY plans_write ON public.plans
  FOR UPDATE
  TO public
  USING (is_admin())
  WITH CHECK (is_admin());

-- ── profiles
DROP POLICY IF EXISTS profiles_delete ON public.profiles;
CREATE POLICY profiles_delete ON public.profiles
  FOR DELETE
  TO public
  USING (is_admin());
DROP POLICY IF EXISTS profiles_insert ON public.profiles;
CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT
  TO public
  WITH CHECK ((id = auth.uid()));
DROP POLICY IF EXISTS profiles_select ON public.profiles;
CREATE POLICY profiles_select ON public.profiles
  FOR SELECT
  TO public
  USING (((id = auth.uid()) OR is_admin()));
DROP POLICY IF EXISTS profiles_update ON public.profiles;
CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE
  TO public
  USING (((id = auth.uid()) OR is_admin()))
  WITH CHECK (((id = auth.uid()) OR is_admin()));

-- ── question_report_messages
DROP POLICY IF EXISTS "admins manage report messages" ON public.question_report_messages;
CREATE POLICY "admins manage report messages" ON public.question_report_messages
  FOR ALL
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));

-- ── question_reports
DROP POLICY IF EXISTS "admins manage question reports" ON public.question_reports;
CREATE POLICY "admins manage question reports" ON public.question_reports
  FOR ALL
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));
DROP POLICY IF EXISTS "anon can insert question reports" ON public.question_reports;
CREATE POLICY "anon can insert question reports" ON public.question_reports
  FOR INSERT
  TO anon
  WITH CHECK (true);
DROP POLICY IF EXISTS "authenticated can insert report" ON public.question_reports;
CREATE POLICY "authenticated can insert report" ON public.question_reports
  FOR INSERT
  TO authenticated
  WITH CHECK ((reporter_id = auth.uid()));
DROP POLICY IF EXISTS "parent can read own reports" ON public.question_reports;
CREATE POLICY "parent can read own reports" ON public.question_reports
  FOR SELECT
  TO authenticated
  USING ((reporter_id = auth.uid()));
DROP POLICY IF EXISTS reports_delete_admin ON public.question_reports;
CREATE POLICY reports_delete_admin ON public.question_reports
  FOR DELETE
  TO authenticated
  USING (is_admin());
DROP POLICY IF EXISTS reports_insert ON public.question_reports;
CREATE POLICY reports_insert ON public.question_reports
  FOR INSERT
  TO public
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)));
DROP POLICY IF EXISTS reports_select_admin ON public.question_reports;
CREATE POLICY reports_select_admin ON public.question_reports
  FOR SELECT
  TO public
  USING (is_admin());
DROP POLICY IF EXISTS reports_update_admin ON public.question_reports;
CREATE POLICY reports_update_admin ON public.question_reports
  FOR UPDATE
  TO public
  USING (is_admin())
  WITH CHECK (is_admin());

-- ── questions
DROP POLICY IF EXISTS "admins can delete questions" ON public.questions;
CREATE POLICY "admins can delete questions" ON public.questions
  FOR DELETE
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));
DROP POLICY IF EXISTS "admins can insert questions" ON public.questions;
CREATE POLICY "admins can insert questions" ON public.questions
  FOR INSERT
  TO authenticated
  WITH CHECK ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));
DROP POLICY IF EXISTS "admins can select questions" ON public.questions;
CREATE POLICY "admins can select questions" ON public.questions
  FOR SELECT
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));
DROP POLICY IF EXISTS "admins can update questions" ON public.questions;
CREATE POLICY "admins can update questions" ON public.questions
  FOR UPDATE
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))))
  WITH CHECK ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));

-- ── referrals
DROP POLICY IF EXISTS referrals_select_own ON public.referrals;
CREATE POLICY referrals_select_own ON public.referrals
  FOR SELECT
  TO public
  USING ((referrer_id = auth.uid()));

-- ── schedule_entries
DROP POLICY IF EXISTS entries_parent ON public.schedule_entries;
CREATE POLICY entries_parent ON public.schedule_entries
  FOR ALL
  TO public
  USING ((owns_student_txt(student_id) OR is_admin()))
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()));
DROP POLICY IF EXISTS entries_student_read ON public.schedule_entries;
CREATE POLICY entries_student_read ON public.schedule_entries
  FOR SELECT
  TO public
  USING ((student_id = (current_student_id())::text));

-- ── security_events
DROP POLICY IF EXISTS security_events_select_admin ON public.security_events;
CREATE POLICY security_events_select_admin ON public.security_events
  FOR SELECT
  TO public
  USING (is_admin());

-- ── student_assignments
DROP POLICY IF EXISTS assignments_delete ON public.student_assignments;
CREATE POLICY assignments_delete ON public.student_assignments
  FOR DELETE
  TO public
  USING ((owns_student_txt(student_id) OR is_admin()));
DROP POLICY IF EXISTS assignments_insert ON public.student_assignments;
CREATE POLICY assignments_insert ON public.student_assignments
  FOR INSERT
  TO public
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()));
DROP POLICY IF EXISTS assignments_select ON public.student_assignments;
CREATE POLICY assignments_select ON public.student_assignments
  FOR SELECT
  TO public
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()));
DROP POLICY IF EXISTS assignments_update ON public.student_assignments;
CREATE POLICY assignments_update ON public.student_assignments
  FOR UPDATE
  TO public
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
  WITH CHECK (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()));

-- ── student_friends
DROP POLICY IF EXISTS friends_delete ON public.student_friends;
CREATE POLICY friends_delete ON public.student_friends
  FOR DELETE
  TO public
  USING (((student_id_a = current_student_id()) OR (student_id_b = current_student_id())));
DROP POLICY IF EXISTS friends_select ON public.student_friends;
CREATE POLICY friends_select ON public.student_friends
  FOR SELECT
  TO public
  USING (((student_id_a = current_student_id()) OR (student_id_b = current_student_id())));

-- ── student_progress
DROP POLICY IF EXISTS progress_rw ON public.student_progress;
CREATE POLICY progress_rw ON public.student_progress
  FOR ALL
  TO public
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
  WITH CHECK (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()));

-- ── student_question_progress
DROP POLICY IF EXISTS sqp_read ON public.student_question_progress;
CREATE POLICY sqp_read ON public.student_question_progress
  FOR SELECT
  TO public
  USING (((student_id = current_student_id()) OR owns_student(student_id) OR is_admin()));

-- ── students
DROP POLICY IF EXISTS students_parent ON public.students;
CREATE POLICY students_parent ON public.students
  FOR ALL
  TO public
  USING ((owns_student_txt((id)::text) OR is_admin()))
  WITH CHECK ((is_admin() OR is_family_member(family_id)));
DROP POLICY IF EXISTS students_self_read ON public.students;
CREATE POLICY students_self_read ON public.students
  FOR SELECT
  TO public
  USING (((id)::text = (current_student_id())::text));

-- ── study_schedules
DROP POLICY IF EXISTS sched_parent ON public.study_schedules;
CREATE POLICY sched_parent ON public.study_schedules
  FOR ALL
  TO public
  USING ((owns_student_txt(student_id) OR is_admin()))
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()));
DROP POLICY IF EXISTS sched_student_read ON public.study_schedules;
CREATE POLICY sched_student_read ON public.study_schedules
  FOR SELECT
  TO public
  USING ((student_id = (current_student_id())::text));

-- ── subscriptions
DROP POLICY IF EXISTS subs_select ON public.subscriptions;
CREATE POLICY subs_select ON public.subscriptions
  FOR SELECT
  TO public
  USING (((user_id = auth.uid()) OR is_admin()));
DROP POLICY IF EXISTS subs_write ON public.subscriptions;
CREATE POLICY subs_write ON public.subscriptions
  FOR ALL
  TO public
  USING (is_admin())
  WITH CHECK (is_admin());

-- ── teacher_guest_devices
DROP POLICY IF EXISTS "teachers read class devices" ON public.teacher_guest_devices;
CREATE POLICY "teachers read class devices" ON public.teacher_guest_devices
  FOR SELECT
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM teacher_guest_classes c
  WHERE ((c.id = teacher_guest_devices.classroom_id) AND (c.teacher_id = auth.uid())))));

-- ── teacher_guest_pupil_names
DROP POLICY IF EXISTS "teachers read pupil name history" ON public.teacher_guest_pupil_names;
CREATE POLICY "teachers read pupil name history" ON public.teacher_guest_pupil_names
  FOR SELECT
  TO authenticated
  USING ((EXISTS ( SELECT 1
   FROM (teacher_guest_pupils p
     JOIN teacher_guest_classes c ON ((c.id = p.classroom_id)))
  WHERE ((p.id = teacher_guest_pupil_names.pupil_id) AND (c.teacher_id = auth.uid())))));


-- ═══ 9 · GRANTS ═══════════════════════════════════════════════════════════════
-- ⚠ A child session is anon PLUS an x-student-token header — it is NOT
--   authenticated. Anything a child calls must be granted TO anon,
--   authenticated. The friend RPCs were authenticated-only and were simply
--   dead. And check that every function in a REVOKE … FROM public block has a
--   matching grant here — purchase_subject() did not.
--
-- ⚠ credit_ledger, chapter_entitlements and security_events have NO insert,
--   update or delete grant at all. That is stronger than a policy: a later
--   policy mistake cannot open a hole where there is no grant behind it. If you
--   see them missing below, that is the design, not an omission.

-- ── table grants
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.assignment_submissions TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.assignment_submissions TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.assignment_submissions TO service_role;
GRANT SELECT ON public.chapter_entitlements TO anon;
GRANT SELECT ON public.chapter_entitlements TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.chapter_entitlements TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.classroom_materials TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.classroom_materials TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.classroom_materials TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.classroom_pin_attempts TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.classroom_post_refs TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.classroom_posts TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.classroom_sessions TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.classrooms TO service_role;
GRANT SELECT ON public.credit_ledger TO anon;
GRANT SELECT ON public.credit_ledger TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.credit_ledger TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.enrollments TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.enrollments TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.enrollments TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.families TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.families TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.families TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.family_invites TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.family_members TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.forum_posts TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.forum_posts TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.forum_posts TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.forum_replies TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.forum_replies TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.forum_replies TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.guest_assignment_attempts TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.guest_assignments TO service_role;
GRANT SELECT ON public.guest_material_completions TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.guest_material_completions TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.guest_pin_attempts TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.guest_submissions TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.learning_materials TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.learning_materials TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.learning_materials TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.login_events TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.login_events TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.login_events TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.minigame_polls TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.mm_data TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.mm_data TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.mm_data TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.parent_pin_attempts TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.payments TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.payments TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.payments TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.physical_homework TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.physical_homework TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.physical_homework TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.plans TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.plans TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.plans TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.profiles TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.profiles TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.profiles TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.push_subscriptions TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.push_subscriptions TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.push_subscriptions TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.question_report_messages TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.question_report_messages TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.question_report_messages TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.question_reports TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.question_reports TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.question_reports TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.questions TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.questions TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.questions TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.referrals TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.referrals TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.referrals TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.schedule_entries TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.schedule_entries TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.schedule_entries TO service_role;
GRANT SELECT ON public.security_events TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.security_events TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_assignments TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_assignments TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_assignments TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_friends TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_friends TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_friends TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_invites TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_point_events TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_points TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_progress TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_progress TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_progress TO service_role;
GRANT SELECT ON public.student_question_progress TO anon;
GRANT SELECT ON public.student_question_progress TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_question_progress TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_sessions TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_sessions TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.student_sessions TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, TRIGGER, TRUNCATE, UPDATE ON public.students TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, TRIGGER, TRUNCATE, UPDATE ON public.students TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.students TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.study_schedules TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.study_schedules TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.study_schedules TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.subscriptions TO anon;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.subscriptions TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.subscriptions TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.teacher_guest_access TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.teacher_guest_archives TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.teacher_guest_classes TO service_role;
GRANT SELECT ON public.teacher_guest_devices TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.teacher_guest_devices TO service_role;
GRANT SELECT ON public.teacher_guest_pupil_names TO authenticated;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.teacher_guest_pupil_names TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.teacher_guest_pupils TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.teacher_guest_roster TO service_role;
GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON public.teacher_guest_throttle TO service_role;

-- ── column grants — these are the ones that bite; see the file header
GRANT SELECT (avatar) ON public.students TO anon;
GRANT SELECT (avatar) ON public.students TO authenticated;
GRANT SELECT (created_at) ON public.students TO anon;
GRANT SELECT (created_at) ON public.students TO authenticated;
GRANT SELECT (deleted_at) ON public.students TO anon;
GRANT SELECT (deleted_at) ON public.students TO authenticated;
GRANT SELECT (display_name) ON public.students TO anon;
GRANT SELECT (display_name) ON public.students TO authenticated;
GRANT SELECT (expires_at) ON public.students TO anon;
GRANT SELECT (expires_at) ON public.students TO authenticated;
GRANT SELECT (family_id) ON public.students TO anon;
GRANT SELECT (family_id) ON public.students TO authenticated;
GRANT SELECT (friend_code) ON public.students TO anon;
GRANT SELECT (friend_code) ON public.students TO authenticated;
GRANT SELECT (grade) ON public.students TO anon;
GRANT SELECT (grade) ON public.students TO authenticated;
GRANT SELECT (id) ON public.students TO anon;
GRANT SELECT (id) ON public.students TO authenticated;
GRANT SELECT (session_version) ON public.students TO anon;
GRANT SELECT (session_version) ON public.students TO authenticated;
GRANT SELECT (settings) ON public.students TO anon;
GRANT SELECT (settings) ON public.students TO authenticated;
GRANT SELECT (username) ON public.students TO anon;
GRANT SELECT (username) ON public.students TO authenticated;

-- ── function grants
GRANT EXECUTE ON FUNCTION public._award_points(p_student uuid, p_kind text, p_ref text, p_points integer) TO service_role;
GRANT EXECUTE ON FUNCTION public._forum_dec_reply_count() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public._forum_inc_reply_count() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public._points_today(p_student uuid, p_kind text) TO service_role;
GRANT EXECUTE ON FUNCTION public._qr_on_message() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.accept_coparent_invite(p_token text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.add_friend(p_friend_code text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.add_report_message(p_report_id uuid, p_message text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_adjust_credits(p_user uuid, p_delta integer, p_reason text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_block_user(p_user uuid, p_minutes integer, p_reason text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_pending_counts() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_security_events(p_limit integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_set_teacher_status(p_user_id uuid, p_status text, p_tier text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_teacher_requests() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.award_activity_points(p_kind text, p_ref text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.backfill_question_progress(p_student uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.classroom_manage(p_action text, p_slug text, p_name text, p_description text, p_emoji text, p_color text, p_pin text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.classroom_post_manage(p_action text, p_classroom_id uuid, p_post_id uuid, p_type text, p_title text, p_body text, p_file_path text, p_file_name text, p_file_size integer, p_youtube_url text, p_pinned boolean, p_scheduled_at timestamp with time zone, p_share_to uuid[]) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.classroom_post_view(p_post_id uuid, p_token uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.classroom_sessions_cleanup() TO service_role;
GRANT EXECUTE ON FUNCTION public.classroom_teacher_ok() TO service_role;
GRANT EXECUTE ON FUNCTION public.create_coparent_invite(p_hours integer) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.create_student_invite(p_student uuid, p_hours integer) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.create_student_with_pin(p_family_id uuid, p_username text, p_display_name text, p_avatar text, p_grade integer, p_pin text, p_settings jsonb) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.current_student_id() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.end_student_session() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.enforce_max_children() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.family_entitlements() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.family_member_cap() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.family_referral_count(p_parent uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.flag_security_event(p_kind text, p_detail jsonb) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.forum_set_author() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.gen_guest_code() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.gen_invite_code() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_classroom_feed(p_slug text, p_token uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_my_friend_code() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_my_friends() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_my_points() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_my_points_rank(p_grade integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_points_leaderboard(p_grade integer, p_limit integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_student_reports(p_student_id uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guard_profiles_privileged() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guard_students_privileged() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_assignment_create(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_pin text, p_classroom_label text, p_duration_mins integer, p_due_at timestamp with time zone, p_expires_hours integer) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_assignment_limits(p_tier text) TO service_role;
GRANT EXECUTE ON FUNCTION public.guest_assignment_quota() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_cleanup() TO service_role;
GRANT EXECUTE ON FUNCTION public.guest_device_claim(p_code text, p_device text, p_name text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_grant_retry(p_assignment_id uuid, p_name_key text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_keep_session_token() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_mark_material(p_code text, p_name text, p_token text, p_material_id uuid, p_done boolean) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_my_assignments() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_note_failure(p_assignment uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.guest_open(p_code text, p_name text, p_pin text, p_ip text, p_ua text) TO service_role;
GRANT EXECUTE ON FUNCTION public.guest_results(p_assignment_id uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_set_my_name(p_code text, p_name text, p_token text, p_new_name text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.guest_submit(p_code text, p_name text, p_answers jsonb, p_score integer, p_total integer, p_token text) TO service_role;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_approved_teacher() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_family_member(p_family uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_family_owner(p_family uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_teacher() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.join_classroom(p_invite_code text, p_student_id uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.leaderboard_enabled() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.list_family_members() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.mark_report_seen(p_report_id uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.minigame_poll_create(p_question text, p_options jsonb) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.minigame_poll_results(p_code text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.minigame_poll_vote(p_code text, p_option integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.mint_student_session(p_username text, p_pin text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.my_credit_ledger(p_limit integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.my_credits() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.my_entitlements() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.my_member_family() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.my_referrals() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.my_teacher_status() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.owns_classroom(p_classroom uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.owns_student(p_student uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.owns_student_txt(p_student text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.parent_of_classroom_member(p_classroom uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_admin_confirm(p_payment_id uuid, p_provider_ref text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_admin_reject(p_payment_id uuid, p_reason text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_mark_sent(p_payment_id uuid, p_payer_note text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_settings() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.payment_start_juice(p_plan_id text, p_months integer) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.plan_enforcement_on() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.plan_features_for_student(p_student uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.plan_features_for_user(p_uid uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.plan_for_user(p_uid uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.points_level(p_points bigint) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.priv_write_allowed() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.purchase_chapter(p_chapter_id text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.purchase_subject(p_subject_id text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.question_points(p_question_id text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.record_question_progress(p_items jsonb, p_student uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.record_referral(p_code text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.record_student_activity() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.redeem_student_invite(p_token text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.remove_family_member(p_user uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.remove_friend(p_friend_id uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.request_teacher_access(p_note text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.restore_my_account() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.revoke_coparent_invite() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.set_student_pin(p_student_id uuid, p_pin text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.shop_chapter_price(p_chapter_id text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.shop_settings() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.shop_subject_price(p_subject_id text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.soft_delete_student(p_student uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.student_plan_features(p_student uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_admin_recover(p_action text, p_classroom uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_archive_assignment(p_id uuid, p_archive boolean) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_assignment_modes() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_authorized() TO service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_class_state_guard() TO service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_create_assignment(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_access text, p_classroom uuid, p_duration_mins integer, p_due_at timestamp with time zone, p_pupil_ids jsonb) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_device_list(p_classroom_id uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_entry(p_code text, p_name text, p_pin text, p_ip text, p_info boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_log_pupil_name() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_manage(p_action text, p_id uuid, p_classroom uuid, p_name text, p_access_type text, p_expected_students integer, p_grade integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_open(p_code text, p_name text, p_pin text, p_ip text, p_info boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_results(p_assignment_id uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_guest_submission_guard() TO service_role;
GRANT EXECUTE ON FUNCTION public.teacher_material_completions(p_classroom_id uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.teacher_pupil_name_history(p_classroom_id uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.verify_classroom_pin(p_slug text, p_pin text, p_ip_hash text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.verify_student_pin(p_username text, p_pin text, p_family_name text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.verify_student_pin_core(p_username text, p_pin text) TO service_role;


-- ═══ 10 · STORAGE ═════════════════════════════════════════════════════════════
-- question-images is public (question artwork is served straight to a child).
-- learning-materials is private — the app hands out signed URLs whose lifetime
-- is learning_materials.link_expiry_seconds.
INSERT INTO storage.buckets (id, name, public, file_size_limit)
  VALUES ('learning-materials', 'learning-materials', false, 10485760)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public)
  VALUES ('question-images', 'question-images', true)
  ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "admins can upload question images" ON storage.objects;
CREATE POLICY "admins can upload question images" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (((bucket_id = 'question-images'::text) AND (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))));
DROP POLICY IF EXISTS "guests can download classroom files" ON storage.objects;
CREATE POLICY "guests can download classroom files" ON storage.objects
  FOR SELECT
  TO anon
  USING ((bucket_id = 'learning-materials'::text));
DROP POLICY IF EXISTS "public can view question images" ON storage.objects;
CREATE POLICY "public can view question images" ON storage.objects
  FOR SELECT
  TO public
  USING ((bucket_id = 'question-images'::text));
DROP POLICY IF EXISTS "teachers can delete" ON storage.objects;
CREATE POLICY "teachers can delete" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (((bucket_id = 'learning-materials'::text) AND (( SELECT profiles.role
   FROM profiles
  WHERE (profiles.id = auth.uid())) = ANY (ARRAY['teacher'::text, 'admin'::text]))));
DROP POLICY IF EXISTS "teachers can read" ON storage.objects;
CREATE POLICY "teachers can read" ON storage.objects
  FOR SELECT
  TO authenticated
  USING (((bucket_id = 'learning-materials'::text) AND (( SELECT profiles.role
   FROM profiles
  WHERE (profiles.id = auth.uid())) = ANY (ARRAY['teacher'::text, 'admin'::text]))));
DROP POLICY IF EXISTS "teachers can upload" ON storage.objects;
CREATE POLICY "teachers can upload" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (((bucket_id = 'learning-materials'::text) AND (( SELECT profiles.role
   FROM profiles
  WHERE (profiles.id = auth.uid())) = ANY (ARRAY['teacher'::text, 'admin'::text]))));


-- ═══ 11 · SEED DATA — public.plans ════════════════════════════════════════════
-- The app cannot run without these rows: plan_for_user() reads them and
-- plan_features_for_student() gates every feature switch off features.
-- ON CONFLICT DO NOTHING, so an operator's own pricing edits survive a re-run.
INSERT INTO public.plans (id, name, price_mur, max_children, features, is_active)
  VALUES ('free', 'Free', 0, 1,
          '{"early_access":false,"max_children":1,"tutor_status":false,"weekly_digest":false,"push_reminders":false,"weekly_exam_cap":1,"allowed_chapters":null,"printable_papers":false,"advanced_analytics":false,"daily_question_cap":20,"hints_per_question":3,"timetable_generator":false}'::jsonb, true)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO public.plans (id, name, price_mur, max_children, features, is_active)
  VALUES ('teacher', 'Teacher', 0, 5,
          '{"past_papers":true,"tutor_status":true,"push_reminders":true,"study_calendar":true,"community_forum":true,"question_search":true,"weak_area_drill":true,"weekly_exam_cap":null,"allowed_chapters":null,"printable_papers":true,"advanced_analytics":true,"daily_question_cap":null,"hints_per_question":null,"timetable_generator":true,"weekly_digest_enabled":true}'::jsonb, false)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO public.plans (id, name, price_mur, max_children, features, is_active)
  VALUES ('starter', 'Starter', 150, 2,
          '{"past_papers":true,"tutor_status":false,"price_was_mur":250,"push_reminders":true,"study_calendar":true,"community_forum":true,"question_search":true,"weak_area_drill":true,"weekly_exam_cap":null,"allowed_chapters":null,"printable_papers":true,"advanced_analytics":true,"daily_question_cap":null,"hints_per_question":null,"timetable_generator":true,"weekly_digest_enabled":true}'::jsonb, true)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO public.plans (id, name, price_mur, max_children, features, is_active)
  VALUES ('premium', 'Premium', 250, 5,
          '{"past_papers":true,"tutor_status":true,"price_was_mur":500,"push_reminders":true,"study_calendar":true,"community_forum":true,"question_search":true,"weak_area_drill":true,"weekly_exam_cap":null,"allowed_chapters":null,"printable_papers":true,"advanced_analytics":true,"daily_question_cap":null,"hints_per_question":null,"timetable_generator":true,"weekly_digest_enabled":true}'::jsonb, true)
  ON CONFLICT (id) DO NOTHING;


-- ═══ 12 · BACKFILL — an owner row per family ══════════════════════════════════
-- The only non-schema statement the retired migrations carried that a fresh
-- rebuild would otherwise miss. Every family gets an explicit 'owner' row in
-- family_members, so that table is a complete picture of who is attached to a
-- family rather than "co-parents only, owners implied".
--
-- ⚠ Nothing depends on it for ACCESS: is_family_member() reads
--   families.parent_id directly as well, so an owner is a member whether the
--   row exists or not. It matters for anything that READS family_members —
--   remove_family_member() answers 'not_a_member' instead of
--   'cannot_remove_owner' without it.
--
-- ON CONFLICT DO NOTHING, so this is a no-op on a database that already has
-- them, and it picks up any family created before this file was last run.
--
-- ⚠ MEASURED 2026-09-06: production has 14 families but only 5 owner rows, so
--   this INSERTS 9 ROWS there. Re-running this file against production is
--   therefore not a pure no-op. That is the intended convergence — the
--   original backfill only ever covered the families that existed when it ran —
--   but know it before you run it, and re-measure rather than trusting this
--   number, which goes stale the moment a parent signs up.
INSERT INTO public.family_members (family_id, user_id, role)
SELECT f.id, f.parent_id, 'owner'
  FROM public.families f
  JOIN public.profiles p ON p.id = f.parent_id
ON CONFLICT DO NOTHING;

SET client_min_messages = notice;


-- ═══ 13 · NOT YET APPLIED — one conditional index ═════════════════════════════
-- Everything above this line is live today. This is the ONE thing the old
-- migration files still wanted and the database still refuses — and it refuses
-- for a good reason: TWO FAMILIES ARE BOTH NAMED "gobin".
--
-- family_name is one of the three things a child types to log in, so
-- verify_student_pin can answer 'ambiguous_family' to a child in either one.
-- Renaming a family is a decision about real children's credentials, not a
-- migration to run unattended — which is why the block below SKIPS ITSELF and
-- raises a warning rather than failing the whole file.
--
-- To resolve: rename one family (Account & Settings → Family Login), tell that
-- family that their children now type the new name at login, then re-run this
-- block. Meanwhile those children can still sign in with their 6-character
-- FAMILY CODE.
--
--   SELECT lower(trim(family_name)) AS name, count(*), array_agg(family_code)
--     FROM public.families GROUP BY 1 HAVING count(*) > 1;

DO $dup$
DECLARE v_dupes int;
BEGIN
  SELECT count(*) INTO v_dupes FROM (
    SELECT lower(trim(family_name)) FROM public.families
     GROUP BY 1 HAVING count(*) > 1) d;

  IF v_dupes > 0 THEN
    RAISE WARNING 'families_name_unique_ci NOT created: % duplicated family name(s). '
                  'Affected children can sign in with their 6-character FAMILY CODE '
                  'meanwhile.', v_dupes;
  ELSE
    CREATE UNIQUE INDEX IF NOT EXISTS families_name_unique_ci
      ON public.families (lower(trim(family_name)));
    RAISE NOTICE 'families_name_unique_ci created.';
  END IF;
END $dup$;



-- ── AND ONE POLICY FIX, ALSO A DECISION ──────────────────────────────────
-- ⚠ A CO-PARENT CAN CURRENTLY TAKE OVER A FAMILY. Measured against production
--   on 2026-09-06 in a rolled-back transaction, and asserted by
--   scripts/sql-tests/run-schema-tests.sh, which fails on it today.
--
--   families_own (§8) reads:
--     USING      (parent_id = auth.uid() OR is_family_member(id) OR is_admin())
--     WITH CHECK (parent_id = auth.uid() OR is_admin())
--
--   A co-parent passes USING because they ARE a member. They then pass
--   WITH CHECK because the row they are writing names THEMSELVES as parent_id.
--   So a plain
--       UPDATE families SET parent_id = auth.uid() WHERE id = <their family>
--   succeeds, and the co-parent becomes the owner — inheriting the right to
--   invite, to remove the original parent, and to delete the family.
--
--   A STRANGER CANNOT do this: USING fails for a non-member, and an UPDATE
--   whose USING matches no row changes nothing and raises nothing. The
--   exposure is to an adult the owner deliberately invited — which is why this
--   is written here for a decision rather than applied silently.
--
--   The fix below keeps every read path identical (USING is untouched, so
--   co-parents still see the family and rule 2 above is not re-opened) and
--   narrows only the WRITE side back to the owner and admins, which is what
--   "Owner-only membership management" already assumes everywhere else.
--
--   ⚠ Check first whether any co-parent feature legitimately writes to
--     families — renaming the family, say. If one does, this makes that
--     co-parent-facing action fail, and the right fix is a SECURITY DEFINER
--     function for that one field rather than a wider policy.
--
-- DROP POLICY IF EXISTS families_own ON public.families;
-- CREATE POLICY families_own ON public.families
--   FOR ALL
--   TO public
--   USING      ((parent_id = auth.uid()) OR is_family_member(id) OR is_admin())
--   WITH CHECK ((parent_id = auth.uid() AND is_family_owner(id)) OR is_admin());
--
--   Verify, as authenticated, in a rolled-back transaction — never from the
--   SQL editor as postgres, because RLS does not apply to a superuser and every
--   check passes vacuously:
--     SET LOCAL ROLE authenticated;
--     SET LOCAL request.jwt.claim.sub = '<the co-parent>';
--     UPDATE public.families SET parent_id = auth.uid() WHERE id = '<family>';
--   → expect 0 rows changed, and ownership unchanged.


-- ═══ END ═════════════════════════════════════════════════════════════
