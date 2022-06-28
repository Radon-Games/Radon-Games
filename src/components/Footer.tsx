import { Link } from "solid-app-router";

import Icon from "./Icon";

import { version } from "../../package.json";

export default function Footer () {
  return (
    <footer class="bg-gray-900 py-4 text-center mt-16">
      <Link href="/">
        <img src="/img/banner.svg" class="h-4 block mx-auto" />
      </Link>
      <p class="py-2">An open-source unblocked games website built with simplicity in mind.</p>
      <div class="py-5 px-5 sm:px-30 md:px-64 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link class="hover:underline" href="/">Home</Link><br />
          <Link class="hover:underline" href="/games">Games</Link><br />
          <Link class="hover:underline" href="/apps">Apps</Link><br />
          <Link class="hover:underline" href="/services">Services</Link>
        </div>
        <div>
          <Link class="hover:underline" href="/partners">Partners</Link><br />
          <Link class="hover:underline" href="/supporters">Supporters</Link><br />
          <Link class="hover:underline" href="/settings">Settings</Link>
        </div>
        <div>
          <Link class="hover:underline" href="/request">Game Request</Link><br />
          <Link class="hover:underline" href="/report">Game Report</Link><br />
          <Link class="hover:underline" href="/changelog">Changelog</Link>
        </div>
        <div>
          <Link target="_blank" class="hover:underline" href="https://github.com/Radon-Games/Radon-Games">GitHub</Link><br />
          <Link target="_blank" class="hover:underline" href="https://discord.gg/C2fbK35Rhg">Discord</Link><br />
          <Link target="_blank" class="hover:underline" href="https://www.patreon.com/Radon_Games">Patreon</Link><br />
          <Link target="_blank" class="hover:underline" href="mailto://contact@radon.games">Contact</Link>
        </div>
      </div>
      <Link href={ `/changelog/${version}` }>
        <span class="text-gray-500 hover:underline"><Icon style="display:inline-block;" name="code-branch"/>v{ version }</span>
      </Link>
    </footer>
  );
}
