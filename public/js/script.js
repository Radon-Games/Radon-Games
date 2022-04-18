// discord popup
if(!sessionStorage.getItem("discord")) {
  document.getElementById("discord-popup").classList.remove("hidden");

  document.getElementById("discord-popup").addEventListener("click", () => {
    document.getElementById("discord-popup").classList.add("hidden");
  });

  setTimeout(() => {
    document.getElementById("discord-popup").classList.add("hidden");
  }, 60000);

  sessionStorage.setItem("discord", "true");
}

// settings
window.settings = getSettings();

// tab cloak
if(settings["tab-cloak"]) {
  document.addEventListener("visibilitychange", ()  => {
    if (document.hidden) {
      document.title = settings["tab-cloak-text"];
      document.querySelector("link[rel='icon']").href = settings["tab-cloak-icon"];
    } else {
      document.title = "Radon Games";
      document.querySelector("link[rel='icon']").href = "/favicon.ico";
    }
  });
}

// analytics
if(settings["analytics"]) {
  // gtag
  const gtagScript = document.createElement("script");
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-0GR0HN1RFL";
  gtagScript.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-0GR0HN1RFL');
  };
  document.head.appendChild(gtagScript);
  // goatcounter
  const gc = document.createElement("script");
  gc.src = "/js/count.v3.js";
  gc.setAttribute("data-goatcounter", "https://radon-games.goatcounter.com/count");
  document.head.appendChild(gc);
}

// fullscreen function
function fullscreen(elm = document.getElementById('gameWindow'), child = 0) {
  if (child > 2 || !elm.children[child]) {
    elm.children[0].requestFullscreen();
  } else {
    if (elm.children[child].tagName === "IFRAME") {
      if (elm.children[child].src.includes("/service/")) {
        if (elm.children[child].contentWindow.handleIconClick) {
          elm.children[child].contentWindow.handleIconClick("fullscreen");
        } else {
          elm.children[child].requestFullscreen();
        }
      } else {
        try {
          elm.children[child].contentDocument.querySelector("canvas").requestFullscreen();
        } catch {
          elm.children[child].requestFullscreen();
        }
      }
    } else if (elm.children[child].tagName === "EMBED" || elm.children[child].tagName === "RUFFLE-EMBED") {
      elm.children[child].requestFullscreen();
    } else {
      fullscreen(elm, child+1);
    }
  }
}