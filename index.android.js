//Imports from React
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Image, View, Navigator, AsyncStorage} from 'react-native';

//imports from local files
import Landing from './app/routes/landing';
import RecipeFeed from './app/routes/recipeFeed';
import Shopping from './app/routes/shopping/index.js';
import Toolbar from './app/components/toolbar';
import Pantry from './app/routes/pantry';
import MainView from './app/routes/mainView';
import Splash from './app/routes/splash';

//Master Class
export default class ReciPrep extends Component {

  //Router to Decide first scene to load, either splash page, landing page,
  // or main view
  _renderScene(route,navigator){
    if(route.index=="splash"){
      return <Splash navigator={navigator}/>
    }
    if(route.index=="landing"){
      return <Landing navigator={navigator}/>
    }
    else if(route.index=="mainView"){
      return <MainView/>
    }
  }



 constructor(){
   super();
 }

  render() {
    return(
      <View style={styles.mainView}>
        <Navigator
          initialRoute={{index: 'splash' }}
          renderScene={this._renderScene}
          configureScene={ (route,routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      </View>
    );}
}

var styles = StyleSheet.create({
  mainView:{
    flex: 8
  },
  placeholder:{
    height:75,
    backgroundColor: '#4ABDAC'
  }
});

AppRegistry.registerComponent('ReciPrep', () => ReciPrep);
