import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Question from './Question'

// Doesn't do much, just calls the Question screen.
class SurveyScreen extends Component {
  render() {
    return (
      <>
      <SafeAreaView style={global.style.container}>
        <Question navigation={this.props.navigation}/>
        <Image
          style={global.style.icon}
          source={global.mascot}
        />
      </SafeAreaView>

      </>
    );
  }
}


export default SurveyScreen
