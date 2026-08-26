-- Plan features upsert + global enforcement toggle
-- Run once in Supabase SQL Editor AFTER supabase-rls-migration.sql

-- Free plan: cap-limited, admin configures allowed_chapters via the Plans tab UI
UPDATE plans SET features = jsonb_build_object(
  'allowed_chapters',    null,
  'daily_question_cap',  20,
  'weekly_exam_cap',     1,
  'hints_per_question',  3,
  'printable_papers',    false,
  'advanced_analytics',  false,
  'push_reminders',      false,
  'timetable_generator', false,
  'weekly_digest',       false,
  'tutor_status',        false,
  'early_access',        false,
  'max_children',        1
) WHERE id = 'free';

-- Starter plan: all chapters, increased limits
UPDATE plans SET features = jsonb_build_object(
  'allowed_chapters',    null,
  'daily_question_cap',  null,
  'weekly_exam_cap',     null,
  'hints_per_question',  null,
  'printable_papers',    true,
  'advanced_analytics',  true,
  'push_reminders',      true,
  'timetable_generator', true,
  'weekly_digest',       false,
  'tutor_status',        false,
  'early_access',        false,
  'max_children',        2
) WHERE id = 'starter';

-- Premium plan: all chapters, all features
UPDATE plans SET features = jsonb_build_object(
  'allowed_chapters',    null,
  'daily_question_cap',  null,
  'weekly_exam_cap',     null,
  'hints_per_question',  null,
  'printable_papers',    true,
  'advanced_analytics',  true,
  'push_reminders',      true,
  'timetable_generator', true,
  'weekly_digest',       true,
  'tutor_status',        true,
  'early_access',        true,
  'max_children',        5
) WHERE id = 'premium';

-- Add plan_enforcement_enabled flag to global_settings (OFF = free period, no restrictions).
-- Uses || merge so existing keys (disabled_grades, registration_open, etc.) are preserved.
INSERT INTO mm_data (key, value)
VALUES ('global_settings', jsonb_build_object(
  'disabled_grades',          '[]'::jsonb,
  'disabled_subjects',        '[]'::jsonb,
  'disabled_chapters',        '[]'::jsonb,
  'registration_open',        true,
  'plan_enforcement_enabled', false
))
ON CONFLICT (key) DO UPDATE
  SET value = mm_data.value || jsonb_build_object('plan_enforcement_enabled', false);
