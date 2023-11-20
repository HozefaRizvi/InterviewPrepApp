import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import CustomButton from "../../CustomComponents/CustomButton";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function SignUpScreen({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

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
              value={username}
              onChangeText={(text) => {
                setusername(text);
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
              onChangeText={(text) => {
                setemail(text);
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
              secureTextEntry={true}
              onChangeText={(text) => {
                setpassword(text);
              }}
              mode="outlined"
              style={styles.input}
              theme={{
                colors: {
                  primary: "green",
                },
              }}
            />
            <CustomButton
              title="Sign Up"
              onPress={() => console.log("Sign Up")}
              buttonStyle={styles.customButtonStyle}
              textStyle={styles.customTextStyle}
            />
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignInScreen")}
              >
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
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
});
