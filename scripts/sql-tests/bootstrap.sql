-- ═══════════════════════════════════════════════════════════════════════════
--  Supabase stand-in, so supabase-schema.sql can be applied to a throwaway
--  postgres:17-alpine and tested for real.
--
--  This creates ONLY what Supabase itself provides and the schema depends on:
--  three roles, the auth and storage schemas, auth.uid(), auth.users, and the
--  two storage tables. Everything else must come from supabase-schema.sql —
--  that is the whole point of the test. Do not add an application table here.
--
--  ⚠ auth.uid() reads the test.uid GUC first so an assertion file can switch
--    identity with SET test.uid. It falls back to the real JWT claim so the
--    stub still behaves like production for anything that does not set it.
-- ═══════════════════════════════════════════════════════════════════════════

DO $b$ BEGIN CREATE ROLE anon          NOLOGIN NOINHERIT; EXCEPTION WHEN duplicate_object THEN NULL; END $b$;
DO $b$ BEGIN CREATE ROLE authenticated NOLOGIN NOINHERIT; EXCEPTION WHEN duplicate_object THEN NULL; END $b$;
DO $b$ BEGIN CREATE ROLE service_role  NOLOGIN NOINHERIT BYPASSRLS; EXCEPTION WHEN duplicate_object THEN NULL; END $b$;

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS storage;
GRANT USAGE ON SCHEMA public, extensions, auth, storage TO anon, authenticated, service_role;

CREATE TABLE IF NOT EXISTS auth.users (
  id    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  email_confirmed_at timestamptz
);

CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
LANGUAGE sql STABLE AS $f$
  SELECT COALESCE(
    NULLIF(current_setting('test.uid', true), '')::uuid,
    NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid
  );
$f$;

CREATE OR REPLACE FUNCTION auth.role() RETURNS text
LANGUAGE sql STABLE AS $f$
  SELECT current_setting('request.jwt.claim.role', true);
$f$;

CREATE TABLE IF NOT EXISTS storage.buckets (
  id                text PRIMARY KEY,
  name              text NOT NULL,
  public            boolean DEFAULT false,
  file_size_limit   bigint,
  allowed_mime_types text[]
);

CREATE TABLE IF NOT EXISTS storage.objects (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_id text REFERENCES storage.buckets(id),
  name      text,
  owner     uuid,
  metadata  jsonb
);
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
