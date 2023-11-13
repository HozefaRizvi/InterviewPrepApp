import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image ,Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import { SplashScreen } from '../Screens/SplashScreen';
import { SignInScreen } from '../Screens/Authentication/SignIn';
import { SignUpScreen } from '../Screens/Authentication/SignUp';
import { SetupProfile } from '../Screens/UserPanel/SetUpProfile';
import MaterailTabNavigation from './MaterailTabNavigation';

export default function StackNavigation() {
    const Stack = createStackNavigator();
  return (
   <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name = "SplashScreen" component = {SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "SignInScreen" component = {SignInScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "SignUpScreen" component = {SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "SetupProfile" component = {SetupProfile} options={{headerShown:false}}/>
        <Stack.Screen name = "TabNavigationn" component = {MaterailTabNavigation} options={{headerShown:false}}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    padding: 10,
  },
 
});
