import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';


import ToolbarButton from './ToolbarButton';


const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

export class ToolbarMain extends Component {
  render() {
    return (
      <View title='ToolbarMain'>
        <ToolbarButton name="Pantry"/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  ToolbarAndroid:{
    backgroundColor: '#3D9970',
    height: 60,
  },

});

module.exports = ToolbarMain;
