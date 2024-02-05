import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/util/db";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) return json({ profile: null }, { status: 404 });

  const profile = await db.profile.findUnique({
    where: { id: params.id },
    include: { favorites: true }
  });

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

  if (!profile) return <div>Profile not found</div>;

  return <>{profile.displayName}</>;
}
