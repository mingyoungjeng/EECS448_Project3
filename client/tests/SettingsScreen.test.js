import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {render, fireEvent, waitFor } from "@testing-library/react-native";

import SettingsScreen from "../components/SettingsScreen";
import App from "../App";

global.style = StyleSheet.create(require('../styles/default.json'));

it("renders settings", () => {
	render(<SettingsScreen/>);
});

// Tries changing the theme
it("changes theme", () => {
	const {getByText} = render(<App/>);

	const settings = getByText('Settings');
	fireEvent.press(settings);

	const button = getByText('Change Theme?');
  	fireEvent.press(button);

  	const theme = getByText('theme2');
  	fireEvent.press(theme);

  	const name = StyleSheet.flatten(global.style.name);
  	expect(name).toBe('theme2');
});