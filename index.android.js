import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';


import ToolbarMain from './app/components/ToolbarMain';
import Landing from './app/routes/landing/index';

export default class ReciPrep extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Landing/>
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
