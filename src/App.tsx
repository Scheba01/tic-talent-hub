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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/servicios-para-empresas" element={<ServiciosEmpresas />} />
          <Route path="/vacantes-y-perfiles" element={<VacantesPerfiles />} />
          <Route path="/programa-talentotic" element={<ProgramaTalentoTIC />} />
          <Route path="/registro-talento" element={<RegistroTalento />} />
           <Route path="/contacto" element={<Contacto />} />
           <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
