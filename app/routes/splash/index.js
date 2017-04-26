// Imports from React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator,Image, AsyncStorage} from 'react-native';

//Imports from Local Files
import Landing from '../landing';
import MainView from '../mainView';

//Splash page that runs while loading occurs
export default class Splash extends Component {

  componentDidMount(){
    this.autoLogin(this.props.navigator)
  }

  //GET call, checks if valid Auth Token, if so moves to Main View if not
  // move to login page
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
    return(
      <View style={styles.mainView}>
        <Text style={styles.headerText}>ReciPrep</Text>
      </View>
    );}
}

//stylesheet
var styles = StyleSheet.create({
  mainView:{
    flex: 1,
    backgroundColor: '#F1B563',
    justifyContent: 'center'

  },
  headerText:{
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 58
  }
});

module.exports = Splash;
