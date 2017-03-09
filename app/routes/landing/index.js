import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import LogIn  from './login';
import SignUp  from './signup';

export class Landing extends Component {

  _renderScene(route,navigator){
    if (route.index=='login'){
      return <LogIn navigator={navigator}/>
    }
    else if (route.index =='signup'){
      return <SignUp navigator={navigator}/>;
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
        <View style={styles.loginHeader}>
          <Text style={styles.headerText}>ReciPrep</Text>
        </View>
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
  },
  loginHeader:{
    flex:1,
    justifyContent: 'center'
  },
  headerText:{
    color: '#DFDCE3',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 58
  }
});

module.exports = Landing;