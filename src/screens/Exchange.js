import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Input from "../components/Input";
import Search from "../components/Search";
import Instructions from "../components/Instructions";

export class Exchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyOne: "",
      currencyTwo: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleTextChange = (type, text) => {
    this.setState({ [type]: text });
  };

  handleSearch = () => {
    if (!this.state.currencyOne == "" && !this.state.currencyTwo == "") {
      Alert.alert("Fetch to come");
    } else {
      Alert.alert("Please make sure you've enntered a value for each currency");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Instructions
          instructionContainer={styles.instructionContainer}
          label={"Please enter 3 letter currency symbols"}
        />
        <View style={styles.searchContainer}>
          <Search
            error={false}
            searchType={"currency"}
            currencyOne={this.state.currencyOne}
            typeOne="currencyOne"
            labelOne={"From"}
            currencyTwo={this.state.currencyTwo}
            typeTwo="currencyTwo"
            labelTwo={"To"}
            submitSearch={this.handleSearch}
            onTextSearch={this.handleTextChange}
          />
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
  instructionContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  searchContainer: {
    flex: 0.3,
    margin: 10
  },
  center: {
    flex: 1
  }
});

Exchange.navigationOptions = {
  title: "Exchange Rate",
  headerStyle: {
    backgroundColor: "#EA572D",
    paddingBottom: 10
  },
  headerTitleStyle: {
    color: "#FFF",
    fontSize: 20,
    flex: 1,
    textAlign: "center"
  },
  headerTintColor: "#fff",
  headerLeft: null
};

export default Exchange;
