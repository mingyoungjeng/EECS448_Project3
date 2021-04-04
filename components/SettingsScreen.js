import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';
import styles from '../styles/style'


class SettingsScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Set your settings here</Text>

        <Button
          title="Button1"
          onPress={() => console.log("Button 1 pressed")}
        />

        <Button
          title="Title"
          onPress={() =>
            this.props.navigation.navigate('Title')
          }
        />


      </SafeAreaView>
    );
  }
}

export default SettingsScreen
