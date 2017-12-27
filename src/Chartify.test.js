import React from "react";
import { mount, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Chartify from "./Chartify";
import Draggable from "./Draggable";

configure({ adapter: new Adapter() });

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

describe("<Chartify />", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Chartify data={data} container="films-container" config={config} />
    );
  });

  it("Chartify component contains Draggable", () => {
    expect(wrapper.find("Draggable").exists()).toBeTruthy();
  });

  it("Chartify calculates correct line angle", () => {
    const BC = 40;
    const AB = 10;
    const nextMark = 5;
    const currentMark = 3;

    let angleA = Math.fround(Math.asin(BC / AB) * 180 / Math.PI);
    if (nextMark > currentMark) angleA = -angleA;

    const result = wrapper
      .instance()
      .calcLineAngle(BC, AB, nextMark, currentMark);
    expect(result).toBe(angleA);
  });
});
