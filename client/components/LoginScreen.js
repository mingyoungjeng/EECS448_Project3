import axios from 'axios';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set up clientside encryption
// Why does bcrypt fail?
const bcrypt = require('bcryptjs');
const saltRounds = 10;


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "",
      email: "",
      password: ""
    };
  }

  // User registers account with username
  register = (username, email, password) => {
    console.log(`creating user: ${username}, ${email}`);

    // Encrypt password before sending to server
    axios.post('http://localhost:5000/api/users', {
      username: username,
      email: email,
      password: password
    })
      .then(async (token) => {
        // Store token in local storage
        await AsyncStorage.setItem('token', JSON.stringify(token));
      })
      .catch(err => console.error(err));      
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

      <View style={styles.textContentContainer}>
        <Text> Login or Register Below </Text>
      </View>

      <TextInput style={styles.textContentContainer}
        placeholder="username"
        onChangeText={text => this.setState({ username: text})}
        defaultValue={this.text}
      />
      <TextInput style={styles.textContentContainer}
        placeholder="email"
        onChangeText={text => this.setState({ email: text})}
        defaultValue={this.text}
      />
      <TextInput style={styles.textContentContainer}
        placeholder="password"
        onChangeText={text => this.setState({ password: text})}
        defaultValue={this.text}
      />

     

      <TouchableOpacity
        style={styles.defaultButtonContainer}
        // Add networking capability to submit button
        onPress = {() => {
          console.log(this.state);
          const { username, email, password } = this.state;
          this.register(username, email, password);
        }}
      >
      <Text>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={ styles.defaultButtonContainer }
        onPress = {() => {
          console.log("Retrieving info...");
          axios.post('http://localhost:5000/api/authorization', {
            username: this.state.username,
            // email: this.state.email,
            password: this.state.password
          })
            .then( async (res) => {
              await AsyncStorage.clear()
              await AsyncStorage.setItem('token', JSON.stringify(res))
                .then(() => console.log(`Welcome back ${this.state.username}`))
                .catch(err => console.log(err));
            })
            .catch(err => console.error(err));
        }}
      >
      <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={ styles.defaultButtonContainer }
        onPress = {async () => {
          let token = await AsyncStorage.getItem('token');
          token = JSON.parse(token);
          console.log(token);

          console.log("Retrieving info...");
          axios.get('http://localhost:5000/api/users/me', {
            params: {
              username: this.state.username,
              password: this.state.password
            },
            headers: {
            'x-auth-token': token.data
          }})
            .then(res => console.log(res))
            .catch(err => console.error(err));
        }}
      >
      <Text>Get info</Text>
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
