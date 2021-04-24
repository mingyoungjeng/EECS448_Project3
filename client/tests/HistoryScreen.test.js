import axios from 'axios';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {render, fireEvent, waitFor } from "@testing-library/react-native";

import HistoryScreen from "../components/HistoryScreen";

global.style = StyleSheet.create(require('../styles/default.json'));
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');

const token = JSON.stringify({
    data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDdjYTZhMTBhNjE1ODM2ZDhkNjQyMWQiLCJpYXQiOjE2MTkxOTI3NTZ9.Be78qf5e8S9e_ExCzyeEFi6Rwi0qx9ToWj7mOckqTM4"
});

const history = {
    data: {
        history: [{
            _id: "607cbc48d31f931a2c83cd62",
            condition: "bad",
            date: "2021-04-13T23:10:00.368Z",
            __v: 0
        }, {
            _id: "607cbc49d31f931a2c83cd63",
            condition: "bad",
            date: "2021-04-14T23:10:01.044Z",
            __v: 0
        }, {
            _id: "607cbc4dd31f931a2c83cd64",
            condition: "medium",
            date: "2021-04-15T23:10:05.015Z",
            __v: 0
        }, {
            _id: "607cbc4dd31f931a2c83cd65",
            condition: "medium",
            date: "2021-04-16T23:10:05.379Z",
            __v: 0
        }, {
            _id: "607cbc50d31f931a2c83cd66",
            condition: "good",
            date: "2021-04-17T23:10:08.799Z",
            __v: 0
        }, {
            _id: "607cbc51d31f931a2c83cd67",
            condition: "good",
            date: "2021-04-18T23:10:09.180Z",
            __v: 0
        }, {
            _id: "607dd277dd5f0c20b8544580",
            condition: "bad",
            date: "2021-04-19T18:56:55.184Z",
            __v: 0
        }, {
            _id: "607e044a42430f0d8834f406",
            condition: "good",
            date: "2021-04-20T22:29:30.364Z",
            __v: 0
        }, {
            _id: "60806ca848082d0500ba8c4d",
            condition: "bad",
            date: "2021-04-21T18:19:20.245Z",
            __v: 0
        }, {
            _id: "60809a7b4022dc3a30a252a9",
            condition: "bad",
            date: "2021-04-21T21:34:51.066Z",
            __v: 0
        }, {
            _id: "6082096001ed2587b5898075",
            condition: "good",
            date: "2021-04-22T23:40:16.599Z",
            __v: 0
        }],
        _id: "607ca6a10a615836d8d6421d"
    }
};

it("renders history", () => {
  AsyncStorage.getItem.mockResolvedValue(token);
  axios.get.mockResolvedValue(history);

	render(<HistoryScreen/>);
});

// it("logs in", () => {
// 	const {getByPlaceholderText, getByText} = render(<LoginScreen/>);

// 	const username = getByPlaceholderText('username');
//   	fireEvent.changeText(username, "bbbbb");

//   	const email = getByPlaceholderText('email');
//   	fireEvent.changeText(email, "bbbbb");

//   	const password = getByPlaceholderText('password');
//   	fireEvent.changeText(password, "bbbbb");

//   	const button = getByText('Login');
//   	fireEvent.press(button);
// });


// History Screen