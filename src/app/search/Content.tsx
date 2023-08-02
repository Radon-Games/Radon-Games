"use client";

import { motion } from "framer-motion";

export function searchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter") {
    if (!e.currentTarget.value) e.preventDefault();
    location.assign(`/search?q=${encodeURIComponent(e.currentTarget.value)}`);
  }
}

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
      Search
    </motion.div>
  );
}
