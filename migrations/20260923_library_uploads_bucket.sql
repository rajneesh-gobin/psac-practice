-- ═══════════════════════════════════════════════════════════════════════════
--  A private bucket for community library submissions.
--
--  ⚠ NOT `learning-materials`. That bucket carries a storage policy granting
--    `anon` SELECT on EVERY object in it, and the publishable key is hard-coded
--    in the shipped client — so anything in it is reachable by anyone who knows
--    a key. Signed URLs are the intended path there, but the bucket is not
--    actually closed. A public library that accepts uploads from strangers must
--    not inherit that.
--
--  ⚠ NO POLICIES AT ALL, deliberately. Every read and write goes through
--    /api/library-submit and the admin review endpoint, both of which use the
--    service role — and the service role bypasses RLS. A browser that could
--    write here directly could skip the hash, the magic-byte check, the size
--    cap and the locked-section check, all of which live in the Worker.
--
--  ⚠ file_size_limit is the LAST line of defence, not the first. The Worker
--    refuses anything over 6 MB before it reaches storage; this stops a bug in
--    that check from becoming an unbounded upload.
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('library-uploads', 'library-uploads', false, 6291456, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE
  SET public = false,
      file_size_limit = 6291456,
      allowed_mime_types = ARRAY['application/pdf'];
