import Image from "next/image";
import Link from "next/link";
import {
  PiGithubLogoBold,
  PiDiscordLogoBold,
  PiGitBranchBold
} from "react-icons/pi";
import packageJson from "~/../package.json";
import bannerDark from "~/assets/banner-dark.svg";
import bannerLight from "~/assets/banner-light.svg";

export default function Footer(): JSX.Element {
  return (
    <footer className="mt-16 flex w-full flex-col justify-center gap-6 border-t border-text px-6 py-10 transition-all sm:px-8 md:flex-row md:justify-between md:px-16 lg:px-32">
      <div className="flex flex-col items-center gap-5 md:items-start">
        <Image src={bannerDark} alt="Radon Games" className="logo-dark w-48" />
        <Image
          src={bannerLight}
          alt="Radon Games"
          className="logo-light w-48"
        />
        <p className="text-sm">
          An open-source unblocked games website built with simplicity in mind.
        </p>
        <div className="flex gap-5">
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
        </div>
        <div className="flex items-center gap-2">
          <PiGitBranchBold />
          <span className="text-sm">v{packageJson.version}</span>
        </div>
      </div>
      <div className="flex justify-center gap-12 md:justify-start">
        <div className="flex flex-col gap-2">
          <Link className="expand" href="/">
            Home
          </Link>
          <Link className="expand" href="/games">
            Games
          </Link>
          <Link className="expand" href="/proxy">
            Proxy
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <Link className="expand" href="/partners">
            Partners
          </Link>
          <Link className="expand" href="/options">
            Options
          </Link>
          <Link className="expand" href="/privacy">
            Privacy
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <a
            className="expand"
            href="https://github.com/Radon-Games/Radon-Games/issues/new?assignees=&labels=game%20request&template=game_request.yaml"
            target="_blank"
          >
            Request
          </a>
          <a
            className="expand"
            href="https://github.com/Radon-Games/Radon-Games/issues/new?assignees=&labels=bug&template=bug_report.yaml"
            target="_blank"
          >
            Report
          </a>
          <a
            className="expand"
            href="https://www.patreon.com/Radon_Games"
            target="_blank"
          >
            Patreon
          </a>
        </div>
      </div>
    </footer>
  );
}
