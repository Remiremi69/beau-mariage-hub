import { useRef, useCallback } from "react";
import DishCategorySection from "./DishCategorySection";
import MonMenuParfaitSidebar from "./MonMenuParfaitSidebar";
import { menuData, type SelectedDishes } from "./menuData";

interface MenuDegustationVirtuelProps {
  selectedDishes: SelectedDishes;
  onDishSelect: (categoryId: string, dishId: string) => void;
}

const MenuDegustationVirtuel = ({ selectedDishes, onDishSelect }: MenuDegustationVirtuelProps) => {
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToCategory = useCallback((categoryId: string) => {
    const ref = sectionRefs.current[categoryId];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollToNextCategory = useCallback((currentCategoryId: string) => {
    const currentIndex = menuData.findIndex(c => c.id === currentCategoryId);
    if (currentIndex < menuData.length - 1) {
      const nextCategory = menuData[currentIndex + 1];
      scrollToCategory(nextCategory.id);
    }
  }, [scrollToCategory]);

  return (
    <div className="relative">
      {/* Intro Header */}
      <div className="text-center py-8 mb-8">
        <span className="inline-block px-4 py-2 bg-[#E2DACC]/50 rounded-full text-sm text-[#5D4E3F] font-medium mb-4">
          ✨ Expérience Gastronomique
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#5D4E3F] mb-4">
          Le Menu Dégustation Virtuel
        </h2>
        <p className="text-[#5D4E3F]/70 max-w-2xl mx-auto text-lg">
          Laissez-vous guider par vos sens. Découvrez chaque plat, comparez, et composez le menu parfait pour votre jour J.
        </p>
      </div>

      {/* Category Sections */}
      <div className="space-y-8 lg:pr-80">
        {menuData.map((category, index) => (
          <DishCategorySection
            key={category.id}
            ref={(el) => { sectionRefs.current[category.id] = el; }}
            category={category}
            selectedId={selectedDishes[category.id]}
            onSelect={(dishId) => onDishSelect(category.id, dishId)}
            onScrollToNext={() => scrollToNextCategory(category.id)}
            index={index}
          />
        ))}
      </div>

      {/* Sidebar */}
      <MonMenuParfaitSidebar
        selectedDishes={selectedDishes}
        onCategoryClick={scrollToCategory}
      />

      {/* Spacer for mobile bottom bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default MenuDegustationVirtuel;
