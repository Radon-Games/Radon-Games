const { get } = require("axios");

module.exports = (app) => {
  app.get("/adsbygoogle.html", (req, res) => {
    get("https://googleads.g.doubleclick.net/pagead/html/r20220216/r20190131/zrt_lookup.html").then((resp) => {
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