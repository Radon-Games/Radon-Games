import { Banner } from "../assets/Banner";
import { Transparent } from "../assets/Transparent";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, Reorder } from "motion/react";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiMaximize,
  FiPlus,
  FiRotateCw,
  FiX
} from "react-icons/fi";

export type Tab = {
  id: number;
  title: string;
  favicon: string;
  url: string;
};

export const Route = createFileRoute("/proxy")({
  component: RouteComponent
});

function RouteComponent() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<number>(
    Number(localStorage.getItem("activeTab")!) || 0
  );
  const [inputValue, setInputValue] = useState<string | null>(null);
  // console.log("REF: ", document.referrer);
  function addTab(url: string): number {
    const tab = {
      id: Math.floor(Math.random() * 1000000),
      title: url,
      favicon: "https://www.google.com/s2/favicons?domain=duckduckgo.com",
      url
    };
    setTabs([...tabs, tab]);
    addFrame(tab);
    setActiveTab(tab.id);
    setInputValue(null);

    return tab.id;
  }

  function addFrame(tab: Tab) {
    const iframe = document.createElement("iframe");
    // @ts-expect-error scram
    iframe.src = scram.encodeUrl(tab.url);
    iframe.id = tab.id.toString();
    iframe.className = "w-full flex-1";
    document.getElementById("frames")!.appendChild(iframe);
  }

  function removeTab(id: number) {
    const iframe = document.getElementById(id.toString());
    if (iframe) {
      iframe.remove();
    }

    const oldActiveTab = activeTab;
    if (oldActiveTab === id) {
      setTabs(tabs.filter((x) => x.id !== id));
      setActiveTab(tabs.filter((x) => x.id !== id)[0]?.id ?? 0);
      setInputValue(null);
    } else {
      setTabs(tabs.filter((x) => x.id !== id));
    }
  }

  function redirect(id: number, query: string) {
    const tab = tabs.find((x) => x.id === id)!;

    let url;
    if (/^https?:\/\//.test(query)) {
      url = query;
    } else if (/^.+\..+/.test(query)) {
      url = `https://${query}`;
    } else {
      url = `https://duckduckgo.com/?q=${query}`;
    }

    tab.url = url;

    const iframe = document.getElementById(id.toString()) as HTMLIFrameElement;
    //@ts-expect-error scram
    iframe.src = scram.encodeUrl(url);

    const index = tabs.findIndex((x) => x.id === id);

    setTabs([...tabs.slice(0, index), tab, ...tabs.slice(index + 1)]);
  }

  useEffect(() => {
    try {
      const tabs = JSON.parse(localStorage.getItem("tabs") ?? "");
      setTabs(tabs);
      for (const tab of tabs) {
        addFrame(tab);
      }
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    if (tabs.length === 0) {
      //TODO: Find better solution
      // if i dont do this we get a weird libcurl error about not loading the wasm
      setTimeout(() => {
        addTab("https://duckduckgo.com/");
      }, 200);
    }

    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.style.display = "none";
    });
    const iframe = document.getElementById(activeTab.toString());
    if (iframe) {
      iframe.style.display = "block";
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    const iframe = document.getElementById(
      activeTab.toString()
    ) as HTMLIFrameElement;

    const interval = setInterval(() => {
      if (!iframe || !iframe.contentWindow) return;
      if (iframe.contentWindow.location.href === "about:blank") return;
      const title = iframe.contentDocument!.title;
      // @ts-expect-error scram
      const url = scram.decodeUrl(
        location.origin + iframe.contentWindow!.location.pathname
      );
      const favicon =
        iframe.contentDocument!.querySelector<HTMLLinkElement>(
          "link[rel='shortcut icon'], link[rel='icon']"
        )?.href ?? new URL(url).origin + "/favicon.ico";

      const tab = tabs.find((x) => x.id === activeTab)!;

      if (tab?.title !== title) {
        tab.title = title;
      }

      if (tab?.favicon !== favicon) {
        tab.favicon = favicon!;
      }

      if (tab?.url !== url) {
        tab.url = url;
      }

      const tabIndex = tabs.findIndex((x) => x.id === activeTab);

      setTabs([...tabs.slice(0, tabIndex), tab, ...tabs.slice(tabIndex + 1)]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [activeTab]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex h-full w-full select-none"
    >
      <div className="flex h-full w-16 flex-col border-r-2 border-bg-secondary bg-bg-primary transition-all sm:w-64">
        <div className="flex h-16 w-full items-center justify-center border-b-2 border-bg-secondary">
          <a href="/">
            <Banner className="hidden h-6 sm:block" />
            <Transparent className="block h-6 sm:hidden" />
          </a>
        </div>
        <Reorder.Group
          as="div"
          axis="y"
          onReorder={(newTabs: Tab[]) => {
            setTabs(newTabs);
          }}
          values={tabs}
          className="scrollbar-none flex w-full flex-1 flex-col items-center gap-2 overflow-y-scroll p-2 transition-none sm:p-4"
        >
          <AnimatePresence>
            {tabs.map((tab) => {
              return (
                <Reorder.Item
                  key={tab.id}
                  value={tab}
                  as="div"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1
                  }}
                  transition={{
                    duration: 0.1
                  }}
                  className={`flex aspect-square h-10 w-10 items-center justify-center rounded p-2 text-sm sm:w-full sm:justify-normal sm:gap-2 ${
                    tab.id === activeTab
                      ? "bg-accent-secondary"
                      : "bg-bg-secondary"
                  }`}
                  onMouseDown={() => {
                    setActiveTab(tab.id);
                    setInputValue(null);
                  }}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${tab.url}`}
                    className="h-5 w-5"
                    draggable={false}
                  ></img>
                  <span className="hidden flex-1 truncate whitespace-nowrap text-text-primary sm:block">
                    {tab.title}
                  </span>
                  <div
                    className="hidden sm:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTab(tab.id);
                    }}
                  >
                    <FiX />
                  </div>
                </Reorder.Item>
              );
            })}
          </AnimatePresence>
        </Reorder.Group>
        <div className="flex h-16 w-full items-center justify-end border-t-2 border-bg-secondary p-4 text-xl">
          <div
            className="rounded bg-bg-secondary p-2"
            onClick={() => {
              addTab("https://duckduckgo.com");
            }}
          >
            <FiPlus />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-white" id="frames">
        <div className="flex h-16 w-full items-center justify-center gap-2 bg-bg-secondary p-3">
          <div
            onClick={() => {
              (
                document.getElementById(
                  activeTab.toString()
                ) as HTMLIFrameElement
              ).contentWindow!.history.back();
            }}
            className="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
          >
            <FiArrowLeft />
          </div>
          <div
            onClick={() => {
              (
                document.getElementById(
                  activeTab.toString()
                ) as HTMLIFrameElement
              ).contentWindow!.history.forward();
            }}
            className="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
          >
            <FiArrowRight />
          </div>
          <div
            onClick={() => {
              (
                document.getElementById(
                  activeTab.toString()
                ) as HTMLIFrameElement
              ).contentWindow!.location.reload();
            }}
            className="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
          >
            <FiRotateCw />
          </div>
          <input
            className="h-full flex-1 rounded bg-bg-primary px-3 py-2 font-medium shadow focus:outline-0"
            value={
              inputValue !== null
                ? inputValue
                : tabs.find((x) => x.id === activeTab)?.url || ""
            }
            onInput={(e) => {
              setInputValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                redirect(activeTab, e.currentTarget.value);
                setInputValue(null);
                e.currentTarget.blur();
              }
            }}
          ></input>
          <div
            onClick={() => {
              document
                .getElementById(activeTab.toString())!
                .requestFullscreen();
            }}
            className="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
          >
            <FiMaximize />
          </div>
          <div
            onClick={() => {
              open(
                (
                  document.getElementById(
                    activeTab.toString()
                  ) as HTMLIFrameElement
                ).contentWindow!.location.href
              );
            }}
            className="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
          >
            <FiExternalLink />
          </div>
        </div>
      </div>
    </motion.main>
  );
}

