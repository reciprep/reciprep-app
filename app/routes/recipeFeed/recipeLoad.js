import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage} from 'react-native';
import { Button, SearchBar, Icon, Card } from 'react-native-elements';

export class RecipeLoad extends Component{


  _loadRecipes = async (navigator) =>{
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    fetch('http://10.0.2.2:8000/api/recipe/search',{
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
        navigator.push({index:'recipeList',
                        feedData: responseData['results']});
        console.log('request succeeded with responseData');
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
    this._loadRecipes = this._loadRecipes.bind(this)

  }


  render(){
    this._loadRecipes(this.props.navigator)
    return(
      <View style={styles.background}>
        <Text style={styles.text}>Loading Recipes...</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: '#4ABDAC',
    justifyContent: 'center'
  },
  text:{
    color: '#DFDCE3',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 58
  }
}

)

module.exports = RecipeLoad;
