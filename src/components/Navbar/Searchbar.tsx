import { JSX } from "solid-js";

export default function NavSearchbar(): JSX.Element {
  function onSubmit(event: SubmitEvent): void {
    const form = event.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    if (!input.value) event.preventDefault();
  }

  return (
    <form action="/search" onsubmit={onSubmit}>
      <input
        type="text"
        class="bg-transparent border border-gray-700 rounded py-1 px-2 focus:ring-none"
        placeholder="Search"
        name="q"
        autocomplete="off"
      />
    </form>
  );
}
