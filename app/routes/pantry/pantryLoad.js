import React, { Component } from 'react';
import { StyleSheet, Alert, Text, ListView, ScrollView, View, Navigator, Modal, TextInput, Picker,AsyncStorage} from 'react-native';
import { Button, Icon, List, ListItem, FormLabel, FormInput, TouchableHighlight} from 'react-native-elements';



export class PantryLoad extends Component{


  loadPantry = async (navigator) =>{
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    fetch('http://10.0.2.2:8000/api/user/pantry',{
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
        navigator.push({index:'pantryPage',
                        data: responseData['data']['ingredients']})
        console.log('request succeed with response', responseData)
      }
      else{
        console.log('request failed with response', responseData)
      }
    })
    .catch( (error) => {
        console.error(error);
      });
  }

  constructor(props) {
    super(props);
    this.loadPantry = this.loadPantry.bind(this);
  }


  render(){
    this.loadPantry(this.props.navigator)
    return(
      <View>
        <Text>Loading Pantry...</Text>
      </View>
    );
  }
}


module.exports = PantryLoad;
