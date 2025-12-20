import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface ThemeGalleryProps {
  images: { src: string; alt: string; label: string }[];
  themeName: string;
  className?: string;
}

const ThemeGallery = ({ images, themeName, className = "" }: ThemeGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <div className={className}>
      <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
        <ZoomIn className="w-5 h-5 text-primary" />
        Galerie {themeName}
      </h4>

      {/* Main Carousel */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={12}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="rounded-xl overflow-hidden"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg group/item"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded truncate">
                  {image.label}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          ref={nextRef}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={closeLightbox}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-lg font-semibold">{images[activeIndex]?.label}</span>
            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image */}
          <div
            className="flex-1 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Thumbs]}
              initialSlide={activeIndex}
              spaceBetween={20}
              navigation
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="w-full max-w-4xl"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="max-h-[70vh] w-auto rounded-lg shadow-2xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Thumbnails */}
          <div className="p-4" onClick={(e) => e.stopPropagation()}>
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView={6}
              breakpoints={{
                640: { slidesPerView: 8 },
                1024: { slidesPerView: 10 },
              }}
              watchSlidesProgress
              className="thumbs-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      index === activeIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeGallery;
