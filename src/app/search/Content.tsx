"use client";

export function searchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter") {
    if (!e.currentTarget.value) {
      e.preventDefault();
    }
    location.assign(`/search?q=${encodeURIComponent(e.currentTarget.value)}`);
  }
}

export default function Content() {
  return (
    <>
      Search
    </>
  );
}
