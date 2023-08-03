import Page from "~/components/Page";
import Content from "./Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - Radon Games"
};

export default function Search(): JSX.Element {
  return (
    <Page>
      <Content />
    </Page>
  );
}
