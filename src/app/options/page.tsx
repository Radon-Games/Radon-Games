import Page from "~/components/Page";
import Content from "./Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Options - Radon Games"
};

export default function Options() {
  return (
    <Page>
      <Content />
    </Page>
  );
}
