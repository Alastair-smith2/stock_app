import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

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
          placeholder={this.props.placeholder}
          onChangeText={text => this.onTextChange(text)}
          type={this.props.type}
          underlineColorAndroid={"transparent"}
          autoCapitalize={"none"}
          secureTextEntry={this.props.type == "password"}
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
  textInput: {
    flex: 1.5,
    height: 40,
    borderColor: "#BBB",
    borderWidth: 1,
    padding: 10,
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
