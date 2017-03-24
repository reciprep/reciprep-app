import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import {ListItem} from 'react-native-elements';


export class Row extends Component{

  _onPressSingleRequest = (props)=>{
    //do nothing
    console.log(props.title)
  }

  render(){
    return(
      <View>
        {/* underlayColor="#FFF" */}
        {/* onPress={()=>this._onPressSingleRequest(this.props)}> */}
        <View>
          <ListItem
              title={this.props.title}
              LeftIcon={{name: this.props.icon}}
              badge={{value: this.props.value}}/>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    marginLeft: 12,
    fontSize: 16
  }
});

module.exports = Row;
