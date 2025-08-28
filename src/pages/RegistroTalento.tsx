import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const RegistroTalento = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    pais: "",
    ciudad: "",
    telefono: "",
    linkedin: "",
    areaExpertise: "",
    cargoActual: "",
    experiencia: "",
    industrias: [] as string[],
    certificaciones: "",
    disponibilidadViajar: "",
    disponibilidadReubicar: "",
    salario: "",
    aceptaTerminos: false
  });

  const [idiomas, setIdiomas] = useState([{ idioma: "", nivel: "" }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Formulario enviado:", formData, idiomas);
  };

  const addIdioma = () => {
    setIdiomas([...idiomas, { idioma: "", nivel: "" }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Únete a Nuestra Red de Talento TIC
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Completa tu perfil en minutos y accede a las mejores oportunidades laborales del sector en Latinoamérica. 
              Tu información es confidencial y solo será compartida con tu consentimiento.
            </p>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Formulario de Registro</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Información de Cuenta y Contacto */}
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-6">Información de Cuenta y Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                        <Input
                          id="nombreCompleto"
                          type="text"
                          value={formData.nombreCompleto}
                          onChange={(e) => setFormData({...formData, nombreCompleto: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Crear Contraseña</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pais">País de Residencia</Label>
                        <Select value={formData.pais} onValueChange={(value) => setFormData({...formData, pais: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu país" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chile">Chile</SelectItem>
                            <SelectItem value="argentina">Argentina</SelectItem>
                            <SelectItem value="brasil">Brasil</SelectItem>
                            <SelectItem value="colombia">Colombia</SelectItem>
                            <SelectItem value="mexico">México</SelectItem>
                            <SelectItem value="peru">Perú</SelectItem>
                            <SelectItem value="uruguay">Uruguay</SelectItem>
                            <SelectItem value="ecuador">Ecuador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="ciudad">Ciudad</Label>
                        <Input
                          id="ciudad"
                          type="text"
                          value={formData.ciudad}
                          onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefono">Número de Teléfono</Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="linkedin">URL de tu Perfil de LinkedIn</Label>
                        <Input
                          id="linkedin"
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                          placeholder="https://linkedin.com/in/tu-perfil"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Perfil Profesional */}
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-6">Perfil Profesional</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="areaExpertise">Área Principal de Expertise</Label>
                        <Select value={formData.areaExpertise} onValueChange={(value) => setFormData({...formData, areaExpertise: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu área" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tecnico-operativo">Técnico y Operativo</SelectItem>
                            <SelectItem value="comercial">Comercial</SelectItem>
                            <SelectItem value="ejecutivo">Ejecutivo</SelectItem>
                            <SelectItem value="calidad-compliance">Calidad y Compliance</SelectItem>
                            <SelectItem value="hse">HSE</SelectItem>
                            <SelectItem value="ingenieria">Ingeniería</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="cargoActual">Tu Cargo Actual/Más Reciente</Label>
                        <Input
                          id="cargoActual"
                          type="text"
                          value={formData.cargoActual}
                          onChange={(e) => setFormData({...formData, cargoActual: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="experiencia">Años de Experiencia en el sector TIC</Label>
                        <Select value={formData.experiencia} onValueChange={(value) => setFormData({...formData, experiencia: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona experiencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 años</SelectItem>
                            <SelectItem value="3-5">3-5 años</SelectItem>
                            <SelectItem value="6-10">6-10 años</SelectItem>
                            <SelectItem value="11-15">11-15 años</SelectItem>
                            <SelectItem value="+15">+15 años</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="certificaciones">Certificaciones y Normas Clave</Label>
                        <Input
                          id="certificaciones"
                          type="text"
                          value={formData.certificaciones}
                          onChange={(e) => setFormData({...formData, certificaciones: e.target.value})}
                          placeholder="ISO 9001, ISO 27001, etc."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Idiomas */}
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-6">Idiomas</h3>
                    {idiomas.map((idioma, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label>Idioma</Label>
                          <Input
                            type="text"
                            value={idioma.idioma}
                            onChange={(e) => {
                              const newIdiomas = [...idiomas];
                              newIdiomas[index].idioma = e.target.value;
                              setIdiomas(newIdiomas);
                            }}
                            placeholder="Español, Inglés, etc."
                          />
                        </div>
                        <div>
                          <Label>Nivel</Label>
                          <Select 
                            value={idioma.nivel} 
                            onValueChange={(value) => {
                              const newIdiomas = [...idiomas];
                              newIdiomas[index].nivel = value;
                              setIdiomas(newIdiomas);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona nivel" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nativo">Nativo</SelectItem>
                              <SelectItem value="avanzado">Avanzado</SelectItem>
                              <SelectItem value="intermedio">Intermedio</SelectItem>
                              <SelectItem value="basico">Básico</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addIdioma}>
                      + Añadir otro idioma
                    </Button>
                  </div>

                  {/* Disponibilidad */}
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-6">Disponibilidad</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Disponibilidad para viajar</Label>
                        <Select value={formData.disponibilidadViajar} onValueChange={(value) => setFormData({...formData, disponibilidadViajar: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="si">Sí</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Disponibilidad para reubicarse</Label>
                        <Select value={formData.disponibilidadReubicar} onValueChange={(value) => setFormData({...formData, disponibilidadReubicar: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-interesado">No interesado</SelectItem>
                            <SelectItem value="dentro-pais">Dentro de mi país</SelectItem>
                            <SelectItem value="latam">Internacional (LATAM)</SelectItem>
                            <SelectItem value="global">Global</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="salario">Pretensiones Salariales (Mensual en USD, Opcional)</Label>
                        <Input
                          id="salario"
                          type="number"
                          value={formData.salario}
                          onChange={(e) => setFormData({...formData, salario: e.target.value})}
                          placeholder="5000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Términos y Condiciones */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terminos" 
                      checked={formData.aceptaTerminos}
                      onCheckedChange={(checked) => setFormData({...formData, aceptaTerminos: checked as boolean})}
                      required
                    />
                    <Label htmlFor="terminos" className="text-sm">
                      Acepto la Política de Tratamiento de Datos
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button type="submit" className="btn-hero" disabled={!formData.aceptaTerminos}>
                      FINALIZAR REGISTRO
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RegistroTalento;