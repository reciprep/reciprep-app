//Imports from React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal, Alert} from 'react-native';
import { Button, SearchBar, Icon, Card, FormLabel, FormInput } from 'react-native-elements';

//Imports from Local
import RecipeFeedStarRating from '../../components/recipeFeedStarRating'
import ReviewPanel from '../../components/reviewPanel'


// Class to Display Recipe Detail View
export class DetailInfo extends Component{

  //shows Rating Modal
  rateRecipe = ()=>{
    this.setState({showRate:true});
  }

  //hides Rating Modal
  hideRate = ()=>{
    this.setState({showRate:false});
  }

  //HTTP PUT request to consume the ingredients from the users pantry
  makeRecipe = async (recipe_id)=>{
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    fetch('http://10.0.2.2:8000/api/recipe/'+recipe_id+'/prepare',{
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': auth_token
      }
    })
    .then( (response) => response.json())
    .then( (responseData) => {
      if(responseData['status'] == 'success'){
        Alert.alert("Recipe Made")
        console.log('Prepare request succeeded with response', responseData);
      }
      else{
        Alert.alert("Making Failed")
        console.log('Preapre request failed with response', responseData);
      }
      })
      .catch( (error) => {
        console.error(error);
      });
  }

  //AsynC Call to add recipe to Shopping Cart
  addRecipeToCart = (data) =>{
    AsyncStorage.getItem('rec').then(
      (result)=>{
        result = JSON.parse(result)
        // console.log(result)
        if(result==null){
          result=[]
        }
        subitem={
          'title': data['name'],
          'imageSource': 'http://www.novelupdates.com/img/noimagefound.jpg',
          'description': data['description'],
          'rating': data['rating']
        }
        result.push(subitem)
        AsyncStorage.setItem('rec',JSON.stringify(result)).then(
          (response)=>console.log(response)
        )
      })
    }

  constructor(props){
    super(props);
    this.rateRecipe = this.rateRecipe.bind(this)
    this.hideRate = this.hideRate.bind(this)
    this.state={
      showRate: false
    }
  }


  render(){
    return(
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Text style={styles.title}>{this.props.data['name']}</Text>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.descriptionHeader}>Description</Text>
            <Text style={styles.description}>{this.props.data['description']}</Text>
            <Text style={styles.ingredientsHeader}>Ingredients</Text>
            <View style={styles.ingredientGroup}>
              {this.props.data['ingredients'].map(function(object,i){
                return(
                  <View style={styles.ingredientView} key={i}>
                    <Text style={styles.ingredientText}>{object['name']}</Text>
                  </View>)
              })}
            </View>
            <Text style={styles.stepHeader}>Preparation Steps</Text>
            <View style={styles.stepGroup}>
              {this.props.data['steps'].map(function(object,i){
                return(
                  <View style={styles.stepView} key={i}>
                    <Text style={styles.stepText}>{object}</Text>
                  </View>
                )
              })}
            </View>
            <View style={styles.buttonContainer}>
              <Button buttonStyle={styles.makeButton}
                      title={"Make"} fontSize={18}
                      onPress={()=>this.makeRecipe(this.props.data['recipe_id'])}/>
              <Button buttonStyle={styles.shoppingButton}
                      title={"Add to Cart"} fontSize={18}
                      onPress={()=>this.addRecipeToCart(this.props.data)}/>
            </View>
            <View style={styles.ratingGroup}>
              <RecipeFeedStarRating rating={this.props.data['rating']} disabled={true}/>
            </View>
            <Modal
              visible={this.state.showRate}
              transparent={true}
              onRequestClose={this.hideRate}>
              <ReviewPanel recipe_id={this.props.data['recipe_id']} hideRate={this.hideRate}/>
            </Modal>
            <View style={styles.buttonContainer}>
              <Button buttonStyle={styles.rateButton}
                      title={"Rate"} fontSize={18}
                      backgroundColor={"#dff442"} textStyle={styles.rateText}
                      onPress={this.rateRecipe}/>
            </View>
          </ScrollView>

        </View>
      </View>
    );
  }
}



var styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    backgroundColor: 'rgba( 0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: "center"
  },
  modalInnerContainer:{
    backgroundColor: 'white',
    flex:1,
  },
  title:{
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20
  },
  scrollView:{
  },
  descriptionHeader:{
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  description:{
    padding: 10,
    fontWeight: '100',
  },
  ingredientsHeader:{
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 10
  },
  ingredientGroup:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  ingredientView:{
    backgroundColor: '#f0f5f5',
    elevation: 2,
    width: 75,
    margin: 5,
    borderRadius: 2,
    height: 20,
  },
  ingredientText:{
    textAlign: 'center',
    color: 'black',
    margin: 2
  },
  stepHeader:{
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 10,
    marginTop: 10
  },
  stepGroup:{
    flexDirection: 'column',
    marginBottom: 20
  },
  stepView:{
    backgroundColor: '#f0f5f5',
    elevation: 2,
    justifyContent: 'center',
    margin: 10,
    borderRadius: 2,
  },
  stepText:{
    textAlign: 'center',
    color: 'black',
    margin: 2
  },
  ratingGroup:{
    marginLeft:75,
    marginRight:75,
    justifyContent: 'center'
  },
  buttonContainer:{
    alignItems: 'center'
  },
  rateButton:{
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
    height: 28,
    width: 150,
  },
  rateText:{
    color:'black'
  },
  makeButton:{
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
    height: 28,
    width: 150,
  },
  shoppingButton:{
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
    height: 28,
    width: 150,
  }
})

module.exports = DetailInfo;
