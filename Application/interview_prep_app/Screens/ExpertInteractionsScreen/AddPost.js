import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image,Modal} from "react-native";
import { Button, IconButton, Colors } from "react-native-paper";
import { BarIndicator } from 'react-native-indicators'; 
import * as ImagePicker from "expo-image-picker";
import AuthContext from "../../ReactContext/AuthContext";
import { baseurl } from "../../API";

//Firebase
import { uploadBytes,ref,getDownloadURL,uploadString } from "firebase/storage";
import { storage } from "../../Firebase/FirebaseConfig";

export default function AddPostScreen() {
  const { user } = useContext(AuthContext);
  const [postContent, setPostContent] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [postAddedModalVisible, setPostAddedModalVisible] = useState(false);
  const [postButtonText, setPostButtonText] = useState("Post");
  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handlePost = async () => {
    try {
    
      const currentDate = new Date().toISOString();
      setIsPosting(true);
      setPostButtonText("Posting...");
      let downloadURL = ''; 
      if (imageUri) {
        // Generate a unique filename for the image (you may want to use a more sophisticated method)
        const filename = `${user.email}_${Date.now()}.jpeg`;
        const storageRef = ref(storage, `Expert_Posts/${filename}`);
  
        // Convert the image URI to a Blob
        const imageBlob = await fetch(imageUri).then((res) => res.blob());
  
        // Upload the image to Firebase Storage
        const snapshot = await uploadBytes(storageRef, imageBlob);
  
        // Get the download URL for the uploaded image
        downloadURL = await getDownloadURL(snapshot.ref);
  
        console.log('Download URL:', downloadURL);
      }
  

      // Construct the data object to send to the backend
      const postData = {
        post_content: postContent,
        image_url: downloadURL,  // Assuming imageUri is the URL of the image
        publisher_name: user.username,
        post_date: currentDate,
        user_pic:user.ProfilePic,
        likes:0
      };

      // Make a POST request to the Flask backend
      const response = await fetch(encodeURI(`${baseurl}/add_expert_post`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("Post added successfully!");
        setPostAddedModalVisible(true);
        setPostContent(""); // Clear the post content
      } else {
        console.error("Failed to add post:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsPosting(false);
    }
    finally {
      setIsPosting(false);
      setPostButtonText("Post");
    }
  };

  const closePostAddedModal = () => {
    setPostAddedModalVisible(false);
  };
  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Add Post:</Text>
    <TextInput
      style={styles.textInput}
      placeholder="Write your post..."
      multiline
      value={postContent}
      onChangeText={(text) => setPostContent(text)}
    />

    <View style={styles.imageContainer}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <IconButton
        icon="camera"
        size={30}
        onPress={handleChooseImage}
        style={styles.cameraIcon}
      />
    </View>

    <Button
        mode="contained"
        icon="send"
        onPress={handlePost}
        style={styles.postButton}
      >
        {isPosting ? (
          <View style={styles.loadingContainer}>
            <BarIndicator color="#ffffff" />
          </View>
        ) : (
          <Text style={styles.postButtonText}>{postButtonText}</Text>
        )}
      </Button>

    <Modal visible={postAddedModalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Post added successfully!</Text>
          <Button onPress={closePostAddedModal}>OK</Button>
        </View>
      </View>
    </Modal>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    padding: 10,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  cameraIcon: {
    marginLeft: 10,
  },
  postButton: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
