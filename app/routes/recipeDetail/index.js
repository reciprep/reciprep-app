import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal} from 'react-native';
import { Button, SearchBar, Icon, Card, FormLabel, FormInput } from 'react-native-elements';


import DetailLoad from './detailLoad'
import DetailInfo from './detailInfo'

export class RecipeDetail extends Component{

  _renderScene = (route,navigator) =>{
    if (route.index=="detailLoad"){
      return <DetailLoad navigator={navigator} recipeID={route.data}/>
    }
    else if(route.index=="recipeDetail"){
      return <DetailInfo data={route.data}/>
    }
  }


  constructor(props){
    super(props);

    this.state = {
      title: "temp",
      description: "temp",
    }
  }
  render(){
    return(
          <Navigator style={{flex:1}}
            initialRoute={{index: 'detailLoad',
                           data: this.props.recipeID}}
            renderScene={this._renderScene}
            configureScene={ (route,routeStack) => Navigator.SceneConfigs.FadeAndroid}
          />

    );
  }
}

var styles = StyleSheet.create({

})
module.exports = RecipeDetail;
