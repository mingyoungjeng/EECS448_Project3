import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';
import styles from '../styles/style'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const bad = {key:'bad', color: 'red'};
const medium = {key:'medium', color: 'yellow'}; // selectedDotColor: 'blue'}
const good = {key:'good', color: 'green'};

class HistoryScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
        	markedDates={{
        	    '2021-04-01': {dots: [bad]},
        	    '2021-04-02': {dots: [good]},
        	    '2021-04-03': {dots: [medium]}
        	  }}
        	  markingType={'multi-dot'}
        />


      </SafeAreaView>
    );
  }
}

export default HistoryScreen
