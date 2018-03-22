import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import Instructions from "./Instructions";
import Search from "./Search";
import Button from "./Button";

export default class Error extends Component {
  constructor(props) {
    super(props);

    this.searchSubmit = this.searchSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.restart = this.restart.bind(this);
  }
  onTextChange = (type, props) => {
    console.log(type, props, "What are the props being passed through here?");
    this.props.onTextSearch(type, props);
  };

  searchSubmit = () => {
    this.props.submitSearch();
  };

  restart = () => {
    this.props.startAgain();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.error}>There was an error loading the data</Text>
        </View>
        <Instructions
          instructionContainer={styles.instructionContainer}
          label={this.props.instructionLabel}
        />
        <View style={styles.searchContainer}>
          {this.props.errorType == "currency" ? (
            <Search
              error={true}
              searchType={"currency"}
              currencyOne={this.props.currencyOne}
              typeOne="currencyOne"
              labelOne={this.props.currencyOneLabel}
              currencyTwo={this.props.currencyTwo}
              typeTwo="currencyTwo"
              labelTwo={this.props.currencyOneLabel}
              submitSearch={this.searchSubmit}
              onTextSearch={this.onTextChange}
              restart={this.restart}
            />
          ) : (
            <Search
              error={true}
              label={this.props.searchLabel}
              searchType={"stock"}
              value={this.props.search}
              type={"search"}
              submitSearch={this.searchSubmit}
              onTextSearch={this.onTextChange}
              restart={this.restart}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  errorContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  instructionContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  searchContainer: {
    flex: 0.3,
    marginLeft: 10,
    marginRight: 10
  }
});
