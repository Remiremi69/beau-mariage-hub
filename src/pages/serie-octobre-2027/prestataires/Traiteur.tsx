import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { schemaPrestataireBreadcrumb } from "@/lib/schemas";
import jjTraiteurPortrait from "@/assets/jj-traiteur-portrait.png";

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

// Contenu éditable — à mettre à jour après RDV J & J Traiteur
const PHILOSOPHIE_PARAGRAPHES = [
  "J & J Traiteur est né d'une conviction simple : la gastronomie de mariage mérite le même niveau d'exigence que la grande cuisine. Leurs fondateurs ont été formés dans des maisons qui ne font pas de concessions — la Têtedoie à Lyon, La Mère Brazier, Les Toques Blanches.",
  "Ce parcours se lit dans chaque assiette : des bases techniques irréprochables, une maîtrise des produits, et le refus des compromis qui transforment un repas de mariage en restauration collective habillée.",
  "Leur spécialité, c'est le sur-mesure véritable — pas un menu « personnalisé » dans une liste de trois options, mais une construction de A à Z autour de vos goûts, de la saison, du lieu et du nombre de couverts.",
];

const REFERENCES = [
  { n: "01", nom: "La Têtedoie", ville: "Lyon", body: "Une maison lyonnaise de tradition — école de rigueur sur les produits du terroir et la précision de l'exécution." },
  { n: "02", nom: "La Mère Brazier", ville: "Lyon", body: "Institution de la cuisine lyonnaise, deux étoiles Michelin — formation à l'exigence absolue du produit et du geste." },
  { n: "03", nom: "Les Toques Blanches", ville: "Rhône-Alpes", body: "Confrérie des chefs de la région — appartenance à un réseau d'excellence gastronomique reconnu." },
];

const PRESTATIONS = [
  { label: "Cocktail", title: "Vin d'honneur", body: "Bouchées, verrines, pièces cocktail — une introduction qui donne le ton du repas à venir." },
  { label: "Dîner assis", title: "Menu gastronomique", body: "De l'entrée au dessert, un repas composé autour de vos goûts et des produits de saison." },
  { label: "Pièce montée", title: "Dessert de cérémonie", body: "Réalisée par leurs soins — pas sous-traitée. La pièce montée fait partie du menu, pas à côté." },
  { label: "Minuit", title: "Table sucrée & salée", body: "Pour terminer la nuit — une sélection pensée pour un moment de convivialité, pas une afterthought." },
];

const PARTAGES = [
  "La conviction que manger bien est une forme de présence — pas une obligation logistique",
  "Le refus du menu catalogue : chaque proposition est construite pour ce mariage précis",
  "Une exigence sur les produits qui ne négocie pas avec le budget",
  "La discrétion du service — les invités doivent se souvenir du repas, pas du service",
  "Une formation aux grandes maisons qui se lit dans l'assiette",
];

const CHANGE = [
  "Le menu est construit avec vous lors d'un rendez-vous dédié, bien avant le jour J",
  "Aucune coordination traiteur à gérer — ils travaillent dans le cadre Limen",
  "Les timings de service sont intégrés au déroulé global de votre journée",
  "Une dégustation est organisée avant signature — vous savez ce que vous servez",
  "Un traiteur de moins à chercher, comparer, briefer, relancer",
];

const Traiteur = () => {
  return (
    <div style={{ backgroundColor: COLORS.lin, color: COLORS.texte, fontFamily: fontBody }}>
      <SEO
        title="J & J Traiteur — Traiteur partenaire | Le Beau Mariage par Limen"
        description="Traiteur de mariage en Beaujolais, formé dans les grandes maisons lyonnaises. J & J Traiteur signe la gastronomie de la sélection Limen — sur-mesure, sans compromis."
        canonical="https://lebeaumariage.fr/serie-octobre-2027/prestataires/traiteur"
        jsonLd={schemaPrestataireBreadcrumb("traiteur", "Traiteur")}
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
            src={jjTraiteurPortrait}
            alt="Jessica et Jérôme, fondateurs de J&J Traiteur, en tabliers J&J dans une salle voûtée éclairée à la bougie"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
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
              color: `${COLORS.or}80`,
            }}
          >
            © J & J Traiteur · Beaujolais
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
          <Eyebrow>Gastronomie · Partenaire Limen</Eyebrow>
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
            J & J
            <br />
            Traiteur
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
            Traiteur de mariage · Cuisine de tradition
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
            Ils ne dressent pas un buffet. Ils composent un repas — chaque plat pensé pour le
            moment où il sera servi, chaque accord construit autour de ce que vous voulez que
            vos invités ressentent à table.
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
              { n: "Grands restaurants", l: "Formation" },
              { n: "Sur-mesure", l: "Chaque menu" },
              { n: "Mariages · Réceptions", l: "Spécialités" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: fontTitle, fontSize: "1.5rem", color: COLORS.or, lineHeight: 1.2 }}>
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
            <Eyebrow opacity={0.6}>Leur parcours</Eyebrow>
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
              Une cuisine formée
              <br />
              <em>dans les grandes maisons.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: `${COLORS.lin}B3`, fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75 }}>
              {PHILOSOPHIE_PARAGRAPHES.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
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
              « Des prestations sur mesure pour faire de votre événement un moment unique. »
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
              J & J Traiteur
            </div>
          </div>
        </div>
      </section>

      {/* 4. RÉFÉRENCES */}
      <section style={{ backgroundColor: COLORS.lin, padding: "5rem 5rem 3rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Eyebrow>Leur formation</Eyebrow>
          <h2
            style={{
              fontFamily: fontTitle,
              fontWeight: 300,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.15,
              color: COLORS.texte,
              margin: "0 0 3rem 0",
            }}
          >
            Les maisons
            <br />
            <em>qui les ont construits.</em>
          </h2>

          <div className="lc-references" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", backgroundColor: `${COLORS.or}30` }}>
            {REFERENCES.map((r) => (
              <div key={r.n} style={{ backgroundColor: COLORS.linFonce, padding: "2.5rem 2rem" }}>
                <div style={{ fontFamily: fontTitle, fontSize: "3.5rem", color: `${COLORS.or}4D`, lineHeight: 1, marginBottom: "1rem" }}>
                  {r.n}
                </div>
                <h3 style={{ fontFamily: fontTitle, fontWeight: 400, fontSize: "1.375rem", color: COLORS.texte, margin: "0 0 0.25rem 0" }}>
                  {r.nom}
                </h3>
                <div style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: COLORS.texteLeger, marginBottom: "1rem" }}>
                  {r.ville}
                </div>
                <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "0.9375rem", lineHeight: 1.7, color: COLORS.texteLeger, margin: 0 }}>
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRESTATIONS */}
      <section style={{ backgroundColor: COLORS.lin, padding: "0 5rem 6rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Eyebrow>Leurs formules</Eyebrow>
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
            Du cocktail
            <br />
            <em>à la dernière bouchée.</em>
          </h2>
          <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "15px", lineHeight: 1.75, color: COLORS.texteLeger, maxWidth: "58ch", marginBottom: "4rem" }}>
            J & J Traiteur intervient sur l'ensemble du temps de table de votre journée — du
            vin d'honneur au dessert de minuit. Chaque séquence est construite indépendamment,
            avec sa propre logique gustative.
          </p>

          <div className="lc-prestations" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", backgroundColor: `${COLORS.or}30` }}>
            {PRESTATIONS.map((p) => (
              <div key={p.title} style={{ backgroundColor: COLORS.linFonce, padding: "2rem 1.5rem", position: "relative" }}>
                {/* <img className="photo-placeholder" src="..." alt={p.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.15}} /> */}
                <div
                  style={{
                    fontFamily: fontBody,
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: `${COLORS.or}99`,
                    marginBottom: "0.75rem",
                  }}
                >
                  {p.label}
                </div>
                <h3 style={{ fontFamily: fontTitle, fontWeight: 400, fontSize: "1.25rem", color: COLORS.texte, margin: "0 0 0.75rem 0" }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: fontBody, fontWeight: 300, fontSize: "14px", lineHeight: 1.7, color: COLORS.texteLeger, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ALIGNEMENT LIMEN */}
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
              maxWidth: "36ch",
            }}
          >
            On ne franchit un seuil
            <br />
            <em>que si la table est à la hauteur.</em>
          </h2>

          <div className="lc-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: `${COLORS.or}26` }}>
            {[
              { label: "Ce que nous partageons", items: PARTAGES },
              { label: "Ce que cela change pour vous", items: CHANGE },
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
                        color: `${COLORS.lin}BF`,
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
                J & J Traiteur est intégré à votre journée avant même que vous arriviez au
                domaine. Leur brief est coordonné avec le reste de l'équipe Limen — ils
                connaissent le minutage, les contraintes du lieu, vos allergies et vos
                préférences.
              </p>
              <p>
                Le jour J, vous vous asseyez à table. J & J se charge du reste — avec la même
                exigence silencieuse que tout ce qui opère sous le seuil Limen.
              </p>
              <p>
                Leur prestation est incluse dans votre formule. Pas de devis séparé, pas de
                réunion traiteur à 19h un mardi, pas de relance pour les choix de menu trois
                semaines avant le mariage.
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
          .lc-references { grid-template-columns: 1fr !important; }
          .lc-prestations { grid-template-columns: repeat(2, 1fr) !important; }
          .lc-comment { grid-template-columns: 1fr !important; }
          .lc-comment-icon { display: none !important; }
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Traiteur;
