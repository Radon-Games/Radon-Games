import * as data from "./games.json";

interface Data {
  default: Array<Game>;
}

interface Game {
  title: string;
  description: string;
  icon: string;
  tags: Array<string>;
  route: string;
  source: string;
  gameType: string;
  width: string;
  height: string;
  listed: boolean;
}

const allGames = (JSON.parse(JSON.stringify(data)) as Data).default;
const listedGames = allGames.filter((game) => game.listed);
const unlistedGames = allGames.filter((game) => !game.listed);
const allGamesCount = allGames.length;
const listedGamesCount = listedGames.length;
const unlistedGamesCount = unlistedGames.length;

export { allGames, listedGames, unlistedGames, allGamesCount, listedGamesCount, unlistedGamesCount, Game };
