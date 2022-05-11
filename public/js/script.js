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
if (settings["tab-cloak"]) {
  if (settings["tab-cloak-mode"] === "hidden") {
    document.addEventListener("visibilitychange", ()  => {
      if (document.hidden) {
        document.title = settings["tab-cloak-text"];
        document.querySelector("link[rel='icon']").href = settings["tab-cloak-icon"];
      } else {
        document.title = "Radon Games";
        document.querySelector("link[rel='icon']").href = "/favicon.ico";
      }
    });
  } else if (settings["tab-cloak-mode"] === "always") {
    document.title = settings["tab-cloak-text"];
    document.querySelector("link[rel='icon']").href = settings["tab-cloak-icon"];
  }
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

// url cloak
let o = false;
if(window === window.top) {
  if(settings["url-cloak"] === "blank") {
    document.onclick = openBlank;
  } else if (settings["url-cloak"] === "data") {
    document.onclick = openData;
  } else if (settings["url-cloak"] === "blob") {
    document.onclick = openBlob;
  }
}

function openBlank () {
  if (o) return;
  o = true;
  const win = window.open("about:blank", "_blank");
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      margin: 0;
      padding: 0;
      border: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #1F2937;
    }
  `;
  win.document.head.appendChild(style);
  const frame = document.createElement("iframe");
  frame.src = location.href;
  win.document.body.appendChild(frame);
  win.focus();
  window.close();
}

function openData () {
  if (o) return;
  o = true;
  const url = "data:text/html;charset=utf-8," + encodeURIComponent(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>${settings["tab-cloak"] ? settings["tab-cloak-text"] : "Radon Games"}</title>
      <link rel="icon" href="${settings["tab-cloak"] ? settings["tab-cloak-icon"] : `${location.protocol}//${location.host}/favicon.ico`}" />
      <style>
        * {
          margin: 0;
          padding: 0;
          border: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #1F2937;
        }
      </style>
    </head>
    <body>
      <iframe src="${location.href}"></iframe>
    </body>
  </html>`);
  const win =  window.open();
  win.document.write(`<style>pre {
    word-break: keep-all;
  word-wrap: break-word;
}</style><h1>Please copy and open the url below</h1><br><pre>${url}</pre>`);
  win.focus();
  window.close();
}

function openBlob () {
  if (o) return;
  o = true;
  const HTML = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${settings["tab-cloak"] ? settings["tab-cloak-text"] : "Radon Games"}</title>
        <link rel="icon" href="${settings["tab-cloak"] ? settings["tab-cloak-icon"] : `${location.protocol}//${location.host}/favicon.ico`}" />
        <style>
          * {
            margin: 0;
            padding: 0;
            border: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #1F2937;
          }
        </style>
      </head>
      <body>
        <iframe src="${location.href}"></iframe>
      </body>
    </html>`;

    // Turn the HTML into an array of bytes
  const byteArrays = [];
  for (let offset = 0; offset < HTML.length; offset += 1024) {
    const slice = HTML.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Turn the array of bytes into a Blob object
  const blob = new Blob(byteArrays, {type: "text/html"});
  // Turn the Blob into a URL
  const blobUrl = URL.createObjectURL(blob);

  // Open the link in a new tab
  const win = window.open(blobUrl, '_blank');
  win.focus();

  // Don't close the page because the link will break if you do
  // window.close();
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
        elm.children[child].requestFullscreen();
      }
    } else if (elm.children[child].tagName === "EMBED" || elm.children[child].tagName === "RUFFLE-EMBED") {
      elm.children[child].requestFullscreen();
    } else {
      fullscreen(elm, child+1);
    }
  }
}
