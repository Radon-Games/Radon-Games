import Content from "./Content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import games from "~/games.json";

export type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = games.find((x) => x.id === params.id);

  if (!game) {
    return {};
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
    return notFound();
  }

  return (
    <div>
      <Content params={params} />
    </div>
  );
}
