import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import Button from "./Button";
import Input from "./Input";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.searchSubmit = this.searchSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  onTextChange = (type, props) => {
    this.props.onTextSearch(type, props);
  };

  searchSubmit = () => {
    this.props.submitSearch();
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.searchType == "currency" ? (
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <View style={styles.inputContainer}>
                <Input
                  value={this.props.currencyOne}
                  onTextInput={this.onTextChange}
                  type={this.props.typeOne}
                  label={this.props.labelOne}
                />
              </View>
              <View style={styles.padding} />
              <View style={styles.inputContainer}>
                <Input
                  value={this.props.currencyTwo}
                  onTextInput={this.onTextChange}
                  type={this.props.typeTwo}
                  label={this.props.labelTwo}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.alternative}>
                <Button
                  title={"Exchange"}
                  buttonStyle={styles.button}
                  buttonPress={this.searchSubmit}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.stockContainer}>
              <Input
                value={this.props.value}
                onTextInput={this.onTextChange}
                type={this.props.type}
                label={this.props.label}
              />
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.alternative}>
                <Button
                  buttonStyle={styles.button}
                  buttonPress={this.searchSubmit}
                  title={"Search"}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  stockContainer: {
    flex: 0.6,
    marginBottom: 10
  },
  inputContainer: {
    flex: 1
  },
  padding: {
    flex: 0.05
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    backgroundColor: "#EA572D",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
    borderRadius: 60
  }
});
