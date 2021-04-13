import axios from 'axios';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles/style'


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  login = (username) => {
    console.log(`creating user: ${username}`);
    axios.post('http://localhost:5000/api/users', {
      username: username
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));      
  }



  render() {
    return (
      <SafeAreaView style={styles.container}>

      <View style={styles.textContentContainer}>
        <Text> Login below </Text>
      </View>

      <TextInput style={styles.textContentContainer}
        placeholder="username"
        onChangeText={text => this.setState({ text: text})}
        defaultValue={this.text}
      />

      <TouchableOpacity
        style={styles.defaultButtonContainer}
        // Add networking capability to submit button
        onPress = {() => {
          this.login(this.state.text)}}
      >
      <Text>Submit</Text>
      </TouchableOpacity>

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


export default LoginScreen
