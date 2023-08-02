import Image from "next/image";
import Link from "next/link";
import {
  PiGameControllerBold,
  PiComputerTowerBold,
  PiHouseBold,
  PiGithubLogoBold,
  PiDiscordLogoBold,
  PiGearBold
} from "react-icons/pi";
import { searchKeyDown } from "~/app/search/Content";
import logoDark from "~/assets/icon-dark.svg";
import logoLight from "~/assets/icon-light.svg";

export default function NavBar(): JSX.Element {
  return (
    <nav className="flex h-16 items-center justify-center gap-6 border-b border-text px-6 shadow-md transition-all sm:justify-between sm:px-8 md:px-16 lg:px-32">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Image
            className="logo-dark h-6 w-8 text-text"
            src={logoDark}
            alt="logo"
          />
          <Image
            className="logo-light h-6 w-8 text-text"
            src={logoLight}
            alt="logo"
          />
        </Link>
        <Link
          className="expand flex items-center gap-1 transition-colors"
          href="/"
        >
          <PiHouseBold />
          Home
        </Link>
        <Link
          className="expand flex items-center gap-1 transition-colors"
          href="/games"
        >
          <PiGameControllerBold />
          Games
        </Link>
        <Link
          className="expand flex items-center gap-1 transition-colors"
          href="/proxy"
        >
          <PiComputerTowerBold />
          Proxy
        </Link>
      </div>
      <div className="hidden items-center gap-6 sm:flex">
        <a
          href="https://discord.gg/unblock"
          target="_blank"
          className="transition-colors hover:text-accent"
          title="Titanium Network Discord"
        >
          <PiDiscordLogoBold />
        </a>
        <a
          href="https://github.com/Radon-Games/Radon-Games"
          target="_blank"
          className="transition-colors hover:text-accent"
          title="Source Code"
        >
          <PiGithubLogoBold />
        </a>
        <input
          type="text"
          onKeyDown={searchKeyDown}
          placeholder="Search Games"
          autoComplete="off"
          className="rounded bg-background-secondary px-3 py-1.5 text-sm shadow focus:outline-none active:outline-0 lg:w-64"
        ></input>
        <Link
          href="/options"
          className="transition-colors hover:text-accent"
          title="Configure"
        >
          <PiGearBold />
        </Link>
      </div>
    </nav>
  );
}
