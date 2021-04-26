import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


// Displays different user settings.
class SettingsScreen extends Component {
  constructor(props) {
    super(props);
  }

  // Removes the user token from async storage, thus logging out.
  logOut = async () => {
    await AsyncStorage.removeItem('token')
      .then(token => {
        console.log('Logging out...');
        alert("Logged Out");

      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const { isFocused } = this.props;

    return (
      <SafeAreaView style={global.style.container}>
        <Text style={global.style.contentText}>Adjust your settings here</Text>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress = {() => this.logOut()}
          >
          <Text style={global.style.menuText}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Theme')}
          >
          <Text style={global.style.menuText}>Change Theme?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={global.style.defaultButtonContainer}
          onPress={() => this.props.navigation.navigate('Title')}
          >
          <Text style={global.style.menuText} >Return</Text>
        </TouchableOpacity>

        <Image
          style={global.style.icon}
          source={global.mascot}
        />
      </SafeAreaView>
    );
  }
}

export default function(props) {
  const isFocused = useIsFocused();

  return <SettingsScreen {...props} isFocused={isFocused} />
}
