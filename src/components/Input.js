import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default class Input extends Component {
  onTextChange = props => {
    this.props.onTextInput(this.props.type, props);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput
          value={this.props.value}
          placeholder={`Please enter you ${this.props.type}`}
          onChangeText={text => this.onTextChange(text)}
          type={this.props.type}
          underlineColorAndroid={"transparent"}
          autoCapitalize={"none"}
          style={styles.textInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  label: {
    fontSize: 16,
    fontFamily: "Futura"
  },
  textInput: {
    flex: 1.5,
    height: 40,
    borderColor: "#BBB",
    borderWidth: 1,
    padding: 10
  }
});
