import React, { Component } from 'react';
import { StyleSheet, Alert, Text, ListView, ScrollView, View, Navigator, Modal, TextInput, Picker, AsyncStorage} from 'react-native';
import { Button, Icon, List, ListItem, FormLabel, FormInput, TouchableHighlight} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import PantrySubItem from './../../components/pantrySubItem';
import PantryHeader from './../../components/pantryHeader';

var ReactNative = require('react-native');

const wet_Ingredients = [


]

const categories =  [
    {
    title: 'MEATS',
    icon: 'flight-takeoff',
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

  _closeModal = async () =>{
      this.setState({modalVisible: false});
      var count;
      var jsonObject = {ingredient_name: this.state.ingredient, 'value': parseFloat(this.state.text)}
      var jsonObjectArr = [];
      jsonObjectArr.push(jsonObject);
      for(count=0;count<6; count++){
        if(this.state.category == this.props.data[count].title){
          this.props.data[count].subitems[this.state.index].value=this.state.text;
          let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
          fetch('http://10.0.2.2:8000/api/user/pantry',{
            method: 'PATCH',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization': auth_token
            },
            body: JSON.stringify({
              'ingredients': jsonObjectArr
            })
          })
          .then( (response) => response.json())
          .then( (responseData) => {
            if(responseData['status'] == 'success'){
              Alert.alert("Ingredient Quantity Changed")
              console.log('Create request succeeded', responseData);
            }
            else{
              Alert.alert("Ingredient change failed")
              console.log('Request failed', responseData);
            }
          }).catch( (error) =>{
            console.error(error);
          });
        }
      }
  };

  transferData = ()=>{
    var count;
    var count2;
    //transfers ingredients from props
    for(count = 0; count < 8; count ++){
      for(count2 = 0; count2 < this.props.data[count].subitems.length; count2++){
        categories[count].subitems.push({title:this.props.data[count].subitems[count2].title,type:this.props.data[count].subitems[count2].type,value:this.props.data[count].subitems[count2].type});
      }
    }
  }

  _closeModal2 = () =>{
    this.setState({modalVisible: false});
  }

  _closeModal4 = () =>{
    this.setState({modalVisible2: false});
  }


  //the below modal will save the data
  _closeModal3 = async (navigator) =>{
    this.setState({modalVisible2: false});
    var count;
    var count2;
    var jsonObject = {ingredient_name: this.state.ingredientType, 'value': parseFloat(this.state.quantity)}
    var jsonObjectArr = [];
    jsonObjectArr.push(jsonObject)

    for(count=0;count<8; count++){
      //below means we matched our category to an ingredient
      if(this.state.category2 == this.props.data[count].title){
        this.props.data[count].subitems.push({title:this.state.ingredientType ,icon:'Oil',value:this.state.quantity});
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.data)});
        let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
        fetch('http://10.0.2.2:8000/api/user/pantry',{
          method: 'PATCH',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': auth_token
          },
          body: JSON.stringify({
            'ingredients': jsonObjectArr
          })
        })
        .then( (response) => response.json())
        .then( (responseData) => {
          if(responseData['status'] == 'success'){
            navigator.push({index: "pantryLoad"})
            Alert.alert("Ingredient Quantity Changed")

            console.log('Create request succeeded', responseData);
          }
          else{
            Alert.alert("Ingredient change failed")
            console.log('Request failed', responseData);
          }
        }).catch( (error) =>{
          console.error(error);
        });
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
                onPress={() => {this._setModalVisible(true,item.title,item.value.toString(),i, section.title)}}
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
      category2: 'MEATS',
    };
  };

  render(){
    this.transferData();
    return(

      <View style={styles.PantryView}>

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={"fade"}
          onRequestClose={() => this._closeModal2()}
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
          onRequestClose={() => this._closeModal4()}
        >
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold',}}>Add Ingredient to Pantry</Text>
              <View style={{flex: 1, flexDirection: 'row', marginBottom:35}}>
                <Text style={{fontSize: 14, fontWeight: 'bold',}}>Ingredient:</Text>
                <Picker
                  style={styles.pickerText}
                  selectedValue={this.state.ingredientType}
                  mode="dropdown"
                  onValueChange={(text2) => this.setState({ingredientType: text2})}>
                  <Item label = "garbanzo beans" value="garbanzo beans"/>
                  <Item label = "artichoke hearts" value="artichoke hearts"/>
                  <Item label = "garlic" value="garlic"/>
                  <Item label = "tahini" value="tahini"/>
                  <Item label = "extra virgin olive oil" value="extra virgin olive oil"/>
                  <Item label = "water" value="water"/>
                  <Item label = "kosher salt" value="kosher salt"/>
                  <Item label = "eggs" value="eggs"/>
                  <Item label = "mayonnaise" value="mayonnaise"/>
                  <Item label = "Dijon mustard" value="Dijon mustard"/>
                  <Item label = "white wine vinegar" value="white wine vinegar"/>
                  <Item label = "chipotle chile powder" value="chipotle chile powder"/>
                  <Item label = "garlic powder" value="garlic powder"/>
                  <Item label = "thick-cut bacon" value="thick-cut bacon"/>
                  <Item label = "crean cheese" value="crean cheese"/>
                  <Item label = "brown suger" value="brown suger"/>
                  <Item label = "pure maple syrup" value="pure maple syrup"/>
                  <Item label = "canned pumkin" value="canned pumkin"/>
                  <Item label = "pumkin pie spice" value="pumkin pie spice"/>
                  <Item label = "cinnamon" value="cinnamon"/>
                  <Item label = "vanilla extract" value="vanilla extract"/>
                  <Item label = "whole wheat flour" value="whole wheat flour"/>
                  <Item label = "oat bran" value="oat bran"/>
                  <Item label = "pecan meal" value="pecan meal"/>
                  <Item label = "baking powder" value="baking powder"/>
                  <Item label = "baking soda" value="baking soda"/>
                  <Item label = "salt" value="salt"/>
                  <Item label = "butter" value="butter"/>
                  <Item label = "honey" value="honey"/>
                  <Item label = "egg whites" value="egg whites"/>
                  <Item label = "banana" value="banana"/>
                  <Item label = "buttermilk" value="buttermilk"/>
                  <Item label = "pomegranate juice" value="pomegranate juice"/>
                  <Item label = "balsamic vinegar" value="balsamic vinegar"/>
                  <Item label = "vegetable oil" value="vegetable oil"/>
                  <Item label = "baby spinach leaves" value="baby spinach leaves"/>
                  <Item label = "apple" value="apple"/>
                  <Item label = "pomegranate seeds" value="pomegranate seeds"/>
                  <Item label = "toasted walnuts" value="toasted walnuts"/>
                  <Item label = "cooked crumbled bacon" value="cooked crumbled bacon"/>
                  <Item label = "blue cheese" value="blue cheese"/>
                  <Item label = "pomegranate vinaigrette" value="pomegranate vinaigrette"/>
                  <Item label = "onion" value="onion"/>
                  <Item label = "carrots" value="carrots"/>
                  <Item label = "hot peppers" value="hot peppers"/>
                  <Item label = "garlic cloves" value="garlic cloves"/>
                  <Item label = "potatoes" value="potatoes"/>
                  <Item label = "chicken stock" value="chicken stock"/>
                  <Item label = "spinach" value="spinach"/>
                  <Item label = "parsley" value="parsley"/>
                  <Item label = "thyme" value="thyme"/>
                  <Item label = "cream" value="cream"/>
                  <Item label = "cream cheese" value="cream cheese"/>
                  <Item label = "blue cheese" value="blue cheese"/>
                  <Item label = "onion powder" value="onion powder"/>
                  <Item label = "ground beef" value="ground beef"/>
                  <Item label = "salmon fillet" value="salmon fillet"/>
                  <Item label = "capers" value="capers"/>
                  <Item label = "salt" value="salt"/>
                  <Item label = "black pepper" value="black pepper"/>
                  <Item label = "lemon" value="lemon"/>
                  <Item label = "linguine pasta" value="linguine pasta"/>
                  <Item label = "shallots" value="shallots"/>
                  <Item label = "shrimp" value="shrimp"/>
                  <Item label = "dry white wine" value="dry white wine"/>
                  <Item label = "wheat germ" value="wheat germ"/>
                  <Item label = "blueberries" value="blueberries"/>
                  <Item label = "olive oil" value="olive oil"/>

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
                   onPress= {() => this._closeModal3(this.props.navigator)}
                />
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <Accordion
            sections={this.props.data}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </ScrollView>
        <Icon
          containerStyle={styles.newItem}
          onPress={() => this._setModalVisible2(true)}
          reverse
          size = {30}
          title='newItem'
          name='add'
          raised = {true}
          color='#517fa4'/>
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
