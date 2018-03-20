import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import Button from "../components/Button";
import Search from "../components/Search";
import StockItem from "../components/StockItem";
import Instructions from "../components/Instructions";

export class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleTextChange = (type, text) => {
    console.log(type, text, "What is the type and text?");
    this.setState({ [type]: text });
  };

  handleSearch = () => {
    if (!this.state.search == "") {
      Alert.alert("Fetch to come");
    } else {
      Alert.alert(
        "Please make sure you have entered a stock code to search for"
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Instructions
          instructionContainer={styles.instructionContainer}
          label={"Please enter a stock symbol"}
        />
        <View style={styles.searchContainer}>
          <Search
            error={false}
            label={"A stock symbol"}
            searchType={"stock"}
            value={this.state.search}
            type={"search"}
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
  }
});

Stock.navigationOptions = {
  title: "Stock",
  headerStyle: {
    backgroundColor: "#EA572D"
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

export default Stock;
