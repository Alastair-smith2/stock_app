import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import { Exchange } from "../src/screens/Exchange.js";

describe("The exchange tab", () => {
  let wrapper;
  let navigation = {
    navigate: jest.fn()
  };
  jest.mock("Alert", () => {
    return {
      alert: jest.fn()
    };
  });
  const spy = jest.spyOn(Alert, "alert");
  beforeEach(() => {
    wrapper = shallow(<Exchange navigation={navigation} />);
    navigation.navigate.mockReset();
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("The features of the exchange tab", () => {
    it("Should have a function that handles text change", () => {
      wrapper.instance().handleTextChange("currencyOne", "GBP");
      expect(wrapper.state("currencyOne")).toEqual("GBP");
    });

    it("Should have a function that handles a submit change", () => {
      wrapper.instance().handleSearch();
      expect(Alert.alert.mock.calls.length).toEqual(1);
      wrapper.setState({ currencyOne: "GBP", currencyTwo: "USD" });
      wrapper.instance().handleSearch();
      expect(Alert.alert.mock.calls.length).toEqual(2);
      expect(Alert.alert.mock.calls[1][0]).toEqual("Fetch to come");
    });
  });
});
