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
    image: "/features/slope.png",
    link: "/game/slope"
  },
  {
    title: "Cookie Clicker",
    description:
      "Cookie Clicker is an incremental game created by French programmer Julien Orteil Thiennot in 2013. The user initially clicks on a big cookie on the screen, earning a single cookie per click.",
    image: "/features/cookie-clicker.png",
    link: "/game/cookie-clicker"
  }
];

export default featured;
