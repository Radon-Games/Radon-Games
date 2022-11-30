import { JSX } from "solid-js";
import NavbarButton from "./Button";
import IconButton from "./Icon";

export default function Navbar(): JSX.Element {
  return (
    <nav>
      <div class="flex items-center justify-between w-full p-5 sm:px-16 md:px-32 shadow-2xl">
        <div class="flex gap-5">
          <NavbarButton href="/" text="Home" icon="fa-home" />
          <NavbarButton href="/games" text="Games" icon="fa-gamepad-modern" />
          <NavbarButton href="/apps" text="Apps" icon="fa-command" />
        </div>
        <div class="flex gap-5">
          <IconButton href="/settings" text="Settings" icon="fa-gear" />
          <IconButton href="/account" text="Profile" icon="fa-user" />
        </div>
      </div>
    </nav>
  );
}
