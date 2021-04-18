import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import styles from '../styles/style'
import axios from 'axios';

class ContentScreen extends Component {
  state = {gif: ""};

  componentDidMount() {
    axios.get("https://api.giphy.com/v1/gifs/translate?api_key=FxNx8bWzHL1OToRmoQb7vAUEIqhgKCHo&s=" + "inspiring")
      .then(res => {
        this.setState({ gif: res.data.data});
        console.log(this.state.gif);
      });
  }

  render() {

    if (this.state.gif === "") {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.textContentContainer}>
            <Text style={styles.contentText}>Loading...</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textContentContainer}>
          <Text style={styles.contentText}>Go do whatever you need to do. Get off your phone already!</Text>
        </View>

        <Image
          style={styles.image}
          source={{uri: this.state.gif.images.original.url}}
        />

        <TouchableOpacity
          style={styles.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Title')}
          >
          <Text style={styles.menuText}>Return</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default ContentScreen;
