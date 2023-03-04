import { JSX } from "solid-js";
import { onSubmit } from "~/routes/search";

export default function NavSearchbar(): JSX.Element {
  return (
    <form action="/search" onsubmit={onSubmit}>
      <input
        type="text"
        class="bg-transparent border border-gray-700 rounded py-1 px-2 focus:ring-none"
        placeholder="Search Games"
        name="q"
        autocomplete="off"
      />
    </form>
  );
}
