import React, { useState, useEffect,useContext } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../CustomComponents/CustomButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AuthContext from "../../ReactContext/AuthContext";
const Profile = ({ navigation }) => {
  
  
  const { user } = useContext(AuthContext);
  const userInformation = [
    { label: "userName", value: user.username  },
    { label: "Email", value: user.email},
    { label: "Country", value: user.Country},
    { label: "City", value: user.City},
    { label: "University", value: user.University },
    { label: "Expert ", value: user.Expert },
    { label: "Given Interview ",value: user.GivenInterview },
    { label: "CGPA", value: user.CGPA},
   
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity>
          <View style={styles.profileImageContainer}>
            <Image  source={{ uri: user.ProfilePic }} resizeMode="contain" style={styles.img} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.profileThings}>
        <View style={styles.tableContainer}>
          {userInformation.map((info, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.label}>{info.label}</Text>
              <Text style={styles.value}>{info.value}</Text>
            </View>
          ))}
        </View>
        <CustomButton
          title="Edit Profile"
          onPress={() => navigation.navigate("SetupProfile")}
          buttonStyle={styles.customButtonStyle}
          textStyle={styles.customTextStyle}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0A3A4A",
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
    height: hp('30%'),
    borderRadius: 50
  },
  customButtonStyle: {
    backgroundColor: "#3498db",
    width: wp("80%"),
    marginTop: wp("5%"),
    marginLeft: wp("4%"),
  },
  customTextStyle: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
  profileThings: {
    width: '100%',
    flex: 2,
    marginTop: hp('3%'),
    backgroundColor: '#FFF8F2',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    padding: 20,
    height: hp('80%')

  },
  tableContainer: {
    marginTop: hp('2%'),
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});

export default Profile;
