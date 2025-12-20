import { useState } from "react";
import { Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DishOption } from "./menuData";

interface DishCardProps {
  dish: DishOption;
  isSelected: boolean;
  onSelect: () => void;
  onDiscover: () => void;
}

const DishCard = ({ dish, isSelected, onSelect, onDiscover }: DishCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative h-full min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 ${
        isSelected 
          ? "ring-4 ring-[#5D4E3F] shadow-2xl" 
          : "hover:shadow-xl"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0">
        <img
          src={dish.image}
          alt={dish.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-[#5D4E3F] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold z-10 animate-scale-in">
          <Check className="w-4 h-4" />
          Sélectionné
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {dish.infoBadges.slice(0, 2).map((badge, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
          {dish.name}
        </h3>
        
        {/* Description */}
        <p className="text-white/80 text-sm md:text-base mb-6">
          {dish.shortDescription}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`flex-1 ${
              isSelected 
                ? "bg-white text-[#5D4E3F] hover:bg-white/90" 
                : "bg-[#5D4E3F] hover:bg-[#4a3d32] text-white"
            }`}
          >
            {isSelected ? "✓ Choisi" : "Choisir ce plat"}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDiscover();
            }}
            variant="outline"
            className="flex-1 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Découvrir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
