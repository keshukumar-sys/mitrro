-- Allow authenticated users to insert their own login logs
CREATE POLICY "Users can insert their own login logs"
ON public.login_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);