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
