import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import {ListItem} from 'react-native-elements';


export class PantryHeader extends Component{

  _onPressSingleRequest = ()=>{
    //do nothing
  }

  render(){
    return(
      <ListItem
        title={this.props.title}
        leftIcon={{name: this.props.icon}}
        badge={{value: this.props.value}}
      />
    );
  }
}

var styles = StyleSheet.create({
  text: {
    marginLeft: 12,
    fontSize: 16
  }
});

module.exports = PantryHeader;
