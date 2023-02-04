import { JSX } from "solid-js";

interface SkeletonGameCardProps {
  ref?: (element: HTMLElement) => void;
}

export default function GameCard(props: SkeletonGameCardProps): JSX.Element {
  return (
    <a
      class="relative h-48 w-full overflow-hidden rounded-lg shadow-lg transition-all"
      ref={props.ref}
    >
      <div class="absolute bg-gray-800 animate-pulse w-full h-full"></div>
      <div class="absolute h-full w-full bg-center bg-cover animate-none">
        <div class="h-full w-full bg-gradient-to-b from-transparent to-gray-800">
          <div class="h-full w-full flex flex-col justify-end p-5 font-semibold">
            <div class="w-full">
              <h1
                class="text-xl h-[1.5em] bg-gray-700 animate-pulse rounded-md"
                style={`width: ${Math.floor(Math.random() * 40) + 50}%;`}
              ></h1>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
