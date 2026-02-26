-- Fix orders table RLS policies to prevent unauthorized access
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

-- Create new PERMISSIVE policies (default type) that properly combine with OR logic
-- This ensures admins can see all orders OR users can see their own orders
CREATE POLICY "Admins can view all orders"
ON orders
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view their own orders"
ON orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id AND user_id IS NOT NULL);

-- Add comment to document the security requirement
COMMENT ON POLICY "Users can view their own orders" ON orders IS 
'Restricts authenticated users to only view orders where they are the owner. NULL user_id orders are excluded to prevent data leakage.';