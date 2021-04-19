import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Question from './Question'


class SurveyScreen extends Component {
  render() {
    return (
      <>
      <SafeAreaView style={global.style.container}>
        <Question navigation={this.props.navigation}/>
      </SafeAreaView>

      </>
    );
  }
}


export default SurveyScreen
