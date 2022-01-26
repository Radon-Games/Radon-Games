const fs = require("fs");

module.exports = function(app) {
  // start proxy server 
  require("./proxy.js")(app);
  
  // Search Engine Optimisation
  const SEO = require("../seo.json");
  
  // Sort games
  let allGames = require("../games.json");
  allGames = allGames.filter(x => x.title);
  
  let gamesListed = allGames;
  gamesListed = gamesListed.filter(x => x.listed);
  gamesListed = gamesListed.filter(x => x.title);
  
  let gamesUnListed = allGames;
  gamesUnListed = gamesUnListed.filter(x => !x.listed);
  gamesListed = gamesListed.filter(x => x.title);
  
  let gameCount = gamesListed.length;
  
  allGames = sortGames(allGames);
  gamesListed = sortGames(gamesListed);
  gamesUnListed = sortGames(gamesUnListed);
  
  // Routes
  app.get("/", (req, res) => {
    res.render("pages/index", { SEO: SEO, games: gameCount });
  });

  app.get("/games", (req, res) => {
    res.render("pages/games", { SEO: SEO, games: gamesListed });
  });
  
  app.get("/unlisted-games", (req, res) => {
    res.render("pages/unlisted-games", { SEO: SEO, games: gamesUnListed });
  });

  app.get("/about", (req, res) => {
    res.render("pages/about", { SEO: SEO });
  });

  app.get("/redirect", (req, res) => {
    res.redirect(req.query.target);
  });

  app.get("/game*", (req, res) => {
    // get game url
    let path = req.url.split("/game");
    path.shift();
    path = path.join("/game");
    // find game data
    let game;
    for(let key in allGames) {
      let games = allGames[key];
      for(let gkey in games) {
        if(games[gkey].route === path) {
          game = games[gkey];
        }
      }
    }
    // send game back to client
    if(game) res.render("pages/game", { SEO: SEO, game: game });
    else res.render("pages/404", { SEO: SEO });
  });
  
  app.get("/changes", (req, res) => {
    res.sendFile("/app/changes.txt");
  });
  
  app.get("/settings", (req, res) => {
    res.render("pages/settings", { SEO: SEO });
  });
  
  // request and report routes
  app.get("/report", (req, res) => {
    let reqData = req.query;
    if(!reqData.message) {
      return res.render("pages/report", { SEO: SEO, version: require("../version.json").version });
    }
    let reportsData = JSON.parse(fs.readFileSync("./reports.json", { encoding: "utf8" }));
    reportsData.push(reqData);
    fs.writeFileSync("./reports.json", JSON.stringify(reportsData, null, 2), { encoding: "utf8" });
    res.redirect(202, "/report");
  });
  
  app.get("/request", (req, res) => {
    let reqData = req.query;
    if(!reqData.gameName || !reqData.gameType) {
      return res.render("pages/request", { SEO: SEO });
    }
    let requestsData = JSON.parse(fs.readFileSync("./requests.json", { encoding: "utf8" }));
    requestsData.push(reqData);
    fs.writeFileSync("./requests.json", JSON.stringify(requestsData, null, 2), { encoding: "utf8" });
    res.redirect(202, "/request");
  });
  
  // 404 route
  app.get("*", (req, res) => {
    res.render("pages/404", { SEO: SEO });
  });
}

// sort gamesListed.json to readable output by game and games routes
function sortGames(games) {
  const output = {ab:[],cd:[],ef:[],gh:[],ij:[],kl:[],mn:[],op:[],qr:[],st:[],uv:[],wx:[],yz:[],other:[]}
  games.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  games.forEach((game) => {
    if(!game.title) return;
    let title = game.title;
    switch(game.title.split("")[0].toLowerCase()){case"a":case"b":output.ab.push(game);break;case"c":case"d":output.cd.push(game);break;case"e":case"f":output.ef.push(game);break;case"g":case"h":output.gh.push(game);break;case"i":case"j":output.ij.push(game);break;case"k":case"l":output.kl.push(game);break;case"m":case"n":output.mn.push(game);break;case"o":case"p":output.op.push(game);break;case"q":case"r":output.qr.push(game);break;case"s":case"t":output.st.push(game);break;case"u":case"v":output.uv.push(game);break;case"w":case"x":output.wx.push(game);break;case"y":case"z":output.yz.push(game);break;default:output.other.push(game)}
  });
  return output;
}