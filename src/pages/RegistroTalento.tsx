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
import { PAISES_LATAM, FAMILIAS_ROL, TIPOS_LABORATORIO, AREAS_INSPECCION, NORMAS_SISTEMAS, SECTORES_PRODUCTOS, AREAS_PERSONAS, SECTORES_INDUSTRIA, NORMAS_COMPETENCIAS, IDIOMAS, NIVELES_IDIOMA, NIVELES_COMPETENCIA, AREAS_FUNCIONALES, SUBAREAS_POR_AREA, ROLES_POR_SUBAREA, NIVELES_CARGO, SENIORITY_LEVELS, PERSONAS_CARGO, RESPONSABILIDAD_PL, ALCANCE_GEOGRAFICO, REPORTA_A, COUNTRY_CODES } from "@/lib/registration-data";
import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { submitCandidate } from "@/lib/candidate-service";
import { useAuth } from "@/hooks/useAuth";

const RegistroTalento = () => {
  console.log("RegistroTalento component loaded"); // Debug log
  const [selectedAreaFuncional, setSelectedAreaFuncional] = useState<string>("");
  const [selectedSubarea, setSelectedSubarea] = useState<string>("");
  const { user, profile } = useAuth();
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      nombreCompleto: "",
      email: "",
      codigoPais: "+56",
      familiasRol: [{
        area: "",
        comentarios: ""
      }],
      sectores: [],
      competenciasNormas: [""],
      idiomas: [{
        idioma: "",
        nivel: ""
      }],
      autorizacionDatos: false,
      experienciaLaboral: [],
      comentarios: ""
    }
  });

  // Pre-fill form with user data when available
  useEffect(() => {
    if (user && profile) {
      form.setValue("nombreCompleto", profile.nombre_completo || "");
      form.setValue("email", user.email || "");
    }
  }, [user, profile, form]);
  const onSubmit = async (data: RegistrationFormData) => {
    try {
      toast.loading("Enviando registro...", { id: "submit-form" });
      
      const result = await submitCandidate(data);
      
      if (result.success) {
        toast.success("¡Registro completado exitosamente! 📧 Recibirás un correo de verificación. Accede a tu cuenta para hacer visible tu perfil a las empresas.", { 
          id: "submit-form",
          duration: 6000,
          className: "bg-success text-success-foreground border-success"
        });
        form.reset();
      } else {
        toast.error(result.message || "Error al enviar el registro", { id: "submit-form" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error inesperado. Por favor intenta nuevamente.", { id: "submit-form" });
    }
  };
  const addIdioma = () => {
    const currentIdiomas = form.getValues("idiomas");
    form.setValue("idiomas", [...currentIdiomas, {
      idioma: "",
      nivel: ""
    }]);
  };
  
  const addAreaExperiencia = () => {
    const currentAreas = form.getValues("familiasRol");
    form.setValue("familiasRol", [...currentAreas, {
      area: "",
      comentarios: ""
    }]);
  };

  const removeAreaExperiencia = (index: number) => {
    const currentAreas = form.getValues("familiasRol");
    if (currentAreas.length > 1) {
      form.setValue("familiasRol", currentAreas.filter((_, i) => i !== index));
    }
  };
  const removeIdioma = (index: number) => {
    const currentIdiomas = form.getValues("idiomas");
    if (currentIdiomas.length > 1) {
      form.setValue("idiomas", currentIdiomas.filter((_, i) => i !== index));
    }
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
                {!user && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      ¿Ya tienes una cuenta? 
                      <Link to="/auth" className="ml-1 text-primary hover:text-primary/80 font-medium">
                        Inicia sesión aquí
                      </Link>
                      {" "}o{" "}
                      <Link to="/auth" className="text-primary hover:text-primary/80 font-medium">
                        restablece tu contraseña
                      </Link>
                    </p>
                  </div>
                )}
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
                              <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div>
                          <div className="space-y-2">
                            <Label>Teléfono (WhatsApp) <span className="text-red-500">*</span></Label>
                            <div className="flex gap-2">
                              <FormField control={form.control} name="codigoPais" render={({
                                field
                              }) => (
                                <FormItem className="w-32">
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="🇨🇱 +56" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {COUNTRY_CODES.map(code => (
                                        <SelectItem key={code.value} value={code.value}>
                                          {code.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )} />
                              
                              {form.watch("codigoPais") === "otro" && (
                                <FormField control={form.control} name="codigoOtro" render={({
                                  field
                                }) => (
                                  <FormItem className="w-24">
                                    <FormControl>
                                      <Input type="text" placeholder="+1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )} />
                              )}
                              
                              <FormField control={form.control} name="telefono" render={({
                                field
                              }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input type="tel" placeholder="9 1234 5678" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            </div>
                          </div>
                        </div>

                        <div>
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
                        </div>
                      </div>

                      {form.watch("pais") === "otro" && (
                        <FormField control={form.control} name="paisOtro" render={({
                          field
                        }) => <FormItem>
                              <FormLabel>Especifica tu país</FormLabel>
                              <FormControl>
                                <Input placeholder="Escribe tu país" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      )}

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

                    {/* 3) Familias de rol */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">3. En qué área tienes experiencia? (elige una o más)</h3>
                      <div className="space-y-4">
                        {form.watch("familiasRol")?.map((_, index) => (
                          <div key={index} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                              <FormField control={form.control} name={`familiasRol.${index}.area`} render={({
                                field
                              }) => <FormItem>
                                        <FormLabel>Área de experiencia</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Selecciona área" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {FAMILIAS_ROL.map(familia => <SelectItem key={familia.value} value={familia.value}>
                                                {familia.label}
                                              </SelectItem>)}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>} />

                              <Button type="button" variant="outline" size="sm" onClick={() => removeAreaExperiencia(index)} disabled={form.watch("familiasRol")?.length <= 1}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {/* Campo condicional para "Otro" área */}
                            {form.watch(`familiasRol.${index}.area`) === "otro" && (
                              <FormField control={form.control} name={`familiasRol.${index}.areaOtro`} render={({
                                field
                              }) => <FormItem>
                                      <FormLabel>Especifica otra área</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder="Ingresa el área de experiencia" />
                                      </FormControl>
                                      <FormMessage />
                                     </FormItem>} />
                              )}
                          </div>
                        ))}
                        
                        {/* Añadir área de experiencia button */}
                        <div className="mt-4">
                          <Button type="button" variant="outline" onClick={addAreaExperiencia}>
                            <Plus className="h-4 w-4 mr-2" />
                            Añadir área de experiencia
                          </Button>
                        </div>
                       </div>
                    </div>

                    {/* Subformularios condicionales */}
                    {form.watch("familiasRol")?.some(f => f.area === "laboratorio") && <div>
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
                                 
                            {/* Campo condicional para "Otros" tipos de laboratorio */}
                            {form.watch("laboratorio.tiposLaboratorio")?.includes("otros") && (
                              <FormField control={form.control} name="laboratorio.tiposLaboratorioOtro" render={({
                                field
                              }) => <FormItem>
                                      <FormLabel>Especifica otros tipos de laboratorio</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder="Describe otros tipos de laboratorio" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>} />
                            )}
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
                                     <SelectItem value="otro">Otro</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>} />

                          {/* Campo condicional para "Otro" rol laboratorio */}
                          {form.watch("laboratorio.rol") === "otro" && (
                            <FormField control={form.control} name="laboratorio.rolOtro" render={({
                              field
                            }) => <FormItem>
                                    <FormLabel>Especifica otro rol</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Describe tu rol" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>} />
                          )}

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
                            <FormField control={form.control} name="laboratorio.comentarios" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en laboratorio..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                          
                          <div className="md:col-span-2">
                            <Button type="button" variant="outline" onClick={addAreaExperiencia}>
                              <Plus className="h-4 w-4 mr-2" />
                              Añadir área de experiencia
                            </Button>
                          </div>
                        </div>
                      </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "inspeccion") && <div>
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
                                     <SelectItem value="otro">Otro</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>} />

                          {/* Campo condicional para "Otro" rol inspección */}
                          {form.watch("inspeccion.rol") === "otro" && (
                            <FormField control={form.control} name="inspeccion.rolOtro" render={({
                              field
                            }) => <FormItem>
                                    <FormLabel>Especifica otro rol</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Describe tu rol" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>} />
                          )}

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
                                 
                            {/* Campo condicional para "Otros" áreas de inspección */}
                            {form.watch("inspeccion.areasInspeccion")?.includes("otros") && (
                              <FormField control={form.control} name="inspeccion.areasInspeccionOtro" render={({
                                field
                              }) => <FormItem>
                                      <FormLabel>Especifica otras áreas de inspección</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder="Describe otras áreas de inspección" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>} />
                             )}
                          </div>
                          
                          <div className="md:col-span-2">
                            <FormField control={form.control} name="inspeccion.comentarios" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en inspección..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "validacion-verificacion") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Validación y Verificación (ISO/IEC 17029 / ISO 14065)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="validacionVerificacion.tipoOrganismo" render={({
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
                                    <SelectItem value="validacion">Validación (ISO/IEC 17029)</SelectItem>
                                    <SelectItem value="verificacion">Verificación (ISO/IEC 17029)</SelectItem>
                                    <SelectItem value="carbono">Verificación de carbono (ISO 14065)</SelectItem>
                                    <SelectItem value="gases-efecto-invernadero">Gases de efecto invernadero</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="validacionVerificacion.rol" render={({
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
                                    <SelectItem value="validador">Validador</SelectItem>
                                    <SelectItem value="verificador">Verificador</SelectItem>
                                    <SelectItem value="revisor-tecnico">Revisor técnico</SelectItem>
                                    <SelectItem value="coordinador">Coordinador técnico</SelectItem>
                                     <SelectItem value="jefe">Jefe de validación/verificación</SelectItem>
                                     <SelectItem value="otro">Otro</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>} />

                          {/* Campo condicional para "Otro" rol validación/verificación */}
                          {form.watch("validacionVerificacion.rol") === "otro" && (
                            <FormField control={form.control} name="validacionVerificacion.rolOtro" render={({
                              field
                            }) => <FormItem>
                                    <FormLabel>Especifica otro rol</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Describe tu rol" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>} />
                          )}

                          <FormField control={form.control} name="validacionVerificacion.experiencia17029" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Experiencia 17029/14065</FormLabel>
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
                            <FormField control={form.control} name="validacionVerificacion.comentarios" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en validación/verificación..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "cert-sistemas") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Certificación de Sistemas (ISO/IEC 17021-1)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <div className="md:col-span-2">
                            <FormField control={form.control} name="certSistemas.normas" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Normas de sistemas</FormLabel>
                                  <FormControl>
                                    <MultiSelect options={NORMAS_SISTEMAS} selected={field.value || []} onChange={field.onChange} placeholder="Selecciona normas de sistemas..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                          
                          <FormField control={form.control} name="certSistemas.nivelCompetencia" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Nivel de competencia</FormLabel>
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

                          <div className="flex items-center space-x-2">
                            <FormField control={form.control} name="certSistemas.registroIRCA" render={({
                              field
                            }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>¿Tienes registro IRCA?</FormLabel>
                                  </div>
                                </FormItem>} />
                                
                            {form.watch("certSistemas.registroIRCA") && (
                              <FormField control={form.control} name="certSistemas.idIRCA" render={({
                                field
                              }) => <FormItem>
                                      <FormControl>
                                        <Input {...field} placeholder="ID IRCA" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>} />
                             )}
                           </div>
                           
                           <div className="md:col-span-2">
                             <FormField control={form.control} name="certSistemas.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en certificación de sistemas..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "cert-productos") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Certificación de Productos (ISO/IEC 17065)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <div className="md:col-span-2">
                            <FormField control={form.control} name="certProductos.sectores" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Sectores de productos</FormLabel>
                                  <FormControl>
                                    <MultiSelect options={SECTORES_PRODUCTOS} selected={field.value || []} onChange={field.onChange} placeholder="Selecciona sectores de productos..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                          
                          <FormField control={form.control} name="certProductos.rol" render={({
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
                                    <SelectItem value="evaluador">Evaluador</SelectItem>
                                    <SelectItem value="revisor">Revisor técnico</SelectItem>
                                    <SelectItem value="coordinador">Coordinador</SelectItem>
                                    <SelectItem value="jefe">Jefe de certificación</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="certProductos.experiencia17065" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Experiencia 17065</FormLabel>
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
                             <FormField control={form.control} name="certProductos.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en certificación de productos..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "cert-personas") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Certificación de Personas (ISO/IEC 17024)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <div className="md:col-span-2">
                            <FormField control={form.control} name="certPersonas.areas" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Áreas de certificación de personas</FormLabel>
                                  <FormControl>
                                    <MultiSelect options={AREAS_PERSONAS} selected={field.value || []} onChange={field.onChange} placeholder="Selecciona áreas de personas..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                          
                          <FormField control={form.control} name="certPersonas.rol" render={({
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
                                    <SelectItem value="evaluador">Evaluador</SelectItem>
                                    <SelectItem value="revisor">Revisor técnico</SelectItem>
                                    <SelectItem value="coordinador">Coordinador</SelectItem>
                                    <SelectItem value="jefe">Jefe de certificación</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="certPersonas.experiencia17024" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Experiencia 17024</FormLabel>
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
                             <FormField control={form.control} name="certPersonas.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en certificación de personas..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "auditoria") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Auditoría (Interno/Lead)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <div className="md:col-span-2">
                            <FormField control={form.control} name="auditoria.tipoAuditor" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Tipo de auditor</FormLabel>
                                  <FormControl>
                                    <MultiSelect 
                                      options={[
                                        { value: "interno", label: "Auditor interno" },
                                        { value: "lead", label: "Lead auditor" },
                                        { value: "jefe", label: "Jefe de auditores" }
                                      ]} 
                                      selected={field.value || []} 
                                      onChange={field.onChange} 
                                      placeholder="Selecciona tipo de auditor..." 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                          
                          <div className="md:col-span-2">
                            <FormField control={form.control} name="auditoria.normasAuditadas" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Normas que auditas</FormLabel>
                                  <FormControl>
                                    <MultiSelect options={NORMAS_SISTEMAS} selected={field.value || []} onChange={field.onChange} placeholder="Selecciona normas auditadas..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>

                          <FormField control={form.control} name="auditoria.horasAuditoria" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Horas de auditoría</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona horas" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0-50">0-50 horas</SelectItem>
                                    <SelectItem value="51-100">51-100 horas</SelectItem>
                                    <SelectItem value="101-200">101-200 horas</SelectItem>
                                    <SelectItem value="201-500">201-500 horas</SelectItem>
                                    <SelectItem value="500-mas">500+ horas</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <div className="flex items-center space-x-2">
                            <FormField control={form.control} name="auditoria.registroIRCA" render={({
                              field
                            }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>¿Tienes registro IRCA?</FormLabel>
                                  </div>
                                </FormItem>} />
                                
                            {form.watch("auditoria.registroIRCA") && (
                              <FormField control={form.control} name="auditoria.idIRCA" render={({
                                field
                              }) => <FormItem>
                                      <FormControl>
                                        <Input {...field} placeholder="ID IRCA" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>} />
                             )}
                           </div>
                           
                           <div className="md:col-span-2">
                             <FormField control={form.control} name="auditoria.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en auditoría..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "operaciones") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Operaciones / Jefaturas / Gerencias</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="operaciones.nivel" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Nivel de cargo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona nivel" />
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

                          <div className="md:col-span-2">
                            <FormField control={form.control} name="operaciones.areas" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Áreas funcionales</FormLabel>
                                  <FormControl>
                                    <MultiSelect options={AREAS_FUNCIONALES} selected={field.value || []} onChange={field.onChange} placeholder="Selecciona áreas funcionales..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>

                          <FormField control={form.control} name="operaciones.presupuesto" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Presupuesto anual gestionado</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona rango" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0-100k">0-100k USD</SelectItem>
                                    <SelectItem value="100k-500k">100k-500k USD</SelectItem>
                                    <SelectItem value="500k-1m">500k-1M USD</SelectItem>
                                    <SelectItem value="1m-5m">1M-5M USD</SelectItem>
                                    <SelectItem value="5m-mas">5M+ USD</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="operaciones.personasCargo" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Personas a cargo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona cantidad" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {PERSONAS_CARGO.map(cantidad => <SelectItem key={cantidad.value} value={cantidad.value}>
                                        {cantidad.label}
                                      </SelectItem>)}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                               </FormItem>} />
                           
                           <div className="md:col-span-2">
                             <FormField control={form.control} name="operaciones.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en operaciones..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "comercial") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Comercial / KAM / Desarrollo de Negocio</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="comercial.rol" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Rol comercial</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona rol" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="vendedor">Vendedor</SelectItem>
                                    <SelectItem value="kam">Key Account Manager</SelectItem>
                                    <SelectItem value="desarrollo">Desarrollo de negocio</SelectItem>
                                    <SelectItem value="gerente">Gerente comercial</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <div className="md:col-span-2">
                            <FormField control={form.control} name="comercial.lineasDominadas" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Líneas de servicio dominadas</FormLabel>
                                  <FormControl>
                                    <MultiSelect 
                                      options={[
                                        { value: "laboratorio", label: "Laboratorio" },
                                        { value: "inspeccion", label: "Inspección" },
                                        { value: "certificacion", label: "Certificación" },
                                        { value: "consultoria", label: "Consultoría" },
                                        { value: "formacion", label: "Formación" }
                                      ]} 
                                      selected={field.value || []} 
                                      onChange={field.onChange} 
                                      placeholder="Selecciona líneas de servicio..." 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>

                          <FormField control={form.control} name="comercial.ticketPromedio" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Ticket promedio gestionado</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona rango" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0-5k">0-5k USD</SelectItem>
                                    <SelectItem value="5k-25k">5k-25k USD</SelectItem>
                                    <SelectItem value="25k-100k">25k-100k USD</SelectItem>
                                    <SelectItem value="100k-500k">100k-500k USD</SelectItem>
                                    <SelectItem value="500k-mas">500k+ USD</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <div className="md:col-span-2">
                            <FormField control={form.control} name="comercial.sectoresAtendidos" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Sectores atendidos</FormLabel>
                                  <FormControl>
                                    <MultiSelect options={SECTORES_INDUSTRIA} selected={field.value || []} onChange={field.onChange} placeholder="Selecciona sectores atendidos..." />
                                  </FormControl>
                                  <FormMessage />
                                 </FormItem>} />
                           </div>
                           
                           <div className="md:col-span-2">
                             <FormField control={form.control} name="comercial.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en el área comercial..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "marketing") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Marketing</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="marketing.rol" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Rol en marketing</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona rol" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="especialista">Especialista en marketing</SelectItem>
                                    <SelectItem value="digital">Marketing digital</SelectItem>
                                    <SelectItem value="contenido">Marketing de contenido</SelectItem>
                                    <SelectItem value="coordinador">Coordinador</SelectItem>
                                    <SelectItem value="gerente">Gerente de marketing</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="marketing.experiencia" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Años de experiencia</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona experiencia" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0-2">0–2 años</SelectItem>
                                    <SelectItem value="3-5">3–5 años</SelectItem>
                                    <SelectItem value="6-9">6–9 años</SelectItem>
                                    <SelectItem value="10-mas">10+ años</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                               </FormItem>} />
                           
                           <div className="md:col-span-2">
                             <FormField control={form.control} name="marketing.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en marketing..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "rrhh") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">RRHH</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="rrhh.rol" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Rol en RRHH</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona rol" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="generalista">Generalista RRHH</SelectItem>
                                    <SelectItem value="reclutamiento">Reclutamiento y selección</SelectItem>
                                    <SelectItem value="formacion">Formación y desarrollo</SelectItem>
                                    <SelectItem value="compensacion">Compensación y beneficios</SelectItem>
                                    <SelectItem value="coordinador">Coordinador</SelectItem>
                                    <SelectItem value="gerente">Gerente de RRHH</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="rrhh.experiencia" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Años de experiencia</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona experiencia" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0-2">0–2 años</SelectItem>
                                    <SelectItem value="3-5">3–5 años</SelectItem>
                                    <SelectItem value="6-9">6–9 años</SelectItem>
                                    <SelectItem value="10-mas">10+ años</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                               </FormItem>} />
                           
                           <div className="md:col-span-2">
                             <FormField control={form.control} name="rrhh.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en RRHH..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "finanzas") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Finanzas / Control</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="finanzas.rol" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Rol en finanzas</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona rol" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="analista">Analista financiero</SelectItem>
                                    <SelectItem value="contador">Contador</SelectItem>
                                    <SelectItem value="control">Control de gestión</SelectItem>
                                    <SelectItem value="tesoreria">Tesorería</SelectItem>
                                    <SelectItem value="coordinador">Coordinador</SelectItem>
                                    <SelectItem value="gerente">Gerente financiero</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="finanzas.experiencia" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Años de experiencia</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona experiencia" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0-2">0–2 años</SelectItem>
                                    <SelectItem value="3-5">3–5 años</SelectItem>
                                    <SelectItem value="6-9">6–9 años</SelectItem>
                                    <SelectItem value="10-mas">10+ años</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />
                        </div>
                      </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "todos-transversal") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Todos - Transversal</h4>
                        <div className="grid grid-cols-1 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="todosTransversal.comentarios" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Describe tu experiencia transversal</FormLabel>
                                <FormControl>
                                  <Textarea {...field} placeholder="Describe tu experiencia que abarca múltiples áreas o aspectos transversales..." />
                                </FormControl>
                                <FormMessage />
                               </FormItem>} />
                           
                           <div className="md:col-span-2">
                             <FormField control={form.control} name="finanzas.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en finanzas..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "consultoria") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Consultoría / Asesoría</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <FormField control={form.control} name="consultoria.rol" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Tipo de consultoría</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona tipo" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="estrategica">Consultoría estratégica</SelectItem>
                                    <SelectItem value="implementacion">Implementación de sistemas</SelectItem>
                                    <SelectItem value="auditoria-consultoria">Auditoría y consultoría</SelectItem>
                                    <SelectItem value="mejora-procesos">Mejora de procesos</SelectItem>
                                    <SelectItem value="formacion">Formación y capacitación</SelectItem>
                                    <SelectItem value="compliance">Compliance y regulatorio</SelectItem>
                                    <SelectItem value="especializda">Consultoría especializada</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="consultoria.experiencia" render={({
                            field
                          }) => <FormItem>
                                <FormLabel>Años de experiencia</FormLabel>
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
                            <FormField control={form.control} name="consultoria.areas" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Áreas de especialización</FormLabel>
                                  <FormControl>
                                    <MultiSelect 
                                      options={[
                                        { value: "iso-9001", label: "ISO 9001" },
                                        { value: "iso-14001", label: "ISO 14001" },
                                        { value: "iso-45001", label: "ISO 45001" },
                                        { value: "iso-27001", label: "ISO 27001" },
                                        { value: "iso-22000", label: "ISO 22000" },
                                        { value: "iso-17025", label: "ISO/IEC 17025" },
                                        { value: "iso-17020", label: "ISO/IEC 17020" },
                                        { value: "iso-17021", label: "ISO/IEC 17021" },
                                        { value: "lean-six-sigma", label: "Lean Six Sigma" },
                                        { value: "transformacion-digital", label: "Transformación digital" },
                                        { value: "gestion-riesgos", label: "Gestión de riesgos" },
                                        { value: "otros", label: "Otros" }
                                      ]} 
                                      selected={field.value || []} 
                                      onChange={field.onChange} 
                                      placeholder="Selecciona áreas..." 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>

                          <div className="md:col-span-2">
                            <FormField control={form.control} name="consultoria.comentarios" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Describe tu experiencia en consultoría</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} placeholder="Describe tu experiencia en consultoría, proyectos destacados, metodologías utilizadas..." />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>}

                    {form.watch("familiasRol")?.some(f => f.area === "implementador") && <div>
                        <h4 className="text-lg font-semibold mb-4 text-primary">Implementador</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                          <div>
                            <FormField control={form.control} name="implementador.tipoImplementacion" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Tipo de implementación</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecciona tipo" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="sistemas-gestion">Sistemas de Gestión</SelectItem>
                                      <SelectItem value="normas-iso">Normas ISO</SelectItem>
                                      <SelectItem value="procesos-calidad">Procesos de Calidad</SelectItem>
                                      <SelectItem value="mejora-continua">Mejora Continua</SelectItem>
                                      <SelectItem value="lean-six-sigma">Lean Six Sigma</SelectItem>
                                      <SelectItem value="seguridad-salud">Seguridad y Salud Ocupacional</SelectItem>
                                      <SelectItem value="medio-ambiente">Medio Ambiente</SelectItem>
                                      <SelectItem value="otros">Otros</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>} />
                          </div>

                          <div>
                            <FormField control={form.control} name="implementador.experienciaAnios" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Años de experiencia</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecciona años" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1-2">1-2 años</SelectItem>
                                      <SelectItem value="3-5">3-5 años</SelectItem>
                                      <SelectItem value="6-10">6-10 años</SelectItem>
                                      <SelectItem value="11-15">11-15 años</SelectItem>
                                      <SelectItem value="mas-15">Más de 15 años</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>} />
                          </div>

                          <div className="md:col-span-2">
                            <FormField control={form.control} name="implementador.metodologias" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Metodologías y herramientas</FormLabel>
                                  <FormControl>
                                    <MultiSelect 
                                      options={[
                                        { value: "iso-9001", label: "ISO 9001" },
                                        { value: "iso-14001", label: "ISO 14001" },
                                        { value: "iso-45001", label: "ISO 45001" },
                                        { value: "lean", label: "Lean Manufacturing" },
                                        { value: "six-sigma", label: "Six Sigma" },
                                        { value: "kaizen", label: "Kaizen" },
                                        { value: "5s", label: "5S" },
                                        { value: "bpm", label: "BPM" },
                                        { value: "otros", label: "Otros" }
                                      ]} 
                                      selected={field.value || []} 
                                      onChange={field.onChange} 
                                      placeholder="Selecciona metodologías..." 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>

                          <div className="md:col-span-2">
                            <FormField control={form.control} name="implementador.comentarios" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} placeholder="Describe tu experiencia como implementador, proyectos destacados, metodologías aplicadas..." />
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
                      <div className="space-y-4">
                        <FormField control={form.control} name="sectores" render={({
                        field
                      }) => <FormItem>
                              <FormControl>
                                <MultiSelect options={SECTORES_INDUSTRIA} selected={field.value} onChange={field.onChange} placeholder="Selecciona sectores de interés..." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />

                        {form.watch("sectores")?.includes("otros") && (
                          <FormField control={form.control} name="sectoresOtro" render={({
                            field
                          }) => (
                            <FormItem>
                              <FormLabel>Especifica otros sectores</FormLabel>
                              <FormControl>
                                <Input placeholder="Describe otros sectores de interés" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        )}
                      </div>
                    </div>

                    {/* 6) Conocimiento y Competencia en Normas & Certificaciones */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">6. Conocimiento y Competencia en Normas & Certificaciones</h3>
                      <FormField 
                        control={form.control} 
                        name="competenciasNormas.0" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Conocimiento y Competencia en Normas & Certificaciones</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Escribe tus normas y niveles. Ej.:&#10;ISO 9712 – UT – Nivel II&#10;ASME Sección VIII Div.1 – Inspector&#10;ISO 9001 – Lead Auditor (IRCA)&#10;ISO 14065 – Verificador GEI – ISO 14064-1"
                                className="min-h-[120px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                                   <SelectItem value="otro">Otro</SelectItem>
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>} />
                             
                        {/* Campo condicional para "Otro" nivel máximo */}
                        {form.watch("nivelMaximo") === "otro" && (
                          <FormField control={form.control} name="nivelMaximoOtro" render={({
                            field
                          }) => <FormItem>
                                  <FormLabel>Especifica otro nivel académico</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Describe tu nivel académico" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                        )}

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

                      </div>

                      {/* Campo condicional para "Otros" en área de estudio */}
                      {form.watch("areaEstudio") === "otros" && (
                        <FormField control={form.control} name="areaEstudioOtro" render={({
                          field
                        }) => <FormItem>
                                <FormLabel>Especifica otra área de estudio</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Ingresa el área de estudio" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />
                      )}
                    </div>

                    {/* 8) Idiomas */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">8. Idiomas</h3>
                      <div className="space-y-4">
                        {form.watch("idiomas")?.map((_, index) => (
                          <div key={index} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
                            </div>
                            
                            {/* Campo condicional para "Otro" idioma */}
                            {form.watch(`idiomas.${index}.idioma`) === "otro" && (
                              <FormField control={form.control} name={`idiomas.${index}.idiomaOtro`} render={({
                                field
                              }) => <FormItem>
                                      <FormLabel>Especifica otro idioma</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder="Ingresa el idioma" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>} />
                            )}
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addIdioma}>
                          <Plus className="h-4 w-4 mr-2" />
                          Añadir idioma
                        </Button>
                      </div>
                    </div>


                    {/* 9) Documentos */}
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-6">9. Documentos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="cv" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Subir CV (PDF) <span className="text-red-500">*</span></FormLabel>
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
                                <FormLabel>LinkedIn (Muy recomendado)</FormLabel>
                                <FormControl>
                                  <Input type="url" placeholder="https://linkedin.com/in/tu-perfil" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />
                        </div>
                      </div>
                    </div>

                     {/* 10) Notas y preferencias */}
                     <div>
                       <h3 className="text-xl font-display font-semibold mb-6">10. Notas y Preferencias</h3>
                       <div className="space-y-6">
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

                    {/* Privacy Policy */}
                    <div>
                      <FormField control={form.control} name="autorizacionDatos" render={({
                        field
                      }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              Acepto el tratamiento de mis datos personales de acuerdo con la{" "}
                              <Link 
                                to="/politica-de-privacidad" 
                                target="_blank"
                                className="text-primary font-medium hover:underline"
                              >
                                Política de Privacidad
                              </Link> y 
                              autorizo el uso de la información proporcionada para procesos de selección 
                              y contacto profesional. Mis datos serán utilizados exclusivamente para 
                              fines de reclutamiento y evaluación de perfiles profesionales.
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
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