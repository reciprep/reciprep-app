import React, { Component } from 'react';
import { StyleSheet, Alert, Text, ListView, ScrollView, View, Navigator, Modal, TextInput, Picker, AsyncStorage} from 'react-native';
import { Button, Icon, List, ListItem, FormLabel, FormInput, TouchableHighlight} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import PantrySubItem from './../../components/pantrySubItem';
import PantryHeader from './../../components/pantryHeader';

var ReactNative = require('react-native');

const wet_Ingredients = [


]

//below is static data that is to be filled with data once the loading screen
//is passed up and the pantry screen is fully rendered
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


//below is the pantry class which allows for our pantry page to be displayed.
export class PantryPage extends React.Component {


  //this is to render a section header in our accordion view of the pantry
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


  //this makes visible our ingredient edit modal. When we edit within here we are able
  //to change the value of an ingredient on our pantry page
  _setModalVisible = (visible,name, quantity, i, sectionID) => {
    this.setState({ingredient: name});
    this.setState({modalVisible: visible});
    this.setState({text: quantity});
    this.setState({index: i});
    this.setState({category: sectionID});
  };

  //sets our ingredient add modal visible when we want to add an ingredient to our pantry
  _setModalVisible2 = (visible) =>{
    this.setState({modalVisible2: visible});
  };

  //below is how we close our modal view and save our data to the backend once closing
  //the modal - this only gets called if the user selects change ingredient quantity
  _closeModal = async (navigator) =>{
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
              navigator.push({index: "pantryLoad"})
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

  //transfer data function below is used to transfer our data from async to our UI
  //this is useful for storing the data locally.
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

  //this is for closing our our ingredient change modal
  _closeModal2 = () =>{
    this.setState({modalVisible: false});
  }

  _closeModal4 = () =>{
    this.setState({modalVisible2: false});
  }


  //the below modal will save the data from our add ingredient function
  //this is used to add the ingredient to our database as well as to the UI
  //which will then refresh the entire page to show our new updated ingredient list
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

  //this increments our ingredient in our first modal
  _Increment = () => {
    this.setState({text: (parseInt(this.state.text, 10) + 1).toString()})

  };
  //this decrements our ingrednet in our first modal
  _Decrement = () => {
    this.setState({text: (parseInt(this.state.text, 10) - 1).toString()})
  };

  //this incremenets our ingredient in our second modal
  _Increment2 = () => {
    this.setState({quantity: (parseInt(this.state.quantity, 10) + 1).toString()})
  };
  //this decrements our ingredient in our second modal
  _Decrement2 = () => {
    this.setState({quantity: (parseInt(this.state.quantity, 10) - 1).toString()})
  };

  //the below function  is used to render the content sections in our accordion view.
  //it is only for displaying individual ingredients
  _renderContent = (section) =>{
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={styles.BufferFlex}></View>
        <View style={{flex:8}}>
          <List containerStyle={{marginTop:-2, elevation:10}}>{
            section.subitems.map((item,i)=>(
              <ListItem
                containerStyle={{backgroundColor:'#EFE9F4', borderBottomColor: '#AAB9B9', borderBottomWidth: 1}}
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

  //constructor for the pantry page which allows for props to be passed in to
  //allow for data transfer from outside of the pantry page such that we can load
  //in our ingredients from the database
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


  //render function below is for rendering our entire pantry page
  //firstly we render 2 seperate modals, one for adding ingredients
  //and one of them for changing the quantity of an already
  //existing ingredients
  //after this we render in a scrollview which has an accordion view
  //within it for displaying our ingredients and their sections
  //ontop of all of this our headers are layed out as well as an add
  //button ontop of that for adding an ingredient
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
                   onPress= {() => this._closeModal(this.props.navigator)}
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
                  <Item label = "apple" value="apple"/>
                  <Item label = "artichoke hearts" value="artichoke hearts"/>
                  <Item label = "baby spinach leaves" value="baby spinach leaves"/>
                  <Item label = "baking powder" value="baking powder"/>
                  <Item label = "baking soda" value="baking soda"/>
                  <Item label = "balsamic vinegar" value="balsamic vinegar"/>
                  <Item label = "banana" value="banana"/>
                  <Item label = "black pepper" value="black pepper"/>
                  <Item label = "blueberries" value="blueberries"/>
                  <Item label = "blue cheese" value="blue cheese"/>
                  <Item label = "brown suger" value="brown suger"/>
                  <Item label = "butter" value="butter"/>
                  <Item label = "buttermilk" value="buttermilk"/>
                  <Item label = "canned pumkin" value="canned pumkin"/>
                  <Item label = "capers" value="capers"/>
                  <Item label = "carrots" value="carrots"/>
                  <Item label = "chicken stock" value="chicken stock"/>
                  <Item label = "chipotle chile powder" value="chipotle chile powder"/>
                  <Item label = "cinnamon" value="cinnamon"/>
                  <Item label = "cooked crumbled bacon" value="cooked crumbled bacon"/>
                  <Item label = "cream" value="cream"/>
                  <Item label = "cream cheese" value="cream cheese"/>
                  <Item label = "Dijon mustard" value="Dijon mustard"/>
                  <Item label = "dry white wine" value="dry white wine"/>
                  <Item label = "eggs" value="eggs"/>
                  <Item label = "egg whites" value="egg whites"/>
                  <Item label = "extra virgin olive oil" value="extra virgin olive oil"/>
                  <Item label = "garbanzo beans" value="garbanzo beans"/>
                  <Item label = "garlic" value="garlic"/>
                  <Item label = "garlic cloves" value="garlic cloves"/>
                  <Item label = "garlic powder" value="garlic powder"/>
                  <Item label = "ground beef" value="ground beef"/>
                  <Item label = "honey" value="honey"/>
                  <Item label = "hot peppers" value="hot peppers"/>
                  <Item label = "kosher salt" value="kosher salt"/>
                  <Item label = "lemon" value="lemon"/>
                  <Item label = "linguine pasta" value="linguine pasta"/>
                  <Item label = "mayonnaise" value="mayonnaise"/>
                  <Item label = "oat bran" value="oat bran"/>
                  <Item label = "olive oil" value="olive oil"/>
                  <Item label = "onion" value="onion"/>
                  <Item label = "onion powder" value="onion powder"/>
                  <Item label = "parsley" value="parsley"/>
                  <Item label = "pecan meal" value="pecan meal"/>
                  <Item label = "pomegranate juice" value="pomegranate juice"/>
                  <Item label = "pomegranate seeds" value="pomegranate seeds"/>
                  <Item label = "pomegranate vinaigrette" value="pomegranate vinaigrette"/>
                  <Item label = "potatoes" value="potatoes"/>
                  <Item label = "pumkin pie spice" value="pumkin pie spice"/>
                  <Item label = "pure maple syrup" value="pure maple syrup"/>
                  <Item label = "salmon fillet" value="salmon fillet"/>
                  <Item label = "salt" value="salt"/>
                  <Item label = "shallots" value="shallots"/>
                  <Item label = "shrimp" value="shrimp"/>
                  <Item label = "spinach" value="spinach"/>
                  <Item label = "tahini" value="tahini"/>
                  <Item label = "thick-cut bacon" value="thick-cut bacon"/>
                  <Item label = "thyme" value="thyme"/>
                  <Item label = "toasted walnuts" value="toasted walnuts"/>
                  <Item label = "vanilla extract" value="vanilla extract"/>
                  <Item label = "vegetable oil" value="vegetable oil"/>
                  <Item label = "water" value="water"/>
                  <Item label = "wheat germ" value="wheat germ"/>
                  <Item label = "white wine vinegar" value="white wine vinegar"/>
                  <Item label = "whole wheat flour" value="whole wheat flour"/>
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

  //this function checks for changes in UI/component values
  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
}



//below is the styles sheet for our pantry page such that we can properly
//display and style the components.
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
    backgroundColor: '#EFE9F4'
  },

  titleStyleSubItem:{
    fontSize: 14
  },

  BufferFlex:{ //BBCBCB
    flex:1,
    backgroundColor: '#AAB9B9'
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
    right:15,
    backgroundColor:'#EC9A29'
  }
});

module.exports = PantryPage;
