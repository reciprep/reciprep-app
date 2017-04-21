// Imports from React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal} from 'react-native';
import { Button, SearchBar, Icon, Card, CheckBox } from 'react-native-elements';

// Imports from Local
import RecipeCard from '../../components/recipeCard';
import RecipeDetail from '../recipeDetail';
import RecipeAdd from './recipeAdd';

// Class to display all recipes relevant to the user in a list
export class RecipeList extends Component{

  // hides the recipe detail popup
  hideDetail = () =>{
    this.setState({showDetail:false});
  }

  // enables the recipe detail popup
  showDetail = (recipeID) =>{
    this.setState({showDetail:true});
    this.setState({modalRecipeID: recipeID});
  }

  //HTTP Get fucntion to return all recipies based on search criteria
  _searchFunction = async (navigator)=>{
    let updatedSearchCriteria = this.state.searchCriteria.replace(' ','+');
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    let fetchMethod = 'http://10.0.2.2:8000/api/recipe/search?terms='+ updatedSearchCriteria;
    if (!this.state.checked){
      fetchMethod = fetchMethod + '&filter=true';
    }
    console.log(fetchMethod)
    fetch(fetchMethod,{
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
                        feedData: responseData['data']['recipes']});
        console.log('Search requrest succeeded with response', responseData);
      }
      else{
        console.log('request failed with response', responseData);
      }

    })
    .catch( (error) => {
      console.error(error);
    });
  }

  //enables add recipie modal
  _addRecipe = ()=>{
    this.setState({addRecipe: true});
  }
  //hides add recipe modal
  _hideModal = () =>{
    this.setState({addRecipe: false});
  }

  // toggles checkmark in toolbar
  toggleCheck = () =>{
    if (this.state.checked){
      this.setState({checked: false})
    }
    else{
      this.setState({checked: true})
    }

  }


  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._hideModal = this._hideModal.bind(this)
    this._searchFunction = this._searchFunction.bind(this)
    this.toggleCheck = this.toggleCheck.bind(this)

    this.state = {
      dataSource: ds.cloneWithRows(this.props.feedData),
      showDetail: false,
      addRecipe: false,
      modalRecipeID: '0',
      searchCriteria: "",
      navigator: "",
      checked: false,
    };
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.actionBar}>
          <SearchBar
            lightTheme
            round
            onChangeText={(input) => this.setState({searchCriteria:input})}
            containerStyle= {styles.searchContainer}
            inputStyle={styles.searchInput}/>
          <CheckBox
            containerStyle={styles.checkBox}
            textStyle={{color: 'white'}}
            title='disable filter'
            onIconPress={this.toggleCheck}
            onPress={this.toggleCheck}
            checked={this.state.checked}/>
          <Button
            title='search'
            buttonStyle={styles.searchButton}
            raised
            onPress={()=>this._searchFunction(this.props.navigator)} />
        </View>
        <Modal //Modal for Adding Recipe
          visible={this.state.addRecipe}
          transparent={true}
          onRequestClose={this._hideModal}>
          <RecipeAdd closeModal={this._hideModal}/>
        </Modal>
        <View style={{flex:8}}>
          <Modal //Modal for showing Recipe Detail
            visible={this.state.showDetail}
            transparent={true}
            onRequestClose={this.hideDetail}>
            <RecipeDetail recipeID={this.state.modalRecipeID} closeModal={this.hideDetail} />
          </Modal>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <RecipeCard
                title={rowData.name}
                imageSource={rowData.imageSource}
                description={rowData.description}
                showDetail={this.showDetail}
                rating={rowData.rating}
                recipeID={rowData.recipe_id}/>
            }/>
        </View>
        <Icon
          containerStyle={styles.newItem}
          onPress={this._addRecipe}
          reverse
          size = {30}
          title='newItem'
          name='add'
          raised = {true}
          color='#517fa4'/>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  actionBar:{
    backgroundColor: '#07A0C3',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchContainer:{
    flex:3,
    backgroundColor: '#07A0C3',
    borderBottomColor: '#07A0C3',
    borderTopColor: '#07A0C3',
  },
  searchInput:{
  },
  checkBox:{
    flex: 2,
    borderColor: '#07A0C3',
    backgroundColor: '#07A0C3',

  },
  searchButton:{
    flex:1,
    height: 30,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#4ABDAC',
  },
  iconContainer:{
    flex:1,
  },
  newItem:{
    position: 'absolute',
    bottom:15,
    right:15
  }
});

module.exports = RecipeList;
