import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuienesSomos from "./pages/QuienesSomos";
import ServiciosEmpresas from "./pages/ServiciosEmpresas";
import VacantesPerfiles from "./pages/VacantesPerfiles";
import ProgramaTalentoTIC from "./pages/ProgramaTalentoTIC";
import RegistroTalento from "./pages/RegistroTalento";
import Contacto from "./pages/Contacto";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import ProgramaAfiliados from "./pages/ProgramaAfiliados";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Spanish routes */}
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/servicios-para-empresas" element={<ServiciosEmpresas />} />
              <Route path="/vacantes-y-perfiles" element={<VacantesPerfiles />} />
              <Route path="/programa-talentotic" element={<ProgramaTalentoTIC />} />
              <Route path="/contacto" element={<Contacto />} />
              
              {/* English routes */}
              <Route path="/about-us" element={<QuienesSomos />} />
              <Route path="/enterprise-services" element={<ServiciosEmpresas />} />
              <Route path="/jobs-profiles" element={<VacantesPerfiles />} />
              <Route path="/tic-talent-program" element={<ProgramaTalentoTIC />} />
              <Route path="/contact" element={<Contacto />} />
              
              {/* Portuguese routes */}
              <Route path="/sobre-nos" element={<QuienesSomos />} />
              <Route path="/servicos-empresas" element={<ServiciosEmpresas />} />
              <Route path="/vagas-perfis" element={<VacantesPerfiles />} />
              <Route path="/programa-talento-tic" element={<ProgramaTalentoTIC />} />
              <Route path="/contato" element={<Contacto />} />
              
              <Route path="/registro-talento" element={<ProtectedRoute><RegistroTalento /></ProtectedRoute>} />
              <Route path="/programa-afiliados" element={<ProgramaAfiliados />} />
              <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;