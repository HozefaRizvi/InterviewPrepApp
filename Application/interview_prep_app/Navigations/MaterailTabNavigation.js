import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from '../Screens/UserPanel/HomeScreen';
import { StudyQuestionsScreen } from '../Screens/UserPanel/StudyQuestions';

const Tab = createMaterialBottomTabNavigator();

export default function MaterailTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      shifting={true} // Use shifting animation
      activeColor="#4CAF50" // Green color for active tab
      inactiveColor="#757575" // Gray color for inactive tab
      barStyle={{ backgroundColor: '#ffffff', height: 86 }} // Customize the background color and height
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="StudyQuestion"
        component={StudyQuestionsScreen}
        options={{
          tabBarLabel: 'Study Bank',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={24} />
          ),
        }}
      />
      {/* Add more Tab.Screen components for additional tabs */}
    </Tab.Navigator>
  );
}
