import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import djAstreviaPortrait from "@/assets/dj-astrevia-portrait.png";

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

const Eyebrow = ({ children, opacity = 1 }: { children: React.ReactNode; opacity?: number }) => (
 <div
 style={{
  fontFamily: fontBody,
  fontWeight: 400,
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: COLORS.or,
  opacity,
  marginBottom: "1.5rem",
 }}
 >
 {children}
 </div>
);

const DJ = () => {
 const partages = [
 "La conviction que l'ambiance se construit, elle ne se déroule pas",
 "Le refus du générique : une programmation unique pour chaque couple",
 "La discrétion technique présent partout, visible nulle part",
 "Un accompagnement humain et attentif, de la préparation au dernier instant",
 "La capacité à adapter l'énergie en temps réel selon vos invités",
 ];
 const change = [
 "Rémy et Jordan sont briefés sur le déroulé Limen avant votre journée",
 "La transition cocktail → dîner → soirée est coordonnée avec toute l'équipe",
 "Zéro coordination musicale à gérer ils connaissent leur rôle avant d'arriver",
 "Leurs effets sont dosés pour sublimer, jamais pour saturer",
 "Un duo fondateur pas un prestataire solo avec une présence et une sécurité techniques renforcées",
 ];

 const services: { icon: string; title: string; body: string; image?: string; imageAlt?: string; imagePosition?: string }[] = [
 {
  icon: "♫",
  title: "Son haut de gamme",
  body: "Sonorisation professionnelle adaptée à chaque lieu de la cérémonie intime à la grande salle de réception.",
  image: "/images/astrevia/platines-piste.jpg",
  imageAlt: "Régie DJ Pioneer XDJ-AZ devant une piste pleine en pleine soirée",
  imagePosition: "center",
 },
 {
  icon: "◈",
  title: "Fumée lourde",
  body: "Effet « danser sur les nuages » fumée basse au sol qui sublime l'ouverture de bal et les premiers instants en piste.",
  image: "/images/astrevia/fumee-lourde-piste.jpg",
  imageAlt: "Piste de danse traversée par une fumée lourde bleutée",
  imagePosition: "center",
 },
 {
  icon: "▣",
  title: "Étincelles froides",
  body: "Jets d'étincelles froides totalement sécurisés pour magnifier l'entrée des mariés ou l'ouverture de bal en intérieur comme en extérieur.",
  image: "/images/astrevia/etincelles-couple.jpg",
  imageAlt: "Couple de mariés entouré de jets d'étincelles froides",
  imagePosition: "center",
 },
 {
  icon: "◉",
  title: "DJ sur-mesure",
  body: "Une programmation personnalisée qui reflète vos goûts construite avec vous, ajustée en temps réel le jour J.",
  image: "/images/astrevia/salle-reception-bleue.jpg",
  imageAlt: "Salle de réception habillée en lumière bleue avec scène et initiales projetées",
  imagePosition: "center",
 },
 ];

 const univers = [
 {
  label: "Mariage",
  title: "Cérémonie · Cocktail · Soirée",
  body: "De l'ouverture de bal aux derniers instants une couverture complète avec un seul interlocuteur.",
 },
 {
  label: "Événement d'entreprise",
  title: "Gala · Séminaire · Inauguration",
  body: "L'exigence du monde professionnel, avec la créativité de l'événementiel premium.",
 },
 {
  label: "Spectacle & Création",
  title: "Production artistique",
  body: "Capables de produire des expériences scéniques complètes la preuve qu'ils pensent au-delà de la prestation.",
 },
 ];

 return (
 <div style={{ backgroundColor: COLORS.lin, color: COLORS.texte, fontFamily: fontBody }}>
  <SEO
  title="Astrévia Events DJ & animation partenaires | Le Beau Mariage par Limen"
  description="Rémy et Jordan d'Astrévia Events signent l'animation musicale de la sélection Limen. Son, lumière, effets et programmation sur-mesure pour votre mariage."
  canonical="https://lebeaumariage.fr/serie-octobre-2027/prestataires/dj"
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
   src="/images/astrevia/hero-danse-fumee.jpg"
   alt="Couple dansant entouré de fumée lourde, ambiance lumineuse Astrévia Events"
   style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
   />
   <div
   style={{
    position: "absolute",
    bottom: "1.5rem",
    left: "1.5rem",
    fontFamily: fontBody,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: `${COLORS.or}`,
    textShadow: "0 1px 4px rgba(0,0,0,0.6)",
   }}
   >
   © Astrévia Events
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
   <Eyebrow>DJ & Animation · Partenaire Limen</Eyebrow>
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
   Astrévia
   <br />
   Events
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
   Rémy & Jordan · Fondateurs & Gérants
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
   Rémy et Jordan ne se contentent pas d'animer. Ils créent une ambiance
   sur-mesure de la cérémonie à la dernière danse, avec la précision de deux
   professionnels investis qui savent que chaque instant mérite sa propre
   énergie.
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
    { n: "+15 ans", l: "Expérience" },
    { n: "Son · Lumière · Effets", l: "Équipement complet" },
    { n: "Sur-mesure", l: "Chaque événement" },
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
  </div>
  </section>

  {/* 3. PHILOSOPHIE */}
  <section style={{ backgroundColor: COLORS.nuit, padding: "7rem 5rem" }}>
  <div className="lc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", maxWidth: "1280px", margin: "0 auto" }}>
   <div>
   <Eyebrow opacity={0.6}>Leur approche</Eyebrow>
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
    Rien n'est standardisé.
    <br />
    <em>Chaque événement est une création.</em>
   </h2>
   <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: `${COLORS.lin}B3`, fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75 }}>
    <p>
    Depuis plus de 15 ans, Rémy et Jordan accompagnent particuliers et
    professionnels dans la réalisation d'événements uniques. Leur objectif est
    simple : transformer chaque instant en une expérience élégante, immersive et
    inoubliable.
    </p>
    <p>
    Chaque événement possède son identité. C'est pourquoi ils conçoivent une
    programmation musicale entièrement personnalisée, adaptée à vos goûts, à
    votre univers et à l'énergie que vous souhaitez transmettre à vos invités.
    </p>
    <p>
    Leur arsenal technique est complet sonorisation haut de gamme, éclairages
    pilotés par informatique, projection vidéo, étincelles froides, fumée lourde.
    Mais ce qui les distingue, c'est l'usage qu'ils en font : au service de
    l'émotion, jamais pour impressionner.
    </p>
    <p>
    De la préparation jusqu'au dernier instant, ils sont à vos côtés pour vous
    conseiller, vous guider et vous offrir une prestation à la hauteur de vos
    attentes, avec proximité, passion et exigence.
    </p>
    <p>
    Chez Astrévia Events, rien n'est laissé au hasard et rien n'est standardisé.
    Chaque prestation est imaginée comme une création unique, pensée dans les
    moindres détails afin de sublimer vos plus beaux moments.
    </p>
   </div>
   </div>
   <div style={{ borderLeft: `1px solid ${COLORS.or}`, paddingLeft: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
   <img
    src="/images/astrevia/scene-setup.jpg"
    alt="Scène complète Astrévia Events installée dans une salle de pierre"
    style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", marginBottom: "2rem" }}
   />
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
    « Choisir Astrévia Events, c'est bien plus que choisir une animation.
    C'est offrir à vos invités une expérience mémorable portée par des
    professionnels investis, créatifs et à l'écoute. »
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
    Astrévia Events
   </div>
   <p
    style={{
    marginTop: "1.5rem",
    fontFamily: fontBody,
    fontWeight: 300,
    fontSize: "13px",
    lineHeight: 1.7,
    color: `${COLORS.lin}66`,
    fontStyle: "italic",
    }}
   >
    Astrévia évoque les événements guidés par la voie des astres une vision
    poétique qui reflète leur volonté de faire de chaque célébration un moment
    hors du temps.
   </p>
   </div>
  </div>
  </section>

  {/* 4. SERVICES TECHNIQUES */}
  <section style={{ backgroundColor: COLORS.lin, padding: "6rem 5rem" }}>
  <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
   <Eyebrow>Leur équipement</Eyebrow>
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
   Tout le spectre.
   <br />
   <em>Aucun compromis.</em>
   </h2>
   <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75, color: COLORS.texteLeger, maxWidth: "58ch", marginBottom: "4rem" }}>
   Astrévia Events met en scène vos événements grâce à des équipements de qualité
   professionnelle et des effets visuels soigneusement pensés pour créer émotion,
   ambiance et intensité. Chez Limen, c'est leur capacité à doser chaque élément
   avec discernement qui a fait la différence.
   </p>

   <div className="lc-services" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", backgroundColor: `${COLORS.or}30` }}>
   {services.map((s) => (
    <div key={s.title} style={{ backgroundColor: COLORS.linFonce, display: "flex", flexDirection: "column" }}>
    {s.image && (
     <img
     src={s.image}
     alt={s.imageAlt || s.title}
     style={{ width: "100%", height: "160px", objectFit: "cover", objectPosition: s.imagePosition || "center", display: "block" }}
     />
    )}
    <div style={{ padding: "2rem 1.5rem" }}>
     <div style={{ fontFamily: fontTitle, fontSize: "2rem", color: COLORS.or, lineHeight: 1, marginBottom: "1rem" }}>
     {s.icon}
     </div>
     <h3 style={{ fontFamily: fontTitle, fontWeight: 400, fontSize: "1.25rem", color: COLORS.texte, margin: "0 0 0.75rem 0" }}>
     {s.title}
     </h3>
     <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.7, color: COLORS.texteLeger, margin: 0 }}>
     {s.body}
     </p>
    </div>
    </div>
   ))}
   </div>
  </div>
  </section>

  {/* 5. AU-DELÀ DU MARIAGE */}
  <section style={{ backgroundColor: COLORS.nuit, padding: "6rem 5rem" }}>
  <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
   <Eyebrow opacity={0.6}>Leur univers</Eyebrow>
   <h2
   style={{
    fontFamily: fontTitle,
    fontWeight: 300,
    fontSize: "clamp(2rem, 3.5vw, 3rem)",
    lineHeight: 1.15,
    color: COLORS.orPale,
    margin: "0 0 1.5rem 0",
   }}
   >
   Mariages. Galas.
   <br />
   <em>Spectacles.</em>
   </h2>
   <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75, color: `${COLORS.lin}B3`, maxWidth: "58ch", marginBottom: "4rem" }}>
   Astrévia Events ne se limite pas à l'animation de mariages. Ils produisent des
   spectacles comme « L'Onde des Arts », leur création scénique mêlant artistes,
   illusion et émotion. C'est cette capacité à penser l'événement comme une
   expérience complète qui les place dans une autre catégorie.
   </p>

   <div className="lc-univers" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
   {univers.map((u) => (
    <div
    key={u.title}
    style={{
     backgroundColor: "#1a1a22",
     border: `1px solid ${COLORS.or}26`,
     padding: "2.5rem 2rem",
     position: "relative",
    }}
    >
    {/* <img className="photo-placeholder" src="..." alt={u.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.2}} /> */}
    <div
     style={{
     fontFamily: fontBody,
     fontSize: "10px",
     textTransform: "uppercase",
     letterSpacing: "0.18em",
     color: `${COLORS.or}99`,
     marginBottom: "1rem",
     }}
    >
     {u.label}
    </div>
    <h3 style={{ fontFamily: fontTitle, fontWeight: 400, fontSize: "1.25rem", color: COLORS.orPale, margin: "0 0 1rem 0" }}>
     {u.title}
    </h3>
    <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "14px", lineHeight: 1.7, color: `${COLORS.lin}99`, margin: 0 }}>
     {u.body}
    </p>
    </div>
   ))}
   </div>
  </div>
  </section>

  {/* 5b. GALERIE */}
  <section style={{ backgroundColor: COLORS.linFonce, padding: "4rem 0" }}>
  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
   <span
   style={{
    fontFamily: fontBody,
    fontWeight: 400,
    fontSize: "11px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: COLORS.or,
   }}
   >
   Leurs soirées
   </span>
  </div>
  <div className="lc-galerie" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
   <img
   src="/images/astrevia/platines-piste.jpg"
   alt="Vue depuis les platines Pioneer sur une piste de danse bondée"
   style={{ width: "100%", height: "500px", objectFit: "cover", display: "block" }}
   />
   <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "2px" }}>
   <img
    src="/images/astrevia/etincelles-couple.jpg"
    alt="Couple de mariés entouré d'étincelles froides"
    style={{ width: "100%", height: "249px", objectFit: "cover", display: "block" }}
   />
   <img
    src="/images/astrevia/hero-danse-fumee.jpg"
    alt="Couple dansant dans la fumée lourde sous des lumières bleues"
    style={{ width: "100%", height: "249px", objectFit: "cover", display: "block" }}
   />
   </div>
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
    margin: "0 0 2rem 0",
    maxWidth: "32ch",
   }}
   >
   L'ambiance juste,
   <br />
   <em>au bon moment.</em>
   </h2>

   <img
   src="/images/astrevia/salle-reception-bleue.jpg"
   alt="Salle de réception dressée avec éclairage bleu mural Astrévia Events"
   style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "center", display: "block", marginBottom: "3rem" }}
   />

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
    Rémy et Jordan sont intégrés à votre journée avant même que vous arriviez au
    domaine. Leur brief musical est coordonné avec le reste de l'équipe Limen ils
    connaissent le minutage, les moments clés, vos incontournables et vos interdits.
    </p>
    <p>
    Le jour J, vous traversez votre journée. Astrévia Events se charge de
    l'atmosphère avec la même discrétion que tout ce qui opère sous le seuil
    Limen.
    </p>
    <p>
    Leur prestation est incluse dans votre formule. Pas de négociation séparée,
    pas de contrat supplémentaire, pas de playlist à rédiger à 23h.
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
   .lc-hero > div:first-child { height: 50vw; padding: 1.5rem !important; }
   .lc-hero > div:last-child { padding: 3rem 1.5rem !important; }
   .lc-grid-2 { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
   .lc-services { grid-template-columns: repeat(2, 1fr) !important; }
   .lc-galerie > img { height: 320px !important; }
   .lc-galerie > div > img { height: 159px !important; }
   .lc-univers { grid-template-columns: 1fr !important; }
   .lc-comment { grid-template-columns: 1fr !important; }
   .lc-comment-icon { display: none !important; }
   section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
  }
  `}</style>
 </div>
 );
};

export default DJ;
