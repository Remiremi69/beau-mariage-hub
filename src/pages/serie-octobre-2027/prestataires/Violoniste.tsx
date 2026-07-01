import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { schemaPrestataireBreadcrumb } from "@/lib/schemas";
import ConfigurateurCTA from "@/components/ConfigurateurCTA";

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

const Violoniste = () => {
  const partages = [
    "La conviction qu'une performance doit être au service de l'instant, jamais au-dessus",
    "Le refus du générique : chaque prestation est construite pour ce mariage précis",
    "La discrétion scénique — présent dans la salle, invisible dans l'organisation",
    "Une exigence de niveau international, appliquée au Beaujolais",
    "La capacité à travailler en coordination avec DJs, techniciens, coordinateurs",
  ];
  const change = [
    "Alexandre est briefé sur le déroulé Limen avant votre journée",
    "Ses interventions sont synchronisées avec le minutage global",
    "Zéro coordination à gérer — il connaît son rôle avant d'arriver",
    "Sa sélection est exigeante : il n'accepte que les projets qui lui correspondent",
    "Ce niveau de sélection, c'est votre garantie de qualité",
  ];

  const formats = [
    {
      n: "01",
      title: "Cérémonie",
      body: "L'entrée, les rituels, la sortie — chaque note accompagne l'émotion des mariés. Entièrement personnalisé selon votre histoire.",
      badge: "Sur sélection",
      image: "/images/alexandre-format-ceremonie.jpg",
    },
    {
      n: "02",
      title: "Cocktail",
      body: "Violon et improvisation mêlés à l'ambiance du moment. La performance s'adapte au lieu et à l'énergie de vos invités en temps réel.",
      badge: "Après entretien artistique",
      image: "/images/alexandre-format-cocktail.jpg",
    },
    {
      n: "03",
      title: "Soirée & First Dance",
      body: "Une création scénique sur mesure — danse, lumière et émotion. L'expérience se vit comme un spectacle pensé uniquement pour vous.",
      badge: "Sur étude de projet",
      image: "/images/alexandre-format-soiree.jpg",
    },
  ];

  const galerie = [
    { label: "Performance · Soirée", bg: "linear-gradient(135deg, #1a1a22, #0D0E12)", big: true },
    { label: "Cérémonie · Entrée", bg: "linear-gradient(135deg, #1c1a1a, #0D0E12)" },
    { label: "Lumière · Émotion", bg: "linear-gradient(135deg, #1a1c1a, #0D0E12)" },
    { label: "Duo · Scène", bg: "linear-gradient(135deg, #1a1a20, #0D0E12)" },
  ];

  return (
    <div style={{ backgroundColor: COLORS.lin, color: COLORS.texte, fontFamily: fontBody }}>
      <SEO
        title="Alexandre Medjaher Chomat — Violoniste & performer partenaire | Le Beau Mariage par Limen"
        description="Violoniste dansant et performer, Alexandre Medjaher Chomat signe les performances scéniques de la sélection Limen. Une scène vivante au cœur de votre mariage."
        canonical="https://lebeaumariage.fr/serie-octobre-2027/prestataires/violoniste"
        jsonLd={schemaPrestataireBreadcrumb("violoniste", "Musicien")}
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
          to="/series-2027"
          style={{
            fontFamily: fontBody,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: COLORS.texteLeger,
            textDecoration: "none",
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
          minHeight: "88vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div style={{ backgroundColor: COLORS.nuit, position: "relative", overflow: "hidden" }}>
          <img
            src="/images/alexandre-hero-portrait-montagne.jpg"
            alt="Alexandre Medjaher Chomat face à la montagne"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "12px",
              fontFamily: fontBody,
              fontWeight: 300,
              fontSize: "10px",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.5)",
            }}
          >
            © Alexandre Medjaher Chomat
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
          <Eyebrow>Violon & Performance · Partenaire Limen</Eyebrow>
          <h1
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              lineHeight: 1.0,
              color: COLORS.texte,
              margin: 0,
            }}
          >
            Alexandre
            <br />
            Medjaher Chomat
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
            Violoniste dansant · Performer
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
            Il ne joue pas de la musique. Il traverse la salle. Chaque performance d'Alexandre
            Medjaher Chomat est une scène vivante — violon, danse et émotion fusionnés en un
            seul instant que vos invités n'oublieront pas.
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
              { n: "+80", l: "Mariages" },
              { n: "4 continents", l: "France · Suisse · Dubai · USA" },
              { n: "Sur sélection", l: "Disponibilité" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: fontTitle, fontSize: "2rem", color: COLORS.or, lineHeight: 1.1 }}>
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

          <a
            href="https://alexandrechomat.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "2.5rem",
              fontFamily: fontBody,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: COLORS.or,
              textDecoration: "none",
              borderBottom: `1px solid ${COLORS.or}59`,
              paddingBottom: "0.25rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = COLORS.or;
              e.currentTarget.style.color = COLORS.texte;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = `${COLORS.or}59`;
              e.currentTarget.style.color = COLORS.or;
            }}
          >
            → Voir son univers
          </a>
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
              Fusionner violon,
              <br />
              <em>mouvement et émotion.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: `${COLORS.lin}B3`, fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75 }}>
              <p>
                Depuis plusieurs années, Alexandre a accompagné plus de 80 mariages en France,
                Suisse, Dubaï, Belgique et aux États-Unis — dans des domaines viticoles, hôtels
                de luxe, châteaux et jardins suspendus. Ce n'est pas un musicien d'ambiance.
                C'est un artiste de scène.
              </p>
              <p>
                Son concept est rare : violoniste et danseur à la fois, il propose des
                performances sur bandes-son électro, pop ou cinématiques, soigneusement
                orchestrées. Chaque passage devient une scène vivante, un fragment de rêve
                partagé avec les invités.
              </p>
              <p>
                Il a collaboré avec des maisons de prestige — Blandin & Delloye, Mercedes — et
                des wedding planners aux États-Unis. C'est cette exigence que Limen a reconnue.
              </p>
            </div>
          </div>
          <div style={{ borderLeft: `1px solid ${COLORS.or}`, paddingLeft: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ position: "relative", overflow: "hidden", width: "100%", aspectRatio: "3/4", marginBottom: "2.5rem" }}>
              <img
                src="/images/alexandre-philosophie-portrait-scene.jpg"
                alt="Alexandre Medjaher Chomat en scène"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "12px",
                  fontFamily: fontBody,
                  fontWeight: 300,
                  fontSize: "10px",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.5)",
                }}
              >
                © Alexandre Medjaher Chomat
              </div>
            </div>
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
              « Une performance émotionnelle — un moment suspendu dans le temps, qui restera
              gravé dans les mémoires. »
            </p>
            <a
              href="https://alexandrechomat.fr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "2rem",
                fontFamily: fontBody,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: `${COLORS.or}80`,
                textDecoration: "none",
                borderBottom: `1px solid ${COLORS.or}40`,
                paddingBottom: "0.15rem",
                display: "inline-block",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.or;
                e.currentTarget.style.borderBottomColor = COLORS.or;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = `${COLORS.or}80`;
                e.currentTarget.style.borderBottomColor = `${COLORS.or}40`;
              }}
            >
              alexandrechomat.fr
            </a>
          </div>
        </div>
      </section>

      {/* 4. FORMATS */}
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
            Trois moments.
            <br />
            <em>Un seul artiste.</em>
          </h2>
          <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75, color: COLORS.texteLeger, maxWidth: "58ch", marginBottom: "4rem" }}>
            Alexandre intervient à trois moments précis de votre journée — chacun avec une
            intention différente, une énergie différente. Chez Limen, les trois peuvent être
            mobilisés selon la formule choisie.
          </p>

          <div className="lc-approche" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", backgroundColor: `${COLORS.or}30` }}>
            {formats.map((a) => (
              <div key={a.n} style={{ backgroundColor: COLORS.linFonce, padding: "0", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", overflow: "hidden", width: "100%", aspectRatio: "4/3" }}>
                  <img
                    src={a.image}
                    alt={a.title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "12px",
                      fontFamily: fontBody,
                      fontWeight: 300,
                      fontSize: "10px",
                      textTransform: "uppercase",
                      color: "rgba(201,169,110,0.5)",
                    }}
                  >
                    © Alexandre Medjaher Chomat
                  </div>
                </div>
                <div style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ fontFamily: fontTitle, fontSize: "3.5rem", color: `${COLORS.or}4D`, lineHeight: 1, marginBottom: "1rem" }}>
                  {a.n}
                </div>
                <h3 style={{ fontFamily: fontTitle, fontWeight: 400, fontSize: "1.375rem", color: COLORS.texte, margin: "0 0 0.75rem 0" }}>
                  {a.title}
                </h3>
                <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "14px", lineHeight: 1.7, color: COLORS.texteLeger, margin: "0 0 1.5rem 0", flexGrow: 1 }}>
                  {a.body}
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: COLORS.or,
                      backgroundColor: `${COLORS.or}1A`,
                      padding: "0.4rem 0.75rem",
                    }}
                  >
                    {a.badge}
                  </span>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALERIE SCÉNIQUE */}
      <section style={{ backgroundColor: COLORS.nuit, padding: "5rem 0" }}>
        <div style={{ padding: "0 5rem", marginBottom: "3rem" }}>
          <Eyebrow opacity={0.6}>En scène</Eyebrow>
          <h2
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.15,
              color: COLORS.orPale,
              margin: 0,
            }}
          >
            Ce que les invités voient.
            <br />
            <em>Ce qu'ils ressentent.</em>
          </h2>
        </div>

        <div className="lc-scenes" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", backgroundColor: `${COLORS.or}26` }}>
          {/* Big card */}
          <div
            className="lc-scene-big"
            style={{
              gridColumn: "1 / -1",
              position: "relative",
              aspectRatio: "16/9",
              background: galerie[0].bg,
              overflow: "hidden",
            }}
          >
            <img src="/images/alexandre-performance-soiree.jpg" alt={galerie[0].label} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
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
          </div>

          {galerie.slice(1).map((c) => {
            const imgMap: Record<string, string> = {
              "Cérémonie · Entrée": "/images/alexandre-ceremonie-entree.jpg",
              "Lumière · Émotion": "/images/alexandre-lumiere-emotion.jpg",
              "Duo · Scène": "/images/alexandre-duo-scene.jpg",
            };
            const img = imgMap[c.label];
            return (
            <div key={c.label} style={{ position: "relative", aspectRatio: "4/5", background: c.bg, overflow: "hidden" }}>
              {img && <img src={img} alt={c.label} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />}
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
            </div>
          );})}
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
            L'art de disparaître
            <br />
            <em>dans le rite.</em>
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
                        display: "grid",
                        gridTemplateColumns: "20px 1fr",
                        gap: "0.75rem",
                        fontFamily: fontBody,
                        fontWeight: 300,
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: COLORS.texte,
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
                Alexandre est intégré à votre journée avant même que vous arriviez au domaine.
                Son brief artistique est coordonné avec le reste de l'équipe Limen — il connaît
                les moments clés, l'énergie souhaitée, vos morceaux.
              </p>
              <p>
                Le jour J, vous n'avez qu'une chose à faire : traverser votre journée.
                Alexandre se charge de créer les instants — avec la même précision que tout ce
                qui opère sous le seuil Limen.
              </p>
              <p>
                Sa prestation est incluse dans votre formule. Pas de négociation séparée, pas
                de contrat supplémentaire.
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

      <ConfigurateurCTA />

      {/* Responsive */}
<style>{`
        @media (max-width: 768px) {
          .lc-hero { grid-template-columns: 1fr !important; min-height: auto !important; }
          .lc-hero > div:first-child { height: 50vw; padding: 1.5rem !important; }
          .lc-hero > div:last-child { padding: 3rem 1.5rem !important; }
          .lc-grid-2 { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .lc-approche { grid-template-columns: 1fr !important; }
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

export default Violoniste;
