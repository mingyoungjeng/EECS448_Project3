import axios from 'axios';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';
import styles from '../styles/style'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          token = JSON.parse(token);
          // console.log(token);

          console.log("Retrieving info...");
          await axios.get('http://localhost:5000/api/history', {
            params: {
              username: this.state.username,
              password: this.state.password
            },
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
      <SafeAreaView style={styles.container}>
        <Calendar
          markedDates={this.state.markers}
        />


      </SafeAreaView>
    );
  }
}

export default HistoryScreen
