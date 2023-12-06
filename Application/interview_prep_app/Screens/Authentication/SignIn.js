import { StatusBar } from "expo-status-bar";
import { useEffect, useState,useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,ActivityIndicator
} from "react-native";
import CustomButton from "../../CustomComponents/CustomButton";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AuthContext from '../../ReactContext/AuthContext'
import {UIActivityIndicator,} from 'react-native-indicators';
import { LogBox } from 'react-native';
import { baseurl } from "../../API";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
export function SignInScreen({ navigation }) 
{
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { login, storeQuestionBankData } = useContext(AuthContext);
  const [error, seterror] = useState('');
  const API_BASE_URL = baseurl;
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    try {
      setLoading(true); 
      const response = await fetch(`${API_BASE_URL}/SignIn_Candidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = data.UserData;
        const profileData = userData[0].Profile || {};
        setLoading(false);

        // Store user information in the context
        login({
          email: userData[0].Email,
          username: userData[0].UserName,
          isSetupProfile: userData[0].isSetupProfile,
          ...profileData,
        });

        // Navigate based on the user's profile setup status
        if (userData[0].isSetupProfile) {
          navigation.navigate('TabNavigationn');
        } else {
          navigation.navigate('SetupProfile');
        }
      } else {
        // Handle authentication failure
        console.log('Authentication failed:', data.Message);
        seterror('Authentication failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      seterror('An unexpected error occurred');
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
        
          <Image
            style={styles.img}
            resizeMode="contain"
            source={require("../../Logos/loginlogo.png")}
          />
            <Text style={styles.text}>Sign In</Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setemail(text);
              }}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: "blue",
                },
              }}
              right={<FontAwesome
                name="lightbulb-o"
                size={wp("6%")}
                color="white"
              />}
            />
            <TextInput
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => {
                setpassword(text);
              }}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: "blue",
                },
              }}
            />
             {error ? <Text style={styles.errorText}>{error}</Text> : null}
             {loading ? (
              <UIActivityIndicator color='blue' size={60}/>
          ) : (
            <CustomButton
              title="Sign In"
              onPress={handleSignIn}
              buttonStyle={styles.customButtonStyle}
              textStyle={styles.customTextStyle}
            />
          )}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#03c9d7",// #03c9d7
    width: wp("80%"),
    marginBottom: hp("1%"),
    
  },
  customTextStyle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: hp("1%"),
    marginBottom:"8%"
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    color: "#03c9d7",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
