-- 1. Fix profiles SELECT policy - restrict to own profile
DROP POLICY "Users can view all profiles" ON profiles;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 2. Fix profiles UPDATE policy - prevent role mutation
DROP POLICY "Users can update their own profile" ON profiles;

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND role = (SELECT p.role FROM profiles p WHERE p.user_id = auth.uid())
  );

-- 3. Fix pickup_verifications SELECT - scope to own records
DROP POLICY "Authenticated users can view all verifications" ON pickup_verifications;

CREATE POLICY "NGOs can view their own verifications"
  ON pickup_verifications FOR SELECT
  TO authenticated
  USING (
    auth.uid() = ngo_user_id
    OR has_role(auth.uid(), 'restaurant'::app_role)
  );

-- 4. Make verification-photos bucket private
UPDATE storage.buckets
SET public = false
WHERE id = 'verification-photos';

-- 5. Fix storage SELECT policy
DROP POLICY "Anyone can view verification photos" ON storage.objects;

CREATE POLICY "Authenticated users can view verification photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'verification-photos');