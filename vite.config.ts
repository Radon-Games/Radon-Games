/** @type {import('vite').UserConfig} */

import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid()],
  build: {
    assetsDir: ""
  },
  ssr: {
    noExternal: ['solid-slider'],
  }
});
