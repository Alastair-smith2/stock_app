import React from "react";
import { shallow } from "enzyme";

import Button from "../src/components/Button.js";

describe("The button component", () => {
  let wrapper;
  let onPressInput = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Button title="Test Button" buttonPress={onPressInput} />
    );
    onPressInput.mockReset();
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Features of the button", () => {
    it("Should have 1 touchable highlight", () => {
      expect(wrapper.find("TouchableHighlight")).toHaveLength(1);
    });

    it("Should an on press function that calls the parent function", () => {
      wrapper.find("TouchableHighlight").simulate("press");
      expect(onPressInput.mock.calls.length).toEqual(1);
    });

    it("Should have a label field that is inherited from props", () => {
      expect(wrapper.find("Text").contains("Test Button"));
    });
  });
});
