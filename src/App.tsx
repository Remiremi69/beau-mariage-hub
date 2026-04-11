import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./hooks/useAuth";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import GuideBeaujolais from "./pages/GuideBeaujolais";
import Configurateur from "./pages/Configurateur";
import Temoignages from "./pages/Temoignages";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Garantie from "./pages/Garantie";
import Certification from "./pages/Certification";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
// Série Octobre 2027 pages
import SerieOctobre2027Hub from "./pages/serie-octobre-2027/SerieOctobre2027Hub";
import DomaineDetail from "./pages/serie-octobre-2027/DomaineDetail";
import Traiteur from "./pages/serie-octobre-2027/prestataires/Traiteur";
import Photographe from "./pages/serie-octobre-2027/prestataires/Photographe";
import DJ from "./pages/serie-octobre-2027/prestataires/DJ";
import Decorateur from "./pages/serie-octobre-2027/prestataires/Decorateur";
import Fleuriste from "./pages/serie-octobre-2027/prestataires/Fleuriste";
import Musicien from "./pages/serie-octobre-2027/prestataires/Musicien";
import Signature from "./pages/Signature";
import Acompte from "./pages/Acompte";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isConfigurateur = location.pathname === "/configurateur";
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isConfigurateur && !isAdmin && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concept" element={<Concept />} />
        <Route path="/guide-mariage-beaujolais" element={<GuideBeaujolais />} />
        <Route path="/serie-ete-2027" element={<Navigate to="/serie-octobre-2027" replace />} />
        <Route path="/serie-octobre-2027" element={<SerieOctobre2027Hub />} />
        <Route path="/serie-octobre-2027/domaine" element={<DomaineDetail />} />
        <Route path="/serie-octobre-2027/prestataires/traiteur" element={<Traiteur />} />
        <Route path="/serie-octobre-2027/prestataires/photographe" element={<Photographe />} />
        <Route path="/serie-octobre-2027/prestataires/dj" element={<DJ />} />
        <Route path="/serie-octobre-2027/prestataires/decorateur" element={<Decorateur />} />
        <Route path="/serie-octobre-2027/prestataires/fleuriste" element={<Fleuriste />} />
        <Route path="/serie-octobre-2027/prestataires/musicien" element={<Musicien />} />
        <Route path="/configurateur" element={<Configurateur />} />
        <Route path="/signature/:token" element={<Signature />} />
        <Route path="/acompte/:token" element={<Acompte />} />
        <Route path="/acompte/success" element={<Acompte />} />
        <Route path="/temoignages" element={<Temoignages />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/garantie" element={<Garantie />} />
        <Route path="/certification" element={<Certification />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isConfigurateur && !isAdmin && <Footer />}
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
