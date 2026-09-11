#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
#  Validates migrations/20260911_teacher_auto_approve.sql by building
#  supabase-schema.sql from nothing on a throwaway postgres:17-alpine,
#  applying the migration TWICE, and asserting behaviour as `authenticated`.
#
#    1. FRESH BUILD   the schema applies to an empty database
#    2. MIGRATION     the migration applies on top of it
#    3. IDEMPOTENCY   applying it a second time errors on nothing
#    4. SEED          one account per case, the switch OFF
#    5. BEHAVIOUR     teacher-approve-assert.sql
#
#  ⚠ Step 5 runs as `authenticated`, never as the superuser.
#  ⚠ Do not pipe psql through `grep ... || true` — that swallows psql's exit
#    code and reports a failed build as a pass.
#
#  Usage: scripts/sql-tests/run-teacher-approve-tests.sh
# ═══════════════════════════════════════════════════════════════════════════
set -euo pipefail
export MSYS_NO_PATHCONV=1

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
C=psac-teacher-approve-test
SCHEMA="$ROOT/supabase-schema.sql"
MIG="$ROOT/migrations/20260911_teacher_auto_approve.sql"

[ -f "$SCHEMA" ] || { echo "FAIL: $SCHEMA not found"; exit 1; }
[ -f "$MIG" ]    || { echo "FAIL: $MIG not found"; exit 1; }

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
docker cp "$(hostpath "$HERE/teacher-approve-seed.sql")"        "$C":/seed.sql
docker cp "$(hostpath "$HERE/teacher-approve-assert.sql")"      "$C":/assert.sql

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
run "Supabase default privileges" /defaults.sql
run "supabase-schema.sql from nothing" /schema.sql

echo
echo "2. the migration"
run "20260911_teacher_auto_approve.sql" /migration.sql

echo
echo "3. idempotency"
run "the same migration, applied again" /migration.sql

echo
echo "4. seed"
run "teacher-approve-seed.sql" /seed.sql

echo
echo "5. behaviour"
run "teacher-approve-assert.sql" /assert.sql show

echo
if [ "$FINDINGS" -gt 0 ]; then
  echo "$FINDINGS SECURITY FINDING(S) — someone can become a teacher without approval."
  exit 1
fi
if [ "$FAILURES" -gt 0 ]; then
  echo "$FAILURES assertion(s) failed."
  exit 1
fi
echo "Teacher auto-approval: schema builds, migration is idempotent, and the switch"
echo "approves only a verified, undecided applicant while an admin has it on."
