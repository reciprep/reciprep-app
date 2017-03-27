import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import Landing from './app/routes/landing';
import RecipeFeed from './app/routes/recipe_feed';
import Toolbar from './app/components/toolbar';


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
  },
  placeholder:{
    height:75,
    backgroundColor: '#4ABDAC'
  }
});

AppRegistry.registerComponent('ReciPrep', () => ReciPrep);
