import { redirect } from "@remix-run/node";

export async function loader() {
  return redirect("/login", {
    headers: {
      "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    },
    status: 302
  });
}
