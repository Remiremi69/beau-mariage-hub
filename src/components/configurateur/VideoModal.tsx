import { useEffect } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface VideoModalProps {
  videoUrl: string;
  posterUrl: string;
  title: string;
  onClose: () => void;
}

const VideoModal = ({ videoUrl, posterUrl, title, onClose }: VideoModalProps) => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        {/* Since we don't have actual videos, we'll show a placeholder with the poster image */}
        <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
              <div className="w-0 h-0 border-l-[30px] border-l-white border-y-[18px] border-y-transparent ml-2" />
            </div>
            <p className="text-white text-lg font-semibold">Vidéo d'ambiance</p>
            <p className="text-white/70 text-sm">Bientôt disponible</p>
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center pb-6 text-white/50 text-sm">
        Appuyez sur Échap ou cliquez sur ✕ pour fermer
      </div>
    </div>
  );
};

export default VideoModal;
