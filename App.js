import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json


import LoginScreen from './screens/Etienne/login';
import HomeScreen from './screens/David/homescreen';
import NeuerFeed from './screens/Felix/neuerfeed';
import Startscreen from './screens/Startscreen';

const RootStack = createStackNavigator(

  {
    Login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    NeuerFeed: {
      screen: NeuerFeed,
    },
    Start: {
      screen: Startscreen,
    }
  },
  {
    initialRouteName: 'Start',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}