import https from "node:https";
import http from "node:http";

export default function(clientRequest, clientResponse, next) {
  let url = "https://Radon-Games.github.io/";
  let parsedHost = url.split("/").splice(2).splice(0, 1).join("/");
  let parsedPort;
  let parsedSSL;
  
  if (url.startsWith("https://")) {
    parsedPort = 443
    parsedSSL = https
  } else if (url.startsWith("http://")) {
    parsedPort = 80
    parsedSSL = http
  }
  
  let options = { 
    hostname: parsedHost,
    port: parsedPort,
    path: "/Radon-Games-Assets" + clientRequest.url,
    method: clientRequest.method,
    headers: {
      "User-Agent": clientRequest.headers["user-agent"]
    }
  };

  let serverRequest = parsedSSL.request(options, function(serverResponse) {
    if (![200, 304].includes(serverResponse.statusCode)) return next();
    let body = "";
    if (String(serverResponse.headers["content-type"]).indexOf("text/html") !== -1) {
      serverResponse.on("data", function(chunk) {
        body += chunk;
      });

      serverResponse.on("end", function() {
        clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
        clientResponse.end(body);
      });
    } else {
      serverResponse.pipe(clientResponse, {
        end: true
      });
      clientResponse.contentType(serverResponse.headers["content-type"] || "text/plain");
    }
  });

  serverRequest.end();
}
