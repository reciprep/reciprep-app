import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Image, View, Navigator, AsyncStorage} from 'react-native';

import Landing from './app/routes/landing';
import RecipeFeed from './app/routes/recipeFeed';
import Toolbar from './app/components/toolbar';
import MainView from './app/routes/mainView'

export default class ReciPrep extends Component {

  _renderScene(route,navigator){
    if(route.index=="landing"){
      return <Landing navigator={navigator}/>
    }
    else if(route.index=="mainView"){
      return <MainView/>
    }
  }

  state: {
   initalRoute: string,
 };

 constructor(){
   super();
   this.state = {
     initalRoute: 'landing'
   };
 }

  render() {
    console.log("NEXT")
    return(
      <View style={styles.mainView}>
        <Navigator
          initialRoute={{index: this.state.initalRoute }}
          renderScene={this._renderScene}
          configureScene={ (route,routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      </View>
    );}
}

var styles = StyleSheet.create({
  mainView:{
    flex: 1
  },
  placeholder:{
    height:75,
    backgroundColor: '#4ABDAC'
  }
});

AppRegistry.registerComponent('ReciPrep', () => ReciPrep);
