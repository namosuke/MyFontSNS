import React from "react";
import { Story, Meta } from "@storybook/react";

import Post, { PostProps } from "../components/Post";

export default {
  title: "MyFontSNS/Post",
  component: Post,
  parameters: {
    backgrounds: {
      default: "lemonchiffon",
      values: [{ name: "lemonchiffon", value: "lemonchiffon" }],
    },
  },
} as Meta;

const Template: Story<PostProps> = (args) => <Post {...args} />;

export const Test1 = Template.bind({});
Test1.args = {
  post: {
    id: 2000,
    text: "おはようございます！！\n今日も一日頑張りましょう！！\n#朝の挨拶 https://ohayo.net/",
    user: {
      name: "おはようbot",
    },
  },
};
