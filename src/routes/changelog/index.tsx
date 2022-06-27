import { For, Show } from "solid-js";
import { Link } from "solid-app-router";

import { versions } from "../../../Changes";

import { version as currentVersion } from "../../../package.json";

import "../../build.css";

export default function Changelog () {
  return (
    <>
      <h1 class="text-2xl text-center py-10">Changelog</h1>
      <For each={ Object.keys(versions) }>{(version) =>
        <Show when={ version }>
          <div class="text-center py-5">
            <Link class="text-xl hover:underline" href={ version }>
              { currentVersion !== version ? version : `Current (v${ version })` }
            </Link>
            <p class="italic">{ versions[version].date }</p>
          </div>
        </Show>
      }</For>
    </>
  );
}
