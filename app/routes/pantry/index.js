import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import PantryPage from './pantryPage'
import PantryLoad from './pantryLoad'

export class Pantry extends Component {

  _renderScene(route,navigator){
    if(route.index=='pantryPage'){
      console.log("IN INDEX")
      console.log(route.data)
      return <PantryPage navigator={navigator} data={route.data}/>
    }
    if(route.index=='pantryLoad'){
      return <PantryLoad navigator={navigator}/>
    }
  }

  _configureScene(route,routeStack){
    return Navigator.SceneConfigs.FloatFromBottom
  }

  render(){
    return(
      <View style={styles.page}>
        <Navigator
          style={{flex:3}}
          initialRoute={{index: 'pantryLoad' }}
          renderScene={this._renderScene}
          configureScene={ (route,routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      </View>

    );
  }
}

//BackgroundColor 30415D,015249, 4ABDAC
var styles = StyleSheet.create({
  page:{
    backgroundColor: '#4ABDAC',
    flex: 8,
  }
});
module.exports = Pantry;
