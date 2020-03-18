import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Weather from './weather';
import SevenDays from './sevenDays';
import Icons from './icon';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Weather">
      <Stack.Screen
          name=" "
          component={Weather}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen name="Icons" component={Icons} />
        <Stack.Screen
          name="SevenDays"
          component={SevenDays}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
