import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/style'


class SettingsScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Set your settings here</Text>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          >
          <Text style={styles.menuText}>Change User?</Text>
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
