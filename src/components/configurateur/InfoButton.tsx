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
      data-cursor-hover
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: "'Jost', sans-serif",
        fontWeight: 300,
        fontSize: 11,
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: 'rgba(201,169,110,0.85)',
        cursor: 'pointer',
        border: '1px solid rgba(201,169,110,0.35)',
        background: 'rgba(201,169,110,0.06)',
        padding: '10px 20px',
        borderRadius: 1,
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(201,169,110,0.12)';
        e.currentTarget.style.borderColor = 'rgba(201,169,110,0.65)';
        e.currentTarget.style.color = 'rgba(201,169,110,1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(201,169,110,0.06)';
        e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)';
        e.currentTarget.style.color = 'rgba(201,169,110,0.85)';
      }}
    >
      <InfoIcon />
      <span>{label}</span>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 14,
        opacity: 0.70,
      }}>→</span>
    </button>
  );
};

export default InfoButton;
