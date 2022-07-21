import http from "node:http";
import path from "node:path";
import express from "express";
import lsblocker from "lsblocker";
import createBareServer from "@tomphttp/bare-server-node";
import config from "../config.mjs";
import gameProxy from "./gameProxy.mjs";

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const bareServer = createBareServer("/bare/", {
  logErrors: false,
  localAddress: undefined,
  maintainer: {
    email: "tomphttp@sys32.dev",
    website: "https://github.com/tomphttp/",
  }
});

app.use((req, res, next) => { if (req.get("host") !== config.ip) return next(); });

app.use(lsblocker());

app.use(express.static("dist"));

app.use(gameProxy);

app.use((req, res, next) => {
  if (bareServer.shouldRoute(req)) bareServer.routeRequest(req, res);
  else next();
});

app.use((req, res) => {
  if (/\/service\//.test(req.url)) return;
  res.sendFile(__dirname + "/dist/index.html");
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen(config.port, "127.0.0.1", () => {
  console.log(`Server listening on 127.0.0.1:${config.port}`);
});
