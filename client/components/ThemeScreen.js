import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ThemeScreen extends Component {



  render() {
    return (
      <SafeAreaView style={global.style.container}>

      <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          style={global.style.image}
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
