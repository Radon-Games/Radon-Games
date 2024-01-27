import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  PiList,
  PiX,
  PiDotOutlineFill,
  PiGithubLogo,
  PiDiscordLogo,
  PiPatreonLogo
} from "react-icons/pi";
import { Icon } from "~/assets/Icon";

export function Header(): React.JSX.Element {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <section>
      <nav className="flex h-16 w-screen items-center justify-between border-b-2 border-text-primary px-6">
        <Icon className="h-6" />
        <button
          aria-label="Expand Navigation"
          className="block p-2 sm:hidden"
          onClick={() => {
            setIsExpanded(true);
          }}
        >
          <PiList className="text-xl" />
        </button>
      </nav>
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            key="modal"
            className="fixed right-0 top-0 h-screen w-full bg-black bg-opacity-25"
            onClick={() => {
              setIsExpanded(false);
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              exit={{ width: 0 }}
              className="fixed right-0 top-0 h-full text-nowrap bg-bg-secondary"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="flex h-full flex-col">
                <div className="flex h-16 w-full items-center justify-between px-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-bg-primary">
                      <Icon className="h-5" />
                    </div>
                    <span className="text-sm">Guest User</span>
                  </div>
                  <button
                    aria-label="Collapse Navigation"
                    className="p-2"
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                  >
                    <PiX className="text-xl" />
                  </button>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 flex-col items-end gap-2 p-10 text-lg">
                    <a href="/">Home</a>
                    <a href="/games">Games</a>
                    <a href="/proxy">Proxy</a>
                    <a href="/shop">Shop</a>
                    <a href="/profile">Profile</a>
                    <a href="/leaderboard">Leaderboard</a>
                    <a href="/login">Login/out</a>
                    <a href="/request">Requests</a>
                    <a href="/trending">Trending</a>
                    <a href="/settings">Settings</a>
                    <a href="/game-developers">Game Developers</a>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="flex items-center gap-1">
                      <a
                        target="_blank"
                        aria-label="Discord"
                        href="//discord.gg/unblock"
                        rel="noreferrer"
                      >
                        <PiDiscordLogo className="text-xl transition-colors hover:text-accent-primary" />
                      </a>
                      <PiDotOutlineFill />
                      <a
                        target="_blank"
                        aria-label="GitHub"
                        href="//github.com/Radon-Games/"
                        rel="noreferrer"
                      >
                        <PiGithubLogo className="text-xl transition-colors hover:text-accent-primary" />
                      </a>
                      <PiDotOutlineFill />
                      <a
                        target="_blank"
                        aria-label="Patreon"
                        href="//patreon.com/Radon_Games/"
                        rel="noreferrer"
                      >
                        <PiPatreonLogo className="text-xl transition-colors hover:text-accent-primary" />
                      </a>
                    </span>
                    <span className="flex items-center gap-1">
                      <a href="/privacy">Privacy</a>
                      <PiDotOutlineFill />
                      <a href="/terms">Terms</a>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </section>
  );
}
