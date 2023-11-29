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
import {WaveIndicator} from 'react-native-indicators';
import AuthContext from "../../ReactContext/AuthContext";
export default function AddQuestion({ route }) {
    const {field,value,selectedSegmentLabel} = route.params
    const [question, setquestion] = useState("");
    const [answer, setanswer] = useState("");
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const userEmail = user.email
    const selectedField = field
    const selectedtype = value
    const [message,setmessage]= useState("Add Question to Repository")
    const onPressAddQuestion =async  ()=>{
      
       const UserContributedQuestion = {
          ChoosenField: field,
          ChoosenType: value,
          Question : question,
          Answer: answer,
          Author: user.email
       }
       try {
        const response = await fetch('http://192.168.18.5:5001/add_userbased_questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            QuestionData: UserContributedQuestion,
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log('Added : ', data);
          setmessage("Added Successfully")
         
        } else {
          console.log('NOt Added', data);
          setmessage("Failed to Addd")

        }
      } catch (error) {
        console.error('Error added:', error);
        setmessage("Failed to Add")
      }
    }
  return(
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
      <Text style = {styles.heading}>Add Question:</Text>
        <TextInput
        label="Question"
        value={question}
        onChangeText={(text) => {
          setquestion(text);
        }}
        mode="outlined"
        style={styles.input}
        theme={{
          colors: {
            primary: "#716FA6",
          },
        }}
        />
         <Text style = {styles.heading}>Add Answer:</Text>
        <TextInput
        label="Answer"
        value={answer}
        onChangeText={(text) => {
          setanswer(text);
        }}
        mode="outlined"
        style={styles.input1}
        theme={{
          colors: {
            primary: "#716FA6",
          },
        }}
        />
       
            <CustomButton
              title={message}
              onPress={onPressAddQuestion}
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
