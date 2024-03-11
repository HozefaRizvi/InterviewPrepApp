import React, { useState, useEffect ,useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList
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
import { FixedSizeList as List } from "react-window";
import DropDown from 'react-native-paper-dropdown';

//firebase
import { uploadBytes,ref,getDownloadURL,uploadString } from "firebase/storage";
import { storage } from "../../Firebase/FirebaseConfig";
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
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [firebaseurl,setfirebaseurl] = useState(null)

 
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      console.log(result.uri)
      setProfileImage(result.uri)
    }
  };
  
  
  
  const handleProfileSetup = async () => {
    try {
      let downloadURL = '';  // Initialize downloadURL
  
      // Check if profileImage is not empty
      if (profileImage) {
        // Generate a unique filename for the image (you may want to use a more sophisticated method)
        const filename = `${user.email}_${Date.now()}.jpeg`;
        const storageRef = ref(storage, `profile_images/${filename}`);
  
        // Convert the image URI to a Blob
        const imageBlob = await fetch(profileImage).then((res) => res.blob());
  
        // Upload the image to Firebase Storage
        const snapshot = await uploadBytes(storageRef, imageBlob);
  
        // Get the download URL for the uploaded image
        downloadURL = await getDownloadURL(snapshot.ref);
  
        console.log('Download URL:', downloadURL);
      }
  
  
      // Continue with the rest of your code for profile setup
  
      // Create the profileData object
      const profileData = {
        ProfilePic: downloadURL || '', // Set default value if profileImage is empty
        University: university,
        Country: selectedCountry,
        City: selectedCity,
        CGPA: cgpa,
        Expert: expertChecked ? 'Expert' : 'Candidate',
        GivenInterview: interviewChecked ? 'Yes' : 'No',
        isSetupProfile: true
      };
  
      // Make the API call to store the profile data
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
  
      // Handle the API response
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
 
  const fetchCountriesData = async () => {
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries");
      const data = await response.json();
    
      if (!data.error) {
        setCountriesData(data.data);
       
      }
    } catch (error) {
      console.error("Error fetching countries data:", error);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const openCountryModal = () => {
    setCountryModalVisible(true);
  };

  const closeCountryModal = () => {
    setCountryModalVisible(false);
  };

  const openCityModal = () => {
    setCityModalVisible(true);
  };

  const closeCityModal = () => {
    setCityModalVisible(false);
  };


  
  const renderItemBox = ({ item, selectedValue, onSelect }) => (
    <TouchableOpacity
      style={[
        styles.itemBox,
        { backgroundColor: item === selectedValue ? "#3498db" : "#fff" },
      ]}
      onPress={() => onSelect(item)}
    >
      <Text style={{ color: item === selectedValue ? "#fff" : "#000" }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  
  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={() => {
        setSelectedCountry(item.country);
        closeCountryModal();
      }}
    >
      <Text style={styles.itemBoxText}>{item.country}</Text>
    </TouchableOpacity>
  );
  
  const renderCityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemBox}
      onPress={() => {
        setSelectedCity(item);
        closeCityModal();
      }}
    >
      <Text style={styles.itemBoxText}>{item}</Text>
    </TouchableOpacity>
  );
  
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

    {/* Country Dropdown */}
    {countriesData.length > 0 ? (
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select Country</Text>
          <TouchableOpacity onPress={openCountryModal}>
            <Text style = {{fontSize:20}}>{selectedCountry || "Select Country"}</Text>
          </TouchableOpacity>
          <Modal visible={countryModalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <FlatList
                data={countriesData}
                keyExtractor={(item) => item.country}
                renderItem={renderCountryItem}
                style = {{ backgroundColor:'#DEE0D5',padding:2,marginBottom:1}}
              />
              <TouchableOpacity onPress={closeCountryModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      ) : (
        <Text>Loading countries...</Text>
      )}
      {selectedCountry && (
        <View style={styles.citydropdownContainer}>
          <Text style={styles.dropdownLabel}>City</Text>
          <TouchableOpacity onPress={openCityModal}>
            <Text style = {{fontSize:20}}>{selectedCity || "Select City"}</Text>
          </TouchableOpacity>
          <Modal visible={cityModalVisible} animationType="slide">
              <View style={styles.modalContainer}>
                <FlatList
                  data={countriesData.find((country) => country.country === selectedCountry)?.cities}
                  keyExtractor={(item) => item}
                  renderItem={renderCityItem}
                  
                />
                <TouchableOpacity onPress={closeCityModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
        </View>
      )}

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
  dropdownContainer: {
    marginBottom: hp("2%"),
    borderRadius: wp("2%"),
    padding: wp("1%"),
    marginRight: wp('50%')
  },
  citydropdownContainer:{
    marginBottom: hp("2%"),
    borderRadius: wp("2%"),
    padding: wp("1%"),
    marginRight: wp('60%')
  },
  dropdownLabel: {
    marginBottom: hp("1%"),
    color: "#3498db",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: wp("4%"),
  },
  closeButton: {
    marginTop: hp("2%"),
    alignItems: "center",
  },
  closeButtonText: {
    color: "#3498db",
    fontSize: 16,
  },
  itemBox: {
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: wp("2%"),
    padding: wp("2%"),
    marginVertical: hp("1%"),
    alignItems: "center",
    backgroundColor: "#fff", // Add a background color to make it stand out
  },
  itemBoxText: {
    color: "#3498db",
    fontSize: 16,
  },
});
