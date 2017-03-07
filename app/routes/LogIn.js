import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';


someFunction = () => {
};

loginFunction = ()=> {
  Alert.alert('Button has been pressed!');
}

export class LogIn extends Component {
  render(){
    return(
      <View style={styles.page}>
        <View style={styles.loginHeader}>
          <Text style={styles.headerText}>ReciPrep</Text>
        </View>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>UserName</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={someFunction}/>
        </View>
        <View style={styles.inputGroup}>
          <FormLabel labelStyle={styles.inputLabel}>Password</FormLabel>
          <FormInput inputStyle={styles.inputText} onChangeText={someFunction}/>
        </View>
        <Button
          title='Login'
          raised
          onPress={loginFunction}/>
      </View>

    );
  }
}

//BackgroundColor 30415D,015249, $ABDAC
var styles = StyleSheet.create({
  page:{
    backgroundColor: '#4ABDAC',
    flex: 1,
    // justifyContent: 'center'
  },
  headerText:{
    color: '#DFDCE3',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 58
  },
  inputGroup:{
    backgroundColor:'#DFDCE3',
    margin: 20,
    height: 70
  },
  inputLabel:{
    color: '#000000',
  },
  inputText:{
    color: '#000000'
  }
});

module.exports = LogIn;
