import { GameCard } from "./GameCard";

export function GameList(props: { title: string; games: Game[] }) {
  return (
    <>
      {props.games.length > 0 && (
        <>
          <h3 class="mb-5 mt-16 text-center text-2xl font-bold capitalize tracking-wide md:text-left">
            {props.title}
          </h3>
          <div class="flex flex-wrap justify-center gap-5 pb-16 md:justify-between">
            {props.games.map((game) => {
              return <GameCard game={game} />;
            })}
          </div>
        </>
      )}
    </>
  );
}
