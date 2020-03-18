import React from 'react';
//import react in our code.
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';

export default class Location extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Longitude: {this.state.currentLongitude}</Text>
        <Text>Latitude: {this.state.currentLatitude}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 16,
    backgroundColor: 'white',
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  },
});
