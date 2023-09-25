import million from "million/compiler";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [million.vite({ mode: "preact" })],
  server: {
    headers: {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline';"
    },
    proxy: {
      "/cdn": {
        target: "https://cdn.radon.games/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
        headers: {
          referer: "https://cdn.radon.games"
        }
      }
    }
  }
});
