import React from "react";
import { shallow } from "enzyme";

import Input from "../src/components/Input.js";

describe("The Input component", () => {
  let wrapper;
  let onTextInput = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Input value="" type="username" onTextInput={onTextInput} />
    );
    onTextInput.mockReset();
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Features", () => {
    it("Should have 1 text input box", () => {
      expect(wrapper.find("TextInput")).toHaveLength(1);
    });

    it("Should have a prop called onTextInput that is called via onTextChange", () => {
      // the type is passed via a prop, therefore only the value of the text needs to be passed through
      wrapper.instance().onTextChange("Alastair");
      expect(onTextInput.mock.calls.length).toEqual(1);
      expect(onTextInput.mock.calls[0][0]).toEqual("username");
      expect(onTextInput.mock.calls[0][1]).toEqual("Alastair");
    });

    it("Should have a function that handles the input change of TextInput", () => {
      wrapper.find("TextInput").simulate("changeText", "test");
      expect(onTextInput.mock.calls.length).toEqual(1);
      expect(onTextInput.mock.calls[0][1]).toEqual("test");
    });
  });
});
