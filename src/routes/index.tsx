import { JSX } from "solid-js";
import banner from "~/assets/banner.svg";
import Slider from "~/components/Slider";
import VanillaTilt from "vanilla-tilt";

import featured, { Feature } from "~/data/featured";

export default function Index(): JSX.Element {
  function initTilt(elm: HTMLElement) {
    VanillaTilt.init(elm);
  }

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

      <section class="px-8 sm:px-16 md:px-20 lg:px-32">
        <h1 class="text-3xl text-center">Featured</h1>

        <Slider>
          {...featured.map((feature: Feature): JSX.Element => {
            return (
              <div class="p-5">
                <div class="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-800 rounded-lg shadow-lg">
                  <div class="flex justify-center flex-col text-base">
                    <h1 class="text-4xl">{feature.title}</h1>
                    <p class="my-5">{feature.description}</p>
                    <a
                      class="w-max bg-sky-600 rounded-full px-5 py-4 group shadow-lg"
                      href={feature.link}
                    >
                      <i class="fa-regular fa-gamepad-modern mr-2 group-hover:text-amber-500 transition-all duration-500"></i>
                      Play Now!
                    </a>
                  </div>
                  <div ref={initTilt} data-tilt>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      class="rounded-xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </section>
    </main>
  );
}
