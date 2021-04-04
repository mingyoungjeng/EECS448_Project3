import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import styles from '../styles/style'

var questions = {
  'question1' : {
    'prompt': 'What are we doing here?',
    'responses' : {
      'response1': 'No one knows',
      'response2': 'Someone knows, but not me',
      'response3': 'I know, but no one else',
      'response4': 'If I knew, we would not be here'
    }
  }
}

class Question extends Component {
  render() {
    const q= questions['question1'];
    const r = q['responses'];
    return (
      <>
        <Text>{q['prompt']}</Text>
        <Text>{r['response1']}</Text>
        <Text>{r['response2']}</Text>
      </>
  );
  }
}

export default Question
