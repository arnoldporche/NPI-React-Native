import React, { Component } from "react";
import Home from "./HomeComponent";
import Individual from "./IndividualComponent";
import IndividualInfo from "./IndividualInfoComponent";
import ActionBarImage from "./ActionBarImage";
import { View, Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

// Not t display warning issues (yellow) within the app - once parts are updated, then I can remove this for production
console.disableYellowBox = true;

const IndividualNavigator = createStackNavigator(
  {
    Individual: { screen: Individual },
    IndividualInfo: { screen: IndividualInfo }
  },
  {
    initialRouteName: "Individual",
    navigationOptions: {
      headerLeft: <ActionBarImage />,
      headerStyle: {
        height: 20,
        backgroundColor: "#1565C0"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    navigationOptions: {
      headerLeft: <ActionBarImage />,
      headerStyle: {
        height: 20,
        backgroundColor: "#1565C0"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    Individual: { screen: IndividualNavigator }
  },
  {
    drawerBackgroundColor: "#64B5F6",
    labelStyle: {
      color: "#fff"
    }
  }
);

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

export default Main;
