<img height="70px" src="https://raw.githubusercontent.com/cohenerickson/radon-games/main/public/img/banner.svg"></img>

An open-source unblocked games website built with simplicity in mind.

## How to setup

### Automatic Deployment:<br>
<a href="https://glitch.com/edit/#!/import/github/cohenerickson/radon-games" title="Remix on Glitch"><img alt="Remix on Glitch" src="https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg" width="140" height="30"><img></a>&nbsp;
<a href="https://repl.it/github/cohenerickson/radon-games" title="Run on Replit"><img alt="Run on Replit" src="https://repl.it/badge/github/cohenerickson/radon-games" width="140" height="30"><img></a>&nbsp;
<a href="https://heroku.com/deploy?template=https://github.com/cohenerickson/radon-games" title="Deploy to Heroku"><img alt="Deploy to Heroku" src="https://www.herokucdn.com/deploy/button.svg" width="140" height="30"><img></a>


### Command line:
```
git clone https://github.com/cohenerickson/radon-games
cd radon-games
npm install
npm run start
```

The default place for the website is `http://localhost:3000`, but this can be changed in `config.json`.

## Config
```
{
  "port": 3000,  // The port the website will run on.
  "gameProxy": false, // If true, the website will proxy games to the backend server.
  "rateLimit": {
    "enabled": false, // If true the server will limit requests to the specified rate.
    "maxRequests": 100, // The maximum number of requests allowed per 'timeWindow'.
    "timeWindow": 60 // The time window in seconds.
  }
}
```
