import Icon from "./Icon";

export default {
  title: "Components/Icon",
  component: Icon,
};

const Template = (args) => <Icon {...args} />;

export const Home = Template.bind({});

Home.args = {
  type: "regular",
  name: "home"
};
