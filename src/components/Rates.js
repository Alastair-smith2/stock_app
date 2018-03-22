import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const Rates = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rate}>
        <Text style={styles.text}>From - {data["2. From_Currency Name"]}</Text>
      </View>
      <View style={styles.padding} />
      <View style={styles.rate}>
        <Text style={styles.text}>To - {data["4. To_Currency Name"]}</Text>
      </View>
      <View style={styles.padding} />
      <View style={styles.rate}>
        <Text style={styles.text}>Rate - {data["5. Exchange Rate"]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  rate: {
    flex: 1
  },
  padding: {
    flex: 0.1
  },
  text: {
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
export default Rates;
