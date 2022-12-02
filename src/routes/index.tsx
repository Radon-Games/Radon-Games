import { JSX } from "solid-js";
import banner from "~/assets/banner.svg";
import "solid-slider/slider.css";
import { Slider } from "solid-slider";
// @ts-ignore - Typescript doesn't see this as a valid import
import autoplay from "solid-slider/plugins/autoplay";

export default function Index(): JSX.Element {
  return (
    <main>
      <section class="w-full h-[calc(100vh-64px)] flex flex-col gap-10 items-center justify-center">
        <img src={banner} class=""></img>
        <p>
          An open-source unblocked games website built with simplicity in mind.
        </p>
        <a
          class="bg-sky-600 rounded-full px-5 py-4 group shadow-lg"
          href="/games"
        >
          <i class="fa-regular fa-gamepad-modern mr-2 group-hover:text-amber-500 transition-all duration-500"></i>
          Start Playing!
        </a>
      </section>

      <section>
        <Slider options={{ loop: true }} plugins={[autoplay(1500, {})]}>
          <div class="slide1">1</div>
          <div class="slide2">2</div>
          <div class="slide3">3</div>
          <div class="slide4">4</div>
          <div class="slide5">5</div>
          <div class="slide6">6</div>
        </Slider>
      </section>
    </main>
  );
}
