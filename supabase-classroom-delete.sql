-- Classroom soft-delete with 10-day grace period
-- Run this once; idempotent.
-- After applying, add `[functions."classroom-purge"] schedule = "@daily"` in netlify.toml.

-- 1. Add deleted_at to the teacher guest classrooms table
ALTER TABLE public.teacher_guest_classes ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
CREATE INDEX IF NOT EXISTS idx_tgc_deleted_at ON public.teacher_guest_classes(deleted_at) WHERE deleted_at IS NOT NULL;

-- 2. Add deleted_at to guest assignments (for orphan cleanup when a classroom is deleted)
ALTER TABLE public.guest_assignments ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
CREATE INDEX IF NOT EXISTS idx_ga_deleted_at ON public.guest_assignments(deleted_at) WHERE deleted_at IS NOT NULL;

-- 3. Replace teacher_guest_manage to:
--    a) filter deleted classrooms out of `list`
--    b) add `delete_class` action that soft-deletes the classroom and its orphaned assignments
CREATE OR REPLACE FUNCTION public.teacher_guest_manage(p_action text, p_id uuid DEFAULT NULL,
  p_classroom uuid DEFAULT NULL, p_name text DEFAULT NULL) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE c public.teacher_guest_classes%ROWTYPE; s public.teacher_guest_pupils%ROWTYPE;
  pin text; lookup text; out_rows jsonb; tries integer;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;
  IF p_action='list' THEN
    -- deleted_at IS NULL: never show classrooms in the grace period or purged
    SELECT coalesce(jsonb_agg(jsonb_build_object('id',x.id,'name',x.name,'active',x.active,
      'pupils',(SELECT count(*) FROM public.teacher_guest_pupils WHERE classroom_id=x.id AND active)) ORDER BY x.created_at DESC),'[]')
      INTO out_rows FROM public.teacher_guest_classes x
      WHERE teacher_id=auth.uid() AND deleted_at IS NULL;
    RETURN jsonb_build_object('ok',true,'classes',out_rows);
  END IF;
  IF p_action='create_class' THEN
    IF p_name IS NULL OR length(btrim(p_name)) NOT BETWEEN 1 AND 80 THEN RAISE EXCEPTION 'Enter a classroom name'; END IF;
    INSERT INTO public.teacher_guest_classes(teacher_id,name) VALUES(auth.uid(),btrim(p_name)) RETURNING * INTO c;
    RETURN jsonb_build_object('ok',true,'id',c.id);
  END IF;
  SELECT * INTO c FROM public.teacher_guest_classes WHERE id=p_classroom AND teacher_id=auth.uid() FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Classroom unavailable'; END IF;
  IF p_action='rename_class' THEN
    UPDATE public.teacher_guest_classes SET name=btrim(p_name) WHERE id=c.id;
  ELSIF p_action='toggle_class' THEN
    UPDATE public.teacher_guest_classes SET active=NOT active WHERE id=c.id;
  ELSIF p_action='delete_class' THEN
    -- Soft-delete the classroom; it stays queryable by admins for 10 days
    UPDATE public.teacher_guest_classes SET deleted_at=now() WHERE id=c.id;
    -- Soft-delete assignments linked ONLY to this classroom (orphan check)
    UPDATE public.guest_assignments SET deleted_at=now()
      WHERE teacher_id=auth.uid()
        AND deleted_at IS NULL
        AND id IN (
          SELECT a.assignment_id
          FROM public.teacher_guest_access a
          WHERE a.classroom_id=c.id
            AND NOT EXISTS (
              SELECT 1 FROM public.teacher_guest_access b
              WHERE b.assignment_id=a.assignment_id
                AND b.classroom_id<>c.id
            )
        );
  ELSIF p_action='roster' THEN
    SELECT coalesce(jsonb_agg(jsonb_build_object('id',id,'name',name,'active',active) ORDER BY name),'[]')
      INTO out_rows FROM public.teacher_guest_pupils WHERE classroom_id=c.id;
    RETURN jsonb_build_object('ok',true,'pupils',out_rows);
  ELSIF p_action IN ('add_pupil','reset_pin','reveal_pin','rename_pupil','toggle_pupil') THEN
    IF p_action <> 'add_pupil' THEN
      SELECT * INTO s FROM public.teacher_guest_pupils WHERE id=p_id AND classroom_id=c.id FOR UPDATE;
      IF NOT FOUND THEN RAISE EXCEPTION 'Pupil unavailable'; END IF;
    END IF;
    IF p_action IN ('add_pupil','reset_pin') THEN
      IF NOT c.active THEN RAISE EXCEPTION 'Restore this classroom first'; END IF;
      IF p_action='add_pupil' AND (SELECT count(*) FROM public.teacher_guest_pupils WHERE classroom_id=c.id) >= 200 THEN
        RAISE EXCEPTION 'Classroom limit is 200 pupils';
      END IF;
      FOR tries IN 1..1000 LOOP
        pin := lpad(((get_byte(gen_random_bytes(2),0)*256+get_byte(gen_random_bytes(2),1)) % 10000)::text,4,'0');
        lookup := encode(hmac(pin,c.secret,'sha256'),'hex');
        EXIT WHEN NOT EXISTS(SELECT 1 FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND pin_lookup=lookup);
      END LOOP;
      IF p_action='add_pupil' THEN
        IF p_name IS NULL OR length(btrim(p_name)) NOT BETWEEN 1 AND 40 THEN RAISE EXCEPTION 'Enter a pupil name (1–40 characters)'; END IF;
        INSERT INTO public.teacher_guest_pupils(classroom_id,name,pin_cipher,pin_lookup)
          VALUES(c.id,btrim(p_name),pgp_sym_encrypt(pin,c.secret),lookup) RETURNING * INTO s;
      ELSE
        UPDATE public.teacher_guest_pupils SET pin_cipher=pgp_sym_encrypt(pin,c.secret),pin_lookup=lookup WHERE id=s.id;
        UPDATE public.guest_submissions SET open_token_hash=NULL WHERE name_key=s.id::text
          AND assignment_id IN (SELECT assignment_id FROM public.teacher_guest_access WHERE classroom_id=c.id);
      END IF;
      RETURN jsonb_build_object('ok',true,'id',s.id,'pin',pin);
    ELSIF p_action='reveal_pin' THEN
      RETURN jsonb_build_object('ok',true,'pin',pgp_sym_decrypt(s.pin_cipher,c.secret));
    ELSIF p_action='rename_pupil' THEN
      UPDATE public.teacher_guest_pupils SET name=btrim(p_name) WHERE id=s.id;
    ELSE
      UPDATE public.teacher_guest_pupils SET active=NOT active WHERE id=s.id;
    END IF;
  ELSE RAISE EXCEPTION 'Unknown action';
  END IF;
  RETURN jsonb_build_object('ok',true);
END $$;

-- 4. Admin recovery helper: list deleted classrooms and recover one
--    Call with action='list_deleted' (admin only) or action='recover' + p_classroom
CREATE OR REPLACE FUNCTION public.teacher_guest_admin_recover(p_action text, p_classroom uuid DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
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
END $$;

GRANT EXECUTE ON FUNCTION public.teacher_guest_admin_recover(text, uuid) TO authenticated;
