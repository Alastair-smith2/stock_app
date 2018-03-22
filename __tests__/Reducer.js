import dataReducer from "../src/reducers/dataReducer";
import * as types from "../src/actions/index";

describe("Data reducer", () => {
  it("Should return the initial state", () => {
    expect(dataReducer(undefined, {})).toEqual({
      authenticated: false,
      stockData: [],
      stockCode: "",
      currencyData: null,
      dataFetched: false,
      isFetching: false,
      error: false
    });
  });

  it("The type LOGIN should result with authentication being true", () => {
    expect(
      dataReducer([], {
        type: types.LOGIN
      })
    ).toEqual({
      authenticated: true
    });
  });

  it("The type LOGOUT should result with authentication being false", () => {
    expect(
      dataReducer([], {
        type: types.LOGOUT
      })
    ).toEqual({
      authenticated: false
    });
  });

  it("The type FETCHING should result with currencyData being set to null, stockData being set to an empty array, error false and isFetching true", () => {
    expect(
      dataReducer([], {
        type: types.FETCHING
      })
    ).toEqual({
      currencyData: null,
      error: false,
      isFetching: true,
      stockData: []
    });
  });

  it("The type FETCHING_FAILURE should result in isFetching to be false and error to be true", () => {
    expect(
      dataReducer([], {
        type: types.FETCHING_FAILURE
      })
    ).toEqual({
      isFetching: false,
      error: true
    });
  });

  it("The type FETCHING_CURRENCY_SUCCESS should set isFetching false and pass a value to currencyData", () => {
    expect(
      dataReducer([], {
        type: types.FETCHING_CURRENCY_SUCCESS,
        data: "TestData"
      })
    ).toEqual({
      isFetching: false,
      currencyData: "TestData"
    });
  });

  it("The type FETCHING_SUCCESS should result in isFetching false and updating both the stockCode and stockData values", () => {
    expect(
      dataReducer([], {
        type: types.FETCHING_SUCCESS,
        code: "MSFT",
        data: "Test stock data"
      })
    ).toEqual({
      isFetching: false,
      stockCode: "MSFT",
      stockData: "Test stock data"
    });
  });
});
