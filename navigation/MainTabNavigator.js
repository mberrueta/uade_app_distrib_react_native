import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import MoviesScreen from '../screens/MoviesScreen'
import SeriesScreen from '../screens/SeriesScreen'
import SettingsScreen from '../screens/SettingsScreen'
import MovieDetailScreen from '../screens/MovieDetailScreen'
import SeriesDetailScreen from '../screens/SeriesDetailScreen'
import Profile from '../screens/Profile'

const MoviesStack = createStackNavigator({
  Movies: MoviesScreen,
  MovieDetails: MovieDetailScreen
})

MoviesStack.navigationOptions = {
  tabBarLabel: 'Movies',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-videocam${focused ? '' : '-outline'}`
          : 'ios-videocam'
      }
    />
  )
}

const SeriesStack = createStackNavigator({
  Series: SeriesScreen,
  SeriesDetails: SeriesDetailScreen
})

SeriesStack.navigationOptions = {
  tabBarLabel: 'Series',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-film' : 'md-film'}
    />
  )
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Team',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-beer' : 'md-beer'}
    />
  )
}

const ProfileStack = createStackNavigator({
  Profile: Profile
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-contact' : 'md-contact'}
    />
  )
}

export default createBottomTabNavigator({
  MoviesStack,
  SeriesStack,
  SettingsStack,
  ProfileStack
})
