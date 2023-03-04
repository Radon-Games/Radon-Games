import solid from "solid-start/vite";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";

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
    solid({ ssr: false })
  ],
  server: {
    proxy: {
      "^/cdn": {
        rewrite: (path) => path.replace(/^\/cdn/, ""),
        target: "https://cdn.radon.games",
        changeOrigin: true
      }
    }
  }
});
