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
  spentTime: {
    fontWeight: '900'
  },
  card: {
    width: '90%',
    alignSelf: 'center'
  }
});

export default class TodoItem extends Component {
  constructor() {
    super();
  }
  state = {
    anim: ''
  };
  remove = () => {
    this.setState(
      {
        anim: 'flipOutX'
      }
      /*() => {
        setTimeout(this.handleRem, 0);
      }*/
    );
  };
  handleRem = endState => {
    console.log('finished handleRem');
    this.props.handleDelete(this.props.todo.index);
  };
  render() {
    const { todo } = this.props;
    const diff = differenceInMinutes(Date.now(), todo.time);
    const timeTxt = `${diff} min${diff > 1 ? 's' : ''} ago`;
    console.log('rendering');
    return (
      <Animatable.View
        animation={this.state.anim}
        easing="ease-out"
        onAnimationEnd={() => this.state.anim == 'flipOutX' && this.handleRem()}
        useNativeDriver={true}>
        <Card style={styles.card}>
          <CardItem header>
            <Left>
              <Text style={styles.spentTime}>{timeTxt}</Text>
            </Left>
            <Right>
              <Text style={styles.num}>{`#${todo.index + 1}`}</Text>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Text style={styles.todoText}>{todo.txt}</Text>
          </CardItem>
          <CardItem footer>
            <Left>
              <Button
                disabled={true}
                small
                full
                success
                style={{ width: '80%', height: 40 }}
                onPress={() => {
                  console.log('cl');
                }}>
                <Icon
                  type="Ionicons"
                  ios="ios-checkmark"
                  android="md-checkmark"
                />
              </Button>
            </Left>
            <Right>
              <Button
                small
                full
                danger
                style={styles.button}
                onPress={() => {
                  this.remove();
                  //this.props.handleDelete(todo.index)
                }}>
                <Icon type="Ionicons" ios="ios-trash" android="md-trash" />
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Animatable.View>
    );
  }
}
