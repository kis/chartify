import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Chartify from "./Chartify.js";

let data = [
  {
    x_value: "20.11.2016",
    y_value: 5,
    title: "007 Spectre"
  }
];

let config = {
  theme: "blue",
  width: 50,
  height: 10,
  box_size: 20,
  box_radius: 8,
  line: false,
  line_only: false,
  bordered: false,
  blink: false
};

storiesOf("Chartify", module).add("one film", () => (
  <Chartify data={data} container="films-container" config={config} />
));
