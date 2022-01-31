// initialize variables
const express = require("express");
const app = express();
const config = require("./config.json");

// setup options
app.use(require("express").static("public"));
app.set("view engine", "ejs");
app.use(require("express").json());
app.use(require("express").urlencoded({ extended: true }));
if(config.rateLimit.enabled) {
  app.use(require("express-rate-limit")({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.timeWindow * 60 * 1000,
  }));
}

// register routes
require("./server/routes.js")(app);

// listen for requests
app.listen(process.env.PORT || config.port || 3000);