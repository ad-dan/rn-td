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

class DonePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      runId: 0
    };
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
            console.log('payload', payload);

            const todoList = this.props.navigation.state.params.list;
            console.log(todoList);
            this.setState({
              todoList
            });
          }}
        />
        <View>
          <FlatList
            key={this.state.runId}
            data={this.state.todoList.map((todo, i) => ({ ...todo, index: i }))}
            renderItem={todo => (
              <TodoCard
                data={todo}
                shouldHaveIcons={false}
                key={Math.floor(Math.random() * 10000)}
              />
            )}
          />
        </View>
        <View style={styles.test}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#AAF', true)}
            onPress={() =>
              setTimeout(
                () =>
                  this.props.navigation.navigate('Home', {
                    title: ' ',
                    text: ' ',
                    time: 0
                  }),
                (1000 / 60) * 2
              )
            }>
            <MaterialCommunityIcons
              name="arrow-right"
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

export default DonePage;
