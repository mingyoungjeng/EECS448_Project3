import axios from 'axios';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {render, fireEvent} from "@testing-library/react-native";

import {LoginScreen} from "../clients/LoginScreen";

const l = new LoginScreen();

it("renders", () => {
	const {getAllByText} = render(<LoginScreen/>);
});