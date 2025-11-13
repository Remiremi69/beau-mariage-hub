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
import Collection from "./pages/Collection";
import SalonEphemere from "./pages/SalonEphemere";
import Marketplace from "./pages/Marketplace";
import Configurateur from "./pages/Configurateur";
import Temoignages from "./pages/Temoignages";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
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
          <Route path="/collection" element={<Collection />} />
          <Route path="/salon-ephemere" element={<SalonEphemere />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/configurateur" element={<Configurateur />} />
          <Route path="/temoignages" element={<Temoignages />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
