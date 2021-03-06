import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { For, Show } from "solid-js";
import { versions } from "../../../Changes";
import { version as currentVersion } from "../../../package.json";
import "../../build.css";

export default function Changelog () {
  if ("getSettings" in window) {
    let settings = getSettings();
    if (!settings["tab-cloak"] || settings["tab-cloak-mode"] !== "always") {
      window.title = "Changelog - Radon Games";
      document.title = window.title;
    }
  }

  return (
    <div class="bg-gray-900 text-gray-100">
      <Navbar />
      <h1 class="text-2xl text-center py-10">Changelog</h1>
      <For each={ Object.keys(versions) }>{(version) =>
        <Show when={ version }>
          <div class="text-center py-5">
            <a class="text-xl hover:underline" href={ `/changelog/version` }>
              { currentVersion !== version ? version : `Current (v${ version })` }
            </a>
            <p class="italic">{ versions[version].date }</p>
          </div>
        </Show>
      }</For>
      <Footer />
    </div>
  );
}
