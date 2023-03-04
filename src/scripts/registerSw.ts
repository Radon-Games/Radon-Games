import { version } from "../../package.json";

if ("serviceWorker" in navigator) {
  const lastVersion = localStorage.getItem("version");

  if (lastVersion !== version) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      Promise.allSettled(
        registrations.map((registration) => registration.unregister())
      ).then(() => {
        localStorage.setItem("version", version);
        location.reload();
      });
    });
  } else {
    registerSw();
  }
}

function registerSw() {
  navigator.serviceWorker.register("/sw.js", {
    scope: __uv$config.prefix
  });
}
