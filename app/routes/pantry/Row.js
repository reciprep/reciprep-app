import React from 'react';
import { View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import {ListItem} from 'react-native-elements';

const styles = StyleSheet.create({
  text: {
    marginLeft: 12,
    fontSize: 16
  },
});

_onPressSingleRequest = (props)=>{
  //do nothing
  console.log(props.title)
}
const Row = (props) => (
  <TouchableHighlight
    underlayColor="#FFF"
    onPress={()=>this._onPressSingleRequest(props)}>
    <View>
      <ListItem
          title={props.title}
          LeftIcon={{name: props.icon}}
          badge={{value: props.value}}/>
    </View>
  </TouchableHighlight>
);

export default Row;
