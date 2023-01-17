export interface Feature {
  title: string;
  description: string;
  image: string;
  link: string;
}

const featured: Feature[] = [
  {
    title: "Slope",
    description:
      "Slope game is a fantastic speed run game where you can drive a ball rolling on tons of slopes and obstacles. See how far you can go in this endless course.",
    image: "/cdn/images/slope.png",
    link: "/game/slope"
  },
  {
    title: "Cookie Clicker",
    description:
      "Cookie Clicker is an incremental game created by French programmer Julien Orteil Thiennot in 2013. The user initially clicks on a big cookie on the screen, earning a single cookie per click.",
    image: "/cdn/images/cookie-clicker.png",
    link: "/game/cookie-clicker"
  },
  {
    title: "Shell Shockers",
    description:
      "Shell Shockers (Shellshock.io) is a multiplayer .io FPS game featuring eggs armed with guns. You control one of these weapon-wielding eggs in one of four online game modes where the aim is to shatter your opponents with bullets and bombs. It's the ultimate online egg shooting game!",
    image: "/cdn/images/shell-shockers.png",
    link: "/game/shell-shockers"
  }
];

export default featured;
