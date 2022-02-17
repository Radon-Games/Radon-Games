const { get, post } = require("axios");

module.exports = (app) => {
  app.get("/gtag/*", (req, res) => {
    // console.log("GET");
    get("https://www.googletagmanager.com" + req.url).then((resp) => {
      Object.keys(resp.headers).forEach((header) => {
        if(header === "transfer-encoding") return;
        res.setHeader(header, resp.headers[header]);
      });
      res.send(resp.data.split("https://www.google-analytics.com/g").join("").split("https://analytics.google.com/g").join(""));
    }).catch((e) => {
      res.send("");
    });
  });
  
  app.post("/collect", (req, res) => {
    // console.log("POST")
    //let ip = req.headers['x-forwarded-for'].split(",")[0] || req.connection.remoteAddress;
    let headers = {};
    Object.keys(req.headers).forEach((header) => {
      headers[header] = req.headers[header];
    });
    headers["host"] = "analytics.google.com";
    post("https://www.google-analytics.com/g" + req.url/* + "&uip=" + ip*/, {}, { headers: headers }).then((resp) => {
      Object.keys(resp.headers).forEach((header) => {
        res.setHeader(header, resp.headers[header]);
      });
      res.send(resp.data);
    }).catch((e) => {
      res.send("");
    });
  });
}