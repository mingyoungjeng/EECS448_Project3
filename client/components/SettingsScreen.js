import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/style'


class SettingsScreen extends Component {
  constructor(props) {
    super(props);
  }

  logOut = async () => {
    var token = await AsyncStorage.removeItem('token')
      .then( { result: 'success' } )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Set your settings here</Text>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress = {() => this.logOut()}
          >
          <Text style={styles.menuText}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          >
          <Text style={styles.menuText}>Change Theme?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Title')}
          >
          <Text style={styles.menuText} >Return</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default SettingsScreen
