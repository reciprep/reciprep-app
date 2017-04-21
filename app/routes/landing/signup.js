// Imports from React
import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator, AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

/*Class to represent the view and functionality of the Signup Page  */
export class SignUp extends Component {

  /* Sends HTTP POST request of email,username,password to server
  if valid signup credentials returns a valid auth_token, else returns an error*/
  _signupFunction = () => {
    fetch('http://10.0.2.2:8000/api/auth/register',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then( (response) => response.json())
    .then( async (json) => {
      console.log('request succeeded with response', json);
      if(json['status']=='fail'){
        Alert.alert(json['message']);
      }else{
        const syncResponse = AsyncStorage.setItem('auth_token',json['auth_token']);
        // console.log(json['auth_token']);
        // console.log(syncResponse)
        this.props.navigator.push({index:'mainView'});
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  };

  state: {
   username: string,
   email: string,
   password: string
 };

 constructor(){
   super();
   this.state = {
     username: "",
     email: "",
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
            <FormLabel labelStyle={styles.inputLabel}>Email</FormLabel>
            <FormInput inputStyle={styles.inputText} onChangeText={(email) => this.setState({email})}/>
          </View>
          <View style={styles.inputGroup}>
            <FormLabel labelStyle={styles.inputLabel}>Password</FormLabel>
            <FormInput inputStyle={styles.inputText} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
          </View>
          <View style={styles.inputGroup}>
            <FormLabel labelStyle={styles.inputLabel}>Confirm Password</FormLabel>
            <FormInput inputStyle={styles.inputText} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
          </View>
          <Button
            title='Signup'
            buttonStyle={styles.signupButton}
            raised
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
    color: '#DFDCE3',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 58
  },
  loginView:{
    flex:3,
    // justifyContent: 'center'
  },
  inputGroup:{
    backgroundColor:'#DFDCE3',
    margin: 10,
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
    marginTop: 10,
    width: 300,
    borderRadius: 7,
    alignSelf: 'center'
  }
});

module.exports = SignUp;
