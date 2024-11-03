import { db } from "./db";
import { Game, Tag } from "@prisma/client";

type Collection = (Game & {
  tags: Tag[];
})[];

// Cache game data to reduce database queries and improve performance (probably a better way to do this but idc)
export let allGames: Collection = [];
export let popularGames: Collection = [];
export let hotGames: Collection = [];
export let bestGames: Collection = [];

async function updateCache() {
  allGames = await db.game.findMany({
    orderBy: {
      title: "asc"
    },
    include: {
      tags: true
    }
  });

  popularGames = await getPopularGames(allGames);

  hotGames = await getHotGames(allGames);

  bestGames = await getBestGames(allGames);
}

updateCache();

// Update the cache every x ms to keep the data fresh
setInterval(updateCache, 15000);

async function getViews(count: number) {
  return await db.play.findMany({
    take: count,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      game: true
    }
  });
}

async function getPopularGames(allGames: Collection) {
  const recentViews = await getViews(1000000);

  const popularGames = Object.entries(
    recentViews
      .map((view) => view.game.slug)
      .reduce(
        (acc, game) => {
          if (acc[game]) {
            acc[game]++;
          } else {
            acc[game] = 1;
          }

          return acc;
        },
        {} as Record<string, number>
      )
  )
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10)
    .map(([slug]) => slug);

  return allGames
    .filter((game) => popularGames.includes(game.slug))
    .sort(
      (a, b) => popularGames.indexOf(a.slug) - popularGames.indexOf(b.slug)
    );
}

async function getHotGames(allGames: Collection) {
  const recentViews = await getViews(1000);

  const hotGames = Object.entries(
    recentViews
      .map((view) => view.game.slug)
      .reduce(
        (acc, game) => {
          if (acc[game]) {
            acc[game]++;
          } else {
            acc[game] = 1;
          }

          return acc;
        },
        {} as Record<string, number>
      )
  )
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10)
    .map(([slug]) => slug);

  return allGames
    .filter((game) => hotGames.includes(game.slug))
    .sort((a, b) => hotGames.indexOf(a.slug) - hotGames.indexOf(b.slug));
}

async function getBestGames(allGames: Collection) {
  const ratings = Object.entries(
    allGames.reduce(
      (acc, game) => {
        acc[game.slug] = (game.numLikes + 1) / (game.numDislikes + 1);

        return acc;
      },
      {} as Record<string, number>
    )
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([slug]) => slug);

  return allGames
    .filter((game) => ratings.includes(game.slug))
    .sort((a, b) => ratings.indexOf(a.slug) - ratings.indexOf(b.slug));
}
