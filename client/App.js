import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TitleScreen from './components/TitleScreen';
import SettingsScreen from './components/SettingsScreen';
import SurveyScreen from './components/SurveyScreen';
import HistoryScreen from './components/HistoryScreen';
import ContentScreen from './components/ContentScreen';
import Faq from './components/Faq';
import LoginScreen from './components/LoginScreen';
import ThemeScreen from './components/ThemeScreen';


const Stack = createStackNavigator(); // Navigation
global.style = StyleSheet.create(require('./styles/default.json')); // Defines theme for app
global.mascot = require('./assets/logo.png');

// Creates navigation stack and starting point of app (TitleScreen)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mascot: 'test',
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Title"
            component={TitleScreen}
            options={{ title:"Title"}}
          />

          <Stack.Screen
            name="Survey"
            component={SurveyScreen}
            options={{ title:"Survey" }}
          />

          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title:"Settings" }}
          />

          <Stack.Screen
            name="FAQ"
            component={Faq}
            options={{ title:"About" }}
          />

          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ title:"History" }}
          />

          <Stack.Screen
            name="Content"
            component={ContentScreen}
            options={{ title:"Content" }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title:"Login" }}
          />

          <Stack.Screen
            name="Theme"
            component={ThemeScreen}
            options={{ title:"Theme" }}
          />

          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}




export default App;
