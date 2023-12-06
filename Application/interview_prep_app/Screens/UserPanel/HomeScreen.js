import React, { useState, useEffect ,useContext} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FieldCard } from "../../CustomComponents/FieldCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomButton from "../../CustomComponents/CustomButton";
import AuthContext from '../../ReactContext/AuthContext'
import { useNavigation } from "@react-navigation/native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const data = [
  {
    id: 1,
    title: "CRM Project Manager",
    content:
      "The job involves developing project plans, managing project resources, and ensuring that projects are delivered on time and within budget. A CRM project manager should have a degree in business, information technology, or a related field and possess excellent project management skills.",
    imageUrl: require("../../Logos/SoftwareTesting-icon.png"),
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 2,
    title: "Devops Engineer",
    content:
      "A DevOps engineer introduces processes, tools, and methodologies to balance needs throughout the software development life cycle, from coding and deployment, to maintenance and updates. Maybe you want to shift your career to DevOps, or train yourself to drive adoption within your company.",
    imageUrl: require("../../Logos/database-icon.png"),
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 3,
    title: "Quality Assurance Engineer",
    imageUrl: require("../../Logos/requirements-icon.png"),
    content:
      "A software quality assurance engineer, often referred to as a QA engineer, plays an important role in the software development process by ensuring that the final product meets established quality standards. These professionals are responsible for designing and implementing testing processes to identify software defects, inconsistencies, and areas for improvement",
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 4,
    title: "Security Engineer",
    imageUrl: require("../../Logos/software-quality.png"),
    content:
      "A security engineer specializes in designing, implementing, and maintaining security measures within an organization's IT infrastructure. They focus on protecting systems, networks, and data from unauthorized access, attacks, and vulnerabilities.",
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 5,
    title: "Software Integration Engineer",
    imageUrl: require("../../Logos/softwareEngineering-icon.png"),
    content:
      " software integration engineer is a software engineer who specializes in building software applications that focus on integrating with multiple systems. A software integration engineer is well versed in software development, integration patterns, network protocols, security, and databases. ",
    bgColor: "#fff",
    textColor: "#64748b",
  },
 
];
 
  
export function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          style={styles.profileImage}
          source={{ uri: user.ProfilePic }}
        />
      </TouchableOpacity>

      <Text style={styles.welcomeText}>Welcome Back {user.username}!</Text>
    </View>

    <Text style={styles.sectionTitle}>Software Engineering Fields</Text>
    
    {data.map((field) => (
      <View key={field.id}>
        <FieldCard
          navigation={navigation}
          title={field.title}
          content={field.content}
          bgColor={field.bgColor}
          textColor={field.textColor}
          imageUrl={field.imageUrl}
          onPressButton={() => navigation.navigate("FieldDetailScreen", {
            title: field.title,
            content: field.content,
            imageUrl: field.imageUrl,
          })}
        />
      </View>
    ))}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#eee",
    padding: wp("5%"),
  },
  headerContainer: {
    borderRadius: 20,
    paddingVertical: hp("2%"),
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: hp("5%"),
  },
  profileImage: {
    width: wp("16%"),
    height: wp("16%"),
    borderRadius: wp("10%"),
    resizeMode: "contain",
    marginLeft:14
  },
  welcomeText: {
    color: "black",
    fontSize: wp("4%"),
    fontWeight: "600",
    marginLeft: wp("2%"),
    fontWeight:'bold',
    
  },
  sectionTitle: {
    color: "#64748b",
    fontSize: wp("5%"),
    fontWeight: "700",
    marginTop: hp("2%"),
    marginBottom:hp('3%')
  },
});
