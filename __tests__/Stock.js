import React from "react";
import { shallow } from "enzyme";
import { Alert } from "react-native";
import {
  Stock,
  mapDispatchToProps,
  mapStateToProps
} from "../src/screens/Stock.js";
import Button from "../src/components/Button.js";
import Input from "../src/components/Input.js";
import Instructions from "../src/components/Instructions.js";
import StockItem from "../src/components/StockItem.js";

let mockData = {
  "Meta Data": {
    "1. Information": "Intraday (1min) prices and volumes",
    "2. Symbol": "MSFT",
    "3. Last Refreshed": "2018-03-15 16:00:00",
    "4. Interval": "1min",
    "5. Output Size": "Compact",
    "6. Time Zone": "US/Eastern"
  },
  "Monthly Time Series": {
    "2018-03-14 16:00:00": {
      "1. open": "94.2550",
      "2. high": "94.3300",
      "3. low": "94.1700",
      "4. close": "94.1800",
      "5. volume": "2415049"
    },
    "2018-03-13 15:59:00": {
      "1. open": "94.2700",
      "2. high": "94.3000",
      "3. low": "94.2100",
      "4. close": "94.2550",
      "5. volume": "217935"
    },
    "2018-03-12 15:58:00": {
      "1. open": "94.2400",
      "2. high": "94.3000",
      "3. low": "94.2300",
      "4. close": "94.2700",
      "5. volume": "143333"
    },
    "2018-03-11 15:57:00": {
      "1. open": "94.2050",
      "2. high": "94.2500",
      "3. low": "94.1900",
      "4. close": "94.2350",
      "5. volume": "277754"
    },
    "2018-03-10 15:59:00": {
      "1. open": "94.2700",
      "2. high": "94.3000",
      "3. low": "94.2100",
      "4. close": "94.2550",
      "5. volume": "217935"
    },
    "2018-03-09 15:58:00": {
      "1. open": "94.2400",
      "2. high": "94.3000",
      "3. low": "94.2300",
      "4. close": "94.2700",
      "5. volume": "143333"
    },
    "2018-03-08 15:57:00": {
      "1. open": "94.2050",
      "2. high": "94.2500",
      "3. low": "94.1900",
      "4. close": "94.2350",
      "5. volume": "277754"
    },
    "2018-03-05 15:56:00": {
      "1. open": "94.1400",
      "2. high": "94.2100",
      "3. low": "94.1300",
      "4. close": "94.2050",
      "5. volume": "381419"
    }
  }
};
let formattedData = Object.keys(mockData["Monthly Time Series"]).map(e => {
  return { date: e, data: mockData["Monthly Time Series"][e] };
});

describe("The Stock screen", () => {
  let wrapper;
  jest.mock("Alert", () => {
    return {
      alert: jest.fn()
    };
  });

  let navigation = {
    navigate: jest.fn()
  };
  const spy = jest.spyOn(Alert, "alert");
  let mockFetchStock = jest.fn();

  let appData = {
    authenticated: false,
    stockData: [],
    stockCode: "",
    currencyData: null,
    dataFetched: false,
    isFetching: false,
    error: false
  };
  let mockInitialFetchData = jest.fn();

  let fetchingData = {
    authenticated: false,
    stockData: [],
    stockCode: "",
    currencyData: null,
    dataFetched: false,
    isFetching: true,
    error: false
  };

  let errorData = {
    authenticated: false,
    stockData: [],
    stockCode: "",
    currencyData: null,
    dataFetched: false,
    isFetching: false,
    error: true
  };

  let mockAppData = {
    authenticated: false,
    stockData: formattedData,
    stockCode: "",
    currencyData: null,
    dataFetched: false,
    isFetching: false,
    error: false
  };

  beforeEach(() => {
    wrapper = shallow(
      <Stock
        appData={appData}
        navigation={navigation}
        initialFetchData={mockInitialFetchData}
        fetchStock={mockFetchStock}
      />
    );
    navigation.navigate.mockReset();
    mockInitialFetchData.mockReset();
    mockFetchStock.mockReset();
    wrapper.setProps({ appData: mockAppData });
    wrapper.setState({ readMore: true });
  });
  describe("It should render", () => {
    it("Should render", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Features", () => {
    describe("When there is data", () => {
      it("Should have a FlatList", () => {
        wrapper.setProps({ appData: mockAppData });
        expect(wrapper.find("FlatList")).toHaveLength(1);
      });

      it("Should have a FlatList extractor function", () => {
        let testItem = {
          date: "2018-03-05"
        };
        expect(wrapper.instance().keyExtractor(testItem)).toEqual(
          testItem.date
        );
      });

      it("Should have a FlatList renderItem function", () => {
        let item = {
          data: "Test"
        };
        expect(wrapper.instance().renderItem({ item })).toEqual(
          <StockItem item={item} />
        );
      });

      it("Should have a function that displays an arrow when not at the bottom", () => {
        // Length of data
        let insufficientData = {
          viewableItems: []
        };
        wrapper.instance().handleListChange(insufficientData);
        expect(wrapper.state("readMore")).toEqual(true);
        let dataBottom = {
          viewableItems: [
            { key: "2018-03-14 16:00:00" },
            { key: "2018-03-05 15:59:00" },
            { key: "2018-03-14 15:58:00" },
            { key: "2018-03-05 16:00:00" },
            { key: "2018-03-14 15:59:00" },
            { key: "2018-03-05 15:58:00" },
            { key: "2018-03-14 15:57:00" },
            { key: "2018-03-05 15:56:00" }
          ]
        };
        wrapper.instance().handleListChange(dataBottom);
        expect(wrapper.state("readMore")).toEqual(false);
        let dataMore = {
          viewableItems: [
            { key: "2018-03-14 16:00:00" },
            { key: "2018-03-05 15:59:00" },
            { key: "2018-03-14 15:58:00" },
            { key: "2018-03-05 16:00:00" },
            { key: "2018-03-14 15:59:00" },
            { key: "2018-03-05 15:58:00" },
            { key: "2018-03-14 15:57:00" },
            { key: "2018-03-05 15:57:00" }
          ]
        };
        wrapper.instance().handleListChange(dataMore);
        expect(wrapper.state("readMore")).toEqual(true);
      });

      it("Should have a function that displays or hides 'Read More' depending on distance from the end of the FlatList", () => {
        let tooFar = {
          distanceFromEnd: -10
        };
        wrapper.instance().endReached(tooFar);
        expect(wrapper.state("readMore")).toEqual(true);
        let closeData = {
          distanceFromEnd: 10
        };
        wrapper.instance().endReached(closeData);
        expect(wrapper.state("readMore")).toEqual(false);
      });

      it("Has a handle search function", () => {
        wrapper.instance().handleSearch();
        expect(Alert.alert.mock.calls.length).toEqual(1);
        wrapper.setState({ search: "MSFT" });
        wrapper.instance().handleSearch();
        expect(mockFetchStock.mock.calls.length).toEqual(1);
        expect(mockFetchStock.mock.calls[0][0]).toEqual("MSFT");
      });
    });

    it("Should have a loading screen", () => {
      wrapper.setProps({ appData: fetchingData });
      expect(wrapper.find("Loading")).toHaveLength(1);
    });

    describe("When there is an error", () => {
      it("Should have a Search component", () => {
        wrapper.setProps({ appData: errorData });
        expect(wrapper.find("Error")).toHaveLength(1);
      });

      it("Should be able to start over", () => {
        wrapper.setProps({ appData: errorData });
        wrapper
          .find("Error")
          .props()
          .startAgain(),
          expect(mockInitialFetchData.mock.calls.length).toEqual(1);
      });
    });

    it("Should have an instruction component", () => {
      expect(wrapper.find(Instructions)).toHaveLength(1);
    });

    it("Should an initial state of an empty search text and readMore to be true", () => {
      expect(wrapper.state("search")).toEqual("");
      expect(wrapper.state("readMore")).toEqual(true);
    });

    it("Should have a function that handles the textChange", () => {
      wrapper.instance().handleTextChange("search", "Alastair");
      expect(wrapper.state("search")).toEqual("Alastair");
    });

    describe("Map Dispatch To Props", () => {
      it("Should call the initial fetch data action", () => {
        const dispatchSpy = jest.fn();
        const { initialFetchData } = mapDispatchToProps(dispatchSpy);
        initialFetchData();
        expect(dispatchSpy.mock.calls.length).toEqual(1);
      });

      it("Should call a fetch stock action", () => {
        const dispatchSpy = jest.fn();
        const { fetchStock } = mapDispatchToProps(dispatchSpy);
        fetchStock();
        expect(dispatchSpy.mock.calls.length).toEqual(1);
      });

      it("Should return the same state as props via mapStateToProps", () => {
        let initialData = {
          appData: 1
        };
        expect(mapStateToProps(initialData).appData).toEqual(
          initialData.appData
        );
      });
    });
  });
});
