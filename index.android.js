import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import Shopping from './app/routes/shopping';
import Pantry from './app/routes/pantry';
import Toolbar from './app/components/toolbar';

export default class ReciPrep extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Toolbar/>
        <View style={styles.mainView}>
          <Shopping/>
        </View>
      </View> 
    );
  }
}

var styles = StyleSheet.create({
  mainView:{
    flex: 8
  }
});

AppRegistry.registerComponent('ReciPrep', () => ReciPrep);
