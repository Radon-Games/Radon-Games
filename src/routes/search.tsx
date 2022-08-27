import fuzzysort from "fuzzysort";
import { useLocation } from "solid-start";
import { allGames } from "../../Games";

export default function Search () {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const results = fuzzysort.go(query, allGames, { key: "title" });
  return (
    <main class="text-gray-100">
      <h1 class="text-2xl text-center py-10">Search</h1>
      <form action="/search" class="flex justify-center pb-5">
        <input name="q" placeholder="Search" value={ query } class="bg-gray-900 w-96 p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none"></input>
      </form>
      { results.map((result, index) => {
        let game = result.obj as any;
        return (
          <div class="block mx-auto w-full p-10 max-w-[48rem]">
            <a class="text-2xl hover:underline" href={ `/game/${game.route}` }>{ game.title }</a>
            <p>{ game.description === game.description.substring(0, 100) ? game.description : `${game.description.substring(0, 100)}...` }</p>
          </div>          
        );
      }) }
    </main>
  );
}
