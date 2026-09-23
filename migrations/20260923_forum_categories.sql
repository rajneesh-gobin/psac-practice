-- ═══════════════════════════════════════════════════════════════════════════
--  Forum: add the 'subject' and 'feature' categories.
--
--  WHY — engine/forum.js gained a "Subject Help" board (replacing the four
--  per-subject boards) and a "New Feature Request" board. forum_posts.category
--  carries a CHECK constraint listing every legal id, so without this the new
--  boards render fine and then every post to them fails with a 23514 the
--  moment someone tries to use them. The UI would look correct and be broken.
--
--  ⚠ The four retired ids (maths, english, science, french) are DELIBERATELY
--    kept legal. They hold zero posts today, but a browser running a cached
--    copy of the old engine still offers those boards, and a constraint
--    violation for that user is a worse outcome than an unused enum value.
--    Nothing writes them any more once the new engine is deployed.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.forum_posts
  DROP CONSTRAINT IF EXISTS forum_posts_category_check;

ALTER TABLE public.forum_posts
  ADD CONSTRAINT forum_posts_category_check
  CHECK (category = ANY (ARRAY[
    'general'::text,
    'subject'::text,     -- new: replaces the four per-subject boards
    'history'::text,
    'tips'::text,
    'feature'::text,     -- new: New Feature Request
    'suggest'::text,
    'report'::text,
    'announce'::text,
    -- retired, kept legal for cached clients:
    'maths'::text, 'english'::text, 'science'::text, 'french'::text
  ]));
