import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/style'

const questions = {
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
      <View style={styles.surveyContainer}>
        <Text style={styles.questionText}>{q['prompt']}</Text>

        <TouchableOpacity style={styles.responseContainer} onPress={this.revealText}>
          <Text>{r['response1']}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.responseContainer} onPress={this.revealText}>
          <Text>{r['response2']}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.responseContainer} onPress={this.revealText}>
          <Text>{r['response3']}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.responseContainer} onPress={this.revealText}>
          <Text>{r['response4']}</Text>
        </TouchableOpacity>

        <Text>{this.state.reply}</Text>
      </View>
  );
  }
}

export default Question
