import React from "react";
import { shallow } from "enzyme";

import StockItem from "../src/components/StockItem.js";

describe("The StockItem component", () => {
  let wrapper;
  beforeEach(() => {
    let item = {
      data: {
        date: "2017-06-10",
        "2. high": 196,
        "3. low": 100
      }
    };
    wrapper = shallow(<StockItem item={item} />);
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
