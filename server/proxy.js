var https = require("https");
var http = require("http");

module.exports = (app) => {
  app.use("/", function(clientRequest, clientResponse) {
    var url = "https://cohenerickson.github.io/";
    var parsedHost = url.split("/").splice(2).splice(0, 1).join("/")
    var parsedPort;
    var parsedSSL;
    
    if (url.startsWith("https://")) {
      parsedPort = 443
      parsedSSL = https
    } else if (url.startsWith("http://")) {
      parsedPort = 80
      parsedSSL = http
    }
    
    var options = { 
      hostname: parsedHost,
      port: parsedPort,
      path: "/radon-games-assets" + clientRequest.url,
      method: clientRequest.method,
      headers: {
        "User-Agent": clientRequest.headers["user-agent"]
      }
    };  
  
    var serverRequest = parsedSSL.request(options, function(serverResponse) { 
      var body = "";   
      if (String(serverResponse.headers["content-type"]).indexOf("text/html") !== -1) {
        serverResponse.on("data", function(chunk) {
          body += chunk;
        }); 
  
        serverResponse.on("end", function() {  
          clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
          clientResponse.end(body);
        }); 
      }   
      else {
        serverResponse.pipe(clientResponse, {
          end: true
        }); 
        clientResponse.contentType(serverResponse.headers["content-type"])
      }   
    }); 
  
    serverRequest.end();
  });
}