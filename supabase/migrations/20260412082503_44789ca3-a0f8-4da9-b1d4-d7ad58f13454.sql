
DROP POLICY "Restaurant users can update verification status" ON public.pickup_verifications;

CREATE POLICY "Restaurant users can update verification status"
ON public.pickup_verifications FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'restaurant'));
