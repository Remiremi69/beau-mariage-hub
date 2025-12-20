import { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

interface PhotoSphereViewerProps {
  imageUrl: string;
  className?: string;
}

const PhotoSphereViewer = ({ imageUrl, className = "" }: PhotoSphereViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy existing viewer
    if (viewerRef.current) {
      viewerRef.current.destroy();
    }

    setIsLoading(true);

    // Create new viewer
    viewerRef.current = new Viewer({
      container: containerRef.current,
      panorama: imageUrl,
      navbar: false,
      defaultZoomLvl: 50,
      minFov: 30,
      maxFov: 90,
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: false,
      loadingTxt: "",
    });

    viewerRef.current.addEventListener("ready", () => {
      setIsLoading(false);
    });

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [imageUrl]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Chargement de la vue 360°...</span>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />
      <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-2 rounded-full flex items-center gap-2">
        <span>🖱️</span>
        <span>Glissez pour explorer • Molette pour zoomer</span>
      </div>
    </div>
  );
};

export default PhotoSphereViewer;
