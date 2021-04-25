import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {render, fireEvent, waitFor } from "@testing-library/react-native";

import SettingsScreen from "../components/SettingsScreen";
import App from "../App";

global.style = StyleSheet.create(require('../styles/default.json'));

it("renders settings", () => {
	render(<SettingsScreen/>);
});

it("changes theme", () => {
	const {getByText} = render(<App/>);

	const settings = getByText('Settings');
	fireEvent.press(settings);

	const button = getByText('Change Theme?');
  	fireEvent.press(button);

  	const theme = getByText('Theme #2');
  	fireEvent.press(theme);

  	expect(global.style.name).toBe('Theme #2');
});