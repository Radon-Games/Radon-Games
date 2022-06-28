import * as data from "./games.json";

const allGames = JSON.parse(JSON.stringify(data)).default;
const listedGames = allGames.filter((game) => game.listed);
const unlistedGames = allGames.filter((game) => !game.listed);
const allGamesCount = allGames.length;
const listedGamesCount = listedGames.length;
const unlistedGamesCount = unlistedGames.length;

export { allGames, listedGames, unlistedGames, allGamesCount, listedGamesCount, unlistedGamesCount };
