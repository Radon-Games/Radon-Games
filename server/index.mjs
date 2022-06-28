import http from "node:http";
import https from "node:https";
import path from "node:path";
import express from "express";
import lsblocker from "lsblocker";
import createBareServer from "@tomphttp/bare-server-node";
import config from "../config.mjs";
import gameProxy from "./gameProxy.mjs";

const __dirname = path.resolve();

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer({}, app);
const bareServer = createBareServer("/bare/", {
  logErrors: false,
  localAddress: undefined,
  maintainer: {
    email: "tomphttp@sys32.dev",
    website: "https://github.com/tomphttp/",
  }
});

app.use((req, res, next) => {
  if (req.get("host") === config.ip) res.send("radon games");
  else next();
});
app.use(lsblocker());
app.use(express.static("dist"));
app.use(gameProxy);
app.use((req, res, next) => {
  if (bareServer.shouldRoute(req)) bareServer.routeRequest(req, res);
  else next();
});
app.use((req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

httpServer.on("upgrade", upgrade);
httpsServer.on("upgrade", upgrade);
function upgrade (req, socket, head) {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
}

httpServer.listen(80);
httpsServer.listen(443);
