import { Transparent } from "../assets/Transparent";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getStyle } from "../util/theme";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AnimatePresence, motion } from "motion/react";

export const Route = createRootRoute({
  component: Index,
  notFoundComponent: NotFound
});

function Index() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: getStyle() }}></style>

      <Header />
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
      <Footer />

      <TanStackRouterDevtools />
    </>
  );
}

function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col items-center justify-center gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <Transparent className="h-8" />
      <h1 className="text-2xl">404 - Page Not Found</h1>
      <p className="tracking-wide">
        Try returning{" "}
        <a
          className="underline transition-colors hover:text-accent-primary"
          href="/"
        >
          home
        </a>{" "}
        or searching games
      </p>
      <form action="/search" method="GET">
        <input
          name="q"
          className="rounded-md  border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2"
          type="text"
        />
      </form>
    </motion.main>
  );
}
