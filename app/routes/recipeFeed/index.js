import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage} from 'react-native';
import { Button, SearchBar, Icon, Card } from 'react-native-elements';

import RecipeCard from '../../components/recipeCard';
import Toolbar from '../../components/toolbar';
import RecipeLoad from './recipeLoad';
import RecipeList from './recipeList';

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

  constructor(props){
    super(props);
    this.state = {
      feedData: []
    };
  }

  render(){
    // this._loadRecipes()
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
            <Icon
              name='add'
              color='white'
              size={36}
              containerStyle={styles.iconContainer}/>
          </View>
          <View style={styles.feed}>
            <Navigator style={{flex:1}}
              initialRoute={{index: 'recipeLoad' }}
              renderScene={this._renderScene}
              configureScene={ (route,routeStack) => Navigator.SceneConfigs.FadeAndroid}
            />
          </View>
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
  }
});

module.exports = RecipeFeed;
