import Any from "./[any]";

export default {
  title: "Routes/game/[any]",
  component: Any,
}

const Template = (args) => <Any {...args} />;

export const Component = Template.bind({});

Component.args = {
  game: "tetris"
};
