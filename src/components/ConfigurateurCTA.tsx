import { Link } from "react-router-dom";

const ConfigurateurCTA = ({ background = "#F5F0E8" }: { background?: string }) => (
  <section className="py-12" style={{ backgroundColor: background }}>
    <div className="container mx-auto px-4 flex justify-center">
      <Link to="/configurateur">
        <button
          style={{
            backgroundColor: "#C9A96E",
            color: "#0D0E12",
            borderRadius: 0,
            fontFamily: "'Jost', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: "18px 48px",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Configurer mon mariage →
        </button>
      </Link>
    </div>
  </section>
);

export default ConfigurateurCTA;
