// initialize variables
const fs = require('fs');
const https = require('https');
const express = require("express");
const app = express();
const config = require("./config.json");

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
const server = https.createServer({
  key: fs.readFileSync(`${__dirname}/key.pem`, 'utf8'),
  cert: fs.readFileSync(`${__dirname}/cert.pem`, 'utf8')
}, app);

server.listen(process.env.PORT || config.port || 3000).then(() => {
  console.log(`Listening on port ${process.env.PORT || config.port || 3000}`);
});