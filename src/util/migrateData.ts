import { db } from "~/util/db";

type Game = {
  title: string;
  author: string;
  description: string;
  id: string;
  tags: string[];
  type: "flash" | "html" | "unity" | "emulator";
} & {
  type: "emulator";
  emulator: string;
};

const games: Game[] = await fetch(
  "https://raw.githubusercontent.com/Radon-Games/Radon-Games/main/src/games.json"
).then((res) => res.json());

const tags = Array.from(new Set(games.map((game) => game.tags).flat()));

for (const tag of tags) {
  await db.tag.create({
    data: {
      slug: tag,
      name: tag.charAt(0).toUpperCase() + tag.slice(1)
    }
  });
}

for (const game of games) {
  await db.game.create({
    data: {
      slug: game.id,
      title: game.title,
      author: game.author ?? "",
      description: game.description ?? "",
      tags: {
        connect: game.tags.map((tag) => ({ slug: tag }))
      },
      type: game.type,
      emulator: game.emulator
    }
  });
}
