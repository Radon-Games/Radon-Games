import Icon from "../components/Icon";
import UpdateTab from "../Tab";
import { onMount } from "solid-js";

export default function NotFound() {
  onMount(() => {
    UpdateTab();
  });

  return (
    <div class="bg-gray-900 text-gray-100 flex flex-col justify-center items-center">
      <main class="py-40 w-full flex flex-col justify-center items-center">
        <div class="bg-gray-900 max-w-2xl p-5 flex flex-col justify-center items-center">
          <h1 class="text-center text-4xl">404 - Page Not Found</h1>
          <a href="/" class="m-5 w-max flex text-center text-gray-100 bg-sky-500 p-4 hover:bg-sky-400 rounded-full transition-colors shadow-lg">
            <Icon name="home" style="margin-top: 0.3em;" />&nbsp; Return Home!
          </a>
        </div>
      </main>
    </div>
  );
}
