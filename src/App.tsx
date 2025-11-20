import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import SerieEte2027 from "./pages/SerieEte2027";
import SalonEphemere from "./pages/SalonEphemere";
import Configurateur from "./pages/Configurateur";
import Temoignages from "./pages/Temoignages";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Garantie from "./pages/Garantie";
import Certification from "./pages/Certification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concept" element={<Concept />} />
          <Route path="/serie-ete-2027" element={<SerieEte2027 />} />
          <Route path="/experience-essayage" element={<SalonEphemere />} />
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
);

export default App;
