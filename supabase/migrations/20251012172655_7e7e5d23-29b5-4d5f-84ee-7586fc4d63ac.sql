-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit brand inquiries" ON public.brand_inquiries;

-- Create a new permissive INSERT policy
CREATE POLICY "Anyone can submit brand inquiries"
ON public.brand_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);