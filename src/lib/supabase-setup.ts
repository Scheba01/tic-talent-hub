import { createClient } from '@supabase/supabase-js'

// Database schema setup function
export const createTalentDatabase = async () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration missing')
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Create main candidates table
    const { error: candidatesError } = await supabase.rpc('create_candidates_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS candidates (
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
      `
    })

    if (candidatesError) {
      console.error('Error creating candidates table:', candidatesError)
      throw candidatesError
    }

    console.log('Talent database schema created successfully!')
    return { success: true }

  } catch (error) {
    console.error('Error setting up database:', error)
    throw error
  }
}

// Database types
export interface Candidate {
  id: string
  created_at: string
  updated_at: string
  nombre_completo: string
  email: string
  codigo_pais: string
  telefono: string
  codigo_otro?: string
  pais: string
  pais_otro?: string
  ciudad: string
  situacion_actual: string
  disponibilidad: string
  jornada: string
  sueldo_actual_bruto: string
  nivel_maximo: string
  area_estudio: string
  area_estudio_otro?: string
  certificaciones?: string
  cv_url?: string
  certificados_adicionales_url?: string
  linkedin?: string
  comentarios?: string
  autorizacion_datos: boolean
  status: 'pending' | 'approved' | 'rejected' | 'archived'
}

export interface CandidateRoleFamily {
  id: string
  candidate_id: string
  familia_rol: string
  familia_rol_otro?: string
  created_at: string
}

export interface CandidateSector {
  id: string
  candidate_id: string
  sector: string
  sectores_otro?: string
  created_at: string
}

export interface CandidateLanguage {
  id: string
  candidate_id: string
  idioma: string
  idioma_otro?: string
  nivel: string
  created_at: string
}

export interface CandidateExperience {
  id: string
  candidate_id: string
  empresa: string
  cargo: string
  periodo: string
  descripcion?: string
  created_at: string
}