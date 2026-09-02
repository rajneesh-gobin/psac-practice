#!/usr/bin/env bash
# Applies supabase-families-returning.sql to a throwaway postgres:16-alpine whose
# families_own policy is in the state supabase-coparent.sql left production in,
# then asserts that creating a family works again and that nothing widened.
#
# ⚠ The assertions run as `authenticated`, never as the superuser: RLS does not
#   apply to a superuser, which would make every check pass vacuously.
# ⚠ docker cp is given REPO-RELATIVE paths. Docker Desktop does not understand
#   an MSYS absolute path like /d/git-repo/..., it reads it as D:\d, and the run
#   dies with "CreateFile D:\d" before a single statement executes.
set -euo pipefail
export MSYS_NO_PATHCONV=1
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
REL=scripts/sql-tests
C=psac-families-returning-test
cd "$ROOT"

cleanup() { docker rm -f "$C" >/dev/null 2>&1 || true; }
trap cleanup EXIT

docker rm -f "$C" >/dev/null 2>&1 || true
docker run -d --name "$C" -e POSTGRES_PASSWORD=pw -e POSTGRES_DB=app postgres:16-alpine >/dev/null
for _ in $(seq 1 60); do docker exec "$C" pg_isready -U postgres -d app >/dev/null 2>&1 && break; sleep 0.5; done

docker cp "$REL/families-returning-fixture.sql" "$C":/f.sql
docker cp "$REL/families-returning-pre.sql"     "$C":/pre.sql
docker cp supabase-families-returning.sql       "$C":/m.sql
docker cp "$REL/families-returning-assert.sql"  "$C":/a.sql

docker exec "$C" psql -U postgres -d app -v ON_ERROR_STOP=1 -q -f /f.sql

echo "=== before the fix: plain INSERT works, INSERT..RETURNING does not ==="
docker exec "$C" psql -U postgres -d app -v ON_ERROR_STOP=1 -q -f /pre.sql 2>&1 \
  | sed 's/^psql:[^ ]*: //;s/^NOTICE:  //' | grep -E 'PRE|ERROR'

echo "=== applying supabase-families-returning.sql ==="
docker exec "$C" psql -U postgres -d app -v ON_ERROR_STOP=1 -f /m.sql 2>&1 \
  | grep -E 'NOTICE|WARNING|ERROR' | sed 's/^psql:[^ ]*: //;s/^NOTICE:  //'

docker exec "$C" psql -U postgres -d app -v ON_ERROR_STOP=1 -q -t -A -f /a.sql 2>&1 \
  | sed 's/^psql:[^ ]*: //;s/^NOTICE:  //' | grep -E '===|ok |FAIL|ERROR'

echo "=== re-running it must be a no-op ==="
docker exec "$C" psql -U postgres -d app -v ON_ERROR_STOP=1 -f /m.sql 2>&1 \
  | sed 's/^psql:[^ ]*: //;s/^NOTICE:  //' \
  | grep -E 'skip: the USING clause already answers the owner' \
  || { echo "  FAIL the repair is not idempotent"; exit 1; }

echo ""
echo "ALL FAMILIES-RETURNING CHECKS PASSED"
