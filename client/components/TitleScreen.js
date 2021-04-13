import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../styles/style'


class TitleScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>CIAN!</Text>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Login')}
          >
          <Text style={styles.menuText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Survey')}
          >
          <Text style={styles.menuText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Settings')}
          >
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('FAQ')}
          >
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('History')}
          >
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }
}

export default TitleScreen
