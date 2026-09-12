-- APPLIED to production 2026-09-12. Re-applied to prove idempotency; proacl was
-- read on the live database afterwards, not inferred from this text.
--
-- RPC 1: single subject (the common case)
-- Called by workers/api/questions.js + netlify/functions/questions.js
-- _rpcGetSubjectQuestions() as the primary path. Filters and strips
-- answer/hint/explanation in SQL so the Worker does <3ms CPU.
--
-- RPC 2: whole grade batch (used by QuestionLoader.loadGrade)
--
-- ⚠ service_role ONLY, and that is the whole point. Both callers authenticate
--   with SUPABASE_SERVICE_ROLE_KEY (the `sbSrk` argument), and nothing in
--   engine/ calls these at all. The allowed/blocked chapter lists arrive as
--   PARAMETERS, so whoever can reach the function chooses its own entitlements:
--   granting anon/authenticated would have handed any browser holding the
--   public anon key the entire corpus for a grade, straight past the plan, the
--   admin kill switch, expiry and moderation blocks. See CLAUDE.md,
--   "Where each rule is ACTUALLY enforced".
-- ⚠ A newly created function inherits Supabase's default privileges INCLUDING
--   anon, and "revoke ... from public" does NOT drop that — it only removes the
--   =X PUBLIC entry. Hence the explicit "from public, anon, authenticated".
--   Verified on production after applying: proacl is
--   {postgres=X/postgres,service_role=X/postgres} on both, no =X PUBLIC entry.
--   Smoke-tested: service_role returns rows; the anon key gets 401 42501.
-- ⚠ search_path is pinned — a security-definer function without one is mutable.
--
-- ⚠ "acceptableAnswers" is deliberately NOT stripped. That matches the existing
--   _stripForClient() fallback key for key, and engine/app.js grades typed
--   answers locally from it. Changing it here would silently diverge the two
--   paths; it was not this migration's call to make.
--
-- ⚠ The jsonb predicates (data->>'chapterId') are kept as authored even though
--   indexed chapter_id / difficulty columns exist. Measured 2026-09-12 on
--   production: chapter_id and data->>'chapterId' agree on all 35,469 rows, and
--   difficulty disagrees on exactly the 194 past-paper rows this filter already
--   excludes — so swapping them is available and safe, but subject_id / (grade,
--   is_past_paper) are indexed and narrow the scan first.

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
set search_path = public, pg_temp
as $$
  select coalesce(
    jsonb_agg(
      case
        when data->>'type' in ('symmetry-line', 'expr', 'slots') then data
        else data - 'answer' - 'hint' - 'explanation'
      end
    ),
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

revoke execute on function get_questions_for_client(text, text, int, text[], text[]) from public, anon, authenticated;
grant  execute on function get_questions_for_client(text, text, int, text[], text[]) to service_role;

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
set search_path = public, pg_temp
as $$
  select coalesce(
    jsonb_object_agg(subject_id, qs),
    '{}'::jsonb
  )
  from (
    select
      subject_id,
      jsonb_agg(
        case
          when data->>'type' in ('symmetry-line', 'expr', 'slots') then data
          else data - 'answer' - 'hint' - 'explanation'
        end
      ) as qs
    from questions
    where grade = p_grade
      and is_past_paper = false
      and (p_blocked_subjects is null or subject_id != all(p_blocked_subjects))
      and (p_allowed_chapters is null or data->>'chapterId' = any(p_allowed_chapters))
      and (p_blocked_chapters is null or data->>'chapterId' != all(p_blocked_chapters))
    group by subject_id
  ) sub
$$;

revoke execute on function get_grade_questions_for_client(int, text[], text[], text[]) from public, anon, authenticated;
grant  execute on function get_grade_questions_for_client(int, text[], text[], text[]) to service_role;
