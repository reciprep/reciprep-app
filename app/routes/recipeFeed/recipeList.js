import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal} from 'react-native';
import { Button, SearchBar, Icon, Card } from 'react-native-elements';

import RecipeCard from '../../components/recipeCard';
import RecipeDetail from '../recipeDetail';

export class RecipeList extends Component{

  hideDetail = () =>{
    this.setState({showDetail:false});
  }

  showDetail = (recipeID) =>{
    this.setState({showDetail:true});
    this.setState({modalRecipeID: recipeID});
  }

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.feedData),
      showDetail: false,
      modalRecipeID: '0'
    };
  }

  render(){
    return(
      <View>
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
              title={rowData.title}
              imageSource={rowData.imageSource}
              description={rowData.description}
              showDetail={this.showDetail}
              recipeID={rowData.recipeID}/>
          }/>
      </View>
    );
  }
}

module.exports = RecipeList;
