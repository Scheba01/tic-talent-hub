-- Drop the security definer view that bypasses RLS
-- This view is redundant since we already have:
-- 1. Proper RLS policies on the candidates table
-- 2. SECURITY DEFINER functions (get_candidate_secure, list_candidates_secure)
-- 3. Direct access to candidates table with proper RLS enforcement

DROP VIEW IF EXISTS public.candidates_secure;

-- Add a comment to document why this was removed
COMMENT ON TABLE public.candidates IS 'Candidate data with RLS policies. Use get_candidate_secure() or list_candidates_secure() functions for controlled access with audit logging.';