import React, { Component } from "react";
import Home from "./HomeComponent";
import Individual from "./IndividualComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import ActionBarImage from "./ActionBarImage";
import { View, Platform, Image } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

// Not t display warning issues (yellow) within the app - once parts are updated, then I can remove this for production
console.disableYellowBox = true;

const IndividualNavigator = createStackNavigator(
  {
    Individual: { screen: Individual },
    CampsiteInfo: { screen: CampsiteInfo }
  },
  {
    initialRouteName: "Individual",
    navigationOptions: {
      headerLeft: <ActionBarImage />,
      headerStyle: {
        height: 20,
        backgroundColor: "#01579B"
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
        backgroundColor: "#01579B"
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
    drawerBackgroundColor: "#01579B",
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
