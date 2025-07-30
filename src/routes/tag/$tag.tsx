import { GameList } from "../../components/GameList";
import { games } from "../../util/games";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/tag/$tag")({
  component: RouteComponent
});

function RouteComponent() {
  const { tag } = Route.useParams();
  const taggedGames = games.filter((game) => game.tags.includes(tag));
  if (tag === "uncategorized") {
    taggedGames.push(...games.filter((game) => game.tags.length === 0));
  }

  if (taggedGames.length === 0) {
    throw redirect({ to: "/" });
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <GameList title={`${tag} Games`} games={taggedGames} />
    </motion.main>
  );
}

