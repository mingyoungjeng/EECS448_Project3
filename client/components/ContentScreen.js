import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


let searchTerms = {
  "bad": ["feel better", "inspiring", "hugs"],
  "neutral": ["cute", "puppy"],
  "good": ["good job", "cool"]
}

class ContentScreen extends Component {
  state = {gif: "", condition: ""};

  componentDidMount() {
    this.storeCondition();
    let condition;
    try {
      condition = this.props.route.params.condition;
    } catch {
      condition = 'bad';
    }

    this.setState({ condition: condition });

    let searchTerm = this.getSearchTerm(condition);
    this.getNewImage(searchTerm);
  }

  // Retrieves a search term from the dictionary given a condition
  // 04/21/2021 - Refactor old code
  getSearchTerm = (condition) => {
    return searchTerms[condition][Math.floor(Math.random() * searchTerms[condition].length)];
  }

  // Retrieves a new image 
  // 04/21/2021 - Refactor old code
  getNewImage = async (keyword) => {
    var keyword = keyword;
    if (!keyword) {
      keyword = 'what?';
    }

    // Make a get request using giphy api and set the new gif in state.gif
    console.log("Finding gif with search: " + keyword);
    await axios.get("https://api.giphy.com/v1/gifs/translate?api_key=FxNx8bWzHL1OToRmoQb7vAUEIqhgKCHo&s=" + keyword)
      .then(res => {
        this.setState({ gif: res.data.data});
        console.log(this.state.gif);
      })
      .catch(error => console.log(error));

  }

  async storeCondition() {
    console.log("Storing condition");
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    axios.post('http://localhost:5000/api/history', {
        condition: this.state.condition
      }, {
      headers: {
      'x-auth-token': token.data
    }})
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

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity 
        style={global.style.defaultButtonContainer}
        onPress={() => this.getNewImage()}
        >
          <Text>Thumbs Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={global.style.defaultButtonContainer}
        onPress={() => this.getNewImage()}
        >
          <Text>Thumbs Down</Text>
        </TouchableOpacity>
      </View>

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
