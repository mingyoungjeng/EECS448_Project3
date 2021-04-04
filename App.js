import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TitleScreen from './components/TitleScreen';
import SettingsScreen from './components/SettingsScreen';

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
            name="Settings"
            component={SettingsScreen}
            options={{ title:"Settings" }}
          />

          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}




export default App;
