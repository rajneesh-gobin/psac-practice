-- Fix: include answer/hint/explanation in question responses.
-- The previous RPC stripped these fields, breaking all games (isValidMCQ
-- requires answer) and hint/explanation display in practice mode.
-- ⚠ CREATE OR REPLACE is idempotent — safe to run whether or not the
--   previous migration was applied.

create or replace function get_questions_for_client(
  p_subject_id       text,
  p_chapter_id       text    default null,
  p_difficulty       int     default null,
  p_allowed_chapters text[]  default null,
  p_blocked_chapters text[]  default null
)
returns jsonb
language sql
security definer
stable
as $$
  select coalesce(
    jsonb_agg(data),
    '[]'::jsonb
  )
  from questions
  where subject_id = p_subject_id
    and is_past_paper = false
    and (p_chapter_id is null or data->>'chapterId' = p_chapter_id)
    and (p_difficulty is null or (data->>'difficulty')::int = p_difficulty)
    and (p_allowed_chapters is null or data->>'chapterId' = any(p_allowed_chapters))
    and (p_blocked_chapters is null or data->>'chapterId' != all(p_blocked_chapters))
$$;

grant execute on function get_questions_for_client(text, text, int, text[], text[]) to anon, authenticated;

create or replace function get_grade_questions_for_client(
  p_grade            int,
  p_allowed_chapters text[]  default null,
  p_blocked_chapters text[]  default null,
  p_blocked_subjects text[]  default null
)
returns jsonb
language sql
security definer
stable
as $$
  select coalesce(
    jsonb_object_agg(subject_id, qs),
    '{}'::jsonb
  )
  from (
    select
      subject_id,
      jsonb_agg(data) as qs
    from questions
    where grade = p_grade
      and is_past_paper = false
      and (p_blocked_subjects is null or subject_id != all(p_blocked_subjects))
      and (p_allowed_chapters is null or data->>'chapterId' = any(p_allowed_chapters))
      and (p_blocked_chapters is null or data->>'chapterId' != all(p_blocked_chapters))
    group by subject_id
  ) sub
$$;

grant execute on function get_grade_questions_for_client(int, text[], text[], text[]) to anon, authenticated;
