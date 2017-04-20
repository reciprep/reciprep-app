import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal} from 'react-native';
import { Button, SearchBar, Icon, Card, FormLabel, FormInput } from 'react-native-elements';

import RecipeCard from '../../components/recipeCard';
import Toolbar from '../../components/toolbar';
import RecipeLoad from './recipeLoad';
import RecipeList from './recipeList';
import RecipeAdd from './recipeAdd';
import RecipeDetail from '../recipeDetail';

export class RecipeFeed extends Component{

  _renderScene = (route,navigator) =>{
    if(route.index=="recipeLoad"){
      return <RecipeLoad navigator={navigator}/>
    }
    else if(route.index=="recipeList"){
      return <RecipeList feedData={route.feedData} navigator={navigator}/>
    }
  }

  constructor(props){
    super(props);
  }

  render(){
    return(
        <View style={styles.container}>
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
  feed:{
    flex: 8,
    backgroundColor: '#4ABDAC'
  }
});

module.exports = RecipeFeed;
