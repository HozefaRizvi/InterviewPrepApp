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
import { FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomButton from "../../CustomComponents/CustomButton";
import AuthContext from '../../ReactContext/AuthContext'
import { useNavigation } from "@react-navigation/native";
import Carousel from 'react-native-snap-carousel';
import { Avatar, IconButton, Card, Title, Paragraph } from "react-native-paper";


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
    bgColor: "#77B9F2",
    textColor: "black",
  },
  {
    id: 2,
    title: "DevOps Engineer",
    content:
      "A DevOps engineer introduces processes, tools, and methodologies to balance needs throughout the software development life cycle, from coding and deployment, to maintenance and updates. Maybe you want to shift your career to DevOps, or train yourself to drive adoption within your company.",
    imageUrl: require("../../Logos/database-icon.png"),
    bgColor: "#77B9F2",
    textColor: "black",
  },
  {
    id: 3,
    title: "Quality Assurance Engineer",
    imageUrl: require("../../Logos/requirements-icon.png"),
    content:
      "A software quality assurance engineer, often referred to as a QA engineer, plays an important role in the software development process by ensuring that the final product meets established quality standards. These professionals are responsible for designing and implementing testing processes to identify software defects, inconsistencies, and areas for improvement",
    bgColor: "#77B9F2",
    textColor: "black",
  },
  {
    id: 4,
    title: "Security Engineer",
    imageUrl: require("../../Logos/software-quality.png"),
    content:
      "A security engineer specializes in designing, implementing, and maintaining security measures within an organization's IT infrastructure. They focus on protecting systems, networks, and data from unauthorized access, attacks, and vulnerabilities.",
    bgColor: "#77B9F2",
    textColor: "black",
  },
  {
    id: 5,
    title: "Software Integration Engineer",
    imageUrl: require("../../Logos/softwareEngineering-icon.png"),
    content:
      " software integration engineer is a software engineer who specializes in building software applications that focus on integrating with multiple systems. A software integration engineer is well versed in software development, integration patterns, network protocols, security, and databases. ",
    bgColor: "#77B9F2",
    textColor: "black",
  },
 
];
const newsData = [
  {
    title: "New Trends",
    subtitle: "Check New Trends...",
    iconName: "newspaper-o",
    screenName: "NewTrendsScreen",
  },
  {
    title: "Check Videos",
    subtitle: "Check from Youtube",
    iconName: "youtube-play",
    screenName: "NewTrendScrapScreen",
  },
];
  
export function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  
  const renderCarouselItem = ({ item }) => (
    <FieldCard
      navigation={navigation}
      title={item.title}
      content={item.content}
      bgColor={item.bgColor}
      textColor={item.textColor}
      imageUrl={item.imageUrl}
      onPressButton={() => navigation.navigate("FieldDetailScreen", {
        title: item.title,
        content: item.content,
        imageUrl: item.imageUrl,
      })}
    />
  );
  const renderNewsCarouselItem = ({ item }) => (
    <Card.Title
      title={item.title}
      subtitle={item.subtitle}
      left={(props) => (
        <Avatar.Icon
          {...props}
          icon={() => (
            <FontAwesome name={item.iconName} size={wp("8%")} color="white" />
          )}
          style={styles.avatarStyle}
        />
      )}
      right={(props) => (
        <IconButton {...props} icon="eye" onPress={() => navigation.navigate(item.screenName)} />
      )}
      titleStyle={styles.titleStyle}
      subtitleStyle={styles.subtitleStyle}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image style={styles.profileImage} source={{ uri: user.ProfilePic }} />
        </TouchableOpacity>
        <View style={styles.text}>
              <Text style={styles.welcomeText}>
                Welcome Back {user.username}!
              </Text>
              {user.Expert === "Expert" && (
                <FontAwesome
                  name="check-square"
                  size={wp("8%")}
                  color="#81A649"
                  style={{  marginLeft:20 }}
                />
              )}
        </View>
      </View>
      <Text style={styles.sectionTitle}>News</Text>
     
      <Carousel
        data={newsData}
        renderItem={renderNewsCarouselItem}
        sliderWidth={wp("100%")}
        itemWidth={wp("80%")}
        layout="default"
        loop={true}
      />
      <Text style={styles.sectionTitle}>Software Engineering Fields</Text>

      <Carousel
        data={data}
        renderItem={renderCarouselItem}
        sliderWidth={wp("100%")}
        itemWidth={wp("80%")} // Adjust the width as needed
        layout="default"
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: wp("5%"),
  },
  headerContainer: {
    borderRadius: 20,
    paddingVertical: hp("2%"),
    backgroundColor: "#e8d6b0",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: hp("5%"),
  },  
 
  avatarStyle: {
    backgroundColor: "#ddc288",
    height: hp('5%'),
    width: wp('12%')
  },
  titleStyle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("1%"), // Add margin bottom for spacing between titles
  },
  subtitleStyle: {
    fontSize: wp("3.5%"),
  },
  profileImage: {
    width: wp("16%"),
    height: wp("16%"),
    borderRadius: wp("20%"),
    resizeMode: "cover",
    marginLeft: 14,
  },
  welcomeText: {
    color: "black",
    fontSize: wp("4%"),
    fontWeight: "600",
    marginLeft: wp("3%"),
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: "black",
    fontSize: wp("5%"),
    fontWeight: "700",
    marginTop: hp("2%"),
    marginBottom: hp('3%')
  },
  
  text:{
    flexDirection: 'row',
    alignItems: 'center',
  }
});
