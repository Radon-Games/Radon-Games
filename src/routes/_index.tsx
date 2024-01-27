import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/Header";

export const meta: MetaFunction = () => {
  return [{ title: "Home | Radon Games", "og:title": "Home | Radon Games" }];
};

export default function Index() {
  return (
    <main>
      <Header />
    </main>
  );
}
