import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const Instructions = ({ instructionContainer, label }) => {
  return (
    <View style={instructionContainer}>
      <Text style={styles.instruction}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  instruction: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Futura",
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

export default Instructions;
