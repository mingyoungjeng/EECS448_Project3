import axios from 'axios';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {render, fireEvent} from "@testing-library/react-native";

import LoginScreen from "../components/LoginScreen";

it("renders", () => {
	global.style = StyleSheet.create(require('../styles/default.json'));
	const {getAllByText} = render(<LoginScreen/>);
});