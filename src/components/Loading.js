import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#EA572D" />
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
