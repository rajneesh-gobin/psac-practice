-- Run in Supabase SQL editor.
-- Creates the question-images storage bucket for admin-uploaded images.

INSERT INTO storage.buckets (id, name, public)
VALUES ('question-images', 'question-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated admin users to upload images
CREATE POLICY "admins can upload question images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'question-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Public read — images embedded in questions must load for all students
CREATE POLICY "public can view question images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'question-images');
