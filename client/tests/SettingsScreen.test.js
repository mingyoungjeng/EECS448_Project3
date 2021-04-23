import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {render, fireEvent, waitFor } from "@testing-library/react-native";

import SettingsScreen from "../components/SettingsScreen";

global.style = StyleSheet.create(require('../styles/default.json'));

it("renders settings", () => {
	render(<SettingsScreen/>);
});

it("changes theme", () => {
	const {getByText} = render(<SettingsScreen/>);

	const button = getByText('Change Theme?');
  	fireEvent.press(button);

  	// Pick a theme
});

// Change Theme