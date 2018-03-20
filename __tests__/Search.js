import React from "react";
import { shallow } from "enzyme";

import Search from "../src/components/Search.js";
import Input from "../src/components/Input.js";
import Button from "../src/components/Button.js";

describe("The Search component", () => {
  let wrapper;
  let onTextSearch = jest.fn();
  let onSearchSubmit = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Search
        searchType={"stock"}
        value={""}
        label={"Stock symbol"}
        type="search"
        submitSearch={onSearchSubmit}
        onTextSearch={onTextSearch}
      />
    );
    onTextSearch.mockReset();
    onSearchSubmit.mockReset();
    wrapper.setProps({ error: false });
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Features", () => {
    it("Should have 1 Input component", () => {
      expect(wrapper.find(Input)).toHaveLength(1);
    });

    it("Should have 1 Button component", () => {
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("Should have a function that handles the Search change of TextSearch", () => {
      wrapper
        .find(Input)
        .props()
        .onTextInput("Alastair");
      expect(onTextSearch.mock.calls.length).toEqual(1);
    });

    it("Should have a prop called onTextSearch that is called via the component's onTextChange function", () => {
      wrapper.instance().onTextChange("Alastair");
      expect(onTextSearch.mock.calls.length).toEqual(1);
      expect(onTextSearch.mock.calls[0][0]).toEqual("Alastair");
    });

    it("Should be able to handle a search function", () => {
      wrapper
        .find(Button)
        .props()
        .buttonPress();
      expect(onSearchSubmit.mock.calls.length).toEqual(1);
    });

    it("Should change depending upon the search type", () => {
      wrapper.setProps({ searchType: "currency" });
      // only with the currency prop will there be two inputs
      expect(wrapper.find(Input)).toHaveLength(2);
    });
  });
});
