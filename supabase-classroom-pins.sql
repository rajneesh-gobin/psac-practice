-- Classroom access types: per_student (individual PINs) and shared (one class PIN)
-- Self-contained: includes the deleted_at column from supabase-classroom-delete.sql
-- so it is safe to run even if that file was not applied first. Idempotent.

-- ── 0. Ensure soft-delete column exists (also added by supabase-classroom-delete.sql) ──
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
ALTER TABLE public.guest_assignments     ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

-- ── 1. New columns on teacher_guest_classes ───────────────────────────────
ALTER TABLE public.teacher_guest_classes
  ADD COLUMN IF NOT EXISTS access_type     text NOT NULL DEFAULT 'per_student'
    CHECK (access_type IN ('per_student','shared')),
  ADD COLUMN IF NOT EXISTS expected_students integer NOT NULL DEFAULT 25,
  ADD COLUMN IF NOT EXISTS class_pin_cipher  bytea,
  ADD COLUMN IF NOT EXISTS class_pin_lookup  text;

-- ── 2. Replace teacher_guest_manage ──────────────────────────────────────
--   Adds p_access_type, p_expected_students params to create_class.
--   Adds reveal_all_pins action.
--   Returns access_type and class_pin in list/roster responses.
CREATE OR REPLACE FUNCTION public.teacher_guest_manage(
  p_action           text,
  p_id               uuid    DEFAULT NULL,
  p_classroom        uuid    DEFAULT NULL,
  p_name             text    DEFAULT NULL,
  p_access_type      text    DEFAULT NULL,
  p_expected_students integer DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
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

  -- ── LIST ──────────────────────────────────────────────────────────────
  IF p_action = 'list' THEN
    SELECT coalesce(jsonb_agg(jsonb_build_object(
      'id',         x.id,
      'name',       x.name,
      'active',     x.active,
      'access_type',x.access_type,
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

      INSERT INTO public.teacher_guest_classes(teacher_id, name, access_type, expected_students)
        VALUES(auth.uid(), btrim(p_name), access_t, exp_count)
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
        'access_type', c.access_type, 'class_pin', class_pin_plain);
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
END $$;

-- ── 3. Update teacher_guest_open to support shared_pin mode ──────────────
--   shared_pin: student enters the class PIN → verified → name prompt
--   Name used as the nickname key (like existing nickname mode).
CREATE OR REPLACE FUNCTION public.teacher_guest_open(
  p_code   text,
  p_name   text    DEFAULT '',
  p_pin    text    DEFAULT '',
  p_ip     text    DEFAULT '',
  p_info   boolean DEFAULT false
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
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
    INSERT INTO public.guest_submissions(assignment_id,name_key,display_name,open_token_hash)
      VALUES(a.id,key,display,crypt(token,gen_salt('bf')));
  ELSE
    UPDATE public.guest_submissions SET display_name=display,
      open_token_hash=crypt(token,gen_salt('bf')),submitted_at=NULL,answers='[]'
      WHERE assignment_id=a.id AND name_key=key;
  END IF;
  RETURN jsonb_build_object('ok',true,'name',display,'submitName',key,'token',token,
    'assignment',to_jsonb(a),'questions',
    (SELECT coalesce(jsonb_agg(q.body ORDER BY q.position),'[]') FROM public.guest_questions q WHERE q.assignment_id=a.id));
END $$;
