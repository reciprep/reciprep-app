//React Imports
import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator, AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';


//Class to Represent the Login Page
export class LogIn extends Component {

  /*Login Function, Reaches Data Endpoint with Username and password
  If Successful, returns an auth_token to be stored locally */
  _loginFunction = () => {
    fetch('http://10.0.2.2:8000/api/auth/login',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password
      })
    })
    .then( (response) => response.json())
    .then( async (responseData) => {
      // console.log('request succeeded with response', responseData);
      if(responseData['auth_token']){
        const syncResponse = await AsyncStorage.setItem('auth_token',responseData['auth_token']);
        this.props.navigator.push({index:'mainView'});
      }
      else {
        Alert.alert(responseData["message"]);
      }
    })
    .catch( (error) => {
      console.error(error);
    });
  };

  /*Sends up to Navigator of Parent to view signup page */
  _signupFunction = () => {
    this.props.navigator.push({index: 'signup'});
  };

  state: {
   username: string,
   password: string
 };

 constructor(){
   super();
   this.state = {
     username: "",
     password: ""
   };
 }


  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.loginHeader}>
          <Text style={styles.headerText}>ReciPrep</Text>
        </View>
        <View style={styles.loginView}>
          <View style={styles.inputGroup}>
            <FormLabel labelStyle={styles.inputLabel}>Username</FormLabel>
            <FormInput inputStyle={styles.inputText} onChangeText={(username) => this.setState({username})}/>
          </View>
          <View style={styles.inputGroup}>
            <FormLabel labelStyle={styles.inputLabel}>Password</FormLabel>
            <FormInput inputStyle={styles.inputText} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
          </View>
          <Button
            title='Login'
            buttonStyle={styles.loginButton}
            raised
            textStyle={styles.buttonText}
            onPress={this._loginFunction}/>
          <Button
            title='Signup'
            buttonStyle={styles.signupButton}
            raised
            textStyle={styles.buttonText}
            onPress={this._signupFunction}/>
        </View>
      </View>
    );
  }
}

//BackgroundColor 30415D,015249, 4ABDAC
var styles = StyleSheet.create({
  loginHeader:{
    flex:1,
    justifyContent: 'center'
  },
  headerText:{
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 58
  },
  loginView:{
    flex:3,
    // justifyContent: 'center'
  },
  inputGroup:{
    backgroundColor:'white',
    margin: 20,
    height: 70,
    borderRadius: 7,
    elevation: 2
  },
  inputLabel:{
    color: '#000000',
  },
  inputText:{
    color: '#000000'
  },
  loginButton:{
    marginTop: 30,
    width: 300,
    borderRadius: 7,
    backgroundColor: '#EFE9F4',
    alignSelf: 'center'
  },
  signupButton:{
    marginTop: 20,
    width: 300,
    borderRadius: 7,
    backgroundColor: '#EFE9F4',
    alignSelf: 'center'
  },
  buttonText:{
    color: 'black'
  }
});

module.exports = LogIn;
