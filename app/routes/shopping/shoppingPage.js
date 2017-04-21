import React, { Component } from 'react';
import { StyleSheet, Alert, ListView, ScrollView, View, Navigator, Modal, TextInput, Picker, Text, AsyncStorage} from 'react-native';
import { Button, Icon, List, Card, SearchBar, ListItem, FormLabel, FormInput, TouchableHighlight} from 'react-native-elements';

import Accordion from 'react-native-collapsible/Accordion';
import PantrySubItem from './../../components/pantrySubItem';
import PantryHeader from './../../components/pantryHeader';
import RecipeCard from '../../components/recipeCard';

var ReactNative = require('react-native');


//sample recipes for our testing of the shopping list page
const recipes = [
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
  {
    title: 'Chicken Parmigana',
    imageSource: require('../../images/chicken-parmigiani.jpg'),
    description: 'This is a Description of Food at the moment i have it as a max of 3 lines not sure what we should put though it will truncate if we go over'
  },
  {
    title: 'Chicken Parmigana',
    imageSource: require('../../images/chicken-parmigiani.jpg'),
    description: 'This is a Description of Food at the moment i have it as a max of 3 lines not sure what we should put though it will truncate if we go over'
  }
]

//category storage for local UI testing of the shopping list page
const categories =  [
    {
    title: 'Meats',
    icon: 'flight-takeoff',
    subitems: [
      {
        title: 'Apples',
        icon: 'add',
        value: '3'
      },
      {
        title: 'Bannanas',
        icon: 'add',
        value: '8'
      },
      {
        title: 'Pickles',
        icon: 'add',
        value: '2'
      },

      ],
    value: '3'
  },
  {
    title: 'Grains',
    icon: 'flight-takeoff',
    subitems: [{
        title: 'Apples',
        icon: 'add',
        value: '3'
      },
      {
        title: 'Bannanas',
        icon: 'add',
        value: '8'
      },
      {
        title: 'Pickles',
        icon: 'add',
        value: '2'
      },],
    value: '0'
  },
  {
    title: 'Fruits',
    icon: 'flight-takeoff',
    subitems: [{
        title: 'Apples',
        icon: 'add',
        value: '3'
      },
      {
        title: 'Bannanas',
        icon: 'add',
        value: '8'
      },
      {
        title: 'Pickles',
        icon: 'add',
        value: '2'
      },],
    value: '0'
  },
  {
    title: 'Vegetables',
    icon: 'flight-takeoff',
    subitems: [{
        title: 'Apples',
        icon: 'add',
        value: '3'
      },
      {
        title: 'Bannanas',
        icon: 'add',
        value: '8'
      },
      {
        title: 'Pickles',
        icon: 'add',
        value: '2'
      },],
    value: '0'
  },
  {
    title: 'Wet',
    icon: 'flight-takeoff',
    subitems: [{
        title: 'Apples',
        icon: 'add',
        value: '3'
      },
      {
        title: 'Bannanas',
        icon: 'add',
        value: '8'
      },
      {
        title: 'Pickles',
        icon: 'add',
        value: '2'
      },],
    value: '0'
  },
  {
    title: 'Dry',
    icon: 'flight-takeoff',
    subitems: [{
        title: 'Apples',
        icon: 'add',
        value: '3'
      },
      {
        title: 'Bannanas',
        icon: 'add',
        value: '8'
      },
      {
        title: 'Pickles',
        icon: 'add',
        value: '2'
      },],
    value: '0'
  },
  {
    title: 'Dairy',
    icon: 'flight-takeoff',
    subitems: [{
        title: 'Apples',
        icon: 'add',
        value: '3'
      },
      {
        title: 'Bannanas',
        icon: 'add',
        value: '8'
      },
      {
        title: 'Pickles',
        icon: 'add',
        value: '2'
      },],
    value: '0'
  },
  {
    title: 'Misc',
    icon: 'flight-takeoff',
    subitems: [{
        title: 'Apples',
        icon: 'add',
        value: '3'
      },
      {
        title: 'Bannanas',
        icon: 'add',
        value: '8'
      },
      {
        title: 'Pickles',
        icon: 'add',
        value: '2'
      },],
    value: '0'
  },
  ]

const Item = Picker.Item;
//our shopping page class
export class ShoppingPage extends React.Component {

  //where we render headers similar to pantrypage
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

  //pulled from pantry page - how to render our modal for ingredient changes
  _setModalVisible = (visible,name, quantity, i, sectionID) => {
    this.setState({ingredient: name});
    this.setState({modalVisible: visible});
    this.setState({text: quantity});
    this.setState({index: i});
    this.setState({category: sectionID});
  };

  //setting modal for shopping list additions visible

  _setModalVisible2 = (visible) =>{
    this.setState({modalVisible2: visible});
  };

  //closing and saving data from changing quantity of an ingredient
  _closeModal = () =>{
      this.setState({modalVisible: false});
      var count;
      for(count=0;count<8; count++){
        if(this.state.category == categories[count].title){
          categories[count].subitems[this.state.index].value=this.state.text;
        }
      }
  };

  //closing of a modal and not saving data
  _closeModal2 = () =>{
    this.setState({modalVisible2: false});
  }

  //the below modal will save the data and close the add ingredient button
  _closeModal3 = () =>{
    this.setState({modalVisible2: false});
    var count;
    var count2;
    for(count=0;count<8; count++){
      //below means we matched our category to an ingredient
      if(this.state.category2 == categories[count].title){
        categories[count].subitems.push({title:this.state.ingredientType ,type:'Volume',value:this.state.quantity});
        this.setState({dataSource: this.state.dataSource.cloneWithRows(categories)});
      }
    }
  };

  //removing an ingredient from the shopping list
  _Remove =() => {
    this.state.text = '0';
    this._closeModal();
  }

  //below functions edit quantities in the shopping list for ingreidents 
  _Increment = () => {
    this.setState({text: (parseInt(this.state.text, 10) + 1).toString()})
  };
  _Decrement = () => {
    if(parseInt(this.state.text,10)<2){
      this.setState({text: '0'})
      return;
    }
    this.setState({text: (parseInt(this.state.text, 10) - 1).toString()})
  };

  _Increment2 = () => {
    this.setState({quantity: (parseInt(this.state.quantity, 10) + 1).toString()})
  };
  _Decrement2 = () => {
     if(parseInt(this.state.quantity,10)<2){
      this.setState({quantity: '0'})
      return;
    }
    this.setState({quantity: (parseInt(this.state.quantity, 10) - 1).toString()})
  };

  _searchFunction = ()=>{
    //todo implement search
  }

  _filterFunction = ()=>{
    //todo implement filter
  }

  //deletes all of our data given a user has purchased the ingredients
  _deleteAll = () =>{
    categories = [];
    recipes = [];
  }

  //deletes a recipe if the user is done with the recipe
  deleteRecipe = (recipeName) =>{
    var count;
    for(count = 0; count < recipes.length; count++){
      recipes.splice(count,1);
    }
  }

  transferData = ()=>{
    var count;
    var count2;
    //transfers ingredients from props
    for(count = 0; count < 8; count ++){
      for(count2 = 0; count2 < this.props.data.categories[count].subitems.length; count2++){
        categories[count].subitems.push({title:this.props.data.categories[count].subitems[count2].title,type:this.props.data.categories[count].subitems[count2].type,value:this.props.data.categories[count].subitems[count2].type});
      }
    }
    //transfers recipies from props
    var count3;
    for(count3 = 0; count3 < this.props.data.recipies.length; count3++){
      recipes.push({title:this.props.data.recipies[count3].title,imageSource:this.props.data.recipies[count3].imageSource,description:this.props.data.recipies[count3].description})
    }
  }

  //this is where we render content in the accordion view to show the ingredients
  //that are in the shopping list
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


  //constructor for our shopping list which populates our data and sets our state variables
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds2 = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(categories),
      dataSource2: ds2.cloneWithRows(recipes),
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
      loading: true,
    };
  };

  //rendering of our page, done similar to pantry page
  //first we render the modals, then we render our shopping list
  //then we render our recipe list. all of these are contained within
  //a scroll view for viewing purposes. Ontop of these we have overlayed a toolbar
  //as well as 2 buttons for adding ingredients or clearing the shopping list
  render(){
    //this.transferData();
    return(
      <View style={styles.PantryView}>
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
          onRequestClose={() => this._closeModal3()}
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
                   onPress= {() => this._closeModal3()}
                />
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <Accordion
            sections={categories}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
          <View>
            <ListView
              dataSource={this.state.dataSource2}
              renderRow={(rowData) =>
                <RecipeCard
                  title={rowData.title}
                  showDetail={deleteRecipe(title)}
                  imageSource={rowData.imageSource}
                  description={rowData.description} />
              }/>
            </View>
        </ScrollView>
        <Icon
          containerStyle={styles.newItem}
          onPress={() => this._setModalVisible2(true)}
          reverse
          size = {30}
          title='newItem'
          name='add'
          raised = {true}
          zIndex = {1000}
          color='#517fa4'/>
          <Icon
          containerStyle={styles.deleteItem}
          onPress={() => this._deleteAll()}
          reverse
          size = {30}
          title='delete'
          name='add'
          raised = {true}
          zIndex = {1000}
          color='#517fa4'/>
      </View>
    );
  }

  //checks for changes to our values within the UI/component values
  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
}



//below is our styling for the entire page and ensuring it follows other pages styles
var styles = StyleSheet.create({
  Header:{
    flex:3,
  },

  actionBar:{
    backgroundColor: '#07A0C3',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  feed:{
    flex: 8
  },
  searchContainer:{
    flex:2,
    backgroundColor: '#07A0C3',
    borderBottomColor: '#07A0C3',
    borderTopColor: '#07A0C3',
  },
  searchInput:{
  },
  filterButton:{
    flex:1,
    height: 30,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#4ABDAC',
  },
  iconContainer:{
    flex:1,
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
  deleteItem:{
    position: 'absolute',
    bottom:15,
    left:15
  }
});

module.exports = ShoppingPage;
