import { fileURLToPath } from 'url';
import { createServer } from "http";
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyProxy from "@fastify/http-proxy";
import { server as wisp } from "@mercuryworkshop/wisp-js/server"
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV !== "production";

wisp.options.allow_udp_streams = false;

const serverFactory = (handler) => {
    return createServer()
        .on("request", (req, res) => handler(req, res))
        .on("upgrade", (req, socket, head) => {
            wisp.routeRequest(req, socket, head);
        });
};


if (!fs.statSync(path.join(__dirname, "dist")).isDirectory()) {
    console.log("Run `pnpm run build` and rerun this server.");
    process.exit(1);
}


const app = fastify({ logger: false, serverFactory });

app.register(fastifyStatic, {
    root: path.join(__dirname, 'dist'),
    prefix: "/",
    decorateReply: false,
    serve: true,
    wildcard: false,
    maxAge: "7d",
});

app.register(fastifyProxy, {
    upstream: isDev ? "http://127.0.0.1:8080" : "https://cdn.radon.games",
    prefix: "/cdn",
    rewritePrefix: "/",
});

app.setNotFoundHandler((req, reply) => {
    const indexPath = path.join(__dirname, "dist", "index.html");
    if (fs.existsSync(indexPath)) {
        reply.type('text/html').send(fs.readFileSync(indexPath));
    } else {
        reply.code(404).send("index.html not found");
    }
});


app.listen({ port: parseInt(process.env.PORT || "1111") }, (err, address) => {
    if (err) {
        app.log.error(err);
        console.error(err);
        process.exit(1);
    }
    console.log(`server listening on ${address}`);
});
