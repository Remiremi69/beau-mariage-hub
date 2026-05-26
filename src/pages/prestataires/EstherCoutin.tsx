import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import estherHero from "@/assets/esther-coutin-hero.jpg";
import ceremonieScene from "@/assets/esther-ceremonie-scene.jpg";
import mariesMoment from "@/assets/esther-maries-moment.jpg";
import animationSoiree from "@/assets/esther-animation-soiree.jpg";
import speakerEvenementiel from "@/assets/esther-speaker-evenementiel.jpg";


const COLORS = {
  nuit: "#0D0E12",
  or: "#C9A96E",
  orPale: "#E8D5B0",
  lin: "#F5F0E8",
  linFonce: "#EDE5D4",
  texte: "#1A1A1F",
  texteLeger: "#6B6355",
};

const fontTitle = "'Cormorant Garamond', serif";
const fontBody = "'Jost', sans-serif";

const Eyebrow = ({
  children,
  color = COLORS.or,
  opacity = 1,
}: {
  children: React.ReactNode;
  color?: string;
  opacity?: number;
}) => (
  <div
    style={{
      fontFamily: fontBody,
      fontWeight: 400,
      fontSize: "11px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      opacity,
      marginBottom: "1.5rem",
    }}
  >
    {children}
  </div>
);

const PhotoPlaceholder = ({
  bg = "#1a1a22",
  alt = "",
}: {
  bg?: string;
  alt?: string;
}) => (
  <div style={{ position: "absolute", inset: 0, backgroundColor: bg }}>
    <img
      className="photo-placeholder"
      src=""
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
    />
  </div>
);

const EstherCoutin = () => {
  const services = [
    {
      title: "RDV avec les mariés",
      body: "Échange approfondi pour connaître votre histoire, choix du ton (élégant, festif, intimiste), conseils et coordination du déroulé sur-mesure.",
    },
    {
      title: "Fluidité de l'animation",
      body: "Mise en valeur des entrées, mariés, témoins, pièces montées, accompagnement des discours, animation de jeux en coordination avec les témoins.",
    },
    {
      title: "Gestion du timing",
      body: "Coordination des temps forts, respect du rythme, anticipation des imprévus, ajustement en temps réel tout au long de la journée.",
    },
    {
      title: "Présence rassurante",
      body: "Repère fiable et sérieux, voix posée, gestion sereine des imprévus, attention constante au confort des mariés.",
    },
  ];

  const partages = [
    "La conviction qu'une cérémonie réussie est celle dont les mariés se souviennent comme d'une conversation, pas d'un spectacle",
    "Le refus du script générique, chaque cérémonie est construite pour ce couple précis",
    "La maîtrise du timing comme acte de respect envers les invités",
    "Une présence qui s'efface quand il le faut, et qui porte quand c'est nécessaire",
    "La fluidité comme mode opératoire de A à Z",
  ];

  const change = [
    "Un rendez-vous approfondi avec Esther avant le jour J, elle connaît votre histoire",
    "Le déroulé est coordonné avec toute l'équipe Limen en amont",
    "Zéro improvisation le jour J, tout est anticipé, rien n'est laissé au hasard",
    "Elle gère les imprévus, vous, vous vivez votre journée",
    "Une seule interlocutrice pour la cérémonie et l'animation de soirée si souhaité",
  ];

  const galerie = [
    { label: "Cérémonie · En scène", big: true },
    { label: "Speaker · Événementiel" },
    { label: "Animation · Soirée" },
    { label: "Mariés · Le moment" },
  ];

  return (
    <div style={{ backgroundColor: COLORS.lin, color: COLORS.texte, fontFamily: fontBody }}>
      <SEO
        title="Esther Coutin, Maîtresse de cérémonie & officiante laïque | Le Beau Mariage par Limen"
        description="Speaker professionnelle, maîtresse de cérémonie et officiante laïque. Esther Coutin anime votre cérémonie avec fluidité et élégance, partenaire de la sélection Limen."
        canonical="https://lebeaumariage.fr/prestataires/esther-coutin"
      />

      {/* 1. NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          backgroundColor: COLORS.lin,
          borderBottom: `1px solid ${COLORS.or}40`,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", textDecoration: "none" }}>
          <span style={{ color: COLORS.or, fontSize: "18px", fontFamily: fontTitle }}>⌐</span>
          <span style={{ fontFamily: fontTitle, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.12em", color: COLORS.texte }}>
            Le Beau Mariage
          </span>
          <span style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: COLORS.texteLeger }}>
            par Limen
          </span>
        </Link>
        <Link
          to="/serie-octobre-2027"
          style={{
            fontFamily: fontBody,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: COLORS.texteLeger,
            textDecoration: "none",
          }}
        >
          ← Nos partenaires
        </Link>
      </nav>

      {/* 2. HERO */}
      <section
        className="lc-hero"
        style={{
          marginTop: "64px",
          minHeight: "88vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div style={{ backgroundColor: COLORS.nuit, position: "relative", overflow: "hidden" }}>
          <img
            src={estherHero}
            alt="Esther Coutin · Maîtresse de cérémonie"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: fontTitle,
              fontSize: "180px",
              color: `${COLORS.or}0F`,
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            ⌐
          </span>
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "12px",
              fontFamily: fontBody,
              fontWeight: 300,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(201,169,110,0.5)",
            }}
          >
            © Esther Coutin
          </div>
        </div>

        <div
          style={{
            backgroundColor: COLORS.lin,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "5rem",
            paddingBottom: "5rem",
          }}
        >
          <Eyebrow>Cérémonie laïque · Partenaire Limen</Eyebrow>
          <h1
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              lineHeight: 1.0,
              color: COLORS.texte,
              margin: 0,
            }}
          >
            Esther
            <br />
            Coutin
          </h1>
          <p
            style={{
              fontFamily: fontTitle,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.25rem",
              color: COLORS.texteLeger,
              marginTop: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            Maîtresse de cérémonie · Officiante laïque
          </p>
          <p
            style={{
              fontFamily: fontBody,
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.7,
              maxWidth: "42ch",
              color: COLORS.texte,
              margin: 0,
            }}
          >
            Elle ne lit pas un discours. Elle porte une voix, la vôtre. Speaker
            professionnelle à la radio et en événementiel, Esther Coutin anime votre
            cérémonie avec la fluidité de quelqu'un qui sait exactement quand parler,
            et quand se taire.
          </p>

          <div
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: `1px solid ${COLORS.or}40`,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {[
              { n: "Maitrise · Fluidité · Émotions", l: "Les 3 mots d'ordre" },
              { n: "Radio · Événementiel", l: "Background" },
              { n: "Sur-mesure", l: "Chaque cérémonie" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: fontTitle, fontSize: "2rem", color: COLORS.or, lineHeight: 1.15 }}>
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: fontBody,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: COLORS.texteLeger,
                    marginTop: "0.5rem",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHIE */}
      <section style={{ backgroundColor: COLORS.nuit, padding: "7rem 5rem" }}>
        <div className="lc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <Eyebrow opacity={0.6}>Sa démarche</Eyebrow>
            <h2
              style={{
                fontFamily: fontTitle,
                fontWeight: 300,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                lineHeight: 1.15,
                color: COLORS.orPale,
                margin: "0 0 2.5rem 0",
              }}
            >
              Célébrons votre amour,
              <br />
              <em>à votre image.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: `${COLORS.lin}B3`, fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75 }}>
              <p>
                Esther est speaker professionnelle, à la radio, sur les défilés, les marathons,
                les salons du mariage. Habituée au micro depuis des années, elle sait mettre sa
                voix et son énergie au service de vos moments, avec une fluidité et une élégance
                naturelles.
              </p>
              <p>
                Sa méthode commence bien avant le jour J : un rendez-vous approfondi pour
                connaître votre histoire, choisir le ton de l'événement, élégant, festif,
                intimiste, et construire un déroulé sur-mesure qui vous ressemble.
              </p>
              <p>
                Le jour J, elle est votre repère : elle met en valeur les entrées, accompagne
                les discours, gère le timing et les imprévus, avec une présence rassurante et
                une attention constante à votre confort.
              </p>
            </div>
          </div>
          <div style={{ borderLeft: `1px solid ${COLORS.or}`, paddingLeft: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p
              style={{
                fontFamily: fontTitle,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "1.625rem",
                lineHeight: 1.5,
                color: COLORS.orPale,
                margin: 0,
              }}
            >
              « Soucieuse et consciencieuse, vous pouvez me faire confiance pour être à votre
              écoute, et animer un mariage à votre image avec fluidité et élégance. »
            </p>
            <div
              style={{
                marginTop: "2rem",
                fontFamily: fontBody,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: `${COLORS.or}99`,
              }}
            >
              Esther Coutin · Maîtresse de cérémonie
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section style={{ backgroundColor: COLORS.lin, padding: "6rem 5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Eyebrow>Ses interventions</Eyebrow>
          <h2
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.15,
              color: COLORS.texte,
              margin: "0 0 1.5rem 0",
            }}
          >
            Quatre dimensions.
            <br />
            <em>Une seule présence.</em>
          </h2>
          <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75, color: COLORS.texteLeger, maxWidth: "58ch", marginBottom: "4rem" }}>
            Esther intervient sur chaque dimension de votre journée, de la construction de la
            cérémonie à la coordination de la soirée. Chaque intervention est pensée comme un
            service à part entière.
          </p>

          <div
            className="lc-services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              backgroundColor: `${COLORS.or}30`,
            }}
          >
            {services.map((s) => (
              <div key={s.title} style={{ backgroundColor: COLORS.linFonce, padding: "2.5rem 2rem" }}>
                <h3 style={{ fontFamily: fontTitle, fontWeight: 400, fontSize: "1.375rem", color: COLORS.texte, margin: "0 0 0.75rem 0" }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "14px", lineHeight: 1.7, color: COLORS.texteLeger, margin: 0 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALERIE */}
      <section style={{ backgroundColor: COLORS.nuit, padding: "4rem 0" }}>
        <div style={{ padding: "0 5rem", textAlign: "center", paddingTop: "4rem", marginBottom: "2rem" }}>
          <Eyebrow opacity={0.6}>En scène</Eyebrow>
        </div>

        <div className="lc-scenes" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", backgroundColor: `${COLORS.or}26` }}>
          <div
            className="lc-scene-big"
            style={{
              gridColumn: "1 / -1",
              position: "relative",
              aspectRatio: "16/9",
              overflow: "hidden",
            }}
          >
            <img src={ceremonieScene} alt={galerie[0].label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7))" }} />
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                fontFamily: fontBody,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: `${COLORS.lin}B3`,
              }}
            >
              {galerie[0].label}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0.5rem",
                right: "0.75rem",
                fontFamily: fontBody,
                fontSize: "10px",
                color: "rgba(201,169,110,0.4)",
              }}
            >
              © Esther Coutin
            </div>
          </div>

          {galerie.slice(1).map((c) => (
            <div key={c.label} style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
              {c.label === "Mariés · Le moment" ? (
                <img src={mariesMoment} alt={c.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              ) : c.label === "Animation · Soirée" ? (
                <img src={animationSoiree} alt={c.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              ) : c.label === "Speaker · Événementiel" ? (
                <img src={speakerEvenementiel} alt={c.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              ) : (
                <PhotoPlaceholder alt={c.label} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7))" }} />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  fontFamily: fontBody,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: `${COLORS.lin}B3`,
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "0.5rem",
                  right: "0.75rem",
                  fontFamily: fontBody,
                  fontSize: "10px",
                  color: "rgba(201,169,110,0.4)",
                }}
              >
                © Esther Coutin
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ALIGNEMENT LIMEN */}
      <section style={{ backgroundColor: COLORS.linFonce, padding: "6rem 5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Eyebrow>Pourquoi ce partenariat</Eyebrow>
          <h2
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.2,
              color: COLORS.texte,
              margin: "0 0 4rem 0",
              maxWidth: "32ch",
            }}
          >
            La voix qui porte
            <br />
            <em>le rite.</em>
          </h2>

          <div className="lc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: `${COLORS.or}33` }}>
            {[
              { label: "Ce que nous partageons", items: partages },
              { label: "Ce que cela change pour vous", items: change },
            ].map((col) => (
              <div key={col.label} style={{ backgroundColor: COLORS.lin, padding: "3rem" }}>
                <div
                  style={{
                    fontFamily: fontBody,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: COLORS.or,
                    marginBottom: "2rem",
                  }}
                >
                  {col.label}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {col.items.map((it) => (
                    <li
                      key={it}
                      style={{
                        fontFamily: fontBody,
                        fontWeight: 300,
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: COLORS.texte,
                      }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMMENT ÇA FONCTIONNE */}
      <section style={{ backgroundColor: COLORS.lin, padding: "6rem 5rem" }}>
        <div className="lc-comment" style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
          <div className="lc-comment-icon" style={{ display: "flex", justifyContent: "center" }}>
            <span aria-hidden style={{ fontFamily: fontTitle, fontSize: "80px", color: `${COLORS.or}40`, lineHeight: 1 }}>
              ⌐
            </span>
          </div>
          <div>
            <Eyebrow>Comment ça fonctionne</Eyebrow>
            <h3 style={{ fontFamily: fontTitle, fontWeight: 300, fontSize: "1.75rem", lineHeight: 1.4, color: COLORS.texte, margin: "0 0 2rem 0" }}>
              Chez Le Beau Mariage, vous ne gérez pas vos prestataires.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75, color: COLORS.texteLeger }}>
              <p>
                Esther est intégrée à votre journée avant même que vous arriviez au domaine.
                Son brief est coordonné avec le reste de l'équipe Limen, elle connaît le
                minutage, les moments clés, votre histoire.
              </p>
              <p>
                Avant votre mariage, un rendez-vous est organisé entre vous et Esther, en
                visio ou en présentiel. C'est le moment pour construire ensemble la cérémonie
                et l'animation qui vous ressemblent.
              </p>
              <p>
                Le jour J, vous traversez votre journée. Esther se charge du reste, avec la
                même fluidité que tout ce qui opère sous le seuil Limen.
              </p>
            </div>
            <div style={{ width: "32px", height: "1px", backgroundColor: COLORS.or, margin: "2.5rem 0" }} />
            <p style={{ fontFamily: fontTitle, fontStyle: "italic", fontWeight: 400, fontSize: "1.5rem", color: COLORS.texte, margin: 0 }}>
              Tout est déjà prêt.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section style={{ backgroundColor: COLORS.nuit, padding: "7rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div aria-hidden style={{ fontFamily: fontTitle, fontSize: "2.5rem", color: COLORS.or, marginBottom: "2rem", lineHeight: 1 }}>
            ⌐
          </div>
          <h2
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.15,
              color: COLORS.orPale,
              margin: "0 0 1rem 0",
            }}
          >
            Cinq mariages.
            <br />
            Cinq couples.
            <br />
            <em style={{ color: `${COLORS.or}80` }}>Octobre 2027.</em>
          </h2>
          <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "14px", color: `${COLORS.lin}80`, marginBottom: "3rem", letterSpacing: "0.08em" }}>
            Beaujolais · Domaine de la Croix Rochefort
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/contact"
              style={{
                backgroundColor: COLORS.or,
                color: COLORS.nuit,
                fontFamily: fontBody,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                padding: "1rem 2.5rem",
                borderRadius: 0,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Vérifier la disponibilité
            </Link>
            <Link
              to="/partenaires"
              style={{
                backgroundColor: "transparent",
                color: COLORS.or,
                border: `1px solid ${COLORS.or}59`,
                fontFamily: fontBody,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                padding: "1rem 2.5rem",
                borderRadius: 0,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Voir tous les partenaires
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer
        style={{
          backgroundColor: COLORS.nuit,
          borderTop: `1px solid ${COLORS.or}26`,
          padding: "2rem 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span aria-hidden style={{ color: COLORS.or, fontFamily: fontTitle, fontSize: "16px" }}>⌐</span>
          <span style={{ fontFamily: fontTitle, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: `${COLORS.lin}66` }}>
            Le Beau Mariage · par Limen
          </span>
        </div>
        <div style={{ fontFamily: fontTitle, fontStyle: "italic", fontSize: "13px", color: `${COLORS.or}66` }}>
          Le seuil, pas le spectacle.
        </div>
        <div style={{ fontFamily: fontBody, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: `${COLORS.lin}40` }}>
          Beaujolais · 2027
        </div>
      </footer>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .lc-hero { grid-template-columns: 1fr !important; min-height: auto !important; }
          .lc-hero > div:first-child { height: 50vw; }
          .lc-hero > div:last-child { padding: 3rem 1.5rem !important; }
          .lc-grid-2 { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .lc-services-grid { grid-template-columns: 1fr !important; }
          .lc-scenes { grid-template-columns: repeat(2, 1fr) !important; }
          .lc-scene-big { grid-column: 1 / -1 !important; }
          .lc-comment { grid-template-columns: 1fr !important; }
          .lc-comment-icon { display: none !important; }
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default EstherCoutin;
