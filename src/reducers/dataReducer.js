import {
  FETCHING,
  FETCHING_SUCCESS,
  FETCHING_FAILURE,
  FETCHING_CURRENCY_SUCCESS,
  FETCHING_STOCK_SUCCESS,
  LOGOUT,
  LOGIN
} from "../actions/index";
const initialState = {
  authenticated: false,
  stockData: [],
  stockCode: "",
  currencyData: null,
  dataFetched: false,
  isFetching: false,
  error: false
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false
      };
    case FETCHING:
      return {
        ...state,
        stockData: [],
        currencyData: null,
        isFetching: true,
        error: false
      };
    case FETCHING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        stockCode: action.code,
        stockData: action.data
      };
    case FETCHING_CURRENCY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currencyData: action.data
      };
    case FETCHING_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
}
