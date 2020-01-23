import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Card, Input, Button } from "react-native-elements";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      organization_name: "",
      npi: ""
    };
  }

  componentDidMount(searchName = "", searchNPI = "") {
    if (searchName != "" || searchNPI > 0) {
      fetch(
        "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&pretty=true&state=NV&enumeration_type=NPI-2&organization_name=" +
          searchName +
          "&number=" +
          searchNPI
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.setState({
            loading: false,
            dataSource: responseJson
          });
        })
        .catch(error => console.log(error)); //to catch the errors if any
    } else {
      fetch(
        "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=1&pretty=true&state=NV&enumeration_type=NPI-2"
      )
        .then(response => response.json())
        .then(responseJson => {
          //console.log(responseJson);
          this.setState({
            loading: false,
            dataSource: responseJson
          });
        })
        .catch(error => console.log(error)); //to catch the errors if any
    }
  }

  static navigationOptions = {
    title: "Organization"
  };

  queryNPI = () => {
    let searchName = this.state.organization_name;
    let searchNPI = this.state.npi;

    this.componentDidMount(searchName, searchNPI);
  };

  render() {
    const DeviceWidth = Dimensions.get("window").width;
    const { navigate } = this.props.navigation;

    const renderData = data => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigate("OrganizationInfo", { organizationId: data.item.number })
          }
        >
          <Card>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {data.item.basic.name}
            </Text>
            {data.item.taxonomies.map(taxonomy => (
              <Text>{taxonomy.desc}</Text>
            ))}
            <FlatList
              data={data.item.practiceLocations}
              renderItem={item => this.PracticeLocations(item)}
              keyExtractor={item => data.item.number.toString()}
            />
            <Text style={{ fontSize: 11, color: "silver" }}>
              NPI: {data.item.number}
            </Text>
          </Card>
        </TouchableOpacity>
      );
    };

    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <Text>loading...</Text>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <Text style={styles.label}>Name</Text>
            <Input
              onChangeText={organization_name =>
                this.setState({ organization_name })
              }
              value={this.state.organization_name}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.label}>NPI</Text>
            <Input
              onChangeText={npi => this.setState({ npi })}
              value={this.state.npi}
            />
          </View>
          <View style={styles.inputWrap}>
            <Button
              title="Submit"
              color="#f194ff"
              onPress={() => this.queryNPI()}
            />
          </View>
        </View>
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
        <FlatList
          data={this.state.dataSource.results}
          renderItem={item => renderData(item)}
          keyExtractor={item => item.number.toString()}
        />
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
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#64B5F6"
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10
  }
});

export default Organization;
