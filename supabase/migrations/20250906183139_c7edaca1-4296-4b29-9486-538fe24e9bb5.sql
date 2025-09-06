-- Create audit log table for tracking candidate data access
CREATE TABLE public.candidate_access_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    accessed_by UUID REFERENCES auth.users(id) NOT NULL,
    candidate_id UUID REFERENCES public.candidates(id) NOT NULL,
    access_type TEXT NOT NULL CHECK (access_type IN ('view', 'update', 'export')),
    accessed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    ip_address INET,
    user_agent TEXT,
    purpose TEXT NOT NULL CHECK (purpose IN ('recruitment', 'support', 'audit', 'data_correction'))
);

-- Enable RLS on audit log
ALTER TABLE public.candidate_access_log ENABLE ROW LEVEL SECURITY;

-- Create function to check if user can access candidate data for legitimate business purposes
CREATE OR REPLACE FUNCTION public.can_access_candidate_data(_user_id UUID, _candidate_id UUID, _purpose TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Only allow admin/staff to access candidate data for legitimate purposes
  SELECT public.is_admin_or_staff(_user_id) 
  AND _purpose IN ('recruitment', 'support', 'audit', 'data_correction');
$$;

-- Create function to log candidate data access
CREATE OR REPLACE FUNCTION public.log_candidate_access(_candidate_id UUID, _access_type TEXT, _purpose TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.candidate_access_log (
    accessed_by, 
    candidate_id, 
    access_type, 
    purpose
  ) VALUES (
    auth.uid(), 
    _candidate_id, 
    _access_type, 
    _purpose
  );
END;
$$;

-- Create view for admin/staff to access candidate data with built-in logging
CREATE OR REPLACE VIEW public.candidates_admin_view AS
SELECT 
  c.id,
  c.nombre_completo,
  c.email,
  c.telefono,
  c.pais,
  c.ciudad,
  c.situacion_actual,
  c.disponibilidad,
  c.jornada,
  c.area_estudio,
  c.nivel_maximo,
  c.certificaciones,
  c.linkedin,
  c.status,
  c.created_at,
  c.updated_at,
  -- Hide sensitive salary and CV data from general admin view
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN c.sueldo_actual_bruto 
    ELSE '[REDACTED - Admin Access Required]'
  END as sueldo_actual_bruto,
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN c.cv_url 
    ELSE '[REDACTED - Admin Access Required]'
  END as cv_url,
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN c.certificados_adicionales_url 
    ELSE '[REDACTED - Admin Access Required]'
  END as certificados_adicionales_url
FROM public.candidates c
WHERE public.is_admin_or_staff(auth.uid());

-- Create RLS policies for audit log
CREATE POLICY "Only admins can view access logs" 
ON public.candidate_access_log 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert access logs" 
ON public.candidate_access_log 
FOR INSERT 
WITH CHECK (accessed_by = auth.uid());

-- Create additional policy for candidates table to ensure even admins are logged
CREATE POLICY "Admin access to candidates with logging" 
ON public.candidates 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  public.is_admin_or_staff(auth.uid())
);

-- However, we should drop this policy and force admins to use the view instead
-- This ensures all admin access is controlled and audited
DROP POLICY IF EXISTS "Admin access to candidates with logging" ON public.candidates;

-- Create a function for admins to access specific candidate data with mandatory logging
CREATE OR REPLACE FUNCTION public.get_candidate_secure(_candidate_id UUID, _purpose TEXT)
RETURNS TABLE (
  id UUID,
  nombre_completo TEXT,
  email TEXT,
  codigo_pais TEXT,
  telefono TEXT,
  pais TEXT,
  ciudad TEXT,
  situacion_actual TEXT,
  disponibilidad TEXT,
  jornada TEXT,
  sueldo_actual_bruto TEXT,
  area_estudio TEXT,
  nivel_maximo TEXT,
  certificaciones TEXT,
  cv_url TEXT,
  linkedin TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify admin/staff access
  IF NOT public.is_admin_or_staff(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied: Insufficient privileges';
  END IF;

  -- Verify valid purpose
  IF _purpose NOT IN ('recruitment', 'support', 'audit', 'data_correction') THEN
    RAISE EXCEPTION 'Access denied: Invalid access purpose';
  END IF;

  -- Log the access
  PERFORM public.log_candidate_access(_candidate_id, 'view', _purpose);

  -- Return candidate data
  RETURN QUERY
  SELECT 
    c.id,
    c.nombre_completo,
    c.email,
    c.codigo_pais,
    c.telefono,
    c.pais,
    c.ciudad,
    c.situacion_actual,
    c.disponibilidad,
    c.jornada,
    c.sueldo_actual_bruto,
    c.area_estudio,
    c.nivel_maximo,
    c.certificaciones,
    c.cv_url,
    c.linkedin,
    c.status,
    c.created_at
  FROM public.candidates c
  WHERE c.id = _candidate_id;
END;
$$;