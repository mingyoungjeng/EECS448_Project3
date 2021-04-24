// Testing:

// Create New User
// Login as User
// Change Theme
// Survey/Question
// History Screen
// Content Delivery System
// Logout

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from "./LoginScreen"
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

class TestScreen extends Component {

	componentDidMount() {
		const t = new LoginScreen();
		t.register("bbbbb", "bbbbb", "bbbbb");
	}

	render() {
		return null;
	}
}

export default TestScreen