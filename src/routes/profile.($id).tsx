import {
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { parse } from "cookie";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Carousel } from "~/components/Carousel";
import { AvatarImage } from "~/components/Header";
import { NotFound } from "~/components/NotFound";
import { getProfileFromToken, getUserIdFromToken } from "~/util/auth";
import { db } from "~/util/db";

dayjs.extend(relativeTime);

export async function loader({ params, request }: LoaderFunctionArgs) {
  const include = {
    favorites: {
      include: {
        tags: true
      }
    }
  };

  let profile;
  const token = parse(request.headers.get("Cookie") ?? "").token ?? "";

  if (params.id) {
    const userId = await getUserIdFromToken(token);

    profile = await db.profile.findUnique({
      where: { id: params.id },
      include
    });

    if (userId !== profile?.id) {
      if (profile?.private) {
        return json({ profile: null });
      }
    }
  } else {
    profile = await getProfileFromToken(token, include);

    if (!profile) return redirect("/login");
  }

  if (!profile) return json({ profile: null }, { status: 404 });

  return json({
    profile
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data && data.profile) {
    return [
      {
        title: `${data.profile.displayName} | Radon Games`
      },
      {
        name: "og:title",
        content: `${data.profile.displayName} | Radon Games`
      }
    ];
  } else {
    return [{ title: "404 - Profile not found | Radon Games" }];
  }
};

export default function Game() {
  const { profile } = useLoaderData<typeof loader>();

  if (!profile)
    return (
      <NotFound message="Either the profile you are trying to access is private or it doesn't exist." />
    );

  return (
    <main className="flex flex-col px-8 md:px-16 lg:px-32 xl:px-48">
      <section className="my-32 flex w-full flex-col gap-5">
        <div className="flex flex-col items-center gap-7 text-center sm:flex-row sm:text-left">
          <div className="aspect-square h-32 overflow-hidden rounded-full">
            {/* @ts-expect-error - TODO: fix types */}
            <AvatarImage profile={profile} />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-3xl font-bold">{profile.displayName}</h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <span className="text-sm text-text-secondary">
                {profile.username}
              </span>
              <span className="text-sm text-text-secondary">
                Last seen {dayjs(profile.updatedAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col items-center justify-center rounded-md bg-bg-secondary p-5 shadow-md">
            <span className="text-text-secondary">Play Tokens</span>
            <span className="text-2xl">{profile.playTokens}</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-md bg-bg-secondary p-5 shadow-md">
            <span className="text-text-secondary">Games Played</span>
            <span className="text-2xl">{profile.numPlays}</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-md bg-bg-secondary p-5 shadow-md">
            <span className="text-text-secondary">Account Age</span>
            <span className="text-2xl">
              {dayjs(profile.createdAt).fromNow(true)}
            </span>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <h3 className="mb-2 text-2xl font-bold tracking-wide">Favorites</h3>
        {/* @ts-expect-error - TODO: fix types */}
        <Carousel games={profile.favorites} />
      </section>
    </main>
  );
}
