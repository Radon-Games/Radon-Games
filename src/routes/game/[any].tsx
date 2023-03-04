import { JSX, onMount, createSignal } from "solid-js";
import { useLocation } from "solid-start";
import NotFound from "../[...404]";
import games from "~/data/games.json";
import { xor } from "~/scripts/codec";

declare global {
  interface Window {
    EJS_player?: "#game";
    EJS_core: string;
    EJS_gameUrl: string;
    EJS_pathtodata?: "/cdn/data/";
  }
}

export default function Game(): JSX.Element {
  const location = useLocation();
  const game = games.find(
    (game) => game.id === location.pathname.split("/").at(-1)
  )!;
  if (!game) return <NotFound />;

  const [isFavorite, setIsFavorite] = createSignal(false);
  let toggleFavorite = (): void => {
    setIsFavorite(!isFavorite());
  };

  onMount(async () => {
    const { favorites } = await import("~/scripts/favorites");
    await import("~/scripts/game");

    if (favorites.has(game.id)) {
      setIsFavorite(true);
    }

    toggleFavorite = (): void => {
      setIsFavorite(!isFavorite());

      if (isFavorite()) {
        favorites.add(game.id);
      } else {
        favorites.delete(game.id);
      }
    };

    if (!["html", "flash", "proxy"].includes(game.type)) {
      const script1 = document.createElement("script");
      script1.innerHTML = `
        window.EJS_player = "#game";
        window.EJS_core = "${game.type}";
        window.EJS_gameUrl = "/cdn${game.source}";
        window.EJS_pathtodata = "/cdn/data/";
      `;
      document.body.appendChild(script1);
      const script2 = document.createElement("script");
      script2.src = "/cdn/data/loader.js";
      document.body.appendChild(script2);
    }
  });

  function enterFullscreen(): void {
    document.getElementById("game")?.children[0].requestFullscreen();
  }

  return (
    <main class="w-full h-ful">
      <section class="my-10 mx-8 sm:mx-16 md:mx-20 lg:mx-32 p-5 bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        <div id="game" class="aspect-video bg-black shadow-md">
          {((): JSX.Element => {
            if (game.type === "html" || game.type === "proxy") {
              return (
                <iframe
                  class="w-full h-full overflow-hidden"
                  src={
                    game.type === "html"
                      ? `/cdn${game.source}`
                      : `/~uv/${xor.encode(game.source)}`
                  }
                ></iframe>
              );
            } else if (game.type === "flash") {
              return (
                <>
                  <embed
                    src={`/cdn${game.source}`}
                    class="w-full h-full"
                  ></embed>
                </>
              );
            } else {
              return <></>;
            }
          })()}
        </div>
        <div class="flex gap-5 mt-5 float-right text-2xl pr-2">
          <i
            class={`${
              isFavorite() ? "fa-solid text-red-500" : "fa-regular"
            } fa-heart cursor-pointer`}
            title="Favorite"
            onClick={toggleFavorite}
          ></i>
          <i
            class="fa-regular fa-expand cursor-pointer"
            title="Fullscreen"
            onClick={enterFullscreen}
          ></i>
        </div>
        <div class="pl-2">
          <div class="flex gap-2 mt-5 text-gray-200 font-semibold">
            {game.tags.map((tag: string): JSX.Element => {
              return (
                <span class="py-1 px-2 bg-amber-500 text-xs shadow-md uppercase rounded">
                  {tag}
                </span>
              );
            })}
          </div>
          <h1 class="mt-2 text-2xl font-semibold">{game.title}</h1>
          <span class="text-sm text-gray-300 font-semibold">{game.author}</span>
          <p class="">{game.description}</p>
        </div>
      </section>
    </main>
  );
}
