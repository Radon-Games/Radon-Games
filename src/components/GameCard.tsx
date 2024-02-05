import { Image } from "./Image";
import { Game, Tag } from "@prisma/client";
import { useState } from "react";

export function GameCard({
  game
}: {
  game: Game & {
    tags: Tag[];
  };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={`/game/${game.slug}`} className="group">
      <div
        className="relative aspect-video h-44 overflow-hidden rounded-lg shadow-lg"
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        <div className="absolute h-full w-full animate-pulse bg-bg-secondary"></div>
        <Image
          className="absolute left-0 top-0 h-full w-full transition-all group-hover:scale-105"
          src={`/cdn/images/${game.slug}.png?h=180&w=320`}
          alt={game.title}
        />
        <div
          className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-bg-secondary px-4 py-3 ${
            hovered ? "opacity-100" : "opacity-100 md:opacity-0"
          } transition-all`}
        >
          <p className="text-lg font-semibold tracking-wide">{game.title}</p>
          <div className="flex gap-2">
            {(game.tags.length
              ? game.tags
              : [
                  {
                    id: "0",
                    name: "Uncategorized",
                    slug: "uncategorized"
                  }
                ]
            ).map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="inset-0 whitespace-nowrap rounded bg-accent-secondary p-1 text-xs font-bold uppercase tracking-wide transition-all hover:scale-110"
                >
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </a>
  );
}
