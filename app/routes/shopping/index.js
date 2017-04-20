import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import ShoppingPage from './shoppingPage'
import ShoppingLoad from './shoppingLoad'



export class Shopping extends Component {

  _renderScene(route,navigator){
    if(route.index=="shoppingLoad"){
      return <ShoppingLoad navigator={navigator}/>
    }
    else if(route.index=="shoppingPage"){
      console.log("in shopping page");
      return <ShoppingPage navigator={navigator} data={route.data}/>
    }
  }
 
  
  _configureScene(route,routeStack){
    return Navigator.SceneConfigs.FloatFromBottom
  }

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

//BackgroundColor 30415D,015249, 4ABDAC
var styles = StyleSheet.create({
  page:{
    backgroundColor: '#4ABDAC',
    flex: 1,
  }
});
module.exports = Shopping;
