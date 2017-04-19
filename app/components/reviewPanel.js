import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal} from 'react-native';
import { Button, SearchBar, Icon, Card, FormLabel, FormInput } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

import RecipeFeedStarRating from './recipeFeedStarRating'

export class ReviewPanel extends Component{

  sendRating = ()=>{
    //do nothing for now
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  constructor(props) {
    super(props);
    this.sendRating = this.sendRating.bind(this)

    this.state = {
      starCount: 3.5
    };
  }

  render(){
    return(
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.starContainer}>
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={30}
              starColor='gold'
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
          <View style={styles.buttonContianer}>
            <Button buttonStyle={styles.rateButton}
                    title={"Submit Rating"} fontSize={20}
                    backgroundColor={"#dff442"} textStyle={styles.rateText}
                    onPress={this.props.hideRate}/>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    backgroundColor: 'rgba( 0, 0, 0, 0.5)',
    paddingHorizontal: 50 ,
    paddingVertical: 200,
    justifyContent: "center"
  },
  modalInnerContainer:{
    backgroundColor: 'white',
    flex:1,
  },
  starContainer:{
    justifyContent: "center",
    marginTop: 50
  },
  buttonContainer:{
    justifyContent: "center",
    alignItems: "center"
  },
  rateButton:{
    marginBottom: 5,
    marginTop: 20,
    borderRadius: 5,
    height: 28,
    width: 150,
    alignSelf: "center"
  },
  rateText:{
    color:'black'
  }
});

module.exports=ReviewPanel;
