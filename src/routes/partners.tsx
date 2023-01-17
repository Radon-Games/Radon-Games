import { JSX } from "solid-js";
import Partner from "~/components/Partner";
import TN from "~/assets/tn.webp";
import Nebula from "~/assets/nebula.png";
import WebLFG from "~/assets/weblfg.png";
import Astral from "~/assets/astral.png";

export default function Partners(): JSX.Element {
  return (
    <main>
      <h1 class="text-2xl text-center py-10">Partners</h1>
      <div class="flex flex-col gap-10 px-8 sm:px-16 md:px-20 lg:px-32">
        <div class="flex flex-col md:flex-row gap-10 justify-center">
          <Partner
            name="Titanium Network"
            website="https://titaniumnetwork.org/"
            discord="https://discord.gg/unblock"
            logo={TN}
            description="Titanium Network is the hub organization dedicated to providing services related to bypassing internet censorship. Our projects expect to provide users, and itself, with a less restrictive browsing experience. For this TN prioritizes the production and improvement of web proxy technologies."
          />
          <Partner
            name="Nebula Services"
            website="https://tutorialread.beauty/"
            discord="https://discord.gg/unblocker"
            logo={Nebula}
            description="Nebula is the biggest proxy community server, 2nd to TN. Our stunning proxy is clean, incredibly fast, constantly updated, and is reliable with little down time."
          />
        </div>
        <div class="flex flex-col md:flex-row gap-10 justify-center">
          <Partner
            name="WebLFG"
            website="https://www.weblfg.com/"
            discord="https://discord.gg/yXJgyuByYZ"
            logo={WebLFG}
            description="WebLFG is a hub for the best games on the internet, all available for free! There is so much for you to choose from."
          />
          <Partner
            name="Astral Network"
            website="https://lucidofficial.xyz/"
            discord="https://discord.gg/goastral"
            logo={Astral}
            description="Features include Beautiful Front-End UI, Ultraviolet Backend, Lightning Fast Speeds, About:Blank Cloak , Kahoot Proxy, Lucid Proxy, Premium & Free Domains."
          />
        </div>
      </div>
    </main>
  );
}
