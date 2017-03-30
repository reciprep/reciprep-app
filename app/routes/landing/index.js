import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator, AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import LogIn  from './login';
import SignUp  from './signup';
import MainView from '../mainView'

export class Landing extends Component {

  _renderScene(route,navigator){
    if (route.index== 'login'){
      return <LogIn navigator={navigator}/>
    }
    else if (route.index == 'signup'){
      return <SignUp navigator={navigator}/>;
    }
    else if (route.index == 'mainView'){
      return <MainView/>
    }
    else{
      //how to do error logging
    }
  }

  _configureScene(route,routeStack){
    return Navigator.SceneConfigs.FloatFromBottom
  }

  autoLogin(navigator){
    AsyncStorage.getItem('auth_token').then( (token) =>{
      console.log("token")
      console.log(token)
      if(token !== null){
        console.log("MAIN VIEW")
        navigator.push({index:'mainView'})
      }
      else{
        console.log("LANDING")
      }
    })
  }

  constructor(){
    super();
    this.autoLogin = this.autoLogin.bind(this);
  }

  render(){
    this.autoLogin(this.props.navigator)
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
