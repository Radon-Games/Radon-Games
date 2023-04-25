import { createSignal, JSX, onMount, Show } from "solid-js";
import banner from "~/assets/banner.svg";
import Slider from "~/components/Slider";
import Button from "~/components/Button";
import VanillaTilt from "vanilla-tilt";
import Ad from "~/components/Ad";

import featured, { Feature } from "~/data/featured";

export default function Index(): JSX.Element {
  function initTilt(elm: HTMLElement) {
    VanillaTilt.init(elm);
  }

  onMount(() => {
    const ads = document.createElement("script");
    ads.async = true;
    ads.crossOrigin = "anonymous";
    ads.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8517735295733237";
    document.head.appendChild(ads);
  });

  return (
    <main>
      <section class="w-full h-[calc(100vh-64px)] flex flex-col gap-10 items-center justify-center px-8 sm:px-16 md:px-20 lg:px-32">
        <img src={banner} alt="Radon Games" />
        <p class="text-center">
          An open-source unblocked games website built with simplicity in mind.
        </p>
        <Button text="Start Playing!" href="/games" icon="fa-gamepad-modern" />
        <Ad />
      </section>

      <section>
        <h1 class="text-3xl text-center">Featured</h1>

        <Slider>
          {...featured.map((feature: Feature): JSX.Element => {
            return (
              <div class="py-5 px-8 sm:px-16 md:px-20 lg:px-32">
                <div class="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-800 rounded-lg shadow-lg h-full">
                  <div class="flex justify-center flex-col text-base h-full">
                    <h1 class="text-4xl">{feature.title}</h1>
                    <p class="my-5">{feature.description}</p>
                    <Button
                      text="Play Now!"
                      href={feature.link}
                      icon="fa-gamepad-modern"
                    />
                  </div>
                  <div class="flex justify-center flex-col text-base h-full">
                    <div ref={initTilt} data-tilt data-tilt-scale="1.05">
                      <img
                        src={`${feature.image}?h=512`}
                        alt={feature.title}
                        class="rounded-xl shadow-2xl"
                      />
                    </div>
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
