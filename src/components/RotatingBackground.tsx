import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import heroWomen1 from "@/assets/hero-women-1.jpg";
import heroWomen2 from "@/assets/hero-women-2.jpg";
import heroWomen3 from "@/assets/hero-women-3.jpg";
import heroWomen4 from "@/assets/hero-women-4.jpg";

const images = [heroWomen1, heroWomen2, heroWomen3, heroWomen4];

interface RotatingBackgroundProps {
  overlay?: "hero" | "page" | "auth";
  children?: React.ReactNode;
  className?: string;
}

const overlayClasses = {
  hero: "hero-overlay",
  page: "bg-foreground/70 backdrop-blur-sm",
  auth: "bg-foreground/60 backdrop-blur-md",
};

const RotatingBackground = ({ overlay = "hero", children, className = "" }: RotatingBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Inspiring women"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default RotatingBackground;
