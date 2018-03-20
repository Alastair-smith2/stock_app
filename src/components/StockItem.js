import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StockItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.text}>Date - {item.date}</Text>
      </View>
      <View style={styles.padding} />
      <View style={styles.high}>
        <Text style={styles.text}>High- {item.data["2. high"]}</Text>
      </View>
      <View style={styles.padding} />
      <View style={styles.low}>
        <Text style={styles.text}>Low - {item.data["3. low"]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center"
  },
  date: {
    flex: 0.25
  },
  padding: {
    flex: 0.1
  },
  high: {
    flex: 0.25
  },
  low: {
    flex: 0.25
  },
  text: {
    textAlign: "center"
  }
});
export default StockItem;
