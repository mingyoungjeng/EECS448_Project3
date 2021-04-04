import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import Question from './Question'
import styles from '../styles/style'


class SurveyScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Question navigation={this.props.navigation}/>
      </SafeAreaView>
    );
  }
}


export default SurveyScreen
