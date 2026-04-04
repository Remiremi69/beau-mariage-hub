type InfoButtonProps = {
  label: string;
  onClick: () => void;
};

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="7" cy="7" r="6" />
    <line x1="7" y1="6" x2="7" y2="10" />
    <circle cx="7" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const InfoButton = ({ label, onClick }: InfoButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center transition-colors duration-200"
      style={{
        gap: 8,
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        fontSize: 12,
        letterSpacing: "0.15em",
        color: "rgba(201,169,110,0.55)",
        cursor: "pointer",
        border: "none",
        background: "transparent",
        padding: "8px 0",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "rgba(201,169,110,0.90)";
        e.currentTarget.style.textDecoration = "underline";
        e.currentTarget.style.textUnderlineOffset = "3px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(201,169,110,0.55)";
        e.currentTarget.style.textDecoration = "none";
      }}
    >
      <InfoIcon />
      <span>{label}</span>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 14 }}>→</span>
    </button>
  );
};

export default InfoButton;
