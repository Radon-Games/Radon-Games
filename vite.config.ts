import { dataPath } from "@radon-games/emulatorjs";
import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";

const rufflePath = path.resolve("node_modules/@ruffle-rs/ruffle");
const unityPath = path.resolve("node_modules/@radon-games/unityloader");

export default defineConfig({
  build: {
    target: "ES2022",
    outDir: "./dist"
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          // .replace fixes weird paths on Windows
          src: `${uvPath}/uv.*.js`.replace(/\\/g, "/"),
          dest: "uv",
          overwrite: false
        },
        {
          src: `${rufflePath}/*.{js,wasm}`.replace(/\\/g, "/"),
          dest: "ruffle",
          overwrite: false
        },
        {
          src: `${unityPath}/*.js`.replace(/\\/g, "/"),
          dest: "unity",
          overwrite: false
        },
        {
          src: `${dataPath}/*`.replace(/\\/g, "/"),
          dest: "emulator",
          overwrite: false
        }
      ]
    }),
    remix({
      appDirectory: "src",
      serverBuildDirectory: "dist/server",
      serverBuildFile: "index.js",
      assetsBuildDirectory: "dist/client"
    }),
    tsconfigPaths()
  ],
  optimizeDeps: {
    // Exclude bcrypt from being bundled
    exclude: ["bcrypt"]
  },
  server: {
    proxy: {
      "/cdn": {
        target: "https://cdn.radon.games",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
        headers: {
          referer: "https://cdn.radon.games"
        }
      }
    }
  }
});
