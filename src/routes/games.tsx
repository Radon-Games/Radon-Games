import { GameList } from "../components/GameList";
import { games } from "../util/games";
import { motion } from "framer-motion";

export function Games() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <GameList title="All Games" games={games} />
    </motion.main>
  );
}
