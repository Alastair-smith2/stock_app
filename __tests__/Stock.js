import React from "react";
import { shallow } from "enzyme";

import { Stock } from "../src/screens/Stock.js";

describe("The Input component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Stock />);
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
