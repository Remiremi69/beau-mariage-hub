import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VENUE_IMAGE =
  "https://i.postimg.cc/Y05dBj78/Domaine-de-la-Croix-Rochefort-mariage-saint-didier-sur-Beaujeu.jpg";

const NUIT = "#1A1814";
const LIN = "#F5F0E8";
const OR = "#C8A96E";

// Smooth lerp utility
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface DoorPanelProps {
  side: "left" | "right";
  openAmount: number; // 0..1
}

const DoorPanel = ({ side, openAmount }: DoorPanelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetAngle = (side === "left" ? -1 : 1) * (Math.PI / 2) * openAmount;
  // Hinge offset: pivot at outer edge
  const hingeX = side === "left" ? -1.5 : 1.5;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = lerp(
      groupRef.current.rotation.y,
      targetAngle,
      0.08
    );
  });

  return (
    <group ref={groupRef} position={[hingeX, 0, 0]}>
      {/* Panel offset so it extends inward from hinge */}
      <group position={[side === "left" ? 1.5 : -1.5, 0, 0]}>
        {/* Main wood panel */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 4, 0.12]} />
          <meshStandardMaterial
            color="#2a1f17"
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>

        {/* Gold trim — outer frame (front face) */}
        {[
          { pos: [0, 1.9, 0.07] as const, size: [1.4, 0.05, 0.02] as const },
          { pos: [0, -1.9, 0.07] as const, size: [1.4, 0.05, 0.02] as const },
          {
            pos: [side === "left" ? -0.7 : 0.7, 0, 0.07] as const,
            size: [0.05, 3.8, 0.02] as const,
          },
          {
            pos: [side === "left" ? 0.7 : -0.7, 0, 0.07] as const,
            size: [0.05, 3.8, 0.02] as const,
          },
        ].map((t, i) => (
          <mesh key={i} position={t.pos as unknown as [number, number, number]}>
            <boxGeometry args={t.size as unknown as [number, number, number]} />
            <meshStandardMaterial
              color={OR}
              metalness={0.85}
              roughness={0.25}
              emissive={OR}
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}

        {/* Inner panel rectangle (decorative) */}
        <mesh position={[0, 0.5, 0.075]}>
          <boxGeometry args={[1.0, 1.6, 0.02]} />
          <meshStandardMaterial color="#1a1209" roughness={0.9} />
        </mesh>
        <mesh position={[0, -1.1, 0.075]}>
          <boxGeometry args={[1.0, 1.0, 0.02]} />
          <meshStandardMaterial color="#1a1209" roughness={0.9} />
        </mesh>

        {/* Door handle */}
        <mesh
          position={[side === "left" ? 0.55 : -0.55, -0.2, 0.18]}
          castShadow
        >
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={OR}
            metalness={0.95}
            roughness={0.15}
            emissive={OR}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
};

const DoorFrame = () => {
  return (
    <group>
      {/* Top lintel */}
      <mesh position={[0, 2.15, -0.05]}>
        <boxGeometry args={[3.4, 0.3, 0.3]} />
        <meshStandardMaterial
          color={OR}
          metalness={0.7}
          roughness={0.35}
          emissive={OR}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Sides */}
      <mesh position={[-1.65, 0, -0.05]}>
        <boxGeometry args={[0.3, 4.6, 0.3]} />
        <meshStandardMaterial
          color={OR}
          metalness={0.7}
          roughness={0.35}
          emissive={OR}
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[1.65, 0, -0.05]}>
        <boxGeometry args={[0.3, 4.6, 0.3]} />
        <meshStandardMaterial
          color={OR}
          metalness={0.7}
          roughness={0.35}
          emissive={OR}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Threshold */}
      <mesh position={[0, -2.15, -0.05]}>
        <boxGeometry args={[3.4, 0.2, 0.3]} />
        <meshStandardMaterial color="#2a1f17" roughness={0.8} />
      </mesh>
    </group>
  );
};

interface DoorSceneProps {
  openAmount: number;
}

const DoorScene = ({ openAmount }: DoorSceneProps) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={0.9} castShadow />
      <pointLight position={[0, 2, 2]} intensity={0.6} color={OR} />
      {/* Warm glow from behind the door, intensifying as it opens */}
      <pointLight
        position={[0, 0, -2]}
        intensity={1.5 + openAmount * 3}
        color={OR}
        distance={10}
      />

      <DoorFrame />
      <DoorPanel side="left" openAmount={openAmount} />
      <DoorPanel side="right" openAmount={openAmount} />
    </>
  );
};

const DoorHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openAmount, setOpenAmount] = useState(0);
  const [clickBoost, setClickBoost] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Begin opening once user starts scrolling within the hero
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / (vh * 0.7));
      setOpenAmount(Math.min(1, progress + clickBoost));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [clickBoost]);

  const handleClick = () => {
    setClickBoost(1);
  };

  // Tagline opacity follows door opening
  const taglineOpacity = Math.max(0, (openAmount - 0.25) / 0.5);

  return (
    <section
      ref={sectionRef}
      onClick={handleClick}
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: NUIT }}
      aria-label="Le seuil — entrée vers Le Beau Mariage"
    >
      {/* Venue image revealed behind the door */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${VENUE_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15 + openAmount * 0.85,
          transform: `scale(${1.05 - openAmount * 0.05})`,
          transition: "opacity 0.4s ease-out, transform 0.6s ease-out",
        }}
      />

      {/* Warm overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(200,169,110,${
            0.05 + openAmount * 0.15
          }) 0%, rgba(26,24,20,${0.85 - openAmount * 0.5}) 70%)`,
        }}
      />

      {/* 3D Door Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <DoorScene openAmount={openAmount} />
          </Suspense>
        </Canvas>
      </div>

      {/* Tagline overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        style={{ opacity: taglineOpacity, transition: "opacity 0.6s ease-out" }}
      >
        <h1
          className="text-center text-4xl sm:text-5xl md:text-7xl font-light tracking-wide"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: LIN,
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
            fontStyle: "italic",
          }}
        >
          Le seuil, pas le spectacle
        </h1>
        <p
          className="mt-6 text-sm sm:text-base tracking-[0.3em] uppercase"
          style={{
            fontFamily: "'Jost', sans-serif",
            color: OR,
            opacity: 0.9,
          }}
        >
          Limen — Le Beau Mariage
        </p>
      </div>

      {/* Scroll hint when closed */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          opacity: Math.max(0, 1 - openAmount * 2),
          transition: "opacity 0.4s ease-out",
        }}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-3 text-center"
          style={{ fontFamily: "'Jost', sans-serif", color: LIN, opacity: 0.7 }}
        >
          Faites défiler — ou cliquez
        </p>
        <div className="flex justify-center">
          <div
            className="w-px h-12 animate-pulse"
            style={{ backgroundColor: OR }}
          />
        </div>
      </div>
    </section>
  );
};

export default DoorHero;
