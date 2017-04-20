import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal} from 'react-native';
import { Button, SearchBar, Icon, Card } from 'react-native-elements';

import RecipeCard from '../../components/recipeCard';
import RecipeDetail from '../recipeDetail';
import RecipeAdd from './recipeAdd';


export class RecipeList extends Component{

  hideDetail = () =>{
    this.setState({showDetail:false});
  }

  showDetail = (recipeID) =>{
    this.setState({showDetail:true});
    this.setState({modalRecipeID: recipeID});
  }

  _searchFunction = async (navigator)=>{
    let updatedSearchCriteria = this.state.searchCriteria.replace(' ','+');
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    let fetchMethod = 'http://10.0.2.2:8000/api/recipe/search?terms='+ updatedSearchCriteria + '&filter=true';
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


  _addRecipe = ()=>{
    this.setState({addRecipe: true});
  }

  _hideModal = () =>{
    this.setState({addRecipe: false});
  }


  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._hideModal = this._hideModal.bind(this)
    this._searchFunction = this._searchFunction.bind(this)

    this.state = {
      dataSource: ds.cloneWithRows(this.props.feedData),
      showDetail: false,
      addRecipe: false,
      modalRecipeID: '0',
      searchCriteria: "",
      navigator: "",
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
    flex:2,
    backgroundColor: '#07A0C3',
    borderBottomColor: '#07A0C3',
    borderTopColor: '#07A0C3',
  },
  searchInput:{
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
