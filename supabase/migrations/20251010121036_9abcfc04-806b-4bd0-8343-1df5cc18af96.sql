-- Create table for brand inquiries
CREATE TABLE public.brand_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  brand_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  inquiry_message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.brand_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for brand inquiries
CREATE POLICY "Anyone can submit brand inquiries"
ON public.brand_inquiries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all brand inquiries"
ON public.brand_inquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));