import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import Pantry from './app/routes/pantry';

export default class ReciPrep extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Pantry/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  mainView:{
    flex: 1
  }
});

AppRegistry.registerComponent('ReciPrep', () => ReciPrep);
