import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigurateurState, defaultState } from "./pricingTypes";
import Step00_Domaine from "./steps/Step00_Domaine";
import Step01_Date from "./steps/Step01_Date";
import Step02_Invites from "./steps/Step02_Invites";
import Step03_Ceremonie from "./steps/Step03_Ceremonie";
import Step04_VinDhonneur from "./steps/Step04_VinDhonneur";
import Step05_Repas from "./steps/Step05_Repas";
import Step06_Photographe from "./steps/Step06_Photographe";
import Step07_DJ from "./steps/Step07_DJ";

const STEP_BACKGROUNDS = [
  // Step 0 — Domaine
  "radial-gradient(ellipse at 30% 60%, rgba(201,169,110,0.20) 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, rgba(201,169,110,0.08) 0%, transparent 40%), linear-gradient(160deg, #0d0b08 0%, #1a1612 45%, #231e17 70%, #1a1612 100%)",
  // Step 1 — Date
  "radial-gradient(ellipse at 50% 100%, rgba(100,120,200,0.25) 0%, transparent 55%), linear-gradient(180deg, #060810 0%, #0d1228 55%, #080e1e 100%)",
  // Step 2 — Invités
  "radial-gradient(circle at 60% 40%, rgba(201,169,110,0.12) 0%, transparent 50%), linear-gradient(135deg, #0e0c09 0%, #1c1812 60%, #130f09 100%)",
  // Step 3 — Cérémonie
  "radial-gradient(ellipse at 50% 0%, rgba(80,120,60,0.30) 0%, transparent 55%), linear-gradient(180deg, #080e06 0%, #101806 50%, #080e06 100%)",
  // Step 4 — Vin d'honneur
  "radial-gradient(ellipse at 40% 55%, rgba(120,20,30,0.35) 0%, transparent 50%), linear-gradient(160deg, #0c0606 0%, #1a0808 55%, #0e0606 100%)",
  // Step 5 — Repas
  "radial-gradient(ellipse at 55% 35%, rgba(201,169,110,0.18) 0%, transparent 45%), linear-gradient(150deg, #0c0b08 0%, #1a1710 60%, #110e08 100%)",
  // Step 6 — Photographe
  "radial-gradient(circle at 50% 50%, rgba(40,60,100,0.35) 0%, transparent 55%), linear-gradient(160deg, #060608 0%, #0c0e18 60%, #060810 100%)",
  // Step 7 — DJ
  "radial-gradient(circle at 30% 50%, rgba(100,20,120,0.40) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(20,60,140,0.25) 0%, transparent 45%), linear-gradient(135deg, #08040e 0%, #100616 100%)",
  // Step 8 — Déco
  "radial-gradient(ellipse at 50% 65%, rgba(150,130,100,0.18) 0%, transparent 55%), linear-gradient(150deg, #0e0c09 0%, #1c1812 60%, #0e0c09 100%)",
  // Step 9 — Options
  "radial-gradient(circle at 35% 35%, rgba(201,169,110,0.15) 0%, transparent 45%), linear-gradient(160deg, #0a0908 0%, #161410 100%)",
  // Step 10 — Récap
  "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.25) 0%, transparent 60%), linear-gradient(160deg, #0d0b08 0%, #1a1612 50%, #231e17 100%)",
];

const TOTAL_STEPS = 11;

const availableDates: Record<string, string> = {
  "2027-10-04": "Lun 4 Oct",
  "2027-10-05": "Mar 5 Oct",
  "2027-10-06": "Mer 6 Oct",
  "2027-10-07": "Jeu 7 Oct",
  "2027-10-08": "Ven 8 Oct",
};

const ConfigurateurShell = () => {
  const [state, setState] = useState<ConfigurateurState>(defaultState);

  const updateState = useCallback(
    (partial: Partial<ConfigurateurState>) =>
      setState((prev) => ({ ...prev, ...partial })),
    []
  );

  const nextStep = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        currentStep: Math.min(prev.currentStep + 1, TOTAL_STEPS - 1),
      })),
    []
  );

  const prevStep = useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep - 1, 0),
      })),
    []
  );

  const goToStep = useCallback(
    (step: number) =>
      setState((prev) => ({ ...prev, currentStep: step })),
    []
  );

  const { currentStep } = state;

  return (
    <div className="relative w-full" style={{ minHeight: "100vh" }}>
      {/* Background layers */}
      {STEP_BACKGROUNDS.map((bg, i) => (
        <div
          key={i}
          className="fixed inset-0 transition-opacity duration-[1200ms]"
          style={{
            background: bg,
            opacity: currentStep === i ? 1 : 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Step content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentStep === 0 && <Step00_Domaine onNext={nextStep} />}

            {currentStep === 1 && (
              <Step01_Date state={state} onUpdate={updateState} onNext={nextStep} onPrev={prevStep} />
            )}

            {currentStep === 2 && (
              <Step02_Invites state={state} onUpdate={updateState} onNext={nextStep} onPrev={prevStep} />
            )}

            {currentStep === 3 && (
              <Step03_Ceremonie state={state} onUpdate={updateState} onNext={nextStep} onPrev={prevStep} />
            )}

            {currentStep === 4 && (
              <Step04_VinDhonneur state={state} onUpdate={updateState} onNext={nextStep} onPrev={prevStep} />
            )}

            {currentStep === 5 && (
              <Step05_Repas state={state} onUpdate={updateState} onNext={nextStep} onPrev={prevStep} />
            )}

            {currentStep === 6 && (
              <Step06_Photographe state={state} onUpdate={updateState} onNext={nextStep} onPrev={prevStep} />
            )}

            {currentStep === 7 && (
              <Step07_DJ state={state} onUpdate={updateState} onNext={nextStep} onPrev={prevStep} />
            )}

            {currentStep >= 8 && currentStep <= 10 && (
              <div className="flex items-center justify-center min-h-screen px-6">
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 18, color: "rgba(232,221,208,0.5)" }}>
                  Étape {currentStep} — à venir
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mini-récap flottant desktop (step >= 1) */}
      {currentStep >= 1 && (
        <div
          className="fixed top-6 right-6 z-50 hidden lg:block"
          style={{
            background: "rgba(26,22,18,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(201,169,110,0.25)",
            padding: "20px 24px",
            minWidth: "200px",
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
            <div className="flex justify-between gap-6">
              <span style={{ color: "rgba(232,221,208,0.5)" }}>Date</span>
              <span>{state.date ? availableDates[state.date] || state.date : "—"}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span style={{ color: "rgba(232,221,208,0.5)" }}>Invités</span>
              <span>{state.guests}</span>
            </div>
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
            {state.totalEstimate > 0 ? `${state.totalEstimate.toLocaleString("fr-FR")} €` : "—"}
          </div>
        </div>
      )}

      {/* Navigation dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <button
            key={i}
            onClick={() => goToStep(i)}
            aria-label={`Étape ${i}`}
            className="transition-all duration-300"
            style={{
              width: i === 0 ? "10px" : "7px",
              height: i === 0 ? "10px" : "7px",
              borderRadius: "50%",
              background: currentStep === i ? "#c9a96e" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfigurateurShell;
