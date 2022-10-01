if ("serviceWorker" in window.navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) registration.unregister();
    window.navigator.serviceWorker.register("/uv.sw.js", {
      scope: __uv$config.prefix
    });
  });
}

// https://stackoverflow.com/a/4585031/14635947
(function(history){
  var pushState = history.pushState;
  history.pushState = function(state) {
    if (typeof history.onpushstate == "function") {
      history.onpushstate(arguments);
    }
    return pushState.apply(history, arguments);
  };
})(window.history);

let defaultSettings = {
  "tab-cloak": false,
  "tab-cloak-text": "Google",
  "tab-cloak-icon": "https://google.com/favicon.ico",
  "analytics": true,
  "tab-cloak-mode": "hidden",
  "url-cloak": "disabled",
};

let settings;
try {
  settings = JSON.parse(localStorage.getItem("settings")) || defaultSettings;
} catch {
  settings = defaultSettings;
}

// analytics
if(settings["analytics"]) {
  // gtag
  const gtagScript = document.createElement("script");
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-0GR0HN1RFL";
  gtagScript.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "G-0GR0HN1RFL");
  };
  document.head.appendChild(gtagScript);
  // goatcounter
  const gc = document.createElement("script");
  gc.src = "/count.v3.js";
  gc.setAttribute("data-goatcounter", "https://radon-games.goatcounter.com/count");
  document.head.appendChild(gc);

  // Manage page changes
  history.onpushstate = () => {
    setTimeout(() => {
      console.log(location.pathname);
      goatcounter.count();
    }, 1);
  }
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
