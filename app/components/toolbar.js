//Import from React
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,	Navigator, AsyncStorage} from 'react-native';
import { Button, FormLabel,	FormInput} from 'react-native-elements';

//Toolbar on top of the mainview
export class Toolbar extends Component {

  constructor() {
  	super();
}
  //changes the button state to recipe
  setButtonState(props) {
  	this.setState({isRecipe: props});
  };

  //activate the pantry view
  setPantryActive () {
    this.props.navigator.push({index:'pantry'})
  };

  //activate the recipe view
  setRecipeActive () {
    this.props.navigator.push({index:'recipeFeed'})
  };

  //activate the shopping view
  setShoppingActive () {
    this.props.navigator.push({index:'shopping'})
  };

  //clear the auth token
  async clearAuth ()  {
    const result2 = await AsyncStorage.removeItem('auth_token');
  };

  render(){

    return(
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Button
          title=''
          buttonStyle={styles.settingsButton}
          icon={{name:'menu',
                 color:'white',
                 size: 36}}
          raised
          onPress={() => this.clearAuth()}
        />
        <Button
          title='Recipes'
          textStyle={{color:'white',fontWeight:'bold',fontSize:15}}
          backgroundColor = {this.props.recipeColor}
          buttonStyle={styles.recipeButton}
          raised
          color = 'black'
          onPress={() => this.setRecipeActive()}
        />
        <Button
          title='Pantry'
          textStyle={{color:'white',fontWeight:'bold',fontSize:15}}
          backgroundColor = {this.props.pantryColor}
          buttonStyle={styles.pantryButton}
          raised
          color = 'black'
          onPress={() => this.setPantryActive()}
        />
      </View>
    )
  }
}

module.exports = Toolbar;

var styles = StyleSheet.create({

  loginView:{
    flex:3,
  },
  inputGroup:{
    backgroundColor:'#DFDCE3',
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
  recipeButton:{
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    width: 147,
    borderColor: "#EC9A29",
    borderWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  pantryButton:{
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    width: 147,
    borderColor: "#EC9A29",

    borderWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  shoppingButton:{
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    width: 97,
    borderWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 0,
  },
  settingsButton:{
  	backgroundColor:'#F1B563',
    alignItems: 'center',
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    width: 70,
    borderColor: "#EC9A29",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 2,
  },
});
