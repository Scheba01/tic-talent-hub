-- Drop the problematic view
DROP VIEW IF EXISTS public.candidates_summary_view;

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

-- Create function to get candidate count for analytics (no personal data)
CREATE OR REPLACE FUNCTION public.get_candidate_stats()
RETURNS TABLE (
  total_candidates BIGINT,
  active_candidates BIGINT,
  by_country JSONB,
  by_status JSONB
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

  -- Return aggregated statistics without exposing individual data
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_candidates,
    COUNT(*) FILTER (WHERE status = 'active')::BIGINT as active_candidates,
    jsonb_object_agg(pais, country_count) as by_country,
    jsonb_object_agg(status, status_count) as by_status
  FROM (
    SELECT 
      pais,
      status,
      COUNT(*) as country_count,
      COUNT(*) as status_count
    FROM public.candidates 
    GROUP BY pais, status
  ) stats;
END;
$$;