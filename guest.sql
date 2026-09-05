-- ═══════════════════════════════════════════════════════════════════
--  Virtual Classroom Hub — Material Sharing for Guest Students
--  Run once in Supabase SQL Editor.
--  Requires: pgcrypto extension (already enabled on Supabase).
--  Does NOT touch existing guest_assignments / teacher_guest_* tables.
-- ═══════════════════════════════════════════════════════════════════
BEGIN;

-- ── 1. CLASSROOMS ────────────────────────────────────────────────────
-- Each teacher creates named classrooms with a human-readable ID.
-- classroom_slug is the public ID students type (e.g. "bluestar").
CREATE TABLE IF NOT EXISTS public.classrooms (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  classroom_slug TEXT       NOT NULL UNIQUE
                            CHECK (classroom_slug ~ '^[a-z0-9]{4,20}$'),
  name          TEXT        NOT NULL CHECK (length(name) BETWEEN 1 AND 80),
  description   TEXT        CHECK (length(description) <= 200),
  emoji         TEXT        NOT NULL DEFAULT '🏫',
  color         TEXT        NOT NULL DEFAULT 'blue'
                            CHECK (color IN ('blue','green','purple','orange','red','pink','teal')),
  pin_hash      TEXT        NOT NULL,
  archived_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. CLASSROOM POSTS ───────────────────────────────────────────────
-- The classroom feed: notes, files, YouTube links, announcements.
CREATE TABLE IF NOT EXISTS public.classroom_posts (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id  UUID        NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  teacher_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type          TEXT        NOT NULL
                            CHECK (type IN ('note','file','youtube','announcement')),
  title         TEXT        NOT NULL CHECK (length(title) BETWEEN 1 AND 120),
  body          TEXT        CHECK (length(body) <= 2000),
  file_path     TEXT,
  file_name     TEXT,
  file_size     INTEGER,
  youtube_url   TEXT,
  pinned        BOOLEAN     NOT NULL DEFAULT FALSE,
  scheduled_at  TIMESTAMPTZ,
  view_count    INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. CROSS-CLASSROOM FILE REFS ─────────────────────────────────────
-- Allows a post to appear in multiple classrooms without re-uploading.
-- The source post stays in classroom_posts; refs point other classrooms to it.
CREATE TABLE IF NOT EXISTS public.classroom_post_refs (
  post_id       UUID        NOT NULL REFERENCES public.classroom_posts(id) ON DELETE CASCADE,
  classroom_id  UUID        NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, classroom_id)
);

-- ── 4. PIN ATTEMPT RATE LIMITING ─────────────────────────────────────
-- Server-side brute-force protection: max 5 wrong attempts per 15 min per IP.
CREATE TABLE IF NOT EXISTS public.classroom_pin_attempts (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_slug TEXT       NOT NULL,
  ip_hash       TEXT        NOT NULL,
  success       BOOLEAN     NOT NULL DEFAULT FALSE,
  attempted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 5. GUEST SESSIONS ────────────────────────────────────────────────
-- Short-lived tokens issued after a correct PIN. Used to authorise feed fetches.
CREATE TABLE IF NOT EXISTS public.classroom_sessions (
  token         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id  UUID        NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at    TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '24 hours'
);

-- ── RLS: lock down all tables ─────────────────────────────────────────
ALTER TABLE public.classrooms             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_posts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_post_refs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_pin_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_sessions     ENABLE ROW LEVEL SECURITY;

-- Revoke all direct access — everything goes through SECURITY DEFINER RPCs
REVOKE ALL ON public.classrooms, public.classroom_posts, public.classroom_post_refs,
  public.classroom_pin_attempts, public.classroom_sessions
  FROM PUBLIC, anon, authenticated;


-- ══════════════════════════════════════════════════════════════════════
--  TEACHER RPCs  (require authenticated + teacher role)
-- ══════════════════════════════════════════════════════════════════════

-- Helper: confirm caller is an approved teacher or admin
CREATE OR REPLACE FUNCTION public.classroom_teacher_ok()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, extensions AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND NOT COALESCE(disabled, FALSE)
      AND (expires_at IS NULL OR expires_at > NOW())
      AND (role = 'admin' OR (role = 'teacher' AND teacher_status = 'approved'))
  );
$$;

-- classroom_manage: CRUD for the teacher's own classrooms
CREATE OR REPLACE FUNCTION public.classroom_manage(
  p_action        TEXT,
  p_slug          TEXT    DEFAULT NULL,
  p_name          TEXT    DEFAULT NULL,
  p_description   TEXT    DEFAULT NULL,
  p_emoji         TEXT    DEFAULT NULL,
  p_color         TEXT    DEFAULT NULL,
  p_pin           TEXT    DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $$
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
$$;

-- classroom_post_manage: create/update/delete/list posts in a classroom
CREATE OR REPLACE FUNCTION public.classroom_post_manage(
  p_action       TEXT,
  p_classroom_id UUID    DEFAULT NULL,
  p_post_id      UUID    DEFAULT NULL,
  p_type         TEXT    DEFAULT NULL,
  p_title        TEXT    DEFAULT NULL,
  p_body         TEXT    DEFAULT NULL,
  p_file_path    TEXT    DEFAULT NULL,
  p_file_name    TEXT    DEFAULT NULL,
  p_file_size    INTEGER DEFAULT NULL,
  p_youtube_url  TEXT    DEFAULT NULL,
  p_pinned       BOOLEAN DEFAULT NULL,
  p_scheduled_at TIMESTAMPTZ DEFAULT NULL,
  p_share_to     UUID[]  DEFAULT NULL   -- extra classroom IDs for cross-post
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $$
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
$$;


-- ══════════════════════════════════════════════════════════════════════
--  GUEST RPCs  (callable by anon — no JWT needed)
-- ══════════════════════════════════════════════════════════════════════

-- verify_classroom_pin: validates classroom slug + PIN, returns session token
CREATE OR REPLACE FUNCTION public.verify_classroom_pin(
  p_slug    TEXT,
  p_pin     TEXT,
  p_ip_hash TEXT DEFAULT ''
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $$
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
$$;

-- get_classroom_feed: returns posts after validating guest session token
CREATE OR REPLACE FUNCTION public.get_classroom_feed(
  p_slug  TEXT,
  p_token UUID
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $$
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
$$;

-- increment_post_view: anonymous view counter (requires valid session)
CREATE OR REPLACE FUNCTION public.classroom_post_view(
  p_post_id UUID,
  p_token   UUID
) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, extensions AS $$
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
$$;

-- ── Grant execute permissions ─────────────────────────────────────────
REVOKE ALL ON FUNCTION
  public.classroom_teacher_ok(),
  public.classroom_manage(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT),
  public.classroom_post_manage(TEXT,UUID,UUID,TEXT,TEXT,TEXT,TEXT,TEXT,INTEGER,TEXT,BOOLEAN,TIMESTAMPTZ,UUID[]),
  public.verify_classroom_pin(TEXT,TEXT,TEXT),
  public.get_classroom_feed(TEXT,UUID),
  public.classroom_post_view(UUID,UUID)
FROM PUBLIC, anon, authenticated;

-- Teacher functions: authenticated only
GRANT EXECUTE ON FUNCTION
  public.classroom_manage(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT),
  public.classroom_post_manage(TEXT,UUID,UUID,TEXT,TEXT,TEXT,TEXT,TEXT,INTEGER,TEXT,BOOLEAN,TIMESTAMPTZ,UUID[])
TO authenticated;

-- Guest functions: anon + authenticated (students and teachers can both call)
GRANT EXECUTE ON FUNCTION
  public.verify_classroom_pin(TEXT,TEXT,TEXT),
  public.get_classroom_feed(TEXT,UUID),
  public.classroom_post_view(UUID,UUID)
TO anon, authenticated;


-- ══════════════════════════════════════════════════════════════════════
--  STORAGE — allow guests to download classroom files
-- ══════════════════════════════════════════════════════════════════════
-- Anon users can SELECT (download) from learning-materials.
-- The file_path is only revealed through get_classroom_feed which requires
-- a valid session token — so knowing the path IS the authorization.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
      AND schemaname = 'storage'
      AND policyname = 'guests can download classroom files'
  ) THEN
    EXECUTE $p$
      CREATE POLICY "guests can download classroom files"
      ON storage.objects FOR SELECT
      TO anon
      USING (bucket_id = 'learning-materials');
    $p$;
  END IF;
END $$;

-- ── Index for performance ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_classroom_posts_classroom
  ON public.classroom_posts (classroom_id, pinned DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_classroom_sessions_token
  ON public.classroom_sessions (token, expires_at);

CREATE INDEX IF NOT EXISTS idx_classroom_pin_attempts_slug
  ON public.classroom_pin_attempts (classroom_slug, ip_hash, attempted_at);

-- ── Auto-clean expired sessions (keep table lean) ─────────────────────
CREATE OR REPLACE FUNCTION public.classroom_sessions_cleanup()
RETURNS VOID LANGUAGE sql SECURITY DEFINER
SET search_path = public AS $$
  DELETE FROM public.classroom_sessions WHERE expires_at < NOW() - INTERVAL '1 day';
$$;
REVOKE ALL ON FUNCTION public.classroom_sessions_cleanup() FROM PUBLIC, anon, authenticated;

COMMIT;
