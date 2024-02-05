import { BuildOptions, context } from "esbuild";

const isDev = process.argv.includes("--watch");

const config = {
  entryPoints: ["./src/entry.sw.ts"],
  outfile: "./public/sw.js",
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
  platform: "browser",
  target: "esnext",
  format: "esm"
} satisfies BuildOptions;

const ctx = await context(config);

if (isDev) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
