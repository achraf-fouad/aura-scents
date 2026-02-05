-- Add policy to allow service role to manage products (for admin operations)
CREATE POLICY "Service role can manage products" 
ON public.products 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);