import axios from 'axios';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const bad = {key:'bad', color: 'red'};
const medium = {key:'medium', color: 'yellow'}; // selectedDotColor: 'blue'}
const good = {key:'good', color: 'green'};

class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: {}
    };
  }

  componentDidMount() {
    this.getHistory();
  }

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
            dots.selected = true;
            dots.selectedColor = "red";
          }
          if (x.condition === "medium") {
            dots.selected = true;
            dots.selectedColor = "gray";
          }
          if (x.condition === "good") {
            dots.selected = true;
            dots.selectedColor = "green";
          }
          
          markedDates[dateString] = dots;
        }
      })
      .catch((err) => console.log(err));
    this.state.markers = markedDates;
    console.log(markedDates);
    this.forceUpdate();
  }

  render() {
    return (
      <SafeAreaView style={global.style.container}>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: 350
          }}
          markedDates={this.state.markers}
        />



      </SafeAreaView>
    );
  }
}

Calendar.propTypes = {
  optionalFunc: PropTypes.func
}


export default HistoryScreen
