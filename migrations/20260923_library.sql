-- ═══════════════════════════════════════════════════════════════════════════
--  Our Library — the public shelf, its sections, and the report queue.
--
--  THREE TABLES:
--    library_sections   the shelf itself: grades, and subjects under them.
--                       Editable by an admin at runtime.
--    library_documents  one row per PDF, wherever its bytes happen to live.
--    library_reports    "this file should not be here", from any reader.
--
--  ⚠ THE SECTIONS ARE NOT THE QUESTION PACKS, and must never be generated from
--    them. Measured on the real corpus 2026-09-23: 755 documents across 15
--    subjects that have NO pack at all — Arabic, Hindi, Tamil, Telugu, Urdu,
--    Marathi, Modern Chinese, Kreol Rodrigues, Art & Design, Technology
--    Studies, Business & Entrepreneurship, Food & Textiles, Road Safety. Only
--    322 of 755 map to a pack. A shelf restricted to the pack list would hide
--    more than half the library. `pack_id` is therefore a nullable LINK, used
--    to offer "practise this topic" where a pack exists, and absent otherwise.
--
--  ⚠ CLASSIFICATION LIVES HERE, NEVER IN THE STORAGE KEY. An admin reclassifies
--    on approval, and if grade/subject were baked into the path every one of
--    those would be an object copy. `filename` is opaque to the taxonomy: it
--    carries a readable slug plus a short hash and never changes.
--
--  ⚠ TWO STORAGE BACKENDS ON PURPOSE, and `storage` says which.
--      'static'   — seed corpus, served free by Cloudflare from the deploy.
--                   Revoking hides it from the shelf INSTANTLY, but the file
--                   stays at its URL until the next deploy.
--      'supabase' — community uploads, private bucket + signed URL. Revoking
--                   is total: no new URL is minted and outstanding ones expire.
--    The content most likely to need revoking is the half that revokes
--    instantly. That is the reason for the split, not an accident of it.
--
--  ⚠ NOTHING IS DELETED ON REMOVAL — status goes to 'removed' and the row
--    stays. Deleting loses the audit trail and, worse, loses the sha256, so the
--    same file could be re-uploaded and re-approved by a tired admin at 11pm.
--    A kept row turns the dedupe index into a BLOCKLIST.
--
--  ⚠ A child is `anon` plus an x-student-token, never a JWT, so every read
--    grant here is TO anon, authenticated.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Sections ───────────────────────────────────────────────────────────────
-- A self-referencing tree, two levels deep in practice: a grade (or a
-- non-grade shelf like "Reference"), with subjects beneath it. One table so
-- "add a grade" and "add a subject" are the same admin action and the same
-- policy, rather than two screens that drift apart.
CREATE TABLE IF NOT EXISTS public.library_sections (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id   uuid REFERENCES public.library_sections(id) ON DELETE CASCADE,
  slug        text NOT NULL,
  name        text NOT NULL,
  grade       integer,
  -- Link to a question pack, where one exists. NULL is the common case.
  pack_id     text,
  icon        text,
  sort_order  integer NOT NULL DEFAULT 0,
  -- ⚠ THREE STATES, because "lock" means two different things on two different
  --   days. 'hidden' is the panic button (invisible to everyone but an admin);
  --   'locked' is curation (readable, but closed to new uploads); 'active' is
  --   the normal case. Both of the first two are enforced server-side - a
  --   hidden section that is merely not rendered is not hidden.
  status      text NOT NULL DEFAULT 'active'
              CHECK (status IN ('active', 'locked', 'hidden')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  -- Unique within a parent, not globally: every grade may have an "english".
  CONSTRAINT library_sections_slug_unique UNIQUE (parent_id, slug)
);

CREATE INDEX IF NOT EXISTS library_sections_parent_idx
  ON public.library_sections (parent_id, sort_order);

-- ── Documents ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.library_documents (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- ⚠ THE CONTENT ADDRESS. Unique, so the same bytes cannot be stored twice,
  --   three parents uploading the same past paper collapse to one row, and a
  --   removed file is recognised on sight if it is ever sent in again.
  sha256       text NOT NULL UNIQUE,
  -- Hash of the EXTRACTED TEXT, where there is a text layer. Catches the same
  -- document re-scanned or re-saved, which sha256 by definition cannot.
  text_sha256  text,

  -- The published filename; also the name the reader's device saves it under,
  -- which is why it is a readable slug and not a bare hash.
  filename     text NOT NULL UNIQUE,
  storage      text NOT NULL DEFAULT 'static' CHECK (storage IN ('static', 'supabase')),
  storage_key  text,

  section_id   uuid REFERENCES public.library_sections(id) ON DELETE SET NULL,
  grade        integer,
  subject      text,
  doc_type     text NOT NULL,
  board        text,
  year         integer,
  title        text NOT NULL,
  description  text,
  pages        integer,
  bytes        integer NOT NULL,

  -- The bridge back into the practice engine. Both nullable: 57% of the real
  -- corpus has no pack.
  pack_id      text,
  chapter_ids  text[],

  -- ⚠ 'pending' IS THE DEFAULT. A row that nobody has decided about is not on
  --   the shelf. Publishing is the deliberate act, in both directions.
  status       text NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'published', 'rejected', 'removed')),
  hold_reason  text,

  source       text NOT NULL DEFAULT 'community' CHECK (source IN ('seed', 'community')),
  submitted_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  submitted_name text,
  -- What to print on the card, when the uploader asked to be credited.
  credit_name  text,

  -- ⚠ THE DISCLAIMER IS STORED AS ACCEPTED, with the version of the text that
  --   was on screen. A ticked box that leaves no trace proves nothing later,
  --   which is the entire point of having asked.
  disclaimer_version     text,
  disclaimer_accepted_at timestamptz,

  reviewed_by  uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at  timestamptz,
  review_note  text,
  published_at timestamptz,

  search_text  text,
  download_count integer NOT NULL DEFAULT 0,
  report_count   integer NOT NULL DEFAULT 0,

  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),

  -- A supabase-backed row is useless without its key; a static one never has one.
  CONSTRAINT library_documents_storage_key CHECK (
    (storage = 'supabase' AND storage_key IS NOT NULL) OR
    (storage = 'static'   AND storage_key IS NULL)
  )
);

-- The shelf's own query: published rows of one section, newest paper first.
CREATE INDEX IF NOT EXISTS library_documents_shelf_idx
  ON public.library_documents (section_id, status, year DESC NULLS LAST);
-- The admin queue.
CREATE INDEX IF NOT EXISTS library_documents_status_idx
  ON public.library_documents (status, created_at DESC);
-- "What has this person sent us?"
CREATE INDEX IF NOT EXISTS library_documents_submitter_idx
  ON public.library_documents (submitted_by, created_at DESC);
-- The near-duplicate check at review time.
CREATE INDEX IF NOT EXISTS library_documents_text_hash_idx
  ON public.library_documents (text_sha256) WHERE text_sha256 IS NOT NULL;
-- The "practise this topic" bridge.
CREATE INDEX IF NOT EXISTS library_documents_pack_idx
  ON public.library_documents (pack_id) WHERE pack_id IS NOT NULL;

-- ── Reports ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.library_reports (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id  uuid NOT NULL REFERENCES public.library_documents(id) ON DELETE CASCADE,
  reporter_id  uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  reporter_kind text NOT NULL DEFAULT 'parent'
                CHECK (reporter_kind IN ('parent', 'teacher', 'student', 'admin', 'anon')),
  reason       text NOT NULL,
  detail       text,
  -- ⚠ 'dismissed' IS A FIRST-CLASS OUTCOME. Most reports on a school worksheet
  --   will be noise, and a queue with no way to say "looked, it is fine" grows
  --   until nobody opens it.
  status       text NOT NULL DEFAULT 'open'
               CHECK (status IN ('open', 'dismissed', 'actioned')),
  handled_by   uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  handled_at   timestamptz,
  handler_note text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS library_reports_open_idx
  ON public.library_reports (status, created_at DESC);
CREATE INDEX IF NOT EXISTS library_reports_document_idx
  ON public.library_reports (document_id);

-- ── Row level security ─────────────────────────────────────────────────────
ALTER TABLE public.library_sections  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_reports   ENABLE ROW LEVEL SECURITY;

-- ⚠ PER-COMMAND POLICIES, NOT ONE "FOR ALL". A USING clause is evaluated on
--   INSERT too whenever the statement carries RETURNING - which PostgREST emits
--   for every .insert().select() - and this project has taken production down
--   once on exactly that (see families_own in pending.md). Splitting by command
--   is what makes each clause mean only what it says.

-- Sections: everyone reads the visible ones; only an admin writes.
DROP POLICY IF EXISTS library_sections_read ON public.library_sections;
CREATE POLICY library_sections_read ON public.library_sections
  FOR SELECT TO anon, authenticated
  USING (status <> 'hidden' OR is_admin());

DROP POLICY IF EXISTS library_sections_admin_insert ON public.library_sections;
CREATE POLICY library_sections_admin_insert ON public.library_sections
  FOR INSERT TO authenticated WITH CHECK (is_admin());

DROP POLICY IF EXISTS library_sections_admin_update ON public.library_sections;
CREATE POLICY library_sections_admin_update ON public.library_sections
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS library_sections_admin_delete ON public.library_sections;
CREATE POLICY library_sections_admin_delete ON public.library_sections
  FOR DELETE TO authenticated USING (is_admin());

-- Documents: the shelf is public, but only what is published.
-- ⚠ A submitter may see their OWN row whatever its status, so "pending" and
--   "rejected" are visible to the person who sent it. Nobody else sees either.
DROP POLICY IF EXISTS library_documents_read ON public.library_documents;
CREATE POLICY library_documents_read ON public.library_documents
  FOR SELECT TO anon, authenticated
  USING (
    status = 'published'
    OR is_admin()
    OR (submitted_by IS NOT NULL AND submitted_by = auth.uid())
  );

-- ⚠ NO CLIENT INSERT POLICY AT ALL, deliberately. A submission arrives through
--   the Worker, which hashes the bytes, verifies the magic bytes, checks the
--   section is not locked and writes with the service role. A browser that can
--   INSERT here could publish by setting one column.
DROP POLICY IF EXISTS library_documents_admin_write ON public.library_documents;
CREATE POLICY library_documents_admin_write ON public.library_documents
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Reports: anyone signed in may raise one; only an admin reads the queue.
-- ⚠ The INSERT policy carries no lookup - `is_admin()` and friends are STABLE
--   functions that cannot see a row being inserted in the same statement.
DROP POLICY IF EXISTS library_reports_insert ON public.library_reports;
CREATE POLICY library_reports_insert ON public.library_reports
  FOR INSERT TO authenticated
  WITH CHECK (reporter_id IS NULL OR reporter_id = auth.uid());

DROP POLICY IF EXISTS library_reports_admin_read ON public.library_reports;
CREATE POLICY library_reports_admin_read ON public.library_reports
  FOR SELECT TO authenticated USING (is_admin());

DROP POLICY IF EXISTS library_reports_admin_update ON public.library_reports;
CREATE POLICY library_reports_admin_update ON public.library_reports
  FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ── Grants ─────────────────────────────────────────────────────────────────
-- ⚠ anon AS WELL AS authenticated: a child has no JWT, and a parent browsing
--   the shelf before signing in is the ordinary case for a public library.
GRANT SELECT ON public.library_sections  TO anon, authenticated;
GRANT SELECT ON public.library_documents TO anon, authenticated;
GRANT INSERT ON public.library_reports   TO authenticated;
GRANT SELECT, UPDATE ON public.library_sections  TO authenticated;
GRANT UPDATE ON public.library_documents TO authenticated;
GRANT SELECT, UPDATE ON public.library_reports TO authenticated;
