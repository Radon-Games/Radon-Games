import fastify from "fastify";
import { createServer } from "http";
import wisp from "wisp-server-node";



const serverFactory = (handler, _) => {
    return createServer()
        .on("request", (req, res) => {
            handler(req, res);
        })
        .on("upgrade", (req, socket, head) => {
            // @ts-expect-error          VVVVVV
            wisp.routeRequest(req, socket, head);
        });
};
const app = fastify({ logger: false, serverFactory });

app.get("/", async (req, res) => {
    res.send("ok")
})


app.listen({ port: parseInt(process.env.PORT || "1111") }, (err, address) => {
    if (err) {
        app.log.error(err);
        console.log(err);
        process.exit(1);
    }
    console.log(`server listening on ${address}`);
});