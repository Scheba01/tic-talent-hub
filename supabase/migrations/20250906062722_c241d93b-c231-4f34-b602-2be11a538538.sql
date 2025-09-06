-- Fix security vulnerability: Replace existing INSERT policies to require authentication
-- This prevents anonymous users from submitting fake applications

-- Use CREATE OR REPLACE for each policy to avoid conflicts
CREATE OR REPLACE POLICY "Authenticated users can insert atencion cliente data" 
ON candidate_atencion_cliente 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert auditoria data" 
ON candidate_auditoria 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert cert personas data" 
ON candidate_cert_personas 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert cert productos data" 
ON candidate_cert_productos 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert cert sistemas data" 
ON candidate_cert_sistemas 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert comercial data" 
ON candidate_comercial 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert competencies" 
ON candidate_competencies 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert direccion data" 
ON candidate_direccion 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert experience" 
ON candidate_experience 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert hse data" 
ON candidate_hse 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert inspection data" 
ON candidate_inspection 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert laboratory data" 
ON candidate_laboratory 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert languages" 
ON candidate_languages 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert legal data" 
ON candidate_legal 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert operaciones data" 
ON candidate_operaciones 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert pmo data" 
ON candidate_pmo 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert role families" 
ON candidate_role_families 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert sectors" 
ON candidate_sectors 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert supply chain data" 
ON candidate_supply_chain 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE OR REPLACE POLICY "Authenticated users can insert ti data" 
ON candidate_ti 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);