import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Login from '../screens/Login';


const LoginStack = createStackNavigator({
  Login: Login
});

export default createBottomTabNavigator({
    LoginStack
});
