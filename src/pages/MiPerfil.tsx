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
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No tienes un perfil registrado</h2>
            <p className="text-muted-foreground mb-6">
              Completa tu registro para crear tu perfil de talento TIC
            </p>
            <Button onClick={() => navigate("/registro-talento")}>
              Crear mi perfil
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
            <p className="text-muted-foreground">Información completa de tu perfil profesional</p>
          </div>
          <Button onClick={handleEdit} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Editar perfil
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nombre completo</label>
                  <p className="font-medium">{profile.candidate?.nombre_completo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p>{profile.candidate?.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p>{profile.candidate?.codigo_pais} {profile.candidate?.telefono}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ubicación</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p>{profile.candidate?.ciudad}, {profile.candidate?.pais}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Situación actual</label>
                  <p>{profile.candidate?.situacion_actual}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Disponibilidad</label>
                  <p>{profile.candidate?.disponibilidad}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Profesional */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Información Profesional
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Área de estudio</label>
                  <p>{profile.candidate?.area_estudio}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nivel máximo de estudios</label>
                  <p>{profile.candidate?.nivel_maximo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Jornada laboral</label>
                  <p>{profile.candidate?.jornada}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Sueldo actual bruto</label>
                  <p>{profile.candidate?.sueldo_actual_bruto}</p>
                </div>
                {profile.candidate?.linkedin && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">LinkedIn</label>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={profile.candidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Ver perfil
                      </a>
                    </div>
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
                  Familias de Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.roleFamilies.map((familia, index) => (
                    <Badge key={index} variant="secondary">
                      {familia.area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sectores */}
          {profile.sectors && profile.sectors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Sectores de Experiencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.sectors.map((sector, index) => (
                    <Badge key={index} variant="outline">
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
                  Competencias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.competencies.map((comp, index) => (
                    <Badge key={index} variant="default">
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
                  Idiomas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {profile.languages.map((idioma, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">{idioma.idioma}</span>
                      <Badge variant="secondary">{idioma.nivel}</Badge>
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
                  Experiencia Laboral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{exp.cargo}</h4>
                        <Badge variant="outline">{exp.periodo}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{exp.empresa}</p>
                      {exp.descripcion && <p className="text-sm">{exp.descripcion}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certificaciones */}
          {profile.candidate?.certificaciones && (
            <Card>
              <CardHeader>
                <CardTitle>Certificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{profile.candidate.certificaciones}</p>
              </CardContent>
            </Card>
          )}

          {/* Comentarios adicionales */}
          {profile.candidate?.comentarios && (
            <Card>
              <CardHeader>
                <CardTitle>Comentarios Adicionales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{profile.candidate.comentarios}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MiPerfil;