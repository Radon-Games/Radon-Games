import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { parse } from "cookie";
import { NotFound } from "~/components/NotFound";
import { getProfileFromToken } from "~/util/auth";
import { db } from "~/util/db";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const include = { favorites: true };

  let profile;

  if (params.id) {
    profile = await db.profile.findUnique({
      where: { id: params.id },
      include
    });
  } else {
    profile = await getProfileFromToken(
      parse(request.headers.get("Cookie") ?? "").token ?? "",
      include
    );
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
      <NotFound message="We weren't able to find a profile that matches your request. Maybe a typo?" />
    );

  return <>{profile.displayName}</>;
}
