import { GameCard } from "./GameCard";
import { useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

export function GameRow(props: { games: Game[] }) {
  const [elm, setElm] = useState<HTMLDivElement | null>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative rounded-lg">
      <div
        className={`absolute left-0 z-[1] flex h-full w-16 items-center justify-center bg-gradient-to-r from-bg-primary to-transparent text-lg ${
          isStart ? "hidden opacity-0" : "opactiy-100"
        } transition-all`}
      >
        <div
          className="cursor-pointer"
          onClick={() => {
            if (elm) {
              elm.scrollLeft -= elm.offsetWidth;
            }
          }}
        >
          <PiCaretLeftBold />
        </div>
      </div>
      <div
        className={`absolute right-0 z-[1] flex h-full w-16 items-center justify-center bg-gradient-to-l from-bg-primary to-transparent text-lg ${
          isEnd ? "hidden opacity-0" : "opactiy-100"
        } transition-all`}
      >
        <div
          className="cursor-pointer"
          onClick={() => {
            if (elm) {
              elm.scrollLeft += elm.offsetWidth;
            }
          }}
        >
          <PiCaretRightBold />
        </div>
      </div>
      <div
        className="scrollbar-none relative flex h-fit w-full flex-row items-center justify-start gap-5 overflow-x-scroll scroll-smooth"
        ref={(elm) => {
          if (elm) {
            setElm(elm);

            setIsStart(elm.scrollLeft === 0);
            setIsEnd(elm.scrollLeft === elm.scrollWidth - elm.offsetWidth);

            elm.addEventListener("scroll", () => {
              setIsStart(elm.scrollLeft === 0);
              setIsEnd(elm.scrollLeft === elm.scrollWidth - elm.offsetWidth);
            });
          }
        }}
      >
        {props.games.map((game, i) => (
          <div className="col-4" key={i}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}
