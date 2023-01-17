import { getOptions } from "~/routes/options";

const options = getOptions();

if (options["tab-cloak"] === "true") {
  if (options["tab-cloak-mode"] === "hidden") {
    document.addEventListener("visibilitychange", (): void => {
      if (document.hidden) hide();
      else show();
    });
  } else hide();
}

const old = {
  title: document.title,
  icon: document.querySelector<HTMLLinkElement>("link[rel='icon']")?.href
};

function hide(): void {
  document.title = "Google";
  const element = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (element && element.href) {
    element.href = "https://www.google.com/favicon.ico";
  }
}

function show(): void {
  document.title = old.title;
  const element = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (element && element.href && old.icon) {
    element.href = old.icon;
  }
}

export {};
