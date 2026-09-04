-- Run AFTER supabase-teacher-guest-classrooms.sql, before deploying this batch.
-- Additive upgrade; no registered-family policies or records are changed.
BEGIN;
DO $$ DECLARE c record; BEGIN
  IF to_regclass('public.teacher_guest_access') IS NULL THEN
    RAISE EXCEPTION 'Apply supabase-teacher-guest-classrooms.sql first';
  END IF;
  FOR c IN SELECT conname FROM pg_constraint WHERE conrelid='public.teacher_guest_access'::regclass
    AND contype='c' AND pg_get_constraintdef(oid) LIKE '%classroom_id%' AND pg_get_constraintdef(oid) LIKE '%mode%'
  LOOP EXECUTE format('ALTER TABLE public.teacher_guest_access DROP CONSTRAINT %I',c.conname); END LOOP;
END $$;
ALTER TABLE public.teacher_guest_access ADD CONSTRAINT teacher_guest_pin_needs_class
  CHECK (mode <> 'classroom_pin' OR classroom_id IS NOT NULL);

CREATE TABLE IF NOT EXISTS public.teacher_guest_archives (
  assignment_id uuid PRIMARY KEY REFERENCES public.guest_assignments(id) ON DELETE CASCADE,
  previous_status text NOT NULL, archived_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.teacher_guest_archives ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.teacher_guest_archives FROM PUBLIC,anon,authenticated;

CREATE OR REPLACE FUNCTION public.teacher_guest_create_assignment(p_title text,p_subject_pack_id text,
  p_chapter_ids jsonb,p_question_ids jsonb,p_access text,p_classroom uuid DEFAULT NULL,p_duration_mins integer DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE c public.teacher_guest_classes%ROWTYPE; r jsonb; n integer;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;
  IF p_access IS NULL OR p_access NOT IN ('classroom_pin','nickname') THEN RAISE EXCEPTION 'Choose assignment access'; END IF;
  IF p_classroom IS NOT NULL THEN
    SELECT * INTO c FROM public.teacher_guest_classes WHERE id=p_classroom AND teacher_id=auth.uid() AND active FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Choose an active classroom you own'; END IF;
  END IF;
  IF p_access='classroom_pin' THEN
    IF c.id IS NULL THEN RAISE EXCEPTION 'Choose a classroom for pupil PINs'; END IF;
    SELECT count(*) INTO n FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND active;
    IF n=0 THEN RAISE EXCEPTION 'Add pupils first or choose nickname entry'; END IF;
  END IF;
  r:=public.guest_assignment_create(p_title,p_subject_pack_id,p_chapter_ids,p_question_ids,'0000',c.name,p_duration_mins,NULL,48);
  IF NOT coalesce((r->>'ok')::boolean,false) THEN RETURN r; END IF;
  UPDATE public.guest_assignments SET pin_hash=crypt(encode(gen_random_bytes(32),'hex'),gen_salt('bf')),
    max_students=CASE WHEN p_access='classroom_pin' THEN greatest(max_students,n) ELSE max_students END WHERE id=(r->>'id')::uuid;
  INSERT INTO public.teacher_guest_access(assignment_id,mode,classroom_id) VALUES((r->>'id')::uuid,p_access,c.id);
  IF p_access='classroom_pin' THEN
    INSERT INTO public.teacher_guest_roster SELECT (r->>'id')::uuid,id FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND active;
  END IF;
  RETURN r || jsonb_build_object('access_mode',p_access,'classroom_id',c.id,
    'max_students',CASE WHEN p_access='classroom_pin' THEN greatest((r->>'max_students')::integer,n) ELSE (r->>'max_students')::integer END);
END $$;

CREATE OR REPLACE FUNCTION public.teacher_guest_assignment_modes() RETURNS jsonb
LANGUAGE sql SECURITY DEFINER SET search_path=public,extensions AS $$
  SELECT jsonb_build_object('ok',public.teacher_guest_authorized(),'modes',coalesce(jsonb_agg(
    jsonb_build_object('id',g.id,'mode',coalesce(a.mode,'legacy'),'classroom_id',a.classroom_id,
      'classroom_name',c.name,'archived',ar.assignment_id IS NOT NULL)),'[]'))
    FROM public.guest_assignments g LEFT JOIN public.teacher_guest_access a ON a.assignment_id=g.id
    LEFT JOIN public.teacher_guest_classes c ON c.id=a.classroom_id
    LEFT JOIN public.teacher_guest_archives ar ON ar.assignment_id=g.id
    WHERE g.teacher_id=auth.uid() AND public.teacher_guest_authorized();
$$;

CREATE OR REPLACE FUNCTION public.teacher_guest_archive_assignment(p_id uuid,p_archive boolean) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE g public.guest_assignments%ROWTYPE; old_status text;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;
  SELECT * INTO g FROM public.guest_assignments WHERE id=p_id AND teacher_id=auth.uid() FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Assignment unavailable'; END IF;
  IF p_archive THEN
    INSERT INTO public.teacher_guest_archives(assignment_id,previous_status) VALUES(g.id,g.status) ON CONFLICT DO NOTHING;
    UPDATE public.guest_assignments SET status='closed' WHERE id=g.id;
  ELSE
    DELETE FROM public.teacher_guest_archives WHERE assignment_id=g.id RETURNING previous_status INTO old_status;
    IF FOUND THEN UPDATE public.guest_assignments SET status=CASE WHEN expires_at<=now() THEN 'expired' ELSE old_status END WHERE id=g.id; END IF;
  END IF;
  RETURN jsonb_build_object('ok',true);
END $$;

CREATE OR REPLACE FUNCTION public.teacher_guest_entry(p_code text,p_name text DEFAULT '',p_pin text DEFAULT '',
  p_ip text DEFAULT '',p_info boolean DEFAULT false) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
BEGIN
  IF EXISTS(SELECT 1 FROM public.guest_assignments g JOIN public.teacher_guest_access a ON a.assignment_id=g.id
    JOIN public.teacher_guest_classes c ON c.id=a.classroom_id WHERE g.code=upper(btrim(p_code)) AND NOT c.active) THEN
    RETURN jsonb_build_object('ok',false,'error','expired');
  END IF;
  RETURN public.teacher_guest_open(p_code,p_name,p_pin,p_ip,p_info);
END $$;

CREATE OR REPLACE FUNCTION public.teacher_guest_class_state_guard() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
BEGIN
  IF TG_OP='INSERT' OR NEW.submitted_at IS DISTINCT FROM OLD.submitted_at THEN
    IF EXISTS(SELECT 1 FROM public.teacher_guest_archives WHERE assignment_id=NEW.assignment_id) THEN
      RAISE EXCEPTION 'Assignment archived';
    END IF;
    IF EXISTS(SELECT 1 FROM public.teacher_guest_access a JOIN public.teacher_guest_classes c ON c.id=a.classroom_id
      WHERE a.assignment_id=NEW.assignment_id AND NOT c.active) THEN RAISE EXCEPTION 'Classroom archived'; END IF;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS teacher_guest_class_state_guard ON public.guest_submissions;
CREATE TRIGGER teacher_guest_class_state_guard BEFORE INSERT OR UPDATE ON public.guest_submissions
  FOR EACH ROW EXECUTE FUNCTION public.teacher_guest_class_state_guard();
REVOKE ALL ON FUNCTION public.teacher_guest_class_state_guard(),public.teacher_guest_archive_assignment(uuid,boolean),
  public.teacher_guest_entry(text,text,text,text,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.teacher_guest_archive_assignment(uuid,boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.teacher_guest_entry(text,text,text,text,boolean) TO service_role;
COMMIT;
