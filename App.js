import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TitleScreen from './components/TitleScreen';
import SettingsScreen from './components/SettingsScreen';
import SurveyScreen from './components/SurveyScreen';
import HistoryScreen from './components/HistoryScreen';
import ContentScreen from './components/ContentScreen';
import Faq from './components/Faq';

const Stack = createStackNavigator();

class App extends Component {
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
            opention={{ title:"Content" }}
          />



          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}




export default App;
