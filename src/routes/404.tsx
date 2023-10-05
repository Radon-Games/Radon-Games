import { Transparent } from "../assets/Transparent";
import { motion } from "framer-motion";

export function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex flex-col items-center justify-center gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <Transparent class="h-8" />
      <h1 class="text-2xl">404 - Page Not Found</h1>
      <p class="tracking-wide">
        Try returning{" "}
        <a
          class="underline transition-colors hover:text-accent-primary"
          href="/"
        >
          home
        </a>{" "}
        or searching games
      </p>
      <form action="/search" method="GET">
        <input
          name="q"
          class="rounded-md  border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2"
          type="text"
        />
      </form>
    </motion.main>
  );
}
