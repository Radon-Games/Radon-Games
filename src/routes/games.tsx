import { JSX } from "solid-js";
import games from "~/data/games.json";
import Game from "~/types/Game";
import { onSubmit } from "~/routes/search";

export default function Games(): JSX.Element {
  const sortedGames: Game[] = games.sort((a: Game, b: Game) =>
    a.title.localeCompare(b.title)
  );

  return (
    <main>
      <h1 class="text-2xl text-center py-10">Games</h1>

      <form
        action="/search"
        class="flex justify-center pb-5"
        onsubmit={onSubmit}
      >
        <input
          name="q"
          placeholder="Search"
          class="bg-gray-900 w-96 p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none"
        ></input>
      </form>

      <div class="px-8 sm:px-16 md:px-20 lg:px-32 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedGames.map((game: Game): JSX.Element => {
          if (!game.title) return <></>;
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
        })}
      </div>
    </main>
  );
}
