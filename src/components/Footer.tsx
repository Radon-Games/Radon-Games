import { version } from "../../package.json";
import { Transparent } from "../assets/Transparent";
import { Image } from "./Image";
import {
  PiGithubLogoBold,
  PiDiscordLogoBold,
  PiPatreonLogoBold
} from "react-icons/pi";

export function Footer() {
  return (
    <footer class="flex w-full flex-col items-center gap-5 border-t-2 border-text-secondary px-8 py-16 md:px-16 lg:px-32  xl:px-48">
      <div class="flex gap-5">
        <a href="/" class="hover:text-accent-primary transition-colors">
          Home
        </a>
        <a href="/games" class="hover:text-accent-primary transition-colors">
          Games
        </a>
        <a href="/profile" class="hover:text-accent-primary transition-colors">
          Profile
        </a>
        <a
          href="/preferences"
          class="hover:text-accent-primary transition-colors"
        >
          Preferences
        </a>
        <a href="/privacy" class="hover:text-accent-primary transition-colors">
          Privacy
        </a>
      </div>
      <div class="flex gap-5 text-xl">
        <a
          href="https://github.com/Radon-Games/Radon-Games"
          class="hover:text-accent-primary transition-colors"
        >
          <PiGithubLogoBold />
        </a>
        <a
          href="https://discord.gg/unblock"
          class="hover:text-accent-primary transition-colors"
        >
          <PiDiscordLogoBold />
        </a>
        <a
          href="https://www.patreon.com/Radon_Games"
          class="hover:text-accent-primary transition-colors"
        >
          <PiPatreonLogoBold />
        </a>
      </div>
      <div class="flex gap-5">
        <Transparent class="h-5" />
        <a
          class="hover:text-accent-primary transition-colors"
          href={`https://github.com/Radon-Games/Radon-Games/releases/tag/v${version}`}
          target="_blank"
        >
          v{version}
        </a>
      </div>
    </footer>
  );
}
