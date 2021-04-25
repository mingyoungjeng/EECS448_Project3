import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
// import styles from '../styles/style'


class Faq extends Component {
  render() {
    return (
      <SafeAreaView style={global.style.container}>

      <View style={global.style.textContentContainer}>
        <Text style={global.style.responseText}>
          Computer Intelligent Assistive Network (CIAN) is an app that helps track your mood and gives
          your motivation quotes based on your responses. In "Settings" you can choose a mascot to be your
          buddy and follow you on your journey of tracking your mental health. The "History" page will give
          you a look on how you've been feeling daily on a nifty calendar. The "Straight to the Funny Section"
          gives you a chance to skip the daily Check-In questions and just give you some (hopefully)
          funny content you can Thumbs Up or Thumbs Down!
        </Text>
      </View>
      <TouchableOpacity
        style={global.style.defaultButtonContainer}
        onPress={() => this.props.navigation.navigate('Title')}
      >
        <Text style={global.style.menuText}>Return</Text>
      </TouchableOpacity>
      </SafeAreaView>
    );
  }
}


export default Faq
