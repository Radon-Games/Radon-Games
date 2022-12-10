window.addEventListener(
  "onbeforeunload",
  (): string => "Are you sure you want to leave?"
);

window.addEventListener("keydown", (e: KeyboardEvent): void => {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
  if (keysToBlock.includes(e.key)) {
    e.preventDefault();
  }
});

export {};
