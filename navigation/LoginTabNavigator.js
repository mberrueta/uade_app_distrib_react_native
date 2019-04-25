import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Login from '../screens/Login'

const LoginStack = createStackNavigator({
  Login: Login
})

export default createBottomTabNavigator({
  LoginStack
})
