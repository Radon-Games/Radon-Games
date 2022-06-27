import { useLocation } from "solid-app-router";

import NotFound from "../[...404]";

import { allGames } from "../../../Games";

import "../../build.css";


declare global {
  interface Window {
    EJS_player: string;
    EJS_gameUrl: string;
    EJS_core: string;
    EJS_gameName: string;
    EJS_pathtodata: string;
  }
}

export default function Game () {
  const location = useLocation();

  const route = location.pathname.split("/").at(-1);

  const game = allGames.find(game => game.route === route);

  if (!game) {
    return <NotFound />;
  }

  document.title = `${ game.title } - Radon Games`;

  return (
    <>
      <h1 class="text-2xl text-center py-10">{ game.title }</h1>
      <div class="bg-gray-800 block mx-auto mb-10" style={ `width:${ game.width };` }>
        <div style={ `height:${ game.height };` }>
          <GameElement game={ game }/>
        </div>
        <h1 class="text-xl p-3 pb-0">Description</h1>
        <p class="p-3">{ game.description }</p>
      </div>
    </>
  );
}

function GameElement (props) {
  const { game } = props;

  if (game.gameType === "flash") {
    return <embed src={ `https://Radon-Games.github.io/Radon-Games-Assets${ game.source }` }  width={ game.width } height={ game.height }></embed>
  } else if (game.gameType === "html") {
    return <iframe src={ `https://Radon-Games.github.io/Radon-Games-Assets${game.source}` } width={ game.width } height={ game.height }></iframe>
  } else if (game.gameType === "proxy") {
    return <iframe src={ game.source } width={ game.width } height={ game.height }></iframe>
  } else {
    window.EJS_player = "#game";
    window.EJS_gameUrl = `https://Radon-Games.github.io/Radon-Games-Assets${ game.source }`;
    window.EJS_core = game.gameType;
    window.EJS_gameName = game.title;
    window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs/data/";

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/ethanaobrien/emulatorjs/data/loader.js";
    script.defer = true;
    document.body.appendChild(script);

    return (
      <>
        <div id="game"></div>
      </>
    );
  }
}
