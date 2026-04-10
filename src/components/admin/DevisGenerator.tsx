import { useState, useMemo } from "react";

type LeadRow = {
  id: string;
  created_at: string;
  prenom: string | null;
  nom: string | null;
  email: string;
  telephone: string | null;
  date_mariage: string | null;
  guests_estimate: number | null;
  total_estimate: number | null;
  status: string | null;
  localisation: string | null;
  coffret_demande: boolean | null;
  rdv_semaine: string | null;
  rdv_jour: string | null;
  rdv_creneau: string | null;
  ceremonie_laique: boolean | null;
  repas_formule: string | null;
  deco: string | null;
  photographe: string | null;
  dj: string | null;
  options: string[] | null;
};

type DevisGeneratorProps = {
  lead: LeadRow;
  isOpen: boolean;
  onClose: () => void;
  mode: "devis" | "facture";
};

const repasLabels: Record<string, string> = {
  essentiel: "Essentiel",
  gastronomique: "Gastronomique",
  prestige: "Prestige",
};
const decoLabels: Record<string, string> = {
  seve: "Sève",
  pierre: "Pierre & Lumière",
};
const photoLabels: Record<string, string> = {
  none: "",
  reportage: "Reportage",
  premium: "Premium Duo",
};
const djLabels: Record<string, string> = {
  none: "",
  standard: "Standard",
  premium: "Premium",
};
const OPTION_LABELS: Record<string, string> = {
  photobooth: "Photobooth Premium",
  cocktail_bar: "Bar à cocktails",
  feu_artifice: "Feu d'artifice",
  voiture_collection: "Voiture de collection",
  livre_or: "Livre d'or Limen",
  candy_bar: "Sweet Table",
  caricaturiste: "Caricaturiste",
  lanternes: "Lâcher de lanternes",
};

const BASE_FORFAIT = 8500;
const DECO_PRIX: Record<string, number> = { seve: 0, pierre: 0 };
const PHOTO_PRIX: Record<string, number> = { none: 0, reportage: 1800, premium: 3200 };
const DJ_PRIX: Record<string, number> = { none: 0, standard: 1200, premium: 2100 };
const OPTION_PRICES: Record<string, number> = {
  photobooth: 400, cocktail_bar: 600, feu_artifice: 1800,
  voiture_collection: 550, livre_or: 280, candy_bar: 350,
  caricaturiste: 480, lanternes: 220,
};

type LigneDevis = {
  label: string;
  detail: string;
  montant: number;
  inclus?: boolean;
  isRepas?: boolean;
  isEstimate?: boolean;
};

const DevisGenerator = ({ lead, isOpen, onClose, mode }: DevisGeneratorProps) => {
  const [guestsDefinitif, setGuestsDefinitif] = useState(lead.guests_estimate ?? 80);
  const [repasUnitaire, setRepasUnitaire] = useState(
    lead.repas_formule === "prestige" ? 130
    : lead.repas_formule === "gastronomique" ? 90
    : 65
  );
  const [numeroDevis, setNumeroDevis] = useState(
    `LIMEN-2027-${String(lead.id).slice(0, 4).toUpperCase()}`
  );
  const [dateEmission, setDateEmission] = useState(new Date().toLocaleDateString("fr-FR"));
  const [dateValidite, setDateValidite] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR")
  );
  const [notePersonnalisee, setNotePersonnalisee] = useState("");
  const [modeDoc, setModeDoc] = useState<"devis" | "facture">(mode);
  const [paramsOpen, setParamsOpen] = useState(true);

  const ceremoniePrix = lead.ceremonie_laique ? 800 : 0;
  const decoPrix = DECO_PRIX[lead.deco ?? ""] ?? 0;
  const photoPrix = PHOTO_PRIX[lead.photographe ?? ""] ?? 0;
  const djPrix = DJ_PRIX[lead.dj ?? ""] ?? 0;
  const optionsPrix = (lead.options ?? []).reduce((sum, id) => sum + (OPTION_PRICES[id] ?? 0), 0);
  const repasPrix = repasUnitaire * guestsDefinitif;

  const { lignes, sousTotal, acompte30, solde70 } = useMemo(() => {
    const fixedLines: LigneDevis[] = [
      { label: "Forfait Domaine de la Croix Rochefort", detail: "Salle, cuisine professionnelle, coordination, ménage", montant: BASE_FORFAIT },
      ...(ceremoniePrix > 0 ? [{ label: "Cérémonie laïque", detail: "Officiant professionnel + sonorisation", montant: ceremoniePrix }] : []),
      { label: "Vin d'honneur", detail: "Champagne, vins beaujolais, bouchées & mignardises", montant: 0, inclus: true },
      ...(decoPrix > 0
        ? [{ label: `Décoration — ${decoLabels[lead.deco ?? ""]}`, detail: "Installation & démontage inclus", montant: decoPrix }]
        : [{ label: "Décoration — Champêtre Authentique", detail: "Fleurs locales, bougies, lin brut", montant: 0, inclus: true }]),
      ...(photoPrix > 0 ? [{ label: `Photographe — ${photoLabels[lead.photographe ?? ""]}`, detail: "Galerie privée livrée sous 4 semaines", montant: photoPrix }] : []),
      ...(djPrix > 0 ? [{ label: `DJ — ${djLabels[lead.dj ?? ""]}`, detail: "Sono professionnelle + éclairage", montant: djPrix }] : []),
      ...(lead.options ?? []).map(id => ({ label: OPTION_LABELS[id] ?? id, detail: "", montant: OPTION_PRICES[id] ?? 0 })),
    ];

    const repasLine: LigneDevis = {
      label: `Repas — ${repasLabels[lead.repas_formule ?? ""] ?? lead.repas_formule ?? "—"}`,
      detail: `${repasUnitaire} € × ${guestsDefinitif} invités`,
      montant: repasPrix,
      isRepas: true,
      isEstimate: modeDoc === "devis",
    };

    const allLines = [...fixedLines, repasLine];
    const st = allLines.filter(l => !l.inclus).reduce((s, l) => s + l.montant, 0);
    return { lignes: allLines, sousTotal: st, acompte30: Math.ceil(st * 0.30), solde70: st - Math.ceil(st * 0.30) };
  }, [ceremoniePrix, decoPrix, photoPrix, djPrix, optionsPrix, repasPrix, repasUnitaire, guestsDefinitif, modeDoc, lead]);

  const dateFormatted = lead.date_mariage
    ? lead.date_mariage
    : "date à confirmer";

  const handlePrint = () => {
    const printContent = document.getElementById("devis-print-zone");
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${modeDoc === "devis" ? "Devis" : "Facture"} — ${lead.prenom} ${lead.nom} — LIMEN ${lead.date_mariage}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1e1e1e;background:white}@page{size:A4;margin:0}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>${printContent.innerHTML}</body></html>`);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
    } else {
      window.print();
    }
  };

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 4,
    fontSize: 13, fontFamily: "Arial, sans-serif", color: "#1e1e1e", background: "white",
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, color: "#6b7280", marginBottom: 4, display: "block", fontFamily: "Arial, sans-serif",
  };
  const sectionTitle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em",
    color: "#374151", marginBottom: 8, marginTop: 20, fontFamily: "Arial, sans-serif",
  };

  return (
    <>
      {/* Print-only CSS fallback */}
      <style>{`@media print{body>*:not(#devis-print-zone-wrapper){display:none!important}#devis-print-zone-wrapper{position:fixed;inset:0;z-index:99999;background:white}}`}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", background: "rgba(0,0,0,0.6)" }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position: "absolute", top: 12, right: 16, zIndex: 10000, background: "rgba(0,0,0,0.5)",
          color: "white", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>

        {/* Mobile: column, Desktop: row */}
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}
          className="flex-col sm:flex-row">

          {/* LEFT — Parameters */}
          <div style={{
            width: "320px", minWidth: 320, background: "white", borderRight: "1px solid #e5e7eb",
            overflowY: "auto", padding: 24, flexShrink: 0,
          }} className="!w-full sm:!w-[320px] sm:!min-w-[320px]">

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1e1e1e", fontFamily: "Arial, sans-serif" }}>
                Paramètres du document
              </h2>
              <button onClick={() => setParamsOpen(!paramsOpen)}
                className="sm:hidden"
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#6b7280" }}>
                {paramsOpen ? "▲" : "▼"}
              </button>
            </div>

            <div style={{ display: paramsOpen ? "block" : "none" }}>
              {/* Type */}
              <div style={sectionTitle}>Type de document</div>
              <div style={{ display: "flex", gap: 0, borderRadius: 4, overflow: "hidden", border: "1px solid #d1d5db" }}>
                {(["devis", "facture"] as const).map(t => (
                  <button key={t} onClick={() => setModeDoc(t)} style={{
                    flex: 1, padding: "8px 0", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                    textTransform: "uppercase", border: "none", cursor: "pointer",
                    background: modeDoc === t ? "#1e1e1e" : "white",
                    color: modeDoc === t ? "white" : "#374151",
                    transition: "all 0.2s",
                    fontFamily: "Arial, sans-serif",
                  }}>{t}</button>
                ))}
              </div>

              {/* Numérotation */}
              <div style={sectionTitle}>Numérotation</div>
              <label style={labelStyle}>Numéro du document</label>
              <input value={numeroDevis} onChange={e => setNumeroDevis(e.target.value)}
                placeholder="LIMEN-2027-XXXX" style={inputStyle} />

              {/* Dates */}
              <div style={sectionTitle}>Dates</div>
              <label style={labelStyle}>Date d'émission</label>
              <input value={dateEmission} onChange={e => setDateEmission(e.target.value)} style={inputStyle} />
              <div style={{ height: 8 }} />
              <label style={labelStyle}>{modeDoc === "devis" ? "Date de validité" : "Date d'échéance"}</label>
              <input value={dateValidite} onChange={e => setDateValidite(e.target.value)} style={inputStyle} />

              {/* Repas */}
              <div style={sectionTitle}>Repas — à ajuster</div>
              <div style={{
                background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 6, padding: 16,
              }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#92400e", marginBottom: 12, fontFamily: "Arial, sans-serif" }}>
                  ⚠️ Ligne repas — à ajuster
                </p>
                <label style={labelStyle}>Nombre d'invités définitif</label>
                <input type="number" value={guestsDefinitif} min={20} max={200}
                  onChange={e => setGuestsDefinitif(Number(e.target.value))} style={inputStyle} />
                <div style={{ height: 8 }} />
                <label style={labelStyle}>Prix par personne (€)</label>
                <input type="number" value={repasUnitaire} step={5}
                  onChange={e => setRepasUnitaire(Number(e.target.value))} style={inputStyle} />
                <p style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginTop: 10, fontFamily: "Arial, sans-serif" }}>
                  = {(repasUnitaire * guestsDefinitif).toLocaleString("fr-FR")} €
                </p>
              </div>

              {/* Note */}
              <div style={sectionTitle}>Note personnalisée</div>
              <textarea value={notePersonnalisee} onChange={e => setNotePersonnalisee(e.target.value)}
                rows={3} placeholder="Note optionnelle (conditions particulières, remerciements...)"
                style={{ ...inputStyle, minHeight: 72, resize: "vertical" }} />

              {/* Actions */}
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                <button onClick={handlePrint} style={{
                  width: "100%", padding: "12px 0", background: "#1e1e1e", color: "white",
                  border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  fontFamily: "Arial, sans-serif",
                }}>🖨️ Imprimer / Télécharger PDF</button>
              </div>
            </div>
          </div>

          {/* RIGHT — Preview */}
          <div style={{ flex: 1, background: "#f3f4f6", overflowY: "auto", padding: 24 }}>
            <div id="devis-print-zone" style={{
              background: "white", maxWidth: 794, margin: "0 auto", padding: 60,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
              color: "#1e1e1e", fontSize: 14, lineHeight: 1.5,
            }}>

              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 28, letterSpacing: "0.25em", fontWeight: 300, color: "#1e1e1e" }}>LIMEN</p>
                  <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Domaine de la Croix Rochefort</p>
                  <p style={{ fontSize: 12, color: "#6b7280" }}>Beaujolais, France</p>
                  <p style={{ fontSize: 12, color: "#c9a96e", marginTop: 4 }}>contact@lebeaumariage.fr</p>
                  <p style={{ fontSize: 12, color: "#c9a96e" }}>lebeaumariage.fr</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 32, fontWeight: 700, color: modeDoc === "facture" ? "#1e1e1e" : "#374151" }}>
                    {modeDoc === "devis" ? "DEVIS" : "FACTURE"}
                  </p>
                  <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>{numeroDevis}</p>
                  <p style={{ fontSize: 13, color: "#6b7280" }}>Émis le {dateEmission}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>
                    {modeDoc === "devis" ? `Valable jusqu'au ${dateValidite}` : `Échéance : ${dateValidite}`}
                  </p>
                </div>
              </div>

              <div style={{ borderTop: "2px solid #1e1e1e", margin: "24px 0" }} />

              {/* Destinataire */}
              <div style={{ background: "#f9fafb", padding: 16, borderRadius: 4, marginBottom: 32 }}>
                <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                  À l'attention de :
                </p>
                <p style={{ fontSize: 18, fontWeight: 600, color: "#1e1e1e" }}>
                  {lead.prenom} {lead.nom}
                </p>
                <p style={{ fontSize: 13, color: "#6b7280" }}>{lead.email}</p>
                {lead.telephone && <p style={{ fontSize: 13, color: "#6b7280" }}>{lead.telephone}</p>}
                <p style={{ fontSize: 13, color: "#374151", marginTop: 4 }}>
                  Mariage du {dateFormatted}
                </p>
              </div>

              {/* Objet */}
              <p style={{ fontSize: 14, color: "#374151", marginBottom: 32 }}>
                <strong>Objet :</strong> {modeDoc === "devis" ? "Devis" : "Facture"} mariage — Domaine de la Croix Rochefort — {dateFormatted}
              </p>

              {/* Table */}
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#1e1e1e" }}>
                    <th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "white", textAlign: "left", fontWeight: 500 }}>Prestation</th>
                    <th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "white", textAlign: "left", fontWeight: 500 }}>Détail</th>
                    <th style={{ padding: "12px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "white", textAlign: "right", fontWeight: 500 }}>Montant HT</th>
                  </tr>
                </thead>
                <tbody>
                  {lignes.map((l, i) => (
                    <tr key={i} style={{
                      borderBottom: "1px solid #f3f4f6",
                      background: l.isRepas && l.isEstimate ? "#fffbeb" : "white",
                    }}>
                      <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 500, color: "#1e1e1e" }}>
                        {l.label}
                        {l.isRepas && l.isEstimate && (
                          <span style={{
                            fontSize: 10, background: "#fef3c7", color: "#92400e",
                            padding: "2px 6px", borderRadius: 3, marginLeft: 8, fontWeight: 600,
                          }}>ESTIMATION</span>
                        )}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#9ca3af", fontStyle: "italic" }}>{l.detail}</td>
                      <td style={{
                        padding: "12px 16px", fontSize: 14, textAlign: "right",
                        color: l.inclus ? "#9ca3af" : l.isRepas && l.isEstimate ? "#92400e" : "#1e1e1e",
                        fontWeight: l.inclus ? 400 : 500,
                      }}>
                        {l.inclus ? "Inclus" : `${l.montant.toLocaleString("fr-FR")} €`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totaux */}
              <div style={{ maxWidth: 320, marginLeft: "auto", marginTop: 16 }}>
                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                    <span>Sous-total HT</span>
                    <span>{sousTotal.toLocaleString("fr-FR")} €</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>
                    <span>TVA</span>
                    <span>Non applicable (art. 293 B CGI)</span>
                  </div>
                  <div style={{ borderTop: "2px solid #1e1e1e", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700 }}>
                    <span>TOTAL TTC</span>
                    <span>{sousTotal.toLocaleString("fr-FR")} €</span>
                  </div>

                  {modeDoc === "devis" && (
                    <>
                      <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 12, paddingTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#374151", marginBottom: 4 }}>
                          <span>Acompte à la signature (30%)</span>
                          <span>{acompte30.toLocaleString("fr-FR")} €</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#374151" }}>
                          <span>Solde à régler (70%)</span>
                          <span>{solde70.toLocaleString("fr-FR")} €</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Conditions */}
              <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
                <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "#374151", fontWeight: 600, marginBottom: 8 }}>
                  {modeDoc === "devis" ? "CONDITIONS DU DEVIS" : "CONDITIONS DE RÈGLEMENT"}
                </p>
                <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.7 }}>
                  {modeDoc === "devis"
                    ? `Le présent devis est valable 30 jours à compter de sa date d'émission. La réservation est confirmée à réception d'un acompte de 30% du montant total. Le prix du repas est établi sur la base de ${guestsDefinitif} invités et sera ajusté sur le nombre définitif confirmé 6 semaines avant le mariage.`
                    : `Le règlement est dû à réception de la facture. En cas de retard de paiement, une pénalité de retard égale à 3 fois le taux d'intérêt légal sera appliquée. Une indemnité forfaitaire de 40 € sera due pour frais de recouvrement.`}
                </p>

                {notePersonnalisee && (
                  <p style={{
                    fontSize: 12, color: "#374151", fontStyle: "italic", marginTop: 16,
                    borderLeft: "3px solid #c9a96e", paddingLeft: 12,
                  }}>{notePersonnalisee}</p>
                )}
              </div>

              {/* Signature (devis only) */}
              {modeDoc === "devis" && (
                <div style={{ marginTop: 48, display: "flex", gap: 40 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>Bon pour accord — Signature du client</p>
                    <div style={{ borderBottom: "1px solid #d1d5db", height: 60, marginTop: 16 }} />
                    <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>Date :</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>Signature Limen</p>
                    <div style={{ borderBottom: "1px solid #d1d5db", height: 60, marginTop: 16 }} />
                    <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>Date :</p>
                  </div>
                </div>
              )}

              {/* Footer */}
              <p style={{ textAlign: "center", marginTop: 40, fontSize: 11, color: "#9ca3af" }}>
                Limen · Domaine de la Croix Rochefort · Beaujolais · contact@lebeaumariage.fr · lebeaumariage.fr
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevisGenerator;
