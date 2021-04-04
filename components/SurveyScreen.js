import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import Question from './Question'
import styles from '../styles/style'


class SurveyScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Take a survey here!</Text>
        <Question />
      </SafeAreaView>
    );
  }
}


export default SurveyScreen
