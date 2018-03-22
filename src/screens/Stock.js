import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Platform
} from "react-native";
import Button from "../components/Button";
import Search from "../components/Search";
import StockItem from "../components/StockItem";
import Instructions from "../components/Instructions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { connect } from "react-redux";
import { initialFetchData, fetchStock } from "../actions/index";

export class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      readMore: true
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.startAgain = this.startAgain.bind(this);
  }

  componentDidMount() {
    this.props.initialFetchData();
  }

  handleTextChange = (type, text) => {
    this.setState({ [type]: text });
  };

  handleSearch = () => {
    if (!this.state.search == "") {
      this.props.fetchStock(this.state.search);
    } else {
      Alert.alert(
        "Please make sure you have entered a stock code to search for"
      );
    }
  };

  keyExtractor = (item, index) => item.date;

  renderItem = ({ item }) => {
    return <StockItem item={item} />;
  };

  endReached = props => {
    if (props.distanceFromEnd >= -5.5) {
      this.setState({ readMore: false });
    }
  };

  handleListChange = props => {
    let lengthOfData = this.props.appData.stockData.length - 1;
    let lengthOfVisible = props.viewableItems.length - 1;
    // if the length is less than 0 (what happens when you scroll past the bottom) then the item becomes undefined, no key available
    if (lengthOfVisible >= 0 && lengthOfData >= 0) {
      if (
        props.viewableItems[lengthOfVisible]["key"] !==
        this.props.appData.stockData[lengthOfData].date
      ) {
        this.setState({ readMore: true });
      } else {
        this.setState({ readMore: false });
      }
    }
  };

  startAgain() {
    this.props.initialFetchData();
  }

  render() {
    if (this.props.appData.isFetching) {
      return <Loading />;
    }

    if (this.props.appData.error) {
      return (
        <View style={styles.center}>
          <Error
            errorType={"stock"}
            instructionLabel={"Please enter a stock symbol"}
            searchLabel={"Please enter a stock symbol"}
            search={this.state.search}
            submitSearch={this.handleSearch}
            onTextSearch={this.handleTextChange}
            startAgain={this.startAgain}
          />
        </View>
      );
    }
    let sumTotal;
    if (this.props.appData.stockData.length >= 1) {
      let test = this.props.appData.stockData.map(item => {
        return item.data["2. high"];
      });
      let highest = Math.max(...test);
      sumTotal = highest;
    }

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
            placeholder="Please enter a stock symbol"
          />
        </View>
        {this.props.appData.stockData.length >= 1 && (
          <View style={styles.stockData}>
            <View style={styles.introContainer}>
              <Text style={styles.intro}>
                {this.props.appData.stockCode} Shares
              </Text>
            </View>
            <View style={styles.flatList}>
              <FlatList
                onViewableItemsChanged={this.handleListChange}
                data={this.props.appData.stockData}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </View>
            {this.state.readMore ? (
              <View style={styles.more}>
                <Text style={styles.moreSign}>&darr;</Text>
              </View>
            ) : (
              <View style={styles.more} />
            )}
            <View style={styles.highest}>
              <Text style={styles.sum}>
                The Highest value, {sumTotal}, at any point for -{" "}
                {this.props.appData.stockCode}{" "}
              </Text>
            </View>
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
  instruction: {
    fontSize: 18,
    textAlign: "center"
  },
  stockData: {
    flex: 0.45
  },
  flatList: {
    flex: 0.55,
    margin: 5
  },
  introContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center"
  },
  intro: {
    fontSize: 24,
    fontFamily: "Futura",
    ...Platform.select({
      ios: {
        color: "black"
      },
      android: {
        color: "#212121"
      }
    })
  },
  searchContainer: {
    flex: 0.3,
    margin: 10
  },
  more: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  moreSign: {
    fontSize: 20,
    fontWeight: "900"
  },
  highest: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  center: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    color: "blue"
  },
  error: {
    color: "red",
    textAlign: "center",
    fontFamily: "Futura"
  },
  errorContainer: {
    margin: 20
  },
  errorMessage: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorSearch: {
    flex: 0.3
  },
  alternative: {
    flex: 0.14,
    flexDirection: "row",
    justifyContent: "center"
  },
  sum: {
    ...Platform.select({
      ios: {
        color: "black"
      },
      android: {
        color: "#212121"
      }
    })
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

export function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    initialFetchData: () => dispatch(initialFetchData()),
    fetchStock: stockId => dispatch(fetchStock(stockId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
