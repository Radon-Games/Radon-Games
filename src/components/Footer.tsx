import Icon from "./Icon";
import Banner from "../assets/banner.svg";

import { version } from "../../package.json";

export default function Footer () {
  return (
    <footer class="bg-gray-900 py-4 text-center mt-16 text-gray-100">
      <a href="/">
        <img src={ Banner } alt="Radon Games" class="h-4 block mx-auto" />
      </a>
      <p class="py-2">An open-source unblocked games website built with simplicity in mind.</p>
      <div class="py-5 px-5 sm:px-30 md:px-64 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a class="hover:underline" href="/">Home</a><br/>
          <a class="hover:underline" href="/games">Games</a><br/>
          <a class="hover:underline" href="/apps">Apps</a><br/>
          <a class="hover:underline" href="/services">Services</a>
        </div>
        <div>
          <a class="hover:underline" href="/partners">Partners</a><br/>
          <a class="hover:underline" href="/supporters">Supporters</a><br/>
          <a class="hover:underline" href="/settings">Settings</a>
        </div>
        <div>
          <a class="hover:underline" target="_blank" href="https://github.com/Radon-Games/Radon-Games/issues/new?assignees=&labels=game%20request&template=game_request.md">Game Request</a><br/>
          <a class="hover:underline" target="_blank" href="https://github.com/Radon-Games/Radon-Games/issues/new?assignees=&labels=bug&template=bug_report.md">Bug Report</a><br/>
          <a class="hover:underline" href="/changelog">Changelog</a><br/>
          <a class="hover:underline" href="/privacy">Privacy</a>
        </div>
        <div>
          <a target="_blank" class="hover:underline" href="https://github.com/Radon-Games/Radon-Games">GitHub</a><br/>
          <a target="_blank" class="hover:underline" href="https://discord.gg/C2fbK35Rhg">Discord</a><br/>
          <a target="_blank" class="hover:underline" href="https://www.patreon.com/Radon_Games">Patreon</a><br/>
          <a target="_blank" class="hover:underline" href="mailto:contact@radon.games">Contact</a>
        </div>
      </div>
      <a href={ `/changelog/${version}` }>
        <span class="text-gray-300 hover:underline"><Icon style="display:inline-block;" name="code-branch"/>v{ version }</span>
      </a>
    </footer>
  );
}
