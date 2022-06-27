// TODO: Fix Bare
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import nodeStatic from "node-static";
import Server from "bare-server-node";
import lsIps from "./lsips.js";

const Bare = new Server("/bare/", "");

const Static = new nodeStatic.Server("../dist");

const httpServer = http.createServer();
const httpsServer = https.createServer();

httpServer.on("request", request);
httpsServer.on("request", request);
httpServer.on("upgrade", upgrade);
httpsServer.on("upgrade", upgrade);

function request (request, response) { 
  if (bare.route_request(request, response)) return true;
  Static.serve(request, response);
}

function upgrade (req, socket, head) {
  if (bare.route_upgrade(req, socket, head))
    return;

  socket.end();
}

httpServer.listen(80);
httpsServer.listen(443);
