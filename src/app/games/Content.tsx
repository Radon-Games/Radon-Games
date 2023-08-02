"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import games from "~/games.json";
import { searchKeyDown } from "../search/Content";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export default function Content() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 0.1
      }}
    >
      <div className="flex flex-col items-center gap-8 py-16">
        <h1 className="text-3xl">Games</h1>
        <input
          type="text"
          onKeyDown={searchKeyDown}
          placeholder="Search Games"
          autoComplete="off"
          className="w-72 rounded bg-background-secondary px-4 py-3 shadow-md focus:outline-none active:outline-0 sm:w-96"
        ></input>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {alphabet.match(/.{1,2}/g)!.map((section) => {
          const sectionGames = games
            .filter((x) => section.includes(x.title.toLowerCase()[0]))
            .sort((a, b) => (a.title > b.title ? 1 : 1));

          return (
            <div key={section} className="flex flex-col items-center gap-2">
              <h2 className="text-2xl capitalize">
                {section.replace(/(.)(.)/, "$1-$2")}
              </h2>
              <div className="flex flex-col items-center">
                {sectionGames.map((game) => {
                  return (
                    <span key={game.id}>
                      <Link className="expand" href={`/game/${game.id}`}>
                        {game.title}
                      </Link>
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div key="Other" className="flex flex-col items-center gap-2">
          <h2 className="text-2xl capitalize">Other</h2>
          <div className="flex flex-col items-center">
            {games
              .filter((x) => !alphabet.includes(x.title.toLowerCase()[0]))
              .map((game) => {
                return (
                  <span key={game.id}>
                    <Link className="expand" href={`/game/${game.id}`}>
                      {game.title}
                    </Link>
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
