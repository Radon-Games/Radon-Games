import NotFoundContent from "./NotFoundContent";
import { Metadata } from "next";
import Page from "~/components/Page";

export const metadata: Metadata = {
  title: "404 - Radon Games"
};

export default function NotFound(): JSX.Element {
  return (
    <Page>
      <NotFoundContent />
    </Page>
  );
}
