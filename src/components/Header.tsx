import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, JSX } from "react";
import { IconType } from "react-icons";
import {
  PiList,
  PiX,
  PiDotOutlineFill,
  PiGithubLogo,
  PiDiscordLogo,
  PiPatreonLogo,
  PiHouse,
  PiGameController,
  PiDetective,
  PiBag,
  PiUser,
  PiCertificate,
  PiCode,
  PiChartLine,
  PiGear,
  PiSignOut
} from "react-icons/pi";
import { Icon } from "~/assets/Icon";

type NavLinkProps = {
  href: string;
  label?: string;
  accesibilityLabel: string;
  icon?: IconType;
};

function NavLink(props: NavLinkProps): JSX.Element {
  if (props.label && props.icon) {
    return (
      <a
        key={props.label}
        href={props.href}
        aria-label={props.accesibilityLabel}
        title={props.accesibilityLabel}
        className="group flex w-max items-center gap-2"
      >
        <props.icon className="text-xl transition-colors group-hover:text-accent-primary" />
        <span className="group-hover:underline">{props.label}</span>
      </a>
    );
  } else if (props.label) {
    return (
      <a
        key={props.label}
        href={props.href}
        aria-label={props.accesibilityLabel}
        title={props.accesibilityLabel}
        className="transition-colors hover:text-accent-primary"
      >
        {props.label}
      </a>
    );
  } else if (props.icon) {
    return (
      <a
        key={props.label}
        href={props.href}
        target="_blank"
        rel="noreferrer"
        aria-label={props.accesibilityLabel}
        title={props.accesibilityLabel}
      >
        <props.icon className="text-xl transition-colors hover:text-accent-primary" />
      </a>
    );
  }

  return <></>;
}

function AvatarImage({
  profile
}: {
  profile: NonNullable<Window["__profile"]>;
}): JSX.Element {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: `url(${profile.avatar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    ></div>
  );
}

export function Header(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [profile, setProfile] = useState<Window["__profile"]>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.__profile) {
        setProfile(window.__profile);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section>
      <nav className="flex h-16 w-full items-center justify-between border-b-2 border-text-primary px-6 pl-6 md:pl-16 lg:pl-32 xl:pl-48">
        <div className="flex items-center gap-5">
          <a href="/" aria-label="Return Home">
            <Icon className="h-6" />
          </a>
          <div className="hidden items-center gap-5 sm:flex">
            <NavLink
              href="/"
              label="Home"
              accesibilityLabel="Return Home"
              icon={PiHouse}
            />
            <NavLink
              href="/games"
              label="Games"
              accesibilityLabel="View All Games"
              icon={PiGameController}
            />
            <NavLink
              href="/proxy"
              label="Proxy"
              accesibilityLabel="Explore the Web Freely"
              icon={PiDetective}
            />
            <NavLink
              href="/shop"
              label="Shop"
              accesibilityLabel="View Available Items"
              icon={PiBag}
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden gap-5 md:flex lg:pr-[3.25rem] xl:pr-[7.25rem]">
            <form method="GET" action="/search">
              <input
                name="q"
                className="rounded-md border-2 border-bg-secondary bg-transparent px-2 py-1 text-sm font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2"
                placeholder="Search Games"
                type="text"
                autoComplete="off"
              />
            </form>
          </div>
          <button
            aria-label="Expand Navigation"
            className="block h-7 w-7"
            onClick={() => {
              setIsExpanded(true);
            }}
          >
            {profile ? (
              <div className="h-full w-full rounded-full bg-bg-secondary">
                <AvatarImage profile={profile} />
              </div>
            ) : (
              <PiList className="text-xl" />
            )}
          </button>
        </div>
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
            key="sidebar"
            className="fixed right-0 top-0 z-50 h-screen w-full bg-black bg-opacity-25"
            onClick={() => {
              setIsExpanded(false);
            }}
          >
            <motion.div
              initial={{ right: "-100%" }}
              animate={{ right: 0 }}
              exit={{ width: 0 }}
              className="fixed h-full"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="h-full w-80 text-nowrap rounded-l-lg border-l border-bg-primary bg-bg-secondary shadow-lg">
                <div className="flex h-full flex-col">
                  <div className="flex h-16 w-full items-center justify-between border-b-2 border-text-primary px-4">
                    {profile ? (
                      <a
                        href="/profile"
                        aria-label="View Your Profile"
                        className="flex items-center gap-4"
                      >
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-bg-primary">
                          <AvatarImage profile={profile} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {profile.displayName}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {profile.username}
                          </span>
                        </div>
                      </a>
                    ) : (
                      <a
                        href="/login"
                        className="rounded-md border border-text-primary px-3 py-1.5 text-sm"
                      >
                        Login
                      </a>
                    )}
                    <button
                      aria-label="Collapse Navigation"
                      className="rounded-md p-1.5 transition-colors hover:bg-bg-primary"
                      onClick={() => {
                        setIsExpanded(false);
                      }}
                    >
                      <PiX className="text-xl" />
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col px-2">
                    <div className="flex flex-col gap-3 border-b border-text-primary p-3">
                      <NavLink
                        href="/"
                        label="Home"
                        accesibilityLabel="Return Home"
                        icon={PiHouse}
                      />
                      <NavLink
                        href="/games"
                        label="Games"
                        accesibilityLabel="View All Games"
                        icon={PiGameController}
                      />
                      <NavLink
                        href="/trending"
                        label="Trending"
                        accesibilityLabel="View Trending Games"
                        icon={PiChartLine}
                      />
                      <NavLink
                        href="/proxy"
                        label="Proxy"
                        accesibilityLabel="Explore the Web Freely"
                        icon={PiDetective}
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-3">
                      <NavLink
                        href="/profile"
                        label="Profile"
                        accesibilityLabel="View Your Profile"
                        icon={PiUser}
                      />
                      <NavLink
                        href="/shop"
                        label="Shop"
                        accesibilityLabel="View Available Items"
                        icon={PiBag}
                      />
                      <NavLink
                        href="/leaderboards"
                        label="Leaderboards"
                        accesibilityLabel="See Who's on Top"
                        icon={PiCertificate}
                      />
                      {profile ? (
                        <NavLink
                          href="/sign-out"
                          label="Sign Out"
                          accesibilityLabel="Sign Out of Your Account"
                          icon={PiSignOut}
                        />
                      ) : (
                        <> </>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-3 border-b border-text-primary p-3">
                      <NavLink
                        href="/settings"
                        label="Settings"
                        accesibilityLabel="Configure Your Experience"
                        icon={PiGear}
                      />
                      <NavLink
                        href="/game-developers"
                        label="Game Developers"
                        accesibilityLabel="Get Your Game Out There"
                        icon={PiCode}
                      />
                    </div>
                    <div className="flex justify-between p-4">
                      <span className="flex items-center gap-1">
                        <NavLink
                          accesibilityLabel="Discord"
                          href="//discord.gg/C2fbK35Rhg"
                          icon={PiDiscordLogo}
                        />
                        <PiDotOutlineFill />
                        <NavLink
                          accesibilityLabel="GitHub"
                          href="//github.com/Radon-Games/"
                          icon={PiGithubLogo}
                        />
                        <PiDotOutlineFill />
                        <NavLink
                          accesibilityLabel="Patreon"
                          href="//patreon.com/Radon_Games/"
                          icon={PiPatreonLogo}
                        />
                      </span>
                      <span className="flex items-center gap-1">
                        <NavLink
                          href="/privacy"
                          label="Privacy"
                          accesibilityLabel="Read Our Privacy Policy"
                        />
                        <PiDotOutlineFill />
                        <NavLink
                          href="/terms"
                          label="Terms"
                          accesibilityLabel="Read Our Terms of Service"
                        />
                      </span>
                    </div>
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
