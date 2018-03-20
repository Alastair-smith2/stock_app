import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import { Stock } from "../src/screens/Stock.js";
import Instructions from "../src/components/Instructions";
import Search from "../src/components/Search";

describe("The Stock screen", () => {
  let wrapper;
  jest.mock("Alert", () => {
    return {
      alert: jest.fn()
    };
  });
  const spy = jest.spyOn(Alert, "alert");
  beforeEach(() => {
    wrapper = shallow(<Stock />);
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("The features", () => {
    it("Should an initial state of an empty search text", () => {
      expect(wrapper.state("search")).toEqual("");
    });

    it("Should have an instruction component", () => {
      expect(wrapper.find(Instructions)).toHaveLength(1);
    });

    it("Should have a function that handles the textChange", () => {
      wrapper.instance().handleTextChange("search", "Alastair");
      expect(wrapper.state("search")).toEqual("Alastair");
    });

    it("Should have a handle search function", () => {
      wrapper.instance().handleSearch();
      expect(Alert.alert.mock.calls.length).toEqual(1);
      wrapper.setState({ search: "MSFT" });
      wrapper.instance().handleSearch();
      expect(Alert.alert.mock.calls.length).toEqual(2);
      expect(Alert.alert.mock.calls[1][0]).toEqual("Fetch to come");
    });
  });
});
