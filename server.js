// initialize variables
const express = require("express");
const app = express();
const config = require("./config.json");

// setup options
app.use(require("express").static('public'));
app.set('view engine', 'ejs');
// The try block is here to allow node versons below 16x
app.use(require("express").json());
app.use(require("express").urlencoded({ extended: true }));

// register routes
require("./server/routes.js")(app);

// listen for requests
app.listen(process.env.PORT || config.port || 3000);