import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import {ListItem} from 'react-native-elements';


export class PantryHeader extends Component{

  _onPressSingleRequest = ()=>{
    //do nothing
  }

  //where we render the header
  render(){
    return(
      <ListItem
        title={this.props.title}
        titleStyle={styles.text}
        leftIcon={{name: this.props.icon}}
        badge={{value: this.props.value}}/>
    );
  }
}

//style sheet for our header
var styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textShadowRadius: 100,
    textShadowColor: 'gray'
  }
});

module.exports = PantryHeader;
