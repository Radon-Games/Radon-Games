import { Image } from "./Image";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function GameCard({ game }: { game: Game }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Link
      to="/game/$gameid"
      params={{ gameid: game.id }}
      preload="intent"
      className="group cursor-pointer"
      onClick={() => navigate({ to: `/game/${game.id}` })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-video h-44 overflow-hidden rounded-lg shadow-lg">
        <div className="absolute h-full w-full animate-pulse bg-bg-secondary" />
        <Image
          className="absolute left-0 top-0 h-full w-full transition-all group-hover:scale-105"
          src={`/cdn/images/${game.id}.png?h=180&w=320`}
          alt={game.title}
        />
        <div
          className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-bg-secondary px-4 py-3 ${
            hovered ? "opacity-100" : "opacity-100 md:opacity-0"
          } transition-all`}
        >
          <p className="text-lg font-semibold tracking-wide">{game.title}</p>
          <div className="flex gap-2">
            {(game.tags.length ? game.tags : ["uncategorized"]).map(
              (tag, i) => (
                <a
                  key={i}
                  href={`/tag/${tag}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inset-0 whitespace-nowrap rounded bg-accent-secondary p-1 text-xs font-bold uppercase tracking-wide transition-all hover:scale-110"
                >
                  {tag}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
