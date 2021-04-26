import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';

const questions = {
  'question0' : {
    'prompt': 'How would you describe your mood today?',
    'responses' : {
      'response0': 'Depressed',
      'response1': 'Annoyed',
      'response2': 'Decent',
      'response3': 'Joyful'
    }
  },
  'question1' : {
    'prompt': 'How are you doing?',
    'responses' : {
      'response0': 'Not doing so hot.',
      'response1': 'Could be better.',
      'response2': 'Doing ok.',
      'response3': 'Great!'
    }
  },
  'question2' : {
    'prompt': 'Do you think the future looks bright for you?',
    'responses' : {
      'response0': 'Not at all',
      'response1': 'Doubtful.',
      'response2': 'Unsure.',
      'response3': 'One can hope.',
      'response4': 'Confidently',
      'response5': 'Without a doubt!',
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

// Displays a question and list of responses.
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      selectedButton: -1,
      responses: []
    };
  }

  // Called when response is pressed. 
  // Records the response to calculate avg at end of survey. 
  // Reveals a reply once reply is pressed.
  btnPress = (index, max) => {
    this.state.selectedButton = index;
    this.state.responses[this.state.question] = index/(max-1);
    this.forceUpdate();
  };

  // Responsible for rendering all the answer buttons
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
            style={this.state.selectedButton === j 
              ? [global.style.defaultButtonContainer, {backgroundColor:"gray"}]
              : global.style.defaultButtonContainer}
            onPress={() => this.btnPress(j, temp.length)}>

            <Text style={global.style.responseText}>{responses[temp[i]]}</Text>
          </TouchableOpacity>
        );
      };
      return buttons;
    } catch {
      return "Loading";
    }

  }

  // Responsible for rendering the question
  renderQuestion = () => {
    console.log('Rendering question');
    var prompt = "";
    try {
      prompt = questions['question' + String(this.state.question)]['prompt'];
    }
    catch {
      prompt = "Loading...";
    }
    return <Text style={global.style.questionText}>{prompt}</Text>;
  }

  render() {

    return (
      <>
        <View style={global.style.surveyContainer}>
          {this.renderQuestion()}

          {this.renderResponses()}

          <TouchableOpacity style={global.style.defaultButtonContainer} onPress={() => {
            const newNum = this.state.question + 1;
            this.setState({ question: newNum});
            this.setState({ reply: ""});
            this.setState({ selectedButton: -1});
            // Navigates to content screen once survey is finished with determined condition from responses.
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
              this.props.navigation.navigate('Content', {
                condition: condition,
                data: this.state.responses
              });
            }
          }}>
            <Text style={global.style.NextText}>Next</Text>
          </TouchableOpacity>
        </View>

      </>
  );
  }
}

export default Question
