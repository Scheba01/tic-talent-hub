import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getCandidateProfile, CandidateProfile } from "@/lib/candidate-profile-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, FileText, Mail, Phone, MapPin, Globe, Calendar, Briefcase, Award, Languages, User, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const MiPerfil = () => {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      loadProfile();
    }
  }, [user, authLoading, navigate]);

  const loadProfile = async () => {
    try {
      const profileData = await getCandidateProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/registro-talento");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('auth.login_loading')}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-16">
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                {t('profile.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {t('profile.no_profile_message')}
              </p>
              <Button onClick={() => navigate("/registro-talento")} size="lg">
                {t('profile.create_profile')}
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('profile.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('profile.subtitle')}
            </p>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-end mb-6">
              <Button onClick={handleEdit} variant="outline">
                {t('profile.edit_button')}
              </Button>
            </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('profile.personal_info.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.full_name')}</label>
                  <p className="mt-1">{profile.nombreCompleto}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.email')}</label>
                  <p className="mt-1">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.phone')}</label>
                  <p className="mt-1">{profile.codigoPais} {profile.telefono}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.country')}</label>
                  <p className="mt-1">{profile.pais}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.city')}</label>
                  <p className="mt-1">{profile.ciudad}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                {t('profile.professional_info.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.current_situation')}</label>
                  <p className="mt-1">{profile.situacionActual}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.availability')}</label>
                  <p className="mt-1">{profile.disponibilidad}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.work_schedule')}</label>
                  <p className="mt-1">{profile.jornada}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.current_salary')}</label>
                  <p className="mt-1">{profile.sueldoActualBruto}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.education_level')}</label>
                  <p className="mt-1">{profile.nivelMaximo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.study_area')}</label>
                  <p className="mt-1">{profile.areaEstudio}</p>
                </div>
                {profile.linkedin && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.linkedin')}</label>
                    <p className="mt-1">
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {profile.linkedin}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Familias de Roles */}
          {profile.roleFamilies && profile.roleFamilies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  {t('profile.role_families.title')}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.role_families.description')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.roleFamilies.map((familia, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex flex-col gap-2">
                        <Badge variant="default" className="text-sm w-fit">
                          {familia.familia_rol}
                        </Badge>
                        {familia.familia_rol_otro && (
                          <p className="text-sm text-muted-foreground">
                            <strong>{t('profile.role_families.specification')}:</strong> {familia.familia_rol_otro}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sectores */}
          {profile.sectors && profile.sectors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {t('profile.sectors.title')}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.sectors.description')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.sectors.map((sector, index) => (
                    <Badge key={index} variant="secondary">
                      {sector.sector}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Competencias */}
          {profile.competencies && profile.competencies.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.competencies.title')}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.competencies.description')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.competencies.map((comp, index) => (
                    <Badge key={index} variant="outline">
                      {comp.competencia}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Idiomas */}
          {profile.languages && profile.languages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  {t('profile.languages.title')}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.languages.description')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">{lang.idioma}</span>
                      <Badge variant="default">{lang.nivel}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Experiencia Laboral */}
          {profile.experience && profile.experience.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('profile.experience.title')}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.experience.description')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{exp.cargo}</h4>
                          <p className="text-muted-foreground">{exp.empresa}</p>
                        </div>
                        <Badge variant="outline">{exp.periodo}</Badge>
                      </div>
                      {exp.descripcion && (
                        <p className="text-sm text-muted-foreground mt-2">{exp.descripcion}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Especializaciones */}
          {/* Laboratorio */}
          {profile.specializations?.laboratorio && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.laboratory.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                  <p>{profile.specializations.laboratorio.rol}</p>
                </div>
                {profile.specializations.laboratorio.tipos_laboratorio?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.types')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.laboratorio.tipos_laboratorio.map((tipo, index) => (
                        <Badge key={index} variant="outline">{tipo}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.laboratorio.tecnicas_equipos?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.techniques')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.laboratorio.tecnicas_equipos.map((tecnica, index) => (
                        <Badge key={index} variant="secondary">{tecnica}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.laboratorio.experiencia_17025 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.experience_17025')}</label>
                    <p>{profile.specializations.laboratorio.experiencia_17025}</p>
                  </div>
                )}
                {profile.specializations.laboratorio.experiencia_auditorias && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.audit_experience')}</label>
                    <Badge variant="default">Sí</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Auditoría */}
          {profile.specializations?.auditoria && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.audit.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.auditoria.tipo_auditor?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.audit.auditor_type')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.auditoria.tipo_auditor.map((tipo, index) => (
                        <Badge key={index} variant="outline">{tipo}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.auditoria.normas_auditadas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.audit.audited_standards')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.auditoria.normas_auditadas.map((norma, index) => (
                        <Badge key={index} variant="secondary">{norma}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.auditoria.horas_auditoria && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.audit.hours')}</label>
                    <p>{profile.specializations.auditoria.horas_auditoria}</p>
                  </div>
                )}
                {profile.specializations.auditoria.registro_irca && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.audit.irca_registration')}</label>
                    <Badge variant="default">ID: {profile.specializations.auditoria.id_irca}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Certificación de Sistemas */}
          {profile.specializations?.certSistemas && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.cert_systems.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.certSistemas.nivel_competencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.cert_systems.competence_level')}</label>
                    <p>{profile.specializations.certSistemas.nivel_competencia}</p>
                  </div>
                )}
                {profile.specializations.certSistemas.normas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.cert_systems.standards')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.certSistemas.normas.map((norma, index) => (
                        <Badge key={index} variant="outline">{norma}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.certSistemas.registro_irca && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.cert_systems.irca_registration')}</label>
                    <Badge variant="default">ID: {profile.specializations.certSistemas.id_irca}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Certificación de Productos */}
          {profile.specializations?.certProductos && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.cert_products.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.certProductos.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.certProductos.rol}</p>
                  </div>
                )}
                {profile.specializations.certProductos.sectores?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.cert_products.sectors')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.certProductos.sectores.map((sector, index) => (
                        <Badge key={index} variant="outline">{sector}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.certProductos.experiencia_17065 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.cert_products.experience_17065')}</label>
                    <p>{profile.specializations.certProductos.experiencia_17065}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Certificación de Personas */}
          {profile.specializations?.certPersonas && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.cert_persons.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.certPersonas.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.certPersonas.rol}</p>
                  </div>
                )}
                {profile.specializations.certPersonas.areas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.cert_persons.areas')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.certPersonas.areas.map((area, index) => (
                        <Badge key={index} variant="outline">{area}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.certPersonas.experiencia_17024 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.cert_persons.experience_17024')}</label>
                    <p>{profile.specializations.certPersonas.experiencia_17024}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Inspección */}
          {profile.specializations?.inspeccion && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.inspection.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.inspeccion.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.inspeccion.rol}</p>
                  </div>
                )}
                {profile.specializations.inspeccion.tipo_organismo && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.inspection.organism_type')}</label>
                    <p>{profile.specializations.inspeccion.tipo_organismo}</p>
                  </div>
                )}
                {profile.specializations.inspeccion.areas_inspeccion?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.inspection.areas')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.inspeccion.areas_inspeccion.map((area, index) => (
                        <Badge key={index} variant="outline">{area}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.inspeccion.certificaciones?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.inspection.certifications')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.inspeccion.certificaciones.map((cert, index) => (
                        <Badge key={index} variant="secondary">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.inspeccion.experiencia_17020 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.inspection.experience_17020')}</label>
                    <p>{profile.specializations.inspeccion.experiencia_17020}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Comercial */}
          {profile.specializations?.comercial && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.commercial.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.comercial.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.comercial.rol}</p>
                  </div>
                )}
                {profile.specializations.comercial.sectores_atendidos?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.commercial.sectors_served')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.comercial.sectores_atendidos.map((sector, index) => (
                        <Badge key={index} variant="outline">{sector}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.comercial.lineas_dominadas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.commercial.dominated_lines')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.comercial.lineas_dominadas.map((linea, index) => (
                        <Badge key={index} variant="secondary">{linea}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.comercial.ticket_promedio && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.commercial.average_ticket')}</label>
                    <p>{profile.specializations.comercial.ticket_promedio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Operaciones */}
          {profile.specializations?.operaciones && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.operations.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.operaciones.nivel && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.operations.level')}</label>
                    <p>{profile.specializations.operaciones.nivel}</p>
                  </div>
                )}
                {profile.specializations.operaciones.areas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.operations.areas')}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.operaciones.areas.map((area, index) => (
                        <Badge key={index} variant="outline">{area}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.operaciones.personas_cargo && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.operations.team_size')}</label>
                    <p>{profile.specializations.operaciones.personas_cargo}</p>
                  </div>
                )}
                {profile.specializations.operaciones.presupuesto && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.operations.budget')}</label>
                    <p>{profile.specializations.operaciones.presupuesto}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Otras especializaciones con formato similar */}
          {profile.specializations?.ti && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.ti.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.ti.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.ti.rol}</p>
                  </div>
                )}
                {profile.specializations.ti.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.ti.title')}</label>
                    <p>{profile.specializations.ti.experiencia}</p>
                  </div>
                )}
                {profile.specializations.ti.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.comments.title')}</label>
                    <p>{profile.specializations.ti.comentarios}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {profile.specializations?.hse && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.hse.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.hse.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.hse.rol}</p>
                  </div>
                )}
                {profile.specializations.hse.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.hse.title')}</label>
                    <p>{profile.specializations.hse.experiencia}</p>
                  </div>
                )}
                {profile.specializations.hse.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.comments.title')}</label>
                    <p>{profile.specializations.hse.comentarios}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {profile.specializations?.legal && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.legal.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.legal.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.legal.rol}</p>
                  </div>
                )}
                {profile.specializations.legal.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.legal.title')}</label>
                    <p>{profile.specializations.legal.experiencia}</p>
                  </div>
                )}
                {profile.specializations.legal.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.comments.title')}</label>
                    <p>{profile.specializations.legal.comentarios}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {profile.specializations?.supplyChain && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.supply_chain.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.supplyChain.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.supplyChain.rol}</p>
                  </div>
                )}
                {profile.specializations.supplyChain.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.supply_chain.title')}</label>
                    <p>{profile.specializations.supplyChain.experiencia}</p>
                  </div>
                )}
                {profile.specializations.supplyChain.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.comments.title')}</label>
                    <p>{profile.specializations.supplyChain.comentarios}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {profile.specializations?.atencionCliente && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.customer_service.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.atencionCliente.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.atencionCliente.rol}</p>
                  </div>
                )}
                {profile.specializations.atencionCliente.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.customer_service.title')}</label>
                    <p>{profile.specializations.atencionCliente.experiencia}</p>
                  </div>
                )}
                {profile.specializations.atencionCliente.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.comments.title')}</label>
                    <p>{profile.specializations.atencionCliente.comentarios}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {profile.specializations?.pmo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.pmo.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.pmo.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.pmo.rol}</p>
                  </div>
                )}
                {profile.specializations.pmo.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.pmo.title')}</label>
                    <p>{profile.specializations.pmo.experiencia}</p>
                  </div>
                )}
                {profile.specializations.pmo.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.comments.title')}</label>
                    <p>{profile.specializations.pmo.comentarios}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {profile.specializations?.direccion && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.management.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.direccion.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</label>
                    <p>{profile.specializations.direccion.rol}</p>
                  </div>
                )}
                {profile.specializations.direccion.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.management.title')}</label>
                    <p>{profile.specializations.direccion.experiencia}</p>
                  </div>
                )}
                {profile.specializations.direccion.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('profile.comments.title')}</label>
                    <p>{profile.specializations.direccion.comentarios}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Certificaciones */}
          {profile.certificaciones && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.certifications.title')}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.certifications.description')}
                </p>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{profile.certificaciones}</p>
              </CardContent>
            </Card>
          )}

          {/* Comentarios Adicionales */}
          {profile.comentarios && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('profile.comments.title')}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('profile.comments.description')}
                </p>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{profile.comentarios}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>

    <Footer />
  </div>
  );
};

export default MiPerfil;
