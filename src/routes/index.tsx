import { Banner } from "../assets/Banner";
import { GameRow } from "../components/GameRow";
import { getTheme } from "../util/theme";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PiMagnifyingGlassBold, PiDiceFiveBold } from "react-icons/pi";

export const Route = createFileRoute("/")({
  component: Home
});
export function Home() {
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      return fetch("/games.json").then((res) => res.json());
    }
  });

  if (!data) return null;

  const randomGame = data[Math.floor(Math.random() * data.length)];
  const { bgSecondary, accentSecondary } = getTheme();

  const favorites = (localStorage.getItem("favorites") ?? "")
    .split(",")
    .filter((id) => id !== "")
    .map((x) => data.find((y) => y.id === x)!)
    .filter((x) => x !== undefined);

  const featuredIds = [
    "slope",
    "tetris",
    "friendly-fire",
    "moto-x3m-pool-party",
    "economical"
  ];

  const featured = featuredIds
    .map((x) => data.find((y) => y.id === x)!)
    .filter((x) => x !== undefined);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <section className="my-32 flex w-full flex-col items-center justify-center gap-5">
        <Banner className="h-10 sm:h-14" />
        <p className="text-center">
          An open-source unblocked games website built with simplicity in mind.
        </p>
        <div className="flex gap-5">
          <motion.a
            href="/games"
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-bg-secondary px-4 py-2 font-semibold shadow-lg focus:outline-0"
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
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-accent-secondary px-4 py-2 font-semibold shadow-lg focus:outline-0"
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

      <section className="mb-5">
        <h3 className="mb-2 text-2xl font-bold tracking-wide">Favorites</h3>
        {favorites.length > 0 ? (
          <GameRow games={favorites} />
        ) : (
          <p>
            Click the heart next to the full screen button in order to add a
            game to your favorites.
          </p>
        )}
      </section>

      <section className="mb-10">
        <h3 className="mb-2 text-2xl font-bold tracking-wide">Featured</h3>
        <GameRow games={featured} />
      </section>
    </motion.main>
  );
}

