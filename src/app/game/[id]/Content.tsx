"use client";

import { Props } from "./page";
import { motion } from "framer-motion";

export default function Content({ params }: Props) {
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
      {params.id}
    </motion.div>
  );
}
