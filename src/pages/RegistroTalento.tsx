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

                            {/* Campo de comentarios */}
                            <FormField control={form.control} name={`familiasRol.${index}.comentarios`} render={({
                              field
                            }) => <FormItem>
                                    <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                    <FormControl>
                                      <Textarea {...field} placeholder="Describe tu experiencia y lo que has realizado en esta área..." />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>} />
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addAreaExperiencia}>
                          <Plus className="h-4 w-4 mr-2" />
                          Añadir área de experiencia
                        </Button>
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