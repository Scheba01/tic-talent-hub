export const PAISES_LATAM = [
  { value: "argentina", label: "Argentina" },
  { value: "bolivia", label: "Bolivia" },
  { value: "brasil", label: "Brasil" },
  { value: "chile", label: "Chile" },
  { value: "colombia", label: "Colombia" },
  { value: "costa-rica", label: "Costa Rica" },
  { value: "cuba", label: "Cuba" },
  { value: "ecuador", label: "Ecuador" },
  { value: "el-salvador", label: "El Salvador" },
  { value: "guatemala", label: "Guatemala" },
  { value: "honduras", label: "Honduras" },
  { value: "mexico", label: "México" },
  { value: "nicaragua", label: "Nicaragua" },
  { value: "panama", label: "Panamá" },
  { value: "paraguay", label: "Paraguay" },
  { value: "peru", label: "Perú" },
  { value: "republica-dominicana", label: "República Dominicana" },
  { value: "uruguay", label: "Uruguay" },
  { value: "venezuela", label: "Venezuela" },
  { value: "otro", label: "Otro" }
]

export const FAMILIAS_ROL = [
  { value: "laboratorio", label: "Laboratorio (ISO/IEC 17025)" },
  { value: "inspeccion", label: "Inspección (ISO/IEC 17020)" },
  { value: "cert-sistemas", label: "Certificación de Sistemas (ISO/IEC 17021-1)" },
  { value: "cert-productos", label: "Certificación de Productos (ISO/IEC 17065)" },
  { value: "cert-personas", label: "Certificación de Personas (ISO/IEC 17024)" },
  { value: "auditoria", label: "Auditoría (Interno/Lead)" },
  { value: "operaciones", label: "Operaciones / Jefaturas / Gerencias" },
  { value: "comercial", label: "Comercial / KAM / Desarrollo de Negocio" },
  { value: "ti", label: "TI / Ciberseguridad / Data" },
  { value: "hse", label: "HSE / Seguridad y Salud" },
  { value: "calidad", label: "Calidad / Compliance / Aseguramiento" },
  { value: "formacion", label: "Formación / Instructor Técnico" }
]

export const TIPOS_LABORATORIO = [
  { value: "alimentos", label: "Alimentos" },
  { value: "microbiologia", label: "Microbiología" },
  { value: "quimica", label: "Química" },
  { value: "fisico-quimico", label: "Físico-químico" },
  { value: "farmaceutico", label: "Farmacéutico" },
  { value: "cosmetico", label: "Cosmético" },
  { value: "ambiental", label: "Ambiental (agua/aire/suelo)" },
  { value: "metalurgico", label: "Metalúrgico" },
  { value: "electrico", label: "Eléctrico/Electrónico" },
  { value: "textil", label: "Textil" },
  { value: "juguetes", label: "Juguetes" },
  { value: "construccion", label: "Materiales de construcción" },
  { value: "metrologia", label: "Metrología (dimensional, masa, temperatura, presión, electricidad)" },
  { value: "otros", label: "Otros" }
]

export const AREAS_INSPECCION = [
  { value: "izaje", label: "Izaje/equipos de elevación" },
  { value: "ndt", label: "NDT (UT, MT, PT, RT, VT)" },
  { value: "electrica", label: "Eléctrica/seguridad" },
  { value: "presion", label: "Presión/ASME" },
  { value: "construccion", label: "Construcción/Obra civil" },
  { value: "mineria", label: "Minería" },
  { value: "puertos", label: "Puertos/Grúas STS/RTG" },
  { value: "transporte", label: "Transporte/Containers" },
  { value: "industrial", label: "Industrial general" },
  { value: "hvac", label: "HVAC" },
  { value: "ascensores", label: "Ascensores/Escaleras" },
  { value: "ev", label: "Infraestructura EV (cargadores)" },
  { value: "otros", label: "Otros" }
]

export const NORMAS_SISTEMAS = [
  { value: "iso-9001", label: "ISO 9001" },
  { value: "iso-14001", label: "ISO 14001" },
  { value: "iso-45001", label: "ISO 45001" },
  { value: "iso-22000", label: "ISO 22000" },
  { value: "fssc-22000", label: "FSSC 22000" },
  { value: "iso-27001", label: "ISO 27001" },
  { value: "iso-37001", label: "ISO 37001" },
  { value: "iso-13485", label: "ISO 13485" },
  { value: "iso-50001", label: "ISO 50001" },
  { value: "iso-22301", label: "ISO 22301" },
  { value: "iso-20000-1", label: "ISO 20000-1" },
  { value: "otros", label: "Otros" }
]

export const SECTORES_PRODUCTOS = [
  { value: "electrico", label: "Eléctrico/Electrónico" },
  { value: "telecom", label: "Telecom/EMC" },
  { value: "sanitarios", label: "Artefactos sanitarios/grifería" },
  { value: "construccion", label: "Construcción/Materiales" },
  { value: "juguetes", label: "Juguetes" },
  { value: "textil", label: "Textil/Calzado" },
  { value: "cosmeticos", label: "Cosméticos" },
  { value: "alimentos", label: "Alimentos/envases" },
  { value: "medicos", label: "Dispositivos médicos" },
  { value: "automotriz", label: "Automotriz/Autopartes" },
  { value: "regulatorio", label: "ERP/Regulatorio local (ej. SISS, SEC)" },
  { value: "otros", label: "Otros" }
]

export const AREAS_PERSONAS = [
  { value: "soldadura", label: "Soldadura" },
  { value: "ndt", label: "NDT" },
  { value: "izaje", label: "Operadores de izaje" },
  { value: "electricidad", label: "Electricidad" },
  { value: "seguridad", label: "Seguridad industrial" },
  { value: "alimentos", label: "Alimentos/HACCP" },
  { value: "ti", label: "TI/Ciberseguridad" },
  { value: "otros", label: "Otros" }
]

export const SECTORES_INDUSTRIA = [
  { value: "mineria", label: "Minería" },
  { value: "oil-gas", label: "Oil & Gas" },
  { value: "energia", label: "Energía/Utilities" },
  { value: "construccion", label: "Construcción/Infraestructura" },
  { value: "agro", label: "Agro/Alimentos" },
  { value: "bebidas", label: "Bebidas" },
  { value: "pesca", label: "Pesca/Acuícola" },
  { value: "farmaceutico", label: "Farmacéutico" },
  { value: "cosmetico", label: "Cosmético" },
  { value: "retail", label: "Retail/Consumo" },
  { value: "puertos", label: "Puertos/Logística" },
  { value: "automotriz", label: "Automotriz" },
  { value: "aeroespacial", label: "Aeroespacial" },
  { value: "ti", label: "TI/Software" },
  { value: "telecom", label: "Telecom" },
  { value: "salud", label: "Salud" },
  { value: "educacion", label: "Educación" },
  { value: "publico", label: "Público/Regulador" },
  { value: "otros", label: "Otros" }
]

export const NORMAS_COMPETENCIAS = [
  { value: "iso-9001", label: "ISO 9001" },
  { value: "iso-14001", label: "ISO 14001" },
  { value: "iso-45001", label: "ISO 45001" },
  { value: "iso-22000", label: "ISO 22000" },
  { value: "fssc-22000", label: "FSSC 22000" },
  { value: "haccp", label: "HACCP" },
  { value: "brcgs", label: "BRCGS" },
  { value: "ifs", label: "IFS" },
  { value: "global-gap", label: "GLOBALG.A.P." },
  { value: "iso-27001", label: "ISO 27001" },
  { value: "iso-37001", label: "ISO 37001" },
  { value: "iso-13485", label: "ISO 13485" },
  { value: "iso-50001", label: "ISO 50001" },
  { value: "iso-22301", label: "ISO 22301" },
  { value: "iso-20000-1", label: "ISO 20000-1" },
  { value: "iso-17025", label: "ISO 17025" },
  { value: "iso-17020", label: "ISO 17020" },
  { value: "iso-17065", label: "ISO 17065" },
  { value: "iso-17024", label: "ISO 17024" },
  { value: "otros", label: "Otros" }
]

export const IDIOMAS = [
  { value: "espanol", label: "Español" },
  { value: "ingles", label: "Inglés" },
  { value: "portugues", label: "Portugués" },
  { value: "frances", label: "Francés" },
  { value: "aleman", label: "Alemán" },
  { value: "otro", label: "Otro" }
]

export const NIVELES_IDIOMA = [
  { value: "nativo", label: "Nativo" },
  { value: "avanzado", label: "Avanzado" },
  { value: "intermedio", label: "Intermedio" },
  { value: "basico", label: "Básico" }
]

export const NIVELES_COMPETENCIA = [
  { value: "conocimiento", label: "Conocimiento" },
  { value: "operativo", label: "Operativo" },
  { value: "auditor-interno", label: "Auditor Interno" },
  { value: "auditor-lider", label: "Auditor Líder" },
  { value: "experto-tecnico", label: "Experto técnico" },
  { value: "formador", label: "Formador" }
]

// Identidad de cargo (funcional)
export const AREAS_FUNCIONALES = [
  { value: "comercial-ventas", label: "Comercial/Ventas" },
  { value: "operaciones", label: "Operaciones" },
  { value: "tecnica", label: "Técnica" },
  { value: "calidad", label: "Calidad" },
  { value: "hse-seguridad", label: "HSE/Seguridad" },
  { value: "ti-data", label: "TI/Data" },
  { value: "marketing", label: "Marketing" },
  { value: "rrhh", label: "RRHH" },
  { value: "finanzas-control", label: "Finanzas/Control" },
  { value: "legal-regulatorio", label: "Legal/Regulatorio" },
  { value: "supply-chain", label: "Supply Chain/Compras" },
  { value: "atencion-cliente", label: "Atención al Cliente/CS" },
  { value: "pmo-proyectos", label: "PMO/Proyectos" },
  { value: "direccion-gm", label: "Dirección/General Management" }
]

export const SUBAREAS_POR_AREA: Record<string, Array<{ value: string; label: string }>> = {
  "comercial-ventas": [
    { value: "prospeccion-sdr", label: "Prospección/SDR" },
    { value: "ejecutivo-comercial", label: "Ejecutivo Comercial" },
    { value: "kam", label: "KAM" },
    { value: "preventa-tecnica", label: "Preventa técnica" },
    { value: "licitaciones-ofertas", label: "Licitaciones/Ofertas" },
    { value: "customer-success", label: "Customer Success" },
    { value: "partnerships", label: "Partnerships/Alianzas" },
    { value: "pricing", label: "Pricing" }
  ],
  "operaciones": [
    { value: "programacion-despacho", label: "Programación/Despacho" },
    { value: "planificacion", label: "Planificación" },
    { value: "logistica-field", label: "Logística/Field Ops" },
    { value: "qa-qc", label: "QA/QC Operacional" },
    { value: "pmo-operaciones", label: "PMO Operaciones" }
  ],
  "tecnica": [
    { value: "responsable-tecnico", label: "Responsable Técnico (RT)" },
    { value: "revisor-tecnico", label: "Revisor Técnico" },
    { value: "evaluacion-conformidad", label: "Evaluación de Conformidad" },
    { value: "especialista-norma", label: "Especialista de Norma/Esquema" },
    { value: "metrologia-calibracion", label: "Metrología/Calibración" },
    { value: "ndt", label: "NDT" },
    { value: "asme-api-leea", label: "ASME/API/LEEA" }
  ],
  "calidad": [
    { value: "sistema-gestion", label: "Sistema de Gestión" },
    { value: "auditoria-interna", label: "Auditoría Interna" },
    { value: "documentacion", label: "Documentación" },
    { value: "compliance", label: "Compliance" }
  ],
  "hse-seguridad": [
    { value: "seguridad-industrial", label: "Seguridad Industrial" },
    { value: "salud-ocupacional", label: "Salud Ocupacional" },
    { value: "medioambiente", label: "Medioambiente" }
  ],
  "ti-data": [
    { value: "sistemas-infra", label: "Sistemas/Infra" },
    { value: "data-bi", label: "Data/BI" },
    { value: "ciberseguridad", label: "Ciberseguridad" },
    { value: "crm", label: "CRM" }
  ],
  "marketing": [
    { value: "performance-ads", label: "Performance/Ads" },
    { value: "contenido", label: "Contenido" },
    { value: "brand", label: "Brand" },
    { value: "eventos", label: "Eventos" }
  ],
  "rrhh": [
    { value: "reclutamiento", label: "Reclutamiento" },
    { value: "desarrollo-capacitacion", label: "Desarrollo/Capacitación" },
    { value: "comp-ben", label: "Comp&Ben" },
    { value: "nomina", label: "Nómina" }
  ],
  "finanzas-control": [
    { value: "contabilidad", label: "Contabilidad" },
    { value: "tesoreria", label: "Tesorería" },
    { value: "control-gestion", label: "Control de Gestión/FP&A" },
    { value: "compras", label: "Compras" }
  ],
  "legal-regulatorio": [
    { value: "contratos-licitaciones", label: "Contratos/Licitaciones" },
    { value: "asuntos-regulatorios", label: "Asuntos Regulatorios" }
  ],
  "supply-chain": [
    { value: "compras", label: "Compras" },
    { value: "proveedores", label: "Proveedores" },
    { value: "inventarios", label: "Inventarios" }
  ],
  "atencion-cliente": [
    { value: "mesa-ayuda", label: "Mesa de ayuda" },
    { value: "postventa", label: "Postventa" },
    { value: "soporte-tecnico", label: "Soporte Técnico" }
  ],
  "pmo-proyectos": [
    { value: "gestion-proyectos", label: "Gestión de Proyectos" },
    { value: "mejora-continua", label: "Mejora Continua" }
  ],
  "direccion-gm": [
    { value: "unidad-negocio", label: "Unidad de Negocio" },
    { value: "pais-region", label: "País/Región" }
  ]
}

export const ROLES_POR_SUBAREA: Record<string, Array<{ value: string; label: string }>> = {
  "prospeccion-sdr": [
    { value: "sdr", label: "SDR" }
  ],
  "ejecutivo-comercial": [
    { value: "ejecutivo-comercial", label: "Ejecutivo Comercial" }
  ],
  "kam": [
    { value: "kam", label: "KAM" }
  ],
  "preventa-tecnica": [
    { value: "ingeniero-preventa", label: "Ingeniero de Preventa" }
  ],
  "licitaciones-ofertas": [
    { value: "especialista-licitaciones", label: "Especialista de Licitaciones" }
  ],
  "customer-success": [
    { value: "cs-manager", label: "CS Manager" }
  ],
  "partnerships": [
    { value: "partnership-manager", label: "Partnership Manager" }
  ],
  "pricing": [
    { value: "analista-pricing", label: "Analista de Pricing" }
  ],
  "programacion-despacho": [
    { value: "programador-servicios", label: "Programador de servicios" }
  ],
  "planificacion": [
    { value: "planner", label: "Planner" }
  ],
  "logistica-field": [
    { value: "coordinador-operaciones", label: "Coordinador de Operaciones" }
  ],
  "qa-qc": [
    { value: "jefe-operaciones", label: "Jefe de Operaciones" }
  ],
  "pmo-operaciones": [
    { value: "pmo-operaciones", label: "PMO Operaciones" }
  ],
  "responsable-tecnico": [
    { value: "rt", label: "RT" }
  ],
  "revisor-tecnico": [
    { value: "revisor-tecnico", label: "Revisor Técnico" }
  ],
  "evaluacion-conformidad": [
    { value: "evaluador", label: "Evaluador" }
  ],
  "especialista-norma": [
    { value: "especialista-tecnico", label: "Especialista Técnico" }
  ],
  "metrologia-calibracion": [
    { value: "metrologo", label: "Metrólogo" }
  ],
  "ndt": [
    { value: "inspector-ndt", label: "Inspector NDT" }
  ],
  "asme-api-leea": [
    { value: "sme", label: "SME (Subject Matter Expert)" }
  ],
  "sistema-gestion": [
    { value: "jefe-calidad", label: "Jefe de Calidad" },
    { value: "representante-direccion", label: "Representante de la Dirección" }
  ],
  "auditoria-interna": [
    { value: "auditor-interno", label: "Auditor Interno" }
  ],
  "documentacion": [
    { value: "coordinador-calidad", label: "Coordinador de Calidad" }
  ],
  "compliance": [
    { value: "compliance-officer", label: "Compliance Officer" }
  ],
  "seguridad-industrial": [
    { value: "prevencionista", label: "Prevencionista" }
  ],
  "salud-ocupacional": [
    { value: "especialista-hse", label: "Especialista HSE" }
  ],
  "medioambiente": [
    { value: "jefe-hse", label: "Jefe HSE" }
  ],
  "sistemas-infra": [
    { value: "admin-sistemas", label: "Admin Sistemas" }
  ],
  "data-bi": [
    { value: "analista-bi", label: "Analista BI/Power BI" },
    { value: "data-analyst", label: "Data Analyst" }
  ],
  "ciberseguridad": [
    { value: "especialista-ciberseguridad", label: "Especialista en Ciberseguridad" }
  ],
  "crm": [
    { value: "admin-crm", label: "Admin CRM (HubSpot/Salesforce)" }
  ],
  "performance-ads": [
    { value: "growth-performance", label: "Growth/Performance" }
  ],
  "contenido": [
    { value: "content-manager", label: "Content Manager" }
  ],
  "brand": [
    { value: "brand-manager", label: "Brand Manager" }
  ],
  "eventos": [
    { value: "event-coordinator", label: "Event Coordinator" }
  ],
  "reclutamiento": [
    { value: "recruiter", label: "Recruiter" }
  ],
  "desarrollo-capacitacion": [
    { value: "hrbp", label: "HRBP" },
    { value: "especialista-capacitacion", label: "Especialista de Capacitación" }
  ],
  "comp-ben": [
    { value: "analista-comp-ben", label: "Analista Comp&Ben" }
  ],
  "nomina": [
    { value: "analista-nomina", label: "Analista de Nómina" }
  ],
  "contabilidad": [
    { value: "contador", label: "Contador" }
  ],
  "tesoreria": [
    { value: "analista-financiero", label: "Analista Financiero" }
  ],
  "control-gestion": [
    { value: "controller", label: "Controller" },
    { value: "fpa", label: "FP&A" }
  ],
  "compras": [
    { value: "comprador", label: "Comprador" }
  ],
  "contratos-licitaciones": [
    { value: "abogado", label: "Abogado" },
    { value: "contract-manager", label: "Contract Manager" }
  ],
  "asuntos-regulatorios": [
    { value: "especialista-regulatorio", label: "Especialista Regulatorio" }
  ],
  "proveedores": [
    { value: "coordinador-scm", label: "Coordinador SCM" }
  ],
  "inventarios": [
    { value: "jefe-abastecimiento", label: "Jefe de Abastecimiento" }
  ],
  "mesa-ayuda": [
    { value: "agente-soporte", label: "Agente de Soporte" }
  ],
  "postventa": [
    { value: "cs-specialist", label: "CS Specialist" },
    { value: "coordinador-postventa", label: "Coordinador Postventa" }
  ],
  "soporte-tecnico": [
    { value: "soporte-tecnico", label: "Soporte Técnico" }
  ],
  "gestion-proyectos": [
    { value: "project-manager", label: "Project Manager" },
    { value: "pmo", label: "PMO" }
  ],
  "mejora-continua": [
    { value: "continuous-improvement", label: "Continuous Improvement Lead" }
  ],
  "unidad-negocio": [
    { value: "director-linea", label: "Director de Línea" },
    { value: "coo", label: "COO" },
    { value: "cto", label: "CTO (técnico)" },
    { value: "cco", label: "CCO" },
    { value: "cfo", label: "CFO" }
  ],
  "pais-region": [
    { value: "country-manager", label: "Country Manager" },
    { value: "gerente-general", label: "Gerente General" }
  ]
}

export const NIVELES_CARGO = [
  { value: "asistente", label: "Asistente" },
  { value: "analista", label: "Analista" },
  { value: "especialista", label: "Especialista" },
  { value: "coordinador", label: "Coordinador" },
  { value: "supervisor-jefe", label: "Supervisor/Jefe" },
  { value: "subgerente", label: "Subgerente" },
  { value: "gerente", label: "Gerente" },
  { value: "director", label: "Director" },
  { value: "c-level", label: "C-Level" }
]

export const SENIORITY_LEVELS = [
  { value: "junior", label: "Junior" },
  { value: "semi-senior", label: "Semi Senior" },
  { value: "senior", label: "Senior" },
  { value: "experto", label: "Experto" }
]

export const PERSONAS_CARGO = [
  { value: "0", label: "0" },
  { value: "1-5", label: "1–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-30", label: "16–30" },
  { value: "30+", label: ">30" }
]

export const RESPONSABILIDAD_PL = [
  { value: "no", label: "No" },
  { value: "si-1m", label: "Sí <1M USD" },
  { value: "si-1-5m", label: "Sí 1–5M" },
  { value: "si-5-20m", label: "Sí 5–20M" },
  { value: "si-20m+", label: ">20M" }
]

export const ALCANCE_GEOGRAFICO = [
  { value: "local", label: "Local" },
  { value: "nacional", label: "Nacional" },
  { value: "regional-latam", label: "Regional LATAM" },
  { value: "global", label: "Global" }
]

export const REPORTA_A = [
  { value: "jefatura", label: "Jefatura" },
  { value: "gerencia", label: "Gerencia" },
  { value: "direccion", label: "Dirección" },
  { value: "ceo-md", label: "CEO/Managing Director" }
]