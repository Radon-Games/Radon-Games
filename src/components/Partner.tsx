import { JSX } from "solid-js";
import IconButton from "~/components/IconButton";

interface PartnerProps {
  name: string;
  website: string;
  discord: string;
  logo: string;
  description: string;
}

export default function Partner(props: PartnerProps): JSX.Element {
  return (
    <div class="w-1/3">
      <div class="flex justify-center">
        <img class="h-8" src={props.logo} alt={props.name} />
        <span class="text-xl px-2">{props.name}</span>
      </div>
      <p class="my-5 text-center">{props.description}</p>
      <div class="flex gap-5 justify-center">
        <IconButton href={props.website} text="Website" icon="fa-globe" />
        <IconButton
          href={props.discord}
          text="Discord"
          type="fa-brands"
          icon="fa-discord"
        />
      </div>
    </div>
  );
}
