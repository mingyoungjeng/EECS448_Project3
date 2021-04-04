import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import styles from '../styles/style'


class TitleScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Welcome to this app!</Text>

        <Button
          title="Let's get started ^^"
          onPress={() =>
            this.props.navigation.navigate('Survey')
          }
        />

        <Button
          title="Settings"
          onPress={() =>
            this.props.navigation.navigate('Settings')
          }
        />

        <Button
          title="History"
          onPress={() =>
            this.props.navigation.navigate('History')
          }
        />
      </SafeAreaView>
    );
  }
}

export default TitleScreen
