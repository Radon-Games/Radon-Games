import {Transparent} from "../assets/Transparent";
import { Image } from "./Image";
import { motion } from "framer-motion";
import { IconType } from "react-icons/lib";
import {
  PiGameControllerBold,
  PiHouseBold,
  PiUserBold,
  PiGithubLogoBold,
  PiDiscordLogoBold
} from "react-icons/pi";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

function Link(props: { href: string; icon: IconType; text?: string }) {
  return (
    <motion.a
      href={props.href}
      target={/^(https?:)?\/\//.test(props.href) ? "_blank" : "_self"}
      variants={item}
      class="flex items-center gap-2 transition-colors hover:text-accent-primary"
    >
      <props.icon />
      {props.text ?? ""}
    </motion.a>
  );
}

export function Header() {
  return (
    <motion.nav
      class="border-text-secondary flex h-16 w-full items-center justify-between border-b-2 px-8 shadow-lg md:px-16 lg:px-32 xl:px-48"
      variants={{
        hidden: { opacity: 1, y: -64 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
            duration: 0.2
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      <div class="flex gap-5">
        <motion.a href="/" variants={item}>
          <Transparent class="h-6 w-auto" alt="Home" />
        </motion.a>
        <Link href="/" icon={PiHouseBold} text="Home" />
        <Link href="/games" icon={PiGameControllerBold} text="Games" />
        <Link href="/profile" icon={PiUserBold} text="Profile" />
      </div>
      <div class="flex gap-5">
        <Link
          href="https://github.com/Radon-Games/Radon-Games"
          icon={PiGithubLogoBold}
        />
        <Link href="https://discord.gg/unblock" icon={PiDiscordLogoBold} />
      </div>
    </motion.nav>
  );
}