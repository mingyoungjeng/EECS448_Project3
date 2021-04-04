import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import styles from '../styles/style'


class SurveyScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Take a survey here!</Text>

      </SafeAreaView>
    );
  }
}


export default SurveyScreen
