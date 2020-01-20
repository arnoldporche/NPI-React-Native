import React, { Component } from "react";
import Home from "./HomeComponent";
import Individual from "./IndividualComponent";
import IndividualInfo from "./IndividualInfoComponent";
import Organization from "./OrganizationComponent";
import ActionBarImage from "./ActionBarImage";
import {
  View,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image
} from "react-native";
import { Icon } from "react-native-elements";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

// Not t display warning issues (yellow) within the app - once parts are updated, then I can remove this for production
console.disableYellowBox = true;

const OrganizationNavigator = createStackNavigator(
  {
    Organization: { screen: Organization }
  },
  {
    initialRouteName: "Organization",
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

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri:
                "https://s3-us-west-1.amazonaws.com/fraymework/multimedia/images/icons/apps/npicheck.png"
            }}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>NPI</Text>
          <Text>National Provider Identifier</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        )
      }
    },
    Individual: {
      screen: IndividualNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        )
      }
    },
    Organization: {
      screen: OrganizationNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    drawerBackgroundColor: "#64B5F6",
    contentComponent: CustomDrawerContentComponent,
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: "#1565C0",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row"
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24
  }
});

export default Main;
