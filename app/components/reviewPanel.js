//Import from React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal, Alert} from 'react-native';
import { Button, SearchBar, Icon, Card, FormLabel, FormInput } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

//Import from Local
import RecipeFeedStarRating from './recipeFeedStarRating'

//Panel to allow a user to review a recipe
export class ReviewPanel extends Component{

  //HTTP PUT request that sends the user's review to the backend
  sendRating = async (closeModal)=>{
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    console.log(this.state.starCount)
    fetch('http://10.0.2.2:8000/api/recipe/'+this.props.recipe_id+'/rate',{
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': auth_token
      },
      body: JSON.stringify({
        'value': this.state.starCount
      })
    })
    .then( (response) => response.json())
    .then( (responseData) => {
      if(responseData['status'] == 'success'){
        Alert.alert("Rating Submitted")
        console.log('Rate request succeeded with response', responseData);
        this.props.closeModal
      }
      else{
        Alert.alert("Rating Failed")
        console.log('Rate request failed with response', responseData);
        this.props.closeModal
      }
      })
      .catch( (error) => {
        console.error(error);
      });

      closeModal
    }

  //Updates the rating
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
                    onPress={()=>this.sendRating(this.props.hideRate)}/>
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
