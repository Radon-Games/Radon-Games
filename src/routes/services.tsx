import { Link } from "solid-app-router";

import "../build.css";

export default function Services () {
  document.title = "Services - Radon Games";

  return (
    <>
      <h1 class="text-2xl text-center py-10">Services</h1>
      <div class="text-center">
        <Link target="_blank" href="https://github.com/Radon-Games/DNS" class="hover:underline">Radon DNS</Link><br/>
        <Link target="_blank" href="https://github.com/Radon-Games/Link-Bot" class="hover:underline">Link Bot</Link>
      </div>
    </>
  );
}
