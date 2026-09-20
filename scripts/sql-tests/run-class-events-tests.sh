#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
#  The classroom calendar migration, proved on a throwaway postgres:17-alpine:
#    1. FRESH BUILD   supabase-schema.sql, then the migration, on an empty DB
#    2. IDEMPOTENCY   the migration applies a second time with no error
#    3. THE RULES     class-events-assert.sql (RLS as authenticated, the class
#                     page as service_role)
#
#  ⚠ Step 1 is the step the LIVE DATABASE CANNOT PERFORM FOR YOU. Applying the
#    file to production only ever proves it is idempotent against a database
#    that already has everything.
#  ⚠ Do not "simplify" a psql pipeline to `... | grep ... || true`. That
#    swallows psql's exit code and reports a failed build as a pass.
#
#  Run:  bash scripts/sql-tests/run-class-events-tests.sh
# ═══════════════════════════════════════════════════════════════════════════
set -euo pipefail
export MSYS_NO_PATHCONV=1

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
C=psac-classcal-test

SCHEMA="$ROOT/supabase-schema.sql"
M1="$ROOT/migrations/20260920_classroom_calendar.sql"
M2="$ROOT/migrations/20260920_classroom_worksheets.sql"

for f in "$SCHEMA" "$M1" "$M2"; do
  [ -f "$f" ] || { echo "FAIL: $f not found"; exit 1; }
done

# ⚠ MSYS_NO_PATHCONV=1 keeps Git Bash off the CONTAINER paths, but it also
#   stops it rewriting the HOST path into the Windows form docker needs.
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

docker cp "$(hostpath "$SCHEMA")"                          "$C":/schema.sql
docker cp "$(hostpath "$HERE/bootstrap.sql")"              "$C":/bootstrap.sql
docker cp "$(hostpath "$M1")"                              "$C":/m1.sql
docker cp "$(hostpath "$M2")"                              "$C":/m2.sql
docker cp "$(hostpath "$HERE/class-events-assert.sql")"    "$C":/events.sql

FAILS=0

run() {          # run <file> [label]
  local file="$1" label="${2:-$1}" out rc
  set +e
  out="$(docker exec "$C" psql -U postgres -d testdb -v ON_ERROR_STOP=1 -q -t -A \
          -c "SET search_path = public, extensions;" \
          -f "$file" 2>&1)"
  rc=$?
  set -e
  out="$(printf '%s\n' "$out" | sed 's/^psql:[^ ]*: //;s/^NOTICE:  //' \
          | grep -vE 'already exists, skipping|will create implicit' || true)"
  if [ $rc -ne 0 ]; then
    echo "  FAIL  $label exited $rc"
    printf '%s\n' "$out" | tail -25
    exit 1
  fi
  # The assertion files print PASS/FAIL lines of their own.
  printf '%s\n' "$out" | grep -E '^(PASS|FAIL)' || true
  if printf '%s\n' "$out" | grep -q '^FAIL'; then
    FAILS=$((FAILS + $(printf '%s\n' "$out" | grep -c '^FAIL')))
  fi
}

echo "── 1 · fresh build, then the migration ──"
docker exec "$C" psql -U postgres -q -c "DROP DATABASE IF EXISTS testdb;" \
                                   -c "CREATE DATABASE testdb;" >/dev/null
run /bootstrap.sql "bootstrap"
run /schema.sql    "supabase-schema.sql"
run /m1.sql        "20260920_classroom_calendar.sql"
run /m2.sql        "20260920_classroom_worksheets.sql"
echo "  ok    both migrations apply to a database built from nothing"

echo
echo "── 2 · idempotency ──"
run /m1.sql "20260920_classroom_calendar.sql (2nd run)"
run /m2.sql "20260920_classroom_worksheets.sql (2nd run)"
echo "  ok    both re-apply with no error"

echo
echo "── 3 · the classroom calendar ──"
run /events.sql "class-events-assert.sql"

echo
if [ "$FAILS" -ne 0 ]; then
  echo "FAILED: $FAILS assertion(s) failed."
  exit 1
fi
echo "All classroom-calendar assertions passed."
