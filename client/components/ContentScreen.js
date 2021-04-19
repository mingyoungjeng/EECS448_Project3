import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import axios from 'axios';


let searchTerms = {
  "bad": ["feel better", "inspiring", "hugs"],
  "neutral": ["cute", "puppy"],
  "good": ["good job", "cool"]
}

class ContentScreen extends Component {
  state = {gif: ""};

  componentDidMount() {
    let condition = this.props.route.params.condition;
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    axios.get('http://localhost:5000/api/history', {
      params: {
        condition: this.state.condition
      },
      headers: {
      'x-auth-token': token.data
    }})

    let searchTerm = searchTerms[condition][Math.floor(Math.random() * searchTerms[condition].length)];
    console.log("Finding gif with search: " + searchTerm);
    axios.get("https://api.giphy.com/v1/gifs/translate?api_key=FxNx8bWzHL1OToRmoQb7vAUEIqhgKCHo&s=" + searchTerm)
      .then(res => {
        this.setState({ gif: res.data.data});
        console.log(this.state.gif);
      });
  }

  render() {

    if (this.state.gif === "") {
      return (
        <SafeAreaView style={global.style.container}>
          <View style={global.style.textContentContainer}>
            <Text style={global.style.contentText}>Loading...</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={global.style.container}>
        <View style={global.style.textContentContainer}>
          <Text style={global.style.contentText}>Go do whatever you need to do. Get off your phone already!</Text>
        </View>

        <Image
          style={global.style.image}
          source={{uri: this.state.gif.images.original.url}}
        />

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Title')}
          >
          <Text style={global.style.menuText}>Return</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default ContentScreen;
