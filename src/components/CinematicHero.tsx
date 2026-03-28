import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Diamond, Star } from "lucide-react";

const images = [
  "https://i.postimg.cc/5NHccFBF/54-domaine-de-lanbspcroixnbsprochefort.jpg",
  "https://i.postimg.cc/Y05dBj78/Domaine-de-la-Croix-Rochefort-mariage-saint-didier-sur-Beaujeu.jpg",
  "https://i.postimg.cc/5yVmsTSP/876-domaine-de-lanbspcroixnbsprochefort.jpg",
  "https://i.postimg.cc/x1YWXFrv/9-accueil-le-caveau.jpg",
];

const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.04, delay: delay + i * 0.03, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

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

  const promises = [
    { icon: Clock, title: "Tout est déjà sélectionné", desc: "Domaine, traiteur, photographe, DJ — nous avons fait le travail à votre place." },
    { icon: Diamond, title: "Prix connu immédiatement", desc: "Le prix s'affiche en temps réel. Pas de devis à attendre, pas de frais cachés." },
    { icon: Star, title: "Prestataires d'exception", desc: "Nous avons déjà sélectionné et validé les meilleurs talents pour votre grand jour." },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Parallax Background with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          className="absolute inset-0 z-0"
          style={{ y, scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center animate-kenburns"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-anthracite/50 via-anthracite/40 to-anthracite/70" />

      {/* Vignette effect */}
      <div className="absolute inset-0 z-[1]" style={{ boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.3)" }} />

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentImage ? "w-8 bg-primary" : "w-4 bg-card/40 hover:bg-card/60"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className="container mx-auto px-4 z-10 pt-20" style={{ opacity }}>
        {/* Main Title with letter animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-card drop-shadow-lg leading-tight">
            <AnimatedText text="Votre Mariage de Rêve." delay={0.3} />
            <br />
            <span className="text-primary">
              <AnimatedText text="Tout est déjà prêt pour vous." delay={1.2} />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-primary mb-4 max-w-3xl mx-auto drop-shadow-lg font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          Il ne reste qu'à choisir votre date.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-card/90 mb-10 max-w-3xl mx-auto drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          Domaine sélectionné. Prestataires validés. Prix transparent. C'est ça, Le Beau Mariage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          <Link to="/configurateur">
            <Button size="xl" variant="hero" className="font-semibold text-lg px-8">
              Voir les dates disponibles
            </Button>
          </Link>
          <Link to="/serie-octobre-2027">
            <Button size="xl" variant="elegant" className="font-semibold text-lg px-8">
              Voir la Série Actuelle
            </Button>
          </Link>
        </motion.div>

        {/* 3 Promises */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {promises.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-card/20 hover:bg-card/20 transition-colors duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 3.5 + index * 0.15 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card mb-2">{item.title}</h3>
                <p className="text-card/80 text-sm">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
