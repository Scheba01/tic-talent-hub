import { z } from "zod"

export const registrationSchema = z.object({
  // Datos personales
  nombreCompleto: z.string().min(1, "Nombre completo es requerido"),
  email: z.string().email("Email inválido"),
  codigoPais: z.string().min(1, "Código de país es requerido"),
  telefono: z.string().min(1, "Teléfono es requerido"),
  codigoOtro: z.string().optional(),
  pais: z.string().min(1, "País es requerido"),
  paisOtro: z.string().optional(),
  ciudad: z.string().min(1, "Ciudad es requerida"),

  // Situación laboral & disponibilidad
  situacionActual: z.string().min(1, "Situación actual es requerida"),
  disponibilidad: z.string().min(1, "Disponibilidad es requerida"),
  jornada: z.string().min(1, "Jornada es requerida"),
  sueldoActualBruto: z.string().min(1, "Sueldo actual bruto es requerido"),

  // Familias de rol
  familiasRol: z.array(z.object({
    area: z.string().min(1, "Área es requerida"),
    areaOtro: z.string().optional(),
    comentarios: z.string().optional()
  })).min(1, "Debe seleccionar al menos una área de experiencia"),

  // Sectores/Industrias
  sectores: z.array(z.string()),
  sectoresOtro: z.string().optional(),

  // Conocimiento y Competencia en Normas & Certificaciones
  competenciasNormas: z.array(z.string().min(1, "Este campo es requerido")),

  // Formación académica
  nivelMaximo: z.string().min(1, "Nivel máximo es requerido"),
  nivelMaximoOtro: z.string().optional(),
  areaEstudio: z.string().min(1, "Área de estudio es requerida"),
  areaEstudioOtro: z.string().optional(),
  certificaciones: z.string().optional(),

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
  cv: z.any().refine(val => val && val.length > 0, {
    message: "CV es requerido"
  }),
  certificadosAdicionales: z.any().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),

  // Notas y preferencias
  comentarios: z.string().optional(),

  // Subformularios condicionales
  laboratorio: z.object({
    tiposLaboratorio: z.array(z.string()).optional(),
    tiposLaboratorioOtro: z.string().optional(),
    rol: z.string().optional(),
    rolOtro: z.string().optional(),
    tecnicasEquipos: z.array(z.string()).optional(),
    experiencia17025: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  inspeccion: z.object({
    tipoOrganismo: z.string().optional(),
    areasInspeccion: z.array(z.string()).optional(),
    areasInspeccionOtro: z.string().optional(),
    rol: z.string().optional(),
    rolOtro: z.string().optional(),
    certificaciones: z.array(z.string()).optional(),
    experiencia17020: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  validacionVerificacion: z.object({
    tipoOrganismo: z.string().optional(),
    rol: z.string().optional(),
    rolOtro: z.string().optional(),
    experiencia17029: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  certSistemas: z.object({
    normas: z.array(z.string()).optional(),
    nivelCompetencia: z.string().optional(),
    registroIRCA: z.boolean().optional(),
    idIRCA: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  certProductos: z.object({
    sectores: z.array(z.string()).optional(),
    rol: z.string().optional(),
    experiencia17065: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  certPersonas: z.object({
    areas: z.array(z.string()).optional(),
    rol: z.string().optional(),
    experiencia17024: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  auditoria: z.object({
    tipoAuditor: z.array(z.string()).optional(),
    normasAuditadas: z.array(z.string()).optional(),
    horasAuditoria: z.string().optional(),
    registroIRCA: z.boolean().optional(),
    idIRCA: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  comercial: z.object({
    rol: z.string().optional(),
    lineasDominadas: z.array(z.string()).optional(),
    ticketPromedio: z.string().optional(),
    sectoresAtendidos: z.array(z.string()).optional(),
    comentarios: z.string().optional()
  }).optional(),

  operaciones: z.object({
    nivel: z.string().optional(),
    areas: z.array(z.string()).optional(),
    presupuesto: z.string().optional(),
    personasCargo: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  marketing: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  rrhh: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  finanzas: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  todosTransversal: z.object({
    comentarios: z.string().optional()
  }).optional(),

  consultoria: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    areas: z.array(z.string()).optional(),
    comentarios: z.string().optional()
  }).optional(),

  implementador: z.object({
    tipoImplementacion: z.array(z.string()).optional(),
    experienciaAnios: z.string().optional(),
    metodologias: z.array(z.string()).optional(),
    comentarios: z.string().optional()
  }).optional(),

  // New areas - All fields should be optional unless the area is selected
  ti: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  hse: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  legal: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  supplyChain: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  atencionCliente: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  pmo: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional(),

  direccion: z.object({
    rol: z.string().optional(),
    experiencia: z.string().optional(),
    comentarios: z.string().optional()
  }).optional()
})

export type RegistrationFormData = z.infer<typeof registrationSchema>