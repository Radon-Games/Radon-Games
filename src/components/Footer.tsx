import { version } from "../../package.json";
import { Banner } from "../assets/Banner";
import { useMatch } from "@tanstack/react-router";
import {
  PiGitBranchBold,
  PiGithubLogoBold,
  PiDiscordLogoBold,
  PiPatreonLogoBold
} from "react-icons/pi";

export function Footer() {
  const isProxy = useMatch({ from: "/proxy", shouldThrow: false });

  if (isProxy) return null;
  return (
    <footer className="flex flex-col justify-between gap-8 border-t-2 border-text-secondary px-8 py-16 sm:flex-row md:px-16 lg:px-32 xl:px-48">
      <div className="flex flex-1 flex-col items-start justify-center gap-5">
        <Banner className="h-6" />
        <p className="text-xs">
          An open-source unblocked games website built with simplicity in mind.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Radon-Games/Radon-Games"
            target="_blank"
            className="transition-colors hover:text-accent-primary"
            aria-label="GitHub"
          >
            <PiGithubLogoBold />
          </a>
          <a
            href="https://discord.gg/unblock"
            target="_blank"
            className="transition-colors hover:text-accent-primary"
            aria-label="Discord"
          >
            <PiDiscordLogoBold />
          </a>
          <a
            href="https://www.patreon.com/Radon_Games"
            target="_blank"
            className="transition-colors hover:text-accent-primary"
            aria-label="Patreon"
          >
            <PiPatreonLogoBold />
          </a>
          <a
            href={`https://github.com/Radon-Games/Radon-Games/releases/tag/v${version}`}
            target="_blank"
            className="flex items-center gap-2 hover:text-accent-primary"
            aria-label="Changelog"
          >
            <PiGitBranchBold /> <span className="text-sm">v{version}</span>
          </a>
        </div>
      </div>
      <div className="flex gap-12 text-sm">
        <div className="flex flex-col gap-2">
          <a href="/" className="hover:text-accent-primary">
            Home
          </a>
          <a href="/games" className="hover:text-accent-primary">
            Games
          </a>
          <a href="/search" className="hover:text-accent-primary">
            Search
          </a>
          <a
            target="_blank"
            href="https://discord.gg/t3d7wDA9WY"
            className="hover:text-accent-primary"
          >
            Request
          </a>
        </div>

        {/* <div class="flex flex-col gap-2">
          <a href="/login" class="hover:text-accent-primary">
            Login
          </a>
          <a href="/register" class="hover:text-accent-primary">
          Register
          </a>
          <a href="/profile" class="hover:text-accent-primary">
          Profile
          </a>
          <a href="/shop" class="hover:text-accent-primary">
            Shop
          </a>
        </div> */}

        <div className="flex flex-col gap-2">
          {/* <a href="/reset" class="hover:text-accent-primary">
            Reset
          </a> */}
          <a href="/preferences" className="hover:text-accent-primary">
            Preferences
          </a>
          <a href="/privacy" className="hover:text-accent-primary">
            Privacy
          </a>
          <a href="/terms" className="hover:text-accent-primary">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
