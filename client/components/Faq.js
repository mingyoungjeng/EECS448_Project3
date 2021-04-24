import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
// import styles from '../styles/style'


class Faq extends Component {
  render() {
    return (
      <SafeAreaView style={global.style.container}>

      <View style={global.style.textContentContainer}>
        <Text style={global.style.responseText}> This is an app that helps  track your mood and gives your motivation quotes based on your responses </Text>
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
