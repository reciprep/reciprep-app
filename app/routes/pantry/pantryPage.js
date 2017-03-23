import React, { Component } from 'react';
import { StyleSheet, Alert, Text, ListView, ScrollView, View, Navigator } from 'react-native';
import { Button, Icon, List, ListItem, FormLabel, FormInput, TouchableHighlight} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import Row from './Row';

var ReactNative = require('react-native');

const wet_Ingredients = [
  {
    title: 'Chicken Stock',
    icon: 'opacity',
    value: '6 gal'
  },
  {
    title: 'Milk',
    icon: 'opacity',
    value: '2 gal'
  },
  {
    title: 'Oil',
    icon: 'opacity',
    value: '64 oz'
  }

]


const categories = [
  {
    title: 'Meats',
    icon: 'opacity',
    value: '4'
  },
  {
    title: 'Grains',
    icon: 'flight-takeoff',
    value: '7'
  },
  {
    title: 'Fruits',
    icon: 'flight-takeoff',
    value: '2'
  },
  {
    title: 'Vegetables',
    icon: 'flight-takeoff',
    value: '8'
  },
  {
    title: 'Wet Ingredients',
    icon: 'flight-takeoff',
    value: '15'
  },
  {
    title: 'Dry Ingredients',
    icon: 'flight-takeoff',
    value: '12'
  },
]



export class PantryPage extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      categoryStates: [false,false,false,false,false,false],
      dataSource: ds.cloneWithRows(categories),
    };
  }

  render(){

    return(
      <View style={styles.PantryView}>
        <Icon
          containerStyle={styles.newItem}
          reverse
          size = {30}
          title='newItem'
          name='add'
          raised = {true}
          color='#517fa4'/>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Row{...rowData}/> } /> 
      </View>
    );
  }
}



//BackgroundColor 30415D,015249, 4ABDAC
var styles = StyleSheet.create({
  Header:{
    flex:3,
  },

  PantryView:{
    flex:1,
    // justifyContent: 'center'
  },

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },

  newItem:{
    position: 'absolute',
    bottom:15,
    right:15
  }

});

module.exports = PantryPage;
