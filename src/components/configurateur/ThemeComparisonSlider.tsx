import { useState, useRef, useEffect } from "react";

interface ThemeComparisonSliderProps {
  leftImage: string;
  rightImage: string;
  leftLabel: string;
  rightLabel: string;
  className?: string;
  onClose: () => void;
}

const ThemeComparisonSlider = ({
  leftImage,
  rightImage,
  leftLabel,
  rightLabel,
  className = "",
  onClose,
}: ThemeComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`fixed inset-0 z-50 bg-black/90 flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <h3 className="text-xl font-bold">Comparez les thèmes</h3>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Labels */}
      <div className="flex justify-between px-8 py-2 text-white">
        <span className="bg-[#C4A484] px-4 py-2 rounded-full text-sm font-semibold">{leftLabel}</span>
        <span className="bg-[#0047AB] px-4 py-2 rounded-full text-sm font-semibold">{rightLabel}</span>
      </div>

      {/* Comparison Container */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-ew-resize mx-4 mb-4 rounded-xl"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Right Image (Background) */}
        <div className="absolute inset-0">
          <img
            src={rightImage}
            alt={rightLabel}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Left Image (Foreground with clip) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={leftImage}
            alt={leftLabel}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>◀</span>
              <span>▶</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pb-4 text-white/70 text-sm">
        Faites glisser le curseur pour comparer les deux thèmes
      </div>
    </div>
  );
};

export default ThemeComparisonSlider;
