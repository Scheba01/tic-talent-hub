import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario de contacto enviado:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Contacto
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              ¿Listo para encontrar el talento que su empresa necesita? Hablemos sobre cómo podemos ayudarle 
              a alcanzar sus objetivos de contratación.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Envíanos un Mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombre">Nombre Completo</Label>
                        <Input
                          id="nombre"
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
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
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="empresa">Empresa</Label>
                        <Input
                          id="empresa"
                          type="text"
                          value={formData.empresa}
                          onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tipoConsulta">Tipo de Consulta</Label>
                      <Select value={formData.tipoConsulta} onValueChange={(value) => setFormData({...formData, tipoConsulta: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de consulta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recruiting">Recruiting & Headhunting</SelectItem>
                          <SelectItem value="consultoria">HR Consultancy</SelectItem>
                          <SelectItem value="programa-talento">Programa TalentoTIC</SelectItem>
                          <SelectItem value="afiliados">Programa de Afiliados</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="mensaje">Mensaje</Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                        placeholder="Cuéntanos sobre tus necesidades de talento..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="btn-hero w-full">
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display">Información de Contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:email@ticselect.com" className="text-muted-foreground hover:text-primary">
                          email@ticselect.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <a href="tel:+56XXXXXXX" className="text-muted-foreground hover:text-primary">
                          +56 9 XXXX XXXX
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Clock className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium">Horario de Atención</p>
                        <p className="text-muted-foreground">Lunes a Viernes, 9:00 - 18:00 (UTC-3)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl font-display">¿Por qué Contactarnos?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span>Consultoría gratuita sobre sus necesidades de talento</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span>Propuesta personalizada en 24 horas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span>Sin compromisos ni costos ocultos</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span>Acceso inmediato a nuestra red de talento</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              ¿Prefiere una Llamada Directa?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Programe una llamada estratégica de 30 minutos para discutir sus necesidades específicas de talento.
            </p>
            <Button className="btn-hero">
              Agendar Llamada
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;