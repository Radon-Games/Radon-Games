import games from "../games.json";
import { NotFound } from "./404";
import { motion } from "framer-motion";

export function Game(props: { id: string }) {
  const game = games.find((game) => game.id === props.id);

  if (!game) {
    return <NotFound />;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      {JSON.stringify(game)}
    </motion.main>
  );
}
