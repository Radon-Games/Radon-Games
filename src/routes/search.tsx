import { JSX } from "solid-js";
import { useLocation } from "solid-start";
import fuzzysort from "fuzzysort";
import Game from "~/types/Game";
import games from "~/data/games.json";
import Ad from "~/components/Ad";

const SPLIT_CHAR = "›";

export function onSubmit(event: SubmitEvent): void {
  const form = event.target as HTMLFormElement;
  const input = form.querySelector("input") as HTMLInputElement;
  if (!input.value) event.preventDefault();
}

export default function Search(): JSX.Element {
  const solidLocation = useLocation();
  const query = new URLSearchParams(solidLocation.search).get("q")!;
  const results = fuzzysort.go<Game>(query, games as Game[], {
    key: "title",
    limit: 20
  });

  return (
    <main>
      <h1 class="text-2xl text-center py-10">Search</h1>
      <form
        action="/search"
        class="flex justify-center pb-5"
        onsubmit={onSubmit}
      >
        <input
          name="q"
          placeholder="Search"
          value={query}
          class="bg-gray-900 w-96 p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none"
        ></input>
      </form>
      <div class="w-full flex justify-center">
        <Ad />
      </div>
      {results.map((result) => {
        let game = result.obj;
        return (
          <div class="flex mx-auto w-full p-10 max-w-[48rem] items-center">
            <div class="flex-shrink-0 mr-5 relative w-48 h-32 rounded overflow-hidden shadow-md">
              <div class="absolute bg-gray-800 animate-pulse w-full h-full"></div>
              <div
                class="absolute h-full w-full bg-center bg-cover animate-none"
                style={`background-image: url('/cdn${game.cover}?h=128')`}
              ></div>
            </div>
            <div>
              <div>
                <p class="text-gray-500 mt-[-4px]">
                  {SPLIT_CHAR} game {SPLIT_CHAR}{" "}
                  {game.id.replace(/\//g, ` ${SPLIT_CHAR}`)}
                </p>
                <a
                  class="text-2xl font-semibold hover:underline hover:text-amber-500 transition-all"
                  href={`/game/${game.id}`}
                >
                  {game.title}
                </a>
                <div class="flex gap-2 my-1">
                  {game.tags
                    .filter((tag: string): boolean => tag.length < 10)
                    .slice(0, 3)
                    .map((tag: string): JSX.Element => {
                      return (
                        <span class="font-semibold py-1 px-2 bg-amber-500 text-xs shadow-md uppercase rounded">
                          {tag}
                        </span>
                      );
                    })}
                </div>
                <p class="text-gray-300">
                  {game.description === game.description.substring(0, 100)
                    ? game.description
                    : `${game.description.substring(0, 100)}...`}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
