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
    todos: []
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
  }
  addTodo = () => {
    const { todos } = this.state;
    const time = new Date();
    const dateString = time.toLocaleFormat('%H : %M');
    todos.push({
      txt: this.state.text,
      dateString
    });
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
            style={{ marginVertical: 16, alignSelf: 'center' }}>
            <Text>Add item</Text>
          </Button>
          <ListItem todos={this.state.todos} />
        </Content>
      </Container>
    );
  }
}

export default Main;
