import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    fontFamily: "Futura"
  }
});

export default Instructions;
