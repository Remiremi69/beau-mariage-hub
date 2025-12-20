import { forwardRef } from "react";
import VisualComparator from "./VisualComparator";
import type { MenuCategory, SelectedDishes } from "./menuData";

interface DishCategorySectionProps {
  category: MenuCategory;
  selectedId: string | null;
  onSelect: (dishId: string) => void;
  onScrollToNext: () => void;
  index: number;
}

const DishCategorySection = forwardRef<HTMLDivElement, DishCategorySectionProps>(
  ({ category, selectedId, onSelect, onScrollToNext, index }, ref) => {
    return (
      <section
        ref={ref}
        className="min-h-[80vh] py-12 md:py-16 flex flex-col"
        style={{
          animation: `fade-in 0.6s ease-out ${index * 0.1}s both`
        }}
      >
        {/* Category Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block text-sm font-medium text-[#5D4E3F]/60 uppercase tracking-widest mb-2">
            {category.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#5D4E3F]">
            {category.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#5D4E3F]/30 to-transparent mx-auto mt-4" />
        </div>

        {/* Visual Comparator */}
        <div className="flex-1">
          <VisualComparator
            options={category.options}
            selectedId={selectedId}
            onSelect={onSelect}
            onScrollToNext={onScrollToNext}
          />
        </div>
      </section>
    );
  }
);

DishCategorySection.displayName = "DishCategorySection";

export default DishCategorySection;
