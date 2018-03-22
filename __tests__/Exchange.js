import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import {
  Exchange,
  mapDispatchToProps,
  mapStateToProps
} from "../src/screens/Exchange.js";

describe("The exchange tab", () => {
  let wrapper;
  let appData = {
    authenticated: false,
    stockData: [],
    stockCode: "",
    currencyData: null,
    dataFetched: false,
    isFetching: false,
    error: false
  };
  let navigation = {
    navigate: jest.fn()
  };
  let mockFetchCurrency = jest.fn();

  jest.mock("Alert", () => {
    return {
      alert: jest.fn()
    };
  });
  const spy = jest.spyOn(Alert, "alert");

  beforeEach(() => {
    wrapper = shallow(
      <Exchange
        fetchCurrency={mockFetchCurrency}
        appData={appData}
        navigation={navigation}
      />
    );
    navigation.navigate.mockReset();
    mockFetchCurrency.mockReset();
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
      expect(mockFetchCurrency.mock.calls.length).toEqual(1);
      wrapper.setState({ currencyOne: "", currencyTwo: "" });
    });

    it("Should render the currency data when information is provided", () => {
      let updatedAppData = {
        authenticated: false,
        stockData: [],
        stockCode: "",
        currencyData: {
          "Realtime Currency Exchange Rate": {
            "1. From_Currency Code": "BTC",
            "2. From_Currency Name": "Bitcoin",
            "3. To_Currency Code": "CNY",
            "4. To_Currency Name": "Chinese Yuan",
            "5. Exchange Rate": "51944.86355560",
            "6. Last Refreshed": "2018-03-16 07:13:45",
            "7. Time Zone": "UTC"
          },
          dataFetched: false,
          isFetching: false,
          error: false
        }
      };
      wrapper.setProps({ appData: updatedAppData });
      expect(wrapper.find("Rates")).toHaveLength(1);
    });
  });

  describe("What happens while fetching data", () => {
    it("Should have a loading screen", () => {
      let updatedAppData = {
        isFetching: true,
        error: false
      };
      wrapper.setProps({ appData: updatedAppData });
      expect(wrapper.find("Loading")).toHaveLength(1);
    });
  });
  describe("What happens when an error occurs", () => {
    it("Should have an error screen", () => {
      let updatedAppData = {
        isFetching: false,
        error: true
      };
      wrapper.setProps({ appData: updatedAppData });
      expect(wrapper.find("Error")).toHaveLength(1);
    });
  });

  describe("Redux functions", () => {
    it("should call fetch data action", () => {
      const dispatchSpy = jest.fn();
      const { fetchCurrency } = mapDispatchToProps(dispatchSpy);
      fetchCurrency("One", "Two");
      expect(dispatchSpy.mock.calls.length).toEqual(1);
    });
  });

  it("Should inherit the props from mapState to props", () => {
    let initialData = {
      appData: 1
    };
    console.log(mapStateToProps(initialData).appData, "What is this?");
    expect(mapStateToProps(initialData).appData).toEqual(initialData.appData);
  });
});
