import { JSX } from "solid-js";
import Game from "~/types/Game";

interface GameCardProps {
  game: Game;
}

export default function GameCard(props: GameCardProps): JSX.Element {
  const game = props.game;

  return (
    <a
      href={`/game/${game.id}`}
      class="relative h-48 w-full overflow-hidden rounded-lg shadow-lg hover:scale-[1.05] transition-all"
    >
      <div class="absolute bg-gray-800 animate-pulse w-full h-full"></div>
      <div
        class="absolute h-full w-full bg-center bg-cover animate-none"
        style={`background-image: url('/cdn${game.cover}?h=192')`}
      >
        <div class="h-full w-full bg-gradient-to-b from-transparent to-gray-800">
          <div class="h-full w-full flex flex-col justify-end p-5 font-semibold">
            <h1 class="text-xl">{game.title}</h1>
            <div class="flex gap-2 mt-1 text-gray-200">
              {game.tags
                .filter((tag: string): boolean => tag.length < 12)
                .slice(0, 3)
                .map((tag: string): JSX.Element => {
                  return (
                    <span class="py-1 px-2 bg-amber-500 text-xs shadow-md uppercase rounded">
                      {tag}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
