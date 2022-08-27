import NotFound from "../[...404]";
import { allGames } from "../../../Games";
import { useLocation } from "@solidjs/router";
import { onMount, createSignal } from "solid-js";
import UpdateTab from "../../Tab";

declare global {
  interface Window {
    EJS_player: string;
    EJS_gameUrl: string;
    EJS_core: string;
    EJS_gameName: string;
    EJS_pathtodata: string;
  }
}

export default function Game (props) {
  const [ isFavorite, setIsFavorite ] = createSignal(false);
  onMount(() => {
    UpdateTab();
    let favorites;
    try {
      favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      favorites = [];
    }
    if (favorites.includes(game.route)) {
      setIsFavorite(true);
    }
  });

  let game;
  if (props.game) {
    game = allGames.find(game => game.route === props.game);
  } else {
    const location = useLocation();
    game = allGames.find(game => game.route === location.pathname.split("/").at(-1));
  }

  if (!game) {
    return <NotFound />;
  }

  function fullscreen () {
    const game = document.getElementById("gameContainer").children[0] as HTMLElement;
    game.requestFullscreen();
  }

  function toggleFavorite () {
    let favorites;
    try {
      favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      favorites = [];
    }
    if (favorites.includes(game.route)) {
      favorites.splice(favorites.indexOf(game.route), 1);
      setIsFavorite(false);
    } else {
      favorites.push(game.route);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return (
    <>
      <div class="flex justify-center w-full pb-16 text-gray-100">
        <div class="bg-gray-800 m-3 w-[300px] sm:w-[616px] md:w-[744px] lg:w-[1000px]">
          <div id="gameContainer" class="sm:w-[616px] sm:h-[347px] md:w-[744px] md:h-[419px] lg:w-[1000px] lg:h-[563px]">
            <GameElement game={ game }/>
          </div>
          <div class="p-2">
            <div class="float-right text-2xl m-1">
              <i class={`${isFavorite() ? "fa-solid" : "fa-light"} fa-heart px-2 ${isFavorite() ? "text-red-600" : "text-text-100"}`} onclick={ toggleFavorite }></i>
              <i class="fa-light fa-expand-wide px-2" onclick={ fullscreen }></i>
            </div>
            <h1 class="text-2xl m-2">{ game.title }</h1>
            <p class="text-base m-2 select-none">{ game.description }</p>
          </div>
        </div>
      </div>
    </>
  );
}

const xor = {
  encode(str){
    if (!str) return str;
    return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
  },
  decode(str){
    if (!str) return str;
    let [ input, ...search ] = str.split('?');
    return decodeURIComponent(input).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char).join('') + (search.length ? '?' + search.join('?') : '');
  },
};

function GameElement (props) {
  const { game } = props;

  if (game.gameType === "flash") {
    return <embed id="game" src={ `/cdn${ game.source }` } class="w-full h-full"></embed>
  } else if (game.gameType === "html") {
    return <iframe id="game" src={ `/cdn${game.source}` } class="w-full h-full border-0"></iframe>
  } else if (game.gameType === "proxy") {
    return <iframe id="game" src={ "/~/" + xor.encode(game.source) } class="w-full h-full"></iframe>
  } else {
    onMount(() => {
      UpdateTab();
      window.EJS_player = "#game";
      window.EJS_gameUrl = `/cdn${ game.source }`;
      window.EJS_core = game.gameType;
      window.EJS_gameName = game.title;
      window.EJS_pathtodata = "/cdn/data/";

      const script = document.createElement("script");
      script.src = "/cdn/data/loader.js";
      script.defer = true;
      document.body.appendChild(script);
    });

    return (
      <>
        <div id="game"></div>
      </>
    );
  }
}
