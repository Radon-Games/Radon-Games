const { get, post } = require("axios");

module.exports = (app) => {
  app.get("/gtag/*", (req, res) => {
    get("https://www.googletagmanager.com" + req.url).then((resp) => {
      Object.keys(resp.headers).forEach((header) => {
        if(header === "transfer-encoding") return;
        res.setHeader(header, resp.headers[header]);
      });
      res.send(resp.data.split("https://www.google-analytics.com/g").join("").split("https://analytics.google.com/g").join(""));
    });
  });
  
  app.post("/collect", (req, res) => {
    let headers = {};
    Object.keys(req.headers).forEach((header) => {
      headers[header] = req.headers[header];
    });
    headers["host"] = "analytics.google.com";
    post("https://www.google-analytics.com/g" + req.url, {}, { headers: headers }).then((resp) => {
      Object.keys(resp.headers).forEach((header) => {
        res.setHeader(header, resp.headers[header]);
      });
      res.send(resp.data);
    });
  });
}