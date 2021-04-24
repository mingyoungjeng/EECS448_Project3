import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ThemeScreen extends Component {



  render() {
    return (
      <SafeAreaView style={global.style.container}>


      <Text style={global.style.responseText}>Theme #1</Text>
      <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          style={global.style.themeImage}
          source={{ uri: 'https://reactnative.dev/client/assets/favicon.png'}}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #2</Text>
      <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          style={global.style.themeImage}
          source={{ uri: 'https://reactnative.dev/client/assets/favicon.png'}}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #3</Text>
      <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          style={global.style.themeImage}
          source={{ uri: 'https://reactnative.dev/client/assets/favicon.png'}}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #4</Text>
      <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          style={global.style.themeImage}
          source={{ uri: 'https://reactnative.dev/client/assets/favicon.png'}}
        />
      </TouchableOpacity>




      <TouchableOpacity
        style={global.style.defaultButtonContainer}
        onPress={() => this.props.navigation.navigate('Settings')}
      >
        <Text style={global.style.menuText}>Return</Text>
      </TouchableOpacity>

      </SafeAreaView>
    );
  }

}

export default ThemeScreen
