import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome, Ionicons } from "@expo/vector-icons"; // Import FontAwesome and Ionicons
import { useState, useEffect, useContext } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Screens
import PostScreen from "../ExpertInteractionsScreen/Posts";
import ChatScreen from "../ExpertInteractionsScreen/Chats";
import AddPostScreen from "../ExpertInteractionsScreen/AddPost";
import AuthContext from "../../ReactContext/AuthContext";
import AddVideoMessagesScreen from "../ExpertInteractionsScreen/VideoMessages/AddVideoMesage";
import VideoMessagesDisplay from "../ExpertInteractionsScreen/VideoMessages/VideoMessages";
const Tab = createMaterialTopTabNavigator();

export default function Community() {
  const { user } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const animatedValue = useRef(new Animated.Value(0)).current; // Use useRef for animatedValue
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [45, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header */}
      <Animated.View style={{ height: headerHeight }}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: user.ProfilePic }} style={styles.userPic} />
          <Text style={styles.userName}>{user.username}</Text>
          {user.Expert === "Expert" && (
            <Ionicons
              name="checkmark-done-circle"
              size={wp("8%")}
              color="#81A649"
              style={{ marginLeft: 20 }}
            />
          )}
        </View>
      </Animated.View>

      {/* Tab Navigator */}
      <Tab.Navigator
        tabBarOptions={{
          style: { marginTop: headerHeight },
          showLabel: false, // Hide the tab names
        }}
        screenOptions={{ headerShown: false }}
        
        
      >
        <Tab.Screen
          name="Posts"
          component={PostScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list" size={25} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Chats"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={25} color={color} />
            ),
          }}
        />
        {user.Expert === "Expert" && (
          <Tab.Screen
            name="AddPost"
            component={AddPostScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="plus-square" size={25} color={color} />
              ),
            }}
          />
        )}
        {user.Expert === "Expert" && (
          <Tab.Screen
            name="AddVideo"
            component={AddVideoMessagesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="videocam" size={25} color={color} />
              ),
            }}
          />
        )}
        <Tab.Screen
          name="Videos"
          component={VideoMessagesDisplay}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="film" size={25} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginTop:30,
    
  },
  userPic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
