import axios from 'axios';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, Alert } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const bad = {key:'bad', color: 'red'};
const medium = {key:'medium', color: 'yellow'}; // selectedDotColor: 'blue'}
const good = {key:'good', color: 'green'};

// Displays Calendar of the user's condition in the past to record progress over time.
class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: {}
    };
  }

  // getHistory is async, but componentDidMount isn't
  componentDidMount() {
    this.getHistory();
  }

  // Retrieves the historival data for logged in user.
  // Gives error message if user isn't logged in.
  async getHistory() {
    let markedDates = {};

    let token = await AsyncStorage.getItem('token');
    console.log(token);

    // If user is not logged in, they don't have a token
    // return out of function.
    if (!token) {
      console.log("Login to get history");
      return;
    }

    token = JSON.parse(token);
    console.log("Retrieving info...");
    await axios.get('http://localhost:5000/api/history', {
      headers: {
      'x-auth-token': token.data
    }})
      .then(function (res) {
        console.log(res);
        for (var x of res.data.history) {
          var date = new Date(x.date);
          var dateString = date.getFullYear() + "-";

          if ((date.getMonth() / 9) < 1) {
            dateString += "0";
          }

          dateString += (date.getMonth() + 1) + "-";

          if ((date.getDate() / 10) < 1) {
            dateString += "0";
          }

          dateString += date.getDate();

          var dots = {};
          if (x.condition === "bad") {
            dots = global.style.bad;
          }
          if (x.condition === "medium") {
            dots = global.style.medium;
          }
          if (x.condition === "good") {
            dots = global.style.good;
          }

          markedDates[dateString] = dots;
          console.log(dots);
        }
      })
      .catch((err) => console.log(err));
    this.state.markers = markedDates;
    console.log(markedDates);
    // console.log(global.style.138)
    this.forceUpdate();
  }

  // Renders calendar
  render() {
    return (
      <SafeAreaView style={global.style.container}>
        <Calendar
          style={global.style.calendarContainer}
          markedDates={this.state.markers}
        />

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Title')}
        >
          <Text style={global.style.menuText}>Return</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }
}

Calendar.propTypes = {
  optionalFunc: PropTypes.func
}


export default HistoryScreen
