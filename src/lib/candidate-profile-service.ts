import { supabase } from '@/integrations/supabase/client'
import type { RegistrationFormData } from '@/schemas/registration-schema'

export interface CandidateProfile {
  candidate: any;
  roleFamilies: any[];
  sectors: any[];
  competencies: any[];
  languages: any[];
  experience: any[];
  specializations: {
    laboratorio?: any;
    inspeccion?: any;
    certSistemas?: any;
    certProductos?: any;
    certPersonas?: any;
    auditoria?: any;
    comercial?: any;
    operaciones?: any;
    ti?: any;
    hse?: any;
    legal?: any;
    supplyChain?: any;
    atencionCliente?: any;
    pmo?: any;
    direccion?: any;
  };
}

export const getCandidateProfile = async (): Promise<CandidateProfile | null> => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return null;
    }

    // Get candidate basic info
    const { data: candidate, error: candidateError } = await supabase
      .from('candidates')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (candidateError || !candidate) {
      return null;
    }

    // Get all related data in parallel
    const [
      { data: roleFamilies },
      { data: sectors },
      { data: competencies },
      { data: languages },
      { data: experience },
      { data: laboratorio },
      { data: inspeccion },
      { data: certSistemas },
      { data: certProductos },
      { data: certPersonas },
      { data: auditoria },
      { data: comercial },
      { data: operaciones },
      { data: ti },
      { data: hse },
      { data: legal },
      { data: supplyChain },
      { data: atencionCliente },
      { data: pmo },
      { data: direccion }
    ] = await Promise.all([
      supabase.from('candidate_role_families').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_sectors').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_competencies').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_languages').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_experience').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_laboratory').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_inspection').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_cert_sistemas').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_cert_productos').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_cert_personas').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_auditoria').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_comercial').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_operaciones').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_ti').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_hse').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_legal').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_supply_chain').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_atencion_cliente').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_pmo').select('*').eq('candidate_id', candidate.id),
      supabase.from('candidate_direccion').select('*').eq('candidate_id', candidate.id)
    ])

    return {
      candidate,
      roleFamilies: roleFamilies || [],
      sectors: sectors || [],
      competencies: competencies || [],
      languages: languages || [],
      experience: experience || [],
      specializations: {
        laboratorio: laboratorio?.[0],
        inspeccion: inspeccion?.[0],
        certSistemas: certSistemas?.[0],
        certProductos: certProductos?.[0],
        certPersonas: certPersonas?.[0],
        auditoria: auditoria?.[0],
        comercial: comercial?.[0],
        operaciones: operaciones?.[0],
        ti: ti?.[0],
        hse: hse?.[0],
        legal: legal?.[0],
        supplyChain: supplyChain?.[0],
        atencionCliente: atencionCliente?.[0],
        pmo: pmo?.[0],
        direccion: direccion?.[0]
      }
    }
  } catch (error) {
    console.error('Error loading candidate profile:', error)
    return null
  }
}

export const transformProfileToFormData = (profile: CandidateProfile): Partial<RegistrationFormData> => {
  const { candidate, roleFamilies, sectors, competencies, languages, experience, specializations } = profile

  return {
    nombreCompleto: candidate.nombre_completo,
    email: candidate.email,
    codigoPais: candidate.codigo_pais,
    telefono: candidate.telefono,
    codigoOtro: candidate.codigo_otro,
    pais: candidate.pais,
    paisOtro: candidate.pais_otro,
    ciudad: candidate.ciudad,
    situacionActual: candidate.situacion_actual,
    disponibilidad: candidate.disponibilidad,
    jornada: candidate.jornada,
    sueldoActualBruto: candidate.sueldo_actual_bruto,
    nivelMaximo: candidate.nivel_maximo,
    areaEstudio: candidate.area_estudio,
    areaEstudioOtro: candidate.area_estudio_otro,
    certificaciones: candidate.certificaciones,
    linkedin: candidate.linkedin,
    comentarios: candidate.comentarios,
    autorizacionDatos: candidate.autorizacion_datos,

    // Transform role families
    familiasRol: roleFamilies.map(rf => ({
      area: rf.familia_rol,
      areaOtro: rf.familia_rol_otro,
      comentarios: ''
    })),

    // Transform sectors
    sectores: sectors.map(s => s.sector),
    sectoresOtro: sectors.find(s => s.sector === 'otros')?.sectores_otro,

    // Transform competencies
    competenciasNormas: competencies.map(c => c.competencia),

    // Transform languages
    idiomas: languages.map(l => ({
      idioma: l.idioma,
      idiomaOtro: l.idioma_otro,
      nivel: l.nivel
    })),

    // Transform experience
    experienciaLaboral: experience.map(e => ({
      empresa: e.empresa,
      cargo: e.cargo,
      periodo: e.periodo,
      descripcion: e.descripcion
    })),

    // Transform specializations
    ...(specializations.laboratorio && {
      laboratorio: {
        tiposLaboratorio: specializations.laboratorio.tipos_laboratorio || [],
        rol: specializations.laboratorio.rol,
        tecnicasEquipos: specializations.laboratorio.tecnicas_equipos || [],
        experiencia17025: specializations.laboratorio.experiencia_17025,
        comentarios: ''
      }
    }),

    ...(specializations.inspeccion && {
      inspeccion: {
        tipoOrganismo: specializations.inspeccion.tipo_organismo,
        areasInspeccion: specializations.inspeccion.areas_inspeccion || [],
        rol: specializations.inspeccion.rol,
        certificaciones: specializations.inspeccion.certificaciones || [],
        experiencia17020: specializations.inspeccion.experiencia_17020
      }
    }),

    ...(specializations.certSistemas && {
      certSistemas: {
        normas: specializations.certSistemas.normas || [],
        nivelCompetencia: specializations.certSistemas.nivel_competencia,
        registroIRCA: specializations.certSistemas.registro_irca,
        idIRCA: specializations.certSistemas.id_irca
      }
    }),

    ...(specializations.certProductos && {
      certProductos: {
        sectores: specializations.certProductos.sectores || [],
        rol: specializations.certProductos.rol,
        experiencia17065: specializations.certProductos.experiencia_17065
      }
    }),

    ...(specializations.certPersonas && {
      certPersonas: {
        areas: specializations.certPersonas.areas || [],
        rol: specializations.certPersonas.rol,
        experiencia17024: specializations.certPersonas.experiencia_17024
      }
    }),

    ...(specializations.auditoria && {
      auditoria: {
        tipoAuditor: specializations.auditoria.tipo_auditor || [],
        normasAuditadas: specializations.auditoria.normas_auditadas || [],
        horasAuditoria: specializations.auditoria.horas_auditoria,
        registroIRCA: specializations.auditoria.registro_irca,
        idIRCA: specializations.auditoria.id_irca
      }
    }),

    ...(specializations.comercial && {
      comercial: {
        rol: specializations.comercial.rol,
        lineasDominadas: specializations.comercial.lineas_dominadas || [],
        ticketPromedio: specializations.comercial.ticket_promedio,
        sectoresAtendidos: specializations.comercial.sectores_atendidos || []
      }
    }),

    ...(specializations.operaciones && {
      operaciones: {
        nivel: specializations.operaciones.nivel,
        areas: specializations.operaciones.areas || [],
        presupuesto: specializations.operaciones.presupuesto,
        personasCargo: specializations.operaciones.personas_cargo
      }
    }),

    ...(specializations.ti && {
      ti: {
        rol: specializations.ti.rol,
        experiencia: specializations.ti.experiencia,
        comentarios: specializations.ti.comentarios
      }
    }),

    ...(specializations.hse && {
      hse: {
        rol: specializations.hse.rol,
        experiencia: specializations.hse.experiencia,
        comentarios: specializations.hse.comentarios
      }
    }),

    ...(specializations.legal && {
      legal: {
        rol: specializations.legal.rol,
        experiencia: specializations.legal.experiencia,
        comentarios: specializations.legal.comentarios
      }
    }),

    ...(specializations.supplyChain && {
      supplyChain: {
        rol: specializations.supplyChain.rol,
        experiencia: specializations.supplyChain.experiencia,
        comentarios: specializations.supplyChain.comentarios
      }
    }),

    ...(specializations.atencionCliente && {
      atencionCliente: {
        rol: specializations.atencionCliente.rol,
        experiencia: specializations.atencionCliente.experiencia,
        comentarios: specializations.atencionCliente.comentarios
      }
    }),

    ...(specializations.pmo && {
      pmo: {
        rol: specializations.pmo.rol,
        experiencia: specializations.pmo.experiencia,
        comentarios: specializations.pmo.comentarios
      }
    }),

    ...(specializations.direccion && {
      direccion: {
        rol: specializations.direccion.rol,
        experiencia: specializations.direccion.experiencia,
        comentarios: specializations.direccion.comentarios
      }
    })
  }
}