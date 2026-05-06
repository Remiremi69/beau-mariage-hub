import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

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

const Eyebrow = ({ children, color = COLORS.or, opacity = 1 }: { children: React.ReactNode; color?: string; opacity?: number }) => (
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

const Star = () => (
  <span
    aria-hidden
    style={{
      display: "inline-block",
      width: "10px",
      height: "10px",
      backgroundColor: COLORS.or,
      clipPath:
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      marginRight: "3px",
    }}
  />
);

const Photographe = () => {
  const partages = [
    "La conviction que l'image juste capture une présence, pas une performance",
    "Une approche documentaire, observer, ne pas diriger",
    "Le refus du cliché : pas de pose figée, pas de décor artificiel",
    "La discrétion comme mode opératoire le jour J",
    "La rigueur d'un artisan sur chaque détail livré",
  ];
  const change = [
    "Loïc est briefé sur la philosophie Limen avant chaque mariage",
    "Il connaît le déroulé exact, pas de coordination à gérer pour vous",
    "Ses images racontent le rite, pas la logistique",
    "La livraison est intégrée au Registre Limen de votre journée",
    "Un prestataire de moins à chercher, à comparer, à briefer",
  ];
  const temoignages = [
    {
      quote:
        "Loïc a su capturer chaque émotion sans jamais s'imposer. Nos photos racontent vraiment notre journée, pas une mise en scène.",
      author: "Philippe & Marie, Ain",
    },
    {
      quote:
        "Un regard d'une justesse rare. Les images nous bouleversent encore aujourd'hui, c'est exactement ce que nous avons vécu.",
      author: "Clémence & Thomas, Rhône",
    },
    {
      quote:
        "Discret, précis, profondément humain. Le film de notre mariage est devenu un objet précieux que nous regardons souvent.",
      author: "Aurélie & Baptiste, Beaujolais",
    },
    {
      quote:
        "Nous cherchions quelqu'un capable de raconter, pas seulement de photographier. Loïc a fait bien plus encore.",
      author: "Inès & Julien, Ain",
    },
  ];

  const approches = [
    {
      n: "01",
      title: "Reportage intégral",
      body: "De l'habillage à la dernière danse, couverture continue, sans interruption, pour saisir chaque moment du seuil.",
    },
    {
      n: "02",
      title: "Séance couple",
      body: "Avant, pendant ou après le mariage, un temps suspendu à deux, dans la lumière du Beaujolais.",
    },
    {
      n: "03",
      title: "Film de mariage",
      body: "Vidéo disponible en complément, un film court, narratif, qui prolonge l'émotion du jour J.",
    },
  ];

  return (
    <div style={{ backgroundColor: COLORS.lin, color: COLORS.texte, fontFamily: fontBody }}>
      <SEO
        title="Loïc Cancade, Photographe & vidéaste partenaire | Le Beau Mariage par Limen"
        description="Photographe & vidéaste de mariage en Beaujolais, Loïc Cancade signe les images de la sélection Limen. Reportage documentaire, regard juste, sans pose."
        canonical="https://lebeaumariage.fr/serie-octobre-2027/prestataires/photographe"
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
          to="/partenaires"
          style={{
            fontFamily: fontBody,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: COLORS.texteLeger,
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.or)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.texteLeger)}
        >
          ← Nos partenaires
        </Link>
      </nav>

      {/* 2. HERO */}
      <section
        className="lc-hero"
        style={{
          marginTop: "64px",
          minHeight: "calc(88vh)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.nuit,
            position: "relative",
            overflow: "hidden",
            padding: "3rem",
          }}
        >
          <img
            src="/images/loic-hero-contrejour-coucher-soleil.jpg"
            alt="Loïc Cancade, mariage à contre-jour au coucher de soleil"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: "3rem",
              border: `1px solid ${COLORS.or}33`,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: fontTitle,
              fontSize: "180px",
              color: COLORS.or,
              opacity: 0.06,
              lineHeight: 1,
            }}
          >
            ⌐
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              fontFamily: fontBody,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: `${COLORS.or}80`,
            }}
          >
            © Loïc Cancade · Beaujolais
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
          <Eyebrow>Photographie & Vidéo · Partenaire Limen</Eyebrow>
          <h1
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(3rem, 6vw, 4.5rem)",
              lineHeight: 1.0,
              color: COLORS.texte,
              margin: 0,
            }}
          >
            Loïc
            <br />
            Cancade
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
            Photographe & vidéaste de mariage
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
            Loïc photographie les mariages comme on raconte une histoire, sans pose, sans
            mise en scène. Une lecture documentaire de votre journée, ancrée dans la lumière
            naturelle du Beaujolais.
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
              { n: "4,9", l: "Note / 5" },
              { n: "+8", l: "Reportages publiés" },
              { n: "Ain · Rhône", l: "Région" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: fontTitle, fontSize: "2rem", color: COLORS.or, lineHeight: 1 }}>
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
            <Eyebrow opacity={0.6}>Sa philosophie</Eyebrow>
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
              Chaque photo doit
              <br />
              <em>délivrer un message.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: `${COLORS.lin}B3`, fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75 }}>
              <p>
                Pour Loïc, photographier un mariage n'est pas un exercice technique : c'est une
                lecture. Lire les regards, les silences, les gestes qui ne se rejouent pas.
              </p>
              <p>
                Son travail s'inscrit dans une tradition documentaire, le contraire de la pose.
                Il observe, attend, et laisse la journée se déployer telle qu'elle est.
              </p>
              <p>
                Le résultat : des images qui ne ressemblent à aucune autre, parce qu'elles ne
                ressemblent qu'à vous.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <img
              src="/images/loic-philosophie-mariee-escalier-nb.jpg"
              alt="Mariée dans l'escalier, noir et blanc, Loïc Cancade"
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center", marginBottom: "2rem", display: "block" }}
            />
            <div style={{ borderLeft: `1px solid ${COLORS.or}`, paddingLeft: "2.5rem" }}>
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
              « Plus qu'un simple reportage, Loïc crée un souvenir intemporel, un mariage
              capturé comme un film que l'on a envie de revivre encore et encore. »
            </p>
            <div
              style={{
                marginTop: "2rem",
                fontFamily: fontBody,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: `${COLORS.or}80`,
              }}
            >
              Mariages.net · Avis client
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STYLE */}
      <section style={{ backgroundColor: COLORS.lin, padding: "6rem 5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Eyebrow>Son style</Eyebrow>
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
            Trois registres.
            <br />
            <em>Un regard cohérent.</em>
          </h2>
          <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75, color: COLORS.texteLeger, maxWidth: "58ch", marginBottom: "4rem" }}>
            Lumière naturelle, portraits nocturnes, instants volés, trois manières de regarder
            une journée qui composent ensemble une narration cohérente, fidèle à votre vérité.
          </p>

          <div
            className="lc-gallery"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              backgroundColor: `${COLORS.or}40`,
              marginBottom: "3rem",
            }}
          >
            {[
              { label: "Lumière naturelle", src: "/images/loic-style-lumiere-naturelle-porte.jpg", pos: "center" },
              { label: "Portraits nocturnes", src: "/images/loic-style-nocturne-champagne.jpg", pos: "center top" },
              { label: "Instants de vie", src: "/images/loic-style-instant-fumigenes.jpg", pos: "center" },
            ].map((c) => (
              <div key={c.label} className="lc-style-card" style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", backgroundColor: COLORS.nuit }}>
                <img
                  src={c.src}
                  alt={c.label}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: c.pos }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7))",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.25rem",
                    left: "1.25rem",
                    fontFamily: fontBody,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: `${COLORS.lin}CC`,
                  }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          {/* GALERIE, son regard */}
          <div style={{ paddingTop: "4rem" }}>
            <div
              style={{
                fontFamily: fontBody,
                fontWeight: 400,
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.or,
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Son regard
            </div>
            <div
              className="lc-galerie"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                backgroundColor: "rgba(201,169,110,0.15)",
                marginBottom: "3rem",
              }}
            >
              <div className="lc-galerie-tall" style={{ position: "relative", overflow: "hidden", gridRow: "span 2", minHeight: "500px" }}>
                <img
                  src="/images/loic-galerie-drone-cercle.jpg"
                  alt="Vue drone, cercle de mariage"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
                <span style={{ position: "absolute", bottom: "8px", right: "12px", fontFamily: fontBody, fontWeight: 300, fontSize: "10px", textTransform: "uppercase", color: "rgba(201,169,110,0.5)" }}>
                  © Loïc Cancade
                </span>
              </div>
              <div className="lc-galerie-cell" style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src="/images/loic-galerie-fleurs-rouges.jpg"
                  alt="Fleurs rouges, détail"
                  style={{ width: "100%", height: "245px", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
                <span style={{ position: "absolute", bottom: "8px", right: "12px", fontFamily: fontBody, fontWeight: 300, fontSize: "10px", textTransform: "uppercase", color: "rgba(201,169,110,0.5)" }}>
                  © Loïc Cancade
                </span>
              </div>
              <div className="lc-galerie-cell" style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src="/images/loic-galerie-danse-lumiere.jpg"
                  alt="Danse dans la lumière"
                  style={{ width: "100%", height: "245px", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
                <span style={{ position: "absolute", bottom: "8px", right: "12px", fontFamily: fontBody, fontWeight: 300, fontSize: "10px", textTransform: "uppercase", color: "rgba(201,169,110,0.5)" }}>
                  © Loïc Cancade
                </span>
              </div>
            </div>
          </div>

          <div className="lc-approche" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", backgroundColor: `${COLORS.or}30` }}>
            {approches.map((a) => (
              <div key={a.n} style={{ backgroundColor: COLORS.linFonce, padding: "2.5rem 2rem" }}>
                <div style={{ fontFamily: fontTitle, fontSize: "3.5rem", color: `${COLORS.or}4D`, lineHeight: 1, marginBottom: "1rem" }}>
                  {a.n}
                </div>
                <h3 style={{ fontFamily: fontTitle, fontWeight: 400, fontSize: "1.375rem", color: COLORS.texte, margin: "0 0 0.75rem 0" }}>
                  {a.title}
                </h3>
                <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "14px", lineHeight: 1.7, color: COLORS.texteLeger, margin: 0 }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ALIGNEMENT LIMEN */}
      <section style={{ backgroundColor: COLORS.nuit, padding: "7rem 5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Eyebrow opacity={0.6}>Pourquoi ce partenariat</Eyebrow>
          <h2
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.2,
              color: COLORS.orPale,
              margin: "0 0 4rem 0",
              maxWidth: "32ch",
            }}
          >
            Nous ne travaillons qu'avec
            <br />
            <em>des artisans qui comprennent le seuil.</em>
          </h2>

          <div className="lc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: `${COLORS.or}26` }}>
            {[
              { label: "Ce que nous partageons", items: partages },
              { label: "Ce que cela change pour vous", items: change },
            ].map((col) => (
              <div key={col.label} style={{ backgroundColor: COLORS.nuit, padding: "3rem" }}>
                <div
                  style={{
                    fontFamily: fontBody,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: `${COLORS.or}99`,
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
                        display: "grid",
                        gridTemplateColumns: "20px 1fr",
                        gap: "0.75rem",
                        fontFamily: fontBody,
                        fontWeight: 300,
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: `${COLORS.lin}CC`,
                      }}
                    >
                      <span style={{ color: COLORS.or, lineHeight: 1.7 }}>—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TÉMOIGNAGES */}
      <section style={{ backgroundColor: COLORS.linFonce, padding: "6rem 5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Eyebrow>Ce que disent les couples</Eyebrow>
          <h2
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.15,
              color: COLORS.texte,
              margin: "0 0 4rem 0",
            }}
          >
            Quatre virgule neuf.
            <br />
            <em>Sur cinq.</em>
          </h2>

          <div className="lc-temoignages" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", backgroundColor: `${COLORS.or}26` }}>
            {temoignages.map((t) => (
              <div key={t.author} style={{ backgroundColor: COLORS.lin, padding: "3rem" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: fontTitle,
                    fontStyle: "italic",
                    fontSize: "1.1875rem",
                    lineHeight: 1.6,
                    color: COLORS.texte,
                    margin: "0 0 1.5rem 0",
                  }}
                >
                  « {t.quote} »
                </p>
                <div
                  style={{
                    fontFamily: fontBody,
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: COLORS.texteLeger,
                  }}
                >
                  {t.author}
                </div>
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
                Loïc fait partie de la sélection Limen. Il est briefé, coordonné, intégré au
                déroulé de votre journée par notre équipe, vous n'avez aucune négociation à
                mener, aucun contrat séparé à signer.
              </p>
              <p>
                Le jour J, il connaît le timing exact, la philosophie de la maison, et les
                moments clés à capter. Sa présence est invisible, son travail est précis.
              </p>
              <p>
                À la livraison, ses images rejoignent votre Registre Limen, accessibles à vie,
                organisées, prêtes à être partagées.
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

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .lc-hero { grid-template-columns: 1fr !important; min-height: auto !important; }
          .lc-hero > div:first-child { height: 50vw; padding: 1.5rem !important; }
          .lc-hero > div:last-child { padding: 3rem 1.5rem !important; }
          .lc-grid-2 { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .lc-gallery { grid-template-columns: repeat(2, 1fr) !important; }
          .lc-gallery > div:nth-child(3) { grid-column: span 2; }
          .lc-galerie { grid-template-columns: 1fr !important; }
          .lc-galerie-tall { grid-row: auto !important; min-height: 260px !important; }
          .lc-galerie-tall img, .lc-galerie-cell img { height: 260px !important; }
          .lc-approche { grid-template-columns: 1fr !important; }
          .lc-temoignages { grid-template-columns: 1fr !important; }
          .lc-comment { grid-template-columns: 1fr !important; }
          .lc-comment-icon { display: none !important; }
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Photographe;
