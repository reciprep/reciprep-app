import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import Toolbar from './app/components/toolbar';

export default class ReciPrep extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Toolbar/>
        <View style={{flex:8}}/>
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
