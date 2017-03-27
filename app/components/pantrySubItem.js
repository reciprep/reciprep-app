import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import {Button,Icon,ListItem} from 'react-native-elements';


export class PantrySubItem extends Component{

  _onPressSingleRequest = ()=>{
    //do nothing
  }

  _addIngredient = ()=>{
    //doNothing
  }

  _removeIngredient = ()=>{
    //doNothing
  }

  render(){
    return(
      <View style={styles.wrapper}>
        <View style={styles.buffer}></View>
        <View style={styles.subItem}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Icon name="remove" color="red" iconStyle={styles.removeIcon} onPress={this._removeIngredient}/>
          <Text style={styles.value}>{this.props.value}</Text>
          <Icon name="add" color="green" iconStyle={styles.addIcon} onPress={this._addIngredient}/>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper:{
    flex:1,
    flexDirection:'row'
  },
  buffer:{
    flex: 1,
    backgroundColor: '#4ABDAC'
  },
  subItem:{
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 1
  },
  title:{
    flex:3,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  addIcon:{
    flex:1
  },
  value:{
    flex: 1,
    textAlign: 'center'
  },
  removeIcon:{
    flex:1,
  }
});

module.exports = PantrySubItem;
