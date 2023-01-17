import { JSX } from "solid-js";
import Button from "~/components/Button";

declare global {
  interface Window {
    __uv$config: {
      encodeUrl: (app: string) => string;
    };
  }
}

function openApp(app: string): void {
  location.href = "/~uv/" + window.__uv$config.encodeUrl(app);
}

export default function Apps(): JSX.Element {
  return (
    <main>
      <h1 class="text-2xl text-center py-10">Apps</h1>
      <section class="flex flex-col gap-5 w-full items-center justify-center">
        <Button
          onClick={(): void => openApp("https://www.google.com")}
          text="Google"
          icon="fa-globe"
        />
        <Button
          onClick={(): void => openApp("https://discord.com/login")}
          text="Discord"
          icon="fa-globe"
        />
        <Button
          onClick={(): void => openApp("https://www.nvidia.com/geforce-now")}
          text="Geforce Now"
          icon="fa-globe"
        />
        <Button
          onClick={(): void => openApp("https://www.youtube.com")}
          text="YouTube"
          icon="fa-globe"
        />
      </section>
    </main>
  );
}
