import { JSX } from "solid-js";
import { useLocation } from "solid-start";
import fuzzysort from "fuzzysort";
import Game from "~/types/Game";
import games from "~/data/games.json";

export default function Search(): JSX.Element {
  const solidLocation = useLocation();
  const query = new URLSearchParams(solidLocation.search).get("q")!;
  const results = fuzzysort.go<Game>(query, games as Game[], { key: "title" });

  function onSubmit(event: SubmitEvent): void {
    const form = event.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    if (!input.value) event.preventDefault();
  }

  return (
    <main>
      <h1 class="text-2xl text-center py-10">Search</h1>
      <form action="/search" class="flex justify-center pb-5" onsubmit={onSubmit}>
        <input
          name="q"
          placeholder="Search"
          value={query}
          class="bg-gray-900 w-96 p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none"
        ></input>
      </form>
      {results.map((result) => {
        let game = result.obj;
        return (
          <div class="block mx-auto w-full p-10 max-w-[48rem]">
            <p class="text-gray-500">› game › {game.id.replace(/\//g, " ›")}</p>
            <a
              class="text-2xl hover:underline hover:text-amber-500 transition-all"
              href={`/game/${game.id}`}
            >
              {game.title}
            </a>
            <p class="text-gray-300">
              {game.description === game.description.substring(0, 100)
                ? game.description
                : `${game.description.substring(0, 100)}...`}
            </p>
          </div>
        );
      })}
    </main>
  );
}
