import Icon from "../components/Icon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../assets/banner.svg";
import { listedGamesCount } from "../../Games";
import "../build.css";

export default function Index () {
  if ("getSettings" in window) {
    let settings = getSettings();
    if (!settings["tab-cloak"] || settings["tab-cloak-mode"] !== "always") {
      window.title = "Home - Radon Games";
      document.title = window.title;
    }
  }

  return (
    <div class="bg-gray-900 text-gray-100">
      <Navbar />
      <main class="py-40 dots w-full">
        <div class="block mx-auto bg-gray-900 max-w-2xl">
          <div class="flex justify-center p-5">
            <img src={ Banner } alt="Radon Games" class="h-10" />
          </div>
          <p class="text-center p-5">An open-source unblocked games website built with simplicity in mind.</p>
        </div>
      </main>

      
      <section>
        <h1 class="flex text-2xl font-semibold justify-center">
          <Icon name="alien-8bit" style="margin-top: 0.2em;" />&nbsp;{ listedGamesCount } Games
        </h1>
        <p class="p-5 text-center">Radon Games has { listedGamesCount } Emulator, Flash, HTML, and WebGl games. All that you can play in your browser for free!</p>
      </section>
      <Footer />
    </div>
  );
}
