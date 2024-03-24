import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { NotFound } from "~/components/NotFound";
import { db } from "~/util/db";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { origin } = new URL(request.url);

  if (!params.slug) return json({ game: null, origin }, { status: 404 });

  const game = await db.game.findUnique({
    where: { slug: params.slug }
  });

  if (!game) return json({ game: null, origin }, { status: 404 });

  return json({
    game,
    origin
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data && data.game) {
    return [
      {
        title: `${data.game.title} | Radon Games`
      },
      {
        name: "og:title",
        content: `${data.game.title} | Radon Games`
      },
      {
        name: "description",
        content: data.game.description
      },
      {
        name: "og:description",
        content: data.game.description
      },
      {
        name: "og:image",
        content: `${data.origin}/cdn/images/${data.game.id}.png`
      },
      {
        name: "author",
        content: data.game.author
      },
      {
        name: "og:url",
        value: `${data.origin}/game/${data.game.id}`
      }
    ];
  } else {
    return [{ title: "404 - Game not found | Radon Games" }];
  }
};

export default function Game() {
  const { game } = useLoaderData<typeof loader>();

  if (!game)
    return (
      <NotFound message="We weren't able to find a game that matches your request. Maybe try searching for it?" />
    );

  return <>{game.title}</>;
}
