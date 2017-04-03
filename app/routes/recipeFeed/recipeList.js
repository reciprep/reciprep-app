import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage} from 'react-native';
import { Button, SearchBar, Icon, Card } from 'react-native-elements';

import RecipeCard from '../../components/recipeCard';


export class RecipeList extends Component{

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.feedData)
    };
  }

  render(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <RecipeCard
            title={rowData.title}
            imageSource={rowData.imageSource}
            description={rowData.description} />
        }/>
    );
  }
}

module.exports = RecipeList;
