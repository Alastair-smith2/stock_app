import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "../components/Input";
import Search from "../components/Search";
import Loading from "../components/Loading";
import Rates from "../components/Rates";
import Instructions from "../components/Instructions";
import Error from "../components/Error";
import { connect } from "react-redux";
import { initialFetchData, fetchCurrency } from "../actions/index";

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
      this.props.fetchCurrency(this.state.currencyOne, this.state.currencyTwo);
    } else {
      Alert.alert("Please make sure you've entered a value for each currency");
    }
  };

  render() {
    if (this.props.appData.isFetching) {
      return <Loading />;
    }

    if (this.props.appData.error) {
      return (
        <View style={styles.center}>
          <Error
            errorType={"currency"}
            instructionLabel={"Please enter 3 letter currency symbols"}
            searchLabel={"Please enter 3 letter currency symbols"}
            searchType={"currency"}
            currencyOne={this.state.currencyOne}
            labelOne={"From"}
            currencyTwo={this.state.currencyTwo}
            labelTwo={"To"}
            submitSearch={this.handleSearch}
            onTextSearch={this.handleTextChange}
            startAgain={this.startAgain}
          />
        </View>
      );
    }

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
            placeholder="Please enter a currency"
          />
        </View>
        {this.props.appData.currencyData && (
          <View style={styles.rates}>
            <Rates data={this.props.appData.currencyData} />
          </View>
        )}
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
  rates: {
    flex: 0.3
  },
  center: {
    flex: 1
  }
});

Exchange.navigationOptions = {
  title: "Exchange Rate",
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

export function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchCurrency: (currencyOne, currencyTwo) =>
      dispatch(fetchCurrency(currencyOne, currencyTwo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
