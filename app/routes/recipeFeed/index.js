import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal} from 'react-native';
import { Button, SearchBar, Icon, Card, FormLabel, FormInput } from 'react-native-elements';

import RecipeCard from '../../components/recipeCard';
import Toolbar from '../../components/toolbar';
import RecipeLoad from './recipeLoad';
import RecipeList from './recipeList';
import RecipeAdd from './recipeAdd'

export class RecipeFeed extends Component{

  _renderScene = (route,navigator) =>{
    if(route.index=="recipeLoad"){
      return <RecipeLoad navigator={navigator}/>
    }
    else if(route.index=="recipeList"){
      return <RecipeList feedData={route.feedData}/>
    }
  }

  _searchFunction = ()=>{
    //todo implement search
  }

  _filterFunction = ()=>{
    //todo implement filter
  }

  _addRecipe = ()=>{
    this.setState({modalVisible: true});
  }

  _hideModal = () =>{
    this.setState({modalVisible: false})
  }

  constructor(props){
    super(props);
    this._hideModal = this._hideModal.bind(this)
    this.state = {
      feedData: [],
      modalVisible: false,
    };
  }

  render(){
    return(
        <View style={styles.container}>
          <View style={styles.actionBar}>
            <SearchBar
              lightTheme
              round
              onChangeText={this._searchFunction}
              containerStyle= {styles.searchContainer}
              inputStyle={styles.searchInput}/>
            <Button
              title='filter'
              buttonStyle={styles.filterButton}
              raised
              onPress={this._filterFunction} />
          </View>
          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={this._hideModal}>
            <RecipeAdd closeModal={this._hideModal}/>
          </Modal>
          <View style={styles.feed}>
            <Navigator style={{flex:1}}
              initialRoute={{index: 'recipeLoad' }}
              renderScene={this._renderScene}
              configureScene={ (route,routeStack) => Navigator.SceneConfigs.FadeAndroid}
            />
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
  container:{
    flex:8
  },
  actionBar:{
    backgroundColor: '#07A0C3',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  feed:{
    flex: 8,
    backgroundColor: '#4ABDAC'
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
  newItem:{
    position: 'absolute',
    bottom:15,
    right:15
  }
});

module.exports = RecipeFeed;
