import React from "react";
import { shallow } from "enzyme";

import Loading from "../src/components/Loading.js";

describe("The Loading component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
