// initialize variables
const express = require("express")();
const path = require('path');

// setup options
express.use(require("express").static('public'));
express.set('view engine', 'ejs');
express.use(require("express-rate-limit")({
	windowMs: 60 * 1000,
	max: 60
}));
express.use(require("express").json());
express.use(require("express").urlencoded({ extended: true }));

// register routes
require("./server/routes.js")(express);

// listen for requests
express.listen(3000);
