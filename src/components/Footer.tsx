import { version } from "../../package.json";
import { Banner } from "../assets/Banner";
import {
  PiGitBranchBold,
  PiGithubLogoBold,
  PiDiscordLogoBold,
  PiPatreonLogoBold
} from "react-icons/pi";

export function Footer() {
  return (
    <footer class="flex justify-between gap-8 border-t-2 border-text-secondary px-8 py-16 md:px-16 lg:px-32 xl:px-48">
      <div class="flex flex-1 flex-col items-start gap-5">
        <Banner class="h-6" />
        <p class="text-xs">
          An open-source unblocked games website built with simplicity in mind.
        </p>
        <div class="flex items-center gap-5">
          <a
            href="https://github.com/Radon-Games/Radon-Games"
            class="transition-colors hover:text-accent-primary"
          >
            <PiGithubLogoBold />
          </a>
          <a
            href="https://discord.gg/unblock"
            class="transition-colors hover:text-accent-primary"
          >
            <PiDiscordLogoBold />
          </a>
          <a
            href="https://www.patreon.com/Radon_Games"
            class="transition-colors hover:text-accent-primary"
          >
            <PiPatreonLogoBold />
          </a>
          <a
            href={`https://github.com/Radon-Games/Radon-Games/releases/tag/v${version}`}
            target="_blank"
            class="flex items-center gap-2 hover:text-accent-primary"
          >
            <PiGitBranchBold /> v{version}
          </a>
        </div>
      </div>
      <div class="flex flex-1 flex-wrap items-center justify-end gap-5">
        <a class="hover:text-accent-primary">Home</a>
        <a class="hover:text-accent-primary">Games</a>
        <a class="hover:text-accent-primary">Search</a>
        <a class="hover:text-accent-primary">Login</a>
        <a class="hover:text-accent-primary">Register</a>
        <a class="hover:text-accent-primary">Profile</a>
        <a class="hover:text-accent-primary">Preferences</a>
        <a class="hover:text-accent-primary">Shop</a>
        <a class="hover:text-accent-primary">Privacy</a>
      </div>
    </footer>
  );
}
