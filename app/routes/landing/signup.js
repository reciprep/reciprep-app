import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

someFunction = () =>{}

export class SignUp extends Component {

  _signupFunction = () => {
    this.props.navigator.pop();
  };

  render(){
    return(
      <View style={styles.loginView}>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Username</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={someFunction}/>
        </View>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Email</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={someFunction}/>
        </View>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Password</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={someFunction}/>
        </View>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Confirm Password</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={someFunction}/>
        </View>

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
