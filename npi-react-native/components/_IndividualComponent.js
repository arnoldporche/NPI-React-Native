import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { INDIVIDUALS } from "../shared/individuals";

class Individual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individuals: INDIVIDUALS
    };
  }

  static navigationOptions = {
    title: "Individual"
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderIndividualItem = ({ item }) => {
      return (
        <ListItem
          title={`${item.name}, ${item.firstName}`}
          subtitle={`NPI: ${item.npi}`}
          onPress={() => navigate("IndividualInfo", { individualId: item.id })}
          leftAvatar={{ source: { uri: item.image } }}
        />
      );
    };

    return (
      <FlatList
        data={this.state.individuals}
        renderItem={renderIndividualItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default Individual;
