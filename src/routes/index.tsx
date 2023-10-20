import { Banner } from "../assets/Banner";
import { GameRow } from "../components/GameRow";
import { games } from "../util/games";
import { getTheme } from "../util/theme";
import { motion } from "framer-motion";
import { PiMagnifyingGlassBold, PiDiceFiveBold } from "react-icons/pi";

export function Home() {
  const randomGame = games[Math.floor(Math.random() * games.length)];
  const { bgSecondary, accentSecondary } = getTheme();

  const favorites = (localStorage.getItem("favorites") ?? "")
    .split(",")
    .filter((id) => id !== "")
    .map((x) => games.find((y) => y.id === x)!)
    .filter((x) => x !== undefined);

  const featuredIds = [
    "slope",
    "tetris",
    "friendly-fire",
    "moto-x3m-pool-party",
    "economical"
  ];

  const featured = featuredIds
    .map((x) => games.find((y) => y.id === x)!)
    .filter((x) => x !== undefined);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <section class="my-32 flex w-full flex-col items-center justify-center gap-5">
        <Banner class="h-10 sm:h-14" />
        <p class="text-center">
          An open-source unblocked games website built with simplicity in mind.
        </p>
        <div class="flex gap-5">
          <motion.a
            href="/games"
            class="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-bg-secondary px-4 py-2 font-semibold shadow-lg focus:outline-0"
            initial={{
              boxShadow: `0px 0px 0px ${bgSecondary}`
            }}
            variants={{
              focus: {
                scale: 1.05,
                boxShadow: `0px 0px 16px ${bgSecondary}`
              }
            }}
            whileHover="focus"
            whileFocus="focus"
          >
            <PiMagnifyingGlassBold />
            Browse Games
          </motion.a>
          <motion.a
            href={`/game/${randomGame.id}`}
            class="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-accent-secondary px-4 py-2 font-semibold shadow-lg focus:outline-0"
            initial={{
              boxShadow: `0px 0px 0px ${accentSecondary}`
            }}
            variants={{
              focus: {
                scale: 1.05,
                boxShadow: `0px 0px 16px ${accentSecondary}`
              }
            }}
            whileHover="focus"
            whileFocus="focus"
          >
            <PiDiceFiveBold />
            Pick One For Me
          </motion.a>
        </div>
      </section>

      <section class="mb-5">
        <h3 class="mb-2 text-2xl font-bold tracking-wide">Favorites</h3>
        {favorites.length > 0 ? (
          <GameRow games={favorites} />
        ) : (
          <p>
            Click the heart next to the full screen button in order to add a
            game to your favorites.
          </p>
        )}
      </section>

      <section class="mb-10">
        <h3 class="mb-2 text-2xl font-bold tracking-wide">Featured</h3>
        <GameRow games={featured} />
      </section>

      {/* <section class="mb-5">
        <h3 class="mb-2 text-2xl font-bold tracking-wide">Popular</h3>
        <GameRow
          games={[
            games[5],
            games[6],
            games[7],
            games[8],
            games[9],
            games[10],
            games[11]
          ]}
        />
      </section> */}
    </motion.main>
  );
}
