import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
  Linking
} from "react-native";
import { Card, Button } from "react-native-elements";

class IndividualInfo extends Component {
  static navigationOptions = {
    title: "Individual Information"
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    const IndividualId = this.props.navigation.getParam("IndividualId");
    fetch(
      //"https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=1&pretty=true&number=1942267901"
      "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=1&pretty=true&number=" +
        IndividualId
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
  }

  PracticeLocations = data => {
    var str = data.item.address_1;
    var res = str.split(" ");
    var address1 = res.join("+");
    var str = data.item.city;
    var res = str.split(" ");
    var city = res.join("+");

    return (
      <Card>
        <Text style={{ fontSize: 18, color: "black" }}>Practice Location</Text>
        <Text
          style={{ fontSize: 17, color: "gray" }}
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps?q=${address1}+${city}+${data.item.state}+${data.item.postal_code}`
            );
          }}
        >
          {data.item.address_1} {data.item.address_2}
          {"\n"}
          {data.item.city}, {data.item.state} {data.item.postal_code}
        </Text>
        <Text
          style={{ fontSize: 17, color: "silver" }}
          onPress={() => {
            Linking.openURL(`tel:${data.item.telephone_number}`);
          }}
        >
          {data.item.telephone_number}
        </Text>
      </Card>
    );
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderData = data => {
      return (
        <View>
          <Card
            featuredTitle={data.item.basic.name}
            image={{
              uri:
                "https://forum.facmedicine.com/attachments/3937372880afb2ee5398b59950598013-jpg.20803/"
            }}
          >
            {data.item.taxonomies.map(taxonomy => (
              <Text style={{ fontSize: 18, color: "black" }}>
                {taxonomy.desc}
              </Text>
            ))}
            <Text style={{ fontSize: 18, color: "silver" }}>
              NPI: {data.item.number}
            </Text>
          </Card>
          <FlatList
            data={data.item.practiceLocations}
            renderItem={item => this.PracticeLocations(item)}
            keyExtractor={item => data.item.number.toString()}
          />
        </View>
      );
    };

    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.row}>
          <Button
            title="Back"
            color="#f194ff"
            onPress={() => navigate("Individual")}
          />
        </View>
        <FlatList
          data={this.state.dataSource.results}
          renderItem={item => renderData(item)}
          //keyExtractor={item => item.number.toString()}
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
  }
});

export default IndividualInfo;
