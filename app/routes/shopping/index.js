import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import ShoppingPage from './shoppingPage'
import ShoppingLoad from './shoppingLoad'



export class Shopping extends Component {

  //this is where we render our loading or regular shopping list screen
  _renderScene(route,navigator){
    if(route.index=="shoppingLoad"){
      return <ShoppingLoad navigator={navigator}/>
    }
    else if(route.index=="shoppingPage"){
      console.log("in shopping page");
      return <ShoppingPage navigator={navigator} data={route.data}/>
    }
  }
  //configuring the scene for our shopping list
  _configureScene(route,routeStack){
    return Navigator.SceneConfigs.FloatFromBottom
  }

  //rendering our actual shopping list for the full page
  render(){
    //this.populateData()
    return(
      <View style={styles.page}>
        <Navigator
          style={{flex:3}}
          initialRoute={{index: 'shoppingPage'}}
          renderScene={this._renderScene}
          configureScene={ (route,routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      </View>

    );
  }
}

//temporary style sheet for our pantry page
var styles = StyleSheet.create({
  page:{
    backgroundColor: '#4ABDAC',
    flex: 8,
  }
});
module.exports = Shopping;
