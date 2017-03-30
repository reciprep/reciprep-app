import React, { Component } from 'react';
import { StyleSheet, Alert, Text, ListView, ScrollView, View, Navigator, Modal } from 'react-native';
import { Button, Icon, List, ListItem, FormLabel, FormInput, TouchableHighlight} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import PantrySubItem from './../../components/pantrySubItem';
import PantryHeader from './../../components/pantryHeader';

var ReactNative = require('react-native');

const wet_Ingredients = [


]




const categories = [
  {
    title: 'Meats',
    icon: 'opacity',
    value: '4',
    subitems: [
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
  },
  {
    title: 'Grains',
    icon: 'flight-takeoff',
    value: '7',
    subitems: [
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
  },
  {
    title: 'Fruits',
    icon: 'flight-takeoff',
    value: '2',
    subitems: [
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
  },
  {
    title: 'Vegetables',
    icon: 'flight-takeoff',
    value: '8',
    subitems: [
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
  },
  {
    title: 'Wet Ingredients',
    icon: 'flight-takeoff',
    value: '15',
    subitems: [
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
  },
  {
    title: 'Dry Ingredients',
    icon: 'flight-takeoff',
    value: '12',
    subitems: [
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
  },
]



export class PantryPage extends React.Component {


  _renderHeader = (section) =>{
    return(
      <View>
        <PantryHeader
          title={section.title}
          icon={section.icon}
          value={section.value} />
      </View>
    );
  };

  _setModalVisible = (visible) => {
    // this.setState({modalVisible: visible});
  };

  _renderContent = (section) =>{
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={styles.BufferFlex}></View>
        <View style={{flex:8}}>
          <List containerStyle={{marginTop:-2, elevation:30}}>{
            section.subitems.map((item,i)=>(
              <ListItem
                containerStyle={{backgroundColor:'#66d1c1'}}
                // onPress={() => {this._setModalVisible(true)}}
                key = {i}
                title = {item.title}
                titleStyle =  {styles.titleStyleSubItem}
                badge={{value: item.value}}
              />
            ))
          }
          </List>
        </View>
      </View>
    );
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(categories),
      modalVisible:false,
    };
  };

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
        {/* <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={"fade"}
          onRequestClose={() => this._setModalVisible(false)}
        >{
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Button
                onPress={this._setModalVisible(false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>}
        </Modal> */}
        <Accordion
          sections={categories}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </View>
    );
  }
}



//BackgroundColor 30415D,015249, 4ABDAC
var styles = StyleSheet.create({
  Header:{
    flex:3,
  },

  modalButton: {
    marginTop: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    padding: 20
  },

  PantryView:{
    flex:1,
    // justifyContent: 'center'
  },

  titleStyleSubItem:{
    fontSize: 14
  },

  BufferFlex:{
    flex:1,
    backgroundColor: '#4ABDAC'
  },

  ListViewCustom:{
    flex:8,
    backgroundColor: '#7adbcd'
    // flexDirection:'column'
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
