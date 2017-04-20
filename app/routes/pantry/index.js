import React, { Component } from 'react';
import { StyleSheet, Alert, Text, View, Navigator } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import PantryPage from './pantryPage'
import PantryLoad from './pantryLoad'

const categories = [
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

 var stupidCount = 0

export class Pantry extends Component {


  formatData = (data)=>{

  }

  _renderScene(route,navigator){
    if(route.index=='pantryPage'){
      if(stupidCount==0){
        console.log("IN INDEX")
        for(i=0;i<route.data.length;i++){
          subitem={
            'title':route.data[i].name,
            'type':route.data[i].measurement,
            'value':route.data[i].value
          }
          for(j=0;j<categories.length;j++){
            if(categories[j].title==route.data[i].category){
              categories[j].subitems.push(subitem)
            }
          }
        }
        console.log(categories)
        stupidCount=1
      }
      return <PantryPage navigator={navigator} data={categories}/>
      stupidCount=0
    }
    if(route.index=='pantryLoad'){
      return <PantryLoad navigator={navigator}/>
    }
  }

  _configureScene(route,routeStack){
    return Navigator.SceneConfigs.FloatFromBottom
  }


  constructor(props) {
    super(props);
    this.formatData = this.formatData.bind(this);
    this.state={
      stupidCount: 0
    }
  }

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

//BackgroundColor 30415D,015249, 4ABDAC
var styles = StyleSheet.create({
  page:{
    backgroundColor: '#4ABDAC',
    flex: 8,
  }
});
module.exports = Pantry;
