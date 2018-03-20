import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export class Stock extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I will be the stock screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default Stock;
