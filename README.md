<img align="left" width="70px" src="https://raw.githubusercontent.com/ericksoncohen/radon-games/main/public/img/logo-512.png"></img>
# Radon Games

An open-source unblocked games website built with simplicity in mind.

## How to setup

### Automatic Deployment:<br>
<a href="https://glitch.com/edit/#!/import/github/ericksoncohen/radon-games" title="Remix on Glitch"><img alt="Remix on Glitch" src="https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg" width="140" height="30"><img></a>&nbsp;
<a href="https://repl.it/github/ericksoncohen/radon-games" title="Run on Replit"><img alt="Run on Replit" src="https://repl.it/badge/github/ericksoncohen/radon-games" width="140" height="30"><img></a>&nbsp;
<a href="https://heroku.com/deploy?template=https://github.com/ericksoncohen/radon-games" title="Deploy to Heroku"><img alt="Deploy to Heroku" src="https://www.herokucdn.com/deploy/button.svg" width="140" height="30"><img></a>


### Command line:
```
git clone https://github.com/ericksoncohen/radon-games
cd radon-games
npm install
npm start
```

The default place for the website is `http://localhost:3000`, but this can be changed in `config.json`.

## Structure


`/views` - Front end UI<br>
> `/components` - Main UI components such as head and footer<br>
> `/pages` - Website pages<br>

`/public` - Static resources<br>
> `/css` - Stylesheets<br>
> `/js` - Scripts<br>
> `/img` - Images<br>

`/server` - Backend server<br>

## Config
```
{
  "port": 3000
}
```

- `port` The port the website will run on.
