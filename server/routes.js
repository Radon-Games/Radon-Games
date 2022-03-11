const fs = require("fs");
const { post } = require("axios");
const config = require("../config.json");

module.exports = function(app) {
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
    res.render("pages/index", { games: gameCount });
  });

  app.get("/games", (req, res) => {
    res.render("pages/games", { games: gamesListed });
  });
  
  app.get("/unlisted-games", (req, res) => {
    res.render("pages/unlisted-games", { games: gamesUnListed });
  });

  app.get("/about", (req, res) => {
    res.render("pages/about", {});
  });

  app.get("/partners", (req, res) => {
    res.render("pages/partners", {});
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
    if(game) res.render("pages/game", { proxy: config.gameProxy, game: game });
    else res.render("pages/404", {});
  });
  
  app.get("/changes", (req, res) => {
    res.sendFile("/app/changes.txt");
  });
  
  // request and report routes
  app.get("/report", (req, res) => {
    res.render("pages/report", { version: require('child_process').execSync('git rev-parse HEAD').toString().trim() });
  });
  
  app.post("/report", (req, res) => {
    let reqData = req.body;
    if(!reqData.message) {
      return res.render("pages/report", { error: "Some feilds were not filled out properly.", version: require('child_process').execSync('git rev-parse HEAD').toString().trim() });
    }
    post("https://radon-api.cohenerickson.repl.co/report", reqData)
    .then((r) => {
      if(r.data.status !== 202) return res.render("pages/report", { error: "Some feilds were not filled out properly.", version: require('child_process').execSync('git rev-parse HEAD').toString().trim() });
      return res.render("pages/report", { message: "Success!", version: require('child_process').execSync('git rev-parse HEAD').toString().trim() });
    })
    .catch((e) => {
      console.error(e);
      return res.render("pages/report", { error: "An unexpected error occurred, please try again later.", version: require('child_process').execSync('git rev-parse HEAD').toString().trim() });
    });
  });
  
  app.get("/request", (req, res) => {
    res.render("pages/request", {});
  });
  
  app.post("/request", (req, res) => {
    let reqData = req.body;
    if(!reqData.gameName || !reqData.gameType) {
      return res.render("pages/request", { error: "Some feilds were not filled out properly." });
    }
    post("https://radon-api.cohenerickson.repl.co/request", reqData)
    .then((r) => {
      if(r.data.status !== 202) return res.render("pages/request", { error: "Some feilds were not filled out properly." });
      return res.render("pages/request", { message: "Success!" });
    })
    .catch((e) => {
      console.error(e);
      return res.render("pages/request", { error: "An unexpected error occurred, please try again later." });
    });
  });  

  // start proxy server
  if(config.gameProxy) {
    require("./proxy.js")(app);
  }
  
  // 404 route
  app.get("*", (req, res) => {
    res.render("pages/404", {});
  });
}

// sort gamesListed.json to readable output by game and games routes
function sortGames(games) {
  const output = {ab:[],cd:[],ef:[],gh:[],ij:[],kl:[],mn:[],op:[],qr:[],st:[],uv:[],wx:[],yz:[],other:[]}
  games.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  games.forEach((game) => {
    if(!game.title) return;
    let title = game.title;
    if(!config.gameProxy) {
      if(!game.source.startsWith("https://cohenerickson.github.io/radon-games-assets")) {
        game.source = `https://cohenerickson.github.io/radon-games-assets${game.source}`;
      }
    }
    switch(game.title.split("")[0].toLowerCase()){case"a":case"b":output.ab.push(game);break;case"c":case"d":output.cd.push(game);break;case"e":case"f":output.ef.push(game);break;case"g":case"h":output.gh.push(game);break;case"i":case"j":output.ij.push(game);break;case"k":case"l":output.kl.push(game);break;case"m":case"n":output.mn.push(game);break;case"o":case"p":output.op.push(game);break;case"q":case"r":output.qr.push(game);break;case"s":case"t":output.st.push(game);break;case"u":case"v":output.uv.push(game);break;case"w":case"x":output.wx.push(game);break;case"y":case"z":output.yz.push(game);break;default:output.other.push(game)}
  });
  output.all = games;
  return output;
}