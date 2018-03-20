import React, { Component } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }
  onPress = () => {
    this.props.buttonPress();
  };

  render() {
    return (
      <TouchableHighlight
        onPress={this.onPress}
        style={[styles.container, this.props.buttonStyle]}
      >
        <Text style={styles.label}>{this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    fontSize: 20,
    color: "#fff"
  }
});
