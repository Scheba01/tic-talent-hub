import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getCandidateProfile, CandidateProfile } from "@/lib/candidate-profile-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.full_name')}</Label>
                  <p className="mt-1">{profile.candidate?.nombre_completo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.email')}</Label>
                  <p className="mt-1">{profile.candidate?.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.phone')}</Label>
                  <p className="mt-1">{profile.candidate?.codigo_pais} {profile.candidate?.telefono}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.country')}</Label>
                  <p className="mt-1">{profile.candidate?.pais}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.personal_info.city')}</Label>
                  <p className="mt-1">{profile.candidate?.ciudad}</p>
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
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.current_situation')}</Label>
                  <p className="mt-1">{profile.candidate?.situacion_actual}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.availability')}</Label>
                  <p className="mt-1">{profile.candidate?.disponibilidad}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.work_schedule')}</Label>
                  <p className="mt-1">{profile.candidate?.jornada}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.current_salary')}</Label>
                  <p className="mt-1">{profile.candidate?.sueldo_actual_bruto}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.education_level')}</Label>
                  <p className="mt-1">{profile.candidate?.nivel_maximo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.study_area')}</Label>
                  <p className="mt-1">{profile.candidate?.area_estudio}</p>
                </div>
                {profile.candidate?.linkedin && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">{t('profile.professional_info.linkedin')}</Label>
                    <p className="mt-1">
                      <a href={profile.candidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {profile.candidate.linkedin}
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

          {/* Especialización - Laboratorio */}
          {profile.specializations?.laboratorio && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t('profile.laboratory.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.role')}</Label>
                    <p className="mt-1">{profile.specializations.laboratorio.rol}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.types')}</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.specializations.laboratorio.tipos_laboratorio?.map((tipo, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{tipo}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.techniques')}</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.specializations.laboratorio.tecnicas_equipos?.map((tecnica, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{tecnica}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.experience_17025')}</Label>
                    <p className="mt-1">{profile.specializations.laboratorio.experiencia_17025}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">{t('profile.laboratory.audit_experience')}</Label>
                    <p className="mt-1">{profile.specializations.laboratorio.experiencia_auditorias ? 'Sí' : 'No'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add more specializations as needed */}

          {/* Certificaciones */}
          {profile.candidate?.certificaciones && (
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
                <p className="whitespace-pre-wrap">{profile.candidate.certificaciones}</p>
              </CardContent>
            </Card>
          )}

          {/* Comentarios Adicionales */}
          {profile.candidate?.comentarios && (
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
                <p className="whitespace-pre-wrap">{profile.candidate.comentarios}</p>
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