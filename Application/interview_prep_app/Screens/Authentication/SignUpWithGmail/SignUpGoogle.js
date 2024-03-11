import React, { useState ,useEffect} from "react";
import { View, TextInput, StyleSheet,Image } from "react-native";
import { Button, Text, Avatar } from "react-native-paper";
import { FontAwesome, Feather } from 'react-native-vector-icons';
import { db ,auth} from "../../../Firebase/FirebaseConfig";
import { baseurl } from "../../../API";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { sendEmailVerification, createUserWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
const SignUpGoogleScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setVerificationStatus("Email verified successfully!");
      }
    });

    return () => unsubscribe();
  }, []);
  const handleVerifyEmail = async () => {
    try {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      setVerificationStatus("Verification email sent!");
    } catch (error) {
      console.error("Error during email verification:", error.message);
      setVerificationStatus(`Error: ${error.message}`);
    }
  };
  const handleSignUp = async () => {
    try {
      // Perform the API call with the provided data
      const response = await fetch(`${baseurl}/SignUp_Candidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: username,
          Email: email,
          Password: password,
          isSetupProfile: false,
        }),
      });
      if (response.ok) {
        
       setVerificationStatus('Account created successfully!');
      
      } else {
       
        setVerificationStatus('Error during SignUp:', response.statusText);
       
      }
    } catch (error) {
      setVerificationStatus('Error during SignUp:', error.message);
   
    }
  };
  return (
    <View style={styles.container}>
      <Image
      source={require('../../../Logos/signupgoogle.png')}
      style ={styles.avatar}
      />
      <View style={styles.inputContainer}>
      <Text style={styles.text}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
          <Button
        mode="contained"
        onPress={handleVerifyEmail}
        style={styles.verifyEmailButton}
        labelStyle={styles.buttonText}
      >
        Verify Email
      </Button>
      {verificationStatus && (
        <Button
          mode="contained"
          onPress={handleSignUp}
          style={styles.signUpButton}
          labelStyle={styles.buttonText}
        >
          Sign Up
        </Button>
      )}
    
      {verificationStatus && <Text style={styles.message}>{verificationStatus}</Text>}
      </View>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", 
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 22,
    alignSelf: "flex-start",
    paddingLeft: wp("0%"),
    marginBottom: hp("2%"),
    fontWeight: "bold",
    color: "#64748b",
  },
  avatar: {
    resizeMode:'cover',
    marginTop: 100,
  },
  inputContainer: {
    width: "100%",
 
    marginBottom:350
  
  },
  input: {
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#F2F2F2", // Light gray background
    borderRadius: 8,
  },
  verifyEmailButton: {
    backgroundColor: "#4F8EF7",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
    width: "100%", // Make button full-width
  },
  signUpButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: "100%", // Make button full-width
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    color: "#4F8EF7",
    fontSize: 16,
  },
});

export default SignUpGoogleScreen;
