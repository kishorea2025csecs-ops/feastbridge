
-- Create pickup verifications table
CREATE TABLE public.pickup_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id TEXT NOT NULL,
  ngo_user_id UUID NOT NULL,
  ngo_name TEXT NOT NULL,
  truck_number_plate_url TEXT,
  driver_photo_url TEXT,
  needs_truck BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  restaurant_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pickup_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all verifications"
ON public.pickup_verifications FOR SELECT TO authenticated
USING (true);

CREATE POLICY "NGO users can insert their own verifications"
ON public.pickup_verifications FOR INSERT TO authenticated
WITH CHECK (auth.uid() = ngo_user_id);

CREATE POLICY "Restaurant users can update verification status"
ON public.pickup_verifications FOR UPDATE TO authenticated
USING (true);

-- Create storage bucket for verification photos
INSERT INTO storage.buckets (id, name, public) VALUES ('verification-photos', 'verification-photos', true);

CREATE POLICY "Authenticated users can upload verification photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'verification-photos');

CREATE POLICY "Anyone can view verification photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'verification-photos');
