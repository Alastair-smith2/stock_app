import React from "react";
import { shallow } from "enzyme";

import Error from "../src/components/Error.js";
import Button from "../src/components/Button.js";

describe("The Error component", () => {
  let wrapper;
  let mockSubmit = jest.fn();
  let mockTextHandle = jest.fn();
  let mockStartAgain = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Error
        instructionLabel={"Enter a stock symbol"}
        errorType={"stock"}
        search={""}
        onTextSearch={mockTextHandle}
        submitSearch={mockSubmit}
        startAgain={mockStartAgain}
      />
    );
    wrapper.setProps({ errorType: "stock" });
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Features", () => {
    it("Should render an Instruction item", () => {
      expect(wrapper.find("Instructions")).toHaveLength(1);
    });

    it("Should render a Search item", () => {
      expect(wrapper.find("Search")).toHaveLength(1);
      expect(wrapper.find("Search").props().searchType).toEqual("stock");
      wrapper.setProps({ errorType: "currency" });
      expect(wrapper.find("Search").props().searchType).toEqual("currency");
    });
  });

  describe("Functionality", () => {
    it("Should be able to handle a text change", () => {
      wrapper.instance().onTextChange("currencyOne", "GBP");
      expect(mockTextHandle.mock.calls.length).toEqual(1);
      expect(mockTextHandle.mock.calls[0][0]).toEqual("currencyOne");
    });

    it("Should be able to handle a button submit", () => {
      wrapper
        .find("Search")
        .props()
        .submitSearch();
      expect(mockSubmit.mock.calls.length).toEqual(1);
    });

    it("Should be able to handle a restart press", () => {
      console.log(wrapper.find("Search").props());
      wrapper
        .find("Search")
        .props()
        .restart();
      expect(mockStartAgain.mock.calls.length).toEqual(1);
    });
  });
});
