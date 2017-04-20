import React, { Component } from 'react';
import { StyleSheet, Text, View, Navigator, Image, ScrollView, ListView, AsyncStorage, Modal, Alert} from 'react-native';
import { Button, SearchBar, Icon, Card, FormLabel, FormInput } from 'react-native-elements';


class RecipeAdd extends Component{


  makeNewRecipe = async () =>{
    let finalIngredientList=[]
    for(i=0;i<this.state.ingredientList.length;i++){
      subItem={
        'name': this.state.ingredientList[i],
        'type': "VOLUME",
        'value': 1.0,
        'category': "Dry"
      }
      finalIngredientList.push(subItem)
    }
    console.log(finalIngredientList)
    let auth_token = "Bearer " + await AsyncStorage.getItem('auth_token');
    fetch('http://10.0.2.2:8000/api/recipe',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': auth_token
      },
      body: JSON.stringify({
        'name': this.state.newRecipeName,
        'description': this.state.newRecipeDescription,
        'ingredients': finalIngredientList,
        'steps':this.state.recipeSteps,
        'rating': 3
      })
    })
    .then( (response) => response.json())
    .then( (responseData) => {
      if(responseData['status'] == 'success'){
        Alert.alert("Recipe Created")
        console.log('Create requrest succeeded with response', responseData);
      }
      else{
        Alert.alert("Recipe Creation Failed")
        console.log('Create request failed with response', responseData);
      }
      })
      .catch( (error) => {
        console.error(error);
      });
  }

  addStepField = () =>{
    var temp = this.state.recipeStepCount + 1
    this.setState({recipeStepCount: temp})
    var tempArray = (this.state.dataSourceArray)
    tempArray.push(temp)
    this.setState({dataSourceArray: tempArray})
    var tempStringArray = this.state.recipeSteps
    tempStringArray.push("")
    this.setState({recipeSteps: tempStringArray})
    this.setState({dataSource: this.state.dataSource.cloneWithRows(tempArray)})
  }

  removeStep = (index) =>{
    var temp = this.state.recipeStepCount - 1
    this.setState({recipeStepCount: temp})
    var tempArray=(this.state.dataSourceArray)
    tempArray.pop()
    this.setState({dataSourceArray: tempArray})
    var tempStringArray = this.state.recipeSteps
    tempStringArray.splice(index-1,1)
    this.setState({recipeSteps: tempStringArray})
    this.setState({dataSource: this.state.dataSource.cloneWithRows(tempArray)})
  }

  addIngredientField = () =>{
    var temp = this.state.ingredientListCount + 1
    this.setState({ingredientListCount: temp})
    var tempArray = (this.state.ingredientSourceArray)
    tempArray.push(temp)
    this.setState({ingredientSourceArray: tempArray})
    var tempStringArray = this.state.ingredientList
    tempStringArray.push("")
    this.setState({ingredeintList: tempStringArray})
    this.setState({ingredientSource: this.state.ingredientSource.cloneWithRows(tempArray)})
  }

  removeIngredient = (index) =>{
    var temp = this.state.ingredientListCount - 1
    this.setState({ingredientListCount: temp})
    var tempArray=(this.state.ingredientSourceArray)
    tempArray.pop()
    this.setState({ingredientSourceArray: tempArray})
    var tempStringArray = this.state.ingredientList
    tempStringArray.splice(index-1,1)
    this.setState({ingredeintList: tempStringArray})
    this.setState({ingredientSource: this.state.ingredientSource.cloneWithRows(tempArray)})

  }

  constructor(props){
    super(props);
    this.removeIngredient = this.removeIngredient.bind(this)
    this.removeStep = this.removeStep.bind(this)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state={
      dataSource: ds.cloneWithRows([1]),
      dataSourceArray: [1],
      newRecipeName: "",
      newRecipeDescription: "",
      recipeStepCount: 1,
      currentRecipeStep: "",
      recipeSteps: [""],
      ingredientSource: ds.cloneWithRows([1]),
      ingredientSourceArray: [1],
      ingredientListCount: 1,
      ingredientList: [""]
    }
  }

  render(){
    return(
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Text style={styles.addRecipeHeader}> Add a New Recipe </Text>
          <ScrollView>
            <View style={styles.inputGroup}>
              <FormLabel labelStyle={styles.inputLabel}>Recipe Name</FormLabel>
              <FormInput inputStyle={styles.inputText} onChangeText={(newRecipeName) => this.setState({newRecipeName})}/>
            </View>
            <View style={styles.inputGroup}>
              <FormLabel labelStyle={styles.inputLabel}>Description</FormLabel>
              <FormInput inputStyle={styles.inputText} onChangeText={(newRecipeDescription) => this.setState({newRecipeDescription})}/>
            </View>
            <ListView
              dataSource={this.state.ingredientSource}
              renderRow={(rowNumber) =>
                <View style={styles.inputGroupWithClose}>
                  <View style={{flex:3}}>
                    <FormLabel labelStyle={styles.inputLabel}>Ingredient {rowNumber}</FormLabel>
                    <FormInput inputStyle={styles.inputText} onChangeText={(newIngredient) =>{
                      var curSteps = this.state.ingredientList
                      curSteps[rowNumber-1] = newIngredient
                      this.setState({ingredientList: curSteps}) }  }/>
                  </View>
                  <Icon style={{flex:1}} name='delete' size={26} onPress={() => this.removeIngredient(rowNumber)} />

                </View>
              }/>
            <Button title='Add an Ingredient' raised buttonStyle={styles.addButton} onPress={this.addIngredientField}/>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowNumber) =>
                <View style={styles.inputGroupWithClose}>
                  <View style={{flex:3}}>
                    <FormLabel labelStyle={styles.inputLabel}>Step {rowNumber}</FormLabel>
                    <FormInput inputStyle={styles.inputText} onChangeText={(newRecipeDescription) =>{
                      var curSteps = this.state.recipeSteps
                      curSteps[rowNumber-1] = newRecipeDescription
                      this.setState({recipeSteps: curSteps}) }  }/>
                  </View>
                  <Icon style={{flex:1}} name='delete' size={26} onPress={ () => this.removeStep(rowNumber)}/>
                </View>
              }/>
            <Button title='Add a Step' raised buttonStyle={styles.addButton} onPress={this.addStepField}/>
            <View style={styles.buttonGroup}>
              <Button title='Cancel' raised buttonStyle={styles.cancelButton} onPress={this.props.closeModal}/>
              <Button title='Submit' raised buttonStyle={styles.submitButton} onPress={this.makeNewRecipe}/>
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
    flex:1
  },
  inputGroup:{
    backgroundColor:'#DFDCE3',
    margin: 20,
    height: 70,
    borderRadius: 7,
    elevation: 2
  },
  inputGroupWithClose:{
    backgroundColor:'#DFDCE3',
    flexDirection: 'row',
    margin: 20,
    height: 70,
    borderRadius: 7,
    elevation: 2
  },
  inputLabel:{
    color: '#000000',
  },
  inputText:{
    color: '#000000'
  },
  addRecipeHeader:{
    color: 'black',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 20
  },
  buttonGroup:{
    flex:1,
    flexDirection:'row'
  },
  addButton:{
    flex:1,
    borderRadius: 7,
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20
  },
  cancelButton:{
    flex:1,
    borderRadius: 7,
    width: 20,
    height: 50,
    backgroundColor: 'red'
  },
  submitButton:{
    flex: 1,
    borderRadius: 7,
    width:20,
    height: 50,
    backgroundColor: 'green'
  }
});

module.exports = RecipeAdd;
