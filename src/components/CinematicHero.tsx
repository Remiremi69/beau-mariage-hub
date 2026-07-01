import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const images = [
  "https://i.postimg.cc/5NHccFBF/54-domaine-de-lanbspcroixnbsprochefort.jpg",
  "https://i.postimg.cc/Y05dBj78/Domaine-de-la-Croix-Rochefort-mariage-saint-didier-sur-Beaujeu.jpg",
  "https://i.postimg.cc/5yVmsTSP/876-domaine-de-lanbspcroixnbsprochefort.jpg",
  "https://i.postimg.cc/x1YWXFrv/9-accueil-le-caveau.jpg",
];

const CinematicHero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Crossfade Background with Ken Burns */}
      {images.map((img, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 z-0"
          style={{ y, scale }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              animation: index === currentImage ? "kenburns 8s ease-out forwards" : "none",
            }}
          />
        </motion.div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(0,0,0,0.5)" }} />

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentImage ? "w-8 bg-[#C9A96E]" : "w-4 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className="container mx-auto px-4 z-10 flex flex-col items-center" style={{ opacity }}>
        {/* Surtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: "11px",
            color: "#A0998A",
            marginBottom: "16px",
          }}
        >
          MARIAGE CLÉ-EN-MAIN · BEAUJOLAIS · 2027
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "48px",
            fontWeight: 400,
            color: "#F5F0E8",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Le seuil, pas le spectacle.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "28px",
            color: "#C9A96E",
          }}
        >
          Tout est déjà prêt.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          style={{ marginTop: "32px" }}
        >
          <Link
            to="/serie-octobre-2027"
            style={{
              display: "inline-block",
              background: "#C9A96E",
              color: "#0D0E12",
              borderRadius: 0,
              padding: "16px 36px",
              fontFamily: "'Jost', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            VOIR LES SÉRIES 2027 EN COURS →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
