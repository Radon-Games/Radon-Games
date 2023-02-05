<p align="center">
  <kbd>
    <img width="150px" src="https://avatars.githubusercontent.com/u/107269758">
  </kbd>
</p>

<h1 align="center">
  Radon Games
</h1>

<p align="center">
  An open-source unblocked games website built with simplicity in mind.
</p>

# Features

- Clean and Easy to use UI
- 300+ Games
- Tab Cloaking / Disguise

# Deployment

## Quick Deployment Options

Easily deploy to all your favorite platforms in just a click.

[![Deploy to Heroku](https://raw.githubusercontent.com/BinBashBanana/deploy-buttons/master/buttons/remade/heroku.svg)](https://heroku.com/deploy/?template=https://github.com/Radon-Games/Radon-Games)
[![Run on Replit](https://raw.githubusercontent.com/BinBashBanana/deploy-buttons/master/buttons/remade/replit.svg)](https://replit.com/github/Radon-Games/Radon-Games)
[![Deploy on Railway](https://binbashbanana.github.io/deploy-buttons/buttons/remade/railway.svg)](https://railway.app/new/template/ZXOCUM?referralCode=6_qmvT)
[![Deploy To Koyeb](https://binbashbanana.github.io/deploy-buttons/buttons/remade/koyeb.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/Radon-Games/Radon-Games&branch=main&name=Radon-Games)
[![Deploy to Cyclic](https://binbashbanana.github.io/deploy-buttons/buttons/remade/cyclic.svg)](https://app.cyclic.sh/api/app/deploy/Radon-Games/Radon-Games)

## Regular Deployment

Deploy on local system or VPS.

### Requirements

- [NodeJS version >=18](https://nodejs.org/)

```bash
git clone https://github.com/Radon-Games/Radon-Games.git
cd Radon-Games
npm i
npm run build
npm start
```

# Contributing

Contributions to Radon are welcome.

## Cloning

```bash
git clone https://github.com/Radon-Games/Radon-Games.git
cd Radon-Games
npm i
```

## Starting Development Server

The development server has hot module replacement for ease of development. **DO NOT USE FOR PRODUCTION.**

```bash
npm run dev
```

## Adding Games

In order to add games to Radon, you will first need to download the game files using some form of a website scraper. Once you have the game files, you will have to upload them to the [Radon-Games-Assets](https://github.com/Radon-Games/Radon-Games-Assets) in the corresponding folder. Once the games have been uploaded to the repository, you will need to edit [`src/data/games.json`](https://github.com/cohenerickson/Radon-Games/blob/main/src/data/games.json) add add an entry for the game.

## Tech Stack

- [SolidJS](https://www.solidjs.com/)
- [Solid Start](https://start.solidjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

## Libraries Used

- [express](https://www.npmjs.com/package/express)
- [@tomphttp/bare-server-node](https://www.npmjs.com/package/@tomphttp/bare-server-node)
- [http-proxy](https://www.npmjs.com/package/http-proxy)
- [solid-slider](https://www.npmjs.com/package/solid-slider)
- [fuzzysort](https://www.npmjs.com/package/fuzzysort)
- [vanilla-tilt](https://www.npmjs.com/package/vanilla-tilt)
- [Ultraviolet](https://github.com/titaniumnetwork-dev/Ultraviolet) (proxy)
