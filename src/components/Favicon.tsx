import { Tab } from "../routes/proxy";
import { BareClient } from "@tomphttp/bare-client";
import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

interface FaviconProps {
  tabId: number;
  tabs: Tab[];
}

export function Favicon(props: FaviconProps): JSX.Element {
  const [tab, setTab] = useState<Tab>(
    props.tabs.find((t) => t.id === props.tabId)!
  );
  const [icon, setIcon] = useState<string | undefined>(
    /^data:/.test(tab.url) ? undefined : tab.url
  );
  const bareClient = new BareClient(
    new URL(
      // @ts-ignore
      Array.isArray(__uv$config.bare) ? __uv$config.bare[0] : __uv$config.bare,
      location.href
    )
  );

  useEffect(() => {
    const newTab = props.tabs.find((t) => t.id === props.tabId)!;

    if (newTab.favicon !== tab.favicon) {
      setTab(newTab);
    }
  }, [props.tabs]);

  useEffect(() => {
    console.log(icon);
    const abort = new AbortController();

    if (/^data:/.test(tab.url)) return setIcon(tab.url);

    try {
      new URL(tab.url);
    } catch {
      return;
    }

    if (new URL(tab.url).origin === location.origin) {
      return setIcon(tab.url);
    }

    const promise = (async () => {
      try {
        const outgoing = await bareClient.fetch(tab.url, {
          signal: abort.signal
        });
        const blob = await outgoing.blob();
        if (!/image/.test(blob.type)) {
          setIcon("/icons/earth.svg");
        } else {
          const obj = URL.createObjectURL(blob);
          setIcon(obj);
          return obj;
        }
      } catch {
        try {
          const outgoing = await bareClient.fetch(
            `https://www.google.com/s2/favicons?domain=${tab.url}&sz=64`,
            {
              signal: abort.signal
            }
          );
          const blob = await outgoing.blob();
          if (!/image/.test(blob.type)) {
            setIcon("/icons/earth.svg");
          } else {
            const obj = URL.createObjectURL(blob);
            setIcon(obj);
            return obj;
          }
        } catch {}
      }
    })();

    return () => {
      abort.abort();
      promise?.then((obj) => (obj ? URL.revokeObjectURL(obj) : null));
    };
  });

  return (
    <div
      class={`h-5 w-5 bg-cover bg-no-repeat`}
      style={`background-image: url("${icon}")`}
    ></div>
  );
}
