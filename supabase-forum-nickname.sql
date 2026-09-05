-- Forum nickname: let adults choose a display name that the trigger honours.
--
-- The forum_set_author() trigger currently always uses profiles.full_name,
-- so localStorage nicknames never reached the database. This migration adds
-- forum_nickname to profiles and teaches the trigger to prefer it.
--
-- Forum is adults-only (auth.uid() IS NOT NULL enforced by RLS), so students
-- are not covered here.
--
-- Safe to re-run: ADD COLUMN IF NOT EXISTS, CREATE OR REPLACE FUNCTION.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS forum_nickname text
  CONSTRAINT profiles_forum_nickname_len CHECK (char_length(forum_nickname) <= 60);

-- Rewrite the trigger to prefer forum_nickname when set.
CREATE OR REPLACE FUNCTION public.forum_set_author()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $$
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
$$;
