"use client";

import Section from "./Section";
import { metadata } from "./page";
import { useRef, useEffect, useState } from "react";
import cloaks from "~/cloaks";
import { updateCloak } from "~/components/CloakLoader";
import ExternalMedia from "~/components/ExternalMedia";
import themes, { categories } from "~/themes";
import getCloakDocument, { cloakScript } from "~/util/cloakDocument";

export default function Content() {
  const iconRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const [defaultIcon, setDefaultIcon] = useState<string>();
  const [defaultTitle, setDefaultTitle] = useState<string>();

  useEffect(() => {
    setDefaultIcon(localStorage.getItem("cloakIcon") || "");
    setDefaultTitle(localStorage.getItem("cloakTitle") || "");
  }, []);

  function resetCloaking() {
    localStorage.removeItem("cloakIcon");
    localStorage.removeItem("cloakTitle");
    document.title = metadata.title as string;

    iconRef.current!.value = "";
    titleRef.current!.value = "";

    updateCloak();
  }

  function updateCloaking() {
    localStorage.setItem("cloakIcon", iconRef.current!.value);
    localStorage.setItem("cloakTitle", titleRef.current!.value);

    updateCloak();
  }

  return (
    <>
      <Section name="Tab Cloaking">
        <h3 className="text-center text-2xl">Presets</h3>

        <div className="flex items-center justify-center gap-5">
          {cloaks.map((x) => {
            return (
              <div
                key={x.id}
                className="cursor-pointer rounded bg-text p-1 shadow"
                title={x.title}
                onClick={() => {
                  resetCloaking();
                  localStorage.setItem("cloakIcon", x.icon);
                  localStorage.setItem("cloakTitle", x.title);
                  iconRef.current!.value = x.icon;
                  titleRef.current!.value = x.title;
                  updateCloak();
                }}
              >
                <ExternalMedia
                  src={x.icon}
                  alt={x.title}
                  width={24}
                  height={24}
                />
              </div>
            );
          })}
        </div>

        <h3 className="text-center text-2xl">Manual</h3>
        <input
          ref={titleRef}
          defaultValue={defaultTitle}
          type="text"
          placeholder="Custom Title"
          className="rounded bg-background p-1 text-center shadow-md focus:outline-0"
        ></input>
        <input
          ref={iconRef}
          defaultValue={defaultIcon}
          type="text"
          placeholder="Custom Icon"
          className="rounded bg-background p-1 text-center shadow-md focus:outline-0"
        ></input>
        <div className="flex gap-2">
          <div
            className="flex-1 cursor-pointer rounded bg-background p-1 text-center shadow-md transition-colors hover:bg-accent"
            onClick={updateCloaking}
          >
            Apply
          </div>
          <div
            className="flex-1 cursor-pointer rounded bg-background p-1 text-center shadow-md transition-colors hover:bg-accent"
            onClick={resetCloaking}
          >
            Reset
          </div>
        </div>
      </Section>

      <Section name="URL Cloaking">
        <div className="flex gap-2">
          <div
            className="flex-1 cursor-pointer rounded bg-background p-1 text-center shadow-md transition-colors hover:bg-accent"
            onClick={() => {
              const win = window.open("about:blank", "_blank");

              if (win) {
                const doc = win.document;
                doc.documentElement.innerHTML = getCloakDocument();
                const script = doc.createElement("script");
                script.innerHTML = cloakScript;
                doc.body.appendChild(script);
              }
            }}
          >
            About Blank
          </div>
          <div
            className="flex-1 cursor-pointer rounded bg-background p-1 text-center shadow-md transition-colors hover:bg-accent"
            onClick={() => {
              const html = getCloakDocument();

              const byteArrays = [];
              for (let offset = 0; offset < html.length; offset += 1024) {
                const slice = html.slice(offset, offset + 1024);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
              }

              const blob = new Blob(byteArrays, { type: "text/html" });
              const blobUrl = URL.createObjectURL(blob);

              window.open(blobUrl, "_blank");
            }}
          >
            Blob
          </div>
        </div>
      </Section>

      <Section name="Theme">
        {categories.map((cat) => {
          return (
            <div key={cat.id}>
              <p className="my-2 text-center text-2xl">{cat.name}</p>
              <div className="flex flex-col gap-2">
                {themes
                  .filter((x) => x.category === cat.id)
                  .map((x) => {
                    return (
                      <div
                        key={x.id}
                        style={{
                          backgroundColor: x.background,
                          color: x.text
                        }}
                        className="flex cursor-pointer items-center justify-center rounded border border-text p-1"
                        onClick={() => {
                          localStorage.setItem("theme", x.id);
                          document.documentElement.dataset.theme = x.id;
                        }}
                      >
                        {x.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </Section>
    </>
  );
}
