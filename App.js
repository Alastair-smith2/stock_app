/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from "react";

import { StackNavigator } from "react-navigation";
import Login from "./src/screens/Login";
import Dashboard from "./src/screens/Dashboard";
import { Provider } from "react-redux";
import configureStore from "./src/store/index";

const store = configureStore();

const RootStack = StackNavigator(
  {
    Login: {
      screen: Login
    },
    Dashboard: {
      screen: Dashboard
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
