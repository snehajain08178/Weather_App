/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Weather from './Components/weather';
import Location from './Components/location';
import AppNavigator from './Components/navigator';

class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({});

export default App;
