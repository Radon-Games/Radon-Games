import { Banner } from "../assets/Banner";
import { Transparent } from "../assets/Transparent";
import { Favicon } from "../components/Favicon";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { useEffect, useState } from "preact/hooks";
import {
  FiX,
  FiPlus,
  FiArrowLeft,
  FiArrowRight,
  FiRotateCw,
  FiExternalLink,
  FiMaximize
} from "react-icons/fi";

export type Tab = {
  id: number;
  title: string;
  favicon: string;
  url: string;
};

export function Proxy() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<number>(
    Number(localStorage.getItem("activeTab")!) || 0
  );
  const [inputValue, setInputValue] = useState<string | null>(null);

  function addTab(url: string): number {
    const tab = {
      id: Math.floor(Math.random() * 1000000),
      title: url,
      favicon: "https://www.google.com/favicon.ico",
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
    // @ts-ignore
    iframe.src = __uv$config.prefix + __uv$config.encodeUrl(tab.url);
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
      url = `https://www.google.com/search?q=${query}`;
    }

    tab.url = url;

    const iframe = document.getElementById(id.toString()) as HTMLIFrameElement;
    // @ts-ignore
    iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);

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
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
    localStorage.setItem("activeTab", activeTab.toString());

    if (tabs.length === 0) {
      addTab("https://www.google.com");
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

    let interval = setInterval(() => {
      if (!iframe) return;

      const title = iframe.contentDocument!.title;
      // @ts-ignore
      const url = __uv$config.decodeUrl(
        // @ts-ignore
        iframe.contentWindow!.location.pathname.replace(__uv$config.prefix, "")
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
      class="flex h-full w-full select-none"
    >
      <div class="flex h-full w-16 flex-col border-r-2 border-bg-secondary bg-bg-primary transition-all sm:w-64">
        <div class="flex h-16 w-full items-center justify-center border-b-2 border-bg-secondary">
          <a href="/">
            <Banner class="hidden h-6 sm:block" />
            <Transparent class="block h-6 sm:hidden" />
          </a>
        </div>
        <Reorder.Group
          as="div"
          axis="y"
          onReorder={(newTabs: Tab[]) => {
            setTabs(newTabs);
          }}
          values={tabs.valueOf()}
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
                  class={`flex aspect-square h-10 w-10 items-center justify-center rounded p-2 text-sm sm:w-full sm:justify-normal sm:gap-2 ${
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
                    src={tab.favicon}
                    class="h-5 w-5"
                    draggable={false}
                  ></img>
                  {/* <Favicon tabId={tab.id} tabs={tabs} /> */}
                  <span class="hidden flex-1 truncate whitespace-nowrap text-text-primary sm:block">
                    {tab.title}
                  </span>
                  <div
                    class="hidden sm:block"
                    onClick={(e) => {
                      e.stopImmediatePropagation();
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
        <div class="flex h-16 w-full items-center justify-end border-t-2 border-bg-secondary p-4 text-xl">
          <div
            class="rounded bg-bg-secondary p-2"
            onClick={() => {
              addTab("https://www.google.com");
            }}
          >
            <FiPlus />
          </div>
        </div>
      </div>
      <div class="flex flex-1 flex-col bg-white" id="frames">
        <div class="flex h-16 w-full items-center justify-center gap-2 bg-bg-secondary p-3">
          <div
            onClick={() => {
              (
                document.getElementById(
                  activeTab.toString()
                ) as HTMLIFrameElement
              ).contentWindow!.history.back();
            }}
            class="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
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
            class="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
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
            class="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
          >
            <FiRotateCw />
          </div>
          <input
            class="h-full flex-1 rounded bg-bg-primary px-3 py-2 font-medium shadow focus:outline-0"
            value={inputValue ?? tabs.find((x) => x.id === activeTab)?.url}
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
            class="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
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
            class="flex aspect-square h-full cursor-pointer items-center justify-center rounded text-lg transition-all duration-[50] hover:bg-bg-primary hover:shadow"
          >
            <FiExternalLink />
          </div>
        </div>
      </div>
    </motion.main>
  );
}
