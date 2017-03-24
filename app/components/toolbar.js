import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	TouchableHighlight,
	Alert,
	Text,
	View,
	Navigator
} from 'react-native';
import {
	Button,
	FormLabel,
	FormInput
} from 'react-native-elements';


export class Toolbar extends Component {

  constructor() {
  	super();
    this.state = {
      recipeColor: '#ccff99',
      pantryColor: '#009933'};
  }

  setButtonState(props) {
  	this.setState({isRecipe: props});
  };

  setPantryActive () {
    this.setState({pantryColor: '#ccff99' });
    this.setState({recipeColor: '#009933'});
  };

  setRecipeActive () {
    this.setState({pantryColor: '#009933' });
    this.setState({recipeColor: '#ccff99'});
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
        />
        <Button
          title='Recipes'
          backgroundColor = {this.state.recipeColor}
          buttonStyle={styles.recipeButton}
          raised
          color = 'black'
          onPress={() => this.setRecipeActive()}
        />
        <Button
          title='Pantry'
          backgroundColor = {this.state.pantryColor}
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
