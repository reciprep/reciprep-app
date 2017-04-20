import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import RecipeFeed  from '../recipeFeed';
import Toolbar from '../../components/toolbar';
import Pantry from '../pantry';
import Shopping from '../shopping'

export class MainView extends Component {

  _renderScene(route,navigator){
    if (route.index=='recipeFeed'){
      return(
         <View style={styles.page}>
           <Toolbar
             navigator={navigator}
             recipeColor='#ccff99'
             pantryColor='#009933'
             shoppingColor='#009933'/>
           <RecipeFeed navigator={navigator}/>
         </View>
      );
    }
    else if (route.index =='pantry'){
      return(
         <View style={styles.page}>
           <Toolbar
             navigator={navigator}
             recipeColor='#009933'
             pantryColor='#ccff99'
             shoppingColor='#009933'/>
           <Pantry/>
         </View>
      );
    }
    else if (route.index =='shopping'){
      console.log("IN HERE")
      return(
         <View style={styles.page}>
           <Toolbar
             navigator={navigator}
             recipeColor='#009933'
             pantryColor='#009933'
             shoppingColor='#ccff99'/>
           <Shopping/>
         </View>
      );
    }
    else{
      //how to do error logging
    }
  }

  _configureScene(route,routeStack){
    return Navigator.SceneConfigs.FloatFromBottom
  }

  render(){
    return(
      <View style={styles.page}>
        <Navigator
          // style={{flex:8}}
          initialRoute={{index: 'pantry' }}
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
    flex: 1
  }
});

module.exports = MainView;
