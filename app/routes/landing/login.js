import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';


export class LogIn extends Component {

  _loginFunction = ()=> {
    fetch('http://localhost:8000/api/auth/login',{
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      })
    })
    .catch( (error) => {
      console.error(error);
    });
  };

  _signupFunction = () => {
    this.props.navigator.push({index: 'signup'})
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
      <View style={styles.loginView}>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Username</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Password</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={(password) => this.setState({password})}/>
        </View>
        <Button
          title='Login'
          buttonStyle={styles.loginButton}
          raised
          underlayColor = 'blue'
          onPress={this._loginFunction}/>
        <Button
          title='Signup'
          buttonStyle={styles.signupButton}
          raised
          onPress={this._signupFunction}/>
      </View>
    );
  }
}

//BackgroundColor 30415D,015249, 4ABDAC
var styles = StyleSheet.create({
  loginView:{
    flex:3,
    // justifyContent: 'center'
  },
  inputGroup:{
    backgroundColor:'#DFDCE3',
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
    alignSelf: 'center'
  },
  signupButton:{
    marginTop: 20,
    width: 300,
    borderRadius: 7,
    alignSelf: 'center'
  }
});

module.exports = LogIn;
