import React, { Component } from 'react';
import { Card, Text, CardItem } from 'native-base';

export default class ListItem extends Component {
  render() {
    return (
      <Card dataArray={this.props.todos}>
        <CardItem header>
          <Text>6 mins ago</Text>
        </CardItem>
        <CardItem cardBody>
          <Text>Design a todo app in React Native</Text>
        </CardItem>
        <CardItem footer />
      </Card>
    );
  }
}
