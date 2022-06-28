import { Link } from "solid-app-router";

import "../build.css";

export default function Supporters () {
  document.title = "Supporters - Radon Games";

  return (
    <>
      <h1 class="text-2xl text-center py-10">Supporters</h1>
      <p class="text-center">Support Radon Games on <Link class="hover:underline" target="_blank" href="https://www.patreon.com/Radon_Games">Patreon</Link>!</p>

      <h2 class="text-xl text-center pt-10 pb-5">Tier 1 Supporters</h2>
      <p class="text-center">Rowan FL</p>
    </>
  );
}
