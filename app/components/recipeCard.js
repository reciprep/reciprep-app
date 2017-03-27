import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements';

import RecipeFeedStarRating from './recipeFeedStarRating';

export class RecipeCard extends Component{
  render(){
    return(
      <Card
        flexDirection='row'
        containerStyle = {styles.recipeContainer} >
        <Image
          source={this.props.imageSource}
          style={styles.recipeImage}>
        </Image>
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{this.props.title}</Text>
          <Text style={styles.recipeDescription} numberOfLines={3}> {this.props.description}</Text>
          <RecipeFeedStarRating/>
        </View>

      </Card>
    );
  }
}

var styles = StyleSheet.create({
  recipeContainer:{
    height: 100,
    alignSelf: 'stretch',
    margin: 0,
    padding: 0
  },
  recipeImage:{
    flex:1,
    height: 100,
    margin: 0,
    padding: 0
  },
  recipeInfo:{
    flex:2
  },
  recipeTitle:{
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  recipeDescription:{

  }
})

module.exports = RecipeCard;
