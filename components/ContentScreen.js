import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/style'

class ContentScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textContentContainer}>
          <Text style={styles.contentText}>Go do whatever you need to do. Get off your phone already!</Text>
        </View>

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Title')}
          >
          <Text style={styles.menuText}>Return</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default ContentScreen;
