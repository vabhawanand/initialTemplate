import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../screens/landing_screen';
import LoginScreen from '../screens/login_screen';
import RegisterScreen from '../screens/register_screen';
import HomeScreen from '../screens/home_screen';
import ForgotPasswordScreen from '../screens/forgot_password_screen';
import ResetPasswordScreen from '../screens/reset_password_screen';
import VerifyEmailScreen from '../screens/verify_email_screen';

// Deeplinking
import linking from '../deeplink';

const StackScreen = createStackNavigator();

const AppStack = () => {
  const auth = useSelector(state => state.authReducer.user);
  return (
    <>
      {auth === null || auth === undefined ? (
        <StackScreen.Navigator initialRouteName={'landing'}>
          <StackScreen.Screen
            name="landing"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <StackScreen.Screen
            name="login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <StackScreen.Screen
            name="forgot"
            component={ForgotPasswordScreen}
            options={{headerShown: false}}
          />
          <StackScreen.Screen
            name="reset"
            component={ResetPasswordScreen}
            options={{headerShown: false}}
            initialParams={{}}
          />
          <StackScreen.Screen
            name="verifyemail"
            component={VerifyEmailScreen}
            options={{headerShown: false}}
            initialParams={{}}
          />
          <StackScreen.Screen
            name="register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
        </StackScreen.Navigator>
      ) : (
        <StackScreen.Navigator initialRouteName={'landing'}>
          <StackScreen.Screen
            name="home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </StackScreen.Navigator>
      )}
    </>
  );
};
const Navigation = () => {
  // const dispatch = useDispatch();
  React.useEffect(() => {
    /* Perform inital actions if required to get meta data for the app  */
  }, []);
  return (
    <NavigationContainer linking={linking}>
      <AppStack />
    </NavigationContainer>
  );
};
export default Navigation;
