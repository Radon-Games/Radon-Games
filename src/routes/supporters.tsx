import UpdateTab from "../Tab";
import { onMount } from "solid-js";

export default function Supporters () {
  onMount(() => {
    UpdateTab();
  });
  return (
    <div class="bg-gray-900 text-gray-100">
      <h1 class="text-2xl text-center py-10">Supporters</h1>
      <p class="text-center">Support Radon Games on <a class="hover:underline" target="_blank" href="https://www.patreon.com/Radon_Games">Patreon</a>!</p>

      <h2 class="text-xl text-center pt-10 pb-5">Tier 3 Supporters</h2>
      <p class="text-center">Marcus Hletko</p>

      <h2 class="text-xl text-center pt-10 pb-5">Tier 1 Supporters</h2>
      <p class="text-center">Rowan FL</p>
    </div>
  );
}
