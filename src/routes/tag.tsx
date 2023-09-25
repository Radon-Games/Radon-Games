import { GameCard } from "../components/GameCard";
import games from "../games.json";
import { NotFound } from "./404";
import { motion } from "framer-motion";

export function Tag(props: { id: string }) {
  const taggedGames = games.filter((game) => game.tags.includes(props.id));

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
      <h3 class="mb-2 mt-16 text-2xl font-bold capitalize tracking-wide">
        {props.id} Games
      </h3>
      <div class="flex flex-wrap justify-between gap-5 pb-16">
        {taggedGames.map((game) => {
          return <GameCard game={game} />;
        })}
      </div>
    </motion.main>
  );
}
