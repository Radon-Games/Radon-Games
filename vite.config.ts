import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({ ssr: false })],
  build: {
    assetsDir: ""
  },
  server: {
    proxy: {
      "^/cdn": {
        target: "http://45.89.198.7"
      },
      "^/bare": {
        target: "http://45.89.198.7",
        ws: true
      }
    }
  }
});
