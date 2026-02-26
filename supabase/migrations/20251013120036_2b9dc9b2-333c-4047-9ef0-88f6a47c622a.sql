-- Create business_registrations table
CREATE TABLE public.business_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT NOT NULL,
  business_size TEXT NOT NULL,
  annual_revenue TEXT NOT NULL,
  website TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert business registrations
CREATE POLICY "Anyone can submit business registrations"
ON public.business_registrations
FOR INSERT
WITH CHECK (true);

-- Allow admins to view all business registrations
CREATE POLICY "Admins can view all business registrations"
ON public.business_registrations
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));





-- Special_offer table 
-- Creating the Special Offer Products table
CREATE TABLE special_offer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  discounted_price NUMERIC(10, 2) NOT NULL CHECK (discounted_price >= 0),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE special_offer ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Admins can create special offer products" ON special_offer;

CREATE POLICY "Admins can create special offer products"
ON special_offer
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));


CREATE POLICY "Admins can insert/update/delete"
ON special_offer
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));




CREATE POLICY "Authenticated users can view special_offer"
ON special_offer
FOR SELECT
TO authenticated
USING (true);




-- Creattion of wishlist for the user 
-- Wishlist table
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, product_id)  -- Prevents duplicate wishlist entries per user
);

CREATE POLICY "Users can insert their wishlist"
ON public.wishlist
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Users can view their wishlist"
ON public.wishlist
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);


CREATE POLICY "Users can delete their wishlist"
ON public.wishlist
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);


