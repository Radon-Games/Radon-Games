import { GameCard } from "./GameCard";

export function GameList(props: { title: string; games: Game[] }) {
  return (
    <>
      {props.games.length > 0 && (
        <>
          <h3 class="mb-2 mt-16 text-2xl font-bold capitalize tracking-wide">
            {props.title}
          </h3>
          <div class="flex flex-wrap justify-between gap-5 pb-16">
            {props.games.map((game) => {
              return <GameCard game={game} />;
            })}
          </div>
        </>
      )}
    </>
  );
}
