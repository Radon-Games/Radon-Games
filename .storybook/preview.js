import { createRoot } from 'solid-js';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [(Story) => createRoot(() => <Story />)];
