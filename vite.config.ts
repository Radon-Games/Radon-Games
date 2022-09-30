/** @type {import('vite').UserConfig} */

import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({ ssr: false })],
  build: {
    assetsDir: ""
  }
});
