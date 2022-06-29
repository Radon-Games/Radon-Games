import Any from "./[any]";

export default {
  title: "Routes/changelog/[any]",
  component: Any,
}

const Template = (args) => <Any {...args} />;

export const Component = Template.bind({});

Component.args = {
  version: "2.0.0"
};
