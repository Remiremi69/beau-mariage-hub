import { forwardRef, useImperativeHandle, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ConfigurateurState } from "./pricingTypes";
import { buildTimeline } from "@/lib/build-timeline";

export type PdfEsquisseHandle = {
  generatePdf: () => Promise<void>;
  generatePdfBlob: () => Promise<{ blob: Blob; fileName: string } | null>;
};


interface PdfEsquisseProps {
  state: ConfigurateurState;
}

const COLORS = {
  fond: "#F8F4EB",
  encreText: "#1A1814",
  encreSecondaire: "#3D3530",
  or: "#A8956B",
  orClair: "#C8A96E",
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "DATE À CONFIRMER";
  try {
    const d = new Date(dateStr);
    return d
      .toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toUpperCase();
  } catch {
    return dateStr.toUpperCase();
  }
};

export const PdfEsquisse = forwardRef<PdfEsquisseHandle, PdfEsquisseProps>(
  ({ state }, ref) => {
    const pdfRef = useRef<HTMLDivElement>(null);
    const moments = buildTimeline(state);

    const tightSpacing = moments.length > 13;

    const menuNames: Record<string, string> = {
      "entree-1": "Velouté de courge rôtie",
      "entree-2": "Tartare de saumon fumé",
      "entree-3": "Terrine de foie gras maison",
      "plat-1": "Filet de bœuf Rossini",
      "plat-2": "Suprême de volaille fermière",
      "plat-3": "Pavé de cabillaud sauvage",
      "dessert-1": "Pièce montée choux revisitée",
      "dessert-2": "Entremets Beaujolais",
      "dessert-3": "Vacherin glacé aux fruits rouges",
    };
    const repasLabels: Record<string, string> = {
      menu1: "Menu 1 — Tradition Beaujolais",
      menu2: "Menu 2 — Signature Limen",
      essentiel: "Essentiel",
      gastronomique: "Gastronomique",
      prestige: "Prestige",
    };
    const formuleLabel = state.repas ? (repasLabels[state.repas] || state.repas) : null;
    const courses = [
      { label: "Entrée", id: state.repasEntree },
      { label: "Plat", id: state.repasPlat },
      { label: "Dessert", id: state.repasDessert },
    ].filter((c) => c.id && menuNames[c.id as string]);



    const buildFileName = () => {
      const date = state.date || new Date().toISOString().split("T")[0];
      return `Esquisse-Limen-${date}.pdf`;
    };

    useImperativeHandle(ref, () => ({
      generatePdf: async () => {
        if (!pdfRef.current) return;
        const canvas = await html2canvas(pdfRef.current, {
          scale: 2,
          backgroundColor: COLORS.fond,
          useCORS: true,
          logging: false,
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight <= 297) {
          pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        } else {
          let heightLeft = imgHeight;
          let position = 0;
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= 297;
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= 297;
          }
        }
        pdf.save(buildFileName());
      },
    }));

    // A4 portrait at 96dpi-ish: 794 x 1123 px (we use mm internally via px proxy)
    // Use mm-equivalent in px: 1mm ≈ 3.78px. We render at width = 210mm * 3.78 = ~794px
    const MM = 3.7795275591;
    const pageWidthPx = 210 * MM;

    const cormorant = "'Cormorant Garamond', 'Times New Roman', serif";
    const jost = "'Jost', 'Helvetica Neue', sans-serif";

    return (
      <div
        style={{
          position: "fixed",
          left: -99999,
          top: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden
      >
        <div
          ref={pdfRef}
          style={{
            width: pageWidthPx,
            minHeight: 297 * MM,
            background: COLORS.fond,
            padding: `${28 * MM}px ${22 * MM}px`,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: COLORS.encreText,
            fontFamily: jost,
          }}
        >
          {/* Ornement haut */}
          <div style={{ fontSize: 18, color: COLORS.or, marginBottom: 12 * MM, lineHeight: 1 }}>
            ❀
          </div>

          {/* Eyebrow avec traits */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 * MM }}>
            <div style={{ width: 30 * MM, height: 0.5, background: COLORS.or }} />
            <div
              style={{
                fontFamily: jost,
                fontSize: 9,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: COLORS.or,
                fontWeight: 400,
              }}
            >
              Esquisse de votre jour
            </div>
            <div style={{ width: 30 * MM, height: 0.5, background: COLORS.or }} />
          </div>

          {/* Titre principal */}
          <div
            style={{
              fontFamily: cormorant,
              fontStyle: "italic",
              fontSize: 42,
              color: COLORS.encreText,
              textAlign: "center",
              lineHeight: 1.15,
              marginTop: 20 * MM,
              fontWeight: 400,
            }}
          >
            Le déroulé
            <br />
            de votre journée.
          </div>

          {/* Séparateur ornemental */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6 * MM,
              marginTop: 24 * MM,
            }}
          >
            <div style={{ width: 40 * MM, height: 0.5, background: COLORS.or }} />
            <div style={{ fontSize: 14, color: COLORS.or, lineHeight: 1 }}>❀</div>
            <div style={{ width: 40 * MM, height: 0.5, background: COLORS.or }} />
          </div>

          {/* Bloc identification */}
          <div style={{ textAlign: "center", marginTop: 16 * MM }}>
            {state.contact.prenom && (
              <div
                style={{
                  fontFamily: cormorant,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: COLORS.encreText,
                  marginBottom: 8 * MM,
                }}
              >
                {state.contact.prenom}
              </div>
            )}
            <div
              style={{
                fontFamily: jost,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.encreSecondaire,
                marginBottom: 6 * MM,
              }}
            >
              {state.serieLabel ? `${state.serieLabel.toUpperCase()} · ` : ""}{formatDate(state.date)}
            </div>
            <div
              style={{
                fontFamily: cormorant,
                fontStyle: "italic",
                fontSize: 14,
                color: COLORS.encreSecondaire,
              }}
            >
              Domaine de la Croix Rochefort
            </div>
          </div>

          {/* Filet */}
          <div
            style={{
              width: 80 * MM,
              height: 0.5,
              background: COLORS.or,
              marginTop: 28 * MM,
              marginBottom: 24 * MM,
            }}
          />

          {/* Moments */}
          <div style={{ width: "100%", maxWidth: 150 * MM }}>
            {moments.map((m, i) => (
              <div
                key={`${m.horaire}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginBottom: (i === moments.length - 1 ? 0 : tightSpacing ? 7 : 9) * MM,
                }}
              >
                <div
                  style={{
                    fontFamily: jost,
                    fontSize: 11,
                    color: COLORS.or,
                    letterSpacing: "0.05em",
                    width: 18 * MM,
                    flexShrink: 0,
                  }}
                >
                  {m.horaire}
                </div>
                <div style={{ marginLeft: 8 * MM, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: cormorant,
                      fontStyle: "italic",
                      fontSize: 16,
                      color: COLORS.encreText,
                      marginBottom: 2 * MM,
                      lineHeight: 1.2,
                    }}
                  >
                    {m.titre}
                  </div>
                  <div
                    style={{
                      fontFamily: jost,
                      fontSize: 10,
                      color: COLORS.encreSecondaire,
                      lineHeight: 1.6,
                      maxWidth: 100 * MM,
                    }}
                  >
                    {m.copy}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Repas & menu */}
          {(formuleLabel || courses.length > 0) && (
            <div style={{ width: "100%", maxWidth: 150 * MM, marginTop: 22 * MM }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6 * MM,
                  marginBottom: 10 * MM,
                }}
              >
                <div style={{ width: 30 * MM, height: 0.5, background: COLORS.or }} />
                <div
                  style={{
                    fontFamily: jost,
                    fontSize: 9,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: COLORS.or,
                  }}
                >
                  Repas & menu
                </div>
                <div style={{ width: 30 * MM, height: 0.5, background: COLORS.or }} />
              </div>

              {formuleLabel && (
                <div
                  style={{
                    fontFamily: cormorant,
                    fontStyle: "italic",
                    fontSize: 18,
                    color: COLORS.encreText,
                    textAlign: "center",
                    marginBottom: 8 * MM,
                  }}
                >
                  {formuleLabel}
                </div>
              )}

              {courses.map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    marginBottom: 4 * MM,
                  }}
                >
                  <div
                    style={{
                      fontFamily: jost,
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: COLORS.or,
                      width: 22 * MM,
                      flexShrink: 0,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: cormorant,
                      fontStyle: "italic",
                      fontSize: 13,
                      color: COLORS.encreText,
                      flex: 1,
                    }}
                  >
                    {menuNames[c.id as string]}
                  </div>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: 8 * MM,
                  paddingTop: 6 * MM,
                  borderTop: `0.5px solid ${COLORS.or}`,
                }}
              >
                <div
                  style={{
                    fontFamily: jost,
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: COLORS.or,
                    width: 22 * MM,
                    flexShrink: 0,
                  }}
                >
                  Vins
                </div>
                <div
                  style={{
                    fontFamily: jost,
                    fontSize: 10,
                    fontStyle: "italic",
                    color: COLORS.encreSecondaire,
                    flex: 1,
                    lineHeight: 1.5,
                  }}
                >
                  Non inclus — sélection effectuée lors de la dégustation
                </div>
              </div>
            </div>
          )}



          {/* Filet fin */}
          <div
            style={{
              width: 80 * MM,
              height: 0.5,
              background: COLORS.or,
              marginTop: 24 * MM,
            }}
          />

          {/* Ornement bas */}
          <div style={{ fontSize: 14, color: COLORS.or, marginTop: 14 * MM, lineHeight: 1 }}>❀</div>

          {/* Mention */}
          <div
            style={{
              fontFamily: jost,
              fontStyle: "italic",
              fontSize: 9,
              color: COLORS.encreSecondaire,
              marginTop: 10 * MM,
            }}
          >
            Esquisse non contractuelle
          </div>

          {/* Signature */}
          <div
            style={{
              fontFamily: jost,
              fontSize: 8,
              letterSpacing: "0.4em",
              color: COLORS.or,
              marginTop: 4 * MM,
            }}
          >
            LIMEN · LE BEAU MARIAGE
          </div>

          {/* URL */}
          <div
            style={{
              fontFamily: jost,
              fontSize: 7,
              color: COLORS.encreSecondaire,
              marginTop: 8 * MM,
            }}
          >
            lebeaumariage.fr
          </div>
        </div>
      </div>
    );
  }
);

PdfEsquisse.displayName = "PdfEsquisse";
