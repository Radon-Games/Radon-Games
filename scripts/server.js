import createBareServer from "@tomphttp/bare-server-node";
import express from "express";
import http from "node:http";
import httpProxy from "http-proxy";

const PORT = process.env.PORT || 3000;
const CDN = process.env.CDN || "https://cdn.radon.games/";
const __dirname = process.cwd();

const httpServer = http.createServer();
const cdnProxy = httpProxy.createProxyServer();

const app = express();

app.use("/cdn/", (req, res) => {
  cdnProxy.web(req, res, { target: CDN, changeOrigin: true });
});

app.get("/uv/uv.config.js", (req, res) => {
  res.sendFile(__dirname + "/scripts/uv/uv.config.js");
});
app.use(express.static(__dirname + "/dist/public"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/public/index.html");
});

const bareServer = createBareServer("/bare/");

httpServer.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

httpServer.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

httpServer.on("listening", () => {
  console.log(`Radon listening on http://localhost:${PORT}/`);
});

httpServer.listen({
  port: PORT
});
