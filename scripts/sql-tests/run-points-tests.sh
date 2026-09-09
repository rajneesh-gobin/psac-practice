#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
#  Validates migrations/20260909_points_and_leaderboard.sql by building
#  supabase-schema.sql from nothing on a throwaway postgres:17-alpine, applying
#  the migration TWICE, and asserting behaviour as `anon` with a real
#  x-student-token session.
#
#  Six things are checked, in this order:
#    1. FRESH BUILD   the schema applies to an empty database
#    2. SEED          families, students, questions and sessions — BEFORE the
#                     migration, so its legacy carry-over has something to find
#    3. MIGRATION     the migration applies on top of the schema
#    4. IDEMPOTENCY   applying it a second time errors on nothing AND does not
#                     pay the legacy carry-over twice
#    5. BEHAVIOUR     points-assert.sql
#
#  ⚠ Step 5 runs as `anon`, never as the superuser. A child session IS anon plus
#    a token header; RLS and the grants are half of what is being tested and a
#    superuser is subject to neither.
#
#  ⚠ Nothing is stubbed. The seed inserts real student_sessions rows and the
#    assertions set request.headers, so the REAL current_student_id() does the
#    sha256 lookup it does in production.
#
#  ⚠ A line reading SECURITY FINDING fails the suite deliberately.
#
#  ⚠ Do not pipe psql through `grep ... || true` — that swallows psql's exit
#    code and reports a failed build as a pass.
#
#  Usage: scripts/sql-tests/run-points-tests.sh
# ═══════════════════════════════════════════════════════════════════════════
set -euo pipefail
export MSYS_NO_PATHCONV=1

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
C=psac-points-test
SCHEMA="$ROOT/supabase-schema.sql"
MIG="$ROOT/migrations/20260909_points_and_leaderboard.sql"

[ -f "$SCHEMA" ] || { echo "FAIL: $SCHEMA not found"; exit 1; }
[ -f "$MIG" ]    || { echo "FAIL: $MIG not found"; exit 1; }

# MSYS_NO_PATHCONV=1 leaves CONTAINER paths alone but also stops Git Bash
# rewriting the HOST path into the Windows form docker needs.
hostpath() {
  if command -v cygpath >/dev/null 2>&1; then cygpath -w "$1"; else printf '%s' "$1"; fi
}

cleanup() { docker rm -f "$C" >/dev/null 2>&1 || true; }
trap cleanup EXIT

docker rm -f "$C" >/dev/null 2>&1 || true
docker run -d --name "$C" -e POSTGRES_PASSWORD=pw -e POSTGRES_DB=postgres \
  postgres:17-alpine >/dev/null
for _ in $(seq 1 60); do
  docker exec "$C" pg_isready -U postgres >/dev/null 2>&1 && break; sleep 0.5
done

docker cp "$(hostpath "$SCHEMA")"                               "$C":/schema.sql
docker cp "$(hostpath "$HERE/bootstrap.sql")"                   "$C":/bootstrap.sql
docker cp "$(hostpath "$HERE/supabase-default-privileges.sql")" "$C":/defaults.sql
docker cp "$(hostpath "$MIG")"                                  "$C":/migration.sql
docker cp "$(hostpath "$HERE/known-dump-gaps.sql")"           "$C":/gaps.sql
docker cp "$(hostpath "$HERE/points-seed.sql")"                 "$C":/seed.sql
docker cp "$(hostpath "$HERE/points-assert.sql")"               "$C":/assert.sql

FAILURES=0
FINDINGS=0

run() {          # run <label> <file> [show]
  local label="$1" file="$2" show="${3:-}" out rc
  set +e
  out="$(docker exec "$C" psql -U postgres -d postgres -v ON_ERROR_STOP=1 -q -t -A \
          -c "SET search_path = public, extensions;" -f "$file" 2>&1)"
  rc=$?
  set -e
  out="$(printf '%s\n' "$out" | sed 's/^psql:[^ ]*: //;s/^NOTICE:  //' \
          | grep -vE 'already exists, skipping|^$' || true)"
  if [ $rc -ne 0 ]; then
    echo "  FAIL  $label exited $rc"
    printf '%s\n' "$out" | tail -25
    exit 1
  fi
  echo "  ok    $label"
  if [ -n "$show" ]; then
    printf '%s\n' "$out" | sed 's/^/     /'
    FAILURES=$(( FAILURES + $(printf '%s\n' "$out" | grep -c '^FAIL' || true) ))
    FINDINGS=$(( FINDINGS + $(printf '%s\n' "$out" | grep -c 'SECURITY FINDING' || true) ))
  fi
}

echo
echo "1. fresh build"
run "bootstrap (Supabase stand-in)" /bootstrap.sql
# ⚠ BEFORE the schema, so tables created by it inherit the same over-generous
#   grants production hands out. Without this the "no direct write grant"
#   assertion passes locally while production has exactly that grant.
run "Supabase default privileges" /defaults.sql
# ⚠ NOT part of the schema. See known-dump-gaps.sql: the dump references a
#   sequence it never creates, so it cannot build from nothing today. This is a
#   pre-existing defect in scripts/dump-schema.js, unrelated to the migration
#   under test, and it blocks the question-progress harness identically.
run "known dump gaps (see the file — these are bugs)" /gaps.sql
run "supabase-schema.sql from nothing" /schema.sql

echo
echo "2. seed (before the migration, so the carry-over has work to do)"
run "points-seed.sql" /seed.sql

echo
echo "3. the migration"
run "20260909_points_and_leaderboard.sql" /migration.sql

echo
echo "4. idempotency"
run "the same migration, applied again" /migration.sql

echo
echo "5. behaviour"
run "assertions" /assert.sql show

echo
if [ "$FAILURES" -gt 0 ] || [ "$FINDINGS" -gt 0 ]; then
  echo "RESULT: $FAILURES failed assertion(s), $FINDINGS security finding(s)"
  exit 1
fi
echo "RESULT: all assertions passed"
