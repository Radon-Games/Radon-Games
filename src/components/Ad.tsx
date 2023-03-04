import { JSX, onMount, createSignal, Show } from "solid-js";

export default function Ad(): JSX.Element {
  const [campain, setCampain] = createSignal("");
  const [ad, setAd] = createSignal("");

  onMount(() => {
    fetch("https://hub.alienhub.xyz/showapi?utm_medium=radon")
      .then((res) => res.json())
      .then((json) => {
        setCampain(json.url);
        setAd(json.img);
      });
  });

  return (
    <Show when={ad() && campain()}>
      <a href={campain() as string} target="_blank">
        <img src={ad() as string} alt="Ad" class="shadow-2xl" />
      </a>
    </Show>
  );
}
