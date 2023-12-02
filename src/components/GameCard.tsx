import { Image } from "./Image";
import { useState } from "preact/hooks";

export function GameCard({ game }: { game: Game }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={`/game/${game.id}`} class="group">
      <div
        class="relative aspect-video h-44 overflow-hidden rounded-lg shadow-lg"
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        <div class="absolute h-full w-full animate-pulse bg-bg-secondary"></div>
        <Image
          class="absolute left-0 top-0 h-full w-full transition-all group-hover:scale-105"
          src={`/cdn/images/${game.id}.png?h=180&w=320`}
          alt={game.title}
        />
        <div
          class={`absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-bg-secondary px-4 py-3 ${
            hovered ? "opacity-100" : "opacity-100 md:opacity-0"
          } transition-all`}
        >
          <p class="text-lg font-semibold tracking-wide">{game.title}</p>
          <div class="flex gap-2">
            {(game.tags.length ? game.tags : ["uncategorized"]).map((tag) => {
              return (
                <a
                  class="inset-0 whitespace-nowrap rounded bg-accent-secondary p-1 text-xs font-bold uppercase tracking-wide transition-all hover:scale-110"
                  href={`/tag/${tag}`}
                >
                  {tag}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </a>
  );
}
