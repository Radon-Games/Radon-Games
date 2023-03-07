import { JSX } from "solid-js";
import { Meta, Title } from "solid-start";

export default function SEO(): JSX.Element {
  return (
    <>
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="theme-color" content="#f59e0b" />

      <Title>Radon Games</Title>
      <Meta property="og:title" content="Radon Games" />

      <link rel="icon" href="/favicon.ico" />
      <Meta property="og:image" content="/icons/128.png" />
      <link rel="apple-touch-icon" href="/icons/128.png" />

      <Meta
        name="description"
        content="An open-source unblocked games website built with simplicity in mind."
      />
      <Meta
        property="og:description"
        content="An open-source unblocked games website built with simplicity in mind."
      />
      <Meta
        name="keywords"
        content="radon,games,radon games,unblocked,unblocked games,html games,html5 games,flash games,flashplayer games,proxy,io"
      />
    </>
  );
}
