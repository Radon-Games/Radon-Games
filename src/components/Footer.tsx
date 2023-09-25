import { version } from "../../package.json";
import transparent from "../assets/transparent.svg";
import { Image } from "./Image";
import {
  PiGithubLogoBold,
  PiDiscordLogoBold,
  PiPatreonLogoBold
} from "react-icons/pi";

export function Footer() {
  return (
    <footer class="flex w-full flex-col items-center gap-5 border-t-2 border-slate-100 px-8 py-16 md:px-16 lg:px-32  xl:px-48">
      <div class="flex gap-5">
        <a href="/" class="transition-colors hover:text-amber-500">
          Home
        </a>
        <a href="/games" class="transition-colors hover:text-amber-500">
          Games
        </a>
        <a href="/profile" class="transition-colors hover:text-amber-500">
          Profile
        </a>
        <a href="/preferences" class="transition-colors hover:text-amber-500">
          Preferences
        </a>
        <a href="/privacy" class="transition-colors hover:text-amber-500">
          Privacy
        </a>
      </div>
      <div class="flex gap-5 text-xl">
        <a
          href="https://github.com/Radon-Games/Radon-Games"
          class="transition-colors hover:text-amber-500"
        >
          <PiGithubLogoBold />
        </a>
        <a
          href="https://discord.gg/unblock"
          class="transition-colors hover:text-amber-500"
        >
          <PiDiscordLogoBold />
        </a>
        <a
          href="https://www.patreon.com/Radon_Games"
          class="transition-colors hover:text-amber-500"
        >
          <PiPatreonLogoBold />
        </a>
      </div>
      <div class="flex gap-5">
        <Image src={transparent} class="h-5"></Image>
        <a
          class="transition-colors hover:text-amber-500"
          href={`https://github.com/Radon-Games/Radon-Games/releases/tag/v${version}`}
          target="_blank"
        >
          v{version}
        </a>
      </div>
    </footer>
  );
}
