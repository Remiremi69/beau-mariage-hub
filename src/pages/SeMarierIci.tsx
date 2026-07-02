import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useEffect, useRef, useState } from "react";

/* ─── Tokens ─────────────────────────────────────────── */
const NUIT = "#0D0E12";
const LIN = "#F5F0E8";
const OR = "#C9A96E";
const OR_PALE = "#D9C29A";
const PIERRE = "#A0998A";

/* ─── Motifs — Arche en plein cintre ─────────────────── */
const ArchClip = ({ id }: { id: string }) => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
    <defs>
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        {/* Rectangle bas + demi-cercle haut => plein cintre */}
        <path d="M 0,1 L 0,0.5 A 0.5,0.5 0 0 1 1,0.5 L 1,1 Z" />
      </clipPath>
    </defs>
  </svg>
);

/* ─── Reveal on scroll (subtile) ─────────────────────── */
const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
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
  fontSize: "0.8rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
};

const h2Style: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 400,
  fontSize: "clamp(2rem, 4vw, 3rem)",
  lineHeight: 1.15,
  letterSpacing: "-0.005em",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 300,
  fontSize: "1.0625rem",
  lineHeight: 1.75,
  maxWidth: "640px",
};

/* ─── CTA (contour d'arche qui se remplit) ──────────── */
const CTA = ({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "nuit";
}) => {
  const isNuit = variant === "nuit";
  return (
    <Link
      to={to}
      className="cta-arch"
      style={{
        display: "inline-block",
        fontFamily: "'Jost', sans-serif",
        fontWeight: 500,
        fontSize: "0.85rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "20px 44px",
        color: isNuit ? NUIT : NUIT,
        background: isNuit ? OR_PALE : "transparent",
        border: `1px solid ${OR}`,
        borderRadius: "999px 999px 4px 4px",
        transition: "background 0.4s ease, color 0.4s ease",
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
};

const SeMarierIci = () => {
  return (
    <>
      <SEO
        title="Se marier dans le Beaujolais quand on n'y habite pas — Mariage clé en main"
        description="Un mariage tout inclus au cœur du Beaujolais, pensé pour les couples de Paris, Lyon ou Genève. Un week-end sur place, une Esquisse, quelques visios — et tout est prêt."
        canonical="https://lebeaumariage.fr/se-marier-ici"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Mariage clé en main dans le Beaujolais",
            provider: {
              "@type": "Organization",
              name: "Le Beau Mariage",
              url: "https://lebeaumariage.fr",
            },
            areaServed: { "@type": "Place", name: "Beaujolais, France" },
            description:
              "Organisation complète d'un mariage au cœur du Beaujolais pour les couples qui n'habitent pas la région : lieu, traiteur, photographe, musicien, décoration, coordination.",
            url: "https://lebeaumariage.fr/se-marier-ici",
            serviceType: "Wedding planning tout compris",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Peut-on organiser son mariage dans le Beaujolais sans y habiter ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui. Le Beau Mariage prend en charge la totalité de l'organisation à votre place : lieu, traiteur, photographe, musicien, décoration, coordination. Vous ne venez qu'une fois, le temps d'un week-end, pour tout voir et tout décider.",
                },
              },
              {
                "@type": "Question",
                name: "Combien de fois faut-il se déplacer avant le mariage ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une seule visite sur place suffit. Vous découvrez le domaine, rencontrez les prestataires, faites les choix essentiels — en un week-end. Le reste des points se règle en visio.",
                },
              },
              {
                "@type": "Question",
                name: "Qu'est-ce que l'Esquisse ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "L'Esquisse est le plan complet et chiffré de votre mariage : chaque prestation, chaque montant, noir sur blanc. Vous la recevez quelques jours après votre week-end au domaine.",
                },
              },
              {
                "@type": "Question",
                name: "Peut-on découvrir le domaine avant de réserver ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui. Une vidéo tournée un jour de mariage vous permet de visiter le domaine à distance, tel qu'il est réellement le jour J.",
                },
              },
            ],
          },
        ]}
      />

      <ArchClip id="arch-clip" />

      <main style={{ background: LIN, color: NUIT, paddingTop: "80px" }}>
        {/* ═══ Section 1 — Hero ═══ */}
        <section
          style={{
            padding: "clamp(48px, 10vw, 120px) 20px clamp(64px, 10vw, 140px)",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <Reveal>
              <p style={{ ...eyebrow, color: OR, marginBottom: "24px" }}>
                Le Beau Mariage · Beaujolais
              </p>
            </Reveal>

            <Reveal>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  margin: "0 0 28px 0",
                  maxWidth: "16ch",
                }}
              >
                Se marier ici,<br />sans vivre ici
              </h1>
            </Reveal>

            <Reveal>
              <p
                style={{
                  ...bodyStyle,
                  color: "#3B3833",
                  marginBottom: "48px",
                }}
              >
                Un mariage clé en main au cœur du Beaujolais, pensé pour ceux qui n'habitent pas la région.
              </p>
            </Reveal>

            {/* Arche — image du domaine */}
            <Reveal className="hero-arch-wrap">
              <div
                className="hero-arch"
                style={{
                  width: "min(100%, 720px)",
                  aspectRatio: "3 / 4.4",
                  margin: "24px auto 56px",
                  clipPath: "url(#arch-clip)",
                  WebkitClipPath: "url(#arch-clip)",
                  overflow: "hidden",
                  position: "relative",
                  background: NUIT,
                }}
              >
                <img
                  src="https://i.postimg.cc/5NHccFBF/54-domaine-de-lanbspcroixnbsprochefort.jpg"
                  alt="Le Domaine de la Croix Rochefort, en Beaujolais, vu à travers un seuil en plein cintre."
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    animation: "heroReveal 0.9s ease-out both",
                  }}
                />
              </div>
            </Reveal>

            <Reveal>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "24px",
                  alignItems: "center",
                }}
              >
                <CTA to="/configurateur">Composer mon mariage →</CTA>
                <a
                  href="#video"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.95rem",
                    color: NUIT,
                    borderBottom: `1px solid ${OR}`,
                    paddingBottom: "2px",
                    textDecoration: "none",
                  }}
                >
                  Découvrir le domaine en vidéo
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Section 2 — Le retournement ═══ */}
        <section style={{ padding: "clamp(64px, 10vw, 140px) 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...h2Style, marginBottom: "40px", maxWidth: "22ch" }}>
                Le tout-inclus n'est pas un luxe. Pour vous, c'est la seule façon.
              </h2>
            </Reveal>
            <Reveal>
              <div style={{ ...bodyStyle, color: "#3B3833" }}>
                <p style={{ marginBottom: "1.4em" }}>
                  Vous êtes tombés amoureux d'un domaine au cœur du Beaujolais. Mais vous vivez à Paris, à Genève, ou simplement assez loin pour qu'organiser un mariage ici tienne de l'impossible.
                </p>
                <p style={{ marginBottom: "1.4em" }}>
                  Coordonner un traiteur, un photographe, un musicien, un officiant — à plusieurs centaines de kilomètres, sans pouvoir passer, ajuster, vérifier — personne ne le peut vraiment. Pour un couple de la région, tout confier relève du confort. Pour vous, c'est la condition même pour que ce mariage existe.
                </p>
                <p style={{ marginBottom: 0, fontWeight: 400 }}>
                  C'est précisément ce que nous faisons.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Section 3 — L'objection (NUIT) ═══ */}
        <section
          style={{
            background: NUIT,
            color: LIN,
            padding: "clamp(80px, 12vw, 160px) 20px",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <h2
                style={{
                  ...h2Style,
                  color: LIN,
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  marginBottom: "24px",
                }}
              >
                La vraie question n'est pas le prix.
              </h2>
            </Reveal>
            <Reveal>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: PIERRE,
                  marginBottom: "clamp(48px, 8vw, 80px)",
                }}
              >
                C'est : comment faire confiance à un mariage qui se prépare sans moi ?
              </p>
            </Reveal>

            {/* Filet vertical + arche filaire */}
            <Reveal>
              <div style={{ position: "relative", padding: "40px 0" }}>
                <svg
                  width="80"
                  height="52"
                  viewBox="0 0 80 52"
                  style={{ display: "block", margin: "0 auto 40px", opacity: 0.85 }}
                  aria-hidden
                >
                  <path
                    d="M 4 52 L 4 26 A 36 36 0 0 1 76 26 L 76 52"
                    fill="none"
                    stroke={OR}
                    strokeWidth="1"
                  />
                </svg>
                <blockquote
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    lineHeight: 1.25,
                    color: OR_PALE,
                    margin: "0 auto",
                    maxWidth: "20ch",
                  }}
                >
                  « Vous ne pilotez rien, mais vous voyez tout. »
                </blockquote>
              </div>
            </Reveal>

            <Reveal>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: LIN,
                  marginTop: "clamp(48px, 8vw, 72px)",
                }}
              >
                Rien de ce que nous organisons ne vous échappe, à aucun moment.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ Section 4 — Une seule visite ═══ */}
        <section style={{ padding: "clamp(64px, 10vw, 140px) 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...h2Style, marginBottom: "40px", maxWidth: "24ch" }}>
                Un week-end. Vous voyez tout. Vous décidez. On s'occupe du reste.
              </h2>
            </Reveal>
            <Reveal>
              <p style={{ ...bodyStyle, color: "#3B3833" }}>
                Nous savons que vous ne ferez pas dix allers-retours. Alors tout est pensé pour une seule venue. Le temps d'un week-end, vous découvrez le domaine, vous rencontrez celles et ceux qui célébreront votre jour, vous goûtez, vous choisissez. Vous repartez avec l'essentiel décidé. Ensuite, chaque détail passe entre nos mains — et les rares décisions qui vous reviennent se prennent en visio, en quelques minutes, jamais dans l'urgence.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ Section 5 — Parcours ═══ */}
        <section style={{ padding: "clamp(64px, 10vw, 140px) 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <Reveal>
              <p style={{ ...eyebrow, color: OR, marginBottom: "20px" }}>
                Ce qui se passe, exactement, après votre oui
              </p>
            </Reveal>
            <Reveal>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  lineHeight: 1.35,
                  marginBottom: "clamp(48px, 6vw, 72px)",
                  maxWidth: "22ch",
                }}
              >
                Aucune zone d'ombre. Voici le chemin, du premier jour au dernier.
              </p>
            </Reveal>

            <ol
              className="parcours-list"
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                position: "relative",
              }}
            >
              {[
                {
                  n: "01",
                  t: "Votre week-end au domaine.",
                  d: "Le lieu, les prestataires, les choix essentiels. Tout se décide sur place, en une fois.",
                },
                {
                  n: "02",
                  t: "Votre Esquisse.",
                  d: "Quelques jours plus tard, vous recevez le plan complet de votre mariage : chaque prestation, chaque montant, noir sur blanc.",
                },
                {
                  n: "03",
                  t: "Les points visio.",
                  d: "À chaque étape clé, un rendez-vous court pour valider et ajuster. Vous savez toujours, précisément, où en est votre mariage.",
                },
                {
                  n: "04",
                  t: "Le jour J.",
                  d: "Vous arrivez. Tout est en place. Il ne vous reste qu'une chose à faire : y être pleinement.",
                },
              ].map((s, i) => (
                <li
                  key={s.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "72px 1fr",
                    gap: "clamp(20px, 4vw, 40px)",
                    padding: "clamp(28px, 4vw, 44px) 0",
                    borderTop: i === 0 ? `1px solid ${OR}33` : "none",
                    borderBottom: `1px solid ${OR}33`,
                    position: "relative",
                  }}
                >
                  <Reveal>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: "clamp(2rem, 4vw, 2.75rem)",
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
                          fontSize: "1.125rem",
                          letterSpacing: "0.01em",
                          margin: "4px 0 10px 0",
                          color: NUIT,
                        }}
                      >
                        {s.t}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 300,
                          fontSize: "1rem",
                          lineHeight: 1.7,
                          color: "#3B3833",
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

        {/* ═══ Section 6 — Vidéo ═══ */}
        <section id="video" style={{ padding: "clamp(64px, 10vw, 140px) 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...h2Style, marginBottom: "32px", maxWidth: "22ch" }}>
                Vous ne pouvez pas venir avant de réserver ?
              </h2>
            </Reveal>
            <Reveal>
              <p style={{ ...bodyStyle, color: "#3B3833", marginBottom: "56px" }}>
                Nous avons filmé le domaine pour vous — tel qu'il est vraiment, un jour de mariage. Vous le découvrez de chez vous, comme si vous y étiez, avant même de prendre le train.
              </p>
            </Reveal>

            <Reveal>
              <div
                style={{
                  width: "min(100%, 720px)",
                  margin: "0 auto",
                  aspectRatio: "3 / 4",
                  clipPath: "url(#arch-clip)",
                  WebkitClipPath: "url(#arch-clip)",
                  overflow: "hidden",
                  background: NUIT,
                  position: "relative",
                }}
              >
                <video
                  controls
                  preload="none"
                  poster="https://i.postimg.cc/5NHccFBF/54-domaine-de-lanbspcroixnbsprochefort.jpg"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  aria-label="Film du Domaine de la Croix Rochefort un jour de mariage"
                >
                  {/* Placeholder — remplacer par le film du domaine */}
                  <source src="" type="video/mp4" />
                </video>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ Section 7 — CTA final (NUIT) ═══ */}
        <section
          style={{
            background: NUIT,
            color: LIN,
            padding: "clamp(80px, 12vw, 160px) 20px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <Reveal>
              <h2
                style={{
                  ...h2Style,
                  color: LIN,
                  fontWeight: 300,
                  marginBottom: "20px",
                }}
              >
                Composez l'esquisse de votre mariage.
              </h2>
            </Reveal>
            <Reveal>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: PIERRE,
                  marginBottom: "48px",
                  maxWidth: "50ch",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                En quelques minutes, dessinez votre mariage et recevez votre Esquisse personnalisée. Sans engagement.
              </p>
            </Reveal>
            <Reveal>
              <CTA to="/configurateur" variant="nuit">
                Composer mon mariage →
              </CTA>
            </Reveal>
          </div>
        </section>

        {/* ═══ Section 8 — Signature ═══ */}
        <section style={{ padding: "clamp(48px, 6vw, 80px) 20px" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.25rem",
              color: OR,
              textAlign: "center",
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            Le seuil, pas le spectacle.
          </p>
        </section>
      </main>

      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: scale(1.06); }
          to { opacity: 1; transform: scale(1); }
        }
        .cta-arch:hover {
          background: ${OR_PALE} !important;
          color: ${NUIT} !important;
        }
        .cta-arch:focus-visible,
        a:focus-visible {
          outline: 2px solid ${OR_PALE};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-arch img { animation: none !important; }
          * { transition: none !important; }
        }
      `}</style>
    </>
  );
};

export default SeMarierIci;
