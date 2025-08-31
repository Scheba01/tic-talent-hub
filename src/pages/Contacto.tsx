import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { COUNTRY_CODES } from "@/lib/registration-data";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";


const Contacto = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    codigoPais: "+56",
    codigoOtro: "",
    telefono: "",
    tipoConsulta: "",
    mensaje: "",
    aceptaPrivacidad: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceptaPrivacidad) {
      toast.error(t('nav.home') === 'Home' ? "You must accept the Privacy Policy to continue." : t('nav.home') === 'Início' ? "Você deve aceitar a Política de Privacidade para continuar." : "Debes aceptar la Política de Privacidad para continuar.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      
      // Formspree endpoint configured
      const formspreeEndpoint = "https://formspree.io/f/xjkewene";
      
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
        toast.success(t('nav.home') === 'Home' ? "✅ Message sent successfully. We will contact you soon." : t('nav.home') === 'Início' ? "✅ Mensagem enviada com sucesso. Entraremos em contato em breve." : "✅ Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.", {
          style: {
            background: '#10B981',
            color: 'white',
            border: '1px solid #059669',
          }
        });
        
        // Reset form
        setFormData({
          nombre: "",
          email: "",
          empresa: "",
          codigoPais: "+56",
          codigoOtro: "",
          telefono: "",
          tipoConsulta: "",
          mensaje: "",
          aceptaPrivacidad: false
        });
      } else {
        throw new Error("Failed to send message");
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('nav.home') === 'Home' ? "Error sending message. Please try again or contact us directly." : t('nav.home') === 'Início' ? "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente." : "Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.");
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
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('contact.subtitle')}
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
                  <CardTitle className="text-2xl font-display">{t('contact.form.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombre">{t('contact.form.full_name')}</Label>
                        <Input
                          id="nombre"
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('contact.form.email')} <span className="text-red-500">*</span></Label>
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
                        <Label htmlFor="empresa">{t('contact.form.company')}</Label>
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
                      <Label htmlFor="telefono">{t('contact.form.phone')} <span className="text-red-500">*</span></Label>
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
                      <Label htmlFor="tipoConsulta">{t('contact.form.query_type')}</Label>
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
                      <Label htmlFor="mensaje">{t('contact.form.message')}</Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                        placeholder={t('contact.form.message_placeholder')}
                        rows={6}
                        required
                      />
                    </div>

                    {/* Privacy Policy Consent */}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="aceptaPrivacidad"
                        checked={formData.aceptaPrivacidad}
                        onCheckedChange={(checked) => setFormData({...formData, aceptaPrivacidad: checked === true})}
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="aceptaPrivacidad"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t('contact.form.privacy_accept')}{" "}
                          <Link 
                            to="/politica-de-privacidad" 
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            {t('contact.form.privacy_policy')}
                          </Link>
                          {" "}y autorizo el uso de la información proporcionada para procesos de selección y contacto profesional. 
                          Mis datos serán utilizados exclusivamente para fines de reclutamiento y evaluación de perfiles profesionales. 
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                      </div>
                    </div>

                    <Button type="submit" className="btn-hero w-full" disabled={isSubmitting || !formData.aceptaPrivacidad}>
                      {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                    </Button>
                  </form>

                  {/* Alternative Contact Options */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="text-lg font-display font-semibold mb-4 text-center">{t('contact.direct_title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                        asChild
                      >
                        <a 
                          href="https://wa.me/56979575372?text=Hola%20Tic%20Select%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n."
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          {t('why.whatsapp')}
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open('mailto:contacto@ticselect.com?subject=Consulta sobre servicios TIC Select', '_blank')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {t('why.direct_email')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display">{t('contact.info.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium">{t('contact.info.email')}</p>
                        <a href="mailto:contacto@ticselect.com" className="text-muted-foreground hover:text-primary">
                          contacto@ticselect.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium">{t('contact.info.phone')}</p>
                        <a href="tel:+56979575372" className="text-muted-foreground hover:text-primary">
                          +56 9 7957 5372
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Clock className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium">{t('contact.info.hours')}</p>
                        <p className="text-muted-foreground">{t('contact.info.hours_desc')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-xl font-display">{t('contact.why.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span>{t('contact.why.consultation')}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span>{t('contact.why.proposal')}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span>{t('contact.why.no_commitment')}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                        <span>{t('contact.why.immediate_access')}</span>
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