export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      candidate_access_log: {
        Row: {
          access_type: string
          accessed_at: string
          accessed_by: string
          candidate_id: string
          id: string
          ip_address: unknown | null
          purpose: string
          user_agent: string | null
        }
        Insert: {
          access_type: string
          accessed_at?: string
          accessed_by: string
          candidate_id: string
          id?: string
          ip_address?: unknown | null
          purpose: string
          user_agent?: string | null
        }
        Update: {
          access_type?: string
          accessed_at?: string
          accessed_by?: string
          candidate_id?: string
          id?: string
          ip_address?: unknown | null
          purpose?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_access_log_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_access_log_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_atencion_cliente: {
        Row: {
          candidate_id: string | null
          comentarios: string | null
          created_at: string
          experiencia: string | null
          id: string
          rol: string | null
        }
        Insert: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Update: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_atencion_cliente_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_atencion_cliente_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_auditoria: {
        Row: {
          candidate_id: string | null
          created_at: string
          horas_auditoria: string | null
          id: string
          id_irca: string | null
          normas_auditadas: string[] | null
          registro_irca: boolean | null
          tipo_auditor: string[] | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          horas_auditoria?: string | null
          id?: string
          id_irca?: string | null
          normas_auditadas?: string[] | null
          registro_irca?: boolean | null
          tipo_auditor?: string[] | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          horas_auditoria?: string | null
          id?: string
          id_irca?: string | null
          normas_auditadas?: string[] | null
          registro_irca?: boolean | null
          tipo_auditor?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_auditoria_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_auditoria_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_cert_personas: {
        Row: {
          areas: string[] | null
          candidate_id: string | null
          created_at: string
          experiencia_17024: string | null
          id: string
          rol: string | null
        }
        Insert: {
          areas?: string[] | null
          candidate_id?: string | null
          created_at?: string
          experiencia_17024?: string | null
          id?: string
          rol?: string | null
        }
        Update: {
          areas?: string[] | null
          candidate_id?: string | null
          created_at?: string
          experiencia_17024?: string | null
          id?: string
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_cert_personas_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_cert_personas_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_cert_productos: {
        Row: {
          candidate_id: string | null
          created_at: string
          experiencia_17065: string | null
          id: string
          rol: string | null
          sectores: string[] | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          experiencia_17065?: string | null
          id?: string
          rol?: string | null
          sectores?: string[] | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          experiencia_17065?: string | null
          id?: string
          rol?: string | null
          sectores?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_cert_productos_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_cert_productos_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_cert_sistemas: {
        Row: {
          candidate_id: string | null
          created_at: string
          id: string
          id_irca: string | null
          nivel_competencia: string | null
          normas: string[] | null
          registro_irca: boolean | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          id?: string
          id_irca?: string | null
          nivel_competencia?: string | null
          normas?: string[] | null
          registro_irca?: boolean | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          id?: string
          id_irca?: string | null
          nivel_competencia?: string | null
          normas?: string[] | null
          registro_irca?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_cert_sistemas_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_cert_sistemas_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_comercial: {
        Row: {
          candidate_id: string | null
          created_at: string
          id: string
          lineas_dominadas: string[] | null
          rol: string | null
          sectores_atendidos: string[] | null
          ticket_promedio: string | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          id?: string
          lineas_dominadas?: string[] | null
          rol?: string | null
          sectores_atendidos?: string[] | null
          ticket_promedio?: string | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          id?: string
          lineas_dominadas?: string[] | null
          rol?: string | null
          sectores_atendidos?: string[] | null
          ticket_promedio?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_comercial_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_comercial_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_competencies: {
        Row: {
          candidate_id: string | null
          competencia: string
          created_at: string
          id: string
        }
        Insert: {
          candidate_id?: string | null
          competencia: string
          created_at?: string
          id?: string
        }
        Update: {
          candidate_id?: string | null
          competencia?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_competencies_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_competencies_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_direccion: {
        Row: {
          candidate_id: string | null
          comentarios: string | null
          created_at: string
          experiencia: string | null
          id: string
          rol: string | null
        }
        Insert: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Update: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_direccion_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_direccion_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_experience: {
        Row: {
          candidate_id: string | null
          cargo: string
          created_at: string
          descripcion: string | null
          empresa: string
          id: string
          periodo: string
        }
        Insert: {
          candidate_id?: string | null
          cargo: string
          created_at?: string
          descripcion?: string | null
          empresa: string
          id?: string
          periodo: string
        }
        Update: {
          candidate_id?: string | null
          cargo?: string
          created_at?: string
          descripcion?: string | null
          empresa?: string
          id?: string
          periodo?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_experience_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_experience_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_hse: {
        Row: {
          candidate_id: string | null
          comentarios: string | null
          created_at: string
          experiencia: string | null
          id: string
          rol: string | null
        }
        Insert: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Update: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_hse_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_hse_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_inspection: {
        Row: {
          areas_inspeccion: string[] | null
          candidate_id: string | null
          certificaciones: string[] | null
          created_at: string
          experiencia_17020: string | null
          id: string
          rol: string | null
          tipo_organismo: string | null
        }
        Insert: {
          areas_inspeccion?: string[] | null
          candidate_id?: string | null
          certificaciones?: string[] | null
          created_at?: string
          experiencia_17020?: string | null
          id?: string
          rol?: string | null
          tipo_organismo?: string | null
        }
        Update: {
          areas_inspeccion?: string[] | null
          candidate_id?: string | null
          certificaciones?: string[] | null
          created_at?: string
          experiencia_17020?: string | null
          id?: string
          rol?: string | null
          tipo_organismo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_inspection_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_inspection_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_laboratory: {
        Row: {
          candidate_id: string | null
          created_at: string
          experiencia_17025: string | null
          experiencia_auditorias: boolean | null
          id: string
          rol: string | null
          tecnicas_equipos: string[] | null
          tipos_laboratorio: string[] | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          experiencia_17025?: string | null
          experiencia_auditorias?: boolean | null
          id?: string
          rol?: string | null
          tecnicas_equipos?: string[] | null
          tipos_laboratorio?: string[] | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          experiencia_17025?: string | null
          experiencia_auditorias?: boolean | null
          id?: string
          rol?: string | null
          tecnicas_equipos?: string[] | null
          tipos_laboratorio?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_laboratory_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_laboratory_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_languages: {
        Row: {
          candidate_id: string | null
          created_at: string
          id: string
          idioma: string
          idioma_otro: string | null
          nivel: string
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          id?: string
          idioma: string
          idioma_otro?: string | null
          nivel: string
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          id?: string
          idioma?: string
          idioma_otro?: string | null
          nivel?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_languages_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_languages_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_legal: {
        Row: {
          candidate_id: string | null
          comentarios: string | null
          created_at: string
          experiencia: string | null
          id: string
          rol: string | null
        }
        Insert: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Update: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_legal_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_legal_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_operaciones: {
        Row: {
          areas: string[] | null
          candidate_id: string | null
          created_at: string
          id: string
          nivel: string | null
          personas_cargo: string | null
          presupuesto: string | null
        }
        Insert: {
          areas?: string[] | null
          candidate_id?: string | null
          created_at?: string
          id?: string
          nivel?: string | null
          personas_cargo?: string | null
          presupuesto?: string | null
        }
        Update: {
          areas?: string[] | null
          candidate_id?: string | null
          created_at?: string
          id?: string
          nivel?: string | null
          personas_cargo?: string | null
          presupuesto?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_operaciones_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_operaciones_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_pmo: {
        Row: {
          candidate_id: string | null
          comentarios: string | null
          created_at: string
          experiencia: string | null
          id: string
          rol: string | null
        }
        Insert: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Update: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_pmo_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pmo_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_role_families: {
        Row: {
          candidate_id: string | null
          created_at: string
          familia_rol: string
          familia_rol_otro: string | null
          id: string
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          familia_rol: string
          familia_rol_otro?: string | null
          id?: string
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          familia_rol?: string
          familia_rol_otro?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_role_families_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_role_families_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_sectors: {
        Row: {
          candidate_id: string | null
          created_at: string
          id: string
          sector: string
          sectores_otro: string | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          id?: string
          sector: string
          sectores_otro?: string | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          id?: string
          sector?: string
          sectores_otro?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_sectors_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_sectors_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_supply_chain: {
        Row: {
          candidate_id: string | null
          comentarios: string | null
          created_at: string
          experiencia: string | null
          id: string
          rol: string | null
        }
        Insert: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Update: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_supply_chain_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_supply_chain_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_ti: {
        Row: {
          candidate_id: string | null
          comentarios: string | null
          created_at: string
          experiencia: string | null
          id: string
          rol: string | null
        }
        Insert: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Update: {
          candidate_id?: string | null
          comentarios?: string | null
          created_at?: string
          experiencia?: string | null
          id?: string
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_ti_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_ti_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates_admin_view"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          area_estudio: string
          area_estudio_otro: string | null
          autorizacion_datos: boolean
          certificaciones: string | null
          certificados_adicionales_url: string | null
          ciudad: string
          codigo_otro: string | null
          codigo_pais: string
          comentarios: string | null
          created_at: string
          cv_url: string | null
          disponibilidad: string
          email: string
          id: string
          jornada: string
          linkedin: string | null
          nivel_maximo: string
          nombre_completo: string
          pais: string
          pais_otro: string | null
          situacion_actual: string
          status: string | null
          sueldo_actual_bruto: string
          telefono: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          area_estudio: string
          area_estudio_otro?: string | null
          autorizacion_datos?: boolean
          certificaciones?: string | null
          certificados_adicionales_url?: string | null
          ciudad: string
          codigo_otro?: string | null
          codigo_pais: string
          comentarios?: string | null
          created_at?: string
          cv_url?: string | null
          disponibilidad: string
          email: string
          id?: string
          jornada: string
          linkedin?: string | null
          nivel_maximo: string
          nombre_completo: string
          pais: string
          pais_otro?: string | null
          situacion_actual: string
          status?: string | null
          sueldo_actual_bruto: string
          telefono: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          area_estudio?: string
          area_estudio_otro?: string | null
          autorizacion_datos?: boolean
          certificaciones?: string | null
          certificados_adicionales_url?: string | null
          ciudad?: string
          codigo_otro?: string | null
          codigo_pais?: string
          comentarios?: string | null
          created_at?: string
          cv_url?: string | null
          disponibilidad?: string
          email?: string
          id?: string
          jornada?: string
          linkedin?: string | null
          nivel_maximo?: string
          nombre_completo?: string
          pais?: string
          pais_otro?: string | null
          situacion_actual?: string
          status?: string | null
          sueldo_actual_bruto?: string
          telefono?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          empresa: string | null
          id: string
          mensaje: string
          nombre: string
          telefono: string | null
          tipo_consulta: string | null
        }
        Insert: {
          created_at?: string
          email: string
          empresa?: string | null
          id?: string
          mensaje: string
          nombre: string
          telefono?: string | null
          tipo_consulta?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          empresa?: string | null
          id?: string
          mensaje?: string
          nombre?: string
          telefono?: string | null
          tipo_consulta?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          nombre_completo: string | null
          telefono: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          nombre_completo?: string | null
          telefono?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          nombre_completo?: string | null
          telefono?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      candidates_admin_view: {
        Row: {
          area_estudio: string | null
          certificaciones: string | null
          certificados_adicionales_url: string | null
          ciudad: string | null
          created_at: string | null
          cv_url: string | null
          disponibilidad: string | null
          email: string | null
          id: string | null
          jornada: string | null
          linkedin: string | null
          nivel_maximo: string | null
          nombre_completo: string | null
          pais: string | null
          situacion_actual: string | null
          status: string | null
          sueldo_actual_bruto: string | null
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          area_estudio?: string | null
          certificaciones?: string | null
          certificados_adicionales_url?: never
          ciudad?: string | null
          created_at?: string | null
          cv_url?: never
          disponibilidad?: string | null
          email?: string | null
          id?: string | null
          jornada?: string | null
          linkedin?: string | null
          nivel_maximo?: string | null
          nombre_completo?: string | null
          pais?: string | null
          situacion_actual?: string | null
          status?: string | null
          sueldo_actual_bruto?: never
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          area_estudio?: string | null
          certificaciones?: string | null
          certificados_adicionales_url?: never
          ciudad?: string | null
          created_at?: string | null
          cv_url?: never
          disponibilidad?: string | null
          email?: string | null
          id?: string | null
          jornada?: string | null
          linkedin?: string | null
          nivel_maximo?: string | null
          nombre_completo?: string | null
          pais?: string | null
          situacion_actual?: string | null
          status?: string | null
          sueldo_actual_bruto?: never
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      can_access_candidate_data: {
        Args: { _candidate_id: string; _purpose: string; _user_id: string }
        Returns: boolean
      }
      get_candidate_secure: {
        Args: { _candidate_id: string; _purpose: string }
        Returns: {
          area_estudio: string
          certificaciones: string
          ciudad: string
          codigo_pais: string
          created_at: string
          cv_url: string
          disponibilidad: string
          email: string
          id: string
          jornada: string
          linkedin: string
          nivel_maximo: string
          nombre_completo: string
          pais: string
          situacion_actual: string
          status: string
          sueldo_actual_bruto: string
          telefono: string
        }[]
      }
      get_candidate_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          active_candidates: number
          by_country: Json
          by_status: Json
          total_candidates: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_staff: {
        Args: { _user_id: string }
        Returns: boolean
      }
      list_candidates_secure: {
        Args: Record<PropertyKey, never>
        Returns: {
          area_estudio: string
          ciudad: string
          created_at: string
          email: string
          id: string
          nombre_completo: string
          pais: string
          situacion_actual: string
          status: string
        }[]
      }
      log_candidate_access: {
        Args: { _access_type: string; _candidate_id: string; _purpose: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "user"],
    },
  },
} as const
