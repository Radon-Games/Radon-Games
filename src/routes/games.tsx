import { For } from 'solid-js';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { listedGames } from "../../Games";
import "../build.css";

export default function Games () {
  let keys = Object.keys(sortGames(listedGames));

  if ("getSettings" in window) {
    let settings = getSettings();
    if (!settings["tab-cloak"] || settings["tab-cloak-mode"] !== "always") {
      window.title = "Games - Radon Games";
      document.title = window.title;
    }
  }

  return (
    <div class="bg-gray-900 text-gray-100">
      <Navbar />
      <h1 class="text-2xl text-center py-10">Games</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center mx-0 md:mx-32 py-5">
        <For each={ keys }>{(key, i) => {
          let games = sortGames(listedGames)[key];
          let title = key.split("")[0].toUpperCase() + "-" + key.split("")[1].toUpperCase();
          if (key === "other") title = "Other";
          return (
            <div>
              <h1 class="text-2xl">{ title }</h1>
              <For each={ games }>{(game, i) =>
                <>
                  <a class="hover:underline" href={ `/game/${ game.route }` }>{ game.title }</a><br/>
                </>
              }</For>
            </div>
          );
        }}</For>
      </div>
      <Footer />
    </div>
  );
}

function sortGames (games) {
  const output = {ab:[],cd:[],ef:[],gh:[],ij:[],kl:[],mn:[],op:[],qr:[],st:[],uv:[],wx:[],yz:[],other:[]}
  games.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  games.forEach((game) => {
    if (!game.title) return;
    let title = game.title;
    switch(game.title.split("")[0].toLowerCase()){case"a":case"b":output.ab.push(game);break;case"c":case"d":output.cd.push(game);break;case"e":case"f":output.ef.push(game);break;case"g":case"h":output.gh.push(game);break;case"i":case"j":output.ij.push(game);break;case"k":case"l":output.kl.push(game);break;case"m":case"n":output.mn.push(game);break;case"o":case"p":output.op.push(game);break;case"q":case"r":output.qr.push(game);break;case"s":case"t":output.st.push(game);break;case"u":case"v":output.uv.push(game);break;case"w":case"x":output.wx.push(game);break;case"y":case"z":output.yz.push(game);break;default:output.other.push(game)}
  });
  return output;
}
