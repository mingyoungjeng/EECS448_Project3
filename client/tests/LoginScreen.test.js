import axios from 'axios';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {render, fireEvent, waitFor } from "@testing-library/react-native";

import LoginScreen from "../components/LoginScreen";

global.style = StyleSheet.create(require('../styles/default.json'));
jest.mock('axios');

const message = {
  data: {
    message: "Duplicate user"
  }
};

it("renders", () => {
	render(<LoginScreen/>);
});

it("registers existing user", () => {
  axios.post.mockResolvedValue(message);
	const {getByPlaceholderText, getByText} = render(<LoginScreen/>);

	const username = getByPlaceholderText('username');
  	fireEvent.changeText(username, "bbbbb");

  	const email = getByPlaceholderText('email');
  	fireEvent.changeText(email, "bbbbb");

  	const password = getByPlaceholderText('password');
  	fireEvent.changeText(password, "bbbbb");

  	const button = getByText('Register');
  	fireEvent.press(button);

  	getByText("Duplicate user");
});

it("logs in", () => {
	const {getByPlaceholderText, getByText} = render(<LoginScreen/>);

	const username = getByPlaceholderText('username');
  	fireEvent.changeText(username, "bbbbb");

  	const email = getByPlaceholderText('email');
  	fireEvent.changeText(email, "bbbbb");

  	const password = getByPlaceholderText('password');
  	fireEvent.changeText(password, "bbbbb");

  	const button = getByText('Login');
  	fireEvent.press(button);
});

// Testing:

// Create New User
// Login as User


