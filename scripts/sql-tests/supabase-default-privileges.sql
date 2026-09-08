-- Supabase's DEFAULT PRIVILEGES for the public schema, which a throwaway
-- postgres:17-alpine does not have.
--
-- WHY THIS FILE EXISTS
-- Measured on production 2026-09-08: a new table in `public` inherits grants
-- that give anon and authenticated DELETE, INSERT, REFERENCES, SELECT, TRIGGER,
-- TRUNCATE and UPDATE. `GRANT SELECT ... TO anon` therefore does NOT produce a
-- read-only table — it adds a privilege that was already there and leaves the
-- write ones untouched. Only an explicit REVOKE removes them.
--
-- The local schema test could not see any of that: on a bare Postgres a new
-- table starts with no grants at all, so "no direct write grant to anon"
-- passed while production had exactly that grant. This file makes the
-- throwaway database behave like the real one, so the assertion is worth
-- something.
--
-- ⚠ Applied to its own test runner only, not to the shared bootstrap.sql,
--   so the existing schema suite keeps the ground it was written against.

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT EXECUTE ON FUNCTIONS TO anon, authenticated, service_role;
