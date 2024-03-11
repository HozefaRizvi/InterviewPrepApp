import React, { useContext, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Video } from "expo-av";
import { Button as PaperButton } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { storage } from "../../../Firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AuthContext from "../../../ReactContext/AuthContext";

const PreviewScreen = ({ route, navigation }) => {
  const { videoRecorded } = route.params;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const postVideo = async () => {
    try {
      setLoading(true);

      const filename = `${user.email}_${Date.now()}.mp4`; // Adjust the file extension as needed
      const storageRef = ref(storage, `Expert_VideoMessages/${filename}`);

      // Convert the video URI to a Blob
      const videoBlob = await fetch(videoRecorded.uri).then((res) => res.blob());

      // Upload the video to Firebase Storage
      const snapshot = await uploadBytes(storageRef, videoBlob);

      // Get the download URL for the uploaded video
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("Video uploaded successfully. Download URL:", downloadURL);

      setSuccess(true);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: videoRecorded.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PaperButton icon="send" onPress={postVideo} disabled={loading || success}>
          Post Video
        </PaperButton>
      </View>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Uploading...</Text>
        </View>
      )}
      {success && (
        <View style={styles.overlay}>
          <Text>Video uploaded successfully!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  videoContainer: {
    height: 840, // Set the desired height of the video container
    backgroundColor: "black", // Set a background color if needed
  },
  video: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

export default PreviewScreen;
