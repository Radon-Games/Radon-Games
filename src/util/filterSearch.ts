import { games } from "./games";

const SIMILARITY_THRESHOLD = 2;

export function filter(query: string): Game[] {
  const matchesTitle = matchTitles(query, games);
  const similarTitle = similarTitles(query, games);
  const tags = tagsInclude(query, games);

  return Array.from(new Set([...matchesTitle, ...similarTitle, ...tags]));
}

function matchTitles(query: string, games: Game[]) {
  const matches: Game[] = [];
  for (const game of games) {
    if (game.title.toLowerCase().includes(query.toLowerCase())) {
      matches.push(game);
    }
  }
  return matches;
}

function similarTitles(query: string, games: Game[]) {
  const matches: Game[] = [];
  for (const game of games) {
    if (levenshteinDistance(game.title, query) <= SIMILARITY_THRESHOLD) {
      matches.push(game);
    }
  }
  return matches;
}

function descriptionIncludes(query: string, games: Game[]) {
  const matches: Game[] = [];
  for (const game of games) {
    if (game.description.toLowerCase().includes(query.toLowerCase())) {
      matches.push(game);
    }
  }
  return matches;
}

function tagsInclude(query: string, games: Game[]) {
  const matches: Game[] = [];
  for (const game of games) {
    for (const tag of game.tags) {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        matches.push(game);
        break;
      }
    }
  }
  return matches;
}

// https://www.tutorialspoint.com/levenshtein-distance-in-javascript
function levenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
}
