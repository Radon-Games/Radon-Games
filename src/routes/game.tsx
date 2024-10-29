import { games } from "../util/games";
import { NotFound } from "./404";
import { motion } from "framer-motion";
import { useEffect, useState } from "preact/hooks";
import {
  PiCornersOutBold,
  PiCornersInBold, // PiThumbsUpBold,
  // PiThumbsDownBold,
  // PiThumbsUpFill,
  // PiThumbsDownFill,
  PiHeartFill,
  PiHeartBold
} from "react-icons/pi";

export function Game(props: { id: string }) {
  const game = games.find((game) => game.id === props.id);
  const [fullscreen, setFullscreen] = useState(false);
  const [favorited, setFavorited] = useState(false);
  // const [liked, setLiked] = useState(true);
  // const [disliked, setDisliked] = useState(false);

  if (!game) {
    return <NotFound />;
  }

  const favorites = (localStorage.getItem("favorites") ?? "")
    .split(",")
    .filter((id) => id !== "");
  if (favorites.includes(game.id)) {
    setFavorited(true);
  }

  window.addEventListener("keypress", (e) => {
    if (e.key === "Escape") {
      document.exitFullscreen();
      setFullscreen(false);
    }
  });

  window.addEventListener("fullscreenchange", () => {
    setFullscreen(document.fullscreenElement !== null);
  });

  useEffect(() => {
    // setTimeout(() => {
    // @ts-ignore
    (adsbygoogle = window.adsbygoogle || []).push({});
    // @ts-ignore
    (adsbygoogle = window.adsbygoogle || []).push({});
    // }, 1000);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex flex-col justify-center px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <div className="lg min-h-32 relative my-16 w-full bg-bg-secondary shadow-md">
        <div className="absolute flex h-full w-full items-center justify-center">
          Please consider turning off your Ad Blocker to support Radon Games
        </div>
        <ins
          key="abovegame"
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8517735295733237"
          data-ad-slot="9539351850"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <div class="flex w-full flex-col overflow-hidden rounded-lg bg-bg-secondary shadow-lg">
        <iframe
          id="game"
          scrolling="no"
          class="aspect-video w-full"
          src={`/cdn/${game.type}.html?id=${game.id}${
            game.type === "emulator" ? `&emu=${game.emulator}` : ""
          }`}
        ></iframe>
        <div class="flex justify-between gap-2 p-5 pb-0">
          <div class="flex flex-col">
            <p class="text-sm">{game.author}</p>
            <h1 class="mb-1 text-2xl font-bold">{game.title}</h1>
            <div class="flex gap-2">
              {game.tags.map((tag) => {
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
          <div class="flex gap-2 text-2xl">
            {/* <span>{liked ? <PiThumbsUpFill /> : <PiThumbsUpBold />}</span>
            <span>
              {disliked ? <PiThumbsDownFill /> : <PiThumbsDownBold />}
            </span> */}
            <span
              onClick={() => {
                const favorites = (localStorage.getItem("favorites") ?? "")
                  .split(",")
                  .filter((id) => id !== "");

                if (favorited) {
                  favorites.splice(favorites.indexOf(game.id), 1);
                  localStorage.setItem("favorites", favorites.join(","));
                  setFavorited(false);
                } else {
                  favorites.push(game.id);
                  localStorage.setItem("favorites", favorites.join(","));
                  setFavorited(true);
                }
              }}
              class={favorited ? "text-accent-primary" : ""}
            >
              {favorited ? <PiHeartFill /> : <PiHeartBold />}
            </span>
            <span
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  document.getElementById("game")!.requestFullscreen();
                }
              }}
            >
              {fullscreen ? <PiCornersInBold /> : <PiCornersOutBold />}
            </span>
          </div>
        </div>
        <p class="mb-2 px-5 py-3">{game.description}</p>
      </div>
      <div className="lg min-h-32 relative my-16 w-full bg-bg-secondary shadow-md">
        <div className="absolute flex h-full w-full items-center justify-center">
          Please consider turning off your Ad Blocker to support Radon Games
        </div>
        <ins
          key="abovegame"
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8517735295733237"
          data-ad-slot="9539351850"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </motion.main>
  );
}
