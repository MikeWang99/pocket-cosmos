-- Create the `student-work` storage bucket for free-response answer photos.
-- Without this bucket, client uploads fail with NoSuchBucket and the submit
-- button stays disabled forever.

INSERT INTO storage.buckets (id, name, public)
VALUES ('student-work', 'student-work', true)
ON CONFLICT (id) DO NOTHING;

-- Students can only write inside their own user folder: {user_id}/...
CREATE POLICY "sw_insert_own"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'student-work' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "sw_update_own"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'student-work' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "sw_delete_own"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'student-work' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Public read so teachers can open getPublicUrl links from the admin dashboard.
CREATE POLICY "sw_public_read"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'student-work');
