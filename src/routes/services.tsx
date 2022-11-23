import UpdateTab from "../Tab";
import { onMount } from "solid-js";

export default function Services () {
  onMount(() => {
    UpdateTab();
  });

  return (
    <div class="bg-gray-900 text-gray-100">
      <h1 class="text-2xl text-center py-10">Services</h1>
      <div class="text-center">
        <a target="_blank" href="https://discord.gg/unblock" class="hover:underline text-lg mb-2">Check out Titanium Network!</a><br/>
        <a target="_blank" href="https://github.com/Radon-Games/Link-Bot" class="hover:underline">Link Bot</a>
      </div>
    </div>
  );
}
