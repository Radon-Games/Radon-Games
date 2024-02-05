import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import bcrypt from "bcrypt";
import { parse } from "cookie";
import { useState } from "react";
import { Icon } from "~/assets/Icon";
import { Modal } from "~/components/Modal";
import { db } from "~/util/db";
import { generateToken } from "~/util/generateToken";
import { verifyCode } from "~/util/loginCodes";

export async function loader({ request }: LoaderFunctionArgs) {
  const { cookie } = parse(request.headers.get("Cookie") ?? "");

  if (!cookie) {
    return json({ isLoggedIn: false });
  }

  const [id, token] = cookie.split(".");

  if (!id || !token) {
    return json(
      { isLoggedIn: false },
      {
        headers: {
          "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
        }
      }
    );
  }

  const { tokenHash } =
    (await db.token.findUnique({
      where: {
        id
      }
    })) ?? {};

  if (!tokenHash) {
    return json(
      { isLoggedIn: false },
      {
        headers: {
          "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
        }
      }
    );
  }

  const valid = await bcrypt.compare(token, tokenHash);

  if (!valid) {
    return json(
      { isLoggedIn: false },
      {
        headers: {
          "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
        }
      }
    );
  }

  return json({ isLoggedIn: true });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const loginCode = formData.get("code");

  if (typeof loginCode !== "string") {
    return json({ error: "Invalid login code" }, { status: 400 });
  }

  const userId = verifyCode(loginCode);

  if (!userId) {
    return json({ error: "Invalid login code" }, { status: 400 });
  }

  const token = await generateToken();

  const dbToken = await db.token.create({
    data: {
      tokenHash: token.hash,
      expiresAt: token.expiresAt,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  return redirect("/profile", {
    headers: {
      "Set-Cookie": `token=${dbToken.id}.${token.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${token.expiresAt.getTime() - Date.now()}`
    }
  });
}

export default function Login() {
  const { isLoggedIn } = useLoaderData<typeof loader>();
  const { error } = useActionData<typeof action>() ?? {};
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoggedIn) {
    return redirect("/profile");
  }

  return (
    <>
      <main className="flex h-full w-full items-center justify-center p-16">
        <div className="flex flex-col items-center justify-center gap-3 rounded-md bg-bg-secondary px-14 py-12 shadow-lg">
          <Icon className="h-8" />
          <h1 className="text-xl">Login with Code</h1>
          <Form
            action="/login"
            method="POST"
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm font-medium">
                <label htmlFor="code">Login Code</label>
                <button
                  className="text-accent-primary underline"
                  onClick={(event) => {
                    event.preventDefault();
                    setModalOpen(true);
                  }}
                >
                  Whats This?
                </button>
              </div>
              <input
                id="code"
                type="text"
                name="code"
                autoComplete="false"
                autoCorrect="false"
                autoCapitalize="false"
                placeholder="Login Code"
                className={`rounded-md border bg-transparent px-3 py-1.5 focus:outline-none ${error ? "border-error" : "border-text-secondary"}`}
              />
              {error && (
                <span className="text-sm font-medium text-error">{error}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-accent-secondary px-3 py-1.5 shadow-xl"
            >
              Login
            </button>
          </Form>
        </div>
      </main>
      <Modal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title="Radon Authentication"
      >
        <div className="flex max-w-[50vw] flex-col gap-4">
          <p>We take a different approach to authentication here at Radon.</p>
          <ol className="ml-5 flex list-decimal flex-col gap-1">
            <li>
              Join our{" "}
              <a
                href="https://discord.gg/C2fbK35Rhg"
                target="_blank"
                rel="noreferrer"
                className="text-accent-primary underline"
              >
                Discord Server
              </a>
            </li>
            <li>
              Type <code>/login</code> in the <code>#commands</code> channel
            </li>
            <li>
              Copy the code that the bot sends you and paste it in the form
              below
            </li>
          </ol>
          <p>
            This will link your Discord profile with Radon&apos;s servers so
            that we can save your settings, favorites, and give you exclusive
            perks.
          </p>
          <p className="text-sm italic">
            <span className="text-error">*</span> By logging in or signing up,
            you agree to our{" "}
            <a href="/terms" className="text-accent-primary underline">
              Terms Of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-accent-primary underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </Modal>
    </>
  );
}
