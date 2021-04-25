import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SurveyScreen from "../components/SurveyScreen";
import Question from "../components/Question";
import ContentScreen from "../components/ContentScreen";
import App from "../App";

global.style = StyleSheet.create(require('../styles/default.json'));
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');

const token = JSON.stringify({
    data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDdjYTZhMTBhNjE1ODM2ZDhkNjQyMWQiLCJpYXQiOjE2MTkxOTI3NTZ9.Be78qf5e8S9e_ExCzyeEFi6Rwi0qx9ToWj7mOckqTM4"
});

const gif = {
	data: {
		data: {
			images: {
				original: {
					url: "https://media1.giphy.com/media/l46CdKhgRegTqUWFG/giphy-preview.gif?cid=337535dc9592a949bf33ed2fe81627748ea40e5630b02fed&rid=giphy-preview.gif&ct=g"
				}
			}
		}
	}
}

it("renders survey", () => {
	render(<SurveyScreen/>);
});

it("allows navigation", () => {
	const {getByText} = render(<SurveyScreen/>);

	const button1 = getByText('Next');
	fireEvent.press(button1);
	fireEvent.press(button1);
	fireEvent.press(button1);
});

it("displays reply when button clicked", () => {
	const {getByPlaceholderText, getByText} = render(<SurveyScreen/>);

	const button1 = getByText("Jolly!");
	fireEvent.press(button1);

	getByText("Oh that's interesting to hear.");
});


it("renders ContentScreen when survey is finished", () => {
	
	AsyncStorage.getItem.mockResolvedValue(token);
	axios.get.mockResolvedValue(history);
	axios.post.mockResolvedValue({});
	
	const {getByText} = render(<App/>);

	const start = getByText('Start');
	fireEvent.press(start);

	const button1 = getByText('Next');
	fireEvent.press(button1);
	fireEvent.press(button1);
	fireEvent.press(button1);
	fireEvent.press(button1);
});

it("renders content", () => {
	AsyncStorage.getItem.mockResolvedValue(token);
	axios.get.mockResolvedValue(history);
	axios.post.mockResolvedValue({});

	render(<ContentScreen/>);
});