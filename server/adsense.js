const { get } = require("axios");

module.exports = (app) => {
  app.get("/adsbygoogle.js", (req, res) => {
    get("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8517735295733237").then((resp) => {
      Object.keys(resp.headers).forEach((header) => {
        if(header === "transfer-encoding") return;
        res.setHeader(header, resp.headers[header]);
      });
      res.send(resp.data);
    }).catch((e) => {
      res.send("");
    });
  });
}