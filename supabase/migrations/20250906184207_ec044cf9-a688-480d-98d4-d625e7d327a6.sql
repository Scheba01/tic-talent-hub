-- Check if table exists and create only if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'candidate_access_log') THEN
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
    END IF;
END
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

-- Create secure function for admin access with mandatory logging
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
    RAISE EXCEPTION 'Access denied: Insufficient privileges to access candidate data';
  END IF;

  -- Verify valid purpose
  IF _purpose NOT IN ('recruitment', 'support', 'audit', 'data_correction') THEN
    RAISE EXCEPTION 'Access denied: Invalid access purpose. Must be recruitment, support, audit, or data_correction';
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

-- Create RLS policies for audit log if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'candidate_access_log' 
        AND policyname = 'Only admins can view access logs'
    ) THEN
        CREATE POLICY "Only admins can view access logs" 
        ON public.candidate_access_log 
        FOR SELECT 
        USING (public.has_role(auth.uid(), 'admin'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'candidate_access_log' 
        AND policyname = 'System can insert access logs'
    ) THEN
        CREATE POLICY "System can insert access logs" 
        ON public.candidate_access_log 
        FOR INSERT 
        WITH CHECK (accessed_by = auth.uid());
    END IF;
END
$$;