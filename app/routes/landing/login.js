import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';


someFunction = () =>{}

loginFunction = ()=> {
  Alert.alert('Logn Functionality Not Implemented Yet');
};

export class LogIn extends Component {

  _signupFunction = () => {
    this.props.navigator.push({index:1})
  };

  render(){
    return(
      <View style={styles.loginView}>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Username</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={someFunction}/>
        </View>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Password</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={someFunction}/>
        </View>
        <Button
          title='Login'
          buttonStyle={styles.loginButton}
          raised
          underlayColor = 'blue'
          onPress={loginFunction}/>
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
