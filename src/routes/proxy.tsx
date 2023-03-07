import { JSX } from "solid-js";
import Ad from "~/components/Ad";

declare global {
  var __uv$config: {
    prefix: string;
    encodeUrl: (app: string) => string;
  };
}

function navigate(element: HTMLInputElement) {
  element.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter" && element.value && !e.shiftKey) {
      const query = element.value;
      let url: string;

      if (/^https?:\/\/[^\s]+(\.[^\s]+)+$/.test(query)) {
        url = query;
      } else if (/^[^\s]+(\.[^\s]+)+$/.test(query)) {
        url = `https://${query}`;
      } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }

      window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    }
  });
}

export default function Proxy(): JSX.Element {
  return (
    <main class="my-24">
      <h1 class="text-2xl text-center py-10">Proxy</h1>
      <section class="flex flex-col gap-5 w-full items-center justify-center">
        <input
          type="text"
          placeholder="Search Google or type a URL"
          class="bg-gray-900 p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none shadow-2xl w-1/2 md:w-1/3 lg:w-1/4"
          ref={navigate}
        ></input>
        <Ad />
      </section>
    </main>
  );
}
