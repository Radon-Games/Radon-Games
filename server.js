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
app.use((req, res, next) => {
  console.log("REQUEST:", req.url);
  next();
});
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
fs.readdir("/etc/letsencrypt/live", { withFileTypes: true }, (err, files) => {
  let s;
  if (err) {
    console.log(err);
    server = http.createServer(app);
  } else {
    s = true;
    const dirs = files
      .filter(d => d.isDirectory())
      .map(d => d.name);

    server = https.createServer({}, app);
    dirs.forEach((dir) => {
      console.log(dir);
      server.addContext(dir.split("-")[0], {
        key: fs.readFileSync(`/etc/letsencrypt/live/${dir}/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/${dir}/fullchain.pem`)
      });
    });
  }

  if (s) server.listen(443, () => {
    console.log("PORT:", 443);
  });
  else server.listen(process.env.PORT || config.port || 3000, () => {
    console.log("PORT:", process.env.PORT || config.port || 3000);
  });
});