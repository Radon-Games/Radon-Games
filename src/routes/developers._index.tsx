import { motion } from "framer-motion";

export default function Terms() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-2 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      Soon TM
    </motion.main>
  );
}
