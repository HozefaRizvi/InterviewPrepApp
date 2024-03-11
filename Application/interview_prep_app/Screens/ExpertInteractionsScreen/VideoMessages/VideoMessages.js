import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity,Text } from "react-native";
import { Video } from "expo-av";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Ionicons } from '@expo/vector-icons';
import AuthContext from "../../../ReactContext/AuthContext";
import { storage } from "../../../Firebase/FirebaseConfig";
import { AntDesign } from '@expo/vector-icons'; // Assuming you are using Expo for icons, and import the refresh icon from AntDesign

const VideoMessagesDisplay = ({ route, navigation }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Convert storage bucket URLs to download URLs
  const convertStorageURLToDownloadURL = async (storageURL) => {
    const gsReference = ref(storage, storageURL);
    return getDownloadURL(gsReference);
  };
  const fetchVideos = async () => {
    const videosRef = ref(storage, "Expert_VideoMessages");
    const videoList = [];

    try {
      const videoFiles = await listAll(videosRef);

      for (const file of videoFiles.items) {
        const storageURL = file.fullPath;
        const videoURL = await convertStorageURLToDownloadURL(storageURL);
        videoList.push({ uri: videoURL, key: storageURL });
      }
      videoList.sort(() => Math.random() - 0.5);
      
      setVideos(videoList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const playNextVideo = () => {
    setLoading(true)
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("No more videos");
    }
    setLoading(false)
  };

  const playPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    } else {
      console.log("Already at the first video");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <View style={styles.videoContainer}>
        {videos && videos.length > 0 && currentVideoIndex !== undefined && videos[currentVideoIndex] ? (
            <Video
            source={{ uri: videos[currentVideoIndex].uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls
            style={styles.video}
            />
        ) : (
           
            <Text >No video available</Text> 
        )}
    </View>
      <TouchableOpacity  style={styles.arrowIconContainer}>
        <Ionicons name="ios-arrow-forward" size={36} color="black" onPress={playNextVideo}/>
        <AntDesign name="reload1" size={24} color="black" onPress={fetchVideos} />
        <Ionicons name="ios-arrow-back" size={36} color="black"  onPress={playPreviousVideo}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  arrowIconContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
   
  },
});

export default VideoMessagesDisplay;
