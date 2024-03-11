import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
//Screens
import { SplashScreen } from "../Screens/SplashScreen";
import { SignInScreen } from "../Screens/Authentication/SignIn";
import { SignUpScreen } from "../Screens/Authentication/SignUp";
import { SetupProfile } from "../Screens/UserPanel/SetUpProfile";
import FieldDetailScreen from "../Screens/UserPanel/FieldScreens/FieldDetailScreen";
import MaterailTabNavigation from "./MaterailTabNavigation";
import { HomeScreen } from "../Screens/UserPanel/HomeScreen";
import Profile from "../Screens/UserPanel/Profile";
import AuthProvider from "../ReactContext/AuthProvider";
import AuthContext from "../ReactContext/AuthContext";
import FieldQuestions from "../Screens/UserPanel/FieldScreens/FieldQuestions";
import ViewAnswer from "../Screens/UserPanel/FieldScreens/ViewAnswer";
import UserContributionScreen from "../Screens/UserPanel/UserContributionsScreen";
import AddQuestion from "../Screens/UserPanel/AddQuestion";
import ViewUserContributedAnswer from "../Screens/UserPanel/ViewUserAnswer";
import AddComment from "../Screens/UserPanel/AddComment";
import NewTrendsScreen from "../Screens/UserPanel/NewTrendScreens/NewTrends";
import Messaging from "../Screens/ExpertInteractionsScreen/ChatsScreens/Messaging";
import CustomerSupport from "../Screens/AdminSupport/CustomerSupport";
import NewTrendScrapScreen from "../Screens/UserPanel/NewTrendScreens/WebScrapping/NewTrendsScrap";
import VideoRecordingScreen from "../Screens/ExpertInteractionsScreen/VideoMessages/VideoRecording";
import PreviewScreen from "../Screens/ExpertInteractionsScreen/VideoMessages/Preview";
import SignUpGoogleScreen from "../Screens/Authentication/SignUpWithGmail/SignUpGoogle";
export default function StackNavigation() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetupProfile"
          component={SetupProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FieldDetailScreen"
          component={FieldDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Profile"
        component={Profile}
        option={{headerShown:false}}
        />
        <Stack.Screen
          name="TabNavigationn"
          component={MaterailTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FieldQuestions"
          component={FieldQuestions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewAnswer"
          component={ViewAnswer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserContributionScreen"
          component={UserContributionScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Addquestion"
          component={AddQuestion}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ViewUserContributedAnswer"
          component={ViewUserContributedAnswer}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddComment"
          component={AddComment}
          options={{ headerShown: false }}
        />       
         <Stack.Screen
          name="NewTrendsScreen"
          component={NewTrendsScreen}
          options={{ headerShown: false }}
        />  
          <Stack.Screen
          name="Messaging"
          component={Messaging}
          options={{ headerShown: true }}
        />  
        <Stack.Screen
          name="CustomerSupport"
          component={CustomerSupport}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="NewTrendScrapScreen"
          component={NewTrendScrapScreen}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="VideoRecordingScreen"
          component={VideoRecordingScreen}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="PreviewScreen"
          component={PreviewScreen}
          options={{ headerShown: false }}
        />  
        <Stack.Screen
          name="SignUpWithGoogle"
          component={SignUpGoogleScreen}
          options={{ headerShown: false }}
        />  
      </Stack.Navigator>
          
      </AuthProvider>
    </NavigationContainer>
  );
}
function TabNavigationWithQuestionBank() {
  return (
    <QuestionBankProvider>
      
    </QuestionBankProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    padding: 10,
  },
});
