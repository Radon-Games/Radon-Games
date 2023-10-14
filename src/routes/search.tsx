import { GameList } from "../components/GameList";
import games from "../games.json";
import { filter } from "../util/filterSearch";
import { motion } from "framer-motion";

export function Search() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") ?? "";

  const filteredGames = query ? filter(query) : [];

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <div class="my-16 flex flex-col items-center justify-center gap-2">
        <h1 class="text-2xl">Search Games</h1>
        <p>Search from our catalog of {games.length} games!</p>
        <form action="/search" method="GET">
          <input
            name="q"
            value={params.get("q") ?? ""}
            class="rounded-md border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2"
            type="text"
          />
        </form>
      </div>
      <GameList title="Search Results" games={filteredGames} />
    </motion.main>
  );
}
