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
    this.state = {isRecipe: true};
    console.log("test");
  }

  setButtonState(props) {
  	this.setState({isRecipe: props});
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
          // onPress={this._loginFunction}
        />
        <Button
          title='Recipes'
          // buttonColor = {true: '#ccff99' : '#009933'}
          buttonStyle={styles.recipeButton}
          raised
          color = 'black'
          onClick={() => this.setButtonState(true)}
        />
        <Button
          title='Pantry'
          buttonStyle={styles.pantryButton}
          raised
          color = 'black'
          onClick={() => this.setButtonState(false)}
        />
      </View>
    )
  }
}

module.exports = Toolbar;

var styles = StyleSheet.create({

  loginView:{
    flex:3,
    // justifyContent: 'center'
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
  	backgroundColor:'#ccff99',
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
  	backgroundColor:'#009933',
  	// backgroundColor: this.isRecipe ? '#009933' : '#ccff99',
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
