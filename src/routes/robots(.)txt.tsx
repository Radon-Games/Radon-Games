import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  if (url.host !== "radon.games") {
    return new Response("User-agent: *\nDisallow: /", {
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }

  return new Response("User-agent: *\nAllow: /", {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
