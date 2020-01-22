import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image
} from "react-native";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  static navigationOptions = {
    title: "Organization"
  };

  render() {
    const DeviceWidth = Dimensions.get("window").width;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <Text></Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "General Acute Care Hospital"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "steelblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://image.flaticon.com/icons/png/512/504/504276.png"
                  }}
                />
                <Text style={{ color: "white" }}>Hospital</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "Pharmacy"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "skyblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://cdn.pixabay.com/photo/2017/05/15/21/58/drug-icon-2316244_960_720.png"
                  }}
                />
                <Text style={{ color: "white" }}>Pharmacy</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "Medical Supplies"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "powderblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://image.flaticon.com/icons/png/512/196/196136.png"
                  }}
                />
                <Text style={{ color: "white" }}>Medical Supply</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "General Practice"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "steelblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 60, height: 60 }}
                  source={{
                    uri:
                      "https://image.flaticon.com/icons/png/512/1869/1869354.png"
                  }}
                />
                <Text style={{ color: "white" }}>Doctor's Office</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "Skilled Nursing Facility"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "skyblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://image.flaticon.com/icons/png/512/196/196125.png"
                  }}
                />
                <Text style={{ color: "white" }}>Nursing Facility</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "Personal Care Attendant"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "powderblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://image.flaticon.com/icons/png/512/564/564276.png"
                  }}
                />
                <Text style={{ color: "white" }}>Personal Care</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "Dental"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "steelblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://i.ya-webdesign.com/images/teeth-icon-png-6.png"
                  }}
                />
                <Text style={{ color: "white" }}>Dental</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "Home Health"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "skyblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://cdn.pixabay.com/photo/2015/12/28/02/58/home-1110868__340.png"
                  }}
                />
                <Text style={{ color: "white" }}>Home Health</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate("OrganizationCategory", {
                  taxonomy_description: "Physical Therapist"
                })
              }
            >
              <View
                style={{
                  width: DeviceWidth / 3,
                  height: DeviceWidth * 0.2,
                  marginBottom: 5,
                  marginLeft: 5,
                  backgroundColor: "powderblue",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      "https://image.flaticon.com/icons/png/512/249/249209.png"
                  }}
                />
                <Text style={{ color: "white" }}>Therapist</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
  }
});

export default Organization;
