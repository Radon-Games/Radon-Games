// initialize variables
const express = require("express")();
const path = require('path');
const config = require("./config.json");

// setup options
express.use(require("express").static('public'));
express.set('view engine', 'ejs');
// The try block is here to allow node versons below 16x
try {
  express.use(require("express-rate-limit")({
	  windowMs: 60 * 1000,
	  max: 60
  }));
} catch {}
express.use(require("express").json());
express.use(require("express").urlencoded({ extended: true }));

// register routes
require("./server/routes.js")(express);

// listen for requests
express.listen(config.port || 3000);
