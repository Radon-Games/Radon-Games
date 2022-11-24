import * as data from "./games.json";

const allGames = JSON.parse(JSON.stringify(data)).default;
const listedGames = allGames.filter((game) => game.listed);
const unlistedGames = allGames.filter((game) => !game.listed);
const allGamesCount = allGames.length;
const listedGamesCount = listedGames.length;
const unlistedGamesCount = unlistedGames.length;
const featured = [
  {
    title: "Slope",
    description: "Slope game is a fantastic speed run game where you can drive a ball rolling on tons of slopes and obstacles. See how far you can go in this endless course.",
    image: "/features/slope.png",
    url: "/game/slope"
  },
  {
    title: "Cookie Clicker",
    description: "Cookie Clicker is an incremental game created by French programmer Julien Orteil Thiennot in 2013. The user initially clicks on a big cookie on the screen, earning a single cookie per click.",
    image: "/features/cookie-clicker.png",
    url: "/game/cookie-clicker"
  },
  {
    title: "Basketball Stars",
    description: "Basketball Stars is a 2-player basketball game created by Madpuffers. You can play solo or with a friend as a variety of legendary basketball players. Shoot basketball with the likes of LeBron James, James Harden, and Stephen Curry in Basketball Stars!",
    image: "/features/basketball-stars.png",
    url: "/game/basketball-starsr"
  }
];

export { allGames, listedGames, unlistedGames, allGamesCount, listedGamesCount, unlistedGamesCount, featured };
