import * as actions from "../src/actions/index";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import apiKey from "../src/constants";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Data action", () => {
  // make sure to reset fetch
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("Should get the initial data, return a fetching and fetching success action", () => {
    const data = {
      "Meta Data": {
        "1. Information": "Intraday (1min) prices and volumes",
        "2. Symbol": "MSFT",
        "3. Last Refreshed": "2018-03-15 16:00:00",
        "4. Interval": "1min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
      },
      "Monthly Time Series": {
        "2018-03-15 16:00:00": {
          "1. open": "94.2550",
          "2. high": "94.3300",
          "3. low": "94.1700",
          "4. close": "94.1800",
          "5. volume": "2415049"
        },
        "2018-03-15 15:59:00": {
          "1. open": "94.2700",
          "2. high": "94.3000",
          "3. low": "94.2100",
          "4. close": "94.2550",
          "5. volume": "217935"
        },
        "2018-03-15 15:58:00": {
          "1. open": "94.2400",
          "2. high": "94.3000",
          "3. low": "94.2300",
          "4. close": "94.2700",
          "5. volume": "143333"
        },
        "2018-03-15 15:57:00": {
          "1. open": "94.2050",
          "2. high": "94.2500",
          "3. low": "94.1900",
          "4. close": "94.2350",
          "5. volume": "277754"
        },
        "2018-03-15 15:56:00": {
          "1. open": "94.1400",
          "2. high": "94.2100",
          "3. low": "94.1300",
          "4. close": "94.2050",
          "5. volume": "381419"
        }
      }
    };
    let formattedData = Object.keys(data["Monthly Time Series"]).map(e => {
      return { date: e, data: data["Monthly Time Series"][e] };
    });

    let response = {
      status: 200,
      body: data
    };

    // fetchMock library intercepts any fetch requests, just need to match the url
    fetchMock.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=FB&interval=1min&apikey=${apiKey}`,
      response
    );

    let store = mockStore({ stockCode: "", stockData: [] });

    let expectedActions = [
      {
        type: actions.FETCHING
      },
      {
        type: actions.FETCHING_SUCCESS,
        code: data["Meta Data"]["2. Symbol"],
        data: formattedData
      }
    ];
    return store.dispatch(actions.initialFetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should fail to get the initial data when there is an error, returns fetching and fetching failure actions", () => {
    const data = {
      Error: "Error"
    };
    let response = {
      status: 500,
      body: data
    };

    fetchMock.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=FB&interval=1min&apikey=${apiKey}`,
      response
    );

    let store = mockStore({ stockCode: "", stockData: [] });

    let expectedActions = [
      {
        type: actions.FETCHING
      },
      {
        type: actions.FETCHING_FAILURE
      }
    ];
    return store.dispatch(actions.initialFetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should get data that matches the user request, return fetching and fetching success actions", () => {
    const data = {
      "Meta Data": {
        "1. Information": "Intraday (1min) prices and volumes",
        "2. Symbol": "MSFT",
        "3. Last Refreshed": "2018-03-15 16:00:00",
        "4. Interval": "1min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
      },
      "Monthly Time Series": {
        "2018-03-15 16:00:00": {
          "1. open": "94.2550",
          "2. high": "94.3300",
          "3. low": "94.1700",
          "4. close": "94.1800",
          "5. volume": "2415049"
        },
        "2018-03-15 15:59:00": {
          "1. open": "94.2700",
          "2. high": "94.3000",
          "3. low": "94.2100",
          "4. close": "94.2550",
          "5. volume": "217935"
        },
        "2018-03-15 15:58:00": {
          "1. open": "94.2400",
          "2. high": "94.3000",
          "3. low": "94.2300",
          "4. close": "94.2700",
          "5. volume": "143333"
        },
        "2018-03-15 15:57:00": {
          "1. open": "94.2050",
          "2. high": "94.2500",
          "3. low": "94.1900",
          "4. close": "94.2350",
          "5. volume": "277754"
        },
        "2018-03-15 15:56:00": {
          "1. open": "94.1400",
          "2. high": "94.2100",
          "3. low": "94.1300",
          "4. close": "94.2050",
          "5. volume": "381419"
        }
      }
    };
    let formattedData = Object.keys(data["Monthly Time Series"]).map(e => {
      return { date: e, data: data["Monthly Time Series"][e] };
    });

    let response = {
      status: 200,
      body: data
    };

    fetchMock.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&interval=1min&apikey=${apiKey}`,
      response
    );

    // fetch.mockResponseOnce(JSON.stringify(formattedData));
    let store = mockStore({ stockCode: "", stockData: [] });

    let expectedActions = [
      {
        type: actions.FETCHING
      },
      {
        type: actions.FETCHING_SUCCESS,
        code: data["Meta Data"]["2. Symbol"],
        data: formattedData
      }
    ];
    return store.dispatch(actions.fetchStock("MSFT")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should fail to get the data, return fetching and fetching failure actions", () => {
    const data = {
      Error: "Error"
    };

    let response = {
      status: 500,
      body: data
    };

    fetchMock.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&interval=1min&apikey=${apiKey}`,
      response
    );

    // fetch.mockResponseOnce(JSON.stringify(formattedData));
    let store = mockStore({ stockCode: "", stockData: [] });

    let expectedActions = [
      {
        type: actions.FETCHING
      },
      {
        type: actions.FETCHING_FAILURE
      }
    ];
    return store.dispatch(actions.fetchStock("MSFT")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should fetch currency data, return fetching and fetching success currency action", () => {
    const data = {
      "Realtime Currency Exchange Rate": {
        "1. From_Currency Code": "BTC",
        "2. From_Currency Name": "Bitcoin",
        "3. To_Currency Code": "CNY",
        "4. To_Currency Name": "Chinese Yuan",
        "5. Exchange Rate": "49681.65509750",
        "6. Last Refreshed": "2018-03-17 23:24:10",
        "7. Time Zone": "UTC"
      }
    };
    let response = {
      status: 200,
      body: data
    };

    fetchMock.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=GBP&apikey=${apiKey}`,
      response
    );

    // fetch.mockResponseOnce(JSON.stringify(formattedData));
    let store = mockStore({ stockCode: "", stockData: [] });

    let expectedActions = [
      {
        type: actions.FETCHING
      },
      {
        type: actions.FETCHING_CURRENCY_SUCCESS,
        data: data["Realtime Currency Exchange Rate"]
      }
    ];
    return store.dispatch(actions.fetchCurrency("USD", "GBP")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("Should fail to get currency data when there's an error from the server, return fetching and fetching failure actions", () => {
    const data = {
      "Error Message": "Message"
    };
    let response = {
      status: 500,
      body: data
    };

    fetchMock.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=GBP&apikey=${apiKey}`,
      response
    );

    // fetch.mockResponseOnce(JSON.stringify(formattedData));
    let store = mockStore({ stockCode: "", stockData: [] });

    let expectedActions = [
      {
        type: actions.FETCHING
      },
      {
        type: actions.FETCHING_FAILURE
      }
    ];
    return store.dispatch(actions.fetchCurrency("USD", "GBP")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should return an error because of user mistake, return fetching and fetching failure actions", () => {
    const data = {};
    let response = {
      status: 500,
      body: Error
    };

    fetchMock.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=Invalid&to_currency=Test&apikey=${apiKey}`,
      response
    );

    // fetch.mockResponseOnce(JSON.stringify(formattedData));
    let store = mockStore({ stockCode: "", stockData: [] });

    let expectedActions = [
      {
        type: actions.FETCHING
      },
      {
        type: actions.FETCHING_FAILURE
      }
    ];
    return store.dispatch(actions.fetchCurrency("Invalid", "Test")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Should update the stock code and data present", () => {
    const code = "MSFT";
    const data = "Test Data";
    const expectedAction = {
      type: actions.FETCHING_SUCCESS,
      code,
      data
    };
    expect(actions.getDataSuccess(code, data)).toEqual(expectedAction);
  });

  it("Should update the currency data", () => {
    const data = "Test Data";
    const expectedAction = {
      type: actions.FETCHING_CURRENCY_SUCCESS,
      data
    };
    expect(actions.getDataCurrencySuccess(data)).toEqual(expectedAction);
  });

  it("Should cause a login action", () => {
    const expectedAction = {
      type: actions.LOGIN
    };
    expect(actions.login()).toEqual(expectedAction);
  });

  it("Should cause a logout action", () => {
    const expectedAction = {
      type: actions.LOGOUT
    };
    expect(actions.logout()).toEqual(expectedAction);
  });

  it("Should cause a fetching action", () => {
    const expectedAction = {
      type: actions.FETCHING
    };
    expect(actions.getData()).toEqual(expectedAction);
  });

  it("Should cause a error action", () => {
    const expectedAction = {
      type: actions.FETCHING_FAILURE
    };
    expect(actions.getDataFailure()).toEqual(expectedAction);
  });
});
