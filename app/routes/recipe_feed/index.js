import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView} from 'react-native';
import { Button, SearchBar, Icon, Card } from 'react-native-elements';

import RecipeCard from '../../components/recipeCard'

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

export class RecipeFeed extends Component{

  _searchFunction = ()=>{
    //todo implement search
  }

  _filterFunction = ()=>{
    //todo implement filter
  }

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(recipes)
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
          <Icon
            name='add'
            color='white'
            size={36}
            containerStyle={styles.iconContainer}/>
        </View>
        <View style={styles.feed}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <RecipeCard
                title={rowData.title}
                imageSource={rowData.imageSource}
                description={rowData.description} />
            }/>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1
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
