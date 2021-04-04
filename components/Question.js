import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/style'

const questions = {
  'question0' : {
    'prompt': 'What are we doing here?',
    'responses' : {
      'response0': 'No one knows',
      'response1': 'Someone knows, but not me',
      'response2': 'I know, but no one else',
      'response3': 'If I knew, we would not be here'
    }
  },
  'question1' : {
    'prompt': 'How are you doing?',
    'responses' : {
      'response0': 'Great!',
      'response1': 'Doing ok.',
      'response2': 'Could be better.',
      'response3': 'Not doing so hot.'
    }
  }
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      question: 0
    };
  }

  revealText = () => {
    this.setState({ reply: "Reply: yeet" });
  };

  renderResponses = () => {
    console.log('rendering responses');
    const responses = questions['question' + String(this.state.question)]['responses']
    const buttons = [];
    const temp = Object.keys(responses);
    for (var i = 0; i < temp.length; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={styles.responseContainer}
          onPress={this.revealText}>

          <Text>{responses[temp[i]]}</Text>
        </TouchableOpacity>
      );
    };
    return buttons;
  }


  render() {
    return (
      <View style={styles.surveyContainer}>
        <Text style={styles.questionText}>
        {console.log('question' + String(this.state.question))}
        {console.log(Object.keys(questions).length)}
        {console.log('state = ' + this.state.question)}
          {questions['question' + String(this.state.question)]['prompt']}
        </Text>

        {this.renderResponses()}

        <Text>{this.state.reply}</Text>

        <TouchableOpacity style={styles.responseContainer} onPress={() => {
          this.setState({ question: this.state.question + 1});
          console.log('comparing ' + this.state.question + ' to ' + Object.keys(questions).length);
          // Why we have to - 1 here? 
          this.state.question < Object.keys(questions).length - 1 ? this.renderResponses() : this.setState({ question : 0});
        }}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
  );
  }
}

export default Question
