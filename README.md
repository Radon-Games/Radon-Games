![Radon Games](public/img/logo-512.png)

# Radon Games

An open-source unblocked games website built with simplicity in mind.

## How to setup

### Automatic Deployment:<br>
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/ericksoncohen/radon-games)
[![Run on Replit](https://repl.it/badge/github/ericksoncohen/radon-games)](https://repl.it/github/ericksoncohen/radon-games)

### In shell:
```
$ git clone https://github.com/ericksoncohen/radon-games
$ cd radon-games
$ npm install
```

Afterward, run:
```
$ npm start
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