import { useState, useRef } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import DishCard from "./DishCard";
import DishFocusModal from "./DishFocusModal";
import type { DishOption } from "./menuData";

interface VisualComparatorProps {
  options: DishOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onScrollToNext: () => void;
}

const VisualComparator = ({ options, selectedId, onSelect, onScrollToNext }: VisualComparatorProps) => {
  const [modalDish, setModalDish] = useState<DishOption | null>(null);
  const [showCompareSlider, setShowCompareSlider] = useState(false);

  if (options.length !== 2) return null;

  const handleSelect = (id: string) => {
    onSelect(id);
    // Smooth scroll to next section after a brief delay
    setTimeout(() => {
      onScrollToNext();
    }, 300);
  };

  return (
    <>
      {/* Mobile: Stacked Cards */}
      <div className="md:hidden space-y-6">
        {options.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            isSelected={selectedId === dish.id}
            onSelect={() => handleSelect(dish.id)}
            onDiscover={() => setModalDish(dish)}
          />
        ))}
      </div>

      {/* Desktop: Visual Comparator */}
      <div className="hidden md:block">
        {/* Toggle between grid and slider */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-[#E2DACC] p-1">
            <button
              onClick={() => setShowCompareSlider(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !showCompareSlider 
                  ? "bg-[#5D4E3F] text-white" 
                  : "text-[#5D4E3F] hover:bg-[#5D4E3F]/10"
              }`}
            >
              Vue Côte à Côte
            </button>
            <button
              onClick={() => setShowCompareSlider(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                showCompareSlider 
                  ? "bg-[#5D4E3F] text-white" 
                  : "text-[#5D4E3F] hover:bg-[#5D4E3F]/10"
              }`}
            >
              Comparer avec Slider
            </button>
          </div>
        </div>

        {showCompareSlider ? (
          /* Comparison Slider Mode */
          <div className="relative rounded-2xl overflow-hidden" style={{ height: "600px" }}>
            <ReactCompareSlider
              itemOne={
                <div className="relative w-full h-full">
                  <ReactCompareSliderImage
                    src={options[0].image}
                    alt={options[0].name}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{options[0].name}</h3>
                    <p className="text-white/80 mb-4">{options[0].shortDescription}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSelect(options[0].id)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedId === options[0].id
                            ? "bg-white text-[#5D4E3F]"
                            : "bg-[#5D4E3F] text-white hover:bg-[#4a3d32]"
                        }`}
                      >
                        {selectedId === options[0].id ? "✓ Choisi" : "Choisir"}
                      </button>
                      <button
                        onClick={() => setModalDish(options[0])}
                        className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10"
                      >
                        Découvrir
                      </button>
                    </div>
                  </div>
                </div>
              }
              itemTwo={
                <div className="relative w-full h-full">
                  <ReactCompareSliderImage
                    src={options[1].image}
                    alt={options[1].name}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-right">
                    <h3 className="text-2xl font-bold text-white mb-2">{options[1].name}</h3>
                    <p className="text-white/80 mb-4">{options[1].shortDescription}</p>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setModalDish(options[1])}
                        className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10"
                      >
                        Découvrir
                      </button>
                      <button
                        onClick={() => handleSelect(options[1].id)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedId === options[1].id
                            ? "bg-white text-[#5D4E3F]"
                            : "bg-[#5D4E3F] text-white hover:bg-[#4a3d32]"
                        }`}
                      >
                        {selectedId === options[1].id ? "✓ Choisi" : "Choisir"}
                      </button>
                    </div>
                  </div>
                </div>
              }
              style={{ height: "100%" }}
            />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              ← Glissez pour comparer →
            </div>
          </div>
        ) : (
          /* Side by Side Mode */
          <div className="grid grid-cols-2 gap-6" style={{ minHeight: "500px" }}>
            {options.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                isSelected={selectedId === dish.id}
                onSelect={() => handleSelect(dish.id)}
                onDiscover={() => setModalDish(dish)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Focus Modal */}
      {modalDish && (
        <DishFocusModal
          dish={modalDish}
          onClose={() => setModalDish(null)}
          onSelect={() => handleSelect(modalDish.id)}
        />
      )}
    </>
  );
};

export default VisualComparator;
