import Content from "./Content";
import { Metadata } from "next";
import NotFound from "~/app/not-found";
import Page from "~/components/Page";
import games from "~/games.json";

export type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = games.find((x) => x.id === params.id);

  if (!game) {
    return {
      title: "404 - Radon Games"
    };
  }

  return {
    title: `${game.title} - Radon Games`,
    description: game.description,
    authors: {
      name: game.author
    },
    keywords: [
      game.title,
      ...game.title.split(/ /g),
      ...game.tags,
      game.author,
      ...game.author.split(/ /g),
      game.type,
      "unblocked",
      "online",
      "play"
    ],
    twitter: {
      card: "summary_large_image",
      creator: game.author,
      images: game.cover
    }
  };
}

export default function Game({ params }: Props): JSX.Element {
  const game = games.find((x) => x.id === params.id);

  if (!game) {
    return <NotFound />;
  }

  return (
    <Page>
      <Content params={params} />
    </Page>
  );
}
