-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice - LIVE SCHEMA SNAPSHOT
--  Generated 2026-08-25 12:25 UTC by introspecting the running database.
--
--  THIS FILE IS THE SOURCE OF TRUTH for what production actually contains.
--  DB_RESTORE_REFERENCE.txt and supabase-db-patch.sql have both drifted and
--  are wrong about column names, column types and function bodies.
--  Do NOT run supabase-db-patch.sql: its verify_student_pin is older than
--  production and reintroduces username enumeration.
--
--  Derived from pg_catalog (pg_get_functiondef / pg_indexes / pg_policies),
--  not from pg_dump - so treat it as an accurate REFERENCE rather than a
--  guaranteed-runnable restore script.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── TABLES & COLUMNS ──────────────────────────────────────────────────────

-- assignment_submissions
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   assignment_id          uuid
--   classroom_id           uuid
--   student_id             uuid NOT NULL
--   attempt                integer NOT NULL DEFAULT 1
--   score                  integer NOT NULL DEFAULT 0
--   total                  integer NOT NULL DEFAULT 0
--   pct                    integer NOT NULL DEFAULT 0
--   answers                jsonb NOT NULL DEFAULT '[]'::jsonb
--   retry_allowed          boolean NOT NULL DEFAULT false
--   submitted_at           timestamp with time zone NOT NULL DEFAULT now()

-- classrooms
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   teacher_id             uuid NOT NULL
--   name                   text NOT NULL
--   subject                text
--   grade_level            integer
--   schedule               text
--   invite_code            text NOT NULL DEFAULT gen_invite_code()
--   is_active              boolean NOT NULL DEFAULT true
--   created_at             timestamp with time zone NOT NULL DEFAULT now()

-- enrollments
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   student_id             uuid NOT NULL
--   classroom_id           uuid NOT NULL
--   joined_at              timestamp with time zone NOT NULL DEFAULT now()
--   is_active              boolean NOT NULL DEFAULT true

-- families
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   parent_id              uuid NOT NULL
--   family_name            text NOT NULL DEFAULT 'My Family'::text
--   family_code            character NOT NULL DEFAULT upper(substr(md5((random())::text), 1, 6))
--   created_at             timestamp with time zone DEFAULT now()

-- forum_posts
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   category               text NOT NULL
--   title                  text NOT NULL
--   body                   text NOT NULL
--   author_name            text NOT NULL DEFAULT 'Anonymous'::text
--   author_type            text NOT NULL DEFAULT 'parent'::text
--   created_at             timestamp with time zone DEFAULT now()
--   reply_count            integer DEFAULT 0
--   status                 text NOT NULL DEFAULT 'open'::text
--   author_id              uuid DEFAULT auth.uid()
--   author_student_id      uuid DEFAULT current_student_id()

-- forum_replies
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   post_id                uuid NOT NULL
--   body                   text NOT NULL
--   author_name            text NOT NULL DEFAULT 'Anonymous'::text
--   author_type            text NOT NULL DEFAULT 'parent'::text
--   created_at             timestamp with time zone DEFAULT now()
--   author_id              uuid DEFAULT auth.uid()
--   author_student_id      uuid DEFAULT current_student_id()

-- guest_assignments
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   code                   text NOT NULL
--   teacher_id             uuid NOT NULL
--   teacher_label          text
--   classroom_label        text
--   title                  text NOT NULL
--   subject_pack_id        text NOT NULL
--   chapter_ids            jsonb NOT NULL DEFAULT '[]'::jsonb
--   question_ids           jsonb NOT NULL DEFAULT '[]'::jsonb
--   question_count         integer NOT NULL DEFAULT 10
--   duration_mins          integer
--   pin_hash               text NOT NULL
--   due_at                 timestamp with time zone
--   expires_at             timestamp with time zone NOT NULL DEFAULT (now() + '48:00:00'::interval)
--   max_students           integer NOT NULL DEFAULT 15
--   status                 text NOT NULL DEFAULT 'active'::text
--   created_at             timestamp with time zone NOT NULL DEFAULT now()

-- guest_pin_attempts
--   assignment_id          uuid NOT NULL
--   name_key               text NOT NULL
--   attempts               integer NOT NULL DEFAULT 0
--   locked_until           timestamp with time zone
--   updated_at             timestamp with time zone NOT NULL DEFAULT now()

-- guest_submissions
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   assignment_id          uuid NOT NULL
--   name_display           text NOT NULL
--   name_key               text NOT NULL
--   answers                jsonb NOT NULL DEFAULT '[]'::jsonb
--   score                  integer NOT NULL DEFAULT 0
--   total                  integer NOT NULL DEFAULT 0
--   pct                    integer NOT NULL DEFAULT 0
--   attempt                integer NOT NULL DEFAULT 1
--   retry_allowed          boolean NOT NULL DEFAULT false
--   started_at             timestamp with time zone NOT NULL DEFAULT now()
--   submitted_at           timestamp with time zone
--   ip                     text
--   user_agent             text

-- login_events
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   user_id                text NOT NULL
--   user_type              text NOT NULL DEFAULT 'student'::text
--   ip_address             text
--   user_agent             text
--   fingerprint            text
--   created_at             timestamp with time zone NOT NULL DEFAULT now()

-- mm_data
--   key                    text NOT NULL
--   value                  jsonb NOT NULL
--   updated_at             timestamp with time zone DEFAULT now()

-- payments
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   user_id                uuid NOT NULL
--   plan_id                text NOT NULL
--   amount_mur             integer NOT NULL DEFAULT 0
--   provider               text NOT NULL DEFAULT 'manual'::text
--   provider_ref           text
--   status                 text NOT NULL DEFAULT 'pending'::text
--   notes                  text
--   created_at             timestamp with time zone NOT NULL DEFAULT now()
--   processed_at           timestamp with time zone

-- plans
--   id                     text NOT NULL
--   name                   text NOT NULL
--   price_mur              integer NOT NULL DEFAULT 0
--   max_children           integer NOT NULL DEFAULT 1
--   features               jsonb NOT NULL DEFAULT '{}'::jsonb
--   is_active              boolean NOT NULL DEFAULT false
--   created_at             timestamp with time zone NOT NULL DEFAULT now()

-- profiles
--   id                     uuid NOT NULL
--   role                   text NOT NULL
--   full_name              text NOT NULL
--   created_at             timestamp with time zone DEFAULT now()
--   disabled               boolean DEFAULT false
--   expires_at             timestamp with time zone
--   is_super_admin         boolean NOT NULL DEFAULT false
--   teacher_tier           text NOT NULL DEFAULT 'unverified'::text
--   teacher_status         text NOT NULL DEFAULT 'none'::text
--   teacher_note           text
--   teacher_requested_at   timestamp with time zone
--   teacher_decided_at     timestamp with time zone
--   teacher_decided_by     uuid

-- push_subscriptions
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   student_id             uuid NOT NULL
--   subscription           jsonb NOT NULL
--   reminder_time          text
--   created_at             timestamp with time zone DEFAULT now()

-- question_reports
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   created_at             timestamp with time zone DEFAULT now()
--   question_id            text
--   question_text          text
--   message                text
--   student_id             uuid
--   status                 text DEFAULT 'open'::text

-- schedule_entries
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   schedule_id            uuid NOT NULL
--   student_id             text NOT NULL
--   date                   date NOT NULL
--   chapter_id             text
--   topic_label            text NOT NULL
--   duration_mins          integer
--   entry_type             text DEFAULT 'study'::text
--   notes                  text
--   completed              boolean DEFAULT false
--   created_at             timestamp with time zone DEFAULT now()
--   subject_id             text

-- student_assignments
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   student_id             text NOT NULL
--   parent_id              uuid
--   subject_id             text
--   chapter_id             text
--   difficulty             integer
--   note                   text
--   completed_at           timestamp with time zone
--   created_at             timestamp with time zone NOT NULL DEFAULT now()
--   show_answers           boolean NOT NULL DEFAULT true
--   source_type            text DEFAULT 'parent'::text
--   classroom_id           uuid
--   due_date               date

-- student_progress
--   student_id             text NOT NULL
--   data                   jsonb NOT NULL DEFAULT '{}'::jsonb
--   updated_at             timestamp with time zone DEFAULT now()

-- student_sessions
--   token_hash             text NOT NULL
--   student_id             uuid NOT NULL
--   created_at             timestamp with time zone NOT NULL DEFAULT now()
--   expires_at             timestamp with time zone NOT NULL
--   user_agent             text

-- students
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   family_id              uuid NOT NULL
--   username               text NOT NULL
--   display_name           text NOT NULL
--   avatar                 text NOT NULL DEFAULT '??'::text
--   grade                  integer NOT NULL DEFAULT 5
--   pin                    text NOT NULL
--   settings               jsonb NOT NULL
--   created_at             timestamp with time zone DEFAULT now()
--   session_version        integer NOT NULL DEFAULT 0
--   expires_at             timestamp with time zone
--   pin_hash               text
--   pin_attempts           integer NOT NULL DEFAULT 0
--   pin_locked_until       timestamp with time zone

-- study_schedules
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   student_id             text NOT NULL
--   parent_id              uuid
--   settings               jsonb
--   created_at             timestamp with time zone DEFAULT now()
--   updated_at             timestamp with time zone DEFAULT now()

-- subscriptions
--   id                     uuid NOT NULL DEFAULT gen_random_uuid()
--   user_id                uuid NOT NULL
--   plan_id                text NOT NULL
--   status                 text NOT NULL DEFAULT 'active'::text
--   started_at             timestamp with time zone NOT NULL DEFAULT now()
--   expires_at             timestamp with time zone
--   created_at             timestamp with time zone NOT NULL DEFAULT now()

-- ── CONSTRAINTS ───────────────────────────────────────────────────────────
ALTER TABLE assignment_submissions ADD CONSTRAINT assignment_submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES student_assignments(id) ON DELETE CASCADE;
ALTER TABLE assignment_submissions ADD CONSTRAINT assignment_submissions_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
ALTER TABLE assignment_submissions ADD CONSTRAINT assignment_submissions_pkey PRIMARY KEY (id);
ALTER TABLE assignment_submissions ADD CONSTRAINT assignment_submissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
ALTER TABLE classrooms ADD CONSTRAINT classrooms_grade_level_check CHECK ((grade_level = ANY (ARRAY[4, 5, 6])));
ALTER TABLE classrooms ADD CONSTRAINT classrooms_invite_code_key UNIQUE (invite_code);
ALTER TABLE classrooms ADD CONSTRAINT classrooms_pkey PRIMARY KEY (id);
ALTER TABLE classrooms ADD CONSTRAINT classrooms_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE enrollments ADD CONSTRAINT enrollments_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
ALTER TABLE enrollments ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);
ALTER TABLE enrollments ADD CONSTRAINT enrollments_student_id_classroom_id_key UNIQUE (student_id, classroom_id);
ALTER TABLE enrollments ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
ALTER TABLE families ADD CONSTRAINT families_family_code_key UNIQUE (family_code);
ALTER TABLE families ADD CONSTRAINT families_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE families ADD CONSTRAINT families_parent_id_key UNIQUE (parent_id);
ALTER TABLE families ADD CONSTRAINT families_pkey PRIMARY KEY (id);
ALTER TABLE forum_posts ADD CONSTRAINT forum_posts_category_check CHECK ((category = ANY (ARRAY['general'::text, 'maths'::text, 'english'::text, 'science'::text, 'french'::text, 'history'::text, 'tips'::text, 'suggest'::text, 'report'::text, 'announce'::text])));
ALTER TABLE forum_posts ADD CONSTRAINT forum_posts_pkey PRIMARY KEY (id);
ALTER TABLE forum_posts ADD CONSTRAINT forum_posts_status_check CHECK ((status = ANY (ARRAY['open'::text, 'closed'::text])));
ALTER TABLE forum_replies ADD CONSTRAINT forum_replies_pkey PRIMARY KEY (id);
ALTER TABLE forum_replies ADD CONSTRAINT forum_replies_post_id_fkey FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE;
ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_code_key UNIQUE (code);
ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_pkey PRIMARY KEY (id);
ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_status_chk CHECK ((status = ANY (ARRAY['active'::text, 'closed'::text, 'expired'::text])));
ALTER TABLE guest_assignments ADD CONSTRAINT guest_assignments_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE guest_pin_attempts ADD CONSTRAINT guest_pin_attempts_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
ALTER TABLE guest_pin_attempts ADD CONSTRAINT guest_pin_attempts_pkey PRIMARY KEY (assignment_id, name_key);
ALTER TABLE guest_submissions ADD CONSTRAINT guest_submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE;
ALTER TABLE guest_submissions ADD CONSTRAINT guest_submissions_assignment_id_name_key_key UNIQUE (assignment_id, name_key);
ALTER TABLE guest_submissions ADD CONSTRAINT guest_submissions_pkey PRIMARY KEY (id);
ALTER TABLE login_events ADD CONSTRAINT login_events_pkey PRIMARY KEY (id);
ALTER TABLE mm_data ADD CONSTRAINT mm_data_pkey PRIMARY KEY (key);
ALTER TABLE payments ADD CONSTRAINT payments_pkey PRIMARY KEY (id);
ALTER TABLE payments ADD CONSTRAINT payments_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES plans(id);
ALTER TABLE payments ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE plans ADD CONSTRAINT plans_pkey PRIMARY KEY (id);
ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK ((role = ANY (ARRAY['parent'::text, 'teacher'::text, 'admin'::text])));
ALTER TABLE profiles ADD CONSTRAINT profiles_teacher_decided_by_fkey FOREIGN KEY (teacher_decided_by) REFERENCES profiles(id) ON DELETE SET NULL;
ALTER TABLE profiles ADD CONSTRAINT profiles_teacher_status_chk CHECK ((teacher_status = ANY (ARRAY['none'::text, 'pending'::text, 'approved'::text, 'rejected'::text, 'suspended'::text])));
ALTER TABLE profiles ADD CONSTRAINT profiles_teacher_tier_chk CHECK ((teacher_tier = ANY (ARRAY['unverified'::text, 'verified'::text])));
ALTER TABLE push_subscriptions ADD CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id);
ALTER TABLE push_subscriptions ADD CONSTRAINT push_subscriptions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
ALTER TABLE push_subscriptions ADD CONSTRAINT push_subscriptions_student_id_key UNIQUE (student_id);
ALTER TABLE question_reports ADD CONSTRAINT question_reports_pkey PRIMARY KEY (id);
ALTER TABLE question_reports ADD CONSTRAINT question_reports_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL;
ALTER TABLE schedule_entries ADD CONSTRAINT schedule_entries_entry_type_check CHECK ((entry_type = ANY (ARRAY['study'::text, 'exam'::text, 'holiday'::text, 'blocked'::text, 'other'::text])));
ALTER TABLE schedule_entries ADD CONSTRAINT schedule_entries_pkey PRIMARY KEY (id);
ALTER TABLE schedule_entries ADD CONSTRAINT schedule_entries_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES study_schedules(id) ON DELETE CASCADE;
ALTER TABLE student_assignments ADD CONSTRAINT student_assignments_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;
ALTER TABLE student_assignments ADD CONSTRAINT student_assignments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE student_assignments ADD CONSTRAINT student_assignments_pkey PRIMARY KEY (id);
ALTER TABLE student_assignments ADD CONSTRAINT student_assignments_source_type_chk CHECK ((source_type = ANY (ARRAY['parent'::text, 'teacher'::text])));
ALTER TABLE student_progress ADD CONSTRAINT student_progress_pkey PRIMARY KEY (student_id);
ALTER TABLE student_sessions ADD CONSTRAINT student_sessions_pkey PRIMARY KEY (token_hash);
ALTER TABLE student_sessions ADD CONSTRAINT student_sessions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE;
ALTER TABLE students ADD CONSTRAINT students_family_id_fkey FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE;
ALTER TABLE students ADD CONSTRAINT students_family_id_username_key UNIQUE (family_id, username);
ALTER TABLE students ADD CONSTRAINT students_pkey PRIMARY KEY (id);
ALTER TABLE study_schedules ADD CONSTRAINT study_schedules_pkey PRIMARY KEY (id);
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES plans(id);
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ── INDEXES ───────────────────────────────────────────────────────────────
CREATE UNIQUE INDEX assignment_submissions_pkey ON public.assignment_submissions USING btree (id);
CREATE INDEX submissions_assignment_idx ON public.assignment_submissions USING btree (assignment_id);
CREATE INDEX submissions_classroom_idx ON public.assignment_submissions USING btree (classroom_id);
CREATE INDEX submissions_student_idx ON public.assignment_submissions USING btree (student_id);
CREATE INDEX classrooms_code_idx ON public.classrooms USING btree (invite_code);
CREATE UNIQUE INDEX classrooms_invite_code_key ON public.classrooms USING btree (invite_code);
CREATE UNIQUE INDEX classrooms_pkey ON public.classrooms USING btree (id);
CREATE INDEX classrooms_teacher_idx ON public.classrooms USING btree (teacher_id);
CREATE INDEX enrollments_classroom_idx ON public.enrollments USING btree (classroom_id);
CREATE UNIQUE INDEX enrollments_pkey ON public.enrollments USING btree (id);
CREATE UNIQUE INDEX enrollments_student_id_classroom_id_key ON public.enrollments USING btree (student_id, classroom_id);
CREATE INDEX enrollments_student_idx ON public.enrollments USING btree (student_id);
CREATE UNIQUE INDEX families_family_code_key ON public.families USING btree (family_code);
CREATE UNIQUE INDEX families_parent_id_key ON public.families USING btree (parent_id);
CREATE UNIQUE INDEX families_pkey ON public.families USING btree (id);
CREATE UNIQUE INDEX forum_posts_pkey ON public.forum_posts USING btree (id);
CREATE UNIQUE INDEX forum_replies_pkey ON public.forum_replies USING btree (id);
CREATE INDEX guest_assignments_code_idx ON public.guest_assignments USING btree (code);
CREATE UNIQUE INDEX guest_assignments_code_key ON public.guest_assignments USING btree (code);
CREATE UNIQUE INDEX guest_assignments_pkey ON public.guest_assignments USING btree (id);
CREATE INDEX guest_assignments_teacher_idx ON public.guest_assignments USING btree (teacher_id, created_at DESC);
CREATE UNIQUE INDEX guest_pin_attempts_pkey ON public.guest_pin_attempts USING btree (assignment_id, name_key);
CREATE UNIQUE INDEX guest_submissions_assignment_id_name_key_key ON public.guest_submissions USING btree (assignment_id, name_key);
CREATE INDEX guest_submissions_assignment_idx ON public.guest_submissions USING btree (assignment_id);
CREATE UNIQUE INDEX guest_submissions_pkey ON public.guest_submissions USING btree (id);
CREATE UNIQUE INDEX login_events_pkey ON public.login_events USING btree (id);
CREATE INDEX login_events_user_idx ON public.login_events USING btree (user_id, created_at DESC);
CREATE UNIQUE INDEX mm_data_pkey ON public.mm_data USING btree (key);
CREATE UNIQUE INDEX payments_pkey ON public.payments USING btree (id);
CREATE INDEX payments_user_idx ON public.payments USING btree (user_id, created_at DESC);
CREATE UNIQUE INDEX plans_pkey ON public.plans USING btree (id);
CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);
CREATE INDEX profiles_teacher_pending_idx ON public.profiles USING btree (teacher_requested_at DESC) WHERE (teacher_status = 'pending'::text);
CREATE UNIQUE INDEX push_subscriptions_pkey ON public.push_subscriptions USING btree (id);
CREATE UNIQUE INDEX push_subscriptions_student_id_key ON public.push_subscriptions USING btree (student_id);
CREATE UNIQUE INDEX question_reports_pkey ON public.question_reports USING btree (id);
CREATE UNIQUE INDEX schedule_entries_pkey ON public.schedule_entries USING btree (id);
CREATE INDEX assignments_classroom_idx ON public.student_assignments USING btree (classroom_id);
CREATE INDEX assignments_source_idx ON public.student_assignments USING btree (source_type);
CREATE UNIQUE INDEX student_assignments_pkey ON public.student_assignments USING btree (id);
CREATE UNIQUE INDEX student_progress_pkey ON public.student_progress USING btree (student_id);
CREATE INDEX student_sessions_expiry_idx ON public.student_sessions USING btree (expires_at);
CREATE UNIQUE INDEX student_sessions_pkey ON public.student_sessions USING btree (token_hash);
CREATE INDEX student_sessions_student_idx ON public.student_sessions USING btree (student_id);
CREATE UNIQUE INDEX students_family_id_username_key ON public.students USING btree (family_id, username);
CREATE UNIQUE INDEX students_pkey ON public.students USING btree (id);
CREATE UNIQUE INDEX study_schedules_pkey ON public.study_schedules USING btree (id);
CREATE UNIQUE INDEX subscriptions_pkey ON public.subscriptions USING btree (id);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_pin_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mm_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ── POLICIES ──────────────────────────────────────────────────────────────

-- assignment_submissions
CREATE POLICY subs_parent_read ON public.assignment_submissions FOR SELECT TO {public}
  USING (owns_student_txt((student_id)::text))
;
CREATE POLICY subs_student_insert ON public.assignment_submissions FOR INSERT TO {public}
  WITH CHECK ((student_id = current_student_id()))
;
CREATE POLICY subs_student_read ON public.assignment_submissions FOR SELECT TO {public}
  USING ((student_id = current_student_id()))
;
CREATE POLICY subs_teacher ON public.assignment_submissions FOR ALL TO {public}
  USING ((owns_classroom(classroom_id) OR is_admin()))
  WITH CHECK ((owns_classroom(classroom_id) OR is_admin()))
;

-- classrooms
CREATE POLICY classrooms_member_read ON public.classrooms FOR SELECT TO {public}
  USING ((parent_of_classroom_member(id) OR (EXISTS ( SELECT 1
   FROM enrollments e
  WHERE ((e.classroom_id = classrooms.id) AND (e.student_id = current_student_id()))))))
;
CREATE POLICY classrooms_teacher ON public.classrooms FOR ALL TO {public}
  USING (((teacher_id = auth.uid()) OR is_admin()))
  WITH CHECK ((((teacher_id = auth.uid()) AND is_teacher()) OR is_admin()))
;

-- enrollments
CREATE POLICY enroll_parent_read ON public.enrollments FOR SELECT TO {public}
  USING (owns_student_txt((student_id)::text))
;
CREATE POLICY enroll_student_read ON public.enrollments FOR SELECT TO {public}
  USING ((student_id = current_student_id()))
;
CREATE POLICY enroll_teacher ON public.enrollments FOR ALL TO {public}
  USING ((owns_classroom(classroom_id) OR is_admin()))
  WITH CHECK ((owns_classroom(classroom_id) OR is_admin()))
;

-- families
CREATE POLICY families_own ON public.families FOR ALL TO {public}
  USING (((parent_id = auth.uid()) OR is_admin()))
  WITH CHECK (((parent_id = auth.uid()) OR is_admin()))
;

-- forum_posts
CREATE POLICY posts_delete ON public.forum_posts FOR DELETE TO {public}
  USING (((author_id = auth.uid()) OR (author_student_id = current_student_id()) OR is_admin()))
;
CREATE POLICY posts_insert ON public.forum_posts FOR INSERT TO {public}
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)))
;
CREATE POLICY posts_read ON public.forum_posts FOR SELECT TO {public}
  USING (true)
;
CREATE POLICY posts_update_admin ON public.forum_posts FOR UPDATE TO {public}
  USING (is_admin())
  WITH CHECK (is_admin())
;

-- forum_replies
CREATE POLICY replies_delete ON public.forum_replies FOR DELETE TO {public}
  USING (((author_id = auth.uid()) OR (author_student_id = current_student_id()) OR is_admin()))
;
CREATE POLICY replies_insert ON public.forum_replies FOR INSERT TO {public}
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)))
;
CREATE POLICY replies_read ON public.forum_replies FOR SELECT TO {public}
  USING (true)
;

-- login_events
CREATE POLICY login_insert ON public.login_events FOR INSERT TO {public}
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)))
;
CREATE POLICY login_select_admin ON public.login_events FOR SELECT TO {public}
  USING (is_admin())
;

-- mm_data
CREATE POLICY mmdata_delete_admin ON public.mm_data FOR DELETE TO {public}
  USING (is_admin())
;
CREATE POLICY mmdata_read_global ON public.mm_data FOR SELECT TO {public}
  USING (((key = 'global_settings'::text) OR is_admin()))
;
CREATE POLICY mmdata_update_admin ON public.mm_data FOR UPDATE TO {public}
  USING (is_admin())
  WITH CHECK (is_admin())
;
CREATE POLICY mmdata_write_admin ON public.mm_data FOR INSERT TO {public}
  WITH CHECK (is_admin())
;

-- payments
CREATE POLICY pay_select ON public.payments FOR SELECT TO {public}
  USING (((user_id = auth.uid()) OR is_admin()))
;
CREATE POLICY pay_write ON public.payments FOR ALL TO {public}
  USING (is_admin())
  WITH CHECK (is_admin())
;

-- plans
CREATE POLICY plans_delete ON public.plans FOR DELETE TO {public}
  USING (is_admin())
;
CREATE POLICY plans_insert ON public.plans FOR INSERT TO {public}
  WITH CHECK (is_admin())
;
CREATE POLICY plans_read ON public.plans FOR SELECT TO {public}
  USING (true)
;
CREATE POLICY plans_write ON public.plans FOR UPDATE TO {public}
  USING (is_admin())
  WITH CHECK (is_admin())
;

-- profiles
CREATE POLICY profiles_delete ON public.profiles FOR DELETE TO {public}
  USING (is_admin())
;
CREATE POLICY profiles_insert ON public.profiles FOR INSERT TO {public}
  WITH CHECK ((id = auth.uid()))
;
CREATE POLICY profiles_select ON public.profiles FOR SELECT TO {public}
  USING (((id = auth.uid()) OR is_admin()))
;
CREATE POLICY profiles_update ON public.profiles FOR UPDATE TO {public}
  USING (((id = auth.uid()) OR is_admin()))
  WITH CHECK (((id = auth.uid()) OR is_admin()))
;

-- question_reports
CREATE POLICY reports_insert ON public.question_reports FOR INSERT TO {public}
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)))
;
CREATE POLICY reports_select_admin ON public.question_reports FOR SELECT TO {public}
  USING (is_admin())
;
CREATE POLICY reports_update_admin ON public.question_reports FOR UPDATE TO {public}
  USING (is_admin())
  WITH CHECK (is_admin())
;

-- schedule_entries
CREATE POLICY entries_parent ON public.schedule_entries FOR ALL TO {public}
  USING ((owns_student_txt(student_id) OR is_admin()))
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()))
;
CREATE POLICY entries_student_read ON public.schedule_entries FOR SELECT TO {public}
  USING ((student_id = (current_student_id())::text))
;

-- student_assignments
CREATE POLICY assignments_delete ON public.student_assignments FOR DELETE TO {public}
  USING ((owns_student_txt(student_id) OR is_admin()))
;
CREATE POLICY assignments_insert ON public.student_assignments FOR INSERT TO {public}
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()))
;
CREATE POLICY assignments_select ON public.student_assignments FOR SELECT TO {public}
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
;
CREATE POLICY assignments_update ON public.student_assignments FOR UPDATE TO {public}
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
  WITH CHECK (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
;

-- student_progress
CREATE POLICY progress_rw ON public.student_progress FOR ALL TO {public}
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
  WITH CHECK (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
;

-- students
CREATE POLICY students_parent ON public.students FOR ALL TO {public}
  USING ((owns_student_txt((id)::text) OR is_admin()))
  WITH CHECK ((is_admin() OR ((family_id)::text IN ( SELECT (f.id)::text AS id
   FROM families f
  WHERE (f.parent_id = auth.uid())))))
;
CREATE POLICY students_self_read ON public.students FOR SELECT TO {public}
  USING (((id)::text = (current_student_id())::text))
;

-- study_schedules
CREATE POLICY sched_parent ON public.study_schedules FOR ALL TO {public}
  USING ((owns_student_txt(student_id) OR is_admin()))
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()))
;
CREATE POLICY sched_student_read ON public.study_schedules FOR SELECT TO {public}
  USING ((student_id = (current_student_id())::text))
;

-- subscriptions
CREATE POLICY subs_select ON public.subscriptions FOR SELECT TO {public}
  USING (((user_id = auth.uid()) OR is_admin()))
;
CREATE POLICY subs_write ON public.subscriptions FOR ALL TO {public}
  USING (is_admin())
  WITH CHECK (is_admin())
;

-- ── COLUMN-LEVEL GRANTS (students.pin / pin_hash must NOT be listed) ─────
-- avatar           anon           INSERT
-- avatar           anon           REFERENCES
-- avatar           anon           SELECT
-- avatar           anon           UPDATE
-- avatar           authenticated  INSERT
-- avatar           authenticated  UPDATE
-- avatar           authenticated  SELECT
-- avatar           authenticated  REFERENCES
-- created_at       anon           INSERT
-- created_at       anon           UPDATE
-- created_at       anon           SELECT
-- created_at       anon           REFERENCES
-- created_at       authenticated  INSERT
-- created_at       authenticated  REFERENCES
-- created_at       authenticated  SELECT
-- created_at       authenticated  UPDATE
-- display_name     anon           INSERT
-- display_name     anon           REFERENCES
-- display_name     anon           SELECT
-- display_name     anon           UPDATE
-- display_name     authenticated  INSERT
-- display_name     authenticated  REFERENCES
-- display_name     authenticated  SELECT
-- display_name     authenticated  UPDATE
-- expires_at       anon           UPDATE
-- expires_at       anon           SELECT
-- expires_at       anon           REFERENCES
-- expires_at       anon           INSERT
-- expires_at       authenticated  REFERENCES
-- expires_at       authenticated  INSERT
-- expires_at       authenticated  SELECT
-- expires_at       authenticated  UPDATE
-- family_id        anon           UPDATE
-- family_id        anon           INSERT
-- family_id        anon           REFERENCES
-- family_id        anon           SELECT
-- family_id        authenticated  INSERT
-- family_id        authenticated  UPDATE
-- family_id        authenticated  SELECT
-- family_id        authenticated  REFERENCES
-- grade            anon           REFERENCES
-- grade            anon           INSERT
-- grade            anon           UPDATE
-- grade            anon           SELECT
-- grade            authenticated  INSERT
-- grade            authenticated  UPDATE
-- grade            authenticated  SELECT
-- grade            authenticated  REFERENCES
-- id               anon           INSERT
-- id               anon           REFERENCES
-- id               anon           SELECT
-- id               anon           UPDATE
-- id               authenticated  REFERENCES
-- id               authenticated  UPDATE
-- id               authenticated  SELECT
-- id               authenticated  INSERT
-- pin              anon           INSERT
-- pin              anon           REFERENCES
-- pin              anon           UPDATE
-- pin              authenticated  REFERENCES
-- pin              authenticated  UPDATE
-- pin              authenticated  INSERT
-- pin_attempts     anon           REFERENCES
-- pin_attempts     anon           UPDATE
-- pin_attempts     anon           INSERT
-- pin_attempts     authenticated  UPDATE
-- pin_attempts     authenticated  INSERT
-- pin_attempts     authenticated  REFERENCES
-- pin_hash         anon           REFERENCES
-- pin_hash         anon           UPDATE
-- pin_hash         anon           INSERT
-- pin_hash         authenticated  REFERENCES
-- pin_hash         authenticated  UPDATE
-- pin_hash         authenticated  INSERT
-- pin_locked_until anon           REFERENCES
-- pin_locked_until anon           INSERT
-- pin_locked_until anon           UPDATE
-- pin_locked_until authenticated  REFERENCES
-- pin_locked_until authenticated  INSERT
-- pin_locked_until authenticated  UPDATE
-- session_version  anon           INSERT
-- session_version  anon           UPDATE
-- session_version  anon           SELECT
-- session_version  anon           REFERENCES
-- session_version  authenticated  INSERT
-- session_version  authenticated  REFERENCES
-- session_version  authenticated  SELECT
-- session_version  authenticated  UPDATE
-- settings         anon           UPDATE
-- settings         anon           INSERT
-- settings         anon           REFERENCES
-- settings         anon           SELECT
-- settings         authenticated  UPDATE
-- settings         authenticated  INSERT
-- settings         authenticated  REFERENCES
-- settings         authenticated  SELECT
-- username         anon           UPDATE
-- username         anon           INSERT
-- username         anon           REFERENCES
-- username         anon           SELECT
-- username         authenticated  UPDATE
-- username         authenticated  INSERT
-- username         authenticated  SELECT
-- username         authenticated  REFERENCES

-- ── FUNCTIONS (verbatim source) ───────────────────────────────────────────

CREATE OR REPLACE FUNCTION public._forum_dec_reply_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE forum_posts SET reply_count = GREATEST(0, COALESCE(reply_count, 0) - 1) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public._forum_inc_reply_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE forum_posts SET reply_count = COALESCE(reply_count, 0) + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.admin_pending_counts()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_teachers int; v_reports int;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  SELECT count(*) INTO v_teachers FROM public.profiles WHERE teacher_status = 'pending';
  SELECT count(*) INTO v_reports  FROM public.question_reports WHERE status = 'open';
  RETURN jsonb_build_object('ok', true,
    'teacher_requests', v_teachers,
    'open_reports',     v_reports,
    'total',            v_teachers + v_reports);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.admin_set_teacher_status(p_user_id uuid, p_status text, p_tier text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_target public.profiles%ROWTYPE;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  IF p_status NOT IN ('pending','approved','rejected','suspended','none') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_status');
  END IF;
  IF p_tier IS NOT NULL AND p_tier NOT IN ('unverified','verified') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_tier');
  END IF;

  SELECT * INTO v_target FROM public.profiles WHERE id = p_user_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_target.role = 'admin' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'cannot_modify_admin');
  END IF;

  UPDATE public.profiles
     SET teacher_status = p_status,
         teacher_tier   = coalesce(p_tier, teacher_tier, 'unverified'),
         role = CASE
                  WHEN p_status = 'approved' THEN 'teacher'
                  -- Losing teacher access returns them to a plain parent account
                  -- rather than leaving a role that no longer means anything.
                  WHEN p_status IN ('rejected','suspended','none') AND role = 'teacher' THEN 'parent'
                  ELSE role
                END,
         teacher_decided_at = now(),
         teacher_decided_by = auth.uid()
   WHERE id = p_user_id;

  RETURN jsonb_build_object('ok', true, 'status', p_status);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.admin_teacher_requests()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_rows jsonb;
BEGIN
  IF NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id', p.id, 'full_name', p.full_name, 'role', p.role,
           'status', p.teacher_status, 'tier', coalesce(p.teacher_tier,'unverified'),
           'note', p.teacher_note, 'requested_at', p.teacher_requested_at,
           'decided_at', p.teacher_decided_at)
         ORDER BY (p.teacher_status = 'pending') DESC, p.teacher_requested_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows
    FROM public.profiles p
   WHERE p.teacher_status <> 'none' OR p.role = 'teacher';
  RETURN jsonb_build_object('ok', true, 'requests', v_rows);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_student_with_pin(p_family_id uuid, p_username text, p_display_name text, p_avatar text DEFAULT NULL::text, p_grade integer DEFAULT 5, p_pin text DEFAULT NULL::text, p_settings jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_id  uuid;
  v_row jsonb;
BEGIN
  -- Only the owning parent (or an admin) may add a child to a family.
  -- SECURITY DEFINER bypasses RLS, so this check is the access control.
  IF NOT (
    EXISTS (SELECT 1 FROM public.families f
             WHERE f.id = p_family_id AND f.parent_id = auth.uid())
    OR public.is_admin()
  ) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  IF p_username IS NULL OR btrim(p_username) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_username');
  END IF;

  BEGIN
    INSERT INTO public.students
      (family_id, username, display_name, avatar, grade, pin, settings)
    VALUES (
      p_family_id,
      lower(btrim(p_username)),
      btrim(coalesce(p_display_name, p_username)),
      coalesce(nullif(btrim(coalesce(p_avatar, '')), ''), 'ð§'),
      coalesce(p_grade, 5),
      crypt(p_pin, gen_salt('bf')),          -- â hashed DURING insert
      coalesce(p_settings, '{"lockedChapters":[],"maxDifficulty":4,"examDisabled":false}'::jsonb)
    )
    RETURNING id INTO v_id;
  EXCEPTION
    WHEN unique_violation THEN
      RETURN jsonb_build_object('ok', false, 'error', 'username_taken');
  END;

  -- Return the row WITHOUT pin/pin_hash.
  SELECT jsonb_build_object(
           'id', id, 'family_id', family_id, 'username', username,
           'display_name', display_name, 'avatar', avatar, 'grade', grade,
           'settings', settings, 'session_version', session_version,
           'expires_at', expires_at, 'created_at', created_at)
    INTO v_row
    FROM public.students WHERE id = v_id;

  RETURN jsonb_build_object('ok', true, 'student', v_row);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.current_student_id()
 RETURNS uuid
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_raw text;
  v_tok text;
  v_id  uuid;
BEGIN
  BEGIN
    v_raw := current_setting('request.headers', true);   -- NULL outside PostgREST
  EXCEPTION WHEN others THEN
    RETURN NULL;
  END;

  IF v_raw IS NULL OR v_raw = '' THEN RETURN NULL; END IF;

  BEGIN
    v_tok := (v_raw::json ->> 'x-student-token');
  EXCEPTION WHEN others THEN
    RETURN NULL;
  END;

  IF v_tok IS NULL OR length(v_tok) < 32 THEN RETURN NULL; END IF;

  SELECT s.student_id INTO v_id
  FROM public.student_sessions s
  WHERE s.token_hash = encode(digest(v_tok, 'sha256'), 'hex')
    AND s.expires_at > now()
  LIMIT 1;

  RETURN v_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.end_student_session()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_id uuid := public.current_student_id();
BEGIN
  IF v_id IS NOT NULL THEN
    DELETE FROM public.student_sessions WHERE student_id = v_id;
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gen_guest_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  alphabet CONSTANT text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  out text; i int;
BEGIN
  LOOP
    out := '';
    FOR i IN 1..6 LOOP
      out := out || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.guest_assignments a WHERE a.code = out);
  END LOOP;
  RETURN out;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gen_invite_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  alphabet CONSTANT text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  out text;
  i   int;
BEGIN
  LOOP
    out := '';
    FOR i IN 1..8 LOOP
      out := out || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.classrooms c WHERE c.invite_code = out);
  END LOOP;
  RETURN out;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.guest_assignment_create(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_pin text, p_classroom_label text DEFAULT NULL::text, p_duration_mins integer DEFAULT NULL::integer, p_due_at timestamp with time zone DEFAULT NULL::timestamp with time zone, p_expires_hours integer DEFAULT 48)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_uid     uuid := auth.uid();
  v_role    text; v_tier text; v_status text; v_name text;
  v_today   int;  v_max_day int; v_max_stu int;
  v_code    text; v_id uuid;     v_count int;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT role, coalesce(teacher_tier,'unverified'), teacher_status, full_name
    INTO v_role, v_tier, v_status, v_name
    FROM public.profiles WHERE id = v_uid;

  -- Approval gate. 'pending' and 'suspended' get their own codes so the UI can
  -- say something useful instead of a generic refusal.
  IF v_role = 'admin' THEN
    NULL;
  ELSIF v_role <> 'teacher' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_a_teacher', 'status', coalesce(v_status,'none'));
  ELSIF v_status = 'pending' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'pending_approval');
  ELSIF v_status <> 'approved' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_approved', 'status', coalesce(v_status,'none'));
  END IF;

  IF v_tier = 'verified' OR v_role = 'admin'
    THEN v_max_day := 3;  v_max_stu := 40;
    ELSE v_max_day := 1;  v_max_stu := 15;
  END IF;

  SELECT count(*) INTO v_today FROM public.guest_assignments
   WHERE teacher_id = v_uid AND created_at >= date_trunc('day', now());
  IF v_today >= v_max_day THEN
    RETURN jsonb_build_object('ok', false, 'error', 'daily_limit', 'limit', v_max_day, 'tier', v_tier);
  END IF;

  IF p_pin IS NULL OR p_pin !~ '^\d{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  v_count := coalesce(jsonb_array_length(p_question_ids), 0);
  IF v_count = 0 THEN RETURN jsonb_build_object('ok', false, 'error', 'no_questions'); END IF;

  v_code := public.gen_guest_code();

  INSERT INTO public.guest_assignments (
    code, teacher_id, teacher_label, classroom_label, title, subject_pack_id,
    chapter_ids, question_ids, question_count, duration_mins, pin_hash,
    due_at, expires_at, max_students
  ) VALUES (
    v_code, v_uid, v_name, p_classroom_label, btrim(p_title), p_subject_pack_id,
    coalesce(p_chapter_ids, '[]'::jsonb), p_question_ids, v_count,
    p_duration_mins, crypt(p_pin, gen_salt('bf')),
    p_due_at, now() + (coalesce(p_expires_hours, 48) || ' hours')::interval, v_max_stu
  ) RETURNING id INTO v_id;

  RETURN jsonb_build_object('ok', true, 'id', v_id, 'code', v_code,
    'max_students', v_max_stu, 'assignments_left_today', v_max_day - v_today - 1);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.guest_cleanup()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_expired int; v_deleted int; v_attempts int;
BEGIN
  UPDATE public.guest_assignments SET status = 'expired'
   WHERE status = 'active' AND expires_at < now();
  GET DIAGNOSTICS v_expired = ROW_COUNT;

  -- Submissions older than 90 days (children's data - do not keep it forever).
  DELETE FROM public.guest_submissions WHERE submitted_at < now() - interval '90 days';
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  DELETE FROM public.guest_pin_attempts
   WHERE updated_at < now() - interval '7 days'
     AND (locked_until IS NULL OR locked_until < now());
  GET DIAGNOSTICS v_attempts = ROW_COUNT;

  RETURN jsonb_build_object('ok', true, 'expired', v_expired,
    'submissions_deleted', v_deleted, 'attempt_rows_deleted', v_attempts);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.guest_grant_retry(p_assignment_id uuid, p_name_key text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_a public.guest_assignments%ROWTYPE;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE id = p_assignment_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.teacher_id <> auth.uid() AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;
  UPDATE public.guest_submissions SET retry_allowed = true
   WHERE assignment_id = p_assignment_id AND name_key = lower(btrim(p_name_key));
  RETURN jsonb_build_object('ok', FOUND);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.guest_my_assignments()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_rows jsonb;
BEGIN
  IF auth.uid() IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'id', a.id, 'code', a.code, 'title', a.title, 'classroom', a.classroom_label,
           'subject_pack_id', a.subject_pack_id, 'question_count', a.question_count,
           'duration_mins', a.duration_mins, 'due_at', a.due_at, 'expires_at', a.expires_at,
           'status', a.status, 'max_students', a.max_students, 'created_at', a.created_at,
           'submissions', (SELECT count(*) FROM public.guest_submissions s
                            WHERE s.assignment_id = a.id AND s.submitted_at IS NOT NULL))
         ORDER BY a.created_at DESC), '[]'::jsonb)
    INTO v_rows FROM public.guest_assignments a WHERE a.teacher_id = auth.uid();
  RETURN jsonb_build_object('ok', true, 'assignments', v_rows);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.guest_open(p_code text, p_name text, p_pin text, p_ip text DEFAULT NULL::text, p_ua text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a          public.guest_assignments%ROWTYPE;
  v_key        text;
  v_att        public.guest_pin_attempts%ROWTYPE;
  v_max_tries  CONSTANT int := 5;
  v_lock_mins  CONSTANT int := 10;
  v_taken      int;
  v_sub        public.guest_submissions%ROWTYPE;
BEGIN
  IF p_name IS NULL OR btrim(p_name) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_required');
  END IF;
  v_key := lower(btrim(p_name));

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  -- Lockout check comes BEFORE the PIN check so a locked child cannot keep guessing.
  SELECT * INTO v_att FROM public.guest_pin_attempts
   WHERE assignment_id = v_a.id AND name_key = v_key;

  IF FOUND AND v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked',
      'secsLeft', extract(epoch FROM (v_att.locked_until - now()))::int);
  END IF;

  IF v_a.status <> 'active' OR v_a.expires_at < now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'expired');
  END IF;

  -- Wrong PIN â count it, maybe lock.
  IF v_a.pin_hash IS NULL OR crypt(p_pin, v_a.pin_hash) <> v_a.pin_hash THEN
    INSERT INTO public.guest_pin_attempts (assignment_id, name_key, attempts, updated_at)
    VALUES (v_a.id, v_key, 1, now())
    ON CONFLICT (assignment_id, name_key) DO UPDATE
      SET attempts     = public.guest_pin_attempts.attempts + 1,
          locked_until = CASE WHEN public.guest_pin_attempts.attempts + 1 >= v_max_tries
                              THEN now() + (v_lock_mins || ' minutes')::interval END,
          updated_at   = now()
    RETURNING * INTO v_att;

    IF v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
      RETURN jsonb_build_object('ok', false, 'error', 'locked', 'secsLeft', v_lock_mins * 60);
    END IF;
    RETURN jsonb_build_object('ok', false, 'error', 'bad_pin',
      'attemptsLeft', greatest(0, v_max_tries - v_att.attempts));
  END IF;

  -- Correct PIN â clear the counter.
  DELETE FROM public.guest_pin_attempts WHERE assignment_id = v_a.id AND name_key = v_key;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;

  -- Already submitted, and no retry granted â tell the client, which offers to
  -- add a surname initial in case this is a DIFFERENT child with the same name.
  IF FOUND AND v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_taken',
      'name', v_sub.name_display, 'pct', v_sub.pct);
  END IF;

  IF NOT FOUND THEN
    SELECT count(*) INTO v_taken FROM public.guest_submissions WHERE assignment_id = v_a.id;
    IF v_taken >= v_a.max_students THEN
      RETURN jsonb_build_object('ok', false, 'error', 'full', 'max', v_a.max_students);
    END IF;
    INSERT INTO public.guest_submissions (assignment_id, name_display, name_key, ip, user_agent)
    VALUES (v_a.id, btrim(p_name), v_key, p_ip, p_ua);
  END IF;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object(
      'id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'teacher', v_a.teacher_label, 'classroom', v_a.classroom_label,
      'subject_pack_id', v_a.subject_pack_id, 'question_ids', v_a.question_ids,
      'question_count', v_a.question_count, 'duration_mins', v_a.duration_mins,
      'due_at', v_a.due_at, 'expires_at', v_a.expires_at),
    'name', btrim(p_name),
    'is_retry', coalesce(v_sub.retry_allowed, false));
END;
$function$
;

CREATE OR REPLACE FUNCTION public.guest_results(p_assignment_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_a public.guest_assignments%ROWTYPE; v_rows jsonb;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE id = p_assignment_id;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;
  IF v_a.teacher_id <> auth.uid() AND NOT public.is_admin() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'name', s.name_display, 'name_key', s.name_key,
           'score', s.score, 'total', s.total, 'pct', s.pct,
           'attempt', s.attempt, 'retry_allowed', s.retry_allowed,
           'answers', s.answers, 'submitted_at', s.submitted_at)
         ORDER BY s.submitted_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows
    FROM public.guest_submissions s WHERE s.assignment_id = v_a.id;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object('id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'question_ids', v_a.question_ids, 'question_count', v_a.question_count,
      'classroom', v_a.classroom_label, 'due_at', v_a.due_at,
      'expires_at', v_a.expires_at, 'status', v_a.status, 'max_students', v_a.max_students),
    'submissions', v_rows);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.guest_submit(p_code text, p_name text, p_answers jsonb, p_score integer, p_total integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a   public.guest_assignments%ROWTYPE;
  v_key text := lower(btrim(p_name));
  v_sub public.guest_submissions%ROWTYPE;
  v_pct int := CASE WHEN coalesce(p_total,0) > 0 THEN round(p_score::numeric / p_total * 100) ELSE 0 END;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  IF v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_submitted', 'pct', v_sub.pct);
  END IF;

  UPDATE public.guest_submissions
     SET answers = coalesce(p_answers, '[]'::jsonb),
         score = p_score, total = p_total, pct = v_pct,
         attempt = CASE WHEN v_sub.submitted_at IS NOT NULL THEN v_sub.attempt + 1 ELSE v_sub.attempt END,
         retry_allowed = false,
         submitted_at = now()
   WHERE id = v_sub.id;

  RETURN jsonb_build_object('ok', true, 'score', p_score, 'total', p_total, 'pct', v_pct,
    'title', v_a.title, 'teacher', v_a.teacher_label);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce((SELECT p.role = 'admin' FROM public.profiles p WHERE p.id = auth.uid()), false);
$function$
;

CREATE OR REPLACE FUNCTION public.is_approved_teacher()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce((
    SELECT (p.role = 'admin')
        OR (p.role = 'teacher' AND p.teacher_status = 'approved')
    FROM public.profiles p WHERE p.id = auth.uid()
  ), false);
$function$
;

CREATE OR REPLACE FUNCTION public.is_super_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce((SELECT p.is_super_admin FROM public.profiles p WHERE p.id = auth.uid()), false);
$function$
;

CREATE OR REPLACE FUNCTION public.is_teacher()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT coalesce((SELECT p.role = 'teacher' FROM public.profiles p WHERE p.id = auth.uid()), false);
$function$
;

CREATE OR REPLACE FUNCTION public.join_classroom(p_invite_code text, p_student_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_class public.classrooms%ROWTYPE;
BEGIN
  IF NOT (p_student_id = public.current_student_id()
          OR public.owns_student(p_student_id)
          OR public.is_admin()) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  SELECT * INTO v_class FROM public.classrooms
  WHERE upper(invite_code) = upper(trim(p_invite_code)) AND is_active LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_code');
  END IF;

  INSERT INTO public.enrollments (student_id, classroom_id)
  VALUES (p_student_id, v_class.id)
  ON CONFLICT (student_id, classroom_id)
  DO UPDATE SET is_active = true;

  RETURN jsonb_build_object(
    'ok', true,
    'classroom', jsonb_build_object(
      'id', v_class.id, 'name', v_class.name, 'subject', v_class.subject,
      'grade_level', v_class.grade_level, 'schedule', v_class.schedule)
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.mint_student_session(p_username text, p_pin text)
 RETURNS jsonb
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT public.verify_student_pin(p_username, p_pin);
$function$
;

CREATE OR REPLACE FUNCTION public.my_teacher_status()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_p public.profiles%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated'); END IF;
  SELECT * INTO v_p FROM public.profiles WHERE id = auth.uid();
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_profile'); END IF;
  RETURN jsonb_build_object('ok', true,
    'role', v_p.role, 'status', v_p.teacher_status,
    'tier', coalesce(v_p.teacher_tier, 'unverified'),
    'requested_at', v_p.teacher_requested_at,
    'is_teacher', (v_p.role = 'admin') OR (v_p.role = 'teacher' AND v_p.teacher_status = 'approved'));
END;
$function$
;

CREATE OR REPLACE FUNCTION public.owns_classroom(p_classroom uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.classrooms c
    WHERE c.id = p_classroom AND c.teacher_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.owns_student(p_student uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.students s
    JOIN public.families f ON f.id = s.family_id
    WHERE s.id = p_student
      AND f.parent_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.owns_student_txt(p_student text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT CASE
           WHEN p_student ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
           THEN public.owns_student(p_student::uuid)
           ELSE false
         END;
$function$
;

CREATE OR REPLACE FUNCTION public.parent_of_classroom_member(p_classroom uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.enrollments e
    JOIN public.students s ON s.id = e.student_id
    JOIN public.families f ON f.id = s.family_id
    WHERE e.classroom_id = p_classroom AND f.parent_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.request_teacher_access(p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE v_uid uuid := auth.uid(); v_cur text; v_role text;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  SELECT teacher_status, role INTO v_cur, v_role FROM public.profiles WHERE id = v_uid;
  IF v_cur IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_profile');
  END IF;

  IF v_role = 'admin' OR (v_role = 'teacher' AND v_cur = 'approved') THEN
    RETURN jsonb_build_object('ok', true, 'status', 'approved', 'note', 'already_a_teacher');
  END IF;
  IF v_cur = 'pending'   THEN RETURN jsonb_build_object('ok', true, 'status', 'pending'); END IF;
  -- A rejection is not permanent, but it must be re-reviewed, so re-applying is
  -- allowed and simply puts them back in the queue.
  IF v_cur = 'suspended' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'suspended');
  END IF;

  UPDATE public.profiles
     SET teacher_status = 'pending',
         teacher_note   = left(btrim(coalesce(p_note, '')), 500),
         teacher_requested_at = now(),
         teacher_decided_at = NULL,
         teacher_decided_by = NULL
   WHERE id = v_uid;

  RETURN jsonb_build_object('ok', true, 'status', 'pending');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_student_pin(p_student_id uuid, p_pin text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_found uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unauthorized');
  END IF;

  IF p_pin !~ '^[0-9]{4}$' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_pin');
  END IF;

  SELECT s.id INTO v_found
  FROM families f
  JOIN students s ON s.family_id = f.id
  WHERE f.parent_id = auth.uid() AND s.id = p_student_id
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'forbidden');
  END IF;

  UPDATE students
  SET pin_hash = crypt(p_pin, gen_salt('bf', 8)),
      pin = NULL, pin_attempts = 0, pin_locked_until = NULL
  WHERE id = p_student_id;

  RETURN jsonb_build_object('ok', true);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.verify_student_pin(p_username text, p_pin text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_result jsonb;
  v_id     uuid;
  v_token  text;
  v_ttl    CONSTANT interval := interval '30 days';
BEGIN
  -- Delegate the entire credential check. Lockout, account expiry, attempt
  -- counting and the non-enumerating error message all behave exactly as
  -- before, because this is literally the same code under a new name.
  v_result := public.verify_student_pin_core(p_username, p_pin);

  IF NOT coalesce((v_result ->> 'ok')::boolean, false) THEN
    RETURN v_result;                      -- failure: return verbatim, mint nothing
  END IF;

  v_id := (v_result -> 'student' ->> 'id')::uuid;
  IF v_id IS NULL THEN
    RETURN v_result;                      -- degrade gracefully rather than break login
  END IF;

  -- Anti-sharing: a fresh login invalidates every other device immediately.
  DELETE FROM public.student_sessions WHERE student_id = v_id;
  DELETE FROM public.student_sessions WHERE expires_at < now();   -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_id, now() + v_ttl);

  RETURN v_result || jsonb_build_object('session_token', v_token);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.verify_student_pin_core(p_username text, p_pin text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_student      public.students%ROWTYPE;
  v_max_tries    CONSTANT int := 5;
  v_lockout_secs CONSTANT int := 300;
  v_ttl          CONSTANT interval := interval '30 days';
  v_attempts     int;
  v_locked_until timestamptz;
  v_settings     jsonb;
  v_now          timestamptz := now();
  v_ok           boolean;
  v_token        text;
BEGIN
  SELECT * INTO v_student FROM public.students
  WHERE lower(username) = lower(p_username) LIMIT 1;

  -- Same generic error whether or not the user exists: no enumeration.
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials');
  END IF;

  IF v_student.expires_at IS NOT NULL AND v_student.expires_at < v_now THEN
    RETURN jsonb_build_object('ok', false, 'error', 'account_expired');
  END IF;

  v_settings     := coalesce(v_student.settings, '{}'::jsonb);
  v_attempts     := coalesce((v_settings ->> 'pin_attempts')::int, 0);
  v_locked_until := (v_settings ->> 'pin_locked_until')::timestamptz;

  IF v_locked_until IS NOT NULL AND v_locked_until > v_now THEN
    RETURN jsonb_build_object('ok', false, 'locked', true,
      'secsLeft', extract(epoch FROM (v_locked_until - v_now))::int);
  END IF;

  -- bcrypt, with a plaintext fallback for un-migrated dev rows
  IF v_student.pin IS NULL THEN
    v_ok := false;
  ELSIF v_student.pin = p_pin THEN
    v_ok := true;
  ELSE
    v_ok := (crypt(p_pin, v_student.pin) = v_student.pin);
  END IF;

  -- ââ wrong PIN ââ
  IF NOT v_ok THEN
    v_attempts := v_attempts + 1;
    IF v_attempts >= v_max_tries THEN
      UPDATE public.students
         SET settings = settings || jsonb_build_object(
               'pin_attempts', v_attempts,
               'pin_locked_until', v_now + (v_lockout_secs || ' seconds')::interval)
       WHERE id = v_student.id;
      RETURN jsonb_build_object('ok', false, 'locked', true,
        'secsLeft', v_lockout_secs, 'attemptsLeft', 0);
    END IF;
    UPDATE public.students
       SET settings = settings || jsonb_build_object('pin_attempts', v_attempts)
     WHERE id = v_student.id;
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_credentials',
      'attemptsLeft', v_max_tries - v_attempts);
  END IF;

  -- ââ correct PIN ââ
  UPDATE public.students
     SET settings = settings - 'pin_attempts' - 'pin_locked_until'
   WHERE id = v_student.id;

  -- Anti-sharing: a fresh login invalidates every other device instantly
  -- (previously this relied on a 5-minute session_version poll).
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;  -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);

  RETURN jsonb_build_object(
    'ok', true,
    'session_token', v_token,            -- â NEW: client must send as x-student-token
    'student', jsonb_build_object(
      'id', v_student.id, 'family_id', v_student.family_id,
      'username', v_student.username, 'display_name', v_student.display_name,
      'avatar', v_student.avatar, 'grade', v_student.grade,
      'settings', v_student.settings - 'pin_attempts' - 'pin_locked_until',
      'session_version', v_student.session_version, 'expires_at', v_student.expires_at
    )
  );
END;
$function$
;
