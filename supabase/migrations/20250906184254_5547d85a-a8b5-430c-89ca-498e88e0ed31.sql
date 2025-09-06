-- Drop the problematic view and recreate it properly
DROP VIEW IF EXISTS public.candidates_admin_view;

-- Instead of a view, we'll rely on the secure function
-- Create a summary view that doesn't expose sensitive data directly
CREATE OR REPLACE VIEW public.candidates_summary_view AS
SELECT 
  c.id,
  c.nombre_completo,
  c.email,
  c.pais,
  c.ciudad,
  c.situacion_actual,
  c.disponibilidad,
  c.area_estudio,
  c.status,
  c.created_at,
  '[PROTECTED - Use get_candidate_secure() function]'::TEXT as sensitive_data_note
FROM public.candidates c;

-- Enable RLS on this view
ALTER VIEW public.candidates_summary_view SET (security_barrier = true);

-- Create RLS policy for the summary view
CREATE POLICY "Only admin/staff can view candidate summaries" 
ON public.candidates_summary_view 
FOR SELECT 
USING (public.is_admin_or_staff(auth.uid()));

-- Create additional security function to list candidates without sensitive data
CREATE OR REPLACE FUNCTION public.list_candidates_secure()
RETURNS TABLE (
  id UUID,
  nombre_completo TEXT,
  email TEXT,
  pais TEXT,
  ciudad TEXT,
  situacion_actual TEXT,
  area_estudio TEXT,
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

  -- Return non-sensitive candidate data for listing
  RETURN QUERY
  SELECT 
    c.id,
    c.nombre_completo,
    c.email,
    c.pais,
    c.ciudad,
    c.situacion_actual,
    c.area_estudio,
    c.status,
    c.created_at
  FROM public.candidates c
  ORDER BY c.created_at DESC;
END;
$$;