import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NotFound from "../[...404]";
import { allGames } from "../../../Games";
import "../../build.css";
import { useLocation } from "solid-app-router";

// FIXME: storybook breaks typescript syntax
// declare global {
//   interface Window {
//     EJS_player: string;
//     EJS_gameUrl: string;
//     EJS_core: string;
//     EJS_gameName: string;
//     EJS_pathtodata: string;
//   }
// }

export default function Game (props) {
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

  if ("getSettings" in window) {
    let settings = getSettings();
    if (!settings["tab-cloak"] || settings["tab-cloak-mode"] !== "always") {
      window.title = `${ game.title } - Radon Games`;
      document.title = window.title;
    }
  }

  return (
    <div class="bg-gray-900 text-gray-100">
      <Navbar />
      <h1 class="text-2xl text-center py-10">{ game.title }</h1>
      <div class="bg-gray-800 block mx-auto mb-10" style={ `width:${ game.width };` }>
        <div style={ `height:${ game.height };` }>
          <GameElement game={ game }/>
        </div>
        <h1 class="text-xl p-3 pb-0">Description</h1>
        <p class="p-3">{ game.description }</p>
      </div>
      <Footer />
    </div>
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
    return <embed src={ `${ game.source }` }  width={ game.width } height={ game.height }></embed>
  } else if (game.gameType === "html") {
    return <iframe src={ `${game.source}` } width={ game.width } height={ game.height }></iframe>
  } else if (game.gameType === "proxy") {
    return <iframe src={ "/service/" + xor.encode(game.source) } width={ game.width } height={ game.height }></iframe>
  } else {
    window.EJS_player = "#game";
    window.EJS_gameUrl = `${ game.source }`;
    window.EJS_core = game.gameType;
    window.EJS_gameName = game.title;
    window.EJS_pathtodata = "/data/";

    const script = document.createElement("script");
    script.src = "/data/loader.js";
    script.defer = true;
    document.body.appendChild(script);

    return (
      <>
        <div id="game"></div>
      </>
    );
  }
}
