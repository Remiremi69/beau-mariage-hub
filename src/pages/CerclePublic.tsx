import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

type Cercle = {
  id: string;
  slug: string;
  statut: string;
  mot_couple: string | null;
  photo_url: string | null;
  date_cloture: string | null;
  couple_id: string;
};

type Part = {
  id: string;
  cercle_id: string;
  poste_cle: string;
  titre: string;
  evocation: string | null;
  ordre: number;
  actif: boolean;
};

type Couple = { prenom: string | null; nom: string | null };

const NUIT = "#1A1814";
const LIN = "#F5F0E8";
const OR = "#C8A96E";

const ArcheSVG = () => (
  <svg viewBox="0 0 400 260" className="w-full h-auto" aria-hidden="true">
    <path
      d="M 60 250 L 60 140 Q 60 40 200 40 Q 340 40 340 140 L 340 250"
      fill="none"
      stroke={OR}
      strokeWidth="1"
      opacity="0.7"
    />
    <path
      d="M 90 250 L 90 150 Q 90 70 200 70 Q 310 70 310 150 L 310 250"
      fill="none"
      stroke={OR}
      strokeWidth="0.6"
      opacity="0.4"
    />
    <line x1="200" y1="90" x2="200" y2="250" stroke={OR} strokeWidth="0.4" opacity="0.3" />
  </svg>
);

const CerclePublic = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [cercle, setCercle] = useState<Cercle | null>(null);
  const [couple, setCouple] = useState<Couple | null>(null);
  const [parts, setParts] = useState<Part[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [notFound, setNotFound] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const showPorte = searchParams.get("porte") === "1";
  const contributionId = searchParams.get("cid");

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!slug) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: c } = await (supabase as any)
        .from("cercles")
        .select("id,slug,statut,mot_couple,photo_url,date_cloture,couple_id")
        .eq("slug", slug)
        .maybeSingle();

      if (!alive) return;
      if (!c || (c.statut !== "publie" && c.statut !== "cloture")) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setCercle(c);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [{ data: p }, { data: co }, { data: contribs }] = await Promise.all([
        (supabase as any)
          .from("parts")
          .select("id,cercle_id,poste_cle,titre,evocation,ordre,actif")
          .eq("cercle_id", c.id)
          .eq("actif", true)
          .order("ordre", { ascending: true }),
        (supabase as any)
          .from("configurateur_leads")
          .select("prenom,nom")
          .eq("id", c.couple_id)
          .maybeSingle(),
        (supabase as any)
          .from("contributions_publiques")
          .select("part_id"),
      ]);

      if (!alive) return;
      setParts((p as Part[]) || []);
      setCouple((co as Couple) || null);
      const map: Record<string, number> = {};
      ((contribs as { part_id: string }[]) || []).forEach((row) => {
        map[row.part_id] = (map[row.part_id] || 0) + 1;
      });
      setCounts(map);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  const coupleLabel = useMemo(() => {
    if (!couple) return "les mariés";
    const p = (couple.prenom || "").trim();
    return p || "les mariés";
  }, [couple]);

  if (loading) {
    return (
      <div style={{ background: NUIT, color: LIN, minHeight: "100vh" }} className="flex items-center justify-center">
        <p style={{ fontFamily: "'Jost',sans-serif', letterSpacing:'0.2em'", opacity: 0.5, fontSize: 12 }}>
          Chargement...
        </p>
      </div>
    );
  }

  if (notFound) {
    return (
      <>
        <SEO title="Cercle introuvable" description="Ce Cercle n'existe pas ou n'est pas encore ouvert." noIndex />
        <div style={{ background: NUIT, color: LIN, minHeight: "100vh" }} className="flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, fontStyle: "italic" }}>
              Ce Cercle n'existe pas
            </h1>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, opacity: 0.6, marginTop: 16 }}>
              Il n'est peut-être pas encore ouvert. Revenez plus tard, ou contactez le couple.
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!cercle) return null;

  if (showPorte && contributionId) {
    return (
      <PorteScreen
        contributionId={contributionId}
        prenomFromUrl={searchParams.get("prenom") || undefined}
        coupleLabel={coupleLabel}
        onClose={() => {
          searchParams.delete("porte");
          searchParams.delete("cid");
          searchParams.delete("prenom");
          setSearchParams(searchParams, { replace: true });
        }}
      />
    );
  }


  return (
    <>
      <SEO title={`Le Cercle de ${coupleLabel}`} description="Portez une part réelle de ce mariage." noIndex />
      <div style={{ background: NUIT, color: LIN, minHeight: "100vh" }}>
        <div className="mx-auto" style={{ maxWidth: 720, padding: "48px 20px 96px" }}>
          {/* 1. En-tête */}
          <div className="text-center">
            <div className="mx-auto" style={{ maxWidth: 320, marginBottom: 28 }}>
              {cercle.photo_url ? (
                <img
                  src={cercle.photo_url}
                  alt=""
                  style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 0, border: `1px solid ${OR}33` }}
                />
              ) : (
                <ArcheSVG />
              )}
            </div>

            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: OR, opacity: 0.8 }}>
              Le Cercle
            </p>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(38px, 8vw, 60px)",
                lineHeight: 1.05,
                marginTop: 14,
                color: LIN,
              }}
            >
              {couple?.prenom || "Les mariés"}
              {couple?.nom ? <> <span style={{ color: OR, fontStyle: "normal", fontWeight: 200 }}>&amp;</span> </> : null}
              {couple?.nom || ""}
            </h1>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
                marginTop: 22,
                color: LIN,
                opacity: 0.85,
                maxWidth: 460,
                marginInline: "auto",
              }}
            >
              Les proches de {coupleLabel} portent leur mariage.
              <br />
              Choisissez ce que vous porterez.
            </p>

            {cercle.mot_couple && (
              <blockquote
                style={{
                  marginTop: 36,
                  paddingLeft: 20,
                  borderLeft: `1px solid ${OR}55`,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: LIN,
                  opacity: 0.75,
                  maxWidth: 460,
                  marginInline: "auto",
                  textAlign: "left",
                }}
              >
                « {cercle.mot_couple} »
              </blockquote>
            )}
          </div>

          {/* Séparateur */}
          <div className="flex justify-center" style={{ marginTop: 56, marginBottom: 40 }}>
            <div style={{ width: 40, height: 1, background: OR, opacity: 0.4 }} />
          </div>

          {/* 2. Cadrage */}
          <p
            className="text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.7,
              color: LIN,
              opacity: 0.7,
              maxWidth: 520,
              marginInline: "auto",
            }}
          >
            Chaque part est un morceau réel de la journée.
            <br />
            En la portant, vous la faites exister.
          </p>

          {/* 3. Les postes */}
          <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 14 }}>
            {parts.map((part) => {
              const n = counts[part.id] || 0;
              return (
                <div
                  key={part.id}
                  style={{
                    background: "rgba(245,240,232,0.03)",
                    border: `1px solid ${OR}22`,
                    padding: "26px 22px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 400,
                      fontSize: 26,
                      color: LIN,
                      lineHeight: 1.2,
                    }}
                  >
                    {part.titre}
                  </h2>
                  {part.evocation && (
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: LIN,
                        opacity: 0.65,
                        marginTop: 10,
                      }}
                    >
                      {part.evocation}
                    </p>
                  )}
                  <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginTop: 20 }}>
                    <span
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: n > 0 ? OR : LIN,
                        opacity: n > 0 ? 0.9 : 0.35,
                      }}
                    >
                      {n > 0
                        ? `Porté par ${n} proche${n > 1 ? "s" : ""}`
                        : "Personne ne l'a encore porté"}
                    </span>
                    <button
                      onClick={() => setSelectedPart(part)}
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        padding: "12px 20px",
                        border: `1px solid ${OR}`,
                        background: "transparent",
                        color: OR,
                        cursor: "pointer",
                        transition: "background 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = OR;
                        (e.currentTarget as HTMLButtonElement).style.color = NUIT;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = OR;
                      }}
                    >
                      Porter cette part
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedPart && (
          <ContributionModal
            part={selectedPart}
            onClose={() => setSelectedPart(null)}
          />
        )}
      </div>
    </>
  );
};

const ContributionModal = ({ part, onClose }: { part: Part; onClose: () => void }) => {
  const [montant, setMontant] = useState<string>("");
  const [prenom, setPrenom] = useState("");
  const [mot, setMot] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = async () => {
    setError(null);
    const m = Number(montant);
    if (!m || m < 5) return setError("Le montant minimum est de 5 €.");
    if (!prenom.trim()) return setError("Votre prénom est nécessaire.");
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return setError("Un email valide est nécessaire pour le certificat.");
    setLoading(true);
    try {
      const { data, error: err } = await supabase.functions.invoke("create-checkout", {
        body: {
          part_id: part.id,
          cercle_id: part.cercle_id,
          montant: m,
          prenom: prenom.trim(),
          mot: mot.trim() || null,
          email: email.trim(),
        },
      });
      if (err) throw err;
      const url = (data as { url?: string } | null)?.url;
      if (!url) throw new Error("URL de paiement manquante");
      // Redirige vers Stripe Checkout
      window.location.href = url;
    } catch (e) {
      console.error(e);
      setError("Impossible d'ouvrir le paiement pour le moment.");
      setLoading(false);
    }
  };


  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        zIndex: 100, padding: 0,
      }}
      className="sm:!items-center sm:!p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: NUIT,
          border: `1px solid ${OR}44`,
          padding: "32px 24px 40px",
          maxWidth: 480, width: "100%",
          maxHeight: "92vh", overflowY: "auto",
        }}
      >
        {confirmed ? (
          <div className="text-center">
            <div style={{ width: 40, height: 1, background: OR, margin: "0 auto 28px" }} />
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 30, color: LIN }}>
              Merci {prenom}.
            </h3>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, lineHeight: 1.7, color: LIN, opacity: 0.7, marginTop: 20 }}>
              Le paiement sera activé très bientôt.
              <br />
              Nous vous recontacterons à <span style={{ color: OR }}>{email}</span> pour finaliser votre part et vous envoyer votre certificat.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 32, fontFamily: "'Jost', sans-serif", fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "12px 24px", border: `1px solid ${OR}`,
                background: "transparent", color: OR, cursor: "pointer",
              }}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4" style={{ marginBottom: 8 }}>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: OR, opacity: 0.8 }}>
                Porter une part
              </p>
              <button
                onClick={onClose}
                aria-label="Fermer"
                style={{ background: "transparent", border: "none", color: LIN, opacity: 0.5, cursor: "pointer", fontSize: 22, lineHeight: 1 }}
              >
                ×
              </button>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 30, color: LIN, lineHeight: 1.2 }}>
              {part.titre}
            </h3>
            {part.evocation && (
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, lineHeight: 1.65, color: LIN, opacity: 0.65, marginTop: 12 }}>
                {part.evocation}
              </p>
            )}

            <div style={{ height: 1, background: OR, opacity: 0.2, margin: "28px 0" }} />

            <Field label="Portez le montant que vous souhaitez">
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  inputMode="numeric"
                  min={5}
                  step={1}
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  placeholder="—"
                  style={inputStyle}
                />
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: OR, fontFamily: "'Jost',sans-serif", fontSize: 14 }}>€</span>
              </div>
              <p style={hintStyle}>Minimum 5 €.</p>
            </Field>

            <Field label="Votre prénom">
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="Un mot pour le couple (facultatif)">
              <textarea
                value={mot}
                onChange={(e) => setMot(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: "vertical", paddingTop: 10 }}
              />
            </Field>

            <Field label="Email — pour recevoir votre certificat de part">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </Field>

            {error && (
              <p style={{ color: "#e08a8a", fontFamily: "'Jost',sans-serif", fontSize: 13, marginTop: 12 }}>{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: 28,
                fontFamily: "'Jost', sans-serif",
                fontSize: 12,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "16px 20px",
                border: "none",
                background: OR,
                color: NUIT,
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "..." : "Continuer"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(245,240,232,0.04)",
  border: `1px solid ${OR}33`,
  color: LIN,
  fontFamily: "'Jost', sans-serif",
  fontSize: 15,
  padding: "12px 14px",
  borderRadius: 0,
  outline: "none",
};

const hintStyle: React.CSSProperties = {
  fontFamily: "'Jost',sans-serif",
  fontSize: 11,
  color: LIN,
  opacity: 0.4,
  marginTop: 6,
  letterSpacing: "0.05em",
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginTop: 18 }}>
    <label
      style={{
        display: "block",
        fontFamily: "'Jost',sans-serif",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: OR,
        opacity: 0.8,
        marginBottom: 8,
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

const PorteScreen = ({
  contributionId,
  coupleLabel,
  prenomFromUrl,
  onClose,
}: {
  contributionId: string;
  coupleLabel: string;
  prenomFromUrl?: string;
  onClose: () => void;
}) => {
  const [statut, setStatut] = useState<string | null>(null);
  const [details, setDetails] = useState<{ prenom?: string; titre?: string } | null>(null);

  // Poll léger sur le statut
  useEffect(() => {
    let alive = true;
    let tries = 0;
    const check = async () => {
      try {
        const { data } = await supabase.functions.invoke("contribution-status", {
          body: null,
          method: "GET" as never,
          // supabase-js n'accepte pas GET → on utilise fetch direct
        } as never);
        if (data && (data as { statut?: string }).statut) {
          if (!alive) return;
          setStatut((data as { statut: string }).statut);
        }
      } catch { /* ignore */ }
    };
    // Utilise fetch direct pour GET
    const url = `${(supabase as unknown as { supabaseUrl: string }).supabaseUrl}/functions/v1/contribution-status?cid=${contributionId}`;
    const anonKey = (supabase as unknown as { supabaseKey: string }).supabaseKey;
    const poll = async () => {
      try {
        const r = await fetch(url, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } });
        const j = await r.json();
        if (!alive) return;
        if (j?.statut) setStatut(j.statut);
      } catch { /* ignore */ }
    };
    void check;
    void poll();
    const interval = setInterval(() => {
      tries += 1;
      if (tries > 20 || statut === "payee" || statut === "echouee") { clearInterval(interval); return; }
      void poll();
    }, 1500);
    return () => { alive = false; clearInterval(interval); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contributionId]);

  // Une fois payee : essaie de récupérer prénom + titre de part depuis la vue publique
  useEffect(() => {
    if (statut !== "payee") return;
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from("contributions_publiques")
        .select("prenom, part_id")
        .eq("id", contributionId)
        .maybeSingle();
      if (data?.part_id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: p } = await (supabase as any)
          .from("parts").select("titre").eq("id", data.part_id).maybeSingle();
        setDetails({ prenom: data.prenom, titre: p?.titre });
      }
    })();
  }, [statut, contributionId]);

  const isPending = statut !== "payee" && statut !== "echouee";
  const prenom = details?.prenom || prenomFromUrl || "vous";

  return (
    <>
      <SEO title="Merci — Le Cercle" description="Merci d'avoir porté une part." noIndex />
      <div style={{ background: NUIT, color: LIN, minHeight: "100vh" }} className="flex items-center justify-center px-6">
        <div className="text-center" style={{ maxWidth: 520 }}>
          <div className="mx-auto" style={{ maxWidth: 240, marginBottom: 32, opacity: 0.5 }}>
            <ArcheSVG />
          </div>
          <div style={{ width: 40, height: 1, background: OR, margin: "0 auto 32px" }} />

          {statut === "echouee" ? (
            <>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 36, color: LIN }}>
                Le paiement n'a pas abouti
              </h1>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, lineHeight: 1.7, color: LIN, opacity: 0.7, marginTop: 20 }}>
                Aucune somme n'a été prélevée. Vous pouvez réessayer quand vous le souhaitez.
              </p>
            </>
          ) : isPending ? (
            <>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: OR, opacity: 0.8 }}>
                Nous confirmons votre part…
              </p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 36, color: LIN, marginTop: 20 }}>
                Un instant.
              </h1>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, lineHeight: 1.7, color: LIN, opacity: 0.65, marginTop: 20 }}>
                Stripe nous transmet la confirmation. Ne fermez pas cette page.
              </p>
            </>
          ) : (
            <>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: OR, opacity: 0.9 }}>
                Votre part est portée
              </p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: 36, color: LIN, marginTop: 20, lineHeight: 1.2 }}>
                {prenom}, vous portez {details?.titre ? <em style={{ color: OR, fontStyle: "italic" }}>{details.titre.toLowerCase()}</em> : "votre part"}.
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, lineHeight: 1.6, color: LIN, opacity: 0.75, marginTop: 24 }}>
                Le jour venu, il existera grâce à vous.
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, lineHeight: 1.7, color: LIN, opacity: 0.55, marginTop: 28 }}>
                Votre certificat vous sera envoyé par email dans les prochaines minutes.
              </p>
            </>
          )}

          <button
            onClick={onClose}
            style={{
              marginTop: 40,
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "14px 28px",
              border: `1px solid ${OR}`,
              background: "transparent",
              color: OR,
              cursor: "pointer",
            }}
          >
            Retour au Cercle de {coupleLabel}
          </button>
        </div>
      </div>
    </>
  );
};

export default CerclePublic;
