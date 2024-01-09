import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import ForgotPasswordScreen from '../src/screens/ForgotPassword';
import ForgotUserScreen from '../src/screens/ForgotUser';
import  ActivationScreen  from '../src/screens/activation-screen';
import  TermsScreen  from '../src/screens/terms-screen';

const Stack = createNativeStackNavigator();

export default function UnauthenticatedStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signup_screen" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="forgot_password" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="forgot_user" component={ForgotUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="terms" component={TermsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="activation" component={ActivationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
