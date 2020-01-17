import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { INDIVIDUALS } from "../shared/individuals";
import { COMMENTS } from "../shared/comments";

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

function RenderIndividual(props) {
  const { individual } = props;

  if (individual) {
    return (
      <Card
        featuredTitle={`${individual.name}, ${individual.firstName}`}
        image={{
          uri: individual.image
        }}
      >
        <Text style={{ margin: 10 }}>{individual.description}</Text>
        <Icon
          name={props.favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          raised
          reverse
          onPress={() =>
            props.favorite
              ? console.log("Already set as a favorite")
              : props.markFavorite()
          }
        />
      </Card>
    );
  }
  return <View />;
}

class IndividualInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individuals: INDIVIDUALS,
      comments: COMMENTS,
      favorite: false
    };
  }

  static navigationOptions = {
    title: "Individual Information"
  };

  markFavorite() {
    this.setState({ favorite: true });
    console.log("marked as favorite");
  }

  render() {
    const individualId = this.props.navigation.getParam("individualId");

    const individual = this.state.individuals.filter(
      individual => individual.id === individualId
    )[0];

    const comments = this.state.comments.filter(
      comment => comment.individualId === individualId
    );

    return (
      <ScrollView>
        <RenderIndividual
          individual={individual}
          favorite={this.state.favorite}
          markFavorite={() => this.markFavorite()}
        />
        <RenderComments comments={comments} />
      </ScrollView>
    );
  }
}

export default IndividualInfo;
