import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView,ImageBackground, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ThemeScreen extends Component {



  render() {
    return (
      <SafeAreaView style={global.style.container}>


      <Text style={global.style.responseText}>Theme #1</Text>
      <TouchableOpacity onPress={() =>
          style = global.style.theme1}
      >
        <Image
          style={global.style.themeImage}
          source={require('./icons/char1.png')}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #2</Text>
      <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          style={global.style.themeImage}
          source={require('./icons/char2.png')}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #3</Text>
      <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          style={global.style.themeImage}
          source={require('./icons/char3.png')}
        />
      </TouchableOpacity>

      <Text style={global.style.responseText}>Theme #4</Text>
      <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          style={global.style.themeImage}
          source={require('./icons/char4.png')}
        />
      </TouchableOpacity>




      <TouchableOpacity
        style={global.style.defaultButtonContainer}
        onPress={() => this.props.navigation.navigate('Settings')}
      >
        <Text style={global.style.menuText}>Return</Text>
      </TouchableOpacity>


      <ImageBackground
        style={global.style.icon}
        source={require('./icons/char1.png')}
      />

      </SafeAreaView>
    );
  }

}

export default ThemeScreen
