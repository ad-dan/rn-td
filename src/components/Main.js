import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Text,
  Content,
  Title,
  Body,
  Right,
  Input,
  Item,
  Button
} from 'native-base';
import { ScrollView, Keyboard } from 'react-native';
import ListItem from './ListItem';
import debounce from 'debounce';

class Main extends Component {
  state = {
    loading: true,
    text: '',
    todos: [],
    run: 0
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
    this.setState({
      loading: false
    });
    // this.timer = setInterval(
    //   () =>
    //     this.setState(prevState => {
    //       return {
    //         run: prevState.run + 1
    //       };
    //     }),
    //   1000 * 60
    // );
  }
  componentWillUnmount() {
    // clearInterval(this.timer);
  }
  addTodo = () => {
    Keyboard.dismiss();
    if (this.state.text === '') return;
    const { todos } = this.state;
    const time = Date.now();
    todos.push({
      txt: this.state.text,
      time
    });
    this.setState({
      todos,
      text: ''
    });
  };

  deleteTodo = index => {
    const { todos } = this.state;
    console.log(todos);
    console.log({ index });
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    console.log('New todos');
    console.log(newTodos);
    this.setState({
      todos: newTodos,
      run: Math.floor(Math.random() * 100000)
    });
  };
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header style={{ backgroundColor: 'rgb(33,150,243)' }}>
          <Left style={{ flex: 1 }} />
          <Body>
            <Title
              style={{
                flex: 1,
                lineHeight: 64
              }}>
              ToDo App
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content padded>
          <Item
            rounded
            style={{ width: '80%', alignSelf: 'center', marginTop: 30 }}>
            <ScrollView keyboardShouldPersistTaps="never">
              <Input
                ref="input"
                clearTextOnFocus={true}
                placeholder="Add an item"
                onChangeText={text => this.setState({ text })}
                onFocus={() => this.setState({ text: '' })}
                onSubmitEditing={this.addTodo}
              />
            </ScrollView>
          </Item>
          <Button
            rounded
            style={{
              marginVertical: 16,
              alignSelf: 'center',
              backgroundColor: 'rgb(33,150,243)'
            }}
            onPress={this.addTodo}
            delayLongPress={3800}>
            <Text>Add item</Text>
          </Button>
          <ListItem
            key={this.state.run}
            todos={this.state.todos}
            handleDelete={this.deleteTodo}
          />
        </Content>
      </Container>
    );
  }
}

export default Main;
