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