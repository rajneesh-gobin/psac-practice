#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
#  Tests supabase-schema.sql — the one consolidated schema file — by building
#  it from scratch on a throwaway postgres:17-alpine and asserting behaviour.
#
#  Four things are checked, in this order:
#    1. FRESH BUILD      the file applies top to bottom to an empty database
#    2. IDEMPOTENCY      applying it a second time errors on nothing
#    3. CO-PARENT RULES  coparent-assert.sql — who may see and act on a family
#    4. RETURNING RULE   families-returning-assert.sql — a parent can still
#                        CREATE a family, the regression that took family
#                        creation down for two days
#
#  ⚠ Steps 3 and 4 run as `authenticated`, never as the superuser. RLS does not
#    apply to a superuser or to a table's owner, so running them as postgres
#    made every "sees the row" assertion pass for a total stranger too.
#
#  ⚠ Step 1 is the step the LIVE DATABASE CANNOT PERFORM FOR YOU. Applying the
#    file to production only ever proves it is idempotent against a database
#    that already has everything; it cannot catch a forward reference. Both
#    ordering bugs this file has had — a foreign key emitted before its target's
#    primary key, and a column default calling a function not yet created —
#    were invisible until it was built from nothing.
#
#  ⚠ Do not "simplify" a psql pipeline here to `... | grep ... || true`. That
#    swallows psql's own exit code and reports a failed build as a pass, which
#    is the exact shape of bug this file exists to catch.
#
#  ⚠ A line reading SECURITY FINDING fails the suite deliberately. One stands
#    today: families_own lets an invited co-parent re-point parent_id at
#    themselves and own the family. See the end of supabase-schema.sql.
#
#  Usage: scripts/sql-tests/run-schema-tests.sh
# ═══════════════════════════════════════════════════════════════════════════
set -euo pipefail
export MSYS_NO_PATHCONV=1

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
C=psac-schema-test
SCHEMA="$ROOT/supabase-schema.sql"

[ -f "$SCHEMA" ] || { echo "FAIL: $SCHEMA not found"; exit 1; }

# ⚠ MSYS_NO_PATHCONV=1 is needed so Git Bash leaves the CONTAINER paths alone,
#   but it also stops it rewriting the HOST path into the Windows form the
#   docker binary needs, which fails as "CreateFile D:\d:". Convert explicitly.
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

docker cp "$(hostpath "$SCHEMA")"                             "$C":/schema.sql
docker cp "$(hostpath "$HERE/bootstrap.sql")"                 "$C":/bootstrap.sql
docker cp "$(hostpath "$HERE/coparent-seed.sql")"             "$C":/coparent-seed.sql
docker cp "$(hostpath "$HERE/coparent-assert.sql")"           "$C":/coparent-assert.sql
docker cp "$(hostpath "$HERE/families-returning-seed.sql")"   "$C":/fr-seed.sql
docker cp "$(hostpath "$HERE/families-returning-assert.sql")" "$C":/fr-assert.sql

# Run psql and FAIL LOUDLY. Output is captured, not piped, so pipefail cannot
# be defeated and psql's exit status is the one that decides.
FINDINGS=0

run() {          # run <db> <file> [grep-filter]
  local db="$1" file="$2" filter="${3:-}" out rc
  set +e
  out="$(docker exec "$C" psql -U postgres -d "$db" -v ON_ERROR_STOP=1 -q -t -A \
          -c "SET search_path = public, extensions;" \
          -f "$file" 2>&1)"
  rc=$?
  set -e
  out="$(printf '%s\n' "$out" | sed 's/^psql:[^ ]*: //;s/^NOTICE:  //' \
          | grep -vE 'already exists, skipping' || true)"
  if [ $rc -ne 0 ]; then
    echo "  FAIL  $file exited $rc"
    printf '%s\n' "$out" | tail -20
    exit 1
  fi
  if printf '%s\n' "$out" | grep -q 'SECURITY FINDING'; then
    FINDINGS=$((FINDINGS + 1))
  fi
  if [ -n "$filter" ]; then
    printf '%s\n' "$out" | grep -E "$filter" || true
  fi
}

build() {        # build <dbname>
  docker exec "$C" psql -U postgres -q -c "DROP DATABASE IF EXISTS $1;" \
                                     -c "CREATE DATABASE $1;" >/dev/null
  run "$1" /bootstrap.sql
  run "$1" /schema.sql
}

echo ''
echo '=== 1. FRESH BUILD — supabase-schema.sql on an empty database ==='
build fresh
echo '  ok   applied top to bottom with no error'

echo ''
echo '=== 2. IDEMPOTENCY — the same file, applied again ==='
run fresh /schema.sql
echo '  ok   re-applied with no error'

echo ''
echo '=== 3. CO-PARENT ACCESS RULES ==='
build coparent
run coparent /coparent-seed.sql
run coparent /coparent-assert.sql '===|ok |FAIL|ERROR|SECURITY FINDING'

echo ''
echo '=== 4. A PARENT CAN STILL CREATE A FAMILY (INSERT ... RETURNING) ==='
build families
run families /fr-seed.sql
run families /fr-assert.sql '===|ok |FAIL|ERROR|SECURITY FINDING'

echo ''
if [ "$FINDINGS" -gt 0 ]; then
  echo "SCHEMA BUILDS AND IS IDEMPOTENT, but $FINDINGS SECURITY FINDING(S) stand."
  echo 'The schema file is correct — it reproduces production faithfully. What it'
  echo 'reproduces is a policy that lets an invited co-parent take over a family.'
  echo 'The one-line fix is written out, unapplied, at the end of'
  echo 'supabase-schema.sql. Applying it changes a live policy, so it is a'
  echo 'decision for the account owner, not something a schema dump should do.'
  exit 1
fi
echo 'ALL SCHEMA TESTS PASSED'
