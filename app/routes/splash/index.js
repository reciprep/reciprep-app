import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator,Image, AsyncStorage} from 'react-native';

import Landing from '../landing';
import MainView from '../mainView';

export default class Splash extends Component {



  autoLogin = async (navigator) =>{
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    fetch('http://10.0.2.2:8000/api/auth/status',{
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': auth_token
      }
    })
    .then( (response) => response.json())
    .then( (responseData) => {
      if(responseData['status'] == 'success'){
        navigator.push({index:'mainView'})
      }
      else{
        navigator.push({index:'landing'})
      }
    })
  }


 constructor(){
   super();
   this.autoLogin = this.autoLogin.bind(this);

 }

  render() {
    this.autoLogin(this.props.navigator)
    return(
      <View style={styles.mainView}>
        <Text style={styles.headerText}>ReciPrep</Text>
      </View>
    );}
}

var styles = StyleSheet.create({
  mainView:{
    flex: 1,
    backgroundColor: '#4ABDAC',
    justifyContent: 'center'

  },
  headerText:{
    color: '#DFDCE3',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 58
  }
});

module.exports = Splash;
