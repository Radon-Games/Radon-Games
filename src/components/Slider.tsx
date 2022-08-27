import { createSlider } from "solid-slider";
import "../../node_modules/solid-slider/dist/slider.css";
import { onMount } from "solid-js";

export default function Slider (props) {
  const [ slider, { current, next, prev, moveTo } ] = createSlider();
  let oldCurrent = 0;

  onMount(() => {
    setInterval(() => {
      if (oldCurrent !== current()) {
        oldCurrent = current();
        return;
      }
      oldCurrent = current();
      if (current() === props.children.filter(x => x !== undefined).length - 1) moveTo(0);
      else next();
    }, props.interval);
  });

  function Bubble (props) {
    let onClick = () => {
      moveTo(props.index);
    };
    return <div onClick={onClick} class={ `rounded-full w-2 h-2 m-1 ${current() === props.index ? "bg-neutral-100" : "bg-neutral-500"}` }></div>
  }

  return (
    <section class="flex justify-center">
      <div class="flex flex-col justify-center items-center bg-gray-800 rounded-2xl w-[300px] sm:w-[616px] md:w-[744px] lg:w-[1000px]">
        <div use:slider>

          { ...props.children }
          
        </div>

        <div class="flex mb-5 items-center justify-center">
          { props.children.filter(x => x !== undefined).map((feature, index) => {
            return <Bubble index={ index } />
          }) }
        </div>

      </div>
    </section>
  );
}
