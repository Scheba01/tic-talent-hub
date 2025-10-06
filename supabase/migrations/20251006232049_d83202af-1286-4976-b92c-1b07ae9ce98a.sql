-- Phase 1: Restrict data_classification table access to admins only
DROP POLICY IF EXISTS "Everyone can view data classification" ON public.data_classification;

CREATE POLICY "Only admins can view data classification"
ON public.data_classification
FOR SELECT
USING (public.is_admin_or_staff(auth.uid()));

-- Phase 2: Add DELETE policy for candidates table
CREATE POLICY "Users can delete their own candidate data"
ON public.candidates
FOR DELETE
USING (auth.uid() = user_id);

-- Phase 3: Add DELETE policy for profiles table
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Phase 4: Add UPDATE and DELETE policies for all candidate-related tables
-- candidate_role_families
CREATE POLICY "Users can update their own role families"
ON public.candidate_role_families
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own role families"
ON public.candidate_role_families
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_sectors
CREATE POLICY "Users can update their own sectors"
ON public.candidate_sectors
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own sectors"
ON public.candidate_sectors
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_competencies
CREATE POLICY "Users can update their own competencies"
ON public.candidate_competencies
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own competencies"
ON public.candidate_competencies
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_languages
CREATE POLICY "Users can update their own languages"
ON public.candidate_languages
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own languages"
ON public.candidate_languages
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_experience
CREATE POLICY "Users can update their own experience"
ON public.candidate_experience
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own experience"
ON public.candidate_experience
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_laboratory
CREATE POLICY "Users can update their own laboratory data"
ON public.candidate_laboratory
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own laboratory data"
ON public.candidate_laboratory
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_inspection
CREATE POLICY "Users can update their own inspection data"
ON public.candidate_inspection
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own inspection data"
ON public.candidate_inspection
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_cert_sistemas
CREATE POLICY "Users can update their own cert sistemas data"
ON public.candidate_cert_sistemas
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own cert sistemas data"
ON public.candidate_cert_sistemas
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_cert_productos
CREATE POLICY "Users can update their own cert productos data"
ON public.candidate_cert_productos
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own cert productos data"
ON public.candidate_cert_productos
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_cert_personas
CREATE POLICY "Users can update their own cert personas data"
ON public.candidate_cert_personas
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own cert personas data"
ON public.candidate_cert_personas
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_auditoria
CREATE POLICY "Users can update their own auditoria data"
ON public.candidate_auditoria
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own auditoria data"
ON public.candidate_auditoria
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_comercial
CREATE POLICY "Users can update their own comercial data"
ON public.candidate_comercial
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own comercial data"
ON public.candidate_comercial
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_operaciones
CREATE POLICY "Users can update their own operaciones data"
ON public.candidate_operaciones
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own operaciones data"
ON public.candidate_operaciones
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_legal
CREATE POLICY "Users can update their own legal data"
ON public.candidate_legal
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own legal data"
ON public.candidate_legal
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_hse
CREATE POLICY "Users can update their own hse data"
ON public.candidate_hse
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own hse data"
ON public.candidate_hse
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_ti
CREATE POLICY "Users can update their own ti data"
ON public.candidate_ti
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own ti data"
ON public.candidate_ti
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_pmo
CREATE POLICY "Users can update their own pmo data"
ON public.candidate_pmo
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own pmo data"
ON public.candidate_pmo
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_direccion
CREATE POLICY "Users can update their own direccion data"
ON public.candidate_direccion
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own direccion data"
ON public.candidate_direccion
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_supply_chain
CREATE POLICY "Users can update their own supply chain data"
ON public.candidate_supply_chain
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own supply chain data"
ON public.candidate_supply_chain
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- candidate_atencion_cliente
CREATE POLICY "Users can update their own atencion cliente data"
ON public.candidate_atencion_cliente
FOR UPDATE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own atencion cliente data"
ON public.candidate_atencion_cliente
FOR DELETE
USING (candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid()));

-- Phase 5: Fix search_path on functions to prevent schema poisoning attacks
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nombre_completo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', NEW.email)
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_candidate_table_access()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.audit_candidate_access(
    COALESCE(NEW.id, OLD.id),
    TG_OP
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;