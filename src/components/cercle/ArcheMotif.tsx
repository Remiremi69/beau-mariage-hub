// Motif d'arche partagé avec les pages /cercle/:slug (voir src/pages/CerclePublic.tsx),
// pour que la page marketing et les vraies pages de Cercle se sentent comme un seul univers.
const OR_DEFAULT = "#C8A96E";

const ArcheMotif = ({ color = OR_DEFAULT, className }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 400 260" className={className ?? "w-full h-auto"} aria-hidden="true">
    <path
      d="M 60 250 L 60 140 Q 60 40 200 40 Q 340 40 340 140 L 340 250"
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.7"
    />
    <path
      d="M 90 250 L 90 150 Q 90 70 200 70 Q 310 70 310 150 L 310 250"
      fill="none"
      stroke={color}
      strokeWidth="0.6"
      opacity="0.4"
    />
    <line x1="200" y1="90" x2="200" y2="250" stroke={color} strokeWidth="0.4" opacity="0.3" />
  </svg>
);

export default ArcheMotif;
