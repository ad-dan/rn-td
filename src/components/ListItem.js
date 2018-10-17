import React, { Component } from 'react';
import {
  Card,
  Text,
  CardItem,
  List,
  Left,
  Right,
  Icon,
  Button
} from 'native-base';
import { StyleSheet, Keyboard } from 'react-native';
import { differenceInMinutes } from 'date-fns';
import * as Animatable from 'react-native-animatable';
import TodoItem from './Card';

const styles = StyleSheet.create({
  todoText: {
    paddingHorizontal: 30,
    fontWeight: '100'
  },
  centered: {
    alignSelf: 'center'
  },
  num: {
    fontWeight: '100',
    fontSize: 24,
    color: 'rgba(127,127,127,0.4)'
  },
  button: {
    height: 40
  },
  card: {
    marginHorizontal: 16
  }
});

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log({ rend: this.props.todos });
    return (
      <List
        dataArray={this.props.todos.map((todo, index) => ({ ...todo, index }))}
        renderRow={todo => (
          <TodoItem todo={todo} handleDelete={this.props.handleDelete} />
        )}
      />
    );
  }
}
