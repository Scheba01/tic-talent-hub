import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationFormData } from "@/schemas/registration-schema";
import { PAISES_LATAM, FAMILIAS_ROL, TIPOS_LABORATORIO, AREAS_INSPECCION, NORMAS_SISTEMAS, SECTORES_PRODUCTOS, AREAS_PERSONAS, SECTORES_INDUSTRIA, NORMAS_COMPETENCIAS, IDIOMAS, NIVELES_IDIOMA, NIVELES_COMPETENCIA, AREAS_FUNCIONALES, SUBAREAS_POR_AREA, ROLES_POR_SUBAREA, NIVELES_CARGO, SENIORITY_LEVELS, PERSONAS_CARGO, RESPONSABILIDAD_PL, ALCANCE_GEOGRAFICO, REPORTA_A } from "@/lib/registration-data";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
const RegistroTalento = () => {
  const [selectedFamilias, setSelectedFamilias] = useState<string[]>([]);
  const [selectedAreaFuncional, setSelectedAreaFuncional] = useState<string>("");
  const [selectedSubarea, setSelectedSubarea] = useState<string>("");
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      familiasRol: [],
      sectores: [],
      competenciasNormas: [],
      idiomas: [{
        idioma: "",
        nivel: ""
      }],
      autorizacionDatos: false,
      areasInteres: [],
      disponibilidadMentorias: false,
      comentarios: "",
      areaFuncional: "",
      subarea: "",
      rolCargo: "",
      nivelCargo: "",
      seniority: "",
      personasCargo: "",
      responsabilidadPL: "",
      alcanceGeografico: "",
      reportaA: "",
      sueldoActualBruto: ""
    }
  });
  const watchedFamilias = form.watch("familiasRol");
  const onSubmit = (data: RegistrationFormData) => {
    console.log("Formulario enviado:", data);
    toast.success("Registro completado exitosamente");
  };
  const addIdioma = () => {
    const currentIdiomas = form.getValues("idiomas");
    form.setValue("idiomas", [...currentIdiomas, {
      idioma: "",
      nivel: ""
    }]);
  };
  const removeIdioma = (index: number) => {
    const currentIdiomas = form.getValues("idiomas");
    if (currentIdiomas.length > 1) {
      form.setValue("idiomas", currentIdiomas.filter((_, i) => i !== index));
    }
  };
  const addCompetencia = () => {
    const currentCompetencias = form.getValues("competenciasNormas");
    form.setValue("competenciasNormas", [...currentCompetencias, {
      norma: "",
      nivel: ""
    }]);
  };
  const removeCompetencia = (index: number) => {
    const currentCompetencias = form.getValues("competenciasNormas");
    form.setValue("competenciasNormas", currentCompetencias.filter((_, i) => i !== index));
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Registro de Candidato TIC
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Completa tu perfil profesional para acceder a las mejores oportunidades en el sector TIC de Latinoamérica.
            </p>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Formulario de Registro Candidato</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* 1) Datos personales */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">1. Datos Personales</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="nombreCompleto" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Nombre completo</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                        
                        <FormField control={form.control} name="email" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="telefono" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Teléfono (WhatsApp)</FormLabel>
                              <FormControl>
                                <Input type="tel" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="pais" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>País de residencia</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona tu país" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PAISES_LATAM.map(pais => <SelectItem key={pais.value} value={pais.value}>
                                      {pais.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="ciudad" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Ciudad</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />

                      </div>
                    </div>

                    {/* 2) Situación laboral & disponibilidad */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">2. Situación Laboral & Disponibilidad</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="situacionActual" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Situación actual</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona tu situación" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="empleado">Empleado</SelectItem>
                                  <SelectItem value="independiente">Independiente</SelectItem>
                                  <SelectItem value="desempleado">Desempleado</SelectItem>
                                  <SelectItem value="estudiante">Estudiante/Práctica</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="disponibilidad" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Disponibilidad</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona disponibilidad" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="inmediata">Inmediata</SelectItem>
                                  <SelectItem value="15-dias">15 días</SelectItem>
                                  <SelectItem value="30-dias">30 días</SelectItem>
                                  <SelectItem value="mas-30-dias">&gt;30 días</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="jornada" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Jornada</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona jornada" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="full-time">Full-time</SelectItem>
                                  <SelectItem value="part-time">Part-time</SelectItem>
                                  <SelectItem value="proyecto">Proyecto / Por horas</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="sueldoActualBruto" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Sueldo actual bruto (USD/mes)</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" placeholder="Ej: 2500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      </div>
                    </div>

                    {/* 3) Identidad de cargo (funcional) */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">3. Identidad de Cargo</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="areaFuncional" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Área</FormLabel>
                              <Select onValueChange={value => {
                          field.onChange(value);
                          setSelectedAreaFuncional(value);
                          setSelectedSubarea("");
                          form.setValue("subarea", "");
                          form.setValue("rolCargo", "");
                        }} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona área funcional" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {AREAS_FUNCIONALES.map(area => <SelectItem key={area.value} value={area.value}>
                                      {area.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="subarea" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Subárea</FormLabel>
                              <Select onValueChange={value => {
                          field.onChange(value);
                          setSelectedSubarea(value);
                          form.setValue("rolCargo", "");
                        }} defaultValue={field.value} disabled={!selectedAreaFuncional}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona subárea" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {selectedAreaFuncional && SUBAREAS_POR_AREA[selectedAreaFuncional]?.map(subarea => <SelectItem key={subarea.value} value={subarea.value}>
                                      {subarea.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="rolCargo" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Rol/Cargo</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedSubarea}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona rol/cargo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {selectedSubarea && ROLES_POR_SUBAREA[selectedSubarea]?.map(rol => <SelectItem key={rol.value} value={rol.value}>
                                      {rol.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="nivelCargo" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Nivel de cargo</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona nivel de cargo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {NIVELES_CARGO.map(nivel => <SelectItem key={nivel.value} value={nivel.value}>
                                      {nivel.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="seniority" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Seniority</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona seniority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {SENIORITY_LEVELS.map(seniority => <SelectItem key={seniority.value} value={seniority.value}>
                                      {seniority.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="personasCargo" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Personas a cargo (máx.)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona personas a cargo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PERSONAS_CARGO.map(personas => <SelectItem key={personas.value} value={personas.value}>
                                      {personas.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="responsabilidadPL" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Responsabilidad P&L</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona responsabilidad P&L" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {RESPONSABILIDAD_PL.map(responsabilidad => <SelectItem key={responsabilidad.value} value={responsabilidad.value}>
                                      {responsabilidad.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="alcanceGeografico" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Alcance geográfico</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona alcance geográfico" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {ALCANCE_GEOGRAFICO.map(alcance => <SelectItem key={alcance.value} value={alcance.value}>
                                      {alcance.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="reportaA" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Reporta a</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona a quién reporta" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {REPORTA_A.map(reporta => <SelectItem key={reporta.value} value={reporta.value}>
                                      {reporta.label}
                                    </SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />
                      </div>
                    </div>

                    {/* 4) Familias de rol */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">4. Familias de Rol (elige una o más)</h3>
                      <FormField control={form.control} name="familiasRol" render={({
                      field
                    }) => <FormItem>
                            <FormControl>
                              <MultiSelect options={FAMILIAS_ROL} selected={field.value} onChange={field.onChange} placeholder="Selecciona familias de rol..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </div>

                    {/* Subformularios condicionales */}
                    {watchedFamilias?.includes("laboratorio") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Laboratorio (ISO/IEC 17025)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <div className="md:col-span-2">
                            <FormField control={form.control} name="laboratorio.tiposLaboratorio" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel>Tipo de laboratorio</FormLabel>
                                  <FormControl>
                                    <MultiSelect options={TIPOS_LABORATORIO} selected={field.value || []} onChange={field.onChange} placeholder="Selecciona tipos de laboratorio..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                          
                          <FormField control={form.control} name="laboratorio.rol" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Rol</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona rol" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="analista">Analista</SelectItem>
                                    <SelectItem value="especialista">Especialista</SelectItem>
                                    <SelectItem value="coordinador">Coordinador</SelectItem>
                                    <SelectItem value="jefe">Jefe de laboratorio</SelectItem>
                                    <SelectItem value="responsable">Responsable técnico</SelectItem>
                                    <SelectItem value="metrologo">Metrólogo</SelectItem>
                                    <SelectItem value="tecnico">Técnico de calibración</SelectItem>
                                    <SelectItem value="evaluador">Evaluador interno</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="laboratorio.experiencia17025" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Acreditación/experiencia 17025</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona experiencia" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="sin-experiencia">Sin experiencia</SelectItem>
                                    <SelectItem value="0-2">0–2 años</SelectItem>
                                    <SelectItem value="3-5">3–5 años</SelectItem>
                                    <SelectItem value="6-9">6–9 años</SelectItem>
                                    <SelectItem value="10-mas">10+ años</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <div className="md:col-span-2">
                            <FormField control={form.control} name="laboratorio.experienciaAuditorias" render={({
                          field
                        }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>5. Sectores/Industrias (Eligir uno o mas donde tienes experiencia)</FormLabel>
                                  </div>
                                </FormItem>} />
                          </div>
                        </div>
                      </div>}

                    {watchedFamilias?.includes("inspeccion") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Inspección (ISO/IEC 17020)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="inspeccion.tipoOrganismo" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Tipo de organismo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona tipo" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="tipo-a">Tipo A</SelectItem>
                                    <SelectItem value="tipo-b">Tipo B</SelectItem>
                                    <SelectItem value="tipo-c">Tipo C</SelectItem>
                                    <SelectItem value="desconocido">Desconocido</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="inspeccion.rol" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Rol</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona rol" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="inspector-junior">Inspector Junior</SelectItem>
                                    <SelectItem value="inspector">Inspector</SelectItem>
                                    <SelectItem value="inspector-senior">Inspector Senior</SelectItem>
                                    <SelectItem value="supervisor">Supervisor</SelectItem>
                                    <SelectItem value="jefe">Jefe de inspección</SelectItem>
                                    <SelectItem value="coordinador">Coordinador técnico</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="inspeccion.experiencia17020" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Experiencia 17020</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona experiencia" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="sin-experiencia">Sin experiencia</SelectItem>
                                    <SelectItem value="0-2">0–2 años</SelectItem>
                                    <SelectItem value="3-5">3–5 años</SelectItem>
                                    <SelectItem value="6-9">6–9 años</SelectItem>
                                    <SelectItem value="10-mas">10+ años</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <div className="md:col-span-2">
                            <FormField control={form.control} name="inspeccion.areasInspeccion" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel>Áreas de inspección</FormLabel>
                                  <FormControl>
                                    <MultiSelect options={AREAS_INSPECCION} selected={field.value || []} onChange={field.onChange} placeholder="Selecciona áreas de inspección..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>}

                    {/* Continue with other conditional subforms... */}
                    
                    {/* 5) Sectores/Industrias */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">5. Sectores/Industrias</h3>
                      <FormField control={form.control} name="sectores" render={({
                      field
                    }) => <FormItem>
                            <FormControl>
                              <MultiSelect options={SECTORES_INDUSTRIA} selected={field.value} onChange={field.onChange} placeholder="Selecciona sectores de interés..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </div>

                    {/* 6) Competencias y normas */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">6. Competencias y Normas</h3>
                      <div className="space-y-4">
                        {form.watch("competenciasNormas")?.map((_, index) => <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <FormField control={form.control} name={`competenciasNormas.${index}.norma`} render={({
                          field
                        }) => <FormItem>
                                  <FormLabel>Norma/Esquema</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecciona norma" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {NORMAS_COMPETENCIAS.map(norma => <SelectItem key={norma.value} value={norma.value}>
                                          {norma.label}
                                        </SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>} />

                            <FormField control={form.control} name={`competenciasNormas.${index}.nivel`} render={({
                          field
                        }) => <FormItem>
                                  <FormLabel>Nivel</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecciona nivel" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {NIVELES_COMPETENCIA.map(nivel => <SelectItem key={nivel.value} value={nivel.value}>
                                          {nivel.label}
                                        </SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>} />

                            <Button type="button" variant="outline" size="sm" onClick={() => removeCompetencia(index)} disabled={form.watch("competenciasNormas")?.length <= 1}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>)}
                        <Button type="button" variant="outline" onClick={addCompetencia}>
                          <Plus className="h-4 w-4 mr-2" />
                          Añadir competencia
                        </Button>
                      </div>
                    </div>

                    {/* 7) Formación académica */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">7. Formación Académica</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="nivelMaximo" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Máximo nivel</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona nivel" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="tecnico">Técnico</SelectItem>
                                  <SelectItem value="tecnologo">Tecnólogo</SelectItem>
                                  <SelectItem value="universitario">Universitario</SelectItem>
                                  <SelectItem value="postgrado">Postgrado</SelectItem>
                                  <SelectItem value="mba-doctorado">MBA/Doctorado</SelectItem>
                                  <SelectItem value="en-curso">En curso</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="areaEstudio" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Área de estudio</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona área" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="ingenieria">Ingeniería</SelectItem>
                                  <SelectItem value="quimica">Química/Alimentos</SelectItem>
                                  <SelectItem value="industrial">Industrial</SelectItem>
                                  <SelectItem value="electrica">Eléctrica/Electrónica</SelectItem>
                                  <SelectItem value="mecanica">Mecánica</SelectItem>
                                  <SelectItem value="civil">Civil</SelectItem>
                                  <SelectItem value="ti">TI</SelectItem>
                                  <SelectItem value="salud">Salud</SelectItem>
                                  <SelectItem value="administracion">Administración</SelectItem>
                                  <SelectItem value="otros">Otros</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <div className="md:col-span-2">
                          <FormField control={form.control} name="certificaciones" render={({
                          field
                        }) => <FormItem>
                                <FormLabel>Certificaciones relevantes (separadas por coma)</FormLabel>
                                <FormControl>
                                  <Textarea {...field} placeholder="ISO 9001 Lead Auditor, PMP, CISSP..." />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />
                        </div>
                      </div>
                    </div>

                    {/* 8) Idiomas */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">8. Idiomas</h3>
                      <div className="space-y-4">
                        {form.watch("idiomas")?.map((_, index) => <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <FormField control={form.control} name={`idiomas.${index}.idioma`} render={({
                          field
                        }) => <FormItem>
                                  <FormLabel>Idioma</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecciona idioma" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {IDIOMAS.map(idioma => <SelectItem key={idioma.value} value={idioma.value}>
                                          {idioma.label}
                                        </SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>} />

                            <FormField control={form.control} name={`idiomas.${index}.nivel`} render={({
                          field
                        }) => <FormItem>
                                  <FormLabel>Nivel</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecciona nivel" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {NIVELES_IDIOMA.map(nivel => <SelectItem key={nivel.value} value={nivel.value}>
                                          {nivel.label}
                                        </SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>} />

                            <Button type="button" variant="outline" size="sm" onClick={() => removeIdioma(index)} disabled={form.watch("idiomas")?.length <= 1}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>)}
                        <Button type="button" variant="outline" onClick={addIdioma}>
                          <Plus className="h-4 w-4 mr-2" />
                          Añadir idioma
                        </Button>
                      </div>
                    </div>

                    {/* 9) Cumplimiento & elegibilidad */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">9. Cumplimiento & Elegibilidad</h3>
                      <div className="space-y-4">
                        <FormField control={form.control} name="autorizacionDatos" render={({
                        field
                      }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-primary font-medium">
                                  Autorización de datos y verificación de referencias (obligatorio) *
                                </FormLabel>
                              </div>
                              <FormMessage />
                            </FormItem>} />
                      </div>
                    </div>

                    {/* 10) Documentos */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">10. Documentos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="cv" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Subir CV (PDF)</FormLabel>
                              <FormControl>
                                <Input type="file" accept=".pdf" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="certificadosAdicionales" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Certificados (ZIP/PDF)</FormLabel>
                              <FormControl>
                                <Input type="file" accept=".pdf,.zip" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />

                        <div className="md:col-span-2">
                          <FormField control={form.control} name="linkedin" render={({
                          field
                        }) => <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>
                                  <Input type="url" placeholder="https://linkedin.com/in/tu-perfil" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />
                        </div>
                      </div>
                    </div>

                    {/* 11) Notas y preferencias */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">11. Notas y Preferencias</h3>
                      <div className="space-y-6">
                        <FormField control={form.control} name="areasInteres" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Áreas de interés prioritarias</FormLabel>
                              <FormControl>
                                <MultiSelect options={FAMILIAS_ROL} selected={field.value} onChange={field.onChange} placeholder="Selecciona áreas de interés..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="disponibilidadMentorias" render={({
                        field
                      }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Disponibilidad para mentorías / charlas
                                </FormLabel>
                              </div>
                            </FormItem>} />

                        <FormField control={form.control} name="comentarios" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Comentarios adicionales</FormLabel>
                              <FormControl>
                                <Textarea {...field} placeholder="Información adicional relevante..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-6">
                      <Button type="submit" className="btn-hero px-8">
                        FINALIZAR REGISTRO
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default RegistroTalento;