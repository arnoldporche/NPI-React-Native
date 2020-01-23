import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Card, Input, Button } from "react-native-elements";

class Individual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      firstName: "",
      lastName: "",
      npi: ""
    };
  }

  componentDidMount(searchFirstName = "", searchLastName = "", searchNPI = "") {
    console.log("loading.." + searchNPI);

    if (searchFirstName != "" || searchLastName != "" || searchNPI > 0) {
      fetch(
        "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&pretty=true&state=NV&enumeration_type=NPI-1&first_name=" +
          searchFirstName +
          "&last_name=" +
          searchLastName +
          "&number=" +
          searchNPI
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
    } else {
      fetch(
        "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&pretty=true&state=NV&enumeration_type=NPI-1"
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
    title: "Individual"
  };

  PracticeLocations = data => {
    return (
      <View>
        <Text style={{ fontSize: 12, color: "gray" }}>
          {data.item.city}, {data.item.state}
        </Text>
      </View>
    );
  };

  queryNPI = () => {
    //const { navigate } = this.props.navigation;
    let searchFirstName = this.state.firstName;
    let searchLastName = this.state.lastName;
    let searchNPI = this.state.npi;
    /*
    navigate("IndividualSearch", {
      searchFirstName: searchFirstName,
      searchLastName: searchLastName,
      searchNPI: searchNPI
    });
    */
    this.componentDidMount(searchFirstName, searchLastName, searchNPI);
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderData = data => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigate("IndividualInfo", { IndividualId: data.item.number })
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
            <Text style={styles.label}>First name</Text>
            <Input
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.label}>Last Name</Text>
            <Input
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
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

export default Individual;
