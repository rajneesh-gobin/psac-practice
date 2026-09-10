#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
#  The two migrations of 2026-09-10, applied to a real postgres.
#
#    migrations/20260910_guest_device_cap.sql
#    migrations/20260910_classroom_materials_library.sql
#
#  Four things are checked, in this order:
#    1. FRESH BUILD   supabase-schema.sql applies to an empty database, then
#                     both migrations apply on top of it
#    2. IDEMPOTENCY   both migrations apply a SECOND time with no error
#    3. THE CAP       device-cap-assert.sql — the rule, exercised end to end
#    4. THE LIBRARY   materials-library-assert.sql — codes, and what the
#                     public resolver will and will not give away
#
#  ⚠ Step 1 is the step the LIVE DATABASE CANNOT PERFORM FOR YOU. Applying a
#    migration to production only proves it works against a database that
#    already has everything. A DROP FUNCTION naming an arity that never
#    existed, or a CREATE referring to a column added later in the same file,
#    is invisible there and fatal here.
#
#  ⚠ Do not "simplify" a psql pipeline to `... | grep ... || true`. That
#    swallows psql's exit code and reports a failed build as a pass.
#
#  Usage: scripts/sql-tests/run-device-cap-tests.sh
# ═══════════════════════════════════════════════════════════════════════════
set -euo pipefail
export MSYS_NO_PATHCONV=1

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
C=psac-devcap-test

SCHEMA="$ROOT/supabase-schema.sql"
M1="$ROOT/migrations/20260910_guest_device_cap.sql"
M2="$ROOT/migrations/20260910_classroom_materials_library.sql"

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

docker cp "$(hostpath "$SCHEMA")"                              "$C":/schema.sql
docker cp "$(hostpath "$HERE/bootstrap.sql")"                  "$C":/bootstrap.sql
docker cp "$(hostpath "$M1")"                                  "$C":/m1.sql
docker cp "$(hostpath "$M2")"                                  "$C":/m2.sql
docker cp "$(hostpath "$HERE/device-cap-assert.sql")"          "$C":/cap.sql
docker cp "$(hostpath "$HERE/materials-library-assert.sql")"   "$C":/lib.sql

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

echo "── 1 · fresh build, then both migrations ──"
docker exec "$C" psql -U postgres -q -c "DROP DATABASE IF EXISTS testdb;" \
                                   -c "CREATE DATABASE testdb;" >/dev/null
run /bootstrap.sql "bootstrap"
run /schema.sql    "supabase-schema.sql"
run /m1.sql        "20260910_guest_device_cap.sql"
run /m2.sql        "20260910_classroom_materials_library.sql"
echo "  ok    both migrations apply to a database built from nothing"

echo
echo "── 2 · idempotency ──"
run /m1.sql "20260910_guest_device_cap.sql (2nd run)"
run /m2.sql "20260910_classroom_materials_library.sql (2nd run)"
echo "  ok    both re-apply with no error"

echo
echo "── 3 · the device cap ──"
run /cap.sql "device-cap-assert.sql"

echo
echo "── 4 · the class library ──"
run /lib.sql "materials-library-assert.sql"

echo
if [ "$FAILS" -ne 0 ]; then
  echo "FAILED: $FAILS assertion(s) failed."
  exit 1
fi
echo "PASSED: both migrations build, re-apply and behave."
