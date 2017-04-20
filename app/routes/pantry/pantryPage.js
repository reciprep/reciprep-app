import React, { Component } from 'react';
import { StyleSheet, Alert, Text, ListView, ScrollView, View, Navigator, Modal, TextInput, Picker} from 'react-native';
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
    subitems: [
      {
        title: 'Chicken Stock',
        icon: 'opacity',
        value: '6'
      },
      {
        title: 'Milk',
        icon: 'opacity',
        value: '2'
      },
      {
        title: 'Oil',
        icon: 'opacity',
        value: '64'
      }
    ],
    value: '3'
  },
  {
    title: 'Grains',
    icon: 'flight-takeoff',
    subitems: [
      {
        title: 'Chicken Stock',
        icon: 'opacity',
        value: '6'
      },
      {
        title: 'Milk',
        icon: 'opacity',
        value: '2'
      },
      {
        title: 'Oil',
        icon: 'opacity',
        value: '64'
      }
    ],
    value: '3'
  },
  {
    title: 'Fruits',
    icon: 'flight-takeoff',
    subitems: [
      {
        title: 'Chicken Stock',
        icon: 'opacity',
        value: '6'
      },
      {
        title: 'Milk',
        icon: 'opacity',
        value: '2'
      },
      {
        title: 'Oil',
        icon: 'opacity',
        value: '64'
      }
    ],
    value: '3'
  },
  {
    title: 'Vegetables',
    icon: 'flight-takeoff',
    subitems: [
      {
        title: 'Chicken Stock',
        icon: 'opacity',
        value: '6'
      },
      {
        title: 'Milk',
        icon: 'opacity',
        value: '2'
      },
      {
        title: 'Oil',
        icon: 'opacity',
        value: '64'
      }
    ],
    value: '3'
  },
  {
    title: 'Wet Ingredients',
    icon: 'flight-takeoff',

    subitems: [
      {
        title: 'Chicken Stock',
        icon: 'opacity',
        value: '6'
      },
      {
        title: 'Milk',
        icon: 'opacity',
        value: '2'
      },
      {
        title: 'Oil',
        icon: 'opacity',
        value: '64'
      }
    ],
    value: '3'
  },
  {
    title: 'Dry Ingredients',
    icon: 'flight-takeoff',

    subitems: [
      {
        title: 'Chicken Stock',
        icon: 'opacity',
        value: '6'
      },
      {
        title: 'Milk',
        icon: 'opacity',
        value: '2'
      },
      {
        title: 'Oil',
        icon: 'opacity',
        value: '64'
      }
    ],
    value: '3'
  },
]

const Item = Picker.Item;

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

  _setModalVisible = (visible,name, quantity, i, sectionID) => {
    this.setState({ingredient: name});
    this.setState({modalVisible: visible});
    this.setState({text: quantity});
    this.setState({index: i});
    this.setState({category: sectionID});
  };

  _setModalVisible2 = (visible) =>{
    this.setState({modalVisible2: visible});
  };

  _closeModal = () =>{
      this.setState({modalVisible: false});
      var count;
      for(count=0;count<6; count++){
        if(this.state.category == categories[count].title){
          categories[count].subitems[this.state.index].value=this.state.text;
        }
      }
  };

  _closeModal2 = () =>{
    this.setState({modalVisible2: false});
  }


  //the below modal will save the data
  _closeModal3 = () =>{
    this.setState({modalVisible2: false});
    var count;
    var count2;
    for(count=0;count<6; count++){
      //below means we matched our category to an ingredient
      if(this.state.category2 == categories[count].title){
        categories[count].subitems.push({title:this.state.ingredientType ,icon:'Oil',value:this.state.quantity});
        this.setState({dataSource: this.state.dataSource.cloneWithRows(categories)});
      }
    }
  };

  _Remove =() => {
    {/*var count;
    var count2;
    for(count=0; count<6; count++){
      if(this.state.category == categories[count].title){
        for(count2=0; count < categories[count].subitems.length; count2++){
          if(categories[count].subitems[count2].title == this.state.ingredient){
            categories[count].subitems[count2].value = '0';
            categories[count].subitems.splice(count2,1);
          }
        }
      }
    }*/}
    this._closeModal();
  }

  _Increment = () => {
    this.setState({text: (parseInt(this.state.text, 10) + 1).toString()})

  };
  _Decrement = () => {
    this.setState({text: (parseInt(this.state.text, 10) - 1).toString()})
  };

  _Increment2 = () => {
    this.setState({quantity: (parseInt(this.state.quantity, 10) + 1).toString()})
  };
  _Decrement2 = () => {
    this.setState({quantity: (parseInt(this.state.quantity, 10) - 1).toString()})
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
                onPress={() => {this._setModalVisible(true,item.title,item.value,i, section.title)}}
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
      modalVisible2:false,
      value: '0',
      measurement: 'oz.',
      ingredient: 'N/A',
      text: '',
      index: '',
      category: '',
      ingredientType: 'Apples',
      quantity: '1',
      measurement2: 'oz.',
      category2: 'Meats',
    };
  };

  render(){
    return(

      <View style={styles.PantryView}>
        <Icon
          containerStyle={styles.newItem}
          onPress={() => this._setModalVisible2(true)}
          reverse
          size = {30}
          title='newItem'
          name='add'
          raised = {true}
          color='#517fa4'/>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={"fade"}
          onRequestClose={() => this._closeModal()}
        >
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold',}}>{this.state.ingredient}</Text>
              <View style={{flex: 1, flexDirection: 'row', marginBottom:35}}>
                <Icon
                  onPress={() => this._Decrement()}
                  reverse
                  size = {15}
                  name='remove'
                  raised = {true}
                  color='#f44b42'/>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                  onChangeText={(text1) => this.setState({text: text1})}
                  value={this.state.text}/>
                <Icon
                  onPress={() => this._Increment()}
                  reverse
                  size = {15}
                  name='add'
                  raised = {true}
                  color='#64fc7e'/>
                <Picker
                  style={styles.pickerMes}
                  selectedValue={this.state.measurement}
                  mode="dropdown"
                  onValueChange={(text2) => this.setState({measurement: text2})}>
                  <Item label="oz." value="oz."/>
                  <Item label="cups" value="cups"/>
                  <Item label="qt." value="qt."/>
                  <Item label="gal." value="gal."/>
                </Picker>
                {/*<Icon
                  onPress={() => this._Remove()}
                  reverse
                  size = {15}
                  name='done'
                  raised = {true}
                  color='#517fa4'/>*/}
                <Icon
                  onPress={() => this._Remove()}
                  reverse
                  size = {15}
                  name='delete'
                  raised = {true}
                  color='#517fa4'/>
              </View>
              <View style = {{marginTop:20}}>
                <Button
                   title="Save Quantity"
                   color='#00ff7f'
                   onPress= {() => this._closeModal()}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.modalVisible2}
          transparent={true}
          animationType={"fade"}
          onRequestClose={() => this._closeModal2()}
        >
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold',}}>Add Ingredient to Pantry</Text>
              <View style={{flex: 1, flexDirection: 'row', marginBottom:35}}>
                <Text style={{fontSize: 14, fontWeight: 'bold',}}>Category:</Text>
                <Picker
                  style={styles.pickerText}
                  selectedValue={this.state.category2}
                  mode="dropdown"
                  onValueChange={(text3) => this.setState({category2: text3})}>
                  <Item label="Meats" value="Meats"/>
                  <Item label="Grains" value="Grains"/>
                  <Item label="Fruits" value="Fruits"/>
                  <Item label="Vegetables" value="Vegetables"/>
                  <Item label="Wet Ingredients" value="Wet Ingredients"/>
                  <Item label="Dry Ingredients" value="Dry Ingredients"/>
                </Picker>
              </View>
              <View style={{flex: 1, flexDirection: 'row', marginBottom:35}}>
                <Text style={{fontSize: 14, fontWeight: 'bold',}}>Ingredient:</Text>
                <Picker
                  style={styles.pickerText}
                  selectedValue={this.state.ingredientType}
                  mode="dropdown"
                  onValueChange={(text2) => this.setState({ingredientType: text2})}>
                  <Item label="Apples" value="Apples"/>
                  <Item label="Bannanas" value="Bannanas"/>
                  <Item label="Oranges" value="Oranges"/>
                  <Item label="Grapes" value="Grapes"/>
                </Picker>
              </View>
              <View style={{flex: 1, flexDirection: 'row', marginBottom:35}}>
                <Icon
                  onPress={() => this._Decrement2()}
                  reverse
                  size = {15}
                  name='remove'
                  raised = {true}
                  color='#f44b42'/>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 0}}
                  onChangeText={(text1) => this.setState({quantity: text1})}
                  value={this.state.quantity}/>
                <Icon
                  onPress={() => this._Increment2()}
                  reverse
                  size = {15}
                  name='add'
                  raised = {true}
                  color='#64fc7e'/>
                <Picker
                  style={styles.pickerMes}
                  selectedValue={this.state.measurement2}
                  mode="dropdown"
                  onValueChange={(text2) => this.setState({measurement2: text2})}>
                  <Item label="oz." value="oz."/>
                  <Item label="cups" value="cups"/>
                  <Item label="qt." value="qt."/>
                  <Item label="gal." value="gal."/>
                </Picker>
              </View>
              <View style = {{marginTop:20}}>
                <Button
                   title="Save Quantity"
                   color='#00ff7f'
                   onPress= {() => this._closeModal2()}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Accordion
          sections={categories}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </View>
    );
  }

  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },

  innerContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    // flexDirection:lumn'
  },

  picker: {
    width: 100,
    //flex:1
    //flexDirection:'column'
  },

  pickerMes:{
    width:100,
  },

  pickerText:{
    width:200,
    marginLeft:25,
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
