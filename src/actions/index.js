import VantageApiKey from "../constants";

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const FETCHING = "FETCHING";
export const FETCHING_SUCCESS = "FETCHING_SUCCESS";
export const FETCHING_FAILURE = "FETCHING_FAILURE";
export const FETCHING_CURRENCY_SUCCESS = "FETCHING_CURRENCY_SUCCESS";

const fetchInitialUrl =
  "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=FB&interval=1min&apikey=";
const fetchUrl = "https://www.alphavantage.co/query?function=";

export function login() {
  return {
    type: LOGIN
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function getData() {
  return {
    type: FETCHING
  };
}

export function getDataSuccess(code, data) {
  return {
    type: FETCHING_SUCCESS,
    code,
    data
  };
}

export function getDataFailure() {
  return {
    type: FETCHING_FAILURE
  };
}

export function getDataCurrencySuccess(data) {
  return {
    type: FETCHING_CURRENCY_SUCCESS,
    data
  };
}

// gets the initial data to be displayed
export function initialFetchData() {
  return dispatch => {
    dispatch(getData());
    return fetch(fetchInitialUrl + `${VantageApiKey}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data, "Data from fetch");
        let formattedData = Object.keys(data["Monthly Time Series"]).map(e => {
          // console.log(e, "The formatted Data");
          return { date: e, data: data["Monthly Time Series"][e] };
        });
        // console.log("Submit success");
        dispatch(getDataSuccess(data["Meta Data"]["2. Symbol"], formattedData));
      })
      .catch(err => {
        // console.log(err, "Err, err from fetch");
        dispatch(getDataFailure());
      });
  };
}

// gets the currency exchange information about the two currencies given
export function fetchCurrency(currencyOne, currencyTwo) {
  return dispatch => {
    dispatch(getData());
    return fetch(
      fetchUrl +
        `CURRENCY_EXCHANGE_RATE&from_currency=${currencyOne}&to_currency=${currencyTwo}&apikey=${VantageApiKey}`
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data, "Data from fetch");
        if (data["Error Message"]) {
          dispatch(getDataFailure());
        } else {
          dispatch(
            getDataCurrencySuccess(data["Realtime Currency Exchange Rate"])
          );
        }
      })
      .catch(err => {
        console.log(err, "Err, err from fetch");
        dispatch(getDataFailure());
      });
  };
}

// fetches the latest stock information about a given stock
export function fetchStock(stockId) {
  return dispatch => {
    dispatch(getData());
    return fetch(
      fetchUrl +
        `TIME_SERIES_MONTHLY&symbol=${stockId}&interval=1min&apikey=${VantageApiKey}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data, "Data from fetch");
        let formattedData = Object.keys(data["Monthly Time Series"]).map(e => {
          return { date: e, data: data["Monthly Time Series"][e] };
        });
        console.log("Submit success");
        dispatch(getDataSuccess(data["Meta Data"]["2. Symbol"], formattedData));
      })
      .catch(err => {
        console.log(err, "Err, err from fetch");
        dispatch(getDataFailure());
      });
  };
}
