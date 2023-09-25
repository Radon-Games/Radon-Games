import { Banner } from "../assets/Banner";
import { GameRow } from "../components/GameRow";
import games from "../games.json";
import { motion } from "framer-motion";
import { PiMagnifyingGlassBold, PiQuestionBold } from "react-icons/pi";

export function Home() {
  const randomGame = games[Math.floor(Math.random() * games.length)];

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <section class="my-32 flex w-full flex-col items-center justify-center gap-5">
        <Banner class="h-14" />
        <p>
          An open-source unblocked games website built with simplicity in mind.
        </p>
        <div class="flex gap-5">
          <motion.a
            href="/games"
            class="bg-bg-secondary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-semibold shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 16px rgb(30 41 59)"
            }}
          >
            <PiMagnifyingGlassBold />
            Browse Games
          </motion.a>
          <motion.a
            href={`/game/${randomGame.id}`}
            class="bg-accent-secondary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-semibold shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 16px rgb(55 48 163)",
              transition: {
                duration: 0.2
              }
            }}
          >
            <PiQuestionBold />
            Pick One For Me
          </motion.a>
        </div>
      </section>

      <section class="mb-5">
        <h3 class="mb-2 text-2xl font-bold tracking-wide">Favorites</h3>
        <GameRow games={[games[42]]} />
      </section>

      <section class="mb-5">
        <h3 class="mb-2 text-2xl font-bold tracking-wide">Featured</h3>
        <GameRow games={[games[1], games[2], games[3], games[4]]} />
      </section>

      <section class="mb-5">
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
      </section>
    </motion.main>
  );
}
