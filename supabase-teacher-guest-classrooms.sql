-- Guest classrooms, independent of registered-child classrooms/enrolments.
-- Run once in Supabase SQL editor BEFORE deploying the corresponding app.
-- Additive: leaves existing assignments/functions/policies untouched.
BEGIN;
DO $$ BEGIN
  IF to_regprocedure('public.guest_assignment_create(text,text,jsonb,jsonb,text,text,integer,timestamp with time zone,integer)') IS NULL
     OR to_regclass('public.guest_submissions') IS NULL THEN
    RAISE EXCEPTION 'Existing guest assignment infrastructure is required';
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.teacher_guest_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), teacher_id uuid NOT NULL REFERENCES public.profiles(id),
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 80), active boolean NOT NULL DEFAULT true,
  secret text NOT NULL DEFAULT encode(extensions.gen_random_bytes(32),'hex'), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.teacher_guest_pupils (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), classroom_id uuid NOT NULL REFERENCES public.teacher_guest_classes(id),
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 40), active boolean NOT NULL DEFAULT true,
  pin_cipher bytea NOT NULL, pin_lookup text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(classroom_id, pin_lookup)
);
CREATE TABLE IF NOT EXISTS public.teacher_guest_access (
  assignment_id uuid PRIMARY KEY REFERENCES public.guest_assignments(id) ON DELETE CASCADE,
  mode text NOT NULL CHECK (mode IN ('classroom_pin','nickname')),
  classroom_id uuid REFERENCES public.teacher_guest_classes(id),
  CHECK ((mode='classroom_pin') = (classroom_id IS NOT NULL))
);
CREATE TABLE IF NOT EXISTS public.teacher_guest_roster (
  assignment_id uuid NOT NULL REFERENCES public.guest_assignments(id) ON DELETE CASCADE,
  pupil_id uuid NOT NULL REFERENCES public.teacher_guest_pupils(id),
  PRIMARY KEY(assignment_id,pupil_id)
);
CREATE TABLE IF NOT EXISTS public.teacher_guest_throttle (
  assignment_id uuid NOT NULL REFERENCES public.guest_assignments(id) ON DELETE CASCADE,
  source text NOT NULL, attempts integer NOT NULL DEFAULT 0, since timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(assignment_id,source)
);
ALTER TABLE public.teacher_guest_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_pupils ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_roster ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_guest_throttle ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.teacher_guest_classes, public.teacher_guest_pupils, public.teacher_guest_access,
  public.teacher_guest_roster, public.teacher_guest_throttle FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.teacher_guest_authorized() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public,extensions AS $$
  SELECT EXISTS(SELECT 1 FROM public.profiles WHERE id=auth.uid()
    AND NOT coalesce(disabled,false) AND (expires_at IS NULL OR expires_at > now())
    AND (role='admin' OR (role='teacher' AND teacher_status='approved')));
$$;

CREATE OR REPLACE FUNCTION public.teacher_guest_manage(p_action text, p_id uuid DEFAULT NULL,
  p_classroom uuid DEFAULT NULL, p_name text DEFAULT NULL) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE c public.teacher_guest_classes%ROWTYPE; s public.teacher_guest_pupils%ROWTYPE;
  pin text; lookup text; out_rows jsonb; tries integer;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;
  IF p_action='list' THEN
    SELECT coalesce(jsonb_agg(jsonb_build_object('id',x.id,'name',x.name,'active',x.active,
      'pupils',(SELECT count(*) FROM public.teacher_guest_pupils WHERE classroom_id=x.id AND active)) ORDER BY x.created_at DESC),'[]')
      INTO out_rows FROM public.teacher_guest_classes x WHERE teacher_id=auth.uid();
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

CREATE OR REPLACE FUNCTION public.teacher_guest_create_assignment(p_title text,p_subject_pack_id text,
  p_chapter_ids jsonb,p_question_ids jsonb,p_access text,p_classroom uuid DEFAULT NULL,p_duration_mins integer DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE c public.teacher_guest_classes%ROWTYPE; r jsonb; n integer;
BEGIN
  IF NOT public.teacher_guest_authorized() THEN RAISE EXCEPTION 'Teacher access required'; END IF;
  IF p_access NOT IN ('classroom_pin','nickname') THEN RAISE EXCEPTION 'Choose assignment access'; END IF;
  IF p_access='classroom_pin' THEN
    SELECT * INTO c FROM public.teacher_guest_classes WHERE id=p_classroom AND teacher_id=auth.uid() AND active FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Choose an active classroom'; END IF;
    SELECT count(*) INTO n FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND active;
    IF n=0 THEN RAISE EXCEPTION 'Add pupils to this classroom first'; END IF;
  END IF;
  r := public.guest_assignment_create(p_title,p_subject_pack_id,p_chapter_ids,p_question_ids,
    '0000',c.name,p_duration_mins,NULL,48);
  IF NOT coalesce((r->>'ok')::boolean,false) THEN RETURN r; END IF;
  -- Random unshared legacy credential prevents opening these assignments through the old PIN route.
  UPDATE public.guest_assignments SET pin_hash=crypt(encode(gen_random_bytes(32),'hex'),gen_salt('bf')),
    max_students=CASE WHEN p_access='classroom_pin' THEN greatest(max_students,n) ELSE max_students END
    WHERE id=(r->>'id')::uuid;
  INSERT INTO public.teacher_guest_access VALUES((r->>'id')::uuid,p_access,c.id);
  IF p_access='classroom_pin' THEN
    INSERT INTO public.teacher_guest_roster SELECT (r->>'id')::uuid,id FROM public.teacher_guest_pupils WHERE classroom_id=c.id AND active;
  END IF;
  RETURN r || jsonb_build_object('access_mode',p_access,'max_students',CASE WHEN p_access='classroom_pin' THEN greatest((r->>'max_students')::integer,n) ELSE (r->>'max_students')::integer END);
END $$;

CREATE OR REPLACE FUNCTION public.teacher_guest_assignment_modes() RETURNS jsonb
LANGUAGE sql SECURITY DEFINER SET search_path=public,extensions AS $$
  SELECT jsonb_build_object('ok',public.teacher_guest_authorized(),'modes',coalesce(jsonb_agg(
    jsonb_build_object('id',a.assignment_id,'mode',a.mode,'classroom_id',a.classroom_id)),'[]'))
    FROM public.teacher_guest_access a JOIN public.guest_assignments g ON g.id=a.assignment_id
    WHERE g.teacher_id=auth.uid() AND public.teacher_guest_authorized();
$$;

CREATE OR REPLACE FUNCTION public.teacher_guest_results(p_assignment_id uuid) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE result jsonb; missing jsonb;
BEGIN
  IF NOT public.teacher_guest_authorized() OR NOT EXISTS(SELECT 1 FROM public.guest_assignments
    WHERE id=p_assignment_id AND teacher_id=auth.uid()) THEN RAISE EXCEPTION 'Assignment unavailable'; END IF;
  result:=public.guest_results(p_assignment_id);
  SELECT coalesce(jsonb_agg(jsonb_build_object('name',s.name,'name_key',s.id::text,'not_started',true,
    'submitted_at',NULL,'answers','[]'::jsonb)),'[]') INTO missing
    FROM public.teacher_guest_roster r JOIN public.teacher_guest_pupils s ON s.id=r.pupil_id
    WHERE r.assignment_id=p_assignment_id AND NOT EXISTS(SELECT 1 FROM public.guest_submissions g
      WHERE g.assignment_id=r.assignment_id AND g.name_key=s.id::text);
  RETURN jsonb_set(result,'{submissions}',coalesce(result->'submissions','[]'::jsonb)||missing);
END $$;

-- Service-role-only entry; never callable directly with a browser's public key.
CREATE OR REPLACE FUNCTION public.teacher_guest_open(p_code text,p_name text DEFAULT '',p_pin text DEFAULT '',
  p_ip text DEFAULT '',p_info boolean DEFAULT false) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE a public.guest_assignments%ROWTYPE; access public.teacher_guest_access%ROWTYPE;
  c public.teacher_guest_classes%ROWTYPE; pupil public.teacher_guest_pupils%ROWTYPE;
  sub public.guest_submissions%ROWTYPE; key text; display text; token text; t public.teacher_guest_throttle%ROWTYPE;
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
  IF access.mode='classroom_pin' THEN
    SELECT * INTO c FROM public.teacher_guest_classes WHERE id=access.classroom_id AND active;
    IF NOT FOUND THEN RETURN jsonb_build_object('ok',false,'error','expired'); END IF;
  END IF;
  IF p_info THEN RETURN jsonb_build_object('ok',true,'access_mode',access.mode,'title',a.title); END IF;
  DELETE FROM public.teacher_guest_throttle WHERE assignment_id=a.id AND since<now()-interval '1 day';
  INSERT INTO public.teacher_guest_throttle(assignment_id,source)
    VALUES(a.id,encode(digest(coalesce(p_ip,''),'sha256'),'hex')) ON CONFLICT DO NOTHING;
  SELECT * INTO t FROM public.teacher_guest_throttle WHERE assignment_id=a.id AND source=encode(digest(coalesce(p_ip,''),'sha256'),'hex') FOR UPDATE;
  IF t.since<now()-interval '10 minutes' THEN t.attempts:=0; t.since:=now(); END IF;
  IF t.attempts >= (CASE WHEN access.mode='nickname' THEN 100 ELSE 10 END) THEN RETURN jsonb_build_object('ok',false,'error','locked'); END IF;
  IF access.mode='classroom_pin' THEN
    SELECT s.* INTO pupil FROM public.teacher_guest_pupils s JOIN public.teacher_guest_roster r ON r.pupil_id=s.id
      WHERE r.assignment_id=a.id AND s.classroom_id=c.id AND s.active
      AND p_pin ~ '^\d{4}$' AND s.pin_lookup=encode(hmac(p_pin,c.secret,'sha256'),'hex');
    IF NOT FOUND THEN
      UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;
      RETURN jsonb_build_object('ok',false,'error','bad_pin');
    END IF;
    key:=pupil.id::text; display:=pupil.name;
  ELSE
    display:=btrim(p_name);
    IF display IS NULL OR length(display) NOT BETWEEN 1 AND 40 THEN RETURN jsonb_build_object('ok',false,'error','name_required'); END IF;
    key:=lower(display);
    UPDATE public.teacher_guest_throttle SET attempts=t.attempts+1,since=t.since WHERE assignment_id=a.id AND source=t.source;
    -- A classroom may share one IP: only failed PINs are counted above; open nickname joins have a higher limit below.
  END IF;
  SELECT * INTO sub FROM public.guest_submissions WHERE assignment_id=a.id AND name_key=key FOR UPDATE;
  IF FOUND AND sub.submitted_at IS NOT NULL AND NOT sub.retry_allowed THEN
    RETURN jsonb_build_object('ok',false,'error','name_taken');
  END IF;
  IF FOUND AND access.mode='nickname' AND sub.submitted_at IS NULL THEN
    RETURN jsonb_build_object('ok',false,'error','name_taken');
  END IF;
  token:=encode(gen_random_bytes(32),'hex');
  IF sub.id IS NULL THEN
    IF (SELECT count(*) FROM public.guest_submissions WHERE assignment_id=a.id)>=a.max_students THEN RETURN jsonb_build_object('ok',false,'error','full'); END IF;
    INSERT INTO public.guest_submissions(assignment_id,name_key,name_display,open_token_hash)
      VALUES(a.id,key,display,encode(digest(token,'sha256'),'hex'));
  ELSE
    UPDATE public.guest_submissions SET open_token_hash=encode(digest(token,'sha256'),'hex'),
      started_at=CASE WHEN retry_allowed THEN now() ELSE started_at END WHERE id=sub.id;
  END IF;
  RETURN jsonb_build_object('ok',true,'name',display,'submit_name',key,'token',token,'is_retry',coalesce(sub.retry_allowed,false),
    'assignment',jsonb_build_object('code',a.code,'title',a.title,'teacher',a.teacher_label,'classroom',a.classroom_label,
      'subject_pack_id',a.subject_pack_id,'question_ids',a.question_ids,'duration_mins',a.duration_mins,'due_at',a.due_at,'expires_at',a.expires_at));
END $$;

CREATE OR REPLACE FUNCTION public.teacher_guest_submission_guard() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,extensions AS $$
DECLARE a public.teacher_guest_access%ROWTYPE; g public.guest_assignments%ROWTYPE;
BEGIN
  SELECT * INTO a FROM public.teacher_guest_access WHERE assignment_id=NEW.assignment_id;
  IF NOT FOUND THEN RETURN NEW; END IF;
  SELECT * INTO g FROM public.guest_assignments WHERE id=NEW.assignment_id;
  IF coalesce(auth.role(),'') <> 'service_role' THEN
    IF NOT (public.teacher_guest_authorized() AND g.teacher_id=auth.uid()) THEN RAISE EXCEPTION 'Not authorized'; END IF;
    IF TG_OP='INSERT' THEN RAISE EXCEPTION 'Use the submission service'; END IF;
    IF NEW.score IS DISTINCT FROM OLD.score OR NEW.answers IS DISTINCT FROM OLD.answers
       OR NEW.total IS DISTINCT FROM OLD.total OR NEW.submitted_at IS DISTINCT FROM OLD.submitted_at THEN
      RAISE EXCEPTION 'Use the submission service';
    END IF;
  END IF;
  IF NEW.submitted_at IS NOT NULL AND (TG_OP='INSERT' OR NEW.submitted_at IS DISTINCT FROM OLD.submitted_at) THEN
    IF g.status <> 'active' OR g.expires_at<now() THEN RAISE EXCEPTION 'Assignment closed'; END IF;
    IF NOT EXISTS(SELECT 1 FROM public.profiles WHERE id=g.teacher_id AND NOT coalesce(disabled,false)
      AND (expires_at IS NULL OR expires_at>now()) AND (role='admin' OR (role='teacher' AND teacher_status='approved'))) THEN
      RAISE EXCEPTION 'Teacher unavailable';
    END IF;
    IF a.mode='classroom_pin' AND NOT EXISTS(SELECT 1 FROM public.teacher_guest_pupils s
      JOIN public.teacher_guest_classes c ON c.id=s.classroom_id
      JOIN public.teacher_guest_roster r ON r.pupil_id=s.id AND r.assignment_id=g.id
      WHERE s.id::text=NEW.name_key AND c.id=a.classroom_id AND s.active AND c.active) THEN
      RAISE EXCEPTION 'Pupil access removed';
    END IF;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS teacher_guest_submission_guard ON public.guest_submissions;
CREATE TRIGGER teacher_guest_submission_guard BEFORE INSERT OR UPDATE ON public.guest_submissions
  FOR EACH ROW EXECUTE FUNCTION public.teacher_guest_submission_guard();

REVOKE ALL ON FUNCTION public.teacher_guest_submission_guard() FROM PUBLIC,anon,authenticated;
-- The legacy ownership checks compare auth.uid(); anonymous NULL identities
-- must never reach teacher result/retry operations.
REVOKE EXECUTE ON FUNCTION public.guest_results(uuid),public.guest_grant_retry(uuid,text) FROM PUBLIC,anon;
REVOKE ALL ON FUNCTION public.teacher_guest_results(uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.teacher_guest_results(uuid) TO authenticated;
REVOKE ALL ON FUNCTION public.teacher_guest_authorized(),public.teacher_guest_manage(text,uuid,uuid,text),
 public.teacher_guest_create_assignment(text,text,jsonb,jsonb,text,uuid,integer),public.teacher_guest_assignment_modes(),
 public.teacher_guest_open(text,text,text,text,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.teacher_guest_manage(text,uuid,uuid,text),
 public.teacher_guest_create_assignment(text,text,jsonb,jsonb,text,uuid,integer),public.teacher_guest_assignment_modes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.teacher_guest_open(text,text,text,text,boolean) TO service_role;
COMMIT;
