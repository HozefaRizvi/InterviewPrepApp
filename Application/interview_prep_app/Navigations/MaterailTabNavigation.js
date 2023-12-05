import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo Icons
import { StudyQuestionsScreen } from "../Screens/UserPanel/StudyQuestions";
import { HomeScreen } from "../Screens/UserPanel/HomeScreen";
import Community from "../Screens/UserPanel/Community";
import MockInterview from "../Screens/MockInterview/mockinterviewscreen";
import SettingScreen from "../Screens/UserPanel/SettingScreen/settingscreen";

const Tab = createMaterialBottomTabNavigator();

export default function MaterailTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      shifting={true} // Use shifting animation
      activeColor="#fb9678" //  color for active tab
      inactiveColor="#757575" // Gray color for inactive tab
      barStyle={{ backgroundColor: "#ffffff", height: 66 }} // Customize the background color and height
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={20} /> // Use Ionicons
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-people" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="StudyQuestion"
        component={StudyQuestionsScreen}
        options={{
          tabBarLabel: "Contributions",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-book" color={color} size={20} />
          ),
        }}
      />
       <Tab.Screen
        name="Mock Interview "
        component={MockInterview}
        options={{
          tabBarLabel: "Mock Interview ",
          tabBarIcon: ({ color }) => (
            <Ionicons name="tv-outline" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
