import { JSX, onMount } from "solid-js";

export function getOptions(): { [key: string]: string } {
  let options;
  try {
    options = JSON.parse(localStorage.getItem("options")!) || {};
  } catch {
    options = {};
  }
  return options;
}

export default function Options(): JSX.Element {
  function saveOptions(event: Event): void {
    if (event.target instanceof Element) {
      let options = getOptions();

      options[event.target.id] = document.querySelector<HTMLInputElement>(
        `#${event.target.id}`
      )?.value as string;

      localStorage.setItem("options", JSON.stringify(options));
    }
  }

  onMount((): void => {
    const options = getOptions();

    Object.entries(options).forEach(([key, value]) => {
      const element = document.querySelector<HTMLInputElement>(`#${key}`);
      if (element && element.value) {
        element.value = value;
      }
    });
  });

  return (
    <main>
      <h1 class="text-2xl text-center py-10">Options</h1>
      <section class="grid grid-cols-2 gap-5 w-full sm:px-16 md:px-20 lg:px-32">
        <div class="flex flex-col items-center justify-center">
          <h2 class="text-xl">Tab Cloaking</h2>
          <p class="text-sm text-gray-500 my-2">Hide the name of the tab.</p>
          <select
            onchange={saveOptions}
            id="tab-cloak"
            class="bg-gray-900 p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none w-1/2"
          >
            <option value="false">Disabled</option>
            <option value="true">Enabled</option>
          </select>
        </div>

        <div class="flex flex-col items-center justify-center">
          <h2 class="text-xl">Tab Cloak Mode</h2>
          <p class="text-sm text-gray-500 my-2">
            Change when the tab is hidden.
          </p>
          <select
            onchange={saveOptions}
            id="tab-cloak-mode"
            class="bg-gray-900 p-2 rounded-md border-solid border-2 border-gray-800 focus:outline-none w-1/2"
          >
            <option value="always">Always</option>
            <option value="hidden">On Hide</option>
          </select>
        </div>
      </section>
    </main>
  );
}
