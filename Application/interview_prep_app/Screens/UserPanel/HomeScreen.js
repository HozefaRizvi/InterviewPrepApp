import React from "react";
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

const data = [
  {
    id: 1,
    title: "Software Testing",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    imageUrl: require("../../Logos/SoftwareTesting-icon.png"),
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 2,
    title: "Databases",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    imageUrl: require("../../Logos/database-icon.png"),
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 3,
    title: "Software Requirement Engineering",
    imageUrl: require("../../Logos/requirements-icon.png"),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 4,
    title: "Quality",
    imageUrl: require("../../Logos/software-quality.png"),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 5,
    title: "Introduction to Software Engineering",
    imageUrl: require("../../Logos/softwareEngineering-icon.png"),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    bgColor: "#fff",
    textColor: "#64748b",
  },
  {
    id: 6,
    title: "Mobile Application Development",
    imageUrl: require("../../Logos/mobile-dev-icon.png"),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    bgColor: "#fff",
    textColor: "#64748b",
  },
];

export function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={style.container}>
      <View
        style={[
          {
            borderRadius: 10,
            // flexGrow: 1,
            padding: "4% 8%",
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            columnGap: "20%",
            width: "100%",
            marginTop: "5%",
          },
          style.boxWithShadow,
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={style.profileImage}
            source={require("../../Logos/profile.png")}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: "#64748b",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Welcome John Doe
        </Text>

        <Text></Text>
      </View>
      <Text
        style={{
          color: "#64748b",
          fontSize: 20,
          fontWeight: "700",
        }}
      >
        Software Engineering Fields
      </Text>
      {data.map((field) => (
        <View key={field.id}>
          <FieldCard
            navigation={navigation}
            title={field.title}
            content={field.content}
            bgColor={field.bgColor}
            textColor={field.textColor}
            imageUrl={field.imageUrl}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#eee",
    padding: wp("5%"),
    rowGap: "10%",
  },
  profileImage: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("10%"),
    objectFit: "contain",
  },
  boxWithShadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 13,
  },
  // cardContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  // },
  // card: {
  //   width: wp("90%"),
  //   marginBottom: hp("2%"),
  //   marginBottom: "2%",
  // },
  // cardTitle: {
  //   fontSize: wp("4%"),
  //   fontWeight: "bold",
  //   color: "#A68A56",
  // },
  // cardContent: {
  //   fontSize: wp("3.5%"),
  //   color: "#D9D6D2",
  // },
});
