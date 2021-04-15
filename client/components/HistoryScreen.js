import axios from 'axios';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';
import styles from '../styles/style'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

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

  async getHistory() {
    let markedDates = {};
    await axios.get('http://localhost:5000/api/history')
      .then(function (res) {
        for (var x of res.data) {
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

          var dots = {dots: []};
          if (x.condition === "bad") {
            dots.dots.push(bad);
          }
          if (x.condition === "medium") {
            dots.dots.push(medium);
          }
          if (x.condition === "good") {
            dots.dots.push(good);
          }
          
          markedDates[dateString] = dots;
        }
      });
    this.state.markers = markedDates;
    this.forceUpdate();
  }

  render() {
    this.getHistory();
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          markedDates={this.state.markers}
            markingType={'multi-dot'}
        />


      </SafeAreaView>
    );
  }
}

export default HistoryScreen
