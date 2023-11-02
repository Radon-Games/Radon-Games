import { motion } from "framer-motion";

export function Proxy() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <div class="my-16 flex flex-col items-center justify-center gap-5">
        <h1 class="text-2xl">Unlock the Web</h1>
        <input
          class="w-72 rounded-md border border-text-secondary bg-bg-secondary px-3 py-2 font-normal focus:outline-0"
          placeholder="Type a URL or search Google"
          onKeyPress={(e) => {
            const query = (e.target as HTMLInputElement).value.trim();
            if (e.key === "Enter" && query) {
              let url: string;

              if (/^https?:\/\//.test(query)) {
                url = query;
              } else if (/^[^\s]+(\.[^\s]+)+$/.test(query)) {
                url = `https://${query}`;
              } else {
                url = `https://www.google.com/search?q=${encodeURIComponent(
                  query
                )}`;
              }

              // @ts-ignore
              location.href = `${__uv$config.prefix}${__uv$config.encodeUrl(
                url
              )}`;
            }
          }}
        ></input>
      </div>
    </motion.main>
  );
}
