import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

export default class Organization extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Source Listing",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { textAlign: "center", flex: 1 }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    //fetch("https://jsonplaceholder.typicode.com/users")
    fetch(
      "https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=5&pretty=true&state=NV&city=las vegas&enumeration_type=NPI-2"
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

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      />
    );
  };

  renderItem = data => (
    <TouchableOpacity style={styles.list}>
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
    </TouchableOpacity>
  );

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
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <Text>loading...</Text>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>results: {this.state.dataSource.results.length}</Text>
        <FlatList
          data={this.state.dataSource.results}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.number.toString()}
        />
      </View>
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
