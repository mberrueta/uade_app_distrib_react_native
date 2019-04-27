import { createStackNavigator } from 'react-navigation'
import Login from '../screens/Login'
import ChangePassword from '../screens/ChangePassword'

const LoginStack = createStackNavigator({
  Login: Login,
  ChangePassword: ChangePassword
})

export default LoginStack