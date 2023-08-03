import Page from "~/components/Page";
import Content from "./Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games - Radon Games"
};

export default function Games(): JSX.Element {
  return (
    <Page>
      <Content />
    </Page>
  );
}
