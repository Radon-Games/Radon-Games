import { Prisma } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { parse } from "cookie";
import { useEffect, useState } from "react";
import {
  PiThumbsDownFill,
  PiThumbsUpFill,
  PiThumbsUp,
  PiThumbsDown,
  PiHeartFill,
  PiHeart,
  PiCornersOut
} from "react-icons/pi";
import Ad from "~/components/Ad";
import { NotFound } from "~/components/NotFound";
import { getProfileFromToken } from "~/util/auth";
import { db } from "~/util/db";
import { allGames } from "~/util/games";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { origin } = new URL(request.url);

  if (!params.slug) return json({ game: null, origin }, { status: 404 });

  const game = allGames.find((game) => game.slug === params.slug);

  if (!game) return json({ game: null, origin }, { status: 404 });

  return json({
    game,
    origin
  });
}

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const token = parse(request.headers.get("Cookie") ?? "").token ?? "";

  const profile = await getProfileFromToken(token, {
    likes: true,
    dislikes: true,
    favorites: true
  });
  const game = allGames.find((game) => game.slug === params.slug);

  const isLiked = !!profile?.likes.find(
    (likedGame) => likedGame.id === game?.id
  );
  const isDisliked = !!profile?.dislikes.find(
    (dislikedGame) => dislikedGame.id === game?.id
  );
  const isFavorited = !!profile?.favorites.find(
    (favoritedGame) => favoritedGame.id === game?.id
  );

  const update: Prisma.GameUpdateArgs = {
    where: {
      slug: params.slug!
    },
    data: {}
  };

  if (formData.get("like") === "on") {
    if (isLiked) {
      update.data = {
        numLikes: {
          decrement: 1
        },
        likes: {
          disconnect: {
            id: profile?.id
          }
        }
      };
    } else {
      update.data = {
        numLikes: {
          increment: 1
        },
        likes: {
          connect: {
            id: profile?.id
          }
        }
      };
    }

    if (isDisliked) {
      update.data.numDislikes = {
        decrement: 1
      };
      update.data.dislikes = {
        disconnect: {
          id: profile?.id
        }
      };
    }
  } else if (formData.get("dislike") === "on") {
    if (isDisliked) {
      update.data = {
        numDislikes: {
          decrement: 1
        },
        dislikes: {
          disconnect: {
            id: profile?.id
          }
        }
      };
    } else {
      update.data = {
        numDislikes: {
          increment: 1
        },
        dislikes: {
          connect: {
            id: profile?.id
          }
        }
      };
    }

    if (isLiked) {
      update.data.numLikes = {
        decrement: 1
      };
      update.data.likes = {
        disconnect: {
          id: profile?.id
        }
      };
    }
  } else if (formData.get("favorite") === "on") {
    if (isFavorited) {
      update.data = {
        numFavorited: {
          decrement: 1
        },
        favorited: {
          disconnect: {
            id: profile?.id
          }
        }
      };
    } else {
      update.data = {
        numFavorited: {
          increment: 1
        },
        favorited: {
          connect: {
            id: profile?.id
          }
        }
      };
    }
  }

  const updatedGame = await db.game.update(update);

  return json(updatedGame);
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
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [profile, setProfile] = useState<Window["__profile"]>(null);
  const { game } = useLoaderData<typeof loader>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.__profile) {
        setProfile(window.__profile);
        clearInterval(interval);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (profile) {
      setLiked(!!profile.likes.find((likedGame) => likedGame.id === game?.id));
      setDisliked(
        !!profile.dislikes.find((dislikedGame) => dislikedGame.id === game?.id)
      );
      setFavorited(
        !!profile.favorites.find(
          (favoritedGame) => favoritedGame.id === game?.id
        )
      );
    }
  }, [profile]);

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2
  });

  if (!game)
    return (
      <NotFound message="We weren't able to find a game that matches your request. Maybe try searching for it?" />
    );

  return (
    <main>
      <div className="my-16 min-h-32 w-full">
        <Ad slot="9539351850" />
      </div>
      <div className="my-16 flex w-full flex-col overflow-hidden rounded-lg bg-bg-secondary shadow-lg">
        <iframe
          id="game"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          allowFullScreen={true}
          allow="autoplay 'self'; camera 'none'; encrypted-media 'self'; geolocation 'none'; microphone 'none'; midi 'none'; payment 'none'; xr-spatial-tracking 'none';"
          title={game.title}
          scrolling="no"
          className="aspect-video w-full"
          src={`/iframe/${game.id}`}
        ></iframe>
        <div className="flex justify-between gap-2 p-5 pb-0">
          <div className="flex flex-col">
            <p className="text-sm">{game.author}</p>
            <h1 className="mb-1 text-2xl font-bold">{game.title}</h1>
            <div className="flex gap-2">
              {game.tags.map((tag) => {
                return (
                  <a
                    className="inset-0 whitespace-nowrap rounded bg-accent-secondary p-1 text-xs font-bold uppercase tracking-wide transition-all hover:scale-110"
                    href={`/tag/${tag.slug}`}
                    key={tag.slug}
                  >
                    {tag.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 text-2xl">
            <Form
              method="post"
              className="flex flex-col items-center gap-1"
              onSubmit={() => {
                setDisliked(false);
                setLiked(!liked);
              }}
            >
              <input
                type="checkbox"
                checked={true}
                className="hidden"
                name="like"
                readOnly
              ></input>
              <button
                className={liked ? "text-accent-primary" : ""}
                type="submit"
              >
                {liked ? <PiThumbsUpFill /> : <PiThumbsUp />}
              </button>
              <span className="text-xs">{formatter.format(game.numLikes)}</span>
            </Form>
            <Form
              method="post"
              className="flex flex-col items-center gap-1"
              onSubmit={() => {
                setLiked(false);
                setDisliked(!disliked);
              }}
            >
              <input
                type="checkbox"
                checked={true}
                className="hidden"
                name="dislike"
                readOnly
              ></input>
              <button
                className={disliked ? "text-accent-primary" : ""}
                type="submit"
              >
                {disliked ? <PiThumbsDownFill /> : <PiThumbsDown />}
              </button>
              <span className="text-xs">
                {formatter.format(game.numDislikes)}
              </span>
            </Form>
            <Form
              method="post"
              className="flex flex-col items-center gap-1"
              onSubmit={() => {
                const favorites = (localStorage.getItem("favorites") ?? "")
                  .split(",")
                  .filter((id) => id !== "");

                if (favorited) {
                  favorites.splice(favorites.indexOf(game.id), 1);
                  localStorage.setItem("favorites", favorites.join(","));
                  setFavorited(false);
                } else {
                  favorites.push(game.id);
                  localStorage.setItem("favorites", favorites.join(","));
                  setFavorited(true);
                }
              }}
            >
              <input
                type="checkbox"
                checked={true}
                className="hidden"
                name="favorite"
                readOnly
              ></input>
              <button
                className={favorited ? "text-accent-primary" : ""}
                type="submit"
              >
                {favorited ? <PiHeartFill /> : <PiHeart />}
              </button>
              <span className="text-xs">
                {formatter.format(game.numFavorited)}
              </span>
            </Form>

            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    document.getElementById("game")!.requestFullscreen();
                  }
                }}
              >
                <PiCornersOut />
              </button>
            </div>
          </div>
        </div>
        <p className="mb-2 px-5 py-3">{game.description}</p>
      </div>
      <div className="my-16 min-h-32 w-full">
        <Ad slot="9539351850" />
      </div>
    </main>
  );
}
