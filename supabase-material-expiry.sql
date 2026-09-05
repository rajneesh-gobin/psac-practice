-- Add configurable link expiry to learning materials.
-- Idempotent — safe to run more than once.

ALTER TABLE public.learning_materials
  ADD COLUMN IF NOT EXISTS link_expiry_seconds integer NOT NULL DEFAULT 3600;

-- Backfill existing rows to 1 week (a more useful default than 1 hour)
UPDATE public.learning_materials
  SET link_expiry_seconds = 604800
  WHERE link_expiry_seconds = 3600;
