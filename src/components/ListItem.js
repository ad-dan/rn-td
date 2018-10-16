import React, { Component } from 'react';
import { Card, Text, CardItem, List } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { differenceInMinutes } from 'date-fns';

export default class ListItem extends Component {
  render() {
    return (
      <List
        dataArray={this.props.todos.map((todo, index) => ({ ...todo, index }))}
        renderRow={todo => {
          const diff = differenceInMinutes(Date.now(), todo.time);
          const timeTxt = `${diff} min${diff > 1 ? 's' : ''} ago`;

          return (
            <TouchableOpacity
              onPress={() => this.props.handleDelete(todo.index)}>
              <Card>
                <CardItem header>
                  <Text>{timeTxt}</Text>
                </CardItem>
                <CardItem cardBody>
                  <Text>{todo.txt}</Text>
                </CardItem>
                <CardItem footer />
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}
