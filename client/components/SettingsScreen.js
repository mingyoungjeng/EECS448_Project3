import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';


class SettingsScreen extends Component {
  constructor(props) {
    super(props);
  }

  selectTheme(theme) {
    global.style = StyleSheet.create(require('../styles/' + theme + '.json'));
  }

  logOut = async () => {
    await AsyncStorage.removeItem('token')
      .then(token => {
        console.log('Logging out...');
        alert("Logged Out");

      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <SafeAreaView style={global.style.container}>
        <Text style={global.style.contentText}>Adjust your settings here</Text>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress = {() => this.logOut()}
          >
          <Text style={global.style.menuText}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          // onPress = {() => this.selectTheme("default")}
          onPress={() => this.props.navigation.navigate('Theme')}
          >
          <Text style={global.style.menuText}>Change Theme?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Title')}
          >
          <Text style={global.style.menuText} >Return</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default SettingsScreen
