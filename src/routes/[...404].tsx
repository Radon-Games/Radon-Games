import { Link } from "solid-app-router";

import "../build.css";

export default function NotFound() {
  document.title = "404 Not Found - Radon Games";

  return (
    <>
      <main class="py-40 dots w-full">
        <div class="block mx-auto bg-gray-900 max-w-2xl p-5">
          <h1 class="text-center text-4xl">404 - Page Not Found</h1>
          <p class="text-center p-5">Return <Link class="underline" href="/">home</Link>.</p>
        </div>
      </main>
    </>
  );
}
