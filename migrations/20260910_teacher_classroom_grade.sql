-- ═══════════════════════════════════════════════════════════════════════════
--  Teacher classrooms carry the grade they teach.
--
--  WHY: Set Work had no way to know what a classroom is, so it opened on the
--  LOWEST LIVE GRADE for everybody - a Grade 5 teacher was shown Grade 1
--  subjects every single time they set homework. Nothing in the schema could
--  answer "which grade is this class", so there was nothing honest to infer.
--
--  ⚠ Written from the LIVE definition of teacher_guest_manage (pg_get_functiondef),
--    not from supabase-schema.sql, which is a snapshot and overwrites function
--    bodies with whatever it recorded. After applying, REGENERATE:
--       SUPABASE_ACCESS_TOKEN=sbp_… node scripts/dump-schema.js
--
--  ⚠ CREATE OR REPLACE cannot change a signature. Adding p_grade creates a new
--    seven-argument overload, so the six-argument one is DROPPED in the same
--    transaction - two overloads that a six-name PostgREST call can both
--    satisfy is an ambiguity error, not a fallback.
--
--  Backward compatible in the other direction: the currently deployed client
--  calls with six NAMED arguments, which the seven-argument function accepts
--  because p_grade defaults to NULL. Applying this before deploying is safe.
--
--  Idempotent. Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1. The column ───────────────────────────────────────────────────────────
-- Nullable on purpose: every existing classroom has no grade, and "not said"
-- has to stay expressible rather than being backfilled with a guess.
ALTER TABLE public.teacher_guest_classes
  ADD COLUMN IF NOT EXISTS grade smallint;

COMMENT ON COLUMN public.teacher_guest_classes.grade IS
  'Registered grade 1-9 this class is taught at, or NULL when the teacher has not said. Read by Set Work to preselect the grade.';

-- ADD CONSTRAINT has no IF NOT EXISTS.
DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.teacher_guest_classes'::regclass
      AND conname  = 'teacher_guest_classes_grade_range'
  ) THEN
    ALTER TABLE public.teacher_guest_classes
      ADD CONSTRAINT teacher_guest_classes_grade_range
      CHECK (grade IS NULL OR grade BETWEEN 1 AND 9);
  END IF;
END
$do$;

-- ⚠ NO new column GRANT is needed here, and that is measured, not assumed:
--   teacher_guest_classes has relacl = {postgres, service_role} only, RLS
--   enabled and ZERO policies, so anon and authenticated never touch the table
--   directly - every read and write goes through this SECURITY DEFINER
--   function, which runs as the owner. (Contrast public.students, where a
--   missing per-column GRANT SELECT empties the parent dashboard.)

-- ── 2. The function, with p_grade ───────────────────────────────────────────
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

-- ── 3. Retire the six-argument overload ─────────────────────────────────────
DROP FUNCTION IF EXISTS public.teacher_guest_manage(text, uuid, uuid, text, text, integer);

-- ── 4. Grants ───────────────────────────────────────────────────────────────
-- ⚠ Matching the ACL the six-argument function actually carried, read from
--   proacl: =X/postgres | postgres | anon | authenticated | service_role.
--   A newly created function already inherits PUBLIC EXECUTE; the named grants
--   are what the teacher (authenticated) and the guest paths rely on.
GRANT EXECUTE ON FUNCTION public.teacher_guest_manage(
  p_action text, p_id uuid, p_classroom uuid, p_name text,
  p_access_type text, p_expected_students integer, p_grade integer
) TO anon, authenticated, service_role;

COMMIT;
