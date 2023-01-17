import { JSX } from "solid-js";
import Button from "~/components/Button";

export default function NotFound(): JSX.Element {
  return (
    <main class="h-screen flex w-full items-center justify-center flex-col gap-5">
      <h1 class="text-3xl font-semibold text-center">404 - Page Not Found</h1>
      <p class="text-center">The page you are looking for does not exist.</p>
      <Button text="Go Home" icon="fa-home" href="/" />
    </main>
  );
}
