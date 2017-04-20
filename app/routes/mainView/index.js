import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import RecipeFeed  from '../recipeFeed';
import Toolbar from '../../components/toolbar';
import Pantry from '../pantry';

export class MainView extends Component {

  _renderScene(route,navigator){
    if (route.index=='recipeFeed'){
      return(
         <View style={styles.page}>
           <Toolbar
             navigator={navigator}
             recipeColor='#ccff99'
             pantryColor='#009933'/>
           <RecipeFeed/>
         </View>
      );
    }
    else if (route.index =='pantry'){
      return(
         <View style={styles.page}>
           <Toolbar
             navigator={navigator}
             recipeColor='#009933'
             pantryColor='#ccff99'/>
           <Pantry/>
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
