import { defineConfig } from "vite";
import solid from "solid-start";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solid({ ssr: false }),
    VitePWA()
  ]
});
