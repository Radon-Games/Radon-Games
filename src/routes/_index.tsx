import { description } from "../../package.json";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { PiDiceFive, PiMagnifyingGlass } from "react-icons/pi";
import { Banner } from "~/assets/Banner";
import { Carousel } from "~/components/Carousel";
import { db } from "~/util/db";
import { popularGames, hotGames, bestGames } from "~/util/featured";

export const meta: MetaFunction = () => {
  return [{ title: "Home | Radon Games", "og:title": "Home | Radon Games" }];
};

export async function loader() {
  const allGames = await db.game.findMany();

  return json({
    popularGames,
    hotGames,
    bestGames,
    randomGame: allGames[Math.floor(Math.random() * allGames.length)].slug
  });
}

export default function Index() {
  const { popularGames, hotGames, bestGames, randomGame } =
    useLoaderData<typeof loader>();
  const [profile, setProfile] = useState<Window["__profile"]>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.__profile) {
        setProfile(window.__profile);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="flex flex-col px-8 md:px-16 lg:px-32 xl:px-48">
      <section className="my-32 flex w-full flex-col items-center justify-center gap-5">
        <Banner className="h-10 sm:h-14" />
        <p className="text-center">{description}</p>
        <div className="flex gap-5">
          <a
            href="/games"
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-bg-secondary px-4 py-2 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-[0px_0px_16px_var(--bg-secondary)] focus:outline-0"
          >
            <PiMagnifyingGlass />
            Browse Games
          </a>
          <a
            href={`/game/${randomGame}`}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-accent-secondary px-4 py-2 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-[0px_0px_16px_var(--bg-secondary)] focus:outline-0"
          >
            <PiDiceFive />
            Pick One For Me
          </a>
        </div>
      </section>
      {profile && (
        <section className="mb-10">
          <h3 className="mb-2 text-2xl font-bold tracking-wide">Favorited</h3>
          {/* @ts-expect-error */}
          <Carousel games={profile.favorites} />
        </section>
      )}
      <section className="mb-10">
        <h3 className="mb-2 text-2xl font-bold tracking-wide">Popular Games</h3>
        <Carousel games={popularGames} />
      </section>
      <section className="mb-10">
        <h3 className="mb-2 text-2xl font-bold tracking-wide">Best Games</h3>
        <Carousel games={bestGames} />
      </section>
      <section className="mb-10">
        <h3 className="mb-2 text-2xl font-bold tracking-wide">Hot Games</h3>
        <Carousel games={hotGames} />
      </section>
    </main>
  );
}
