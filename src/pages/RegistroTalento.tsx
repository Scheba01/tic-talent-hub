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
import { Plus, X, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { submitCandidate } from "@/lib/candidate-service";
import { useAuth } from "@/hooks/useAuth";
import { getCandidateProfile, transformProfileToFormData } from "@/lib/candidate-profile-service";
import { useLanguage } from "@/contexts/LanguageContext";

const RegistroTalento = () => {
  const { t } = useLanguage();
  console.log("RegistroTalento component loaded"); // Debug log
  const [selectedAreaFuncional, setSelectedAreaFuncional] = useState<string>("");
  const [selectedSubarea, setSelectedSubarea] = useState<string>("");
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      nombreCompleto: "",
      email: "",
      codigoPais: "+56",
      telefono: "",
      pais: "",
      ciudad: "",
      situacionActual: "",
      disponibilidad: "",
      jornada: "",
      sueldoActualBruto: "",
      familiasRol: [{
        area: "",
        comentarios: ""
      }],
      sectores: [],
      competenciasNormas: [""],
      nivelMaximo: "",
      areaEstudio: "",
      idiomas: [{
        idioma: "",
        nivel: ""
      }],
      autorizacionDatos: false,
      experienciaLaboral: [],
      cv: [],
      comentarios: ""
    }
  });

  // Load existing profile data
  useEffect(() => {
    const loadExistingProfile = async () => {
      if (!user || loading) return;
      
      setLoadingProfile(true);
      try {
        const profileData = await getCandidateProfile();
        if (profileData) {
          const formData = transformProfileToFormData(profileData);
          form.reset(formData);
          setIsEditMode(true);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Error al cargar el perfil');
      } finally {
        setLoadingProfile(false);
      }
    };

    loadExistingProfile();
  }, [user, loading, form]);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Pre-fill form with user data when available (only for new registrations)
  useEffect(() => {
    if (user && profile && !isEditMode) {
      form.setValue("nombreCompleto", profile.nombre_completo || "");
      form.setValue("email", user.email || "");
    }
  }, [user, profile, form, isEditMode]);
  const onSubmit = async (data: RegistrationFormData) => {
    console.log("Form submission started", data); // Debug log
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

  // Show loading screen while checking authentication or loading profile
  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {loading ? "Verificando autenticación..." : "Cargando perfil..."}
          </p>
        </div>
      </div>
    );
  }
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
              {t('registration.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('registration.subtitle')}
            </p>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-display">{t('registration.form_title')}</CardTitle>
                {!user && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                      {t('registration.already_account')}
                      <Link to="/auth" className="ml-1 text-primary hover:text-primary/80 font-medium">
                        {t('registration.login_here')}
                      </Link>
                      {" "}{t('registration.or')}{" "}
                      <Link to="/auth" className="text-primary hover:text-primary/80 font-medium">
                        {t('registration.reset_password')}
                      </Link>
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     
                     {/* 1) Personal Data */}
                     <div>
                       <h3 className="text-xl font-display font-semibold mb-6">1. {t('registration.personal_data.title')}</h3>
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
                              <FormLabel>{t('registration.email')} <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div>
                          <div className="space-y-2">
                            <Label>{t('registration.phone')} <span className="text-red-500">*</span></Label>
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
                                <FormLabel>{t('registration.country_residence')} <span className="text-red-500">*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t('registration.select_country')} />
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
                              <FormLabel>{t('registration.specify_country')}</FormLabel>
                              <FormControl>
                                <Input placeholder="Escribe tu país" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                      )}

                      <FormField control={form.control} name="ciudad" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>{t('registration.city')}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>} />
                    </div>

                     {/* 2) Employment Situation & Availability */}
                     <div>
                       <h3 className="text-xl font-display font-semibold mb-6">2. {t('registration.employment_situation.title')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="situacionActual" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>{t('registration.current_situation')}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('registration.select_situation')} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                   <SelectItem value="empleado">{t('registration.employed')}</SelectItem>
                                   <SelectItem value="independiente">{t('registration.independent')}</SelectItem>
                                   <SelectItem value="desempleado">{t('registration.unemployed')}</SelectItem>
                                   <SelectItem value="estudiante">{t('registration.student')}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="disponibilidad" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>{t('registration.availability')}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('registration.select_availability')} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                   <SelectItem value="inmediata">{t('registration.immediate')}</SelectItem>
                                   <SelectItem value="15-dias">{t('registration.15_days')}</SelectItem>
                                   <SelectItem value="30-dias">{t('registration.30_days')}</SelectItem>
                                   <SelectItem value="mas-30-dias">{t('registration.more_30_days')}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>} />

                        <FormField control={form.control} name="jornada" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>{t('registration.work_schedule')}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('registration.select_schedule')} />
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

                    {/* 3) Familias de Roles Profesionales */}
                    <div>
                       <h3 className="text-xl font-display font-semibold mb-6">3. {t('registration.role_families.title')}</h3>
                       <p className="text-sm text-muted-foreground mb-4">
                         {t('registration.role_families.description')}
                       </p>
                      <div className="space-y-4">
                        {form.watch("familiasRol")?.map((_, index) => (
                          <div key={index} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                              <FormField control={form.control} name={`familiasRol.${index}.area`} render={({
                                field
                              }) => <FormItem>
                                        <FormLabel>{t('registration.experience_area')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                               <SelectValue placeholder={t('registration.select_area')} />
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
                                         { value: "jefe", label: "Jefe de auditores" },
                                         { value: "freelance", label: "Freelance" }
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
                                     <SelectValue placeholder={t('registration.select_salary')} />
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
                          <div className="md:col-span-2">
                            <FormField control={form.control} name="implementador.tipoImplementacion" render={({
                              field
                            }) => <FormItem>
                                  <FormLabel>Tipos de implementación</FormLabel>
                                  <FormControl>
                                    <MultiSelect 
                                       options={[
                                         { value: "sistemas-gestion", label: "Sistemas de Gestión" },
                                         { value: "normas-iso", label: "Normas ISO" },
                                         { value: "procesos-calidad", label: "Procesos de Calidad" },
                                         { value: "mejora-continua", label: "Mejora Continua" },
                                         { value: "lean-six-sigma", label: "Lean Six Sigma" },
                                         { value: "seguridad-salud", label: "Seguridad y Salud Ocupacional" },
                                         { value: "medio-ambiente", label: "Medio Ambiente" },
                                         { value: "food-safety", label: "Food Safety (Seguridad Alimentaria)" },
                                         { value: "sostenibilidad", label: "Sostenibilidad y RSE" },
                                         { value: "social-compliance", label: "Social Compliance" },
                                         { value: "bpm-digitalizacion", label: "BPM y Digitalización" },
                                         { value: "freelance", label: "Freelance" },
                                         { value: "otros", label: "Otros" }
                                       ]}
                                      selected={field.value || []} 
                                      onChange={field.onChange} 
                                      placeholder="Selecciona tipos de implementación..." 
                                    />
                                  </FormControl>
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
                            }) => {
                              const tiposImplementacion = form.watch("implementador.tipoImplementacion") || [];
                              
                              const getMetodologiaOptions = () => {
                                const allOptions: { value: string; label: string; }[] = [];
                                
                                tiposImplementacion.forEach((tipo: string) => {
                                  switch(tipo) {
                                    case "sistemas-gestion":
                                      allOptions.push(
                                        { value: "iso-9001", label: "ISO 9001" },
                                        { value: "iso-14001", label: "ISO 14001" },
                                        { value: "iso-45001", label: "ISO 45001" },
                                        { value: "iso-27001", label: "ISO 27001" },
                                        { value: "iso-50001", label: "ISO 50001" }
                                      );
                                      break;
                                    case "food-safety":
                                      allOptions.push(
                                        { value: "iso-22000", label: "ISO 22000" },
                                        { value: "fssc-22000", label: "FSSC 22000" },
                                        { value: "brc-food", label: "BRC Food" },
                                        { value: "ifs-food", label: "IFS Food" },
                                        { value: "global-gap", label: "Global GAP" },
                                        { value: "haccp", label: "HACCP" }
                                      );
                                      break;
                                    case "sostenibilidad":
                                      allOptions.push(
                                        { value: "gri-standards", label: "GRI Standards" },
                                        { value: "b-corp", label: "B Corp" },
                                        { value: "iso-26000", label: "ISO 26000" },
                                        { value: "fairtrade", label: "Fairtrade" },
                                        { value: "rainforest-alliance", label: "Rainforest Alliance" }
                                      );
                                      break;
                                    case "social-compliance":
                                      allOptions.push(
                                        { value: "sa-8000", label: "SA 8000" },
                                        { value: "iso-26000", label: "ISO 26000" },
                                        { value: "bsci", label: "BSCI" },
                                        { value: "sedex", label: "SEDEX" },
                                        { value: "wrap", label: "WRAP" }
                                      );
                                      break;
                                    case "lean-six-sigma":
                                      allOptions.push(
                                        { value: "lean", label: "Lean Manufacturing" },
                                        { value: "six-sigma", label: "Six Sigma" },
                                        { value: "kaizen", label: "Kaizen" },
                                        { value: "5s", label: "5S" },
                                        { value: "tps", label: "Toyota Production System" },
                                        { value: "dmaic", label: "DMAIC" }
                                      );
                                      break;
                                    case "seguridad-salud":
                                      allOptions.push(
                                        { value: "iso-45001", label: "ISO 45001" },
                                        { value: "ohsas-18001", label: "OHSAS 18001" },
                                        { value: "nosa", label: "NOSA" },
                                        { value: "dupont", label: "DuPont Safety" }
                                      );
                                      break;
                                    case "medio-ambiente":
                                      allOptions.push(
                                        { value: "iso-14001", label: "ISO 14001" },
                                        { value: "emas", label: "EMAS" },
                                        { value: "carbon-footprint", label: "Carbon Footprint" },
                                        { value: "life-cycle", label: "Life Cycle Assessment" }
                                      );
                                      break;
                                    case "bpm-digitalizacion":
                                      allOptions.push(
                                        { value: "bpmn", label: "BPMN" },
                                        { value: "process-mining", label: "Process Mining" },
                                        { value: "rpa", label: "RPA" },
                                        { value: "workflow", label: "Workflow Management" }
                                      );
                                      break;
                                  }
                                });
                                
                                // Remove duplicates and return unique options
                                const uniqueOptions = allOptions.filter((option, index, self) => 
                                  index === self.findIndex(o => o.value === option.value)
                                );
                                
                                return uniqueOptions.length > 0 ? uniqueOptions : [
                                  { value: "iso-9001", label: "ISO 9001" },
                                  { value: "lean", label: "Lean Manufacturing" },
                                  { value: "otros", label: "Otros" }
                                ];
                              };

                              return (
                                <FormItem>
                                  <FormLabel>Metodologías y herramientas relacionadas</FormLabel>
                                  <FormControl>
                                    <MultiSelect 
                                      options={getMetodologiaOptions()} 
                                      selected={field.value || []} 
                                      onChange={field.onChange} 
                                      placeholder={tiposImplementacion.length > 0 ? "Selecciona metodologías relacionadas..." : "Primero selecciona los tipos de implementación"}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }} />
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

                     {form.watch("familiasRol")?.some(f => f.area === "ti") && <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary">TI / Data</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                           <div>
                             <FormField control={form.control} name="ti.rol" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Rol principal</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona tu rol..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="desarrollador">Desarrollador</SelectItem>
                                       <SelectItem value="analista-sistemas">Analista de Sistemas</SelectItem>
                                       <SelectItem value="data-analyst">Data Analyst</SelectItem>
                                       <SelectItem value="devops">DevOps</SelectItem>
                                       <SelectItem value="qa-tester">QA/Tester</SelectItem>
                                       <SelectItem value="arquitecto-software">Arquitecto de Software</SelectItem>
                                       <SelectItem value="project-manager">Project Manager</SelectItem>
                                       <SelectItem value="otros">Otros</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                           
                           <div>
                             <FormField control={form.control} name="ti.experiencia" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Años de experiencia</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="1-2">1-2 años</SelectItem>
                                       <SelectItem value="3-5">3-5 años</SelectItem>
                                       <SelectItem value="6-10">6-10 años</SelectItem>
                                       <SelectItem value="10+">10+ años</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>

                           <div className="md:col-span-2">
                             <FormField control={form.control} name="ti.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia en TI/Data, proyectos destacados, tecnologías utilizadas..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                     {form.watch("familiasRol")?.some(f => f.area === "hse") && <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary">HSE / Seguridad</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                           <div>
                             <FormField control={form.control} name="hse.rol" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Rol principal</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona tu rol..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="especialista-hse">Especialista HSE</SelectItem>
                                       <SelectItem value="coordinador-seguridad">Coordinador de Seguridad</SelectItem>
                                       <SelectItem value="gerente-hse">Gerente HSE</SelectItem>
                                       <SelectItem value="auditor-hse">Auditor HSE</SelectItem>
                                       <SelectItem value="prevencionista">Prevencionista de Riesgos</SelectItem>
                                       <SelectItem value="otros">Otros</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                           
                           <div>
                             <FormField control={form.control} name="hse.experiencia" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Años de experiencia</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="1-2">1-2 años</SelectItem>
                                       <SelectItem value="3-5">3-5 años</SelectItem>
                                       <SelectItem value="6-10">6-10 años</SelectItem>
                                       <SelectItem value="10+">10+ años</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>

                           <div className="md:col-span-2">
                             <FormField control={form.control} name="hse.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia en HSE/Seguridad, proyectos de prevención, certificaciones..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                     {form.watch("familiasRol")?.some(f => f.area === "legal") && <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary">Legal / Regulatorio</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                           <div>
                             <FormField control={form.control} name="legal.rol" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Rol principal</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona tu rol..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="abogado-corporativo">Abogado Corporativo</SelectItem>
                                       <SelectItem value="especialista-regulatorio">Especialista Regulatorio</SelectItem>
                                       <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                                       <SelectItem value="asesor-legal">Asesor Legal</SelectItem>
                                       <SelectItem value="gerente-legal">Gerente Legal</SelectItem>
                                       <SelectItem value="otros">Otros</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                           
                           <div>
                             <FormField control={form.control} name="legal.experiencia" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Años de experiencia</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="1-2">1-2 años</SelectItem>
                                       <SelectItem value="3-5">3-5 años</SelectItem>
                                       <SelectItem value="6-10">6-10 años</SelectItem>
                                       <SelectItem value="10+">10+ años</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>

                           <div className="md:col-span-2">
                             <FormField control={form.control} name="legal.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia legal/regulatoria, casos destacados, áreas de especialización..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                     {form.watch("familiasRol")?.some(f => f.area === "supply-chain") && <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary">Supply Chain / Compras</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                           <div>
                             <FormField control={form.control} name="supplyChain.rol" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Rol principal</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona tu rol..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="comprador">Comprador</SelectItem>
                                       <SelectItem value="analista-compras">Analista de Compras</SelectItem>
                                       <SelectItem value="gerente-compras">Gerente de Compras</SelectItem>
                                       <SelectItem value="especialista-supply-chain">Especialista Supply Chain</SelectItem>
                                       <SelectItem value="coordinador-logistica">Coordinador de Logística</SelectItem>
                                       <SelectItem value="gerente-supply-chain">Gerente Supply Chain</SelectItem>
                                       <SelectItem value="otros">Otros</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                           
                           <div>
                             <FormField control={form.control} name="supplyChain.experiencia" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Años de experiencia</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="1-2">1-2 años</SelectItem>
                                       <SelectItem value="3-5">3-5 años</SelectItem>
                                       <SelectItem value="6-10">6-10 años</SelectItem>
                                       <SelectItem value="10+">10+ años</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>

                           <div className="md:col-span-2">
                             <FormField control={form.control} name="supplyChain.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia en Supply Chain/Compras, proyectos de optimización, proveedores gestionados..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                     {form.watch("familiasRol")?.some(f => f.area === "atencion-cliente") && <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary">Atención al Cliente / CS</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                           <div>
                             <FormField control={form.control} name="atencionCliente.rol" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Rol principal</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona tu rol..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="ejecutivo-atencion">Ejecutivo de Atención al Cliente</SelectItem>
                                       <SelectItem value="coordinador-cs">Coordinador Customer Service</SelectItem>
                                       <SelectItem value="gerente-cs">Gerente Customer Service</SelectItem>
                                       <SelectItem value="especialista-cx">Especialista Customer Experience</SelectItem>
                                       <SelectItem value="supervisor-call-center">Supervisor Call Center</SelectItem>
                                       <SelectItem value="otros">Otros</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                           
                           <div>
                             <FormField control={form.control} name="atencionCliente.experiencia" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Años de experiencia</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="1-2">1-2 años</SelectItem>
                                       <SelectItem value="3-5">3-5 años</SelectItem>
                                       <SelectItem value="6-10">6-10 años</SelectItem>
                                       <SelectItem value="10+">10+ años</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>

                           <div className="md:col-span-2">
                             <FormField control={form.control} name="atencionCliente.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia en atención al cliente, proyectos de mejora en CS, métricas gestionadas..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                     {form.watch("familiasRol")?.some(f => f.area === "pmo") && <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary">PMO / Proyectos</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                           <div>
                             <FormField control={form.control} name="pmo.rol" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Rol principal</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona tu rol..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="project-manager">Project Manager</SelectItem>
                                       <SelectItem value="coordinador-pmo">Coordinador PMO</SelectItem>
                                       <SelectItem value="analista-pmo">Analista PMO</SelectItem>
                                       <SelectItem value="gerente-pmo">Gerente PMO</SelectItem>
                                       <SelectItem value="scrum-master">Scrum Master</SelectItem>
                                       <SelectItem value="product-owner">Product Owner</SelectItem>
                                       <SelectItem value="otros">Otros</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                           
                           <div>
                             <FormField control={form.control} name="pmo.experiencia" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Años de experiencia</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="1-2">1-2 años</SelectItem>
                                       <SelectItem value="3-5">3-5 años</SelectItem>
                                       <SelectItem value="6-10">6-10 años</SelectItem>
                                       <SelectItem value="10+">10+ años</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>

                           <div className="md:col-span-2">
                             <FormField control={form.control} name="pmo.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia en PMO/Proyectos, metodologías utilizadas, proyectos destacados..." />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                         </div>
                       </div>}

                     {form.watch("familiasRol")?.some(f => f.area === "direccion") && <div>
                         <h4 className="text-lg font-semibold mb-4 text-primary">Dirección / General Management</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-6 rounded-lg">
                           <div>
                             <FormField control={form.control} name="direccion.rol" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Rol principal</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona tu rol..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="ceo">CEO / Director Ejecutivo</SelectItem>
                                       <SelectItem value="coo">COO / Director de Operaciones</SelectItem>
                                       <SelectItem value="cfo">CFO / Director Financiero</SelectItem>
                                       <SelectItem value="cto">CTO / Director de Tecnología</SelectItem>
                                       <SelectItem value="director-general">Director General</SelectItem>
                                       <SelectItem value="gerente-general">Gerente General</SelectItem>
                                       <SelectItem value="director-comercial">Director Comercial</SelectItem>
                                       <SelectItem value="otros">Otros</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>
                           
                           <div>
                             <FormField control={form.control} name="direccion.experiencia" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Años de experiencia</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Selecciona..." />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent>
                                       <SelectItem value="1-2">1-2 años</SelectItem>
                                       <SelectItem value="3-5">3-5 años</SelectItem>
                                       <SelectItem value="6-10">6-10 años</SelectItem>
                                       <SelectItem value="10+">10+ años</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>} />
                           </div>

                           <div className="md:col-span-2">
                             <FormField control={form.control} name="direccion.comentarios" render={({
                               field
                             }) => <FormItem>
                                   <FormLabel>Comentarios sobre lo que has realizado en esta área</FormLabel>
                                   <FormControl>
                                     <Textarea {...field} placeholder="Describe tu experiencia en dirección/management, equipos gestionados, logros empresariales..." />
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
                      <h3 className="text-xl font-display font-semibold mb-6">9. {t('registration.documents.title')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <FormField control={form.control} name="cv" render={({
                         field
                       }) => <FormItem>
                               <FormLabel>{t('registration.cv')} <span className="text-red-500">*</span></FormLabel>
                               <FormControl>
                                 <Input 
                                   type="file" 
                                   accept=".pdf" 
                                   onChange={(e) => {
                                     const file = e.target.files?.[0];
                                     field.onChange(file ? [file] : []);
                                   }}
                                 />
                               </FormControl>
                               <FormMessage />
                            </FormItem>} />

                         <FormField control={form.control} name="certificadosAdicionales" render={({
                         field
                       }) => <FormItem>
                               <FormLabel>Certificados (ZIP/PDF)</FormLabel>
                               <FormControl>
                                 <Input 
                                   type="file" 
                                   accept=".pdf,.zip" 
                                   onChange={(e) => {
                                     const file = e.target.files?.[0];
                                     field.onChange(file ? [file] : undefined);
                                   }}
                                 />
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
                               <span className="text-red-500">*</span> Acepto el tratamiento de mis datos personales de acuerdo con la{" "}
                               <Link 
                                 to="/politica-de-privacidad" 
                                 target="_blank"
                                 className="text-primary font-medium hover:underline"
                               >
                                  {t('registration.privacy_policy')}
                                </Link> {t('registration.data_authorization.text')}
                             </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                     {/* Submit Button */}
                     <div className="text-center pt-6">
                        <Button 
                          type="submit" 
                          className="btn-hero px-8" 
                          disabled={!form.watch("autorizacionDatos")}
                        >
                          {isEditMode ? t('profile.edit_button') : t('registration.submit')}
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