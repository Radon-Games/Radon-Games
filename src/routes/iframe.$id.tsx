import {
  LoaderFunctionArgs,
  MetaFunction,
  SerializeFrom,
  json
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ExternalScriptsHandle } from "remix-utils/external-scripts";
import { Icon } from "~/assets/Icon";
import { NotFound } from "~/components/NotFound";
import { allGames } from "~/util/games";

type LoaderData = SerializeFrom<typeof loader>;

declare const RufflePlayer: {
  newest(): {
    createPlayer(): HTMLDivElement & {
      config: {
        preloader: boolean;
        splashScreen: boolean;
        unmuteOverlay: "hidden";
        autoplay: "on";
        contextMenu: boolean;
        showSwfDownload: boolean;
      };
      load(url: string): Promise<void>;
    };
  };
};

const extensions = {
  gb: "gb",
  gbc: "gbc",
  gba: "gba",
  nes: "nes",
  snes: "smc",
  n64: "z64",
  segaMD: "smd",
  nds: "nds"
} as const;

declare const UnityLoader: {
  Error: {
    handler: (e: Error) => void;
  };
  instantiate(
    container: string,
    dateURL: string,
    options: unknown
  ): {
    Module: {
      canvas: HTMLCanvasElement;
    };
  };
};

export const handle: ExternalScriptsHandle<LoaderData> = {
  scripts({ data }) {
    const { game } = data;

    if (game) {
      if (game.type === "iframe") {
        return [];
      } else if (game.type === "flash") {
        return [
          {
            src: "/ruffle/ruffle.js",
            preload: true
          }
        ];
      } else if (game.type === "unity") {
        return [
          {
            src: "/unity/UnityLoader.js",
            preload: true
          }
        ];
      }

      return [];
    } else {
      return [];
    }
  }
};

export const meta: MetaFunction = () => {
  return [{ name: "robots", content: "noindex" }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) return json({ game: null }, { status: 404 });

  const game = allGames.find((game) => game.id === params.id);

  if (!game) return json({ game: null }, { status: 404 });

  return json({
    game
  });
}

declare global {
  interface Window {
    EJS_player: string;
    EJS_core: string;
    EJS_gameUrl: string;
    EJS_pathtodata: string;
    EJS_Buttons: { [key: string]: boolean };
  }
}

export default function Iframe(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  const { game } = useLoaderData<typeof loader>();

  if (!game) {
    return <NotFound message="That game doesn't exist." />;
  }

  useEffect(() => {
    if (game.type === "flash") {
      // Create Ruffle player
      const ruffle = RufflePlayer.newest();
      const player = ruffle.createPlayer();
      player.style.width = "100%";
      player.style.height = "100%";

      // Ruffle configuration object
      player.config = {
        preloader: false,
        splashScreen: false,
        unmuteOverlay: "hidden",
        autoplay: "on",
        contextMenu: false,
        showSwfDownload: false
      };

      // For some reason the browser thinks there is margin, it doesn't appear in devtools so this is a hacky fix
      document.body.style.overflow = "hidden";

      const container =
        document.querySelector<HTMLDivElement>("#gameContainer");
      container?.appendChild(player);

      // Load the game file
      player
        .load(`/cdn/flash/${game.slug}.swf`)
        .then(() => {
          console.log("loaded");
          setLoading(false);
        })
        .catch(() => {
          console.log("error");
          setLoading(false);
          setErrored(true);
        });

      // Cleanup ruffle instance
      return () => {
        player.remove();
      };
    } else if (game.type === "unity") {
      UnityLoader.Error.handler = (e: Error) => {
        console.error(e);
        setLoading(false);
        setErrored(true);
      };

      // Create Unity container
      const instance = UnityLoader.instantiate(
        "gameContainer",
        `/cdn/unity/${game.slug}/data.json`,
        {
          onProgress: () => {},
          Module: {
            onRuntimeInitialized: () => {
              setLoading(false);
            },
            wasmRequest: function (
              wasmInstantiate: (_: unknown) => Promise<{ instance: unknown }>,
              callback: (_: unknown) => unknown
            ) {
              wasmInstantiate(
                (
                  this as typeof this & {
                    wasmBinary: unknown;
                  }
                ).wasmBinary
              ).then((result) => {
                callback(result.instance);
              });
            },
            // supress console messages
            print: () => {},
            printErr: () => {}
          }
        }
      );

      function updateSize() {
        instance.Module.canvas.style.width = "100%";
        instance.Module.canvas.style.height = "100%";

        requestAnimationFrame(updateSize);
      }

      requestAnimationFrame(updateSize);
    } else if (game.type === "html") {
      const iframe = document.createElement("iframe");

      iframe.className = "w-full h-full";

      iframe.src = `/cdn/html/${game.slug}/index.html`;

      iframe.addEventListener("load", () => {
        setLoading(false);
      });

      iframe.addEventListener("error", () => {
        setLoading(false);
        setErrored(true);
      });

      document
        .querySelector<HTMLDivElement>("#gameContainer")
        ?.appendChild(iframe);

      return () => {
        iframe.remove();
      };
    } else if (game.type === "emulator") {
      window.EJS_player = "#gameContainer";
      window.EJS_core = game.emulator!;
      window.EJS_gameUrl = `/cdn/emulator/${game.slug}.${extensions[game.emulator as keyof typeof extensions]}`;
      window.EJS_pathtodata = "/emulator/";
      window.EJS_Buttons = {
        playPause: false,
        restart: false,
        settings: false,
        fullscreen: false,
        saveState: false,
        loadState: false,
        screenRecord: false,
        cheat: false,
        saveSavFiles: true,
        loadSavFiles: true,
        quickSave: false,
        quickLoad: false,
        screenshot: false,
        cacheManager: false
      };

      const script = document.createElement("script");
      script.src = "/emulator/loader.js";
      document.body.appendChild(script);

      script.onload = () => {
        setLoading(false);
      };
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await fetch(`/play/${game.id}`, {
        method: "POST"
      });
    }, 60 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-bg-secondary p-0">
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-5 ${!loading && "hidden"}`}
      >
        <Icon className="w-10" />
        <svg
          className="h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div className={`h-full w-full ${!errored && "hidden"}`}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <Icon className="w-10" />
          <p>An error occurred.</p>
          <button
            className="cursor-pointer underline"
            onClick={() => {
              location.reload();
            }}
          >
            Refresh
          </button>
        </div>
      </div>
      <div
        id="gameContainer"
        className={`h-full w-full bg-white ${loading && "hidden"}`}
      ></div>
    </main>
  );
}
