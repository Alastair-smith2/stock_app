import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { connect } from "react-redux";
import { login } from "../actions/index";
import { NavigationActions } from "react-navigation";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange = (type, text) => {
    this.setState({ [type]: text });
  };

  handleNavigation = () => {
    if (this.state.password == "Pass" && this.state.username == "Admin") {
      this.props.login();
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Dashboard" })]
      });
      this.props.navigation.dispatch(resetAction);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <Text style={styles.intro}>Stock & Exchange Search</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={this.state.username}
            onTextInput={this.handleTextChange}
            type={"username"}
            label={"Username"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={this.state.password}
            onTextInput={this.handleTextChange}
            type={"password"}
            label={"Password"}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            title={"Submit"}
            buttonPress={this.handleNavigation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  introContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center"
  },
  intro: {
    fontSize: 24,
    fontFamily: "Futura",
    fontWeight: "500"
  },
  inputContainer: {
    flex: 0.1,
    margin: 10
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#EA572D",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
    padding: 15,
    borderRadius: 60
  }
});

Login.navigationOptions = {
  title: "Login",
  headerStyle: {
    backgroundColor: "#EA572D"
  },
  headerTitleStyle: {
    color: "#FFF",
    fontSize: 20,
    flex: 1,
    textAlign: "center"
  },
  headerTintColor: "#fff"
};

export function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
