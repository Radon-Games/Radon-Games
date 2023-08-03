"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { reloadCloak } from "~/components/CloakLoader";

export default function Page({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    reloadCloak();
  }, []);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 0.1
      }}
    >
      {children}
    </motion.div>
  );
}
