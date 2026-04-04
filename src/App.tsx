import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import Configurateur from "./pages/Configurateur";
import Temoignages from "./pages/Temoignages";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Garantie from "./pages/Garantie";
import Certification from "./pages/Certification";
import NotFound from "./pages/NotFound";
// Série Octobre 2027 pages
import SerieOctobre2027Hub from "./pages/serie-octobre-2027/SerieOctobre2027Hub";
import DomaineDetail from "./pages/serie-octobre-2027/DomaineDetail";
import Traiteur from "./pages/serie-octobre-2027/prestataires/Traiteur";
import Photographe from "./pages/serie-octobre-2027/prestataires/Photographe";
import DJ from "./pages/serie-octobre-2027/prestataires/DJ";
import Decorateur from "./pages/serie-octobre-2027/prestataires/Decorateur";
import Fleuriste from "./pages/serie-octobre-2027/prestataires/Fleuriste";
import Musicien from "./pages/serie-octobre-2027/prestataires/Musicien";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/concept" element={<Concept />} />
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
            <Route path="/temoignages" element={<Temoignages />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/garantie" element={<Garantie />} />
            <Route path="/certification" element={<Certification />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
