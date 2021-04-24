
// Survey/Question
// Content Delivery System

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {render, fireEvent, waitFor } from "@testing-library/react-native";

import SurveyScreen from "../components/SurveyScreen";
import Question from "../components/Question";
import ContentScreen from "../components/ContentScreen";

global.style = StyleSheet.create(require('../styles/default.json'));

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

it("displays reply when buton clicked", () => {
	const {getByPlaceholderText, getByText} = render(<SurveyScreen/>);

	const button1 = getByText("Jolly!");
	fireEvent.press(button1);

	getByText("Oh that's interesting to hear.");
});


it("renders ContentScreen when survey is finished", () => {
	const {getByText} = render(<SurveyScreen/>);

	const button1 = getByText('Next');
	fireEvent.press(button1);
	fireEvent.press(button1);
	fireEvent.press(button1);
	fireEvent.press(button1);
});

// it("renders content", () => {
// 	render(<ContentScreen/>);
// });