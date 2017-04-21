//Imports from React
import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator, AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

//Imports from Local Files
import LogIn  from './login';
import SignUp  from './signup';
import MainView from '../mainView'


/*This class controls the movement from the Login Screen, Signup Page,
and Main Navigation View */
export class Landing extends Component {

  // controls logic directing rendering
  _renderScene(route,navigator){
    if (route.index== 'login'){
      return <LogIn navigator={navigator}/>
    }
    else if (route.index == 'signup'){
      return <SignUp navigator={navigator}/>;
    }
    else if (route.index=='mainView'){
      return <MainView navigator={navigator}/>;
    }
    else{
      console.error("Un Specified Route " + route.index)
    }
  }

  // controls the transition animation
  _configureScene(route,routeStack){
    return Navigator.SceneConfigs.FloatFromBottom
  }

  constructor(){
    super();
  }

  render(){
    return(
      <View style={styles.page}>
        <Navigator
          style={{flex:3}}
          initialRoute={{index: 'login' }}
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

module.exports = Landing;
