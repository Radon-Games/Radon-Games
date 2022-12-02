import { JSX } from "solid-js";

export default function NavSearchbar(): JSX.Element {
  return (
    <form action="/search">
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
