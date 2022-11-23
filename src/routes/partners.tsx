import TN from "../assets/tn.webp";
import Nebula from "../assets/nebula.png";
import UBG100 from "../assets/ubg100.png";
import GameHub from "../assets/gamehub.png";
import Astral from "../assets/astral.png";
import UpdateTab from "../Tab";
import { onMount } from "solid-js";

export default function Partners () {
  onMount(() => {
    UpdateTab();
  });

  return (
    <div class="bg-gray-900 text-gray-100">
      <h1 class="text-2xl text-center py-10">Partners</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 mx-0 md:mx-32 py-5 text-center">
        <div class="my-10">
          <div class="flex justify-center">
            <img class="h-8" src={ TN } alt="TitaniumNetwork" />
            <span class="text-xl px-2">TitaniumNetwork</span>
          </div>
          <p class="px-20">
            <b>Titanium Network</b> is the hub organization dedicated to providing services related to bypassing internet censorship. Our projects expect to provide users, and itself, with a less restrictive browsing experience. For this TN prioritizes the production and improvement of web proxy technologies.
            <br/><br/>
            Discord: <a class="text-blue-500 hover:underline" target="_blank" href="https://discord.gg/unblock">https://discord.gg/unblock</a>
          </p>
        </div>

        <div class="my-10">
          <div class="flex justify-center">
            <img class="h-8" src={ Nebula } alt="Nebula Services" />
            <span class="text-xl px-2">Nebula Services</span>
          </div>
          <p class="px-20">
            <b>Nebula</b> is the biggest proxy community server, 3rd to TN and Ludicrous. Our stunning proxy is clean, incredibly fast, constantly updated and is reliable with little down time.
            <br/><br/>
            Website: <a class="text-blue-500 hover:underline" target="_blank" href="https://tutorialread.beauty/">https://tutorialread.beauty/</a>
            <br/>
            Discord: <a class="text-blue-500 hover:underline" target="_blank" href="https://discord.gg/unblocker">https://discord.gg/unblocker</a>
          </p>
        </div>

        <div class="my-10">
          <div class="flex justify-center">
            <img class="h-8" src={ UBG100 } alt="UBG100" />
            <span class="text-xl px-2">UBG100</span>
          </div>
          <p class="px-20">
            <b>UBG100</b> is a hub for the best games on the internet, all available for free! There is so much for you to choose from.
            <br/><br/>
            Website: <a class="text-blue-500 hover:underline" target="_blank" href="https://ubg100.github.io/">https://ubg100.github.io/</a>
            <br/>
            Discord: <a class="text-blue-500 hover:underline" target="_blank" href="https://discord.gg/yXJgyuByYZ">https://discord.gg/yXJgyuByYZ</a>
          </p>
        </div>

        <div class="my-10">
          <div class="flex justify-center">
            <img class="h-8" src={ GameHub } alt="Game Hub" />
            <span class="text-xl px-2">Game Hub</span>
          </div>
          <p class="px-20">
            <b>Game Hub</b>, an unblocked games website with games ranging from shooting games, to driving/car games, w/proxies and so much more! Play now!
            <br/><br/>
            Website: <a class="text-blue-500 hover:underline" target="_blank" href="https://xlegends.github.io/gxmehub/">https://xlegends.github.io/gxmehub/</a>
            <br/>
            Discord: <a class="text-blue-500 hover:underline" target="_blank" href="https://discord.gg/Fnc7hJZpC8">https://discord.gg/Fnc7hJZpC8</a>
          </p>
        </div>

        <div class="my-10">
          <div class="flex justify-center">
            <img class="h-8" src={ Astral } alt="Astral Network" />
            <span class="text-xl px-2">Astral Network</span>
          </div>
          <p class="px-20">
            Features include Beautiful Front-End UI, Ultraviolet Backend, Lightning Fast Speeds, About:Blank Cloak , Kahoot Proxy, Lucid Proxy, Premium & Free Domains
            <br/><br/>
            Website: <a class="text-blue-500 hover:underline" target="_blank" href="https://lucidofficial.xyz/">https://lucidofficial.xyz/</a>
            <br/>
            Discord: <a class="text-blue-500 hover:underline" target="_blank" href="https://discord.gg/XgQsUJKdAb">https://discord.gg/XgQsUJKdAb</a>
          </p>
        </div>
      </div>
    </div>
  );
}
