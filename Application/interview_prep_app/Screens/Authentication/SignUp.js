import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,Modal
} from "react-native";
import CustomButton from "../../CustomComponents/CustomButton";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AuthContext from "../../ReactContext/AuthContext";
import {baseurl} from '../../API'
export function SignUpScreen({ navigation }) {
  const [email, setemail] = useState("");
  const { login, storeQuestionBankData } = useContext(AuthContext);
  
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = baseurl;
  
  const signUpCandidate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/SignUp_Candidate`, {
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

      const data = await response.json();

      if (response.status === 200) {
        // Account created successfully
        login({ email, password, username });
        setModalVisible(true);
      } else if (response.status === 409) {
        // Username or email already exists
        setError("Username or email already exists.");
      } else {
        // Other error
        setError("Error creating account. Please try again.");
      }

      console.log(data);
    } catch (error) {
      console.error(error);
      setError("Error creating account. Please try again.");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setError("");
    navigation.navigate("SetupProfile");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={require("../../Logos/signuplogo.png")}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Sign Up</Text>
            <TextInput
              label="Username"
              required
              value={username}
              onChangeText={(text) => {
                setusername(text);
                setError("");
              }}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: "green",
                },
              }}
            />
            <TextInput
              label="Email"
              value={email}
              require
              onChangeText={(text) => {
                setemail(text);
                setError("");
              }}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: "green",
                },
              }}
            />
            <TextInput
              label="Password"
              value={password}
              require
              secureTextEntry={true}
              onChangeText={(text) => {
                setpassword(text);
                setError("");
              }}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: "green",
                },
              }}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <CustomButton
              title="Sign Up"
              onPress={signUpCandidate}
              buttonStyle={styles.customButtonStyle}
              textStyle={styles.customTextStyle}
            />
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Signup Successful!</Text>
              <CustomButton title="OK" onPress={closeModal} />
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: wp("80%"),
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    alignSelf: "flex-start",
    paddingLeft: wp("0%"),
    marginBottom: hp("2%"),
    fontWeight: "bold",
    color: "#64748b",
  },
  img: {
    width: wp("55%"),
    height: hp("26%"),
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    marginBottom: hp("2%"),
  },
  customButtonStyle: {
    backgroundColor: "#03c9d7",
    width: wp("80%"),
    marginBottom: hp("1%"),
  },
  customTextStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: hp("1%"),
    // marginBottom: hp("10%"),
    paddingBottom: hp("10%"),
  },
  signInText: {
    fontSize: 14,
  },
  signInLink: {
    fontSize: 14,
    color: "#03c9d7",
    fontWeight: "bold",
  },
  modalView: {
    width: wp('80%'), // Set the desired width
  height:  hp('30%'), // Set the desired height
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: [{ translateX: -150 }, { translateY: -100 }], // Adjust half of the width and height
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
