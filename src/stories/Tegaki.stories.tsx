import React from "react";
import { Story, Meta } from "@storybook/react";

import Tegaki, { TegakiProps } from "../components/TegakiCanvas";

export default {
  title: "MyFontSNS/Tegaki",
  component: Tegaki,
  parameters: {
    backgrounds: {
      default: "lemonchiffon",
      values: [{ name: "lemonchiffon", value: "lemonchiffon" }],
    },
  },
} as Meta;

const Template: Story<TegakiProps> = (args) => <Tegaki {...args} />;

export const FontSet = Template.bind({});
FontSet.args = {
  char: "慶",
};
