#!/usr/bin/env bash
# Applies supabase-coparent.sql to a throwaway postgres:16-alpine loaded with
# the live function bodies and policy shapes, then asserts the access rules.
#
# ⚠ The assertions run as `authenticated`, never as the superuser: RLS does not
#   apply to a superuser, which made every "can see the row" check pass for a
#   total stranger the first time this was written.
set -euo pipefail
export MSYS_NO_PATHCONV=1
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
C=psac-coparent-test

docker rm -f "$C" >/dev/null 2>&1 || true
docker run -d --name "$C" -e POSTGRES_PASSWORD=pw -e POSTGRES_DB=app postgres:16-alpine >/dev/null
for _ in $(seq 1 40); do docker exec "$C" pg_isready -U postgres -d app >/dev/null 2>&1 && break; sleep 0.5; done

docker cp "$HERE/coparent-fixture.sql" "$C":/f.sql
docker cp "$ROOT/supabase-coparent.sql" "$C":/m.sql
docker cp "$HERE/coparent-assert.sql"  "$C":/a.sql

docker exec "$C" psql -U postgres -d app -v ON_ERROR_STOP=1 -q -f /f.sql
docker exec "$C" psql -U postgres -d app -v ON_ERROR_STOP=1 -f /m.sql 2>&1 | grep -E 'NOTICE|ERROR' | sed 's/^psql:[^ ]*: //'
docker exec "$C" psql -U postgres -d app -v ON_ERROR_STOP=1 -q -t -A -f /a.sql 2>&1 \
  | sed 's/^psql:[^ ]*: //;s/^NOTICE:  //' | grep -E '===|ok |FAIL|ERROR|ALL CO-PARENT'

docker rm -f "$C" >/dev/null
