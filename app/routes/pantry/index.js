import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import PantryPage from './pantryPage'
import PantryLoad from './pantryLoad'

//static categories for loading in the real data from the database
var categories = [
  {
    title: 'MEATS',
    icon: 'opacity',
    subitems: [],
    value: '0'
  },
  {
    title: 'GRAINS',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'FRUITS',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'VEGETABLES',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'WET',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'DRY',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'DAIRY',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  },
  {
    title: 'MISC',
    icon: 'flight-takeoff',
    subitems: [],
    value: '0'
  }
]

var newCategories=[]
var stupidCount=0

//pantry class
export class Pantry extends Component {

  //function to be used later for formating our database data into useable data on the frontend
  formatData = (data)=>{

  }

  //function to render our pantry view, pass in a route/navigator
  //to decide which page to go to and how to navigate around within
  //our pantry pages
  //this additionally reorganizes our data into a way that is more readable by the UI
  //such that it can populate the categories within the accordion view

  _renderScene(route,navigator){
    if(route.index=='pantryPage'){
      newCategories=JSON.parse(JSON.stringify(categories));
      for(i=0;i<route.data.length;i++){
        subitem={
          'title':route.data[i].name,
          'type':route.data[i].measurement,
          'value':route.data[i].value
        }
        for(j=0;j<categories.length;j++){
          if(categories[j].title==route.data[i].category && route.data[i].value !== 0){
            newCategories[j].subitems.push(subitem)
            newCategories[j].value = newCategories[j].subitems.length
          }
        }
      }
      return <PantryPage navigator={navigator} data={newCategories}/>
      newCategories = []
    }

    if(route.index=='pantryLoad'){
      return <PantryLoad navigator={navigator}/>
    }
  }

  //how we display the scene using rendering and the navigator
  _configureScene(route,routeStack){
    return Navigator.SceneConfigs.FloatFromBottom
  }

  //how we construct the view for our
  constructor(props) {
    super(props);
    this.formatData = this.formatData.bind(this);
    this.state={
      stupidCount: 0
    }
  }

  //render function displays a navigator view which implements the ability to display the
  //pantry loading screen before the pantry screen to allow for loading of database info
  render(){
    return(
      <View style={styles.page}>
        <Navigator
          style={{flex:3}}
          initialRoute={{index: 'pantryLoad' }}
          renderScene={this._renderScene}
          configureScene={ (route,routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      </View>

    );
  }
}

//styling of the background for our pages incase they don't load instantly.
var styles = StyleSheet.create({
  page:{
    backgroundColor: '#F1B563',
    flex: 8,
  }
});
module.exports = Pantry;
