-- Fix security vulnerability: Replace existing INSERT policies to require authentication
-- This prevents anonymous users from submitting fake applications

-- Drop existing policies and create new ones with authentication requirements

DROP POLICY IF EXISTS "Anyone can insert atencion cliente data" ON candidate_atencion_cliente;
DROP POLICY IF EXISTS "Authenticated users can insert atencion cliente data" ON candidate_atencion_cliente;
CREATE POLICY "Authenticated users can insert atencion cliente data" 
ON candidate_atencion_cliente 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert auditoria data" ON candidate_auditoria;
DROP POLICY IF EXISTS "Authenticated users can insert auditoria data" ON candidate_auditoria;
CREATE POLICY "Authenticated users can insert auditoria data" 
ON candidate_auditoria 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert cert personas data" ON candidate_cert_personas;
DROP POLICY IF EXISTS "Authenticated users can insert cert personas data" ON candidate_cert_personas;
CREATE POLICY "Authenticated users can insert cert personas data" 
ON candidate_cert_personas 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert cert productos data" ON candidate_cert_productos;
DROP POLICY IF EXISTS "Authenticated users can insert cert productos data" ON candidate_cert_productos;
CREATE POLICY "Authenticated users can insert cert productos data" 
ON candidate_cert_productos 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert cert sistemas data" ON candidate_cert_sistemas;
DROP POLICY IF EXISTS "Authenticated users can insert cert sistemas data" ON candidate_cert_sistemas;
CREATE POLICY "Authenticated users can insert cert sistemas data" 
ON candidate_cert_sistemas 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert comercial data" ON candidate_comercial;
DROP POLICY IF EXISTS "Authenticated users can insert comercial data" ON candidate_comercial;
CREATE POLICY "Authenticated users can insert comercial data" 
ON candidate_comercial 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert competencies" ON candidate_competencies;
DROP POLICY IF EXISTS "Authenticated users can insert competencies" ON candidate_competencies;
CREATE POLICY "Authenticated users can insert competencies" 
ON candidate_competencies 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert direccion data" ON candidate_direccion;
DROP POLICY IF EXISTS "Authenticated users can insert direccion data" ON candidate_direccion;
CREATE POLICY "Authenticated users can insert direccion data" 
ON candidate_direccion 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert experience" ON candidate_experience;
DROP POLICY IF EXISTS "Authenticated users can insert experience" ON candidate_experience;
CREATE POLICY "Authenticated users can insert experience" 
ON candidate_experience 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert hse data" ON candidate_hse;
DROP POLICY IF EXISTS "Authenticated users can insert hse data" ON candidate_hse;
CREATE POLICY "Authenticated users can insert hse data" 
ON candidate_hse 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert inspection data" ON candidate_inspection;
DROP POLICY IF EXISTS "Authenticated users can insert inspection data" ON candidate_inspection;
CREATE POLICY "Authenticated users can insert inspection data" 
ON candidate_inspection 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert laboratory data" ON candidate_laboratory;
DROP POLICY IF EXISTS "Authenticated users can insert laboratory data" ON candidate_laboratory;
CREATE POLICY "Authenticated users can insert laboratory data" 
ON candidate_laboratory 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert languages" ON candidate_languages;
DROP POLICY IF EXISTS "Authenticated users can insert languages" ON candidate_languages;
CREATE POLICY "Authenticated users can insert languages" 
ON candidate_languages 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert legal data" ON candidate_legal;
DROP POLICY IF EXISTS "Authenticated users can insert legal data" ON candidate_legal;
CREATE POLICY "Authenticated users can insert legal data" 
ON candidate_legal 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert operaciones data" ON candidate_operaciones;
DROP POLICY IF EXISTS "Authenticated users can insert operaciones data" ON candidate_operaciones;
CREATE POLICY "Authenticated users can insert operaciones data" 
ON candidate_operaciones 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert pmo data" ON candidate_pmo;
DROP POLICY IF EXISTS "Authenticated users can insert pmo data" ON candidate_pmo;
CREATE POLICY "Authenticated users can insert pmo data" 
ON candidate_pmo 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert role families" ON candidate_role_families;
DROP POLICY IF EXISTS "Authenticated users can insert role families" ON candidate_role_families;
CREATE POLICY "Authenticated users can insert role families" 
ON candidate_role_families 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert sectors" ON candidate_sectors;
DROP POLICY IF EXISTS "Authenticated users can insert sectors" ON candidate_sectors;
CREATE POLICY "Authenticated users can insert sectors" 
ON candidate_sectors 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert supply chain data" ON candidate_supply_chain;
DROP POLICY IF EXISTS "Authenticated users can insert supply chain data" ON candidate_supply_chain;
CREATE POLICY "Authenticated users can insert supply chain data" 
ON candidate_supply_chain 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can insert ti data" ON candidate_ti;
DROP POLICY IF EXISTS "Authenticated users can insert ti data" ON candidate_ti;
CREATE POLICY "Authenticated users can insert ti data" 
ON candidate_ti 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);