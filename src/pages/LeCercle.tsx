import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import ArcheMotif from "@/components/cercle/ArcheMotif";
import { schemaFAQ, schemaLeCercleBreadcrumb } from "@/lib/schemas";

/* ─── Tokens — palette du Cercle (identiques à /cercle/:slug) ─── */
const NUIT = "#1A1814";
const LIN = "#F5F0E8";
const OR = "#C8A96E";

/* ─── Reveal au scroll (subtile) ─────────────────────── */
const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      {children}
    </div>
  );
};

/* ─── Styles réutilisés ──────────────────────────────── */
const eyebrow: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 500,
  fontSize: "0.75rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
};

const h2Style: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 400,
  fontSize: "clamp(2rem, 4vw, 3rem)",
  lineHeight: 1.18,
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 300,
  fontSize: "1.0625rem",
  lineHeight: 1.75,
};

const CTA = ({
  to,
  children,
  variant = "primary",
  href,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "fill";
}) => {
  const style: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "'Jost', sans-serif",
    fontWeight: 500,
    fontSize: "0.8rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    padding: "18px 40px",
    color: variant === "fill" ? NUIT : OR,
    background: variant === "fill" ? OR : "transparent",
    border: `1px solid ${OR}`,
    textDecoration: "none",
    transition: "background 0.3s ease, color 0.3s ease",
  };
  if (href) {
    return (
      <a href={href} className="cercle-cta" style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to!} className="cercle-cta" style={style}>
      {children}
    </Link>
  );
};

const faqs = [
  {
    question: "Qu'est-ce que Le Cercle ?",
    answer:
      "Le Cercle est une liste de mariage inversée : au lieu d'offrir des objets après le mariage, les proches portent, avant le jour J, des fragments nommés et réels du mariage — un repas, une cérémonie, une nuit au domaine — via des parts à montant libre.",
  },
  {
    question: "Comment fonctionne une liste de mariage inversée ?",
    answer:
      "Une liste de mariage inversée renverse l'ordre classique : au lieu de recevoir des objets après la cérémonie, le couple ouvre en amont un Cercle composé de parts correspondant aux postes réels de son mariage. Chaque proche choisit une part, la porte avant le jour J, et elle devient réelle grâce à lui.",
  },
  {
    question: "Le Cercle est-il payant pour les mariés ?",
    answer:
      "Non. Le Cercle est inclus dans chaque mariage composé avec Le Beau Mariage — généré automatiquement à partir des postes choisis dans le Composeur, sans coût additionnel pour le couple.",
  },
  {
    question: "Mes invités voient-ils les montants portés par les autres ?",
    answer:
      "Non. Le Cercle n'affiche jamais de montant individuel publiquement. Seul un compteur discret indique combien de proches ont porté chaque part — jamais une somme.",
  },
  {
    question: "Comment un proche porte-t-il une part ?",
    answer:
      "Il ouvre le Cercle du couple, choisit une part parmi celles proposées, lit ce qu'elle représente, puis porte le montant de son choix — à partir de 5€, librement, sans pression.",
  },
  {
    question: "Que reçoit un proche après avoir porté une part ?",
    answer:
      "Un certificat nominatif, envoyé par email : la preuve qu'il porte, personnellement, cette part précise du mariage — à garder comme souvenir.",
  },
  {
    question: "Le Cercle remplace-t-il une liste de mariage classique ?",
    answer:
      "Il en propose une version repensée. Là où la liste classique arrive après le mariage sous forme d'objets, Le Cercle permet de porter, avant le jour J, les postes réels qui composent la journée — le repas, la cérémonie, une nuit au domaine.",
  },
  {
    question: "Puis-je utiliser Le Cercle si je ne suis pas marié avec Le Beau Mariage ?",
    answer:
      "Aujourd'hui, Le Cercle est inclus exclusivement dans les mariages composés avec Le Beau Mariage : il est généré automatiquement à partir des postes choisis dans le Composeur. Il n'est pas encore proposé comme un outil indépendant.",
  },
];

const comparatif = [
  { critere: "Quand", classique: "Après le mariage", cagnotte: "Avant ou après", cercle: "Avant le mariage" },
  {
    critere: "Ce qui est offert",
    classique: "Des objets",
    cagnotte: "De l'argent, sans forme",
    cercle: "Un fragment réel et nommé du mariage",
  },
  { critere: "Montants visibles", classique: "—", cagnotte: "Souvent oui", cercle: "Jamais" },
  {
    critere: "Souvenir pour le porteur",
    classique: "Non",
    cagnotte: "Non",
    cercle: "Certificat nominatif",
  },
  { critere: "Lien avec le jour J", classique: "Aucun", cagnotte: "Aucun", cercle: "Direct" },
];

const etapes = [
  {
    n: "01",
    t: "Le couple ouvre son Cercle.",
    d: "Chaque poste réel de son mariage — le domaine, le repas, la musique, la cérémonie… — devient une part que ses proches peuvent porter.",
  },
  {
    n: "02",
    t: "Chaque proche choisit une part.",
    d: "Il lit ce qu'elle représente, porte le montant qu'il souhaite — libre, sans pression, sans montant affiché publiquement.",
  },
  {
    n: "03",
    t: "La part devient réelle.",
    d: "Le compteur du Cercle grandit : « porté par N proches », jamais un euro affiché.",
  },
  {
    n: "04",
    t: "Chaque porteur reçoit un certificat.",
    d: "Une preuve nominative, gardée comme souvenir : « vous portez le repas du mariage ».",
  },
];

const LeCercle = () => {
  const faqSchema = schemaFAQ(faqs);

  return (
    <>
      <SEO
        title="Le Cercle — La liste de mariage inversée"
        description="Le Cercle, la liste de mariage inversée du Beau Mariage : vos proches portent un fragment réel de votre mariage — une autre idée du financement participatif mariage."
        canonical="https://lebeaumariage.fr/le-cercle"
        jsonLd={[schemaLeCercleBreadcrumb, faqSchema]}
      />

      <main style={{ paddingTop: "80px" }}>
        {/* ═══ Hero (NUIT) ═══ */}
        <section
          style={{
            background: NUIT,
            color: LIN,
            padding: "clamp(64px, 10vw, 120px) 20px clamp(72px, 10vw, 130px)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <Reveal>
              <p style={{ ...eyebrow, color: OR, marginBottom: "20px" }}>Le Cercle</p>
            </Reveal>

            <Reveal>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
                  lineHeight: 1.15,
                  margin: "0 0 28px 0",
                }}
              >
                Votre mariage n'est pas payé par vos invités.
                <br />
                Il est <em style={{ color: OR, fontStyle: "italic" }}>porté</em> par votre Cercle.
              </h1>
            </Reveal>

            <Reveal>
              <p
                style={{
                  ...bodyStyle,
                  color: LIN,
                  opacity: 0.8,
                  maxWidth: "560px",
                  margin: "0 auto 48px",
                }}
              >
                Le Cercle est la liste de mariage inversée du Beau Mariage. Vos proches ne vous offrent plus un objet
                après coup — ils portent, avant le jour J, un fragment réel de votre mariage : une part du repas, une
                place à la cérémonie, une nuit au domaine.
              </p>
            </Reveal>

            <Reveal>
              <div style={{ maxWidth: "220px", margin: "0 auto 48px", opacity: 0.8 }}>
                <ArcheMotif color={OR} />
              </div>
            </Reveal>

            <Reveal>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                <CTA href="#comment-ca-marche">Découvrir comment ça marche</CTA>
                <CTA to="/configurateur" variant="fill">
                  Composer mon mariage →
                </CTA>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Définition (LIN) ═══ */}
        <section style={{ background: LIN, color: NUIT, padding: "clamp(64px, 9vw, 120px) 20px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <Reveal>
              <p style={{ ...eyebrow, color: OR, marginBottom: "24px" }}>Qu'est-ce que Le Cercle</p>
            </Reveal>
            <Reveal>
              <blockquote
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 3vw, 2.15rem)",
                  lineHeight: 1.5,
                  borderLeft: `2px solid ${OR}`,
                  paddingLeft: "clamp(20px, 4vw, 36px)",
                  margin: 0,
                }}
              >
                Le Cercle est une liste de mariage inversée&nbsp;: au lieu d'offrir des objets après le mariage, les
                proches portent, avant le jour J, des fragments nommés et réels du mariage — un repas, une
                cérémonie, une nuit au domaine — via des parts à montant libre.
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ═══ Le problème (LIN) ═══ */}
        <section style={{ background: LIN, color: NUIT, padding: "0 20px clamp(64px, 9vw, 120px)" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...h2Style, marginBottom: "36px", maxWidth: "20ch" }}>
                Le problème avec la liste de mariage classique.
              </h2>
            </Reveal>
            <Reveal>
              <ul style={{ ...bodyStyle, color: "#3B3833", listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "La liste classique arrive après le mariage, déconnectée du jour lui-même.",
                  "Beaucoup de couples aujourd'hui n'ont besoin de rien — ils préféreraient qu'on les aide à financer ce qui compte vraiment : le lieu, le repas, la musique.",
                  "Une cagnotte nue (Leetchi, Lydia) résout le problème de l'argent, mais perd toute la dimension symbolique.",
                  "Le Cercle répond aux deux à la fois.",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "16px",
                      padding: "18px 0",
                      borderTop: i === 0 ? `1px solid ${OR}44` : "none",
                      borderBottom: `1px solid ${OR}44`,
                    }}
                  >
                    <span style={{ color: OR, flexShrink: 0 }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ═══ Comment ça marche (NUIT) ═══ */}
        <section
          id="comment-ca-marche"
          style={{ background: NUIT, color: LIN, padding: "clamp(64px, 9vw, 120px) 20px" }}
        >
          <div style={{ maxWidth: "980px", margin: "0 auto" }}>
            <Reveal>
              <p style={{ ...eyebrow, color: OR, marginBottom: "20px" }}>Comment ça marche</p>
            </Reveal>
            <Reveal>
              <h2 style={{ ...h2Style, color: LIN, marginBottom: "clamp(48px, 6vw, 72px)", maxWidth: "20ch" }}>
                Quatre étapes, du premier poste au certificat.
              </h2>
            </Reveal>

            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {etapes.map((s, i) => (
                <li
                  key={s.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "72px 1fr",
                    gap: "clamp(20px, 4vw, 40px)",
                    padding: "clamp(24px, 4vw, 36px) 0",
                    borderTop: i === 0 ? `1px solid ${OR}33` : "none",
                    borderBottom: `1px solid ${OR}33`,
                  }}
                >
                  <Reveal>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                        color: OR,
                        lineHeight: 1,
                        display: "block",
                      }}
                    >
                      {s.n}
                    </span>
                  </Reveal>
                  <Reveal>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 500,
                          fontSize: "1.05rem",
                          margin: "4px 0 10px 0",
                          color: LIN,
                        }}
                      >
                        {s.t}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.95rem",
                          lineHeight: 1.7,
                          color: LIN,
                          opacity: 0.7,
                          maxWidth: "56ch",
                          margin: 0,
                        }}
                      >
                        {s.d}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══ Une part, concrètement (NUIT) ═══ */}
        <section style={{ background: NUIT, color: LIN, padding: "0 20px clamp(64px, 9vw, 120px)" }}>
          <div style={{ maxWidth: "540px", margin: "0 auto" }}>
            <Reveal>
              <p style={{ ...eyebrow, color: OR, marginBottom: "20px", textAlign: "center" }}>
                Une part, concrètement
              </p>
            </Reveal>
            <Reveal>
              <h2
                style={{
                  ...h2Style,
                  color: LIN,
                  marginBottom: "40px",
                  textAlign: "center",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                }}
              >
                Ce que porte, précisément, un proche.
              </h2>
            </Reveal>

            <Reveal>
              <div
                style={{
                  background: "rgba(245,240,232,0.03)",
                  border: `1px solid ${OR}33`,
                  padding: "28px 24px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 22,
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: OR,
                    opacity: 0.6,
                  }}
                >
                  Exemple
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: 26,
                    color: LIN,
                    lineHeight: 1.2,
                  }}
                >
                  Le repas
                </h3>
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
                  Le grand repas du samedi soir, préparé pour tous les invités par le traiteur du domaine.
                </p>
                <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginTop: 20 }}>
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: LIN,
                      opacity: 0.35,
                    }}
                  >
                    Personne ne l'a encore porté
                  </span>
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      padding: "12px 20px",
                      border: `1px solid ${OR}66`,
                      color: `${OR}99`,
                    }}
                  >
                    Porter cette part
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Comparatif (LIN) ═══ */}
        <section style={{ background: LIN, color: NUIT, padding: "clamp(64px, 9vw, 120px) 20px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...h2Style, marginBottom: "40px", maxWidth: "20ch" }}>
                Liste classique, cagnotte, ou Cercle.
              </h2>
            </Reveal>
            <Reveal>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.9rem",
                    minWidth: "560px",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ ...thStyle, textAlign: "left" }}></th>
                      <th style={thStyle}>Liste de mariage classique</th>
                      <th style={thStyle}>Cagnotte en ligne</th>
                      <th style={{ ...thStyle, color: OR }}>Le Cercle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparatif.map((row, i) => (
                      <tr key={row.critere} style={{ borderTop: `1px solid ${OR}44` }}>
                        <td style={{ ...tdStyle, textAlign: "left", fontWeight: 500 }}>{row.critere}</td>
                        <td style={tdStyle}>{row.classique}</td>
                        <td style={tdStyle}>{row.cagnotte}</td>
                        <td style={{ ...tdStyle, color: NUIT, fontWeight: 500, background: `${OR}14` }}>
                          {row.cercle}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Pourquoi porter, pas payer (NUIT) ═══ */}
        <section
          style={{
            background: NUIT,
            color: LIN,
            padding: "clamp(72px, 11vw, 140px) 20px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <Reveal>
              <p style={{ ...eyebrow, color: OR, marginBottom: "28px" }}>Pourquoi porter, pas payer</p>
            </Reveal>
            <Reveal>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)",
                  lineHeight: 1.5,
                  color: LIN,
                  opacity: 0.9,
                  margin: 0,
                }}
              >
                Dans la plupart des sociétés traditionnelles, la noce était portée par tout le village. La liste de
                mariage moderne en est une version appauvrie. Le Cercle restaure ce geste&nbsp;: le mariage redevient,
                un instant, un acte collectif.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ Inclus dans Le Beau Mariage (LIN) ═══ */}
        <section style={{ background: LIN, color: NUIT, padding: "clamp(64px, 9vw, 120px) 20px", textAlign: "center" }}>
          <div style={{ maxWidth: "620px", margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...h2Style, marginBottom: "24px" }}>Inclus dans Le Beau Mariage.</h2>
            </Reveal>
            <Reveal>
              <p style={{ ...bodyStyle, color: "#3B3833", marginBottom: "40px" }}>
                Pour les couples qui composent leur mariage avec Le Beau Mariage, Le Cercle est inclus, généré
                automatiquement à partir de leurs choix dans le Composeur.
              </p>
            </Reveal>
            <Reveal>
              <Link
                to="/configurateur"
                style={{
                  display: "inline-block",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "18px 40px",
                  color: NUIT,
                  background: OR,
                  border: `1px solid ${OR}`,
                  textDecoration: "none",
                }}
              >
                Composer mon mariage →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ═══ FAQ (LIN) ═══ */}
        <section style={{ background: LIN, color: NUIT, padding: "0 20px clamp(64px, 9vw, 120px)" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...h2Style, marginBottom: "40px" }}>Questions fréquentes.</h2>
            </Reveal>
            <Reveal>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    style={{ borderColor: `${OR}44` }}
                  >
                    <AccordionTrigger
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: NUIT,
                        textAlign: "left",
                      }}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "#3B3833",
                      }}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* ═══ CTA final (NUIT) ═══ */}
        <section
          style={{
            background: NUIT,
            color: LIN,
            padding: "clamp(72px, 11vw, 140px) 20px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "620px", margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...h2Style, color: LIN, fontWeight: 300, marginBottom: "40px" }}>
                Composez votre mariage, votre Cercle est inclus.
              </h2>
            </Reveal>
            <Reveal>
              <CTA to="/configurateur" variant="fill">
                Composer mon mariage →
              </CTA>
            </Reveal>
          </div>
        </section>
      </main>

      <style>{`
        .cercle-cta:hover {
          background: ${OR} !important;
          color: ${NUIT} !important;
        }
        .cercle-cta:focus-visible {
          outline: 2px solid ${OR};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>
    </>
  );
};

const thStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 500,
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#3B3833",
  padding: "0 16px 14px",
  textAlign: "center",
};

const tdStyle: React.CSSProperties = {
  padding: "16px",
  textAlign: "center",
  color: "#3B3833",
  verticalAlign: "top",
};

export default LeCercle;
