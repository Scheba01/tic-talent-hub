-- CRITICAL SECURITY FIX: Remove the vulnerable admin view
-- This view exposes sensitive candidate data without RLS protection

DROP VIEW IF EXISTS public.candidates_admin_view;

-- Verify the view is completely removed
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_views 
        WHERE schemaname = 'public' 
        AND viewname = 'candidates_admin_view'
    ) THEN
        RAISE EXCEPTION 'SECURITY ERROR: candidates_admin_view still exists after drop attempt';
    END IF;
    
    RAISE NOTICE 'SUCCESS: candidates_admin_view has been securely removed';
END $$;

-- Add additional security check to prevent recreation of insecure views
CREATE OR REPLACE FUNCTION public.prevent_insecure_candidate_views()
RETURNS event_trigger
LANGUAGE plpgsql
AS $$
DECLARE
    obj record;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands() WHERE command_tag = 'CREATE VIEW'
    LOOP
        IF obj.object_identity LIKE '%candidate%' AND obj.object_identity LIKE '%admin%' THEN
            RAISE EXCEPTION 'SECURITY POLICY VIOLATION: Direct candidate admin views are not allowed. Use secure functions instead.';
        END IF;
    END LOOP;
END;
$$;

-- Create event trigger to prevent insecure view creation
DROP EVENT TRIGGER IF EXISTS prevent_candidate_admin_views;
CREATE EVENT TRIGGER prevent_candidate_admin_views
ON ddl_command_end
WHEN TAG IN ('CREATE VIEW')
EXECUTE FUNCTION public.prevent_insecure_candidate_views();

-- Confirm that only secure access methods remain available
-- Admin users should ONLY use these secure functions:
-- 1. list_candidates_secure() - for candidate listing
-- 2. get_candidate_secure(id, purpose) - for individual candidate access  
-- 3. get_candidate_stats() - for analytics

COMMENT ON FUNCTION public.list_candidates_secure() IS 'SECURITY: Use this function for admin candidate listing - no direct table access allowed';
COMMENT ON FUNCTION public.get_candidate_secure(UUID, TEXT) IS 'SECURITY: Use this function for individual candidate access - includes audit logging';
COMMENT ON FUNCTION public.get_candidate_stats() IS 'SECURITY: Use this function for candidate analytics - no personal data exposed';