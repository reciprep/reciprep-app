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
import Shopping from './app/routes/shopping';
import Pantry from './app/routes/pantry';
import Toolbar from './app/components/toolbar';
import Pantry from './app/routes/pantry';

export default class ReciPrep extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Toolbar/>
        <View style={styles.mainView}>
          <Pantry/>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  mainView:{
    flex: 8
  },
  placeholder:{
    height:75,
    backgroundColor: '#4ABDAC'
  }
});

AppRegistry.registerComponent('ReciPrep', () => ReciPrep);
