import { useEffect, useState, useRef } from "react";

export type SceneConfig = {
  title: string;
  subtitle?: string;
  images: string[];
  video?: string;
  duration: number;
};

type TransitionSceneProps = {
  isVisible: boolean;
  scene: SceneConfig | null;
  onComplete: () => void;
};

const TransitionScene = ({ isVisible, scene, onComplete }: TransitionSceneProps) => {
  const [show, setShow] = useState(false);
  const [progressStarted, setProgressStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const effectiveDuration = scene
    ? isMobile
      ? Math.min(scene.duration, 2500)
      : scene.duration
    : 3000;

  useEffect(() => {
    if (isVisible && scene) {
      setShow(true);
      // Start progress bar on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setProgressStarted(true);
        });
      });

      timerRef.current = setTimeout(() => {
        onComplete();
      }, effectiveDuration);
    } else {
      setShow(false);
      setProgressStarted(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, scene, effectiveDuration, onComplete]);

  if (!show || !scene) return null;

  const kbAnimations = ["kenBurns1", "kenBurns2", "kenBurns3"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#0d0b08",
      }}
    >
      {/* Layer 1 — Images with Ken Burns or simple fade on mobile */}
      {scene.video ? (
        <video
          autoPlay
          muted
          playsInline
          loop={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onEnded={onComplete}
        >
          <source src={scene.video} type="video/mp4" />
        </video>
      ) : (
        scene.images.map((img, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0,
              animation: isMobile
                ? `sceneMobileFade ${effectiveDuration}ms ease-in-out ${(effectiveDuration / scene.images.length) * i}ms forwards`
                : `${kbAnimations[i % 3]} ${effectiveDuration}ms ease-in-out ${(effectiveDuration / scene.images.length) * i}ms forwards`,
            }}
          />
        ))
      )}

      {/* Layer 2 — Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(13,11,8,0.30) 0%, rgba(13,11,8,0.10) 40%, rgba(13,11,8,0.60) 100%)",
          zIndex: 1,
        }}
      />

      {/* Layer 3 — Text content */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 40px",
          zIndex: 2,
          animation: "sceneFadeIn 0.8s ease-out 0.5s both",
        }}
      >
        {/* Decorative line */}
        <div
          style={{
            width: 40,
            height: 1,
            background: "#c9a96e",
            margin: "0 auto 20px",
          }}
        />

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(36px, 6vw, 64px)",
            color: "#faf8f4",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {scene.title}
        </h2>

        {/* Subtitle */}
        {scene.subtitle && (
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: 13,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.70)",
              marginTop: 12,
            }}
          >
            {scene.subtitle}
          </p>
        )}
      </div>

      {/* Layer 4 — Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          background: "rgba(201,169,110,0.40)",
          width: progressStarted ? "100%" : "0%",
          transition: `width ${effectiveDuration}ms linear`,
          zIndex: 3,
        }}
      />

      {/* Layer 5 — Skip button */}
      <button
        onClick={onComplete}
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: 11,
          letterSpacing: "0.20em",
          textTransform: "uppercase",
          color: isMobile ? "rgba(232,221,208,0.65)" : "rgba(232,221,208,0.40)",
          cursor: "pointer",
          background: "transparent",
          border: "none",
          zIndex: 4,
          padding: "8px 12px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(232,221,208,0.70)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = isMobile
            ? "rgba(232,221,208,0.65)"
            : "rgba(232,221,208,0.40)";
        }}
        data-cursor-hover
      >
        PASSER →
      </button>
    </div>
  );
};

export default TransitionScene;
