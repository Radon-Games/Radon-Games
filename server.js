// initialize variables
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const config = require("./config.json");
const lsBlocker = require("lsblocker");

// setup options
if (config.minify) {
  app.use(require("express-minify-html-2")({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }));
}
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(lsBlocker());
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(config.rateLimit.enabled) {
  app.use(require("express-rate-limit")({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.timeWindow * 60 * 1000,
  }));
}

// register routes
require("./server/routes.js")(app);

// listen for requests
let server;
try {
  server = https.createServer({
    key: fs.readFileSync(config.key || `${__dirname}/key.pem`, "utf8"),
    cert: fs.readFileSync(config.cert || `${__dirname}/cert.pem`, "utf8")
  }, app);
} catch {
  server = http.createServer(app);
}
server.listen(process.env.PORT || config.port || 443);