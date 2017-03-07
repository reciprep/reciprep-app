import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Button,
  TouchableOpacity,
  View
} from 'react-native';


const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

export class ToolbarButton extends Component {
  render(){
    return(
      <TouchableOpacity
        onPress={onButtonPress}
        style = {styles.button}>
        <Text style = {styles.buttonText}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  button:{
    height: 50,
    width:50,
    backgroundColor: '#DF6248'
  },
  buttonText:{
    color:'#FFEBE7'
  }
});

module.exports = ToolbarButton;
