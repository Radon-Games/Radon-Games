import million from "million/compiler";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [million.vite({ mode: "preact" })],
  server: {
    headers: {
      "Content-Security-Policy":
        "default-src 'self' *.google-analytics.com pagead2.googlesyndication.com;style-src 'unsafe-inline';script-src 'self' 'unsafe-inline' *.googletagmanager.com pagead2.googlesyndication.com;"
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
