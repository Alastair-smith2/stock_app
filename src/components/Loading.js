import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.loading}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loading: {
    color: "blue"
  }
});

export default Loading;
