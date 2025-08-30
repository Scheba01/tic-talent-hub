import { z } from "zod"

export const registrationSchema = z.object({
  // Datos personales
  nombreCompleto: z.string().min(1, "Nombre completo es requerido"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(1, "Teléfono es requerido"),
  pais: z.string().min(1, "País es requerido"),
  paisOtro: z.string().optional(),
  ciudad: z.string().min(1, "Ciudad es requerida"),

  // Situación laboral & disponibilidad
  situacionActual: z.string().min(1, "Situación actual es requerida"),
  disponibilidad: z.string().min(1, "Disponibilidad es requerida"),
  jornada: z.string().min(1, "Jornada es requerida"),
  sueldoActualBruto: z.string().min(1, "Sueldo actual bruto es requerido"),

  // Familias de rol
  familiasRol: z.array(z.string()).min(1, "Debe seleccionar al menos una familia de rol"),
  familiaRolOtro: z.string().optional(),

  // Sectores/Industrias
  sectores: z.array(z.string()),

  // Competencias y normas
  competenciasNormas: z.array(z.object({
    norma: z.string(),
    normaOtro: z.string().optional(),
    nivel: z.string()
  })),

  // Formación académica
  nivelMaximo: z.string().min(1, "Nivel máximo es requerido"),
  areaEstudio: z.string().min(1, "Área de estudio es requerida"),
  areaEstudioOtro: z.string().optional(),
  certificaciones: z.string(),

  // Idiomas
  idiomas: z.array(z.object({
    idioma: z.string().min(1, "Idioma es requerido"),
    idiomaOtro: z.string().optional(),
    nivel: z.string().min(1, "Nivel es requerido")
  })).min(1, "Debe especificar al menos un idioma"),

  // Cumplimiento & elegibilidad
  autorizacionDatos: z.boolean().refine(val => val === true, {
    message: "Debe autorizar el tratamiento de datos"
  }),

  // Experiencia profesional
  experienciaLaboral: z.array(z.object({
    empresa: z.string().min(1, "Empresa es requerida"),
    cargo: z.string().min(1, "Cargo es requerido"),
    periodo: z.string().min(1, "Período es requerido"),
    descripcion: z.string().optional()
  })).min(1, "Debe agregar al menos una experiencia laboral"),

  // Documentos
  cv: z.any().optional(),
  certificadosAdicionales: z.any().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),

  // Notas y preferencias
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