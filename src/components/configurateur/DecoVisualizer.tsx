import { useState, lazy, Suspense, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play, Layers, Images, Check, ChevronDown } from "lucide-react";

// Lazy load heavy components
const PhotoSphereViewer = lazy(() => import("./PhotoSphereViewer"));
const ThemeComparisonSlider = lazy(() => import("./ThemeComparisonSlider"));
const VideoModal = lazy(() => import("./VideoModal"));
const ThemeGallery = lazy(() => import("./ThemeGallery"));

// Import images
import champetre360 from "@/assets/champetre-360.jpg";
import boheme360 from "@/assets/boheme-360.jpg";

import champetrGallery1 from "@/assets/champetre-gallery-1.jpg";
import champetrGallery2 from "@/assets/champetre-gallery-2.jpg";
import champetrGallery3 from "@/assets/champetre-gallery-3.jpg";
import champetrGallery4 from "@/assets/champetre-gallery-4.jpg";
import champetrGallery5 from "@/assets/champetre-gallery-5.jpg";

import bohemeGallery1 from "@/assets/boheme-gallery-1.jpg";
import bohemeGallery2 from "@/assets/boheme-gallery-2.jpg";
import bohemeGallery3 from "@/assets/boheme-gallery-3.jpg";
import bohemeGallery4 from "@/assets/boheme-gallery-4.jpg";
import bohemeGallery5 from "@/assets/boheme-gallery-5.jpg";

interface DecoVisualizerProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = {
  champetre: {
    id: "champetre",
    name: "Champêtre Romantique",
    subtitle: "Nature • Authenticité • Retour aux sources",
    price: "Inclus",
    priceClass: "bg-secondary text-secondary-foreground",
    image360: champetre360,
    gradient: "from-[#C4A484]/20 to-[#A7C4A0]/20",
    gallery: [
      { src: champetrGallery1, alt: "Table champêtre", label: "Table de réception rustique" },
      { src: champetrGallery2, alt: "Arche de cérémonie", label: "Arche de cérémonie fleurie" },
      { src: champetrGallery3, alt: "Éclairage guinguette", label: "Éclairage guinguette" },
      { src: champetrGallery4, alt: "Photobooth rustique", label: "Espace photobooth" },
      { src: champetrGallery5, alt: "Centre de table", label: "Centre de table fleuri" },
    ],
    characteristics: [
      "Tables en bois brut, mobilier rustique",
      "Matériaux naturels : bois, osier, lin, pierre",
      "Fleurs champêtres et délicates",
      "Éclairage : bougies, lanternes, guirlandes guinguette",
      "Ambiance romantique et intime",
    ],
    colors: [
      { name: "Terre de Sienne", color: "#C4A484" },
      { name: "Terracotta", color: "#E2725B" },
      { name: "Lin naturel", color: "#E8DFD0" },
      { name: "Vert sauge", color: "#A7C4A0" },
      { name: "Rose poudré", color: "#E8B4B8" },
    ],
  },
  "boheme-moderne": {
    id: "boheme-moderne",
    name: "Bohème Moderne",
    subtitle: "Élégance • Audace • Sophistication",
    price: "+300€",
    priceClass: "bg-primary text-primary-foreground",
    image360: boheme360,
    gradient: "from-[#A67B5B]/20 to-[#0047AB]/20",
    gallery: [
      { src: bohemeGallery1, alt: "Table bohème moderne", label: "Table de réception élégante" },
      { src: bohemeGallery2, alt: "Arche moderne", label: "Arche de cérémonie moderne" },
      { src: bohemeGallery3, alt: "Éclairage LED cascade", label: "Éclairage LED cascade" },
      { src: bohemeGallery4, alt: "Photobooth néon", label: "Photobooth néon LOVE" },
      { src: bohemeGallery5, alt: "Arrangement floral", label: "Arrangement floral architectural" },
    ],
    characteristics: [
      "Mobilier design, touches dorées et argentées",
      "Matériaux : métal, velours, tissus fluides",
      "Arrangements floraux architecturaux",
      "Éclairage : néons personnalisés, LED cascade",
      "Ambiance festive et moderne",
    ],
    colors: [
      { name: "Mocha Mousse", color: "#A67B5B" },
      { name: "Bleu Cobalt", color: "#0047AB" },
      { name: "Orange vif", color: "#FF6B35" },
      { name: "Vert pistache", color: "#93C572" },
      { name: "Doré", color: "#FFD700" },
    ],
  },
};

const DecoVisualizer = ({ selectedTheme, onThemeChange }: DecoVisualizerProps) => {
  const [showComparison, setShowComparison] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const currentTheme = themes[selectedTheme as keyof typeof themes] || themes.champetre;
  const otherTheme = selectedTheme === "champetre" ? themes["boheme-moderne"] : themes.champetre;

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-6">
      {/* Theme Selector Pills */}
      <RadioGroup 
        value={selectedTheme} 
        onValueChange={onThemeChange}
        className="flex flex-wrap justify-center gap-4"
      >
        {Object.values(themes).map((theme) => (
          <label
            key={theme.id}
            className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer border-2 transition-all ${
              selectedTheme === theme.id
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50"
            }`}
          >
            <RadioGroupItem value={theme.id} className="sr-only" />
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedTheme === theme.id ? "border-primary bg-primary" : "border-muted-foreground"
            }`}>
              {selectedTheme === theme.id && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <div>
              <span className="font-bold">{theme.name}</span>
              <span className={`ml-3 text-xs px-2 py-1 rounded-full ${theme.priceClass}`}>
                {theme.price}
              </span>
            </div>
          </label>
        ))}
      </RadioGroup>

      {/* 360 Viewer Container */}
      <div className="relative rounded-2xl overflow-hidden bg-muted" style={{ height: "55vh", minHeight: "400px" }}>
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Chargement...</span>
            </div>
          </div>
        }>
          <PhotoSphereViewer
            imageUrl={currentTheme.image360}
            className="w-full h-full"
          />
        </Suspense>

        {/* Control Buttons - Bottom Right */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 shadow-lg bg-white/90 hover:bg-white text-foreground"
            onClick={() => setShowComparison(true)}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Comparer les thèmes</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 shadow-lg bg-white/90 hover:bg-white text-foreground"
            onClick={() => setShowVideo(true)}
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Voir l'ambiance</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 shadow-lg bg-white/90 hover:bg-white text-foreground"
            onClick={scrollToGallery}
          >
            <Images className="w-4 h-4" />
            <span className="hidden sm:inline">Explorer les détails</span>
          </Button>
        </div>

        {/* Theme Badge - Top Left */}
        <div className={`absolute top-4 left-4 bg-gradient-to-r ${currentTheme.gradient} backdrop-blur-sm px-4 py-2 rounded-full border border-white/20`}>
          <span className="font-bold text-foreground">{currentTheme.name}</span>
        </div>
      </div>

      {/* Theme Info and Gallery Section */}
      <div ref={galleryRef} className="scroll-mt-4">
        {/* Theme Details Card */}
        <div className={`rounded-2xl overflow-hidden border bg-gradient-to-r ${currentTheme.gradient} p-6 mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Characteristics */}
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                Caractéristiques
              </h4>
              <ul className="space-y-2 text-sm">
                {currentTheme.characteristics.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Palette */}
            <div>
              <h4 className="font-bold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                Palette de couleurs
              </h4>
              <div className="flex flex-wrap gap-3">
                {currentTheme.colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border border-border shadow-sm"
                      style={{ backgroundColor: color.color }}
                    />
                    <span className="text-xs">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <Suspense fallback={<div className="h-48 bg-muted animate-pulse rounded-xl" />}>
          <ThemeGallery
            images={currentTheme.gallery}
            themeName={currentTheme.name}
          />
        </Suspense>

        {/* Common Elements */}
        <div className="mt-6 p-4 md:p-6 bg-primary/5 rounded-xl">
          <h4 className="font-bold mb-4 text-center">Inclus dans les deux thèmes</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>Guirlandes LED</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🌸</span>
              <span>Arche florale</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">📸</span>
              <span>Photobooth décoré</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🕯️</span>
              <span>Bougies & lanternes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <Suspense fallback={null}>
          <ThemeComparisonSlider
            leftImage={champetre360}
            rightImage={boheme360}
            leftLabel="Champêtre Romantique"
            rightLabel="Bohème Moderne"
            onClose={() => setShowComparison(false)}
          />
        </Suspense>
      )}

      {/* Video Modal */}
      {showVideo && (
        <Suspense fallback={null}>
          <VideoModal
            videoUrl=""
            posterUrl={currentTheme.image360}
            title={`Ambiance ${currentTheme.name}`}
            onClose={() => setShowVideo(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default DecoVisualizer;
