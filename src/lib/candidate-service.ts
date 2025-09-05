import { supabase } from '@/integrations/supabase/client'
import { uploadFile } from './supabase'
import type { RegistrationFormData } from '@/schemas/registration-schema'

export interface CandidateSubmission {
  candidateId: string
  success: boolean
  message: string
}

export const submitCandidate = async (data: RegistrationFormData): Promise<CandidateSubmission> => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Usuario no autenticado');
    }
    // Upload files first
    let cvUrl: string | undefined
    let certificadosUrl: string | undefined

    if (data.cv && data.cv[0]) {
      const cvFileName = `cv_${Date.now()}_${data.cv[0].name}`
      const cvUpload = await uploadFile('candidate-documents', cvFileName, data.cv[0])
      cvUrl = supabase.storage.from('candidate-documents').getPublicUrl(cvUpload.path).data.publicUrl
    }

    if (data.certificadosAdicionales && data.certificadosAdicionales[0]) {
      const certFileName = `cert_${Date.now()}_${data.certificadosAdicionales[0].name}`
      const certUpload = await uploadFile('candidate-documents', certFileName, data.certificadosAdicionales[0])
      certificadosUrl = supabase.storage.from('candidate-documents').getPublicUrl(certUpload.path).data.publicUrl
    }

    // Insert main candidate record
    const { data: candidate, error: candidateError } = await supabase
      .from('candidates')
      .insert({
        user_id: user.id,  // Link to authenticated user
        nombre_completo: data.nombreCompleto,
        email: data.email,
        codigo_pais: data.codigoPais,
        telefono: data.telefono,
        codigo_otro: data.codigoOtro,
        pais: data.pais,
        pais_otro: data.paisOtro,
        ciudad: data.ciudad,
        situacion_actual: data.situacionActual,
        disponibilidad: data.disponibilidad,
        jornada: data.jornada,
        sueldo_actual_bruto: data.sueldoActualBruto,
        nivel_maximo: data.nivelMaximo,
        area_estudio: data.areaEstudio,
        area_estudio_otro: data.areaEstudioOtro,
        certificaciones: data.certificaciones,
        cv_url: cvUrl,
        certificados_adicionales_url: certificadosUrl,
        linkedin: data.linkedin || null,
        comentarios: data.comentarios,
        autorizacion_datos: data.autorizacionDatos
      })
      .select()
      .single()

    if (candidateError) throw candidateError
    if (!candidate) throw new Error('Failed to create candidate')

    const candidateId = candidate.id

    // Insert role families
    if (data.familiasRol?.length > 0) {
      const roleFamilyInserts = data.familiasRol.map(familia => ({
        candidate_id: candidateId,
        familia_rol: familia.area,
        familia_rol_otro: familia.area === 'otro' ? familia.areaOtro : null,
        comentarios: familia.comentarios
      }))

      const { error: roleFamilyError } = await supabase
        .from('candidate_role_families')
        .insert(roleFamilyInserts)

      if (roleFamilyError) throw roleFamilyError
    }

    // Insert sectors
    if (data.sectores?.length > 0) {
      const sectorInserts = data.sectores.map(sector => ({
        candidate_id: candidateId,
        sector: sector,
        sectores_otro: sector === 'otros' ? data.sectoresOtro : null
      }))

      const { error: sectorError } = await supabase
        .from('candidate_sectors')
        .insert(sectorInserts)

      if (sectorError) throw sectorError
    }

    // Insert competencies
    if (data.competenciasNormas?.length > 0) {
      const competencyInserts = data.competenciasNormas
        .filter(comp => comp.trim() !== '')
        .map(competencia => ({
          candidate_id: candidateId,
          competencia: competencia
        }))

      if (competencyInserts.length > 0) {
        const { error: competencyError } = await supabase
          .from('candidate_competencies')
          .insert(competencyInserts)

        if (competencyError) throw competencyError
      }
    }

    // Insert languages
    if (data.idiomas?.length > 0) {
      const languageInserts = data.idiomas.map(idioma => ({
        candidate_id: candidateId,
        idioma: idioma.idioma,
        idioma_otro: idioma.idioma === 'otro' ? idioma.idiomaOtro : null,
        nivel: idioma.nivel
      }))

      const { error: languageError } = await supabase
        .from('candidate_languages')
        .insert(languageInserts)

      if (languageError) throw languageError
    }

    // Insert work experience
    if (data.experienciaLaboral?.length > 0) {
      const experienceInserts = data.experienciaLaboral.map(exp => ({
        candidate_id: candidateId,
        empresa: exp.empresa,
        cargo: exp.cargo,
        periodo: exp.periodo,
        descripcion: exp.descripcion
      }))

      const { error: experienceError } = await supabase
        .from('candidate_experience')
        .insert(experienceInserts)

      if (experienceError) throw experienceError
    }

    // Insert specialization data based on selected role families
    await insertSpecializationData(candidateId, data)

    // Send confirmation email
    try {
      const emailResponse = await supabase.functions.invoke('send-confirmation-email', {
        body: {
          name: data.nombreCompleto,
          email: data.email,
          telefono: data.telefono,
          familiasRol: data.familiasRol
        }
      })

      if (emailResponse.error) {
        console.warn('Failed to send confirmation email:', emailResponse.error)
      } else {
        console.log('Confirmation email sent successfully')
      }
    } catch (emailError) {
      console.warn('Error sending confirmation email:', emailError)
      // Don't fail the registration if email fails
    }

    return {
      candidateId,
      success: true,
      message: 'Candidato registrado exitosamente'
    }
  } catch (error) {
    console.error('Error submitting candidate:', error)
    return {
      candidateId: '',
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido al registrar candidato'
    }
  }
}

const insertSpecializationData = async (candidateId: string, data: RegistrationFormData) => {
  const promises: Array<Promise<any>> = []

  // Laboratory specialization
  if (data.familiasRol?.some(f => f.area === 'laboratorio') && data.laboratorio) {
    promises.push(
      Promise.resolve(supabase.from('candidate_laboratory').insert({
        candidate_id: candidateId,
        tipos_laboratorio: data.laboratorio.tiposLaboratorio || [],
        rol: data.laboratorio.rol,
        tecnicas_equipos: data.laboratorio.tecnicasEquipos || [],
        experiencia_17025: data.laboratorio.experiencia17025,
        comentarios: data.laboratorio.comentarios
      }))
    )
  }

  // Inspection specialization
  if (data.familiasRol?.some(f => f.area === 'inspeccion') && data.inspeccion) {
    promises.push(
      Promise.resolve(supabase.from('candidate_inspection').insert({
        candidate_id: candidateId,
        tipo_organismo: data.inspeccion.tipoOrganismo,
        areas_inspeccion: data.inspeccion.areasInspeccion || [],
        rol: data.inspeccion.rol,
        certificaciones: data.inspeccion.certificaciones || [],
        experiencia_17020: data.inspeccion.experiencia17020
      }))
    )
  }

  // Systems certification specialization
  if (data.familiasRol?.some(f => f.area === 'cert-sistemas') && data.certSistemas) {
    promises.push(
      Promise.resolve(supabase.from('candidate_cert_sistemas').insert({
        candidate_id: candidateId,
        normas: data.certSistemas.normas || [],
        nivel_competencia: data.certSistemas.nivelCompetencia,
        registro_irca: data.certSistemas.registroIRCA || false,
        id_irca: data.certSistemas.idIRCA
      }))
    )
  }

  // Products certification specialization
  if (data.familiasRol?.some(f => f.area === 'cert-productos') && data.certProductos) {
    promises.push(
      Promise.resolve(supabase.from('candidate_cert_productos').insert({
        candidate_id: candidateId,
        sectores: data.certProductos.sectores || [],
        rol: data.certProductos.rol,
        experiencia_17065: data.certProductos.experiencia17065
      }))
    )
  }

  // Persons certification specialization
  if (data.familiasRol?.some(f => f.area === 'cert-personas') && data.certPersonas) {
    promises.push(
      Promise.resolve(supabase.from('candidate_cert_personas').insert({
        candidate_id: candidateId,
        areas: data.certPersonas.areas || [],
        rol: data.certPersonas.rol,
        experiencia_17024: data.certPersonas.experiencia17024
      }))
    )
  }

  // Audit specialization
  if (data.familiasRol?.some(f => f.area === 'auditoria') && data.auditoria) {
    promises.push(
      Promise.resolve(supabase.from('candidate_auditoria').insert({
        candidate_id: candidateId,
        tipo_auditor: data.auditoria.tipoAuditor || [],
        normas_auditadas: data.auditoria.normasAuditadas || [],
        horas_auditoria: data.auditoria.horasAuditoria,
        registro_irca: data.auditoria.registroIRCA || false,
        id_irca: data.auditoria.idIRCA
      }))
    )
  }

  // Commercial specialization
  if (data.familiasRol?.some(f => f.area === 'comercial') && data.comercial) {
    promises.push(
      Promise.resolve(supabase.from('candidate_comercial').insert({
        candidate_id: candidateId,
        rol: data.comercial.rol,
        lineas_dominadas: data.comercial.lineasDominadas || [],
        ticket_promedio: data.comercial.ticketPromedio,
        sectores_atendidos: data.comercial.sectoresAtendidos || []
      }))
    )
  }

  // Operations specialization
  if (data.familiasRol?.some(f => f.area === 'operaciones') && data.operaciones) {
    promises.push(
      Promise.resolve(supabase.from('candidate_operaciones').insert({
        candidate_id: candidateId,
        nivel: data.operaciones.nivel,
        areas: data.operaciones.areas || [],
        presupuesto: data.operaciones.presupuesto,
        personas_cargo: data.operaciones.personasCargo
      }))
    )
  }

  // Execute all specialization inserts
  if (promises.length > 0) {
    const results = await Promise.allSettled(promises)
    const failures = results.filter(result => result.status === 'rejected')
    
    if (failures.length > 0) {
      console.warn('Some specialization data failed to insert:', failures)
    }
  }
}