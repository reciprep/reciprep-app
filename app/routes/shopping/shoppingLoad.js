import React, { Component } from 'react';
import { StyleSheet, Alert, ListView, ScrollView, View, Navigator, Modal, TextInput, Picker, Text, AsyncStorage} from 'react-native';
import { Button, Icon, List, Card, SearchBar, ListItem, FormLabel, FormInput, TouchableHighlight} from 'react-native-elements';

import Accordion from 'react-native-collapsible/Accordion';
import PantrySubItem from './../../components/pantrySubItem';
import PantryHeader from './../../components/pantryHeader';
import RecipeCard from '../../components/recipeCard';

var ReactNative = require('react-native');

//test data for our recipe shopping list page
const dataFinal = {
  recipies: [
    {
      title: 'Chicken Parmigana',
      imageSource: require('../../images/chicken-parmigiani.jpg'),
      description: 'This is a Description of Food at the moment i have it as a max of 3 lines not sure what we should put though it will truncate if we go over'
    },
    {
      title: 'Chicken Parmigana',
      imageSource: require('../../images/chicken-parmigiani.jpg'),
      description: 'This is a Description of Food at the moment i have it as a max of 3 lines not sure what we should put though it will truncate if we go over'
    },
  ],

  //place holder data for the recipe shopping list page
  categories: [
    {
    title: 'Meats',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'Grains',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'Fruits',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'Vegetables',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'Wet',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'Dry',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'Dairy',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'Misc',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  ]
}


//this is the shopping loading page class
export class ShoppingLoad extends React.Component {

  //this is where we load in any async data for the shopping list
  _loadDetails = async (navigator) =>{
    //var count;
    //var count2;
    var temp = await AsyncStorag.egetItem('rec');
    var temp2 = await AsyncStorage.getItem('cat');
    dataFinal.recipes = temp;
    dataFinal.categories = temp2;
    navigator.push({index:'shoppingPage',
                    data: dataFinal});
  }

  //binding constructor for our load details function
  constructor(props) {
    super(props);
    this._loadDetails = this._loadDetails.bind(this);
  }

  //where we render the loading screen
  render(){
    this._loadDetails(this.props.navigator)
    return(
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Text>Loading Details LOADING...</Text>
        </View>
      </View>
    );
  }
}



//style sheets necessary for the loading screen
var styles = StyleSheet.create({
  Header:{
    flex:3,
  },
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
  
});

module.exports = ShoppingLoad;
