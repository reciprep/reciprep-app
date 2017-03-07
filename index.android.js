import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';


import ToolbarMain from './app/components/ToolbarMain';
import LogIn from './app/routes/LogIn';

export default class ReciPrep extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <LogIn/>
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
