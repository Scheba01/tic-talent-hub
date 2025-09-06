-- Update RLS policies for all candidate_* tables to allow users to view their own data

-- candidate_role_families
DROP POLICY IF EXISTS "Users can view their own role families" ON candidate_role_families;
CREATE POLICY "Users can view their own role families" 
ON candidate_role_families 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_sectors
DROP POLICY IF EXISTS "Users can view their own sectors" ON candidate_sectors;
CREATE POLICY "Users can view their own sectors" 
ON candidate_sectors 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_competencies
DROP POLICY IF EXISTS "Users can view their own competencies" ON candidate_competencies;
CREATE POLICY "Users can view their own competencies" 
ON candidate_competencies 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_languages
DROP POLICY IF EXISTS "Users can view their own languages" ON candidate_languages;
CREATE POLICY "Users can view their own languages" 
ON candidate_languages 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_experience
DROP POLICY IF EXISTS "Users can view their own experience" ON candidate_experience;
CREATE POLICY "Users can view their own experience" 
ON candidate_experience 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_auditoria
DROP POLICY IF EXISTS "Users can view their own auditoria data" ON candidate_auditoria;
CREATE POLICY "Users can view their own auditoria data" 
ON candidate_auditoria 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_cert_sistemas
DROP POLICY IF EXISTS "Users can view their own cert sistemas data" ON candidate_cert_sistemas;
CREATE POLICY "Users can view their own cert sistemas data" 
ON candidate_cert_sistemas 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_cert_productos
DROP POLICY IF EXISTS "Users can view their own cert productos data" ON candidate_cert_productos;
CREATE POLICY "Users can view their own cert productos data" 
ON candidate_cert_productos 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_cert_personas
DROP POLICY IF EXISTS "Users can view their own cert personas data" ON candidate_cert_personas;
CREATE POLICY "Users can view their own cert personas data" 
ON candidate_cert_personas 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_inspection
DROP POLICY IF EXISTS "Users can view their own inspection data" ON candidate_inspection;
CREATE POLICY "Users can view their own inspection data" 
ON candidate_inspection 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_laboratory
DROP POLICY IF EXISTS "Users can view their own laboratory data" ON candidate_laboratory;
CREATE POLICY "Users can view their own laboratory data" 
ON candidate_laboratory 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_operaciones
DROP POLICY IF EXISTS "Users can view their own operaciones data" ON candidate_operaciones;
CREATE POLICY "Users can view their own operaciones data" 
ON candidate_operaciones 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_comercial
DROP POLICY IF EXISTS "Users can view their own comercial data" ON candidate_comercial;
CREATE POLICY "Users can view their own comercial data" 
ON candidate_comercial 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_direccion
DROP POLICY IF EXISTS "Users can view their own direccion data" ON candidate_direccion;
CREATE POLICY "Users can view their own direccion data" 
ON candidate_direccion 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_pmo
DROP POLICY IF EXISTS "Users can view their own pmo data" ON candidate_pmo;
CREATE POLICY "Users can view their own pmo data" 
ON candidate_pmo 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_hse
DROP POLICY IF EXISTS "Users can view their own hse data" ON candidate_hse;
CREATE POLICY "Users can view their own hse data" 
ON candidate_hse 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_legal
DROP POLICY IF EXISTS "Users can view their own legal data" ON candidate_legal;
CREATE POLICY "Users can view their own legal data" 
ON candidate_legal 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_supply_chain
DROP POLICY IF EXISTS "Users can view their own supply chain data" ON candidate_supply_chain;
CREATE POLICY "Users can view their own supply chain data" 
ON candidate_supply_chain 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_ti
DROP POLICY IF EXISTS "Users can view their own ti data" ON candidate_ti;
CREATE POLICY "Users can view their own ti data" 
ON candidate_ti 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));

-- candidate_atencion_cliente
DROP POLICY IF EXISTS "Users can view their own atencion cliente data" ON candidate_atencion_cliente;
CREATE POLICY "Users can view their own atencion cliente data" 
ON candidate_atencion_cliente 
FOR SELECT 
USING (candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid()));