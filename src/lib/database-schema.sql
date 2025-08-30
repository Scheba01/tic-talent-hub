-- TIC Select Talent Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create main candidates table
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Personal data
    nombre_completo TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    codigo_pais TEXT NOT NULL,
    telefono TEXT NOT NULL,
    codigo_otro TEXT,
    pais TEXT NOT NULL,
    pais_otro TEXT,
    ciudad TEXT NOT NULL,
    
    -- Work situation & availability
    situacion_actual TEXT NOT NULL,
    disponibilidad TEXT NOT NULL,
    jornada TEXT NOT NULL,
    sueldo_actual_bruto TEXT NOT NULL,
    
    -- Education
    nivel_maximo TEXT NOT NULL,
    area_estudio TEXT NOT NULL,
    area_estudio_otro TEXT,
    certificaciones TEXT,
    
    -- Documents and links
    cv_url TEXT,
    certificados_adicionales_url TEXT,
    linkedin TEXT,
    
    -- Notes
    comentarios TEXT,
    
    -- Privacy consent
    autorizacion_datos BOOLEAN NOT NULL DEFAULT false,
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'archived'))
);

-- Create role families table
CREATE TABLE candidate_role_families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    familia_rol TEXT NOT NULL,
    familia_rol_otro TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create sectors table
CREATE TABLE candidate_sectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    sector TEXT NOT NULL,
    sectores_otro TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create competencies table
CREATE TABLE candidate_competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    competencia TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create languages table
CREATE TABLE candidate_languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    idioma TEXT NOT NULL,
    idioma_otro TEXT,
    nivel TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create work experience table
CREATE TABLE candidate_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    empresa TEXT NOT NULL,
    cargo TEXT NOT NULL,
    periodo TEXT NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create laboratory specialization table
CREATE TABLE candidate_laboratory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    tipos_laboratorio TEXT[] DEFAULT '{}',
    rol TEXT,
    tecnicas_equipos TEXT[] DEFAULT '{}',
    experiencia_17025 TEXT,
    experiencia_auditorias BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create inspection specialization table
CREATE TABLE candidate_inspection (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    tipo_organismo TEXT,
    areas_inspeccion TEXT[] DEFAULT '{}',
    rol TEXT,
    certificaciones TEXT[] DEFAULT '{}',
    experiencia_17020 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create systems certification specialization table
CREATE TABLE candidate_cert_sistemas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    normas TEXT[] DEFAULT '{}',
    nivel_competencia TEXT,
    registro_irca BOOLEAN DEFAULT false,
    id_irca TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create products certification specialization table
CREATE TABLE candidate_cert_productos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    sectores TEXT[] DEFAULT '{}',
    rol TEXT,
    experiencia_17065 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create persons certification specialization table
CREATE TABLE candidate_cert_personas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    areas TEXT[] DEFAULT '{}',
    rol TEXT,
    experiencia_17024 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create audit specialization table
CREATE TABLE candidate_auditoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    tipo_auditor TEXT[] DEFAULT '{}',
    normas_auditadas TEXT[] DEFAULT '{}',
    horas_auditoria TEXT,
    registro_irca BOOLEAN DEFAULT false,
    id_irca TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create commercial specialization table
CREATE TABLE candidate_comercial (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    rol TEXT,
    lineas_dominadas TEXT[] DEFAULT '{}',
    ticket_promedio TEXT,
    sectores_atendidos TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create operations specialization table
CREATE TABLE candidate_operaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    nivel TEXT,
    areas TEXT[] DEFAULT '{}',
    presupuesto TEXT,
    personas_cargo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for candidates table
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_candidates_email ON candidates(email);
CREATE INDEX idx_candidates_status ON candidates(status);
CREATE INDEX idx_candidates_created_at ON candidates(created_at);
CREATE INDEX idx_candidate_role_families_candidate_id ON candidate_role_families(candidate_id);
CREATE INDEX idx_candidate_sectors_candidate_id ON candidate_sectors(candidate_id);
CREATE INDEX idx_candidate_languages_candidate_id ON candidate_languages(candidate_id);
CREATE INDEX idx_candidate_experience_candidate_id ON candidate_experience(candidate_id);

-- Enable Row Level Security (RLS)
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_role_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_laboratory ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_inspection ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_cert_sistemas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_cert_productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_cert_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_comercial ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_operaciones ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('candidate-documents', 'candidate-documents', false);

-- RLS Policies for public candidate registration
CREATE POLICY "Anyone can insert candidates" ON candidates FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert role families" ON candidate_role_families FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert sectors" ON candidate_sectors FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert competencies" ON candidate_competencies FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert languages" ON candidate_languages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert experience" ON candidate_experience FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert laboratory data" ON candidate_laboratory FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert inspection data" ON candidate_inspection FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert cert sistemas data" ON candidate_cert_sistemas FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert cert productos data" ON candidate_cert_productos FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert cert personas data" ON candidate_cert_personas FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert auditoria data" ON candidate_auditoria FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert comercial data" ON candidate_comercial FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert operaciones data" ON candidate_operaciones FOR INSERT WITH CHECK (true);

-- Storage policies for document uploads
CREATE POLICY "Anyone can upload candidate documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'candidate-documents');
CREATE POLICY "Anyone can view their uploaded documents" ON storage.objects FOR SELECT USING (bucket_id = 'candidate-documents');