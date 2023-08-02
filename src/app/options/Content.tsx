"use client";

import { motion } from "framer-motion";

export default function Content() {
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
      Options
    </motion.div>
  );
}
