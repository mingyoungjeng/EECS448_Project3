import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image, TouchableHighlightBase } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


let searchTerms = {
  "bad": ["feel better", "inspiring", "hugs", "stay strong", "mood"],
  "neutral": ["cute", "puppy", "kitten", "hello there"],
  "good": ["good job", "cool", "awesome", "dab", "applause", "congratulations"]
}

// Displays relevant / helpful gif from GIPHY based on survey response.
class ContentScreen extends Component {
  state = {gif: "", condition: "", keyword: "", done: false, trendingIndex: 0, trendingInit: false};

  // Reads condition of user
  componentDidMount() {
    console.log(this.props.route);
    this.storeCondition();
    let condition;
    try {
      condition = this.props.route.params.condition;
    } catch {
      condition = 'neutral';
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
  getNewImage = async (inputkey) => {
    console.log(`inputkey = ${inputkey}`);
    var keyword = inputkey;
    if (!keyword) {
      keyword = 'na';
    }

    this.setState({ keyword: keyword });

    // Make a get request using giphy api and set the new gif in state.gif
    console.log("Finding gif with search: " + keyword);
    await axios.get("https://api.giphy.com/v1/gifs/translate?api_key=FxNx8bWzHL1OToRmoQb7vAUEIqhgKCHo&s=" + keyword)
      .then(res => {
        this.setState({ gif: res.data.data});
        console.log(this.state.gif);
      })
      .catch(error => console.log(error));
  }

  getTrendingImage = async () => {
      await axios.get("https://api.giphy.com/v1/gifs/trending?api_key=FxNx8bWzHL1OToRmoQb7vAUEIqhgKCHo&s")
        .then(res => {
          console.log(res.data);
          this.setState({ gif: res.data.data[this.state.trendingIndex]});
          this.setState({ trendingLength: res.data.data.length })
          // console.log(this.state.gif);
        })
        .catch(error => console.log(error));

        // Calculate new trending index (js modular arithmetic = QQ)
        const newTrendingIndex = (this.state.trendingIndex + 1) % this.state.trendingLength;

        this.setState({ trendingIndex: newTrendingIndex });
  }

  sendData = async (keyword, data) => {
    await axios.post('http://localhost:5000/api/data',
    {
      keyword: keyword,
      data: data
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  // Stores the user's condition for the day in the database
  async storeCondition() {
    console.log("Storing condition");
    await AsyncStorage.getItem('token')
      .then(token => {
        token = JSON.parse(token);
        axios.post('http://localhost:5000/api/history', {
            condition: this.state.condition
          }, {
          headers: {
          'x-auth-token': token.data
        }})
      })
      .catch(err => console.log(`Could not store condition: ${err}`));
  }

  render() {
    // Displays loading while waiting for gid.
    if (this.state.gif === "") {
      return (
        <SafeAreaView style={global.style.container}>
          <View style={global.style.textContentContainer}>
            <Text style={global.style.contentText}>Loading...</Text>
          </View>
        </SafeAreaView>
      );
    }

    // Renders gif and little motivational message
    return (
      <SafeAreaView style={global.style.container}>
        <View style={global.style.textContentContainer}>
          <Text style={global.style.contentText}>Alright, we'll jot that down for you. Here is a gif we selected based on your responses! What do you think?</Text>
        </View>

        <Image
          style={global.style.image}
          source={{uri: this.state.gif.images.original.url}}
        />

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
        style={global.style.defaultButtonContainer}
        onPress={() => {
          if (!this.state.done && this.state.route) {
            console.log("Sending data...");
            console.log(this.props);
            this.sendData(this.state.keyword, this.props.route.params.data);
            this.setState({ done: true });
          } 
          this.getNewImage(this.getSearchTerm(this.state.condition));
        }}
        >
          <Text style={global.style.responseText}>Thumbs Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={global.style.defaultButtonContainer}
        onPress={() => {
          if (!this.state.trendingInit) {
            this.setState({ trendingInit: false });
          }
          this.getTrendingImage();}}
        >
          <Text style={global.style.responseText}>Thumbs Down</Text>
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
