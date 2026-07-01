import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ConfigurateurState } from "../pricingTypes";
import InfoButton from "../InfoButton";
import PresentationDrawer from "../PresentationDrawer";
import { drawerDomaine } from "../drawerContents";
import { supabase } from "@/integrations/supabase/client";

interface Step01Props {
  state: ConfigurateurState;
  onUpdate: (partial: Partial<ConfigurateurState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
  }),
};

const series = [
  {
    id: "octobre-2027",
    label: "Série Octobre 2027",
    dates: [
      { date: "2027-10-04", jour: "Lundi", libelle: "4 Octobre 2027" },
      { date: "2027-10-05", jour: "Mardi", libelle: "5 Octobre 2027" },
      { date: "2027-10-06", jour: "Mercredi", libelle: "6 Octobre 2027" },
      { date: "2027-10-07", jour: "Jeudi", libelle: "7 Octobre 2027" },
      { date: "2027-10-08", jour: "Vendredi", libelle: "8 Octobre 2027" },
    ],
  },
  {
    id: "mai-2027",
    label: "Série Mai 2027",
    dates: [
      { date: "2027-05-04", jour: "Mardi", libelle: "4 Mai 2027" },
      { date: "2027-05-05", jour: "Mercredi", libelle: "5 Mai 2027" },
      { date: "2027-05-06", jour: "Jeudi", libelle: "6 Mai 2027" },
    ],
  },
];

const Step01_Date = ({ state, onUpdate, onNext }: Step01Props) => {
  const selected = state.date;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reservedDates, setReservedDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchReserved = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const client = supabase as any;
      const { data } = await client
        .from("configurateur_leads")
        .select("date_mariage, status")
        .in("status", ["signed", "paid"]);
      if (data) {
        setReservedDates(new Set(data.map((r: { date_mariage: string }) => r.date_mariage)));
      }
    };
    fetchReserved();
  }, []);

  const handleSelect = (dateId: string, serieId: string, serieLabel: string) => {
    if (reservedDates.has(dateId)) return;
    onUpdate({ date: dateId, serieId, serieLabel });
  };

  const handleContinue = () => {
    if (selected) onNext();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="flex flex-col items-center w-full" style={{ maxWidth: 680 }}>
        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)" }}>
          Étape 1 · Le jour
        </motion.p>

        <motion.h2 custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center mt-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(38px, 5vw, 52px)", color: "#faf8f4", lineHeight: 1.15, marginBottom: 12 }}>
          Quel jour<br />vous appartient ?
        </motion.h2>

        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(232,221,208,0.65)", lineHeight: 1.7, maxWidth: 480 }}>
          Deux séries sont disponibles au Domaine de la Croix Rochefort — mêmes prestataires, mêmes tarifs.
        </motion.p>

        <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp}>
          <InfoButton label="En savoir plus sur le domaine" onClick={() => setDrawerOpen(true)} />
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          style={{ width: 60, height: 1, background: "#c9a96e", margin: "36px auto" }} />

        <div className="flex flex-col w-full" style={{ maxWidth: 480, gap: 40 }}>
          {series.map((serie, sIdx) => (
            <div key={serie.id} className="flex flex-col items-center w-full">
              <motion.div
                custom={4 + sIdx * 6}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex items-center justify-center w-full"
                style={{ gap: 14, marginBottom: 20 }}
              >
                <div style={{ flex: 1, height: 0.5, background: "rgba(201,169,110,0.35)" }} />
                <span style={{
                  fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11,
                  letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a96e",
                }}>
                  {serie.label}
                </span>
                <div style={{ flex: 1, height: 0.5, background: "rgba(201,169,110,0.35)" }} />
              </motion.div>

              <div className="flex flex-col items-center gap-[10px] w-full">
                {serie.dates.map((d, i) => {
                  const isSelected = selected === d.date;
                  const isReserved = reservedDates.has(d.date);
                  return (
                    <motion.button
                      key={d.date}
                      custom={5 + sIdx * 6 + i}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      onClick={() => handleSelect(d.date, serie.id, serie.label)}
                      disabled={isReserved}
                      className="w-full flex items-center justify-between transition-all duration-[250ms]"
                      style={{
                        height: 72,
                        padding: "0 28px",
                        borderRadius: 2,
                        border: isSelected ? "1px solid #c9a96e" : "1px solid rgba(201,169,110,0.20)",
                        background: isSelected ? "rgba(201,169,110,0.08)" : "rgba(26,22,18,0.40)",
                        cursor: isReserved ? "not-allowed" : "pointer",
                        opacity: isReserved ? 0.50 : 1,
                      }}
                      whileHover={!isSelected && !isReserved ? { borderColor: "rgba(201,169,110,0.45)", background: "rgba(201,169,110,0.04)" } : {}}
                    >
                      <div className="flex flex-col items-start">
                        <span style={{
                          fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 15,
                          color: isReserved ? "rgba(232,221,208,0.40)" : isSelected ? "#c9a96e" : "#faf8f4",
                          transition: "color 0.25s ease",
                        }}>
                          {d.jour}
                        </span>
                        <span style={{
                          fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 13,
                          color: "rgba(232,221,208,0.55)",
                        }}>
                          {d.libelle}
                        </span>
                      </div>

                      {isReserved ? (
                        <span style={{
                          fontSize: 12, fontWeight: 600, fontFamily: "'Jost', sans-serif",
                          color: "rgba(200,80,80,0.80)", background: "rgba(200,80,80,0.08)",
                          border: "1px solid rgba(200,80,80,0.25)", padding: "4px 12px",
                          borderRadius: 2, letterSpacing: "0.10em",
                        }}>
                          Réservée
                        </span>
                      ) : isSelected ? (
                        <Check size={16} color="#c9a96e" />
                      ) : (
                        <span style={{
                          fontSize: 12, fontWeight: 400, fontFamily: "'Jost', sans-serif",
                          color: "rgba(80,180,100,0.85)", background: "rgba(80,180,100,0.08)",
                          border: "1px solid rgba(80,180,100,0.25)", padding: "4px 12px",
                          borderRadius: 2, letterSpacing: "0.10em",
                        }}>
                          Disponible
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <motion.p custom={20} initial="hidden" animate="visible" variants={fadeUp}
          className="text-center"
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: "rgba(232,221,208,0.40)", letterSpacing: "0.1em", marginTop: 28 }}>
          Toutes les dates sont au même tarif — seul votre ressenti compte.
        </motion.p>

        <motion.button
          custom={21}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          onClick={handleContinue}
          disabled={!selected}
          className="mt-12 transition-colors duration-300"
          style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13,
            letterSpacing: "0.25em", textTransform: "uppercase",
            border: "1px solid #c9a96e", background: "transparent",
            color: "#c9a96e", padding: "18px 56px", borderRadius: 0,
            cursor: selected ? "pointer" : "not-allowed",
            opacity: selected ? 1 : 0.35,
          }}
          whileHover={selected ? { backgroundColor: "#c9a96e", color: "#1a1612" } : {}}
        >
          Date choisie — Continuer
        </motion.button>
      </div>

      <PresentationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} content={drawerDomaine} />
    </div>
  );
};

export default Step01_Date;
