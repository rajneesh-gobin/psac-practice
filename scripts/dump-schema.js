#!/usr/bin/env node
'use strict';
// ═══════════════════════════════════════════════════════════════════════════
//  Regenerates supabase-schema.sql FROM THE LIVE DATABASE.
//
//  supabase-schema.sql is not hand-maintained. It is a dump, so that it records
//  what is actually deployed rather than what a migration file claimed it did —
//  which is the difference that has cost this project the most time.
//
//  Usage:
//    SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/dump-schema.js
//    SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/dump-schema.js path/to/out.sql
//
//  The token is a Supabase personal access token (Account → Access Tokens).
//  ⚠ It is read from the environment and never stored here. Do not paste one
//    into this file — everything gitignored but present is still uploaded by
//    `netlify deploy --dir=.`.
//
//  AFTER REGENERATING, RUN THE TESTS. The live database cannot tell you whether
//  the file works, because everything in it already exists there:
//    scripts/sql-tests/run-schema-tests.sh
//
//  ⚠ Things this generator gets right that are easy to get wrong by hand, each
//    of which was a measured failure before it was a rule:
//    • `a.attnotnull notnull` is NOT an alias — NOTNULL is a postfix operator,
//      so it silently returns "attnotnull IS NOT NULL", i.e. true for every
//      column, and every NOT NULL vanished from the output. Alias it as nn.
//    • Constraints are emitted BY KIND across all tables, not per table: a
//      foreign key needs its target's unique constraint to exist already.
//    • Column defaults that call a public function are deferred to their own
//      section, found through pg_depend rather than a hand-kept list.
//    • check_function_bodies is off while functions are created, because SQL
//      (not plpgsql) bodies are validated at CREATE time and these call each
//      other, so no single ordering can satisfy them all.
//    • search_path is pinned, because several defaults call into the
//      extensions schema unqualified.
// ═══════════════════════════════════════════════════════════════════════════

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const REF   = process.env.SUPABASE_PROJECT_REF || 'xawvjwsiqhtxgpocdqgm';

if (!TOKEN) {
  console.error('SUPABASE_ACCESS_TOKEN is not set.');
  console.error('Usage: SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/dump-schema.js [out.sql]');
  process.exit(2);
}

async function q(sql) {
  const r = await fetch('https://api.supabase.com/v1/projects/' + REF + '/database/query', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  });
  const text = await r.text();
  let json;
  try { json = JSON.parse(text); }
  catch (e) { throw new Error('non-JSON reply: ' + text.slice(0, 400)); }
  if (!r.ok || json.error || json.message) throw new Error(JSON.stringify(json).slice(0, 800));
  return json;
}

const fs=require('fs');
const path=require('path');
const OUT=process.argv[2]||path.join(__dirname,'..','supabase-schema.sql');
const L=[];
const w=s=>L.push(s);
const rule=(n,t)=>w(`\n\n-- ═══ ${n} · ${t} ${'═'.repeat(Math.max(3,70-String(n).length-t.length))}`);

(async()=>{

const tables=(await q(`select c.relname from pg_class c join pg_namespace n on n.oid=c.relnamespace
  where n.nspname='public' and c.relkind='r' order by 1`)).map(r=>r.relname);

const cols=await q(`select c.relname tbl, a.attnum, a.attname col,
    format_type(a.atttypid,a.atttypmod) typ, a.attnotnull AS nn,
    a.attidentity AS ident,
    pg_get_expr(d.adbin,d.adrelid) def
  from pg_class c join pg_namespace n on n.oid=c.relnamespace
  join pg_attribute a on a.attrelid=c.oid
  left join pg_attrdef d on d.adrelid=c.oid and d.adnum=a.attnum
  where n.nspname='public' and c.relkind='r' and a.attnum>0 and not a.attisdropped
  order by c.relname, a.attnum`);

const cons=await q(`select conrelid::regclass::text tbl, conname, contype,
    pg_get_constraintdef(oid) def
  from pg_constraint where connamespace='public'::regnamespace and conrelid <> 0
  order by case contype when 'p' then 1 when 'u' then 2 when 'c' then 3 when 'f' then 4 else 5 end,
    conrelid::regclass::text, conname`);

const idxs=await q(`select i.indexname, i.indexdef, i.tablename
  from pg_indexes i
  where i.schemaname='public'
    and not exists (select 1 from pg_constraint c
       where c.connamespace='public'::regnamespace and c.conname=i.indexname
         and c.conrelid=(quote_ident(i.schemaname)||'.'||quote_ident(i.tablename))::regclass)
  order by i.tablename, i.indexname`);

const fns=await q(`select p.proname, pg_get_function_identity_arguments(p.oid) args,
    pg_get_functiondef(p.oid) def
  from pg_proc p join pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public' and p.prokind in ('f','p')
  order by p.proname, pg_get_function_identity_arguments(p.oid)`);

const trgs=await q(`select c.relname tbl, t.tgname, pg_get_triggerdef(t.oid) def
  from pg_trigger t join pg_class c on c.oid=t.tgrelid
  join pg_namespace n on n.oid=c.relnamespace
  where n.nspname='public' and not t.tgisinternal order by c.relname, t.tgname`);

const pols=await q(`select schemaname sch, tablename tbl, policyname pol, permissive perm,
    array_to_string(roles,', ') roles, cmd, qual, with_check wc
  from pg_policies where schemaname in ('public','storage') order by schemaname, tablename, policyname`);

const rls=await q(`select c.relname, c.relrowsecurity
  from pg_class c join pg_namespace n on n.oid=c.relnamespace
  where n.nspname='public' and c.relkind='r' order by 1`);

const tgrants=await q(`select c.relname tbl, pg_get_userbyid(a.grantee) grantee, a.privilege_type priv
  from pg_class c join pg_namespace n on n.oid=c.relnamespace,
  lateral aclexplode(c.relacl) a
  where n.nspname='public' and c.relkind='r' and c.relacl is not null
    and pg_get_userbyid(a.grantee) in ('anon','authenticated','service_role')
  order by 1,2,3`);

const cgrants=await q(`select c.relname tbl, at.attname col, at.attnum,
    pg_get_userbyid(a.grantee) grantee, a.privilege_type priv
  from pg_class c join pg_namespace n on n.oid=c.relnamespace
  join pg_attribute at on at.attrelid=c.oid and at.attnum>0 and not at.attisdropped,
  lateral aclexplode(at.attacl) a
  where n.nspname='public' and c.relkind='r' and at.attacl is not null
    and pg_get_userbyid(a.grantee) in ('anon','authenticated','service_role')
  order by 1, at.attnum, 4, 5`);

const fgrants=await q(`select p.proname, pg_get_function_identity_arguments(p.oid) args,
    pg_get_userbyid(a.grantee) grantee
  from pg_proc p join pg_namespace n on n.oid=p.pronamespace,
  lateral aclexplode(p.proacl) a
  where n.nspname='public' and p.proacl is not null and a.privilege_type='EXECUTE'
    and pg_get_userbyid(a.grantee) in ('anon','authenticated','service_role')
  order by 1,2,3`);

const deferred=await q(`select c.relname tbl, a.attname col, pg_get_expr(ad.adbin,ad.adrelid) def
  from pg_attrdef ad
  join pg_class c on c.oid=ad.adrelid
  join pg_namespace n on n.oid=c.relnamespace
  join pg_attribute a on a.attrelid=ad.adrelid and a.attnum=ad.adnum
  join pg_depend d on d.objid=ad.oid and d.classid='pg_attrdef'::regclass
                  and d.refclassid='pg_proc'::regclass
  join pg_proc p on p.oid=d.refobjid
  join pg_namespace pn on pn.oid=p.pronamespace
  where n.nspname='public' and pn.nspname='public'
  order by 1,2`);

// ⚠ A column default of nextval('x_seq'::regclass) depends on a pg_class, not
//   a pg_proc, so the `deferred` query above does NOT catch it and the sequence
//   was never emitted at all. Every other table here defaults its id to
//   gen_random_uuid(), which is why one bigserial column (teacher_guest_pupil_names)
//   was enough to make the whole file unbuildable from nothing while applying
//   perfectly to production, where the sequence already existed.
const seqs=await q(`select c.relname seq,
    coalesce(dc.relname,'') owner_tbl, coalesce(a.attname,'') owner_col
  from pg_class c
  join pg_namespace n on n.oid=c.relnamespace
  left join pg_depend d on d.objid=c.oid and d.classid='pg_class'::regclass
                       and d.refclassid='pg_class'::regclass and d.deptype='a'
  left join pg_class dc on dc.oid=d.refobjid
  left join pg_attribute a on a.attrelid=d.refobjid and a.attnum=d.refobjsubid
  where n.nspname='public' and c.relkind='S'
    and not exists (select 1 from pg_depend idep
                     where idep.objid=c.oid and idep.classid='pg_class'::regclass
                       and idep.deptype='i')
  order by 1`);

const buckets=await q(`select id,name,public,file_size_limit from storage.buckets order by 1`);
const plans=await q(`select id,name,price_mur,max_children,features,is_active from public.plans order by price_mur, id`);

const today=new Date().toISOString().slice(0,10);

w(`-- ══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — CONSOLIDATED DATABASE SCHEMA
--
--  GENERATED FROM THE LIVE DATABASE on ${today}
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
--    added to production since ${today} survives; and it overwrites function,
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
-- ══════════════════════════════════════════════════════════════════════════`);

rule(1,'EXTENSIONS');
w(`-- ⚠ pgcrypto lives in the extensions schema, and several column defaults call
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
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;`);

if(seqs.length){
  rule('2a','SEQUENCES');
  w(`-- ⚠ BEFORE §2 on purpose. A table whose id defaults to nextval() cannot be
--   created until its sequence exists, and CREATE TABLE does not create one
--   unless the column is declared serial/identity - which it is not here,
--   because these columns are dumped with their resolved default.
--   OWNED BY is set after the tables exist, in §2b.`);
  for(const s of seqs) w(`CREATE SEQUENCE IF NOT EXISTS public.${s.seq};`);
}

rule(2,'TABLES');
w(`-- Columns only. Constraints are §3, so no table here depends on a table
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
SET client_min_messages = warning;`);
const defer=new Set(deferred.map(d=>d.tbl+'.'+d.col));
for(const t of tables){
  const cs=cols.filter(c=>c.tbl===t);
  const colSql=c=>{
    let s=`${c.col} ${c.typ}`;
    if(c.ident==='a'||c.ident==='d') s+=` GENERATED ${c.ident==='a'?'ALWAYS':'BY DEFAULT'} AS IDENTITY`;
    else if(c.def && !defer.has(t+'.'+c.col)) s+=` DEFAULT ${c.def}`;
    if(c.nn) s+=' NOT NULL';
    return s;
  };
  w(`\nCREATE TABLE IF NOT EXISTS public.${t} (`);
  w(cs.map(c=>'  '+colSql(c)).join(',\n'));
  w(`);`);
  for(const c of cs) w(`ALTER TABLE public.${t} ADD COLUMN IF NOT EXISTS ${colSql(c).replace(/ NOT NULL$/,'')};`);
  for(const c of cs) if(c.nn) w(`ALTER TABLE public.${t} ALTER COLUMN ${c.col} SET NOT NULL;`);
}

if(seqs.some(s=>s.owner_tbl)){
  rule('2b','SEQUENCE OWNERSHIP');
  w(`-- Re-attaches each sequence to the column it feeds, so dropping the table
-- drops the sequence too. Cannot run in §2a: the table does not exist yet.`);
  for(const s of seqs) if(s.owner_tbl) w(`ALTER SEQUENCE public.${s.seq} OWNED BY public.${s.owner_tbl}.${s.owner_col};`);
}

rule(3,'CONSTRAINTS');
w(`-- ⚠ ORDERED BY KIND ACROSS ALL TABLES, NOT BY TABLE: every primary key and
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
-- catch-all would swallow genuine errors like the one above and report success.`);
let curK=null;
const kindName={p:'PRIMARY KEYS',u:'UNIQUE CONSTRAINTS',c:'CHECK CONSTRAINTS',f:'FOREIGN KEYS'};
for(const c of cons){
  if(c.contype!==curK){ curK=c.contype; w(`\n-- ── ${kindName[curK]||curK}`); }
  w(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
                  WHERE conname = ${lit(c.conname)}
                    AND conrelid = ${lit(c.tbl)}::regclass) THEN
    ALTER TABLE ${c.tbl} ADD CONSTRAINT ${c.conname} ${c.def};
  END IF;
END $$;`);
}

rule(4,'FUNCTIONS');
w(`-- ${fns.length} functions, verbatim from pg_get_functiondef().
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
SET check_function_bodies = off;`);
for(const f of fns){
  w(`\n-- ── ${f.proname}(${f.args})`);
  const d=f.def.trimEnd();
  w(d+(d.endsWith(';')?'':';'));
}

w(`
SET check_function_bodies = on;`);

rule(5,'DEFERRED COLUMN DEFAULTS');
w(`-- ${deferred.length} column defaults call a function created in §4, so they cannot be
-- set back in §2: a fresh CREATE TABLE carrying one fails outright with
-- "function ... does not exist". They are found through pg_depend whenever this
-- file is regenerated, never from a hand-kept list, so a new one cannot be
-- missed the way current_student_id() was.`);
for(const d of deferred){
  w(`ALTER TABLE public.${d.tbl} ALTER COLUMN ${d.col} SET DEFAULT ${d.def};`);
}

rule(6,'INDEXES');
w(`-- Indexes that back a constraint are omitted — §3 creates those with the
-- constraint itself. ${idxs.length} standalone indexes.`);
for(const i of idxs){
  w(i.indexdef.replace(/^CREATE (UNIQUE )?INDEX /,(m,u)=>`CREATE ${u||''}INDEX IF NOT EXISTS `)+';');
}

rule(7,'TRIGGERS');
w(`-- ⚠ forum_set_author is what makes forum identity trustworthy: author_name
--   and author_type are derived from the session by the trigger, never from
--   what the browser sent. The guard_*_privileged triggers are what stop a
--   parent granting themselves role='admin' with a one-line PostgREST call,
--   because profiles_update allows a parent to update their own row with no
--   column restriction.`);
for(const t of trgs){
  w(`\nDROP TRIGGER IF EXISTS ${t.tgname} ON public.${t.tbl};`);
  w(t.def+';');
}

rule(8,'ROW LEVEL SECURITY & POLICIES');
w(`-- ⚠ A policy's USING clause is checked on INSERT too — whenever the statement
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
-- RLS is enabled on all ${rls.filter(r=>r.relrowsecurity).length} public tables.`);
w('');
for(const r of rls) if(r.relrowsecurity) w(`ALTER TABLE public.${r.relname} ENABLE ROW LEVEL SECURITY;`);
let curP=null;
for(const p of pols.filter(p=>p.sch==='public')){
  if(p.tbl!==curP){ curP=p.tbl; w(`\n-- ── ${p.tbl}`); }
  w(polSql(p));
}

rule(9,'GRANTS');
w(`-- ⚠ A child session is anon PLUS an x-student-token header — it is NOT
--   authenticated. Anything a child calls must be granted TO anon,
--   authenticated. The friend RPCs were authenticated-only and were simply
--   dead. And check that every function in a REVOKE … FROM public block has a
--   matching grant here — purchase_subject() did not.
--
-- ⚠ credit_ledger, chapter_entitlements and security_events have NO insert,
--   update or delete grant at all. That is stronger than a policy: a later
--   policy mistake cannot open a hole where there is no grant behind it. If you
--   see them missing below, that is the design, not an omission.`);

w(`\n-- ── table grants`);
const byTG={};
for(const g of tgrants) (byTG[g.tbl+'|'+g.grantee]??=[]).push(g.priv);
for(const k of Object.keys(byTG).sort()){
  const [t,r]=k.split('|');
  w(`GRANT ${byTG[k].sort().join(', ')} ON public.${t} TO ${r};`);
}

w(`\n-- ── column grants — these are the ones that bite; see the file header`);
const byCG={};
for(const g of cgrants) (byCG[g.tbl+'|'+g.col+'|'+g.grantee]??=[]).push(g.priv);
for(const k of Object.keys(byCG).sort()){
  const [t,c,r]=k.split('|');
  w(`GRANT ${byCG[k].sort().join(', ')} (${c}) ON public.${t} TO ${r};`);
}

w(`\n-- ── function grants`);
const byFG={};
for(const g of fgrants) (byFG[g.proname+'('+g.args+')']??=[]).push(g.grantee);
for(const k of Object.keys(byFG).sort()){
  w(`GRANT EXECUTE ON FUNCTION public.${k} TO ${[...new Set(byFG[k])].sort().join(', ')};`);
}

rule(10,'STORAGE');
w(`-- question-images is public (question artwork is served straight to a child).
-- learning-materials is private — the app hands out signed URLs whose lifetime
-- is learning_materials.link_expiry_seconds.`);
for(const b of buckets){
  w(`INSERT INTO storage.buckets (id, name, public${b.file_size_limit?', file_size_limit':''})
  VALUES (${lit(b.id)}, ${lit(b.name)}, ${b.public}${b.file_size_limit?', '+b.file_size_limit:''})
  ON CONFLICT (id) DO NOTHING;`);
}
w('');
for(const p of pols.filter(p=>p.sch==='storage')) w(polSql(p));

rule(11,'SEED DATA — public.plans');
w(`-- The app cannot run without these rows: plan_for_user() reads them and
-- plan_features_for_student() gates every feature switch off features.
-- ON CONFLICT DO NOTHING, so an operator's own pricing edits survive a re-run.`);
for(const p of plans){
  w(`INSERT INTO public.plans (id, name, price_mur, max_children, features, is_active)
  VALUES (${lit(p.id)}, ${lit(p.name)}, ${p.price_mur}, ${p.max_children},
          ${lit(JSON.stringify(p.features))}::jsonb, ${p.is_active})
  ON CONFLICT (id) DO NOTHING;`);
}

rule(12,'BACKFILL — an owner row per family');
w(`-- The only non-schema statement the retired migrations carried that a fresh
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
ON CONFLICT DO NOTHING;`);

w(`\nSET client_min_messages = notice;`);

rule(13,'NOT YET APPLIED — one conditional index');
w(`-- Everything above this line is live today. This is the ONE thing the old
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
END $dup$;`);

w(`


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
--   → expect 0 rows changed, and ownership unchanged.`);

w(`\n\n-- ═══ END ═════════════════════════════════════════════════════════════`);

fs.writeFileSync(OUT,L.join('\n').replace(/\r\n/g,'\n')+'\n');
console.log('wrote',OUT);
console.log(JSON.stringify({tables:tables.length,cols:cols.length,cons:cons.length,idx:idxs.length,
  fns:fns.length,trg:trgs.length,pol:pols.length,tgrant:Object.keys(byTG).length,
  cgrant:Object.keys(byCG).length,fgrant:Object.keys(byFG).length,buckets:buckets.length,plans:plans.length}));

function lit(s){ if(s===null||s===undefined) return 'NULL'; return "'"+String(s).replace(/'/g,"''")+"'"; }
function qi(n){ return /^[a-z_][a-z0-9_]*$/.test(n)?n:'"'+n.replace(/"/g,'""')+'"'; }
function polSql(p){
  const t=(p.sch==='public'?'public.':'storage.')+p.tbl;
  let s=`DROP POLICY IF EXISTS ${qi(p.pol)} ON ${t};\nCREATE POLICY ${qi(p.pol)} ON ${t}`;
  if(p.perm==='RESTRICTIVE') s+=' AS RESTRICTIVE';
  s+=`\n  FOR ${p.cmd}`;
  s+=`\n  TO ${p.roles}`;
  if(p.qual) s+=`\n  USING (${p.qual})`;
  if(p.wc) s+=`\n  WITH CHECK (${p.wc})`;
  return s+';';
}

})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
