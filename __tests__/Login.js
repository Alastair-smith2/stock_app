import React from "react";
import { shallow } from "enzyme";
import Button from "../src/components/Button.js";
import Input from "../src/components/Input.js";
import {
  Login,
  mapDispatchToProps,
  mapStateToProps
} from "../src/screens/Login.js";

describe("The Login screen", () => {
  let wrapper;
  let navigation = {
    dispatch: jest.fn()
  };
  let appData = {
    authenticated: false,
    stockData: [],
    stockCode: "",
    currencyData: null,
    dataFetched: false,
    isFetching: false,
    error: false
  };
  let login = jest.fn();

  let initialState = {
    appData: {
      authenticated: false,
      stockData: [],
      stockCode: "",
      currencyData: null,
      dataFetched: false,
      isFetching: false,
      error: false
    }
  };

  beforeEach(() => {
    wrapper = shallow(
      <Login appData={appData} navigation={navigation} login={login} />
    );
    wrapper.setState({ username: "", password: "" });
    navigation.dispatch.mockReset();
    login.mockReset();
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
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("On pressing the Button should dispatch to the next page", () => {
      wrapper
        .find(Button)
        .props()
        .buttonPress();
      expect(login.mock.calls.length).toEqual(0);
      wrapper.setState({ username: "Admin", password: "Pass" });
      wrapper
        .find(Button)
        .props()
        .buttonPress();
      expect(navigation.dispatch.mock.calls.length).toEqual(1);
      expect(login.mock.calls.length).toEqual(1);
    });

    it("Should an initial state that is a pair of empty strings", () => {
      expect(wrapper.state("username")).toEqual("");
      expect(wrapper.state("password")).toEqual("");
    });

    it("Should have a function that handles the textChange", () => {
      wrapper.instance().handleTextChange("username", "Alastair");
      expect(wrapper.state("username")).toEqual("Alastair");
    });
  });

  describe("Redux connect", () => {
    it("should call fetch data action via mapDispatchToProps", () => {
      const dispatchSpy = jest.fn();
      const { login } = mapDispatchToProps(dispatchSpy);
      login();
      expect(dispatchSpy.mock.calls.length).toEqual(1);
    });

    it("Should return the same state as props via mapStateToProps", () => {
      let initialData = {
        appData: 1
      };
      expect(mapStateToProps(initialData).appData).toEqual(initialData.appData);
    });
  });
});
