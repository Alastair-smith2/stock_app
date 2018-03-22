import React from "react";
import { shallow } from "enzyme";

import Rates from "../src/components/Rates.js";

describe("The Rates component", () => {
  let wrapper;
  let mockData = {
    "2. From_Currency Name": "GBP",
    "4. To_Currency Name": "USD",
    "5. Exchange Rate": 2
  };
  console.log(mockData);
  beforeEach(() => {
    wrapper = shallow(<Rates data={mockData} />);
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
