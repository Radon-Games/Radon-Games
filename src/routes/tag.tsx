import { GameList } from "../components/GameList";
import { games } from "../util/games";
import { NotFound } from "./404";
import { motion } from "framer-motion";

export function Tag(props: { id: string }) {
  const taggedGames = games.filter((game) => game.tags.includes(props.id));
  if (props.id === "uncategorized") {
    taggedGames.push(...games.filter((game) => game.tags.length === 0));
  }

  if (taggedGames.length === 0) {
    return <NotFound />;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <GameList title={`${props.id} Games`} games={taggedGames} />
    </motion.main>
  );
}
