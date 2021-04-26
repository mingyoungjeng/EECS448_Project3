import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
import { useIsFocused } from '@react-navigation/native';


class TitleScreen extends Component {
  render() {
    // Displays navigation menu to different components of the app.

    const {isFocused} = this.props;

    return (
      <SafeAreaView style={global.style.container}>
        <Image
          style={global.style.logo}
          source={require("../assets/logo.png")}
        />

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Login')}
          >
          <Text style={global.style.menuText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Survey')}
          >
          <Text style={global.style.menuText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Settings')}
          >
          <Text style={global.style.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('FAQ')}
          >
          <Text style={global.style.menuText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('History')}
          >
          <Text style={global.style.menuText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Content')}
          >
          <Text style={global.style.menuText}>Straight to the Funny Section!</Text>
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

  return <TitleScreen {...props} isFocused={isFocused} />
}
