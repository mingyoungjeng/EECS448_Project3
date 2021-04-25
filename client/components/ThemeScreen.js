import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView,ImageBackground, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ThemeScreen extends Component {

  changeTheme(theme) {
    global.style = StyleSheet.create(require('../styles/' + theme + '.json'));
    this.setState({});
  }

  render() {
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


      <ImageBackground
        style={global.style.icon}
        source={require('../assets/char1.png')}
      />

      </SafeAreaView>
    );
  }

}

export default ThemeScreen
