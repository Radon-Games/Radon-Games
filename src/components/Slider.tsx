import { JSX, createSignal } from "solid-js";
import "solid-slider/slider.css";
import { createSlider } from "solid-slider";
// @ts-ignore - Typescript doesn't see this as a valid import
import autoplay from "solid-slider/plugins/autoplay";

interface SliderProps {
  children: JSX.Element[];
}

interface BubbleProps {
  index: number;
}

export default function Slider(props: SliderProps): JSX.Element {
  const [slider, { current, next, prev, moveTo }] = createSlider(
    { loop: true },
    autoplay(3000, {
      pauseOnDrag: true
    })
  );

  function Bubble(props: BubbleProps) {
    let onClick = () => {
      moveTo(props.index);
    };
    return (
      <div
        onClick={onClick}
        class={`rounded-full w-2 h-2 m-1 ${
          current() === props.index ? "bg-neutral-100" : "bg-neutral-500"
        }`}
      ></div>
    );
  }

  return (
    <>
      <div use:slider>{...props.children}</div>

      <div class="flex mb-5 items-center justify-center">
        {props.children
          .filter((x) => x !== undefined)
          .map((x, index) => {
            return <Bubble index={index} />;
          })}
      </div>
    </>
  );
}
