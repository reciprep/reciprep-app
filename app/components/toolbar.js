import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,	Navigator, AsyncStorage} from 'react-native';
import { Button, FormLabel,	FormInput} from 'react-native-elements';

export class Toolbar extends Component {

  constructor() {
  	super();
}
  setButtonState(props) {
  	this.setState({isRecipe: props});
  };

  setPantryActive () {
    this.props.navigator.push({index:'pantry'})
  };

  setRecipeActive () {
    this.props.navigator.push({index:'recipeFeed'})
  };

  async clearAuth ()  {
    console.log("CLEAR")
    const result = await AsyncStorage.getAllKeys((response) => console.log(response) );
    console.log(result)
    // const token = await AsyncStorage.getItem('auth_token',(response) => console.log(response) );
    // console.log(result)
    const result2 = await AsyncStorage.removeItem('auth_token', (response) => console.log(response) );
    console.log(result2)
  };

  render(){

    return(
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Button
          title=''
          buttonStyle={styles.settingsButton}
          icon={{name:'menu',
                 color:'black',
                 size: 36}}
          raised
          onPress={() => this.clearAuth()}
        />
        <Button
          title='Recipes'
          backgroundColor = {this.props.recipeColor}
          buttonStyle={styles.recipeButton}
          raised
          color = 'black'
          onPress={() => this.setRecipeActive()}
        />
        <Button
          title='Pantry'
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
    width: 145,
    borderWidth: 2,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  pantryButton:{
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    width: 145,
    borderWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 0,
  },
  settingsButton:{
  	backgroundColor:'#009933',
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    width: 70,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 1,
  },
});
