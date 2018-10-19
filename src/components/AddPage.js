import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Platform,
  TouchableNativeFeedback
} from 'react-native';

import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Kohana } from 'react-native-textinput-effects';
/* https://uigradients.com/#WitchingHour */
class Main extends Component {
  constructor() {
    super();
    this.state = {
      todoTitle: '',
      todoText: ''
    };
  }
  render() {
    const Btn = () =>
      Platform.OS == 'ios' ? (
        <TouchableHighlight />
      ) : (
        <View style={styles.addAnd}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#AAF', true)}
            onPress={() =>
              this.props.navigation.navigate('Home', {
                title: this.state.todoTitle,
                text: this.state.todoText,
                time: Date.now()
              })
            }>
            <MaterialCommunityIcons
              color="rgb(233,30,99)"
              name="check"
              size={32}
            />
          </TouchableNativeFeedback>
        </View>
      );
    return (
      <LinearGradient
        colors={['#bc4e9c', '#f80759']}
        start={[0, 0]}
        end={[1, 1]}
        style={{ flex: 1, paddingTop: 30, justifyContent: 'center' }}>
        <ScrollView style={{ height: 400 }} keyboardShouldPersistTaps="never">
          <View
            style={{
              height: 48,
              marginVertical: 50,
              marginHorizontal: '4%',
              width: '92%',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Kohana
              onChangeText={text =>
                this.setState({
                  todoTitle: text
                })
              }
              iconColor="rgb(240,98,146)"
              style={{ borderRadius: 8 }}
              label={'Title'}
              iconClass={MaterialCommunityIcons}
              iconName={'format-title'}
              useNativeDriver
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                height: 48,
                lineHeight: 18,
                paddingTop: 0
              }}
            />
          </View>
          <View
            style={{
              height: 48,
              marginHorizontal: '4%',
              width: '92%'
            }}>
            <Kohana
              onChangeText={text =>
                this.setState({
                  todoText: text
                })
              }
              iconColor="rgb(240,98,146)"
              style={{ borderRadius: 8 }}
              label={'Text'}
              iconClass={MaterialCommunityIcons}
              iconName={'comment'}
              useNativeDriver
              labelStyle={{
                fontSize: 16,
                textAlign: 'center',
                height: 48,
                lineHeight: 18,
                paddingTop: 0
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.addCtn}>{Btn()}</View>
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
  addCtn: {
    width: '100%',
    position: 'absolute',
    top: 16 * 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addAnd: {
    width: 72,
    height: 72,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 72 / 2,
    elevation: 16
  }
});

export default Main;
