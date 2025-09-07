-- Enhanced security for candidate data protection

-- 1. Create data classification table to track sensitive data
CREATE TABLE IF NOT EXISTS public.data_classification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  column_name TEXT NOT NULL,
  classification TEXT NOT NULL CHECK (classification IN ('public', 'internal', 'confidential', 'restricted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Insert data classifications for candidate table
INSERT INTO public.data_classification (table_name, column_name, classification) VALUES
  ('candidates', 'nombre_completo', 'confidential'),
  ('candidates', 'email', 'confidential'),
  ('candidates', 'telefono', 'confidential'),
  ('candidates', 'sueldo_actual_bruto', 'restricted'),
  ('candidates', 'cv_url', 'restricted'),
  ('candidates', 'certificados_adicionales_url', 'restricted'),
  ('candidates', 'linkedin', 'internal'),
  ('candidates', 'ciudad', 'internal'),
  ('candidates', 'pais', 'internal')
ON CONFLICT DO NOTHING;

-- 3. Create enhanced audit logging function
CREATE OR REPLACE FUNCTION public.audit_candidate_access(
  _candidate_id UUID,
  _access_type TEXT,
  _columns_accessed TEXT[] DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Enhanced logging with column-level tracking
  INSERT INTO public.candidate_access_log (
    accessed_by,
    candidate_id,
    access_type,
    purpose,
    user_agent,
    ip_address
  ) VALUES (
    auth.uid(),
    _candidate_id,
    _access_type,
    'data_access',
    current_setting('request.headers', true)::json->>'user-agent',
    inet_client_addr()
  );
  
  -- Log specific columns accessed if provided
  IF _columns_accessed IS NOT NULL THEN
    PERFORM pg_notify('candidate_data_access', json_build_object(
      'user_id', auth.uid(),
      'candidate_id', _candidate_id,
      'columns', _columns_accessed,
      'timestamp', now()
    )::text);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Create data masking function for sensitive fields
CREATE OR REPLACE FUNCTION public.mask_sensitive_data(
  _data TEXT,
  _classification TEXT
)
RETURNS TEXT AS $$
BEGIN
  CASE _classification
    WHEN 'restricted' THEN
      -- Completely mask restricted data for non-admin users
      IF NOT public.is_admin_or_staff(auth.uid()) THEN
        RETURN '[REDACTED]';
      END IF;
    WHEN 'confidential' THEN
      -- Partially mask confidential data
      IF NOT public.is_admin_or_staff(auth.uid()) THEN
        RETURN LEFT(_data, 2) || '***' || RIGHT(_data, 2);
      END IF;
    ELSE
      -- Return data as-is for internal/public classifications
      NULL;
  END CASE;
  
  RETURN _data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Create secure candidate view with automatic masking
CREATE OR REPLACE VIEW public.candidates_secure AS
SELECT 
  id,
  created_at,
  updated_at,
  user_id,
  CASE 
    WHEN public.is_admin_or_staff(auth.uid()) OR auth.uid() = user_id THEN nombre_completo
    ELSE public.mask_sensitive_data(nombre_completo, 'confidential')
  END as nombre_completo,
  CASE 
    WHEN public.is_admin_or_staff(auth.uid()) OR auth.uid() = user_id THEN email
    ELSE public.mask_sensitive_data(email, 'confidential')
  END as email,
  codigo_pais,
  CASE 
    WHEN public.is_admin_or_staff(auth.uid()) OR auth.uid() = user_id THEN telefono
    ELSE public.mask_sensitive_data(telefono, 'confidential')
  END as telefono,
  codigo_otro,
  pais,
  pais_otro,
  ciudad,
  situacion_actual,
  disponibilidad,
  jornada,
  CASE 
    WHEN public.is_admin_or_staff(auth.uid()) OR auth.uid() = user_id THEN sueldo_actual_bruto
    ELSE '[REDACTED]'
  END as sueldo_actual_bruto,
  nivel_maximo,
  area_estudio,
  area_estudio_otro,
  certificaciones,
  CASE 
    WHEN public.is_admin_or_staff(auth.uid()) OR auth.uid() = user_id THEN cv_url
    ELSE NULL
  END as cv_url,
  CASE 
    WHEN public.is_admin_or_staff(auth.uid()) OR auth.uid() = user_id THEN certificados_adicionales_url
    ELSE NULL
  END as certificados_adicionales_url,
  linkedin,
  comentarios,
  autorizacion_datos,
  status
FROM public.candidates;

-- 6. Enable RLS on the view (even though it's a view, for extra protection)
ALTER VIEW public.candidates_secure SET (security_barrier = true);

-- 7. Create trigger to automatically log all candidate table access
CREATE OR REPLACE FUNCTION public.log_candidate_table_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log any direct access to candidates table
  PERFORM public.audit_candidate_access(
    COALESCE(NEW.id, OLD.id),
    TG_OP
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the trigger
DROP TRIGGER IF EXISTS candidate_access_audit_trigger ON public.candidates;
CREATE TRIGGER candidate_access_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.candidates
  FOR EACH ROW
  EXECUTE FUNCTION public.log_candidate_table_access();

-- 8. Create data retention policy function
CREATE OR REPLACE FUNCTION public.apply_data_retention_policy()
RETURNS VOID AS $$
BEGIN
  -- Archive candidates older than 2 years with no activity
  UPDATE public.candidates 
  SET status = 'archived'
  WHERE updated_at < (now() - interval '2 years')
    AND status NOT IN ('archived', 'active');
  
  -- Log retention policy application
  INSERT INTO public.candidate_access_log (
    accessed_by,
    candidate_id,
    access_type,
    purpose
  ) 
  SELECT 
    '00000000-0000-0000-0000-000000000000'::uuid,
    id,
    'retention_policy',
    'automated_archival'
  FROM public.candidates 
  WHERE status = 'archived' 
    AND updated_at < (now() - interval '2 years');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 9. Create policy for data classification table
ALTER TABLE public.data_classification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage data classification"
  ON public.data_classification
  FOR ALL
  USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Everyone can view data classification"
  ON public.data_classification
  FOR SELECT
  USING (true);

-- 10. Strengthen existing candidate policies with additional logging
DROP POLICY IF EXISTS "Users can view their own candidate data" ON public.candidates;
CREATE POLICY "Users can view their own candidate data"
  ON public.candidates
  FOR SELECT
  USING (
    auth.uid() = user_id 
    AND (
      SELECT public.audit_candidate_access(id, 'SELECT') IS NOT NULL
    )
  );

-- 11. Create emergency data breach response function
CREATE OR REPLACE FUNCTION public.emergency_data_lockdown()
RETURNS VOID AS $$
BEGIN
  -- Temporarily disable all non-admin access to candidate data
  ALTER TABLE public.candidates FORCE ROW LEVEL SECURITY;
  
  -- Log the emergency action
  INSERT INTO public.candidate_access_log (
    accessed_by,
    candidate_id,
    access_type,
    purpose
  ) VALUES (
    auth.uid(),
    '00000000-0000-0000-0000-000000000000'::uuid,
    'EMERGENCY_LOCKDOWN',
    'data_breach_response'
  );
  
  -- Notify administrators
  PERFORM pg_notify('emergency_lockdown', json_build_object(
    'timestamp', now(),
    'initiated_by', auth.uid(),
    'reason', 'data_breach_response'
  )::text);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;