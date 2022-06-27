import { Link } from "solid-app-router";

import "../../build.css";

export default function Services () {
  document.title = "Services - Radon Games";

  return (
    <>
      <h1 class="text-2xl text-center py-10">Services</h1>
      <div class="text-center">
        <Link href="dns" class="hover:underline">Radon DNS (Non-Blocking DNS Resolver)</Link>
      </div>
      <div class="text-center">
        <Link href="linkbot" class="hover:underline">Link Bot (Discord Link Bot)</Link>
      </div>
      {/* <div class="text-center">
        <Link href="appeal" class="hover:underline">Appeal (Disocrd Moderation Bot)</Link>
      </div> */}
    </>
  );
}
