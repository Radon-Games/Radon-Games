import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import million from "million/compiler";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: `${uvPath}/.`.replace(/\\/g, "/"),
          dest: "uv"
        },
        {
          src: "public/uv/uv.config.js",
          dest: "uv"
        }
      ]
    }),
    million.vite({ mode: "preact" })
  ],
  server: {
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    },
    proxy: {
      "/cdn": {
        target: "https://cdn.radon.games",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
        headers: {
          referer: "https://cdn.radon.games"
        }
      },
      "/api": {
        target: "https://api.radon.games",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          referer: "https://api.radon.games"
        }
      }
    }
  }
});
