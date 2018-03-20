import React from "react";
import { shallow } from "enzyme";

import Instructions from "../src/components/Instructions.js";

describe("The Instructions component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Instructions />);
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
