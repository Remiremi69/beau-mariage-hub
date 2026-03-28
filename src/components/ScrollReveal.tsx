import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  scale?: boolean;
}

const getInitial = (direction: Direction, scale: boolean): TargetAndTransition => {
  const base: Record<string, number> = { opacity: 0 };
  if (scale) base.scale = 0.95;
  switch (direction) {
    case "up": return { ...base, y: 60 };
    case "down": return { ...base, y: -60 };
    case "left": return { ...base, x: -60 };
    case "right": return { ...base, x: 60 };
    default: return base;
  }
};

const getAnimate = (scale: boolean): TargetAndTransition => ({
  opacity: 1,
  y: 0,
  x: 0,
  ...(scale ? { scale: 1 } : {}),
});

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  amount = 0.15,
  scale = false,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction, scale)}
      animate={isInView ? getAnimate(scale) : getInitial(direction, scale)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children container
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: Direction;
  amount?: number;
}

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.12,
  direction = "up",
  amount = 0.1,
}: StaggerContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {typeof children === "object" &&
        Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: direction === "up" ? 40 : 0, x: direction === "left" ? -40 : direction === "right" ? 40 : 0 },
                  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
                }}
              >
                {child}
              </motion.div>
            ))
          : children}
    </motion.div>
  );
};

// Image reveal with clip-path animation
interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}

export const ImageReveal = ({
  src,
  alt,
  className = "",
  delay = 0,
  direction = "left",
}: ImageRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
    right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
    up: { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" },
    down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : { clipPath: clipPaths[direction].hidden }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : { scale: 1.2 }}
        transition={{ duration: 1.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </motion.div>
  );
};

export default ScrollReveal;
