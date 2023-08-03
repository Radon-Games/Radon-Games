const cloakScript = `const iframe = document.querySelector("iframe");
console.log(iframe);
const iconElm = document.querySelector("link[rel=icon]");
setInterval(() => {
  const title = iframe.contentWindow.document.title;
  if (document.title !== title) {
    document.title = title;
  }
  const icon = iframe.contentWindow.document.querySelector("link[rel=icon]").href;
  if (iconElm.href !== icon) {
    iconElm.href = icon;
  }
}, 100);`;

function getCloakDocument() {
  return `<head>
    <link rel="icon" type="image/x-icon" href="${location.origin}/favicon.ico"></link>
    <title>Radon Games</title>
    <style>
      * {
        margin: 0;
        overflow: hidden;
      }

      iframe {
        border: 0;
        width: 100vw;
        height: 100vh;
      }
    </style>
    </head>
    <body>
      <iframe id="iframe" src="${location.href}"></iframe>
      <script>
        ${cloakScript}
      </script>
    </body>`;
}

export default getCloakDocument;
export { cloakScript };
