import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import { Button as PaperButton } from "react-native-paper";
import AuthContext from "../../../ReactContext/AuthContext";
import { Video } from 'expo-av'
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'

const VideoRecordingScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicroPhonePermission, setHasMicroPhonePermission] = useState(false);
  let cameraRef = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicroPhonePermission(microphonePermission.status === "granted");
    })();
  }, []);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (!hasCameraPermission || !hasMicroPhonePermission) {
    return <Text>Permissions not granted...</Text>;
  }

  const recordVideo = async () => {
    setIsRecording(true);
    let options = {
      quality: "1080p",
      maxDuration: 60,
      mute: false
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  if (video) {
    const shareVideo = async () => {
      await shareAsync(video.uri);
      setVideo(undefined);
    };

    const saveVideo = async () => {
      await MediaLibrary.saveToLibraryAsync(video.uri);
      setVideo(undefined);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity onPress={shareVideo}>
            <Ionicons name="ios-share" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveVideo}>
            <Ionicons name="ios-save" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVideo(undefined)}>
            <Ionicons name="ios-trash" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PreviewScreen', { videoRecorded: video })}>
            <Ionicons name="ios-play-circle" size={50} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} type={cameraType}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.recordButton} onPress={isRecording ? stopRecording : recordVideo}>
            <FontAwesome name={isRecording ? "stop-circle" : "circle"} size={70} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleCameraButton} onPress={toggleCameraType}>
            <FontAwesome name="refresh" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
      },
      camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginLeft: 150,
      },
      recordButton: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      },
      toggleCameraButton: {
        backgroundColor: 'transparent',
        alignItems: 'right',
        justifyContent: 'right',
        margin:70
        
      },
  video: {
    flex: 1,
    alignSelf: 'stretch'
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default VideoRecordingScreen;
