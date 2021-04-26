import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView,ImageBackground, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

class ThemeScreen extends Component {

  // Sets the global style of the app
  async changeTheme(theme) {
    global.style = await StyleSheet.create(require('../styles/' + theme + '.json'));
    global.themeName = theme;

    const m = StyleSheet.flatten(global.style.mascot);
    global.mascot = require("../assets/" + m + ".png");
    this.setState({});
  }

  // Displays menu of possible themes to choose from

  render() {
    console.log(this.props.navigation);

    const {isFocused} = this.props;
    return (

      <SafeAreaView style={global.style.container}>


      <Text style={global.style.responseText}>Theme #1</Text>
      <TouchableOpacity onPress={() => this.changeTheme("theme1")}>
        <Image
          style={global.style.themeImage}
          source={require('../assets/char1.png')}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #2</Text>
      <TouchableOpacity onPress={() => this.changeTheme("theme2")}>
        <Image
          style={global.style.themeImage}
          source={require('../assets/char2.png')}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #3</Text>
      <TouchableOpacity onPress={() => this.changeTheme("theme3")}>
        <Image
          style={global.style.themeImage}
          source={require('../assets/char3.png')}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #4</Text>
      <TouchableOpacity onPress={() => this.changeTheme("theme4")}>
        <Image
          style={global.style.themeImage}
          source={require('../assets/char4.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={global.style.defaultButtonContainer}
        onPress={() => this.props.navigation.navigate('Settings')}
      >
        <Text style={global.style.menuText}>Return</Text>
      </TouchableOpacity>

      <Image
        style={global.style.icon}
        source={global.mascot}
      />
      </SafeAreaView>
    );
  }


}
export default function(props) {
  const isFocused = useIsFocused();

  return <ThemeScreen {...props} isFocused={isFocused} />
}
