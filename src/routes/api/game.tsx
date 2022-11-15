import { APIEvent } from "solid-start/api";
import games from "~/data/games.json";
import Game from "~/types/Game";

export function GET(event: APIEvent): Response {
  const paramaters = new URLSearchParams(event.request.url.split("?")[1]);

  const game: Game | undefined = games.find(
    (game: Game): boolean => game.id === paramaters.get("id")
  );

  return new Response(JSON.stringify(game ?? {}, null, 2), {
    status: game ? 200 : 404,
    headers: { "Content-Type": "text/html" }
  });
}
