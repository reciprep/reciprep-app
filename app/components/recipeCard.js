import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import RecipeFeedStarRating from './recipeFeedStarRating';

export class RecipeCard extends Component{
  render(){
    return(
      <TouchableOpacity onPress={()=>{this.props.showDetail(this.props.recipeID)}}>
        <Card
          flexDirection='row'
          containerStyle = {styles.recipeContainer} >
          <Image
            source={{ uri: this.props.imageSource ? this.props.imageSource : "http://www.novelupdates.com/img/noimagefound.jpg"}}
            style={styles.recipeImage}>
          </Image>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle}>{this.props.title}</Text>
            <Text style={styles.recipeDescription} numberOfLines={3}> {this.props.description}</Text>
            <View style={styles.ratingContainer}>
              <RecipeFeedStarRating rating={this.props.rating} disabled={true}/>
            </View>
          </View>

        </Card>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    flex: 1
  },
  recipeDescription:{
    flex: 3,
    marginRight: 3
  },
  ratingContainer:{
    flex: 1,
    marginBottom: 10,
    marginRight: 10
  }
})

module.exports = RecipeCard;
