import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { differenceInMinutes } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default class TodoCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { todoTxt, todoTitle, time, index } = this.props.data.item;
    const { shouldHaveIcons } = this.props;
    const deleteItem = () => this.props.handleDelete(index);
    const doneItem = () => this.props.handleDone(index);
    const diff = differenceInMinutes(Date.now(), time);
    const timeTxt = `${diff} min${diff > 1 ? 's' : ''} ago`;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { fontSize: 18, fontFamily: 'Roboto_medium' },
              { marginBottom: 8 }
            ]}>
            {todoTitle}
          </Text>
          <Text style={styles.title}>{todoTxt}</Text>
        </View>
        <View style={styles.footer}>
          <View style={shouldHaveIcons ? styles.footerItem : { flex: 1 }}>
            <Text style={styles.footerItemText}>{timeTxt}</Text>
          </View>
          {shouldHaveIcons && (
            <View style={styles.btnGrp}>
              <View style={styles.footerItem}>
                <TouchableNativeFeedback
                  onPress={doneItem}
                  background={TouchableNativeFeedback.Ripple('#AAF', true)}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <MaterialCommunityIcons
                      name="check"
                      color="#AC003A"
                      size={16 * 2}
                    />
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={styles.footerItem}>
                <TouchableNativeFeedback
                  onPress={deleteItem}
                  background={TouchableNativeFeedback.Ripple('#AAF', true)}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      color="#AC003A"
                      size={16 * 2}
                    />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    marginVertical: 8,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
    minHeight: 16 * 8,
    marginHorizontal: 16,
    borderRadius: 16
  },
  header: {
    backgroundColor: 'white',
    flex: 2
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnGrp: {
    flexDirection: 'row'
  },
  footerItem: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  footerItemText: {
    lineHeight: 16 * 2,
    color: 'rgba(233,30,99, 0.5)'
  },
  title: {
    fontWeight: '100',
    color: 'rgb(233,30,99)',
    fontSize: 16
  }
});
