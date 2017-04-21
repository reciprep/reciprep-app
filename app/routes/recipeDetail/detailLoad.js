//Imports from React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage} from 'react-native';
import { Button, SearchBar, Icon, Card } from 'react-native-elements';

/*Class to load the recipe detail information from the server and send to the
detailInfo component */
export class DetailLoad extends Component{

  /* HTTP Get request, given a recipie_id and auth_token returns the Details
    of the recipe  */
  _loadDetails = async (navigator,recipeID) =>{
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    console.log(recipeID)
    console.log('http://10.0.2.2:8000/api/recipe/'+recipeID)
    fetch('http://10.0.2.2:8000/api/recipe/'+recipeID,{
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
        navigator.push({index:'recipeDetail',
                        data: responseData['data']});
        console.log('request succeeded with response',responseData);
      }
      else{
        console.log('request failed with response', responseData);
      }

    })
    .catch( (error) => {
      console.error(error);
    });
  }

  constructor(props){
    super(props);
    this._loadDetails = this._loadDetails.bind(this)

  }


  render(){
    this._loadDetails(this.props.navigator,this.props.recipeID)
    return(
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Text>Loading Details...</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    backgroundColor: 'rgba( 0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: "center"
  },
  modalInnerContainer:{
    backgroundColor: 'white',
    flex:1
  }
})

module.exports = DetailLoad;
