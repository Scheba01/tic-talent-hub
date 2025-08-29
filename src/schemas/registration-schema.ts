import { z } from "zod"

export const registrationSchema = z.object({
  // Datos personales
  nombreCompleto: z.string().min(1, "Nombre completo es requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(1, "Teléfono es requerido"),
  pais: z.string().min(1, "País es requerido"),
  ciudad: z.string().min(1, "Ciudad es requerida"),
  autorizaWhatsapp: z.boolean(),

  // Situación laboral & disponibilidad
  situacionActual: z.string().min(1, "Situación actual es requerida"),
  disponibilidad: z.string().min(1, "Disponibilidad es requerida"),
  modalidadPreferida: z.string().min(1, "Modalidad preferida es requerida"),
  jornada: z.string().min(1, "Jornada es requerida"),
  movilidad: z.string().min(1, "Movilidad es requerida"),
  paisesReubicacion: z.array(z.string()),
  rangoSalarial: z.string().min(1, "Rango salarial es requerido"),

  // Familias de rol
  familiasRol: z.array(z.string()).min(1, "Debe seleccionar al menos una familia de rol"),

  // Sectores/Industrias
  sectores: z.array(z.string()),

  // Competencias y normas
  competenciasNormas: z.array(z.object({
    norma: z.string(),
    nivel: z.string()
  })),

  // Formación académica
  nivelMaximo: z.string().min(1, "Nivel máximo es requerido"),
  areaEstudio: z.string().min(1, "Área de estudio es requerida"),
  certificaciones: z.string(),

  // Idiomas
  idiomas: z.array(z.object({
    idioma: z.string().min(1, "Idioma es requerido"),
    nivel: z.string().min(1, "Nivel es requerido")
  })).min(1, "Debe especificar al menos un idioma"),

  // Cumplimiento & elegibilidad
  conflictoInteres: z.boolean(),
  prestConsultoria: z.boolean(),
  autorizacionDatos: z.boolean().refine(val => val === true, {
    message: "Debe autorizar el tratamiento de datos"
  }),

  // Documentos
  cv: z.any().optional(),
  certificadosAdicionales: z.any().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),

  // Notas y preferencias
  areasInteres: z.array(z.string()),
  disponibilidadMentorias: z.boolean(),
  comentarios: z.string().optional(),

  // Subformularios condicionales
  laboratorio: z.object({
    tiposLaboratorio: z.array(z.string()),
    rol: z.string(),
    tecnicasEquipos: z.array(z.string()),
    experiencia17025: z.string(),
    experienciaAuditorias: z.boolean()
  }).optional(),

  inspeccion: z.object({
    tipoOrganismo: z.string(),
    areasInspeccion: z.array(z.string()),
    rol: z.string(),
    certificaciones: z.array(z.string()),
    experiencia17020: z.string()
  }).optional(),

  certSistemas: z.object({
    normas: z.array(z.string()),
    nivelCompetencia: z.string(),
    registroIRCA: z.boolean(),
    idIRCA: z.string().optional()
  }).optional(),

  certProductos: z.object({
    sectores: z.array(z.string()),
    rol: z.string(),
    experiencia17065: z.string()
  }).optional(),

  certPersonas: z.object({
    areas: z.array(z.string()),
    rol: z.string(),
    experiencia17024: z.string()
  }).optional(),

  auditoria: z.object({
    tipoAuditor: z.array(z.string()),
    normasAuditadas: z.array(z.string()),
    horasAuditoria: z.string(),
    registroIRCA: z.boolean(),
    idIRCA: z.string().optional()
  }).optional(),

  comercial: z.object({
    rol: z.string(),
    lineasDominadas: z.array(z.string()),
    ticketPromedio: z.string(),
    sectoresAtendidos: z.array(z.string())
  }).optional(),

  operaciones: z.object({
    nivel: z.string(),
    areas: z.array(z.string()),
    presupuesto: z.string(),
    personasCargo: z.string()
  }).optional()
})

export type RegistrationFormData = z.infer<typeof registrationSchema>