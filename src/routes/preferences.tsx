import { categories, themes } from "../themes";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/preferences")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <section className="rounded-md bg-bg-secondary p-5">
        <h1 className="text-center text-lg">Themes</h1>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <>
              <span className="text-sm">{category.name}</span>

              {themes
                .filter((x) => x.category === category.id)
                .map((theme) => (
                  <div
                    className="flex cursor-pointer items-center justify-center rounded-md p-2 text-sm transition-all hover:scale-[1.01]"
                    // style={`background-color: ${theme.bgPrimary}; color: ${theme.textPrimary}`}
                    style={{
                      backgroundColor: theme.bgPrimary,
                      color: theme.textPrimary
                    }}
                    onClick={() => {
                      localStorage.setItem("theme", theme.id);
                      document.documentElement.dataset.theme = theme.id;
                    }}
                  >
                    {theme.name}
                  </div>
                ))}
            </>
          ))}
        </div>
      </section>

      <section className="rounded-md bg-bg-secondary p-5">
        <h1 className="text-center text-lg">Tab Cloaking</h1>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-16">
          <div className="flex flex-col items-center gap-2">
            <span>Page Title</span>
            <input
              className="rounded-md border border-text-secondary bg-bg-secondary px-2 py-1 text-sm focus:outline-0"
              onChange={(e) => {
                const title =
                  (e.target as HTMLInputElement).value.trim() || "Radon Games";

                document.title = title;
                localStorage.setItem("title", title);
              }}
              value={localStorage.getItem("title")?.trim() || "Radon Games"}
            ></input>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span>Page Icon</span>
            <input
              className="rounded-md border border-text-secondary bg-bg-secondary px-2 py-1 text-sm focus:outline-0"
              onChange={(e) => {
                const icon =
                  (e.target as HTMLInputElement).value.trim() || "/favicon.ico";

                document.querySelector<HTMLLinkElement>(
                  'link[rel="icon"]'
                )!.href = icon;
                localStorage.setItem("icon", icon);
              }}
              value={localStorage.getItem("icon")?.trim() || "/favicon.ico"}
            ></input>
          </div>
        </div>
      </section>
    </motion.main>
  );
}

