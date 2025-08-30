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
import { COUNTRY_CODES } from "@/lib/registration-data";
import { toast } from "sonner";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    codigoPais: "+56",
    codigoOtro: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual Formspree endpoint
      const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";
      
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          empresa: formData.empresa,
          telefono: `${formData.codigoPais === "otro" ? formData.codigoOtro : formData.codigoPais} ${formData.telefono}`,
          tipoConsulta: formData.tipoConsulta,
          mensaje: formData.mensaje,
          _replyto: formData.email,
          _subject: `Nueva consulta de ${formData.nombre} - ${formData.tipoConsulta}`
        }),
      });

      if (response.ok) {
        toast.success("Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.");
        
        // Reset form
        setFormData({
          nombre: "",
          email: "",
          empresa: "",
          codigoPais: "+56",
          codigoOtro: "",
          telefono: "",
          tipoConsulta: "",
          mensaje: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.");
    } finally {
      setIsSubmitting(false);
    }
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
                        <Label htmlFor="email">Correo Electrónico <span className="text-red-500">*</span></Label>
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
                    </div>
                    
                    <div>
                      <Label htmlFor="telefono">Teléfono <span className="text-red-500">*</span></Label>
                      <div className="flex gap-4 items-start">
                        <div className="min-w-[140px]">
                          <Select value={formData.codigoPais} onValueChange={(value) => setFormData({...formData, codigoPais: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="🇨🇱 +56" />
                            </SelectTrigger>
                            <SelectContent>
                              {COUNTRY_CODES.map(code => (
                                <SelectItem key={code.value} value={code.value}>
                                  {code.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {formData.codigoPais === "otro" && (
                          <div className="min-w-[80px]">
                            <Input
                              type="text"
                              placeholder="+1"
                              value={formData.codigoOtro}
                              onChange={(e) => setFormData({...formData, codigoOtro: e.target.value})}
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <Input
                            id="telefono"
                            type="tel"
                            placeholder="9 1234 5678"
                            value={formData.telefono}
                            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tipoConsulta">Tipo de Consulta</Label>
                      <Select value={formData.tipoConsulta} onValueChange={(value) => setFormData({...formData, tipoConsulta: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de consulta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recruiting">Búsqueda de Talento Especializado</SelectItem>
                          <SelectItem value="headhunting">Headhunting Ejecutivo</SelectItem>
                          <SelectItem value="consultoria">Consultoría en RRHH</SelectItem>
                          <SelectItem value="evaluacion-talento">Evaluación de Talento</SelectItem>
                          <SelectItem value="programa-talento">Programa TalentoTIC</SelectItem>
                          <SelectItem value="busco-empleo">Busco Empleo</SelectItem>
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

                    <Button type="submit" className="btn-hero w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </form>

                  {/* Alternative Contact Options */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="text-lg font-display font-semibold mb-4 text-center">O contáctanos directamente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                        asChild
                      >
                        <a href="https://wa.me/message/IH46LPYOLH4CH1">
                          <Phone className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open('mailto:email@ticselect.com?subject=Consulta sobre servicios TIC Select', '_blank')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Directo
                      </Button>
                    </div>
                  </div>
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
                        <a href="tel:+56979575372" className="text-muted-foreground hover:text-primary">
                          +56 9 7957 5372
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

      </main>

      <Footer />
    </div>
  );
};

export default Contacto;