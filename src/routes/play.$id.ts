import { ActionFunctionArgs, json } from "@remix-run/node";
import { parse } from "cookie";
import { getUserFromToken } from "~/util/auth";
import { db } from "~/util/db";

export function loader() {
  return json(
    {
      message: "Method not allowed"
    },
    {
      status: 405
    }
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(
      {
        message: "Method not allowed"
      },
      {
        status: 405
      }
    );
  }

  const user = await getUserFromToken(
    parse(request.headers.get("Cookie") ?? "").token ?? "",
    { profile: true }
  );

  const query: Parameters<typeof db.play.create>[0] = {
    data: {
      game: {
        connect: {
          id: params.id
        }
      }
    }
  };

  if (user) {
    query.data.user = {
      connect: {
        id: user.id
      }
    };
  }

  await db.play.create(query);

  const game = await db.game.update({
    where: {
      id: params.id
    },
    data: {
      numPlays: {
        increment: 1
      }
    }
  });

  await db.profile.update({
    where: {
      id: user?.id
    },
    data: {
      numPlays: {
        increment: 1
      }
    }
  });

  return json(game);
}
