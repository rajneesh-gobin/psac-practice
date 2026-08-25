-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Creates the push_subscriptions table for Web Push notifications

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id             uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id     uuid    NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subscription   jsonb   NOT NULL,
  reminder_time  text,   -- "HH:MM" in Mauritius time (UTC+4), e.g. "18:00"
  created_at     timestamptz DEFAULT now(),
  UNIQUE(student_id)     -- one subscription row per student
);

-- Row Level Security (service role key bypasses RLS in Netlify functions)
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
