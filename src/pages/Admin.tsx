import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DevisGenerator from "@/components/admin/DevisGenerator";

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
};

const STATUS_COLORS: Record<string, string> = {
  new: "#3B82F6",
  contacted: "#F59E0B",
  degustation: "#8B5CF6",
  signed: "#10B981",
  paid: "#059669",
};

const STATUS_LABELS: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  degustation: "Dégustation",
  signed: "Signé",
  paid: "Payé",
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [devisLead, setDevisLead] = useState<LeadRow | null>(null);
  const [devisMode, setDevisMode] = useState<"devis" | "facture">("devis");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchLeads = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("configurateur_leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Erreur chargement leads:", error);
    } else {
      setLeads(data || []);
    }
    setLoadingLeads(false);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchLeads();
  }, [isAdmin, fetchLeads]);

  // Realtime subscription
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("admin-leads")
      .on("postgres_changes", { event: "*", schema: "public", table: "configurateur_leads" }, () => {
        fetchLeads();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin, fetchLeads]);

  const updateStatus = async (leadId: string, status: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("configurateur_leads").update({ status }).eq("id", leadId);
    fetchLeads();
  };

  const generateToken = async (leadId: string, type: "signature" | "acompte") => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("lead_tokens")
      .insert({ lead_id: leadId, type })
      .select("token")
      .single();
    if (error) {
      console.error("Erreur création token:", error);
      return null;
    }
    return data?.token as string;
  };

  const handleSendSignature = async (lead: LeadRow) => {
    const token = await generateToken(lead.id, "signature");
    if (token) {
      const url = `${window.location.origin}/signature/${token}`;
      // Copy to clipboard for now (email integration in Phase 2)
      await navigator.clipboard.writeText(url);
      alert(`Lien signature copié :\n${url}\n\nÀ envoyer à ${lead.email}`);
    }
  };

  const handleSendAcompte = async (lead: LeadRow) => {
    const token = await generateToken(lead.id, "acompte");
    if (token) {
      const url = `${window.location.origin}/acompte/${token}`;
      await navigator.clipboard.writeText(url);
      alert(`Lien acompte copié :\n${url}\n\nÀ envoyer à ${lead.email}`);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d0b08", color: "#faf8f4" }}>Chargement...</div>;
  if (!user || !isAdmin) return null;

  const cardStyle: React.CSSProperties = {
    background: "rgba(26,22,18,0.70)", border: "1px solid rgba(201,169,110,0.15)",
    borderRadius: 2, padding: "20px 24px", marginBottom: 12,
  };

  const btnStyle = (bg: string): React.CSSProperties => ({
    fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.15em",
    textTransform: "uppercase", padding: "8px 14px", borderRadius: 2, border: "none",
    cursor: "pointer", background: bg, color: bg === "#c9a96e" ? "#1a1612" : "#faf8f4",
    transition: "opacity 0.2s",
  });

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #0d0b08 0%, #1a1612 50%, #0d0b08 100%)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(201,169,110,0.15)" }}>
        <div className="flex items-center gap-4">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 28, color: "#faf8f4" }}>
            Limen Admin
          </h1>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "rgba(201,169,110,0.60)", letterSpacing: "0.15em" }}>
            {leads.length} lead{leads.length > 1 ? "s" : ""}
          </span>
        </div>
        <button onClick={signOut} style={{ ...btnStyle("rgba(232,221,208,0.10)"), fontSize: 10 }}>
          Déconnexion
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 px-6 py-5">
        {["new", "contacted", "degustation", "signed", "paid"].map((s) => (
          <div key={s} style={{ ...cardStyle, textAlign: "center", padding: "14px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: STATUS_COLORS[s], fontWeight: 300 }}>
              {leads.filter((l) => l.status === s).length}
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(232,221,208,0.50)", marginTop: 4 }}>
              {STATUS_LABELS[s]}
            </p>
          </div>
        ))}
      </div>

      {/* Lead list */}
      <div className="px-6 pb-20">
        {loadingLeads ? (
          <p style={{ color: "rgba(232,221,208,0.40)", fontFamily: "'Jost', sans-serif", textAlign: "center", marginTop: 40 }}>Chargement des leads...</p>
        ) : leads.length === 0 ? (
          <p style={{ color: "rgba(232,221,208,0.40)", fontFamily: "'Jost', sans-serif", textAlign: "center", marginTop: 40 }}>Aucun lead pour le moment.</p>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} style={cardStyle}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Left — Info */}
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h3 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 16, color: "#faf8f4" }}>
                      {lead.prenom} {lead.nom}
                    </h3>
                    <span style={{
                      fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                      padding: "3px 10px", borderRadius: 2,
                      background: STATUS_COLORS[lead.status || "new"] + "20",
                      color: STATUS_COLORS[lead.status || "new"],
                      border: `1px solid ${STATUS_COLORS[lead.status || "new"]}40`,
                    }}>
                      {STATUS_LABELS[lead.status || "new"]}
                    </span>
                    {lead.localisation && (
                      <span style={{
                        fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.10em",
                        padding: "3px 8px", borderRadius: 2,
                        background: lead.localisation === "distance" ? "rgba(245,158,11,0.10)" : "rgba(16,185,129,0.10)",
                        color: lead.localisation === "distance" ? "#F59E0B" : "#10B981",
                        border: `1px solid ${lead.localisation === "distance" ? "rgba(245,158,11,0.30)" : "rgba(16,185,129,0.30)"}`,
                      }}>
                        {lead.localisation === "distance" ? "📦 Distance" : "🍽️ Local"}
                      </span>
                    )}
                    {lead.coffret_demande && lead.status === "new" && (
                      <span className="animate-pulse" style={{
                        fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.10em",
                        padding: "3px 8px", borderRadius: 2, background: "rgba(245,158,11,0.20)",
                        color: "#F59E0B", border: "1px solid rgba(245,158,11,0.40)",
                      }}>
                        📦 Coffret à expédier
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1 mt-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, color: "rgba(232,221,208,0.60)" }}>
                    <p>📧 {lead.email}</p>
                    {lead.telephone && <p>📞 {lead.telephone}</p>}
                    {lead.date_mariage && <p>📅 {lead.date_mariage}</p>}
                    {lead.guests_estimate && <p>👥 {lead.guests_estimate} invités</p>}
                    {lead.total_estimate && <p style={{ color: "#c9a96e", fontWeight: 500 }}>💰 {lead.total_estimate.toLocaleString("fr-FR")} €</p>}
                    {lead.rdv_jour && <p>🕐 RDV: {lead.rdv_jour} {lead.rdv_creneau}</p>}
                  </div>

                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "rgba(232,221,208,0.30)", marginTop: 8 }}>
                    {new Date(lead.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {/* Right — Actions */}
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end" style={{ flexShrink: 0 }}>
                  {lead.status === "new" && (
                    <button onClick={() => updateStatus(lead.id, "contacted")} style={btnStyle("rgba(59,130,246,0.20)")}>
                      Marquer contacté
                    </button>
                  )}
                  {(lead.status === "contacted" || lead.status === "degustation") && (
                    <button onClick={() => handleSendSignature(lead)} style={btnStyle("#c9a96e")}>
                      Lien signature
                    </button>
                  )}
                  {lead.status === "signed" && (
                    <button onClick={() => handleSendAcompte(lead)} style={btnStyle("#10B981")}>
                      Lien acompte
                    </button>
                  )}
                  <button onClick={() => { setDevisLead(lead); setDevisMode("devis"); }} style={btnStyle("rgba(232,221,208,0.08)")}>
                    📄 Devis
                  </button>
                  <button onClick={() => { setDevisLead(lead); setDevisMode("facture"); }} style={btnStyle("#c9a96e")}>
                    🧾 Facture
                  </button>
                  <a href={`tel:${lead.telephone}`} style={{ ...btnStyle("rgba(232,221,208,0.08)"), textDecoration: "none", display: "inline-block", textAlign: "center" }}>
                    Appeler
                  </a>
                  <a href={`mailto:${lead.email}?subject=${encodeURIComponent(`Votre mariage Limen — ${lead.date_mariage || ""}`)}`}
                    style={{ ...btnStyle("rgba(232,221,208,0.08)"), textDecoration: "none", display: "inline-block", textAlign: "center" }}>
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>

      {devisLead && (
        <DevisGenerator
          lead={devisLead}
          isOpen={!!devisLead}
          onClose={() => setDevisLead(null)}
          mode={devisMode}
        />
      )}
    </div>
  );
};

export default Admin;
