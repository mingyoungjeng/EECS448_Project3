import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
// import styles from '../styles/style'


class Faq extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>

      <View style={styles.textContentContainer}>
        <Text style={styles.responseText}> This is an app that helps  track your mood and gives your motivation quotes based on your responses </Text>
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


export default Faq
