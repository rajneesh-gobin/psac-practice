-- ═══════════════════════════════════════════════════════════════════════════
--  PSAC Exam Practice — FULL SCHEMA REFERENCE
--
--  GENERATED FROM THE LIVE DATABASE on 2026-08-26 (project xawvjwsiqhtxgpocdqgm,
--  PostgreSQL 17.6). This is a dump, not a hand-written migration: it records
--  what the database actually contains, which is not always what the migration
--  files claimed. It replaced 24 incremental supabase-*.sql files, all of which
--  had been applied by then.
--
--  WHAT IT IS FOR
--    • rebuilding the schema in a fresh project (run top to bottom)
--    • answering "what is really deployed?" without guessing from migrations
--
--  WHAT IT IS NOT
--    • the file to run against the live database — that is supabase-migration.sql
--    • a data dump. No rows are included.
--
--  ⚠ public.students has COLUMN-LEVEL SELECT grants, not a table-wide one, so
--    that `pin`, `pin_hash`, `pin_attempts` and `pin_locked_until` stay
--    unreadable. ANY COLUMN ADDED TO students LATER INHERITS NO GRANT and is as
--    unreadable as the PIN — every query that touches it then fails with 42501
--    and the app silently shows nothing. Add a GRANT SELECT (col) beside every
--    ALTER TABLE students ADD COLUMN.
--
--  Sections: 1 tables · 2 constraints · 3 indexes · 4 RLS policies ·
--            5 functions · 6 grants
-- ═══════════════════════════════════════════════════════════════════════════


-- ═══ 1 · TABLES ════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  assignment_id uuid,
  classroom_id uuid,
  student_id uuid NOT NULL,
  attempt integer DEFAULT 1 NOT NULL,
  score integer DEFAULT 0 NOT NULL,
  total integer DEFAULT 0 NOT NULL,
  pct integer DEFAULT 0 NOT NULL,
  answers jsonb DEFAULT '[]'::jsonb NOT NULL,
  retry_allowed boolean DEFAULT false NOT NULL,
  submitted_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.classrooms (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  teacher_id uuid NOT NULL,
  name text NOT NULL,
  subject text,
  grade_level integer,
  schedule text,
  invite_code text DEFAULT gen_invite_code() NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.enrollments (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id uuid NOT NULL,
  classroom_id uuid NOT NULL,
  joined_at timestamp with time zone DEFAULT now() NOT NULL,
  is_active boolean DEFAULT true NOT NULL
);

CREATE TABLE IF NOT EXISTS public.families (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  parent_id uuid NOT NULL,
  family_name text DEFAULT 'My Family'::text NOT NULL,
  family_code character(6) DEFAULT upper(substr(md5((random())::text), 1, 6)) NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.forum_posts (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  author_name text DEFAULT 'Anonymous'::text NOT NULL,
  author_type text DEFAULT 'parent'::text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  reply_count integer DEFAULT 0,
  status text DEFAULT 'open'::text NOT NULL,
  author_id uuid DEFAULT auth.uid(),
  author_student_id uuid DEFAULT current_student_id()
);

CREATE TABLE IF NOT EXISTS public.forum_replies (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  post_id uuid NOT NULL,
  body text NOT NULL,
  author_name text DEFAULT 'Anonymous'::text NOT NULL,
  author_type text DEFAULT 'parent'::text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  author_id uuid DEFAULT auth.uid(),
  author_student_id uuid DEFAULT current_student_id()
);

CREATE TABLE IF NOT EXISTS public.guest_assignment_attempts (
  assignment_id uuid NOT NULL,
  fails integer DEFAULT 0 NOT NULL,
  window_start timestamp with time zone DEFAULT now() NOT NULL,
  locked_until timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.guest_assignments (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  code text NOT NULL,
  teacher_id uuid NOT NULL,
  teacher_label text,
  classroom_label text,
  title text NOT NULL,
  subject_pack_id text NOT NULL,
  chapter_ids jsonb DEFAULT '[]'::jsonb NOT NULL,
  question_ids jsonb DEFAULT '[]'::jsonb NOT NULL,
  question_count integer DEFAULT 10 NOT NULL,
  duration_mins integer,
  pin_hash text NOT NULL,
  due_at timestamp with time zone,
  expires_at timestamp with time zone DEFAULT (now() + '48:00:00'::interval) NOT NULL,
  max_students integer DEFAULT 15 NOT NULL,
  status text DEFAULT 'active'::text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.guest_pin_attempts (
  assignment_id uuid NOT NULL,
  name_key text NOT NULL,
  attempts integer DEFAULT 0 NOT NULL,
  locked_until timestamp with time zone,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.guest_submissions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  assignment_id uuid NOT NULL,
  name_display text NOT NULL,
  name_key text NOT NULL,
  answers jsonb DEFAULT '[]'::jsonb NOT NULL,
  score integer DEFAULT 0 NOT NULL,
  total integer DEFAULT 0 NOT NULL,
  pct integer DEFAULT 0 NOT NULL,
  attempt integer DEFAULT 1 NOT NULL,
  retry_allowed boolean DEFAULT false NOT NULL,
  started_at timestamp with time zone DEFAULT now() NOT NULL,
  submitted_at timestamp with time zone,
  ip text,
  user_agent text,
  elapsed_secs integer,
  over_time boolean DEFAULT false NOT NULL,
  open_token_hash text
);

CREATE TABLE IF NOT EXISTS public.login_events (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id text NOT NULL,
  user_type text DEFAULT 'student'::text NOT NULL,
  ip_address text,
  user_agent text,
  fingerprint text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.mm_data (
  key text NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.payments (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  plan_id text NOT NULL,
  amount_mur integer DEFAULT 0 NOT NULL,
  provider text DEFAULT 'manual'::text NOT NULL,
  provider_ref text,
  status text DEFAULT 'pending'::text NOT NULL,
  notes text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  processed_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.plans (
  id text NOT NULL,
  name text NOT NULL,
  price_mur integer DEFAULT 0 NOT NULL,
  max_children integer DEFAULT 1 NOT NULL,
  features jsonb DEFAULT '{}'::jsonb NOT NULL,
  is_active boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  role text NOT NULL,
  full_name text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  disabled boolean DEFAULT false,
  expires_at timestamp with time zone,
  is_super_admin boolean DEFAULT false NOT NULL,
  teacher_tier text DEFAULT 'unverified'::text NOT NULL,
  teacher_status text DEFAULT 'none'::text NOT NULL,
  teacher_note text,
  teacher_requested_at timestamp with time zone,
  teacher_decided_at timestamp with time zone,
  teacher_decided_by uuid,
  referral_code text DEFAULT upper(substr(md5((gen_random_uuid())::text), 1, 8)) NOT NULL,
  preferences jsonb DEFAULT '{}'::jsonb NOT NULL,
  deleted_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id uuid NOT NULL,
  subscription jsonb NOT NULL,
  reminder_time text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.question_reports (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  question_id text,
  question_text text,
  message text,
  student_id uuid,
  status text DEFAULT 'open'::text
);

CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  referrer_id uuid NOT NULL,
  referred_id uuid NOT NULL,
  status text DEFAULT 'joined'::text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.schedule_entries (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  schedule_id uuid NOT NULL,
  student_id text NOT NULL,
  date date NOT NULL,
  chapter_id text,
  topic_label text NOT NULL,
  duration_mins integer,
  entry_type text DEFAULT 'study'::text,
  notes text,
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  subject_id text
);

CREATE TABLE IF NOT EXISTS public.student_assignments (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id text NOT NULL,
  parent_id uuid,
  subject_id text,
  chapter_id text,
  difficulty integer,
  note text,
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  show_answers boolean DEFAULT true NOT NULL,
  source_type text DEFAULT 'parent'::text,
  classroom_id uuid,
  due_date date,
  show_hints boolean DEFAULT true NOT NULL
);

CREATE TABLE IF NOT EXISTS public.student_progress (
  student_id text NOT NULL,
  data jsonb DEFAULT '{}'::jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.student_sessions (
  token_hash text NOT NULL,
  student_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  user_agent text
);

CREATE TABLE IF NOT EXISTS public.students (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  family_id uuid NOT NULL,
  username text NOT NULL,
  display_name text NOT NULL,
  avatar text DEFAULT '??'::text NOT NULL,
  grade integer DEFAULT 5 NOT NULL,
  pin text NOT NULL,
  settings jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  session_version integer DEFAULT 0 NOT NULL,
  expires_at timestamp with time zone,
  pin_hash text,
  pin_attempts integer DEFAULT 0 NOT NULL,
  pin_locked_until timestamp with time zone,
  deleted_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.study_schedules (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  student_id text NOT NULL,
  parent_id uuid,
  settings jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  user_id uuid NOT NULL,
  plan_id text NOT NULL,
  status text DEFAULT 'active'::text NOT NULL,
  started_at timestamp with time zone DEFAULT now() NOT NULL,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- ═══ 2 · CONSTRAINTS ═══════════════════════════════════════════════════════
-- Wrapped so the file can be replayed against a database that already has them.
DO $c$ BEGIN ALTER TABLE public.assignment_submissions ADD CONSTRAINT assignment_submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES student_assignments(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.assignment_submissions ADD CONSTRAINT assignment_submissions_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.assignment_submissions ADD CONSTRAINT assignment_submissions_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.assignment_submissions ADD CONSTRAINT assignment_submissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.classrooms ADD CONSTRAINT classrooms_grade_level_check CHECK ((grade_level = ANY (ARRAY[4, 5, 6]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.classrooms ADD CONSTRAINT classrooms_invite_code_key UNIQUE (invite_code); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.classrooms ADD CONSTRAINT classrooms_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.classrooms ADD CONSTRAINT classrooms_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_student_id_classroom_id_key UNIQUE (student_id, classroom_id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.families ADD CONSTRAINT families_family_code_key UNIQUE (family_code); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.families ADD CONSTRAINT families_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES profiles(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.families ADD CONSTRAINT families_parent_id_key UNIQUE (parent_id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.families ADD CONSTRAINT families_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.forum_posts ADD CONSTRAINT forum_posts_category_check CHECK ((category = ANY (ARRAY['general'::text, 'maths'::text, 'english'::text, 'science'::text, 'french'::text, 'history'::text, 'tips'::text, 'suggest'::text, 'report'::text, 'announce'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.forum_posts ADD CONSTRAINT forum_posts_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.forum_posts ADD CONSTRAINT forum_posts_status_check CHECK ((status = ANY (ARRAY['open'::text, 'closed'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.forum_replies ADD CONSTRAINT forum_replies_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.forum_replies ADD CONSTRAINT forum_replies_post_id_fkey FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_assignment_attempts ADD CONSTRAINT guest_assignment_attempts_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_assignment_attempts ADD CONSTRAINT guest_assignment_attempts_pkey PRIMARY KEY (assignment_id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_assignments ADD CONSTRAINT guest_assignments_code_key UNIQUE (code); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_assignments ADD CONSTRAINT guest_assignments_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_assignments ADD CONSTRAINT guest_assignments_status_chk CHECK ((status = ANY (ARRAY['active'::text, 'closed'::text, 'expired'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_assignments ADD CONSTRAINT guest_assignments_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES profiles(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_pin_attempts ADD CONSTRAINT guest_pin_attempts_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_pin_attempts ADD CONSTRAINT guest_pin_attempts_pkey PRIMARY KEY (assignment_id, name_key); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_submissions ADD CONSTRAINT guest_submissions_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES guest_assignments(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_submissions ADD CONSTRAINT guest_submissions_assignment_id_name_key_key UNIQUE (assignment_id, name_key); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.guest_submissions ADD CONSTRAINT guest_submissions_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.login_events ADD CONSTRAINT login_events_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.mm_data ADD CONSTRAINT mm_data_pkey PRIMARY KEY (key); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.payments ADD CONSTRAINT payments_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.payments ADD CONSTRAINT payments_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES plans(id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.payments ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.plans ADD CONSTRAINT plans_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.profiles ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.profiles ADD CONSTRAINT profiles_referral_code_key UNIQUE (referral_code); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK ((role = ANY (ARRAY['parent'::text, 'teacher'::text, 'admin'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.profiles ADD CONSTRAINT profiles_teacher_decided_by_fkey FOREIGN KEY (teacher_decided_by) REFERENCES profiles(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.profiles ADD CONSTRAINT profiles_teacher_status_chk CHECK ((teacher_status = ANY (ARRAY['none'::text, 'pending'::text, 'approved'::text, 'rejected'::text, 'suspended'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.profiles ADD CONSTRAINT profiles_teacher_tier_chk CHECK ((teacher_tier = ANY (ARRAY['unverified'::text, 'verified'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.push_subscriptions ADD CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.push_subscriptions ADD CONSTRAINT push_subscriptions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.push_subscriptions ADD CONSTRAINT push_subscriptions_student_id_key UNIQUE (student_id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.question_reports ADD CONSTRAINT question_reports_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.question_reports ADD CONSTRAINT question_reports_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.referrals ADD CONSTRAINT referrals_no_self_chk CHECK ((referrer_id <> referred_id)); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.referrals ADD CONSTRAINT referrals_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.referrals ADD CONSTRAINT referrals_referred_id_fkey FOREIGN KEY (referred_id) REFERENCES profiles(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.referrals ADD CONSTRAINT referrals_referred_id_key UNIQUE (referred_id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.referrals ADD CONSTRAINT referrals_referrer_id_fkey FOREIGN KEY (referrer_id) REFERENCES profiles(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.referrals ADD CONSTRAINT referrals_status_chk CHECK ((status = ANY (ARRAY['joined'::text, 'subscribed'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.schedule_entries ADD CONSTRAINT schedule_entries_entry_type_check CHECK ((entry_type = ANY (ARRAY['study'::text, 'exam'::text, 'holiday'::text, 'blocked'::text, 'other'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.schedule_entries ADD CONSTRAINT schedule_entries_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.schedule_entries ADD CONSTRAINT schedule_entries_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES study_schedules(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.student_assignments ADD CONSTRAINT student_assignments_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.student_assignments ADD CONSTRAINT student_assignments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES auth.users(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.student_assignments ADD CONSTRAINT student_assignments_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.student_assignments ADD CONSTRAINT student_assignments_source_type_chk CHECK ((source_type = ANY (ARRAY['parent'::text, 'teacher'::text]))); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.student_progress ADD CONSTRAINT student_progress_pkey PRIMARY KEY (student_id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.student_sessions ADD CONSTRAINT student_sessions_pkey PRIMARY KEY (token_hash); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.student_sessions ADD CONSTRAINT student_sessions_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.students ADD CONSTRAINT students_family_id_fkey FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.students ADD CONSTRAINT students_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.study_schedules ADD CONSTRAINT study_schedules_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES plans(id); EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;
DO $c$ BEGIN ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; WHEN duplicate_table THEN NULL; WHEN invalid_table_definition THEN NULL; END $c$;

-- ═══ 3 · INDEXES ═══════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS submissions_assignment_idx ON public.assignment_submissions USING btree (assignment_id);
CREATE INDEX IF NOT EXISTS submissions_classroom_idx ON public.assignment_submissions USING btree (classroom_id);
CREATE INDEX IF NOT EXISTS submissions_student_idx ON public.assignment_submissions USING btree (student_id);
CREATE INDEX IF NOT EXISTS classrooms_code_idx ON public.classrooms USING btree (invite_code);
CREATE INDEX IF NOT EXISTS classrooms_teacher_idx ON public.classrooms USING btree (teacher_id);
CREATE INDEX IF NOT EXISTS enrollments_classroom_idx ON public.enrollments USING btree (classroom_id);
CREATE INDEX IF NOT EXISTS enrollments_student_idx ON public.enrollments USING btree (student_id);
CREATE INDEX IF NOT EXISTS guest_assignments_code_idx ON public.guest_assignments USING btree (code);
CREATE INDEX IF NOT EXISTS guest_assignments_teacher_idx ON public.guest_assignments USING btree (teacher_id, created_at DESC);
CREATE INDEX IF NOT EXISTS guest_submissions_assignment_idx ON public.guest_submissions USING btree (assignment_id);
CREATE INDEX IF NOT EXISTS login_events_user_idx ON public.login_events USING btree (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS payments_user_idx ON public.payments USING btree (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS profiles_referral_code_idx ON public.profiles USING btree (referral_code);
CREATE INDEX IF NOT EXISTS profiles_teacher_pending_idx ON public.profiles USING btree (teacher_requested_at DESC) WHERE (teacher_status = 'pending'::text);
CREATE INDEX IF NOT EXISTS referrals_referrer_idx ON public.referrals USING btree (referrer_id);
CREATE INDEX IF NOT EXISTS assignments_classroom_idx ON public.student_assignments USING btree (classroom_id);
CREATE INDEX IF NOT EXISTS assignments_source_idx ON public.student_assignments USING btree (source_type);
CREATE INDEX IF NOT EXISTS student_sessions_expiry_idx ON public.student_sessions USING btree (expires_at);
CREATE INDEX IF NOT EXISTS student_sessions_student_idx ON public.student_sessions USING btree (student_id);
CREATE UNIQUE INDEX IF NOT EXISTS students_live_username_key ON public.students USING btree (family_id, username) WHERE (deleted_at IS NULL);

-- ═══ 4 · ROW LEVEL SECURITY ════════════════════════════════════════════════
-- Tables with RLS enabled and NO policy are deny-all by design: student_sessions,
-- push_subscriptions and the four guest_* tables are reached only through the
-- SECURITY DEFINER functions in section 5.

ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS subs_parent_read ON public.assignment_submissions;
CREATE POLICY subs_parent_read ON public.assignment_submissions AS PERMISSIVE FOR SELECT TO public
  USING (owns_student_txt((student_id)::text));

ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS subs_student_insert ON public.assignment_submissions;
CREATE POLICY subs_student_insert ON public.assignment_submissions AS PERMISSIVE FOR INSERT TO public
  WITH CHECK ((student_id = current_student_id()));

ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS subs_student_read ON public.assignment_submissions;
CREATE POLICY subs_student_read ON public.assignment_submissions AS PERMISSIVE FOR SELECT TO public
  USING ((student_id = current_student_id()));

ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS subs_teacher ON public.assignment_submissions;
CREATE POLICY subs_teacher ON public.assignment_submissions AS PERMISSIVE FOR ALL TO public
  USING ((owns_classroom(classroom_id) OR is_admin()))
  WITH CHECK ((owns_classroom(classroom_id) OR is_admin()));

ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS classrooms_member_read ON public.classrooms;
CREATE POLICY classrooms_member_read ON public.classrooms AS PERMISSIVE FOR SELECT TO public
  USING ((parent_of_classroom_member(id) OR (EXISTS ( SELECT 1
   FROM enrollments e
  WHERE ((e.classroom_id = classrooms.id) AND (e.student_id = current_student_id()))))));

ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS classrooms_teacher ON public.classrooms;
CREATE POLICY classrooms_teacher ON public.classrooms AS PERMISSIVE FOR ALL TO public
  USING (((teacher_id = auth.uid()) OR is_admin()))
  WITH CHECK ((((teacher_id = auth.uid()) AND is_teacher()) OR is_admin()));

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS enroll_parent_read ON public.enrollments;
CREATE POLICY enroll_parent_read ON public.enrollments AS PERMISSIVE FOR SELECT TO public
  USING (owns_student_txt((student_id)::text));

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS enroll_student_read ON public.enrollments;
CREATE POLICY enroll_student_read ON public.enrollments AS PERMISSIVE FOR SELECT TO public
  USING ((student_id = current_student_id()));

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS enroll_teacher ON public.enrollments;
CREATE POLICY enroll_teacher ON public.enrollments AS PERMISSIVE FOR ALL TO public
  USING ((owns_classroom(classroom_id) OR is_admin()))
  WITH CHECK ((owns_classroom(classroom_id) OR is_admin()));

ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS families_own ON public.families;
CREATE POLICY families_own ON public.families AS PERMISSIVE FOR ALL TO public
  USING (((parent_id = auth.uid()) OR is_admin()))
  WITH CHECK (((parent_id = auth.uid()) OR is_admin()));

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS posts_delete ON public.forum_posts;
CREATE POLICY posts_delete ON public.forum_posts AS PERMISSIVE FOR DELETE TO public
  USING (((author_id = auth.uid()) OR (author_student_id = current_student_id()) OR is_admin()));

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS posts_insert ON public.forum_posts;
CREATE POLICY posts_insert ON public.forum_posts AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)));

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS posts_read ON public.forum_posts;
CREATE POLICY posts_read ON public.forum_posts AS PERMISSIVE FOR SELECT TO public
  USING (true);

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS posts_update_admin ON public.forum_posts;
CREATE POLICY posts_update_admin ON public.forum_posts AS PERMISSIVE FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());

ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS replies_delete ON public.forum_replies;
CREATE POLICY replies_delete ON public.forum_replies AS PERMISSIVE FOR DELETE TO public
  USING (((author_id = auth.uid()) OR (author_student_id = current_student_id()) OR is_admin()));

ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS replies_insert ON public.forum_replies;
CREATE POLICY replies_insert ON public.forum_replies AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)));

ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS replies_read ON public.forum_replies;
CREATE POLICY replies_read ON public.forum_replies AS PERMISSIVE FOR SELECT TO public
  USING (true);

ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS login_insert ON public.login_events;
CREATE POLICY login_insert ON public.login_events AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)));

ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS login_select_admin ON public.login_events;
CREATE POLICY login_select_admin ON public.login_events AS PERMISSIVE FOR SELECT TO public
  USING (is_admin());

ALTER TABLE public.mm_data ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS mmdata_delete_admin ON public.mm_data;
CREATE POLICY mmdata_delete_admin ON public.mm_data AS PERMISSIVE FOR DELETE TO public
  USING (is_admin());

ALTER TABLE public.mm_data ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS mmdata_read_global ON public.mm_data;
CREATE POLICY mmdata_read_global ON public.mm_data AS PERMISSIVE FOR SELECT TO public
  USING (((key = 'global_settings'::text) OR is_admin()));

ALTER TABLE public.mm_data ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS mmdata_update_admin ON public.mm_data;
CREATE POLICY mmdata_update_admin ON public.mm_data AS PERMISSIVE FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());

ALTER TABLE public.mm_data ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS mmdata_write_admin ON public.mm_data;
CREATE POLICY mmdata_write_admin ON public.mm_data AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (is_admin());

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS pay_select ON public.payments;
CREATE POLICY pay_select ON public.payments AS PERMISSIVE FOR SELECT TO public
  USING (((user_id = auth.uid()) OR is_admin()));

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS pay_write ON public.payments;
CREATE POLICY pay_write ON public.payments AS PERMISSIVE FOR ALL TO public
  USING (is_admin())
  WITH CHECK (is_admin());

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS plans_delete ON public.plans;
CREATE POLICY plans_delete ON public.plans AS PERMISSIVE FOR DELETE TO public
  USING (is_admin());

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS plans_insert ON public.plans;
CREATE POLICY plans_insert ON public.plans AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (is_admin());

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS plans_read ON public.plans;
CREATE POLICY plans_read ON public.plans AS PERMISSIVE FOR SELECT TO public
  USING (true);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS plans_write ON public.plans;
CREATE POLICY plans_write ON public.plans AS PERMISSIVE FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS profiles_delete ON public.profiles;
CREATE POLICY profiles_delete ON public.profiles AS PERMISSIVE FOR DELETE TO public
  USING (is_admin());

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS profiles_insert ON public.profiles;
CREATE POLICY profiles_insert ON public.profiles AS PERMISSIVE FOR INSERT TO public
  WITH CHECK ((id = auth.uid()));

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS profiles_select ON public.profiles;
CREATE POLICY profiles_select ON public.profiles AS PERMISSIVE FOR SELECT TO public
  USING (((id = auth.uid()) OR is_admin()));

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS profiles_update ON public.profiles;
CREATE POLICY profiles_update ON public.profiles AS PERMISSIVE FOR UPDATE TO public
  USING (((id = auth.uid()) OR is_admin()))
  WITH CHECK (((id = auth.uid()) OR is_admin()));

ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS reports_insert ON public.question_reports;
CREATE POLICY reports_insert ON public.question_reports AS PERMISSIVE FOR INSERT TO public
  WITH CHECK (((current_student_id() IS NOT NULL) OR (auth.uid() IS NOT NULL)));

ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS reports_select_admin ON public.question_reports;
CREATE POLICY reports_select_admin ON public.question_reports AS PERMISSIVE FOR SELECT TO public
  USING (is_admin());

ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS reports_update_admin ON public.question_reports;
CREATE POLICY reports_update_admin ON public.question_reports AS PERMISSIVE FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS referrals_select_own ON public.referrals;
CREATE POLICY referrals_select_own ON public.referrals AS PERMISSIVE FOR SELECT TO public
  USING ((referrer_id = auth.uid()));

ALTER TABLE public.schedule_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS entries_parent ON public.schedule_entries;
CREATE POLICY entries_parent ON public.schedule_entries AS PERMISSIVE FOR ALL TO public
  USING ((owns_student_txt(student_id) OR is_admin()))
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()));

ALTER TABLE public.schedule_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS entries_student_read ON public.schedule_entries;
CREATE POLICY entries_student_read ON public.schedule_entries AS PERMISSIVE FOR SELECT TO public
  USING ((student_id = (current_student_id())::text));

ALTER TABLE public.student_assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS assignments_delete ON public.student_assignments;
CREATE POLICY assignments_delete ON public.student_assignments AS PERMISSIVE FOR DELETE TO public
  USING ((owns_student_txt(student_id) OR is_admin()));

ALTER TABLE public.student_assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS assignments_insert ON public.student_assignments;
CREATE POLICY assignments_insert ON public.student_assignments AS PERMISSIVE FOR INSERT TO public
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()));

ALTER TABLE public.student_assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS assignments_select ON public.student_assignments;
CREATE POLICY assignments_select ON public.student_assignments AS PERMISSIVE FOR SELECT TO public
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()));

ALTER TABLE public.student_assignments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS assignments_update ON public.student_assignments;
CREATE POLICY assignments_update ON public.student_assignments AS PERMISSIVE FOR UPDATE TO public
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
  WITH CHECK (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()));

ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS progress_rw ON public.student_progress;
CREATE POLICY progress_rw ON public.student_progress AS PERMISSIVE FOR ALL TO public
  USING (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()))
  WITH CHECK (((student_id = (current_student_id())::text) OR owns_student_txt(student_id) OR is_admin()));

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS students_parent ON public.students;
CREATE POLICY students_parent ON public.students AS PERMISSIVE FOR ALL TO public
  USING ((owns_student_txt((id)::text) OR is_admin()))
  WITH CHECK ((is_admin() OR ((family_id)::text IN ( SELECT (f.id)::text AS id
   FROM families f
  WHERE (f.parent_id = auth.uid())))));

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS students_self_read ON public.students;
CREATE POLICY students_self_read ON public.students AS PERMISSIVE FOR SELECT TO public
  USING (((id)::text = (current_student_id())::text));

ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS sched_parent ON public.study_schedules;
CREATE POLICY sched_parent ON public.study_schedules AS PERMISSIVE FOR ALL TO public
  USING ((owns_student_txt(student_id) OR is_admin()))
  WITH CHECK ((owns_student_txt(student_id) OR is_admin()));

ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS sched_student_read ON public.study_schedules;
CREATE POLICY sched_student_read ON public.study_schedules AS PERMISSIVE FOR SELECT TO public
  USING ((student_id = (current_student_id())::text));

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS subs_select ON public.subscriptions;
CREATE POLICY subs_select ON public.subscriptions AS PERMISSIVE FOR SELECT TO public
  USING (((user_id = auth.uid()) OR is_admin()));

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS subs_write ON public.subscriptions;
CREATE POLICY subs_write ON public.subscriptions AS PERMISSIVE FOR ALL TO public
  USING (is_admin())
  WITH CHECK (is_admin());

-- ═══ 5 · FUNCTIONS ═════════════════════════════════════════════════════════
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
      coalesce(nullif(btrim(coalesce(p_avatar, '')), ''), '🧒'),
      coalesce(p_grade, 5),
      crypt(p_pin, gen_salt('bf')),          -- ← hashed DURING insert
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

CREATE OR REPLACE FUNCTION public.delete_my_account()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_fam uuid;
  v_now timestamptz := now();
  v_kids int := 0;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  -- An admin deleting themselves through the parent UI would be an
  -- unrecoverable lockout, not a feature. Admin removal stays in the admin
  -- panel, where another admin has to do it.
  IF EXISTS (SELECT 1 FROM public.profiles
              WHERE id = v_uid AND (role = 'admin' OR is_super_admin)) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'admin_cannot_self_delete');
  END IF;

  SELECT id INTO v_fam FROM public.families WHERE parent_id = v_uid;

  IF v_fam IS NOT NULL THEN
    -- Children go with the parent, and their usernames are freed so the family
    -- can recreate the same child by name if they come back.
    UPDATE public.students
       SET deleted_at = v_now,
           username   = username || '.del.' || left(replace(id::text, '-', ''), 8)
     WHERE family_id = v_fam AND deleted_at IS NULL;
    GET DIAGNOSTICS v_kids = ROW_COUNT;

    -- Kick every child off every device immediately.
    DELETE FROM public.student_sessions
     WHERE student_id IN (SELECT id FROM public.students WHERE family_id = v_fam);
  END IF;

  UPDATE public.profiles SET deleted_at = v_now WHERE id = v_uid;

  RETURN jsonb_build_object('ok', true, 'children', v_kids);
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

CREATE OR REPLACE FUNCTION public.guest_note_failure(p_assignment uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_max     CONSTANT int := 40;                       -- fails per hour, all names
  v_lock    CONSTANT interval := interval '15 minutes';
  v_row     public.guest_assignment_attempts%ROWTYPE;
BEGIN
  INSERT INTO public.guest_assignment_attempts (assignment_id, fails, window_start)
  VALUES (p_assignment, 1, now())
  ON CONFLICT (assignment_id) DO UPDATE
    SET fails = CASE WHEN public.guest_assignment_attempts.window_start < now() - interval '1 hour'
                     THEN 1 ELSE public.guest_assignment_attempts.fails + 1 END,
        window_start = CASE WHEN public.guest_assignment_attempts.window_start < now() - interval '1 hour'
                            THEN now() ELSE public.guest_assignment_attempts.window_start END
  RETURNING * INTO v_row;

  IF v_row.fails >= v_max THEN
    UPDATE public.guest_assignment_attempts
       SET locked_until = now() + v_lock WHERE assignment_id = p_assignment;
    RETURN true;
  END IF;
  RETURN false;
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
  v_glob       public.guest_assignment_attempts%ROWTYPE;
  v_max_tries  CONSTANT int := 5;
  v_lock_mins  CONSTANT int := 10;
  v_taken      int;
  v_sub        public.guest_submissions%ROWTYPE;
  v_locked_all boolean;
  v_token      text;
BEGIN
  IF p_name IS NULL OR btrim(p_name) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_required');
  END IF;
  v_key := lower(btrim(p_name));

  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_found');
  END IF;

  SELECT * INTO v_glob FROM public.guest_assignment_attempts WHERE assignment_id = v_a.id;
  IF FOUND AND v_glob.locked_until IS NOT NULL AND v_glob.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked',
      'secsLeft', extract(epoch FROM (v_glob.locked_until - now()))::int, 'scope', 'assignment');
  END IF;

  SELECT * INTO v_att FROM public.guest_pin_attempts
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF FOUND AND v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'locked',
      'secsLeft', extract(epoch FROM (v_att.locked_until - now()))::int, 'scope', 'name');
  END IF;

  IF v_a.status <> 'active' OR v_a.expires_at < now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'expired');
  END IF;

  IF v_a.pin_hash IS NULL OR crypt(p_pin, v_a.pin_hash) <> v_a.pin_hash THEN
    v_locked_all := public.guest_note_failure(v_a.id);
    INSERT INTO public.guest_pin_attempts (assignment_id, name_key, attempts, updated_at)
    VALUES (v_a.id, v_key, 1, now())
    ON CONFLICT (assignment_id, name_key) DO UPDATE
      SET attempts     = public.guest_pin_attempts.attempts + 1,
          locked_until = CASE WHEN public.guest_pin_attempts.attempts + 1 >= v_max_tries
                              THEN now() + (v_lock_mins || ' minutes')::interval END,
          updated_at   = now()
    RETURNING * INTO v_att;

    IF v_locked_all THEN
      RETURN jsonb_build_object('ok', false, 'error', 'locked', 'secsLeft', 900, 'scope', 'assignment');
    END IF;
    IF v_att.locked_until IS NOT NULL AND v_att.locked_until > now() THEN
      RETURN jsonb_build_object('ok', false, 'error', 'locked',
        'secsLeft', v_lock_mins * 60, 'scope', 'name');
    END IF;
    RETURN jsonb_build_object('ok', false, 'error', 'bad_pin',
      'attemptsLeft', greatest(0, v_max_tries - v_att.attempts));
  END IF;

  DELETE FROM public.guest_pin_attempts WHERE assignment_id = v_a.id AND name_key = v_key;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;

  IF FOUND AND v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'name_taken',
      'name', v_sub.name_display, 'pct', v_sub.pct);
  END IF;

  -- B1: a fresh token for every successful open.
  v_token := encode(gen_random_bytes(32), 'hex');

  IF NOT FOUND THEN
    SELECT count(*) INTO v_taken FROM public.guest_submissions
     WHERE assignment_id = v_a.id
       AND (submitted_at IS NOT NULL OR started_at > now() - interval '2 hours');
    IF v_taken >= v_a.max_students THEN
      RETURN jsonb_build_object('ok', false, 'error', 'full', 'max', v_a.max_students);
    END IF;
    INSERT INTO public.guest_submissions
      (assignment_id, name_display, name_key, ip, user_agent, open_token_hash)
    VALUES (v_a.id, btrim(p_name), v_key, p_ip, p_ua,
            encode(digest(v_token, 'sha256'), 'hex'));
  ELSE
    -- B2: the clock restarts ONLY for a genuine granted retry. Reopening an
    -- unfinished attempt keeps the original started_at, so refreshing the page
    -- no longer buys more time.
    UPDATE public.guest_submissions
       SET open_token_hash = encode(digest(v_token, 'sha256'), 'hex'),
           started_at = CASE WHEN v_sub.retry_allowed THEN now() ELSE started_at END
     WHERE id = v_sub.id;
  END IF;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object(
      'id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'teacher', v_a.teacher_label, 'classroom', v_a.classroom_label,
      'subject_pack_id', v_a.subject_pack_id, 'question_ids', v_a.question_ids,
      'question_count', v_a.question_count, 'duration_mins', v_a.duration_mins,
      'due_at', v_a.due_at, 'expires_at', v_a.expires_at),
    'name', btrim(p_name),
    'token', v_token,
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
           'elapsed_secs', s.elapsed_secs, 'over_time', s.over_time,
           'answers', s.answers, 'submitted_at', s.submitted_at)
         ORDER BY s.submitted_at DESC NULLS LAST), '[]'::jsonb)
    INTO v_rows FROM public.guest_submissions s WHERE s.assignment_id = v_a.id;

  RETURN jsonb_build_object('ok', true,
    'assignment', jsonb_build_object('id', v_a.id, 'code', v_a.code, 'title', v_a.title,
      'question_ids', v_a.question_ids, 'question_count', v_a.question_count,
      'classroom', v_a.classroom_label, 'due_at', v_a.due_at,
      'expires_at', v_a.expires_at, 'status', v_a.status, 'max_students', v_a.max_students),
    'submissions', v_rows);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.guest_submit(p_code text, p_name text, p_answers jsonb, p_score integer, p_total integer, p_token text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_a    public.guest_assignments%ROWTYPE;
  v_key  text := lower(btrim(p_name));
  v_sub  public.guest_submissions%ROWTYPE;
  v_pct  int := CASE WHEN coalesce(p_total,0) > 0 THEN round(p_score::numeric / p_total * 100) ELSE 0 END;
  v_el   int;
  v_over boolean := false;
BEGIN
  SELECT * INTO v_a FROM public.guest_assignments WHERE code = upper(btrim(p_code));
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'not_found'); END IF;

  SELECT * INTO v_sub FROM public.guest_submissions
   WHERE assignment_id = v_a.id AND name_key = v_key;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'error', 'no_session'); END IF;

  -- B1: only the browser that opened this attempt may submit it.
  IF v_sub.open_token_hash IS NULL
     OR p_token IS NULL
     OR encode(digest(p_token, 'sha256'), 'hex') <> v_sub.open_token_hash THEN
    RETURN jsonb_build_object('ok', false, 'error', 'bad_token');
  END IF;

  IF v_sub.submitted_at IS NOT NULL AND NOT v_sub.retry_allowed THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_submitted', 'pct', v_sub.pct);
  END IF;

  v_el := extract(epoch FROM (now() - v_sub.started_at))::int;
  IF v_a.duration_mins IS NOT NULL THEN
    v_over := v_el > (v_a.duration_mins * 60) + 60;
  END IF;

  UPDATE public.guest_submissions
     SET answers = coalesce(p_answers, '[]'::jsonb),
         score = p_score, total = p_total, pct = v_pct,
         attempt = CASE WHEN v_sub.submitted_at IS NOT NULL THEN v_sub.attempt + 1 ELSE v_sub.attempt END,
         retry_allowed = false, submitted_at = now(),
         elapsed_secs = v_el, over_time = v_over,
         open_token_hash = NULL          -- one token, one submission
   WHERE id = v_sub.id;

  RETURN jsonb_build_object('ok', true, 'score', p_score, 'total', p_total, 'pct', v_pct,
    'title', v_a.title, 'teacher', v_a.teacher_label,
    'elapsed_secs', v_el, 'over_time', v_over);
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

CREATE OR REPLACE FUNCTION public.my_referrals()
 RETURNS TABLE(referred_name text, status text, created_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT p.full_name, r.status, r.created_at
  FROM public.referrals r
  JOIN public.profiles p ON p.id = r.referred_id
  WHERE r.referrer_id = auth.uid()
  ORDER BY r.created_at DESC;
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

CREATE OR REPLACE FUNCTION public.record_referral(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_referrer uuid;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  IF p_code IS NULL OR btrim(p_code) = '' THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_code');
  END IF;

  -- Idempotent: a retried call (flaky network, double-tap) must not error out
  -- or create a second row — it just reports the no-op.
  IF EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = v_uid) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_referred');
  END IF;

  SELECT id INTO v_referrer FROM public.profiles
    WHERE referral_code = upper(btrim(p_code));

  IF v_referrer IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid_code');
  END IF;

  IF v_referrer = v_uid THEN
    RETURN jsonb_build_object('ok', false, 'error', 'self_referral');
  END IF;

  INSERT INTO public.referrals (referrer_id, referred_id) VALUES (v_referrer, v_uid);

  RETURN jsonb_build_object('ok', true);
EXCEPTION WHEN unique_violation THEN
  -- Race: two calls landed together. Same outcome as the EXISTS check above.
  RETURN jsonb_build_object('ok', false, 'error', 'already_referred');
END;
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

CREATE OR REPLACE FUNCTION public.restore_my_account()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid  uuid := auth.uid();
  v_fam  uuid;
  v_kids int := 0;
  r      record;
  v_name text;
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  UPDATE public.profiles SET deleted_at = NULL WHERE id = v_uid;

  SELECT id INTO v_fam FROM public.families WHERE parent_id = v_uid;
  IF v_fam IS NOT NULL THEN
    FOR r IN SELECT id, username FROM public.students
              WHERE family_id = v_fam AND deleted_at IS NOT NULL LOOP
      v_name := regexp_replace(r.username, '\.del\.[0-9a-f]{8}$', '');
      IF v_name <> r.username AND NOT EXISTS (
           SELECT 1 FROM public.students
            WHERE family_id = v_fam AND username = v_name AND deleted_at IS NULL) THEN
        UPDATE public.students SET username = v_name, deleted_at = NULL WHERE id = r.id;
      ELSE
        UPDATE public.students SET deleted_at = NULL WHERE id = r.id;
      END IF;
      v_kids := v_kids + 1;
    END LOOP;
  END IF;

  RETURN jsonb_build_object('ok', true, 'children', v_kids);
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
  WHERE s.id = p_student_id
    AND (f.parent_id = auth.uid() OR public.is_admin())
  LIMIT 1;

  IF v_found IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'forbidden');
  END IF;

  UPDATE students
     SET pin              = crypt(p_pin, gen_salt('bf', 8)),
         pin_hash         = NULL,
         pin_attempts     = 0,
         pin_locked_until = NULL,
         settings         = coalesce(settings, '{}'::jsonb)
                              - 'pin_attempts' - 'pin_locked_until'
   WHERE id = p_student_id;

  RETURN jsonb_build_object('ok', true);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.soft_delete_student(p_student uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ok  boolean;
  v_hit int;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authenticated');
  END IF;

  -- SECURITY DEFINER bypasses RLS, so this is the access control: only the
  -- owning parent (or an admin) may delete a child.
  SELECT EXISTS (
    SELECT 1 FROM public.students s
      JOIN public.families f ON f.id = s.family_id
     WHERE s.id = p_student AND (f.parent_id = auth.uid() OR public.is_admin())
  ) INTO v_ok;
  IF NOT v_ok THEN
    RETURN jsonb_build_object('ok', false, 'error', 'not_authorised');
  END IF;

  UPDATE public.students
     SET deleted_at = now(),
         username   = username || '.del.' || left(replace(id::text, '-', ''), 8)
   WHERE id = p_student AND deleted_at IS NULL;
  GET DIAGNOSTICS v_hit = ROW_COUNT;

  DELETE FROM public.student_sessions WHERE student_id = p_student;

  -- Report a no-op rather than claiming success. The caller hides the child on
  -- the strength of this answer, so "already gone" and "nothing happened" must
  -- not look identical to "removed".
  IF v_hit = 0 THEN
    RETURN jsonb_build_object('ok', true, 'already_deleted', true);
  END IF;

  RETURN jsonb_build_object('ok', true);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.verify_student_pin(p_username text, p_pin text, p_family_name text DEFAULT NULL::text)
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
  -- ── Lookup: scoped to family when name is supplied ────────────────
  IF p_family_name IS NOT NULL AND trim(p_family_name) <> '' THEN
    SELECT s.* INTO v_student
    FROM   public.students s
    JOIN   public.families f ON f.id = s.family_id
    WHERE  lower(s.username)       = lower(p_username)
      AND  lower(trim(f.family_name)) = lower(trim(p_family_name))
      AND  s.deleted_at IS NULL;
  ELSE
    -- Fallback: old global lookup (keeps existing sessions working)
    SELECT * INTO v_student FROM public.students
    WHERE lower(username) = lower(p_username) AND deleted_at IS NULL LIMIT 1;
  END IF;

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

  -- ── Wrong PIN ────────────────────────────────────────────────────
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

  -- ── Correct PIN ──────────────────────────────────────────────────
  UPDATE public.students
     SET settings = settings - 'pin_attempts' - 'pin_locked_until'
   WHERE id = v_student.id;

  -- Anti-sharing: fresh login invalidates every other device instantly.
  DELETE FROM public.student_sessions WHERE student_id = v_student.id;
  DELETE FROM public.student_sessions WHERE expires_at < v_now;  -- opportunistic GC

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.student_sessions (token_hash, student_id, expires_at)
  VALUES (encode(digest(v_token, 'sha256'), 'hex'), v_student.id, v_now + v_ttl);

  RETURN jsonb_build_object(
    'ok', true,
    'session_token', v_token,
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

  -- ── wrong PIN ──
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

  -- ── correct PIN ──
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
    'session_token', v_token,            -- ← NEW: client must send as x-student-token
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

-- ═══ 6 · GRANTS ════════════════════════════════════════════════════════════
GRANT DELETE ON public.assignment_submissions TO anon;
GRANT DELETE ON public.assignment_submissions TO authenticated;
GRANT DELETE ON public.classrooms TO anon;
GRANT DELETE ON public.classrooms TO authenticated;
GRANT DELETE ON public.enrollments TO anon;
GRANT DELETE ON public.enrollments TO authenticated;
GRANT DELETE ON public.families TO anon;
GRANT DELETE ON public.families TO authenticated;
GRANT DELETE ON public.forum_posts TO anon;
GRANT DELETE ON public.forum_posts TO authenticated;
GRANT DELETE ON public.forum_replies TO anon;
GRANT DELETE ON public.forum_replies TO authenticated;
GRANT DELETE ON public.login_events TO anon;
GRANT DELETE ON public.login_events TO authenticated;
GRANT DELETE ON public.mm_data TO anon;
GRANT DELETE ON public.mm_data TO authenticated;
GRANT DELETE ON public.payments TO anon;
GRANT DELETE ON public.payments TO authenticated;
GRANT DELETE ON public.plans TO anon;
GRANT DELETE ON public.plans TO authenticated;
GRANT DELETE ON public.profiles TO anon;
GRANT DELETE ON public.profiles TO authenticated;
GRANT DELETE ON public.push_subscriptions TO anon;
GRANT DELETE ON public.push_subscriptions TO authenticated;
GRANT DELETE ON public.question_reports TO anon;
GRANT DELETE ON public.question_reports TO authenticated;
GRANT DELETE ON public.referrals TO anon;
GRANT DELETE ON public.referrals TO authenticated;
GRANT DELETE ON public.schedule_entries TO anon;
GRANT DELETE ON public.schedule_entries TO authenticated;
GRANT DELETE ON public.student_assignments TO anon;
GRANT DELETE ON public.student_assignments TO authenticated;
GRANT DELETE ON public.student_progress TO anon;
GRANT DELETE ON public.student_progress TO authenticated;
GRANT DELETE ON public.student_sessions TO anon;
GRANT DELETE ON public.student_sessions TO authenticated;
GRANT DELETE ON public.students TO anon;
GRANT DELETE ON public.students TO authenticated;
GRANT DELETE ON public.study_schedules TO anon;
GRANT DELETE ON public.study_schedules TO authenticated;
GRANT DELETE ON public.subscriptions TO anon;
GRANT DELETE ON public.subscriptions TO authenticated;
GRANT EXECUTE ON FUNCTION public._forum_dec_reply_count() TO anon;
GRANT EXECUTE ON FUNCTION public._forum_dec_reply_count() TO authenticated;
GRANT EXECUTE ON FUNCTION public._forum_inc_reply_count() TO anon;
GRANT EXECUTE ON FUNCTION public._forum_inc_reply_count() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_pending_counts() TO anon;
GRANT EXECUTE ON FUNCTION public.admin_pending_counts() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_teacher_status(p_user_id uuid, p_status text, p_tier text) TO anon;
GRANT EXECUTE ON FUNCTION public.admin_set_teacher_status(p_user_id uuid, p_status text, p_tier text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_teacher_requests() TO anon;
GRANT EXECUTE ON FUNCTION public.admin_teacher_requests() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_student_with_pin(p_family_id uuid, p_username text, p_display_name text, p_avatar text, p_grade integer, p_pin text, p_settings jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_student_id() TO anon;
GRANT EXECUTE ON FUNCTION public.current_student_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated;
GRANT EXECUTE ON FUNCTION public.end_student_session() TO anon;
GRANT EXECUTE ON FUNCTION public.end_student_session() TO authenticated;
GRANT EXECUTE ON FUNCTION public.gen_guest_code() TO anon;
GRANT EXECUTE ON FUNCTION public.gen_guest_code() TO authenticated;
GRANT EXECUTE ON FUNCTION public.gen_invite_code() TO anon;
GRANT EXECUTE ON FUNCTION public.gen_invite_code() TO authenticated;
GRANT EXECUTE ON FUNCTION public.guest_assignment_create(p_title text, p_subject_pack_id text, p_chapter_ids jsonb, p_question_ids jsonb, p_pin text, p_classroom_label text, p_duration_mins integer, p_due_at timestamp with time zone, p_expires_hours integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.guest_grant_retry(p_assignment_id uuid, p_name_key text) TO anon;
GRANT EXECUTE ON FUNCTION public.guest_grant_retry(p_assignment_id uuid, p_name_key text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.guest_my_assignments() TO anon;
GRANT EXECUTE ON FUNCTION public.guest_my_assignments() TO authenticated;
GRANT EXECUTE ON FUNCTION public.guest_results(p_assignment_id uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.guest_results(p_assignment_id uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_approved_teacher() TO anon;
GRANT EXECUTE ON FUNCTION public.is_approved_teacher() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO anon;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_teacher() TO anon;
GRANT EXECUTE ON FUNCTION public.is_teacher() TO authenticated;
GRANT EXECUTE ON FUNCTION public.join_classroom(p_invite_code text, p_student_id uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.join_classroom(p_invite_code text, p_student_id uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.mint_student_session(p_username text, p_pin text) TO anon;
GRANT EXECUTE ON FUNCTION public.mint_student_session(p_username text, p_pin text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_referrals() TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_teacher_status() TO anon;
GRANT EXECUTE ON FUNCTION public.my_teacher_status() TO authenticated;
GRANT EXECUTE ON FUNCTION public.owns_classroom(p_classroom uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.owns_classroom(p_classroom uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.owns_student(p_student uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.owns_student(p_student uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.owns_student_txt(p_student text) TO anon;
GRANT EXECUTE ON FUNCTION public.owns_student_txt(p_student text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.parent_of_classroom_member(p_classroom uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.parent_of_classroom_member(p_classroom uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_referral(p_code text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.request_teacher_access(p_note text) TO anon;
GRANT EXECUTE ON FUNCTION public.request_teacher_access(p_note text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.restore_my_account() TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_student_pin(p_student_id uuid, p_pin text) TO anon;
GRANT EXECUTE ON FUNCTION public.set_student_pin(p_student_id uuid, p_pin text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.soft_delete_student(p_student uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_student_pin(p_username text, p_pin text, p_family_name text) TO anon;
GRANT EXECUTE ON FUNCTION public.verify_student_pin(p_username text, p_pin text, p_family_name text) TO authenticated;
GRANT INSERT ON public.assignment_submissions TO anon;
GRANT INSERT ON public.assignment_submissions TO authenticated;
GRANT INSERT ON public.classrooms TO anon;
GRANT INSERT ON public.classrooms TO authenticated;
GRANT INSERT ON public.enrollments TO anon;
GRANT INSERT ON public.enrollments TO authenticated;
GRANT INSERT ON public.families TO anon;
GRANT INSERT ON public.families TO authenticated;
GRANT INSERT ON public.forum_posts TO anon;
GRANT INSERT ON public.forum_posts TO authenticated;
GRANT INSERT ON public.forum_replies TO anon;
GRANT INSERT ON public.forum_replies TO authenticated;
GRANT INSERT ON public.login_events TO anon;
GRANT INSERT ON public.login_events TO authenticated;
GRANT INSERT ON public.mm_data TO anon;
GRANT INSERT ON public.mm_data TO authenticated;
GRANT INSERT ON public.payments TO anon;
GRANT INSERT ON public.payments TO authenticated;
GRANT INSERT ON public.plans TO anon;
GRANT INSERT ON public.plans TO authenticated;
GRANT INSERT ON public.profiles TO anon;
GRANT INSERT ON public.profiles TO authenticated;
GRANT INSERT ON public.push_subscriptions TO anon;
GRANT INSERT ON public.push_subscriptions TO authenticated;
GRANT INSERT ON public.question_reports TO anon;
GRANT INSERT ON public.question_reports TO authenticated;
GRANT INSERT ON public.referrals TO anon;
GRANT INSERT ON public.referrals TO authenticated;
GRANT INSERT ON public.schedule_entries TO anon;
GRANT INSERT ON public.schedule_entries TO authenticated;
GRANT INSERT ON public.student_assignments TO anon;
GRANT INSERT ON public.student_assignments TO authenticated;
GRANT INSERT ON public.student_progress TO anon;
GRANT INSERT ON public.student_progress TO authenticated;
GRANT INSERT ON public.student_sessions TO anon;
GRANT INSERT ON public.student_sessions TO authenticated;
GRANT INSERT ON public.students TO anon;
GRANT INSERT ON public.students TO authenticated;
GRANT INSERT ON public.study_schedules TO anon;
GRANT INSERT ON public.study_schedules TO authenticated;
GRANT INSERT ON public.subscriptions TO anon;
GRANT INSERT ON public.subscriptions TO authenticated;
GRANT REFERENCES ON public.assignment_submissions TO anon;
GRANT REFERENCES ON public.assignment_submissions TO authenticated;
GRANT REFERENCES ON public.classrooms TO anon;
GRANT REFERENCES ON public.classrooms TO authenticated;
GRANT REFERENCES ON public.enrollments TO anon;
GRANT REFERENCES ON public.enrollments TO authenticated;
GRANT REFERENCES ON public.families TO anon;
GRANT REFERENCES ON public.families TO authenticated;
GRANT REFERENCES ON public.forum_posts TO anon;
GRANT REFERENCES ON public.forum_posts TO authenticated;
GRANT REFERENCES ON public.forum_replies TO anon;
GRANT REFERENCES ON public.forum_replies TO authenticated;
GRANT REFERENCES ON public.login_events TO anon;
GRANT REFERENCES ON public.login_events TO authenticated;
GRANT REFERENCES ON public.mm_data TO anon;
GRANT REFERENCES ON public.mm_data TO authenticated;
GRANT REFERENCES ON public.payments TO anon;
GRANT REFERENCES ON public.payments TO authenticated;
GRANT REFERENCES ON public.plans TO anon;
GRANT REFERENCES ON public.plans TO authenticated;
GRANT REFERENCES ON public.profiles TO anon;
GRANT REFERENCES ON public.profiles TO authenticated;
GRANT REFERENCES ON public.push_subscriptions TO anon;
GRANT REFERENCES ON public.push_subscriptions TO authenticated;
GRANT REFERENCES ON public.question_reports TO anon;
GRANT REFERENCES ON public.question_reports TO authenticated;
GRANT REFERENCES ON public.referrals TO anon;
GRANT REFERENCES ON public.referrals TO authenticated;
GRANT REFERENCES ON public.schedule_entries TO anon;
GRANT REFERENCES ON public.schedule_entries TO authenticated;
GRANT REFERENCES ON public.student_assignments TO anon;
GRANT REFERENCES ON public.student_assignments TO authenticated;
GRANT REFERENCES ON public.student_progress TO anon;
GRANT REFERENCES ON public.student_progress TO authenticated;
GRANT REFERENCES ON public.student_sessions TO anon;
GRANT REFERENCES ON public.student_sessions TO authenticated;
GRANT REFERENCES ON public.students TO anon;
GRANT REFERENCES ON public.students TO authenticated;
GRANT REFERENCES ON public.study_schedules TO anon;
GRANT REFERENCES ON public.study_schedules TO authenticated;
GRANT REFERENCES ON public.subscriptions TO anon;
GRANT REFERENCES ON public.subscriptions TO authenticated;
GRANT SELECT (avatar) ON public.students TO anon;
GRANT SELECT (avatar) ON public.students TO authenticated;
GRANT SELECT (created_at) ON public.students TO anon;
GRANT SELECT (created_at) ON public.students TO authenticated;
GRANT SELECT (deleted_at) ON public.students TO anon;
GRANT SELECT (deleted_at) ON public.students TO authenticated;
GRANT SELECT (display_name) ON public.students TO anon;
GRANT SELECT (display_name) ON public.students TO authenticated;
GRANT SELECT (expires_at) ON public.students TO anon;
GRANT SELECT (expires_at) ON public.students TO authenticated;
GRANT SELECT (family_id) ON public.students TO anon;
GRANT SELECT (family_id) ON public.students TO authenticated;
GRANT SELECT (grade) ON public.students TO anon;
GRANT SELECT (grade) ON public.students TO authenticated;
GRANT SELECT (id) ON public.students TO anon;
GRANT SELECT (id) ON public.students TO authenticated;
GRANT SELECT (session_version) ON public.students TO anon;
GRANT SELECT (session_version) ON public.students TO authenticated;
GRANT SELECT (settings) ON public.students TO anon;
GRANT SELECT (settings) ON public.students TO authenticated;
GRANT SELECT (username) ON public.students TO anon;
GRANT SELECT (username) ON public.students TO authenticated;
GRANT SELECT ON public.assignment_submissions TO anon;
GRANT SELECT ON public.assignment_submissions TO authenticated;
GRANT SELECT ON public.classrooms TO anon;
GRANT SELECT ON public.classrooms TO authenticated;
GRANT SELECT ON public.enrollments TO anon;
GRANT SELECT ON public.enrollments TO authenticated;
GRANT SELECT ON public.families TO anon;
GRANT SELECT ON public.families TO authenticated;
GRANT SELECT ON public.forum_posts TO anon;
GRANT SELECT ON public.forum_posts TO authenticated;
GRANT SELECT ON public.forum_replies TO anon;
GRANT SELECT ON public.forum_replies TO authenticated;
GRANT SELECT ON public.login_events TO anon;
GRANT SELECT ON public.login_events TO authenticated;
GRANT SELECT ON public.mm_data TO anon;
GRANT SELECT ON public.mm_data TO authenticated;
GRANT SELECT ON public.payments TO anon;
GRANT SELECT ON public.payments TO authenticated;
GRANT SELECT ON public.plans TO anon;
GRANT SELECT ON public.plans TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.profiles TO authenticated;
GRANT SELECT ON public.push_subscriptions TO anon;
GRANT SELECT ON public.push_subscriptions TO authenticated;
GRANT SELECT ON public.question_reports TO anon;
GRANT SELECT ON public.question_reports TO authenticated;
GRANT SELECT ON public.referrals TO anon;
GRANT SELECT ON public.referrals TO authenticated;
GRANT SELECT ON public.schedule_entries TO anon;
GRANT SELECT ON public.schedule_entries TO authenticated;
GRANT SELECT ON public.student_assignments TO anon;
GRANT SELECT ON public.student_assignments TO authenticated;
GRANT SELECT ON public.student_progress TO anon;
GRANT SELECT ON public.student_progress TO authenticated;
GRANT SELECT ON public.student_sessions TO anon;
GRANT SELECT ON public.student_sessions TO authenticated;
GRANT SELECT ON public.study_schedules TO anon;
GRANT SELECT ON public.study_schedules TO authenticated;
GRANT SELECT ON public.subscriptions TO anon;
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT TRIGGER ON public.assignment_submissions TO anon;
GRANT TRIGGER ON public.assignment_submissions TO authenticated;
GRANT TRIGGER ON public.classrooms TO anon;
GRANT TRIGGER ON public.classrooms TO authenticated;
GRANT TRIGGER ON public.enrollments TO anon;
GRANT TRIGGER ON public.enrollments TO authenticated;
GRANT TRIGGER ON public.families TO anon;
GRANT TRIGGER ON public.families TO authenticated;
GRANT TRIGGER ON public.forum_posts TO anon;
GRANT TRIGGER ON public.forum_posts TO authenticated;
GRANT TRIGGER ON public.forum_replies TO anon;
GRANT TRIGGER ON public.forum_replies TO authenticated;
GRANT TRIGGER ON public.login_events TO anon;
GRANT TRIGGER ON public.login_events TO authenticated;
GRANT TRIGGER ON public.mm_data TO anon;
GRANT TRIGGER ON public.mm_data TO authenticated;
GRANT TRIGGER ON public.payments TO anon;
GRANT TRIGGER ON public.payments TO authenticated;
GRANT TRIGGER ON public.plans TO anon;
GRANT TRIGGER ON public.plans TO authenticated;
GRANT TRIGGER ON public.profiles TO anon;
GRANT TRIGGER ON public.profiles TO authenticated;
GRANT TRIGGER ON public.push_subscriptions TO anon;
GRANT TRIGGER ON public.push_subscriptions TO authenticated;
GRANT TRIGGER ON public.question_reports TO anon;
GRANT TRIGGER ON public.question_reports TO authenticated;
GRANT TRIGGER ON public.referrals TO anon;
GRANT TRIGGER ON public.referrals TO authenticated;
GRANT TRIGGER ON public.schedule_entries TO anon;
GRANT TRIGGER ON public.schedule_entries TO authenticated;
GRANT TRIGGER ON public.student_assignments TO anon;
GRANT TRIGGER ON public.student_assignments TO authenticated;
GRANT TRIGGER ON public.student_progress TO anon;
GRANT TRIGGER ON public.student_progress TO authenticated;
GRANT TRIGGER ON public.student_sessions TO anon;
GRANT TRIGGER ON public.student_sessions TO authenticated;
GRANT TRIGGER ON public.students TO anon;
GRANT TRIGGER ON public.students TO authenticated;
GRANT TRIGGER ON public.study_schedules TO anon;
GRANT TRIGGER ON public.study_schedules TO authenticated;
GRANT TRIGGER ON public.subscriptions TO anon;
GRANT TRIGGER ON public.subscriptions TO authenticated;
GRANT TRUNCATE ON public.assignment_submissions TO anon;
GRANT TRUNCATE ON public.assignment_submissions TO authenticated;
GRANT TRUNCATE ON public.classrooms TO anon;
GRANT TRUNCATE ON public.classrooms TO authenticated;
GRANT TRUNCATE ON public.enrollments TO anon;
GRANT TRUNCATE ON public.enrollments TO authenticated;
GRANT TRUNCATE ON public.families TO anon;
GRANT TRUNCATE ON public.families TO authenticated;
GRANT TRUNCATE ON public.forum_posts TO anon;
GRANT TRUNCATE ON public.forum_posts TO authenticated;
GRANT TRUNCATE ON public.forum_replies TO anon;
GRANT TRUNCATE ON public.forum_replies TO authenticated;
GRANT TRUNCATE ON public.login_events TO anon;
GRANT TRUNCATE ON public.login_events TO authenticated;
GRANT TRUNCATE ON public.mm_data TO anon;
GRANT TRUNCATE ON public.mm_data TO authenticated;
GRANT TRUNCATE ON public.payments TO anon;
GRANT TRUNCATE ON public.payments TO authenticated;
GRANT TRUNCATE ON public.plans TO anon;
GRANT TRUNCATE ON public.plans TO authenticated;
GRANT TRUNCATE ON public.profiles TO anon;
GRANT TRUNCATE ON public.profiles TO authenticated;
GRANT TRUNCATE ON public.push_subscriptions TO anon;
GRANT TRUNCATE ON public.push_subscriptions TO authenticated;
GRANT TRUNCATE ON public.question_reports TO anon;
GRANT TRUNCATE ON public.question_reports TO authenticated;
GRANT TRUNCATE ON public.referrals TO anon;
GRANT TRUNCATE ON public.referrals TO authenticated;
GRANT TRUNCATE ON public.schedule_entries TO anon;
GRANT TRUNCATE ON public.schedule_entries TO authenticated;
GRANT TRUNCATE ON public.student_assignments TO anon;
GRANT TRUNCATE ON public.student_assignments TO authenticated;
GRANT TRUNCATE ON public.student_progress TO anon;
GRANT TRUNCATE ON public.student_progress TO authenticated;
GRANT TRUNCATE ON public.student_sessions TO anon;
GRANT TRUNCATE ON public.student_sessions TO authenticated;
GRANT TRUNCATE ON public.students TO anon;
GRANT TRUNCATE ON public.students TO authenticated;
GRANT TRUNCATE ON public.study_schedules TO anon;
GRANT TRUNCATE ON public.study_schedules TO authenticated;
GRANT TRUNCATE ON public.subscriptions TO anon;
GRANT TRUNCATE ON public.subscriptions TO authenticated;
GRANT UPDATE ON public.assignment_submissions TO anon;
GRANT UPDATE ON public.assignment_submissions TO authenticated;
GRANT UPDATE ON public.classrooms TO anon;
GRANT UPDATE ON public.classrooms TO authenticated;
GRANT UPDATE ON public.enrollments TO anon;
GRANT UPDATE ON public.enrollments TO authenticated;
GRANT UPDATE ON public.families TO anon;
GRANT UPDATE ON public.families TO authenticated;
GRANT UPDATE ON public.forum_posts TO anon;
GRANT UPDATE ON public.forum_posts TO authenticated;
GRANT UPDATE ON public.forum_replies TO anon;
GRANT UPDATE ON public.forum_replies TO authenticated;
GRANT UPDATE ON public.login_events TO anon;
GRANT UPDATE ON public.login_events TO authenticated;
GRANT UPDATE ON public.mm_data TO anon;
GRANT UPDATE ON public.mm_data TO authenticated;
GRANT UPDATE ON public.payments TO anon;
GRANT UPDATE ON public.payments TO authenticated;
GRANT UPDATE ON public.plans TO anon;
GRANT UPDATE ON public.plans TO authenticated;
GRANT UPDATE ON public.profiles TO anon;
GRANT UPDATE ON public.profiles TO authenticated;
GRANT UPDATE ON public.push_subscriptions TO anon;
GRANT UPDATE ON public.push_subscriptions TO authenticated;
GRANT UPDATE ON public.question_reports TO anon;
GRANT UPDATE ON public.question_reports TO authenticated;
GRANT UPDATE ON public.referrals TO anon;
GRANT UPDATE ON public.referrals TO authenticated;
GRANT UPDATE ON public.schedule_entries TO anon;
GRANT UPDATE ON public.schedule_entries TO authenticated;
GRANT UPDATE ON public.student_assignments TO anon;
GRANT UPDATE ON public.student_assignments TO authenticated;
GRANT UPDATE ON public.student_progress TO anon;
GRANT UPDATE ON public.student_progress TO authenticated;
GRANT UPDATE ON public.student_sessions TO anon;
GRANT UPDATE ON public.student_sessions TO authenticated;
GRANT UPDATE ON public.students TO anon;
GRANT UPDATE ON public.students TO authenticated;
GRANT UPDATE ON public.study_schedules TO anon;
GRANT UPDATE ON public.study_schedules TO authenticated;
GRANT UPDATE ON public.subscriptions TO anon;
GRANT UPDATE ON public.subscriptions TO authenticated;