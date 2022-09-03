import Icon from "../components/Icon";
import Banner from "../assets/banner.svg";
import { featured, allGames } from "../../Games";
import { onMount, Show, createSignal } from "solid-js";
import UpdateTab from "../Tab";
import Slider from "../components/Slider";

export default function Index () {
  const [ favorites, setFavorites ] = createSignal([]);

  onMount(() => {
    UpdateTab();
    let favorites;
    try {
      favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      favorites = [];
    }
    setFavorites(favorites);
  });

  return (
    <div class="bg-gray-900 text-gray-100">
      <main class="py-40 w-full">
        <div class="block mx-auto bg-gray-900 max-w-2xl">
          <div class="flex justify-center p-5">
            <img src={ Banner } alt="Radon Games" class="h-10" />
          </div>
          <p class="text-center p-5">An open-source unblocked games website built with simplicity in mind.</p>
 
          <div class="flex justify-center p-5">
            <a href="/games" class="flex text-center text-gray-100 bg-sky-500 p-4 hover:bg-sky-400 rounded-full transition-colors shadow-lg">
              <Icon name="gamepad" style="margin-top: 0.3em;" />&nbsp; Start playing!
            </a>
          </div>
        </div>
      </main>

      <Show when={favorites().length > 0}>
        <h1 class="text-4xl text-center m-5">Favorites</h1>
        <Slider interval={5000}>
          { favorites().map((game, index) => {
            if (index % 2 === 0) {
              let game1 = allGames.find(x => x.route === favorites()[index]);
              let game2 = allGames.find(x => x.route === favorites()[index + 1]);
              return (
                <div class="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Show when={game1 !== undefined}>
                    <div class="flex flex-col text-base">
                      <h1 class="text-4xl">{ game1.title }</h1>
                      <p class="my-5">{ game1.description.substring(0, 200) !== game1.description ? `${game1.description.substring(0, 200)}...` : game1.description }</p>
                      <a href={ `/game/${game1.route}` } class="flex w-max text-center text-gray-100 bg-sky-500 p-4 hover:bg-sky-400 rounded-full transition-colors shadow-lg">
                        <Icon name="gamepad" style="margin-top: 0.3em;" />&nbsp; Play Now!
                      </a>
                    </div>
                  </Show>
                  <Show when={game2 !== undefined}>
                    <div class="flex flex-col text-base">
                      <h1 class="text-4xl">{ game2.title }</h1>
                      <p class="my-5">{ game2.description.substring(0, 200) !== game2.description ? `${game2.description.substring(0, 200)}...` : game2.description }</p>
                      <a href={ `/game/${game2.route}` } class="flex w-max text-center text-gray-100 bg-sky-500 p-4 hover:bg-sky-400 rounded-full transition-colors shadow-lg">
                        <Icon name="gamepad" style="margin-top: 0.3em;" />&nbsp; Play Now!
                      </a>
                    </div>
                  </Show>
                </div>
              );
            }
          }) }
        </Slider>
      </Show>

      <h1 class="text-4xl text-center m-5">Featured</h1>
      <Slider interval={5000}>
        { featured.map((feature) => {
          return (
            <div class="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="flex justify-center flex-col text-base">
                <h1 class="text-4xl">{ feature.title }</h1>
                <p class="my-5">{ feature.description }</p>
                <a href={ feature.url } class="flex w-max text-center text-gray-100 bg-sky-500 p-4 hover:bg-sky-400 rounded-full transition-colors shadow-lg">
                  <Icon name="gamepad" style="margin-top: 0.3em;" />&nbsp; Play Now!
                </a>
              </div>
              <div>
                <img src={ feature.image } alt={ feature.title } class="rounded-xl" />
              </div>
            </div>
          )
        }) }
      </Slider>
    </div>
  );
}
