import { Transparent } from "../assets/Transparent";
import { useMatch } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { IconType } from "react-icons/lib";
import {
  PiGameControllerBold,
  PiHouseBold,
  PiGithubLogoBold,
  PiDiscordLogoBold,
  PiGearBold,
  PiDetectiveBold
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

function Link(props: {
  href: string;
  icon: IconType;
  text?: string;
  label?: string;
}) {
  return (
    <motion.a
      href={props.href}
      target={/^(https?:)?\/\//.test(props.href) ? "_blank" : "_self"}
      variants={item}
      className="flex items-center gap-2 transition-colors hover:text-accent-primary"
      aria-label={props.label ?? props.text}
    >
      <props.icon />
      {props.text ?? ""}
    </motion.a>
  );
}

export function Header() {
  const isProxy = useMatch({ from: "/proxy", shouldThrow: false });

  if (isProxy) return null;

  return (
    <motion.nav
      className="flex h-16 w-full items-center justify-center border-b-2 border-text-secondary bg-bg-primary px-8 shadow-lg sm:justify-between md:px-16 lg:px-32 xl:px-48"
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
      <div className="flex gap-5">
        <motion.a href="/" variants={item} aria-label="Home">
          <Transparent className="h-6 w-auto" />
        </motion.a>
        <Link href="/" icon={PiHouseBold} text="Home" />
        <Link href="/games" icon={PiGameControllerBold} text="Games" />
        <Link href="/proxy" icon={PiDetectiveBold} text="Proxy" />
      </div>
      <div className="hidden gap-5 sm:flex">
        <form method="GET" action="/search">
          <motion.input
            name="q"
            variants={item}
            className="rounded-md border border-bg-secondary bg-transparent px-2 py-1 text-sm font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2"
            placeholder="Search"
            type="text"
          />
        </form>
        <Link href="/preferences" icon={PiGearBold} label="Preferences" />
        <Link
          href="https://github.com/Radon-Games/Radon-Games"
          icon={PiGithubLogoBold}
          label="GitHub"
        />
        <Link
          href="https://discord.gg/unblock"
          icon={PiDiscordLogoBold}
          label="Discord"
        />
      </div>
    </motion.nav>
  );
}
