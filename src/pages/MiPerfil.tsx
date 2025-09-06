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
                  Familias de Roles Profesionales
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Áreas de especialización y roles profesionales en los que tienes experiencia
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.roleFamilies.map((familia, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-sm">
                          {familia.familia_rol}
                        </Badge>
                        {familia.familia_rol_otro && (
                          <span className="text-sm text-muted-foreground">
                            - {familia.familia_rol_otro}
                          </span>
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

          {/* Especializaciones */}
          {/* Laboratorio */}
          {profile.specializations?.laboratorio && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Especialización en Laboratorio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rol</label>
                  <p>{profile.specializations.laboratorio.rol}</p>
                </div>
                {profile.specializations.laboratorio.tipos_laboratorio?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipos de Laboratorio</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.laboratorio.tipos_laboratorio.map((tipo, index) => (
                        <Badge key={index} variant="outline">{tipo}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.laboratorio.tecnicas_equipos?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Técnicas y Equipos</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.laboratorio.tecnicas_equipos.map((tecnica, index) => (
                        <Badge key={index} variant="secondary">{tecnica}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.laboratorio.experiencia_17025 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia ISO 17025</label>
                    <p>{profile.specializations.laboratorio.experiencia_17025}</p>
                  </div>
                )}
                {profile.specializations.laboratorio.experiencia_auditorias && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia en Auditorías</label>
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
                  Especialización en Auditoría
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.auditoria.tipo_auditor?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipo de Auditor</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.auditoria.tipo_auditor.map((tipo, index) => (
                        <Badge key={index} variant="outline">{tipo}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.auditoria.normas_auditadas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Normas Auditadas</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.auditoria.normas_auditadas.map((norma, index) => (
                        <Badge key={index} variant="secondary">{norma}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.auditoria.horas_auditoria && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Horas de Auditoría</label>
                    <p>{profile.specializations.auditoria.horas_auditoria}</p>
                  </div>
                )}
                {profile.specializations.auditoria.registro_irca && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Registro IRCA</label>
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
                  Certificación de Sistemas de Gestión
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.certSistemas.nivel_competencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nivel de Competencia</label>
                    <p>{profile.specializations.certSistemas.nivel_competencia}</p>
                  </div>
                )}
                {profile.specializations.certSistemas.normas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Normas</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.certSistemas.normas.map((norma, index) => (
                        <Badge key={index} variant="outline">{norma}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.certSistemas.registro_irca && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Registro IRCA</label>
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
                  Certificación de Productos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.certProductos.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.certProductos.rol}</p>
                  </div>
                )}
                {profile.specializations.certProductos.sectores?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Sectores</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.certProductos.sectores.map((sector, index) => (
                        <Badge key={index} variant="outline">{sector}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.certProductos.experiencia_17065 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia ISO 17065</label>
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
                  Certificación de Personas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.certPersonas.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.certPersonas.rol}</p>
                  </div>
                )}
                {profile.specializations.certPersonas.areas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Áreas</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.certPersonas.areas.map((area, index) => (
                        <Badge key={index} variant="outline">{area}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.certPersonas.experiencia_17024 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia ISO 17024</label>
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
                  Inspección
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.inspeccion.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.inspeccion.rol}</p>
                  </div>
                )}
                {profile.specializations.inspeccion.tipo_organismo && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipo de Organismo</label>
                    <p>{profile.specializations.inspeccion.tipo_organismo}</p>
                  </div>
                )}
                {profile.specializations.inspeccion.areas_inspeccion?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Áreas de Inspección</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.inspeccion.areas_inspeccion.map((area, index) => (
                        <Badge key={index} variant="outline">{area}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.inspeccion.certificaciones?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Certificaciones</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.inspeccion.certificaciones.map((cert, index) => (
                        <Badge key={index} variant="secondary">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.inspeccion.experiencia_17020 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia ISO 17020</label>
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
                  Área Comercial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.comercial.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.comercial.rol}</p>
                  </div>
                )}
                {profile.specializations.comercial.sectores_atendidos?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Sectores Atendidos</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.comercial.sectores_atendidos.map((sector, index) => (
                        <Badge key={index} variant="outline">{sector}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.comercial.lineas_dominadas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Líneas de Negocio Dominadas</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.comercial.lineas_dominadas.map((linea, index) => (
                        <Badge key={index} variant="secondary">{linea}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.comercial.ticket_promedio && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ticket Promedio</label>
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
                  Operaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.operaciones.nivel && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nivel</label>
                    <p>{profile.specializations.operaciones.nivel}</p>
                  </div>
                )}
                {profile.specializations.operaciones.areas?.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Áreas</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profile.specializations.operaciones.areas.map((area, index) => (
                        <Badge key={index} variant="outline">{area}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.specializations.operaciones.personas_cargo && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Personas a Cargo</label>
                    <p>{profile.specializations.operaciones.personas_cargo}</p>
                  </div>
                )}
                {profile.specializations.operaciones.presupuesto && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Presupuesto Manejado</label>
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
                  Tecnologías de la Información
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.ti.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.ti.rol}</p>
                  </div>
                )}
                {profile.specializations.ti.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia</label>
                    <p>{profile.specializations.ti.experiencia}</p>
                  </div>
                )}
                {profile.specializations.ti.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Comentarios</label>
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
                  HSE (Salud, Seguridad y Medio Ambiente)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.hse.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.hse.rol}</p>
                  </div>
                )}
                {profile.specializations.hse.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia</label>
                    <p>{profile.specializations.hse.experiencia}</p>
                  </div>
                )}
                {profile.specializations.hse.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Comentarios</label>
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
                  Área Legal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.legal.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.legal.rol}</p>
                  </div>
                )}
                {profile.specializations.legal.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia</label>
                    <p>{profile.specializations.legal.experiencia}</p>
                  </div>
                )}
                {profile.specializations.legal.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Comentarios</label>
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
                  Supply Chain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.supplyChain.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.supplyChain.rol}</p>
                  </div>
                )}
                {profile.specializations.supplyChain.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia</label>
                    <p>{profile.specializations.supplyChain.experiencia}</p>
                  </div>
                )}
                {profile.specializations.supplyChain.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Comentarios</label>
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
                  Atención al Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.atencionCliente.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.atencionCliente.rol}</p>
                  </div>
                )}
                {profile.specializations.atencionCliente.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia</label>
                    <p>{profile.specializations.atencionCliente.experiencia}</p>
                  </div>
                )}
                {profile.specializations.atencionCliente.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Comentarios</label>
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
                  PMO (Project Management Office)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.pmo.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.pmo.rol}</p>
                  </div>
                )}
                {profile.specializations.pmo.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia</label>
                    <p>{profile.specializations.pmo.experiencia}</p>
                  </div>
                )}
                {profile.specializations.pmo.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Comentarios</label>
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
                  Dirección
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.specializations.direccion.rol && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rol</label>
                    <p>{profile.specializations.direccion.rol}</p>
                  </div>
                )}
                {profile.specializations.direccion.experiencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Experiencia</label>
                    <p>{profile.specializations.direccion.experiencia}</p>
                  </div>
                )}
                {profile.specializations.direccion.comentarios && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Comentarios</label>
                    <p>{profile.specializations.direccion.comentarios}</p>
                  </div>
                )}
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