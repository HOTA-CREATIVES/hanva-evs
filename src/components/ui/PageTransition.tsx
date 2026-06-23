import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom premium easeOutExpo
      }}
      className="w-full min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
