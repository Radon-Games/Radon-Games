import client from "./bot";
import type { EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { PassThrough } from "node:stream";
import {
  RenderToPipeableStreamOptions,
  renderToPipeableStream
} from "react-dom/server";

const ABORT_DELAY = 5000;

await client.login(process.env.TOKEN);

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const options: RenderToPipeableStreamOptions = {
      onShellError(error: unknown) {
        reject(error);
      },
      onError(error: unknown) {
        responseStatusCode = 500;
        if (shellRendered) {
          console.error(error);
        }
      }
    };

    function generateResponse() {
      shellRendered = true;
      const body = new PassThrough();
      const stream = createReadableStreamFromReadable(body);

      responseHeaders.set("Content-Type", "text/html");

      resolve(
        new Response(stream, {
          headers: responseHeaders,
          status: responseStatusCode
        })
      );

      pipe(body);
    }

    if (isbot(request.headers.get("user-agent") ?? "")) {
      options.onAllReady = generateResponse;
    } else {
      options.onShellReady = generateResponse;
    }

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      options
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
