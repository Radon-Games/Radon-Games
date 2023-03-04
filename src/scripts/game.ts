window.addEventListener("beforeunload", (e: BeforeUnloadEvent): void => {
  e.preventDefault();
  e.returnValue = "Are you sure you want to exit?";
});

window.addEventListener("keydown", (e: KeyboardEvent): void => {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
  if (keysToBlock.includes(e.key) && !(e.target instanceof HTMLInputElement)) {
    e.preventDefault();
  }
});

export {};
