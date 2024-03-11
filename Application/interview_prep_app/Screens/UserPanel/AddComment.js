import React, { useState, useEffect,useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Avatar, Card, Button ,TextInput} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomButton from "../../CustomComponents/CustomButton";
import {PulseIndicator} from 'react-native-indicators';
import AuthContext from "../../ReactContext/AuthContext";
import { baseurl } from "../../API";


export default function AddComment({ route }) {
  const { user } = useContext(AuthContext); 
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const userEmail = user.email;
  const { Question, Answer, Author, Field } = route.params;

  const addComment = async () => {
      try {
          setLoading(true); // Set loading to true when starting the request
          const response = await fetch(encodeURI(`${baseurl}/add_comment`), {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  author: Author,
                  field: Field,
                  question: Question,
                  comment: comment,
                  userEmail: userEmail,
              }),
          });

          const data = await response.json();

          // Handle the response from the backend, you can check for success or display an error message
          if (data.success) {
              console.log("Comment added successfully");
          } else {
              console.error("Failed to add comment: ", data.error_message);
          }
      } catch (error) {
          console.error("Error adding comment: ", error);
      } finally {
          setLoading(false); // Set loading to false when the request is complete (success or failure)
      }
  };

  return (
      <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
          <View style={styles.profileContainer}>
              <TouchableOpacity>
                  <View style={styles.profileImageContainer}>
                      <Image
                          source={require("../../Logos/questionlogo.png")}
                          resizeMode="contain"
                          style={styles.img}
                      />
                  </View>
              </TouchableOpacity>
          </View>
          <View style={styles.profileThings}>
              <Text style={styles.heading}>Add Comment:</Text>
              <TextInput
                  label="Comment"
                  value={comment}
                  onChangeText={(text) => {
                      setComment(text);
                  }}
                  mode="outlined"
                  style={styles.input}
                  theme={{
                      colors: {
                          primary: "#716FA6",
                      },
                  }}
              />
              <CustomButton
                  title={"Add Comment"}
                  onPress={addComment}
                  buttonStyle={styles.customButtonStyle}
                  textStyle={styles.customTextStyle}
              />
              {loading && (
                  <PulseIndicator
                      color="#716FA6"
                      size={50}
                      style={{ marginTop: hp("2%") }}
                  />
              )}
          </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#716FA6",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: wp("5%"),
  },
  profileContainer: {
    alignItems: "center",
    marginTop: wp("5%"),
  },
  profileImageContainer: {
    alignItems: "center",
  },
  img: {
    width: wp("60%"),
    height: hp("20%"),
    borderRadius: wp("20%"),
    marginTop:hp('7%')
  },
  profileThings: {
    width: "100%",
    flex: 2,
    marginTop: hp("3%"),
    backgroundColor: "#D0D9F2",
    borderTopStartRadius: wp("10%"),
    borderTopEndRadius: wp("10%"),
    padding: wp("5%"),
    height: hp("80%"),
  },
  tableContainer: {
    flex: 1,
  },
  heading: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    marginBottom: wp("3%"),
    marginTop:wp('2%')
  },
  card: {
    marginBottom: wp("5%"),
  },
  cardTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "black", // Change the color as needed
  },
  cardSubtitle: {
    fontSize: wp("4%"),
    color: "black", // Change the color as needed
  },
  subheading:{
    fontSize: wp("5%"),
    
    marginBottom: wp("4%"),
    marginTop: wp("2%"),
  },
  input: {
    height:hp("9%")
  },
  input1: {
    height:hp("10%")
  },
  customButtonStyle: {
    backgroundColor: "#716FA6",// #03c9d7
    width: wp("90%"),
    marginTop: hp("7%"),
    
  },
  customTextStyle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    
  },
 
});
