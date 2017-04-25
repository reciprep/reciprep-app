import React, { Component } from 'react';
import { StyleSheet, Alert, Text, ListView, ScrollView, View, Navigator, Modal, TextInput, Picker,AsyncStorage} from 'react-native';
import { Button, Icon, List, ListItem, FormLabel, FormInput, TouchableHighlight} from 'react-native-elements';


//pantry loading class which will house a view for a loading page for the
//pantry page
export class PantryLoad extends Component{

  //this function creates a pantry loading page and begins to pull in data from the
  //backend through http requests.
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
        console.log('Pantry GET request succeed with response', responseData)
      }
      else{
        console.log('request failed with response', responseData)
      }
    })
    .catch( (error) => {
        console.error(error);
      });
  }

  //this is our pantry load screen constructor and is used to bind our functions
  constructor(props) {
    super(props);
    this.loadPantry = this.loadPantry.bind(this);
  }

  //this renders our pantry loading screen for when we are loding in pantry ingredients
  render(){
    this.loadPantry(this.props.navigator)
    return(
      <View style={{backgroundColor: '#F1B563',flex: 1}}>
        <Text>Loading Pantry...</Text>
      </View>
    );
  }
}


module.exports = PantryLoad;
