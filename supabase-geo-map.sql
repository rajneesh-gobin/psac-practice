-- ═══════════════════════════════════════════════════════════════════════════
--  Interactive map content — make the published payload readable by children
-- ═══════════════════════════════════════════════════════════════════════════
--
--  WHAT THIS FIXES
--  The admin map editor (Admin → 🗺️ Maps) writes its published payload to
--  mm_data under the key 'geo_map_content'. mm_data's read policy allows
--  SELECT only for key = 'global_settings' or is_admin(), so until this runs
--  the editor is writing into a row that no child — and no parent — can read.
--  Every published map edit stops at the admin's own browser.
--
--  A child's session is `anon` plus an x-student-token header; the token is
--  irrelevant here, the row is the same for everyone, so plain anon read is
--  what is needed. SELECT is already GRANTed to anon and authenticated on
--  mm_data; only the policy is in the way.
--
--  WHY AN ADDITIONAL POLICY RATHER THAN AN EDIT TO THE EXISTING ONE
--  Permissive policies are OR'd, so a second SELECT policy scoped to exactly
--  one key is purely additive: it cannot widen anything else, and it does not
--  require this file to restate mmdata_read_global's predicate — which is the
--  rule about never authoring a policy change from the (stale) schema dump.
--  Nothing else about mm_data changes: writes stay is_admin()-only.
--
--  IDEMPOTENT. Safe to re-run.
--
--  AFTER RUNNING: open Admin → 🗺️ Maps → Publish to children. The editor
--  probes the row as an anonymous caller and will confirm in its status line
--  that a child session can read it.

begin;

alter table public.mm_data enable row level security;

drop policy if exists mmdata_read_geo_map on public.mm_data;
create policy mmdata_read_geo_map on public.mm_data
  as permissive for select to public
  using (key = 'geo_map_content');

comment on policy mmdata_read_geo_map on public.mm_data is
  'Interactive map content is learning content, identical for every child, and is read by anon student sessions. Writes remain is_admin() only.';

commit;

-- Verification (run separately; expects exactly one row for each key listed):
--   set role anon;
--   select key from public.mm_data where key in ('global_settings','geo_map_content');
--   reset role;
-- Anything else returned means another policy is wider than it should be.
