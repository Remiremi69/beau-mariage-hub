import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ConfigurateurState, defaultState, OPTION_LABELS } from "./pricingTypes";
import { calculateBreakdown } from "./pricing/pricingEngine";
import Step00_Domaine from "./steps/Step00_Domaine";
import Step01_Date from "./steps/Step01_Date";
import Step02_Invites from "./steps/Step02_Invites";
import Step03_Ceremonie from "./steps/Step03_Ceremonie";
import Step04_VinDhonneur from "./steps/Step04_VinDhonneur";
import Step05_Repas from "./steps/Step05_Repas";
import Step06_Photographe from "./steps/Step06_Photographe";
import Step07_DJ from "./steps/Step07_DJ";
import Step08_Deco from "./steps/Step08_Deco";
import Step09_Options from "./steps/Step09_Options";
import Step10_SiteMariage from "./steps/Step10_SiteMariage";
import Step11_Recap from "./steps/Step11_Recap";

import hero2 from "@/assets/domaine-hero-2.png";
import hero3 from "@/assets/domaine-hero-3.png";
import hero4 from "@/assets/domaine-hero-4.png";
import hero1 from "@/assets/domaine-hero-1.png";
import venueExterior from "@/assets/venue-exterior.jpg";
import heroWedding from "@/assets/hero-wedding.jpg";

const heroImages = [hero2, hero3, hero4, hero1];
const allImages = [hero1, hero2, hero3, hero4, venueExterior, heroWedding];

/* ─── Constants ───────────────────────────────────────── */

const STEP_BACKGROUNDS = [
  "radial-gradient(ellipse at 30% 60%, rgba(201,169,110,0.20) 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, rgba(201,169,110,0.08) 0%, transparent 40%), linear-gradient(160deg, #0d0b08 0%, #1a1612 45%, #231e17 70%, #1a1612 100%)",
  "radial-gradient(ellipse at 50% 100%, rgba(100,120,200,0.25) 0%, transparent 55%), linear-gradient(180deg, #060810 0%, #0d1228 55%, #080e1e 100%)",
  "radial-gradient(circle at 60% 40%, rgba(201,169,110,0.12) 0%, transparent 50%), linear-gradient(135deg, #0e0c09 0%, #1c1812 60%, #130f09 100%)",
  "radial-gradient(ellipse at 50% 0%, rgba(80,120,60,0.30) 0%, transparent 55%), linear-gradient(180deg, #080e06 0%, #101806 50%, #080e06 100%)",
  "radial-gradient(ellipse at 40% 55%, rgba(120,20,30,0.35) 0%, transparent 50%), linear-gradient(160deg, #0c0606 0%, #1a0808 55%, #0e0606 100%)",
  "radial-gradient(ellipse at 55% 35%, rgba(201,169,110,0.18) 0%, transparent 45%), linear-gradient(150deg, #0c0b08 0%, #1a1710 60%, #110e08 100%)",
  "radial-gradient(circle at 50% 50%, rgba(40,60,100,0.35) 0%, transparent 55%), linear-gradient(160deg, #060608 0%, #0c0e18 60%, #060810 100%)",
  "radial-gradient(circle at 30% 50%, rgba(100,20,120,0.40) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(20,60,140,0.25) 0%, transparent 45%), linear-gradient(135deg, #08040e 0%, #100616 100%)",
  "radial-gradient(ellipse at 50% 65%, rgba(150,130,100,0.18) 0%, transparent 55%), linear-gradient(150deg, #0e0c09 0%, #1c1812 60%, #0e0c09 100%)",
  "radial-gradient(circle at 35% 35%, rgba(201,169,110,0.15) 0%, transparent 45%), linear-gradient(160deg, #0a0908 0%, #161410 100%)",
  "radial-gradient(ellipse at 40% 40%, rgba(40,80,160,0.25) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(201,169,110,0.12) 0%, transparent 45%), linear-gradient(150deg, #08080e 0%, #100c18 60%, #0a0a0e 100%)",
  "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.25) 0%, transparent 60%), linear-gradient(160deg, #0d0b08 0%, #1a1612 50%, #231e17 100%)",
];

const TOTAL_STEPS = 12;

const STEP_LABELS = [
  "Accueil", "Date", "Invités", "Cérémonie",
  "Vin d'honneur", "Repas", "Photographe",
  "DJ", "Déco", "Options", "Site mariage", "Récap",
];

const availableDates: Record<string, string> = {
  "2027-10-04": "Lun 4 Oct",
  "2027-10-05": "Mar 5 Oct",
  "2027-10-06": "Mer 6 Oct",
  "2027-10-07": "Jeu 7 Oct",
  "2027-10-08": "Ven 8 Oct",
};

const photoLabels: Record<string, string> = {
  none: "", reportage: "Reportage", premium: "Premium Duo",
};
const djLabels: Record<string, string> = {
  none: "", standard: "Standard", premium: "Premium",
};

/* ─── Haptic helper ───────────────────────────────────── */
const haptic = (type: "light" | "medium" = "light") => {
  if ("vibrate" in navigator) {
    navigator.vibrate(type === "light" ? 10 : 25);
  }
};

/* ─── Custom Cursor ───────────────────────────────────── */
const CustomCursor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    setVisible(true);
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };

    const enter = () => el.classList.add("hovering");
    const leave = () => el.classList.remove("hovering");

    document.addEventListener("mousemove", move);

    const observe = () => {
      document.querySelectorAll("button, a, input, textarea, [role='button'], [data-cursor-hover]")
        .forEach((node) => {
          node.addEventListener("mouseenter", enter);
          node.addEventListener("mouseleave", leave);
        });
    };

    observe();
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;
  return <div ref={ref} className="custom-cursor" />;
};

/* ─── Mini-recap line ─────────────────────────────────── */
const RecapLine = ({ label, value }: { label: string; value: string }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    transition={{ duration: 0.4 }}
    className="flex justify-between gap-6"
  >
    <span style={{ color: "rgba(232,221,208,0.5)" }}>{label}</span>
    <span className="text-right">{value}</span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════ */
const ConfigurateurShell = () => {
  const [state, setState] = useState<ConfigurateurState>(defaultState);
  const [displayStep, setDisplayStep] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");
  const [overlayActive, setOverlayActive] = useState(false);
  const isTransitioning = useRef(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const breakdown = useMemo(() => calculateBreakdown(state), [state]);

  // Preload all images
  useEffect(() => {
    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    setIsMobile(window.innerWidth < 640);
  }, []);

  // Hero slideshow (step 0 only, desktop only)
  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const updateState = useCallback(
    (partial: Partial<ConfigurateurState>) =>
      setState((prev) => ({ ...prev, ...partial })),
    []
  );

  /* ── Step navigation with cinematic transition ─────── */
  const goToStepAnimated = useCallback(
    (newStep: number) => {
      if (isTransitioning.current || newStep === displayStep) return;
      if (newStep < 0 || newStep >= TOTAL_STEPS) return;
      isTransitioning.current = true;
      haptic("medium");

      const dir = newStep > displayStep ? "forward" : "backward";
      setTransitionClass(`step-exit-${dir}`);

      // Update actual state step immediately for background crossfade
      setState((prev) => ({ ...prev, currentStep: newStep }));

      setTimeout(() => {
        setOverlayActive(true);
        setTimeout(() => {
          setDisplayStep(newStep);
          setTransitionClass(`step-enter-${dir}`);
          setOverlayActive(false);
          window.scrollTo({ top: 0 });

          setTimeout(() => {
            setTransitionClass("");
            isTransitioning.current = false;
          }, 600);
        }, 120);
      }, 350);
    },
    [displayStep]
  );

  const nextStep = useCallback(
    () => goToStepAnimated(displayStep + 1),
    [displayStep, goToStepAnimated]
  );
  const prevStep = useCallback(
    () => goToStepAnimated(displayStep - 1),
    [displayStep, goToStepAnimated]
  );

  /* ── Browser back/forward ──────────────────────────── */
  useEffect(() => {
    const url = `/configurateur${displayStep > 0 ? `?step=${displayStep}` : ""}`;
    window.history.pushState({ step: displayStep }, "", url);
  }, [displayStep]);

  useEffect(() => {
    const handler = (e: PopStateEvent) => {
      const step = e.state?.step;
      if (typeof step === "number") {
        goToStepAnimated(step);
      } else if (displayStep > 0) {
        goToStepAnimated(displayStep - 1);
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [displayStep, goToStepAnimated]);

  /* ── Render step content ───────────────────────────── */
  const renderStep = () => {
    const props = { state, onUpdate: updateState, onNext: nextStep, onPrev: prevStep };
    switch (displayStep) {
      case 0: return <Step00_Domaine onNext={nextStep} />;
      case 1: return <Step01_Date {...props} />;
      case 2: return <Step02_Invites {...props} />;
      case 3: return <Step03_Ceremonie {...props} />;
      case 4: return <Step04_VinDhonneur {...props} />;
      case 5: return <Step05_Repas {...props} />;
      case 6: return <Step06_Photographe {...props} />;
      case 7: return <Step07_DJ {...props} />;
      case 8: return <Step08_Deco {...props} />;
      case 9: return <Step09_Options {...props} />;
      case 10: return <Step10_SiteMariage {...props} />;
      case 11: return <Step11_Recap {...props} />;
      default: return null;
    }
  };

  /* ── Mini-recap contextual lines ────────────────────── */
  const miniRecapLines = useMemo(() => {
    const lines: { label: string; value: string }[] = [];
    lines.push({
      label: "Date",
      value: state.date ? availableDates[state.date] || state.date : "—",
    });
    lines.push({ label: "Invités", value: String(state.guests) });

    if (state.currentStep >= 3 && state.ceremonieLaique) {
      lines.push({ label: "Cérémonie", value: "Laïque" });
    }
    if (state.currentStep >= 4) {
      const vhCount = [state.vhBouchee, state.vhAnimation, state.vhMignardise].filter(Boolean).length;
      if (vhCount > 0) lines.push({ label: "VH", value: `${vhCount}/3` });
    }
    if (state.currentStep === 5) {
      const count = [state.repasEntree, state.repasPlat, state.repasDessert].filter(Boolean).length;
      lines.push({ label: "Menu", value: count === 3 ? "Complet" : `${count}/3 plats` });
    }
    if (state.currentStep >= 6 && state.photographe !== "none") {
      lines.push({ label: "Photo", value: photoLabels[state.photographe] || "" });
    }
    if (state.currentStep >= 7 && state.dj !== "none") {
      lines.push({ label: "DJ", value: djLabels[state.dj] || "" });
    }
    if (state.currentStep >= 9 && (state.options?.length ?? 0) > 0) {
      lines.push({ label: "Options", value: `${state.options.length}` });
    }
    return lines;
  }, [state]);

  const { currentStep } = state;

  return (
    <div className="relative w-full configurateur-root configurateur-grain configurateur-scroll-hide" style={{ minHeight: "100vh" }}>
      {/* Custom cursor — desktop */}
      <CustomCursor />

      {/* Transition overlay */}
      <div className={`transition-overlay ${overlayActive ? "active" : ""}`} />

      {/* Background layers — crossfade */}
      {STEP_BACKGROUNDS.map((bg, i) => (
        <div
          key={`bg-${i}`}
          className="fixed inset-0 transition-opacity duration-[1200ms]"
          style={{
            background: bg,
            opacity: currentStep === i ? 1 : 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Step 0 — Hero photo slideshow */}
      {currentStep === 0 && (
        <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
          {isMobile ? (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${hero2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.35,
              }}
            />
          ) : (
            heroImages.map((img, i) => (
              <div
                key={`hero-${i}`}
                className="absolute inset-0 transition-opacity duration-[1500ms]"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: heroIndex === i ? 0.40 : 0,
                }}
              />
            ))
          )}
          {/* Dark overlay for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(13,11,8,0.50) 0%, rgba(13,11,8,0.70) 50%, rgba(13,11,8,0.85) 100%)",
            }}
          />
        </div>
      )}

      {/* Step 1 — Domaine photo + overlay + gradient */}
      {currentStep === 1 && (
        <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
          {/* Couche 1 — photo */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${hero2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
          {/* Couche 2 — overlay sombre */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(13,11,8,0.60) 0%, rgba(13,11,8,0.80) 100%)",
              zIndex: 1,
            }}
          />
          {/* Couche 3 — gradient bleu-nuit atténué */}
          <div
            className="absolute inset-0"
            style={{
              background: STEP_BACKGROUNDS[1],
              opacity: 0.55,
              zIndex: 2,
            }}
          />
        </div>
      )}

      {/* Step 11 — Wedding hero ambient */}
      {currentStep === 11 && (
        <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroWedding})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.10,
            }}
          />
        </div>
      )}

      {/* Step content with cinematic transitions */}
      <div className={`relative z-10 ${transitionClass}`}>
        {renderStep()}
      </div>

      {/* ─── Mini-récap flottant (desktop, hidden on step 11) ─── */}
      <AnimatePresence>
        {currentStep >= 1 && currentStep < 11 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-6 right-6 z-50 hidden lg:block mini-recap-glass cfg-no-select"
            style={{
              background: "rgba(26,22,18,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(201,169,110,0.25)",
              padding: "20px 24px",
              minWidth: "200px",
              borderRadius: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.6)",
                marginBottom: "12px",
              }}
            >
              Votre mariage
            </div>
            <div className="space-y-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#e8ddd0" }}>
              {miniRecapLines.map((l) => (
                <RecapLine key={l.label} label={l.label} value={l.value} />
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(201,169,110,0.15)",
                marginTop: "14px",
                paddingTop: "14px",
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                color: "#c9a96e",
                fontWeight: 500,
              }}
            >
              {breakdown.totalEstimate > 0
                ? `${breakdown.totalEstimate.toLocaleString("fr-FR")} €`
                : "—"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Progress bar + navigation dots ─────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 cfg-no-select"
        style={{
          background: "linear-gradient(transparent, rgba(13,11,8,0.95))",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "16px 24px 20px",
        }}
      >
        {/* Progress line */}
        <div
          className="mx-auto"
          style={{
            maxWidth: 800,
            height: 1,
            background: "rgba(201,169,110,0.12)",
            marginBottom: 14,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 1,
              width: `${(currentStep / (TOTAL_STEPS - 1)) * 100}%`,
              background: "linear-gradient(90deg, rgba(201,169,110,0.30), rgba(201,169,110,0.80))",
              transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center mx-auto" style={{ maxWidth: 800 }}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const isActive = currentStep === i;
            const isCompleted = i < currentStep;
            const isFuture = i > currentStep;
            return (
              <div key={i} className="flex items-center">
                {i > 0 && (
                  <div
                    className="hidden sm:block"
                    style={{
                      width: 20,
                      height: 1,
                      background: isCompleted
                        ? "rgba(201,169,110,0.45)"
                        : "rgba(201,169,110,0.12)",
                      transition: "background 0.5s ease",
                    }}
                  />
                )}
                {i > 0 && (
                  <div
                    className="sm:hidden"
                    style={{
                      width: 8,
                      height: 1,
                      background: isCompleted
                        ? "rgba(201,169,110,0.45)"
                        : "rgba(201,169,110,0.12)",
                    }}
                  />
                )}
                <button
                  onClick={() => goToStepAnimated(i)}
                  aria-label={`Étape ${i} — ${STEP_LABELS[i]}`}
                  className="flex items-center gap-2 transition-all duration-300"
                  style={{
                    background: "none",
                    border: "none",
                    padding: "4px",
                  }}
                  data-cursor-hover
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? 8 : isCompleted ? 6 : 4,
                      height: isActive ? 8 : isCompleted ? 6 : 4,
                      background: isActive
                        ? "#c9a96e"
                        : isCompleted
                        ? "rgba(201,169,110,0.50)"
                        : "rgba(232,221,208,0.15)",
                    }}
                  />
                  {isActive && (
                    <span
                      className="hidden lg:inline-block"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 300,
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(201,169,110,0.90)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {STEP_LABELS[i]}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConfigurateurShell;
