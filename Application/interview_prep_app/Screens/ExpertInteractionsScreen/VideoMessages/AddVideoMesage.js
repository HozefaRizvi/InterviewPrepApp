import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Title, Button, Paragraph } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import AuthContext from "../../../ReactContext/AuthContext";

const AddVideoMessagesScreen = ({navigation}) => {
  const { user } = useContext(AuthContext);
  

  return (
    <View style={styles.container}>
      <Title style={styles.heading}>Add Video Messages</Title>
      <Paragraph style={styles.tutorialText}>
        Welcome to the Video Messages feature! Here, you can share your expert insights with candidates through recorded videos.
        To record a video message, follow these steps:
      </Paragraph>

      <Paragraph style={styles.step}>
        <FontAwesome name="circle" size={12} color="#4CAF50" /> Tap the "Record Video Message" button below.
      </Paragraph>

      <Paragraph style={styles.step}>
        <FontAwesome name="circle" size={12} color="#4CAF50" /> Prepare your thoughts and start speaking when ready.
      </Paragraph>

      <Paragraph style={styles.step}>
        <FontAwesome name="circle" size={12} color="#4CAF50" /> After recording, you can preview the video and choose to save it.
      </Paragraph>

      <Paragraph style={styles.benefits}>
        Recording video messages allows you to connect with candidates on a personal level, providing valuable insights and guidance.
        It's an effective way to share your expertise and make a positive impact on their journey.
      </Paragraph>
      <Button
        icon={({ size, color }) => (
          <FontAwesome name="video-camera" size={size} color={color} />
        )}
        mode="contained"
        style={styles.recordButton}
        onPress={()=>navigation.navigate('VideoRecordingScreen')}
      >
        Record Video Message
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tutorialText: {
    marginBottom: 16,
  },
  step: {
    marginLeft: 16,
    marginBottom: 8,
  },
  benefits: {
    marginTop: 16,
    fontStyle: 'italic',
    color: "#666",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  recordButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50", // Customize the button color
  },
});

export default AddVideoMessagesScreen;
