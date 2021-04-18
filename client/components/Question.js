import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/style'

const questions = {
  'question0' : {
    'prompt': 'How would you describe your mood today?',
    'responses' : {
      'response0': 'Jolly!',
      'response1': 'Peaceful',
      'response2': 'Peeved',
      'response3': 'Depressed'
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
  },
  'question2' : {
    'prompt': 'Describe today in a color?',
    'responses' : {
      'response0': 'Red',
      'response1': 'Orange',
      'response2': 'Yellow',
      'response3': 'Green',
      'response4': 'Blue',
      'response5': 'Indigo',
      'response6': 'Violet'
    }
  },
  'question3' : {
    'prompt': 'Have you felt anxious, restless or tense today?',
    'responses' : {
      'response0': 'OMG yes!',
      'response1': 'I guess so.',
      'response2': 'Not really',
      'response3': 'Cool as a cucumber, dude.'
    }
  },
}

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      question: 0,
      responses: []
    };
  }

  revealText = (weight, max) => {
    this.state.responses.push(weight/(max-1));
    this.setState({ reply: "Oh that's interesting to hear." });
  };

  renderResponses = () => {
    console.log('rendering responses');
    var responses = "";
    try {
      const responses = questions['question' + String(this.state.question)]['responses']
      const buttons = [];
      const temp = Object.keys(responses);
      for (var i = 0; i < temp.length; i++) {
        let j = i;
        buttons.push(
          <TouchableOpacity
            key={j}
            style={styles.defaultButtonContainer}
            onPress={() => this.revealText(j, temp.length)}>

            <Text style={styles.responseText}>{responses[temp[i]]}</Text>
          </TouchableOpacity>
        );
      };
      return buttons;
    } catch {
      return "Loading";
    }

  }

  renderQuestion = () => {
    console.log('Rendering question');
    var prompt = "";
    try {
      prompt = questions['question' + String(this.state.question)]['prompt'];
    }
    catch {
      prompt = "Loading...";
    }
    return <Text style={styles.questionText}>{prompt}</Text>;
  }

  render() {

    return (
      <>
        <View style={styles.surveyContainer}>
          {this.renderQuestion()}

          {this.renderResponses()}

          <TouchableOpacity style={styles.defaultButtonContainer} onPress={() => {
            const newNum = this.state.question + 1;
            this.setState({ question: newNum});
            this.setState({ reply: ""});
            if (newNum >= Object.keys(questions).length ) {
              let avg = 0;
              for (var i of this.state.responses) {
                avg += i;
              }
              avg /= this.state.responses.length
              console.log("Average: " + avg);

              var condition = "neutral";
              if (avg <= (1/3)) {
                condition = "bad";
              } else if (avg > (2/3)) {
                condition = "good";
              }
              console.log("Condition is: " + condition);

              this.setState({ question: 0 });
              this.props.navigation.navigate('Content', {condition: condition});
            }
          }}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textContentContainer}>
          <Text style={styles.responseText}>{this.state.reply}</Text>
        </View>

      </>
  );
  }
}

export default Question
