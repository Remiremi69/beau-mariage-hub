import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { menuData, type SelectedDishes } from "./menuData";

interface MonMenuParfaitSidebarProps {
  selectedDishes: SelectedDishes;
  onCategoryClick: (categoryId: string) => void;
}

const MonMenuParfaitSidebar = ({ selectedDishes, onCategoryClick }: MonMenuParfaitSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDishDetails = (categoryId: string, dishId: string | null) => {
    if (!dishId) return null;
    const category = menuData.find(c => c.id === categoryId);
    return category?.options.find(o => o.id === dishId) || null;
  };

  const completedCount = Object.values(selectedDishes).filter(Boolean).length;
  const totalCategories = menuData.length;
  const isComplete = completedCount === totalCategories;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 w-72 bg-[#F5F1EC] rounded-2xl shadow-2xl border border-[#E2DACC] overflow-hidden z-40">
        <div className="p-4 bg-[#5D4E3F] text-white">
          <h3 className="font-bold text-lg">Mon Menu Parfait</h3>
          <p className="text-sm text-white/70">{completedCount}/{totalCategories} sélectionnés</p>
        </div>

        <div className="p-4 space-y-3">
          {menuData.map((category) => {
            const dish = getDishDetails(category.id, selectedDishes[category.id]);
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#E2DACC]/50 transition-colors text-left group"
              >
                {/* Thumbnail or Placeholder */}
                <div className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 ${
                  dish ? "" : "bg-[#E2DACC] flex items-center justify-center"
                }`}>
                  {dish ? (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-[#5D4E3F]/30 text-2xl">?</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#5D4E3F]/60 uppercase tracking-wide">{category.title}</p>
                  {dish ? (
                    <p className="text-sm font-medium text-[#5D4E3F] truncate">{dish.name}</p>
                  ) : (
                    <p className="text-sm text-[#5D4E3F]/40 italic">Non sélectionné</p>
                  )}
                </div>

                {/* Check Icon */}
                {dish && (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Completion Status */}
        <div className="p-4 border-t border-[#E2DACC]">
          <div className="h-2 bg-[#E2DACC] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#5D4E3F] transition-all duration-500"
              style={{ width: `${(completedCount / totalCategories) * 100}%` }}
            />
          </div>
          {isComplete && (
            <p className="text-center text-sm text-green-600 font-medium mt-2 animate-fade-in">
              ✓ Menu complet !
            </p>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* Expanded View */}
        {isExpanded && (
          <div className="bg-[#F5F1EC] border-t border-[#E2DACC] p-4 max-h-[60vh] overflow-y-auto animate-slide-up">
            <div className="grid grid-cols-4 gap-3">
              {menuData.map((category) => {
                const dish = getDishDetails(category.id, selectedDishes[category.id]);
                
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryClick(category.id);
                      setIsExpanded(false);
                    }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`w-16 h-16 rounded-lg overflow-hidden ${
                      dish ? "ring-2 ring-[#5D4E3F]" : "bg-[#E2DACC]"
                    }`}>
                      {dish ? (
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#5D4E3F]/30 text-xl">
                          ?
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-[#5D4E3F]/70">{category.title.replace("Le ", "").replace("Les ", "").replace("L'", "")}</span>
                    {dish && <Check className="w-3 h-3 text-green-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Collapsed Bar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-[#5D4E3F] text-white p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold">Mon Menu</span>
            <span className="text-sm text-white/70">{completedCount}/{totalCategories}</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Mini Thumbnails */}
            <div className="flex -space-x-2">
              {menuData.slice(0, 4).map((category) => {
                const dish = getDishDetails(category.id, selectedDishes[category.id]);
                return (
                  <div
                    key={category.id}
                    className={`w-8 h-8 rounded-full border-2 border-[#5D4E3F] overflow-hidden ${
                      dish ? "" : "bg-white/20"
                    }`}
                  >
                    {dish && (
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default MonMenuParfaitSidebar;
