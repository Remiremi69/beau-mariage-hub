import { useState } from "react";
import { X, Play, Wine, Leaf, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DishOption } from "./menuData";

interface DishFocusModalProps {
  dish: DishOption;
  onClose: () => void;
  onSelect: () => void;
}

const DishFocusModal = ({ dish, onClose, onSelect }: DishFocusModalProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const getBadgeIcon = (badge: string) => {
    if (badge.toLowerCase().includes("végétarien") || badge.toLowerCase().includes("local") || badge.toLowerCase().includes("fermier")) {
      return <Leaf className="w-3 h-3" />;
    }
    if (badge.toLowerCase().includes("label") || badge.toLowerCase().includes("aop") || badge.toLowerCase().includes("exception")) {
      return <Star className="w-3 h-3" />;
    }
    return null;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#F5F1EC] rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scale-in 0.3s ease-out" }}
      >
        {/* Header Image */}
        <div className="relative h-64 md:h-80">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{dish.name}</h2>
            <p className="text-white/80">{dish.shortDescription}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {dish.infoBadges.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#5D4E3F]/10 text-[#5D4E3F]"
              >
                {getBadgeIcon(badge)}
                {badge}
              </span>
            ))}
          </div>

          {/* Storytelling */}
          <div>
            <h3 className="text-lg font-bold text-[#5D4E3F] mb-3">L'Histoire du Plat</h3>
            <p className="text-[#5D4E3F]/80 leading-relaxed">
              {dish.storytelling}
            </p>
          </div>

          {/* Wine Pairing */}
          <div className="bg-[#E2DACC]/50 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Wine className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-[#5D4E3F] mb-1">Accord Vin Suggéré</h4>
                <p className="text-sm text-[#5D4E3F]/80">{dish.winePairing}</p>
              </div>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="relative rounded-xl overflow-hidden bg-[#5D4E3F]/10 aspect-video">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8 text-[#5D4E3F] ml-1" />
              </button>
              <p className="text-[#5D4E3F] font-medium mt-3">Voir la préparation du Chef</p>
              <p className="text-[#5D4E3F]/60 text-sm">Vidéo bientôt disponible</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={() => {
                onSelect();
                onClose();
              }}
              size="lg"
              className="flex-1 bg-[#5D4E3F] hover:bg-[#4a3d32] text-white"
            >
              Choisir ce plat
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="flex-1 border-[#5D4E3F]/30 text-[#5D4E3F]"
            >
              Revenir à la sélection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishFocusModal;
