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
import ListItem from './ListItem';

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
    this.timer = setInterval(
      () =>
        this.setState(prevState => {
          return {
            run: prevState.run + 1
          };
        }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  addTodo = () => {
    const { todos } = this.state;
    const time = Date.now();
    todos.push({
      txt: this.state.text,
      time
    });
    console.log(todos);
    this.setState({
      todos
    });
  };
  deleteTodo = index => {
    const { todos } = this.state;
    todos.splice(index, 1);
    this.setState({
      todos
    });
  };
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
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
          <Item rounded style={{ width: '80%', alignSelf: 'center' }}>
            <Input
              placeholder="Add an item"
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </Item>
          <Button
            primary
            rounded
            style={{ marginVertical: 16, alignSelf: 'center' }}
            onPress={this.addTodo}>
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
