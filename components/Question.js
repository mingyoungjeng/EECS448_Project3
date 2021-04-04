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
  },
  'question2' : {
    'prompt': 'How are you doing?',
    'responses' : {
      'response1': 'Great!',
      'response2': 'Doing ok.',
      'response3': 'Could be better.',
      'response4': 'Not doing so hot.'
    }
  }
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: ""
    };
  }

  revealText = () => {
    this.setState({ reply: "Reply: yeet" });
  };

  render() {
    const q= questions['question1'];
    const r = q['responses'];
    return (
      <>
        <Text>{q['prompt']}</Text>
        <Button title={r['response1']} onPress={this.revealText}/>
        <Button title={r['response2']} onPress={this.revealText}/>
        <Button title={r['response3']} onPress={this.revealText}/>

        <Text>{this.state.reply}</Text>
      </>
  );
  }
}

export default Question
