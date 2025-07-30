import { GameList } from "../components/GameList";
import { games } from "../util/games";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/games")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <GameList title="All Games" games={games} />
    </motion.main>
  );
}

