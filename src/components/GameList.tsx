import Ad from "./Ad";
import { GameCard } from "./GameCard";
import { Game, Tag } from "@prisma/client";
import { Fragment } from "react/jsx-runtime";

export default function GameList({
  games
}: {
  games: (Game & {
    tags: Tag[];
  })[];
}) {
  return (
    <div className="grid grid-cols-1 items-center justify-around gap-5 md:grid-cols-2 min-[1216px]:grid-cols-3">
      {games.map((game, index) => {
        return (
          <Fragment key={game.slug}>
            {index % 13 === 0 && (
              <div className="relative aspect-video h-44 shadow-lg">
                <Ad slot="7150949513" id={index} width={313} height={176} />
              </div>
            )}
            <GameCard game={game} />
          </Fragment>
        );
      })}
    </div>
  );
}
