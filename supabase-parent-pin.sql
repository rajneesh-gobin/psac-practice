-- Parent PIN database backup.
-- Run once in Supabase SQL Editor.  Additive — no existing data or policy changed.
-- After applying, parents who save or re-save their PIN will have a SHA-256
-- hash stored here.  The app reads it as a fallback when localStorage is empty.
BEGIN;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS parent_pin_hash text;
COMMIT;
