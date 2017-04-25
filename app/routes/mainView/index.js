//Imports from React
import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

//Local Imports
import RecipeFeed  from '../recipeFeed';
import Toolbar from '../../components/toolbar';
import Pantry from '../pantry';
import Shopping from '../shopping'

/* Class contians the logic of rendering the main view, handles the routing of
switching between tabs*/
export class MainView extends Component {

  /*establishes how to properly navigate between views after toolbar presses*/
  _renderScene(route,navigator){
    if (route.index=='recipeFeed'){
      return(
         <View style={styles.page}>
           <Toolbar
             navigator={navigator}
             recipeColor='#EC9A29'
             pantryColor='#F1B563'
             shoppingColor='#F1B563'/>
           <RecipeFeed navigator={navigator}/>
         </View>
      );
    }
    else if (route.index =='pantry'){
      return(
         <View style={styles.page}>
           <Toolbar
             navigator={navigator}
             recipeColor='#F1B563'
             pantryColor='#EC9A29'
             shoppingColor='#F1B563'/>
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

  //how to load scene transition
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
