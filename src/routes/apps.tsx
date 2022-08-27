import UpdateTab from "../Tab";
import { onMount } from "solid-js";

declare var __uv$config: any;

export default function Apps () {
  onMount(() => {
    UpdateTab();
  });

  function redirect (url) {
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  }

  return (
    <div class="bg-gray-900 text-gray-100">
      <h1 class="text-2xl text-center py-10">Apps</h1>

      <p class="text-center hover:cursor-pointer hover:underline" onclick={ () => redirect("https://www.google.com/") }>Google</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick={ () => redirect("https://geforcenow.com/") }>Geforce Now</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick={ () => redirect("https://discord.com/") }>Discord</p>
      <p class="text-center hover:cursor-pointer hover:underline" onclick={ () => redirect("https://www.youtube.com/") }>YouTube</p>
    </div>
  );
}
