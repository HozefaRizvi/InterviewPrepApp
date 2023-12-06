import React, { useState, useEffect ,useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LogBox } from 'react-native';
import {baseurl} from '../../API'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../CustomComponents/CustomButton";
import AuthContext from '../../ReactContext/AuthContext'
export function SetupProfile({ navigation }) {
  const [university, setUniversity] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [cgpa, setCGPA] = useState("");
  const [expertChecked, setExpertChecked] = useState(false);
  const [interviewChecked, setInterviewChecked] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
 
  const API_BASE_URL = baseurl;
  useEffect(() => {
    // Request permission to access the gallery
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access gallery was denied");
      }
    })();
  }, []);

  const pickImage = async () => {
    // Launch ImagePicker to choose an image from the gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };
  const handleProfileSetup = async () => {
    const profileData = {
      ProfilePic: profileImage || '',
      University: university,
      Country: country,
      City: city,
      CGPA: cgpa,
      Expert: expertChecked ? 'Expert' : 'Candidate',
      GivenInterview: interviewChecked ? 'Yes' : 'No',
      isSetupProfile: true
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/SetupProfile_Candidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: user.email,
          ProfileData: profileData,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Profile set up successfully:', data.Message);
        // Navigate to the next screen (e.g., Tab Navigator)
        login({
          ...user,
          Profile: profileData,
        });
        navigation.navigate('SignInScreen');
      } else {
        // Handle profile setup failure
        console.log('Profile setup failed:', data.Message);
        // You might want to show an error message to the user or handle it accordingly
      }
    } catch (error) {
      console.error('Error during profile setup:', error);
      // Handle error
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require("../../Logos/upload.png")}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.uploadText}>Upload Profile Picture</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.headingText}>Setup Profile</Text>

        <TextInput
          label="Univeristy?"
          value={university}
          onChangeText={(text) => setUniversity(text)}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: "#3498db" } }}
        />

        <TextInput
          label="Country"
          value={country}
          onChangeText={(text) => setCountry(text)}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: "#3498db" } }}
        />

        <TextInput
          label="City"
          value={city}
          onChangeText={(text) => setCity(text)}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: "#3498db" } }}
        />

        <TextInput
          label="CGPA out of 4"
          value={cgpa}
          onChangeText={(text) => setCGPA(text)}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: "#3498db" } }}
        />

        <RadioButton.Group
          onValueChange={(newValue) => setExpertChecked(newValue === "Expert")}
          value={expertChecked ? "Expert" : "Candidate"}
        >
          <View style={styles.radioButtonContainer}>
            <RadioButton.Item label="Expert" value="Expert" color="#3498db" />
            <RadioButton.Item
              label="Candidate"
              value="Candidate"
              color="#3498db"
            />
          </View>
        </RadioButton.Group>

        <RadioButton.Group
          onValueChange={(newValue) => setInterviewChecked(newValue === "Yes")}
          value={interviewChecked ? "Yes" : "No"}
        >
          <View style={styles.radioButtonContainer}>
            <Text>Given an interview?</Text>
            <RadioButton.Item label="Yes" value="Yes" color="#3498db" />
            <RadioButton.Item label="No" value="No" color="#3498db" />
          </View>
        </RadioButton.Group>

        <CustomButton
          title="Setup Profile"
          onPress={handleProfileSetup}
          buttonStyle={styles.customButtonStyle}
          textStyle={styles.customTextStyle}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom:'100%',
    paddingBottom:'90%'

  },
  profileContainer: {
    alignItems: "center",
    marginTop: hp("5%"),
  },
  profileImageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("15%"),
    marginBottom: hp("2%"),
  },
  uploadText: {
    color: "#3498db",
    fontSize: 16,
  },
  inputContainer: {
    width: wp("85%"),
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: wp("5%"),
    borderRadius: wp("2%"),
    elevation: 3,
  },
  headingText: {
    fontSize: 22,
    alignSelf: "flex-start",
    paddingLeft: wp("0%"),
    marginBottom: hp("2%"),
    fontWeight: "bold",
    color: "#3498db",
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    marginBottom: hp("2%"),
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  customButtonStyle: {
    backgroundColor: "#3498db",
    width: wp("80%"),
    marginBottom: hp("2%"),
  },
  customTextStyle: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});
