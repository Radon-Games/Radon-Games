import { useLocation } from "@solidjs/router";
import { allGames } from "../Games";
import { defaultSettings } from "./routes/settings";

const titles = {
  "/": () => "Radon Games",
  "/games": () => "Games - Radon Games",
  "/apps": () => "Apps - Radon Games",
  "/services": () => "Services - Radon Games",
  "/partners": () => "Partners - Radon Games",
  "/supporters": () => "Supporters - Radon Games",
  "/settings": () => "Settings - Radon Games",
  "/changelog": () => "Changelog - Radon Games",
  "/privacy": () => "Privacy - Radon Games",
  "/game-request": () => "Game Request - Radon Games",
  "/bug-report": () => "Bug Report - Radon Games",
  "/game/": () => {
    let location = useLocation();
    let title = allGames.find(x => ("/game/"+x.route) === location.pathname).title;
    return (title + " - Radon Games") || "Radon Games";
  }
};

export default function () {
  let location = useLocation();
  let title = "Radon Games";
  Object.keys(titles).forEach(key => {
    if (location.pathname.startsWith(key)) {
      title = titles[key]();
    }
  });
  let settings;
  try {
    settings = JSON.parse(localStorage.getItem("settings")) || defaultSettings;
  } catch {
    settings = defaultSettings;
  }
  if (settings["tab-cloak"]) {
    if (settings["tab-cloak-mode"] === "hidden") {
      document.addEventListener("visibilitychange", ()  => {
        if (document.hidden) {
          document.title = settings["tab-cloak-text"];
          document.querySelector<HTMLLinkElement>("link[rel='icon']").href = settings["tab-cloak-icon"];
        } else {
          document.title = title;
          document.querySelector<HTMLLinkElement>("link[rel='icon']").href = "/favicon.ico";
        }
      });
    } else if (settings["tab-cloak-mode"] === "always") {
      document.title = settings["tab-cloak-text"];
      document.querySelector<HTMLLinkElement>("link[rel='icon']").href = settings["tab-cloak-icon"];
    }
  }
}

