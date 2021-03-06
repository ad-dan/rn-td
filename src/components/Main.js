import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import TodoCard from './TodoCard';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import { Kohana } from 'react-native-textinput-effects';
/* https://uigradients.com/#WitchingHour */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [
        {
          todoTxt: 'This is a sample todo app',
          todoTitle: 'Sample Todo',
          time: Date.now(),
          finished: false
        }
      ],
      runId: 0
    };
  }
  componentDidMount() {
    this._interval = setInterval(() => {
      this.setState(prevState => {
        return {
          runId: prevState.runId + 1
        };
      });
    }, 1000 * 60);
  }
  completeItem = index => {
    const { todoList } = this.state;
    todoList[index].finished = true;
    this.setState({
      todoList
    });
  };
  deleteItem = index => {
    const { todoList } = this.state;
    const newTodos = [
      ...todoList.slice(0, index),
      ...todoList.slice(index + 1)
    ];
    this.setState({
      todoList: newTodos
    });
  };
  componentWillUnmount() {
    clearInterval(this._interval);
  }
  render() {
    return (
      <LinearGradient
        colors={['#bc4e9c', '#f80759']}
        start={[0, 0]}
        end={[1, 1]}
        style={{ flex: 1, paddingTop: 30 }}>
        <NavigationEvents
          onDidFocus={payload => {
            const { todoList } = this.state;

            const todoTxt = this.props.navigation.state.params.text;
            const todoTitle = this.props.navigation.state.params.title;
            const time = this.props.navigation.state.params.time;
            if (
              todoList.length &&
              time === this.state.todoList[todoList.length - 1].time
            )
              return;
            if (!todoTxt.length || !todoTitle.length || todoTxt == ' ') {
              return;
            }
            todoList.push({
              todoTxt,
              todoTitle,
              time,
              finished: false
            });
            this.setState({
              todoList
            });
          }}
        />
        <View>
          <FlatList
            key={this.state.runId}
            data={this.state.todoList
              .filter(todo => !todo.finished)
              .map((todo, i) => ({ ...todo, index: i }))}
            renderItem={todo => (
              <TodoCard
                shouldHaveIcons={true}
                data={todo}
                handleDelete={this.deleteItem}
                key={Math.floor(Math.random() * 10000)}
                handleDone={this.completeItem}
              />
            )}
          />
        </View>
        <View style={styles.test}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#AAF', true)}
            onPress={() =>
              setTimeout(
                () => this.props.navigation.navigate('Add'),
                (1000 / 60) * 2
              )
            }>
            <MaterialCommunityIcons
              name="pencil"
              color="rgb(233,30,99)"
              size={16 * 2}
            />
          </TouchableNativeFeedback>
        </View>
        <View style={styles.test2}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#AAF', true)}
            onPress={() =>
              setTimeout(
                () =>
                  this.props.navigation.navigate('Done', {
                    list: this.state.todoList.filter(item => item.finished)
                  }),
                (1000 / 60) * 2
              )
            }>
            <MaterialCommunityIcons
              name="clipboard-check"
              color="rgb(233,30,99)"
              size={16 * 2}
            />
          </TouchableNativeFeedback>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    height: 80,
    width: 80,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 16
  },
  test2: {
    height: 80,
    width: 80,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 16,
    left: 16,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 16
  }
});

export default Main;
