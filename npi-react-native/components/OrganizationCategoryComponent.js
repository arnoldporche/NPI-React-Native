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
import { Card, Icon } from "react-native-elements";

class OrganizationCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    const taxonomy_description = this.props.navigation.getParam(
      "taxonomy_description"
    );
    fetch(
      "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&pretty=true&state=NV&city=las vegas&enumeration_type=NPI-2&taxonomy_description=" +
        taxonomy_description
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

  static navigationOptions = {
    title: "Organization"
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

  render() {
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
  }
});

export default OrganizationCategory;
