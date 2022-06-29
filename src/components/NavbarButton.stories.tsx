import NavbarButton from "./NavbarButton";

export default {
  title: "Components/Navbar/NavbarButton",
  component: NavbarButton,
};

const Template = (args) => <NavbarButton {...args} />;

export const Home = Template.bind({});

Home.args = {
  children: "Home",
  icon: "home"
};

export const Games = Template.bind({});

Games.args = {
  children: "Games",
  icon: "gamepad-modern"
};

export const Apps = Template.bind({});

Apps.args = {
  children: "Apps",
  icon: "command"
};

export const Services = Template.bind({});

Services.args = {
  children: "Services",
  icon: "microchip"
};

export const Settings = Template.bind({});

Settings.args = {
  children: "Settings",
  icon: "cog"
};
