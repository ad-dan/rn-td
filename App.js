import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';
import { createStackNavigator } from 'react-navigation';
import AddPage from './src/components/AddPage';
import DonePage from './src/components/CompletePage';
class LandingPage extends React.Component {
  static navigationOptions = {
    title: 'Todo',
    headerStyle: {
      height: 0
    }
  };
  state = {
    loading: true,
    lastTime: 0
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
      Arial: require('native-base/Fonts/Roboto.ttf')
    });
    this.setState({
      loading: false
    });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return <Main navigation={this.props.navigation} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const App = createStackNavigator(
  {
    Home: { screen: LandingPage },
    Add: { screen: AddPage },
    Done: { screen: DonePage }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
);
export default App;
