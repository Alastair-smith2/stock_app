import React from "react";
import { shallow } from "enzyme";
import Button from "../src/components/Button.js";
import Input from "../src/components/Input.js";
import { Login } from "../src/screens/Login.js";

describe("The Login screen", () => {
  let wrapper;
  let navigation = {
    dispatch: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<Login navigation={navigation} />);
    wrapper.setState({ username: "", password: "" });
    navigation.dispatch.mockReset();
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Features", () => {
    it("Should have two Input components", () => {
      expect(wrapper.find(Input)).toHaveLength(2);
    });

    it("Should have a Button component", () => {
      console.log(wrapper.find(Button));
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("Should an initial state that is a pair of empty strings", () => {
      expect(wrapper.state("username")).toEqual("");
      expect(wrapper.state("password")).toEqual("");
    });

    it("With a valid username and password should dispatch to the next page", () => {
      wrapper
        .find(Button)
        .props()
        .buttonPress();
      expect(navigation.dispatch.mock.calls.length).toEqual(0);
      wrapper.setState({ username: "Admin", password: "Pass" });

      wrapper
        .find(Button)
        .props()
        .buttonPress();
      expect(navigation.dispatch.mock.calls.length).toEqual(1);
    });

    it("Should have a function that handles the textChange", () => {
      wrapper.instance().handleTextChange("username", "Alastair");
      expect(wrapper.state("username")).toEqual("Alastair");
    });
  });
});
