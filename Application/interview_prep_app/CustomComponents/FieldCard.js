import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "./CustomButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function FieldCard({
  navigation,
  title,
  content,
  viewUrl,
  imageUrl,
  bgColor,
  textColor,
}) {
  const style = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: "#eee"
    },
    cardContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      // flexGrow: 1,
      padding: "4% 8%",
      backgroundColor: `${bgColor}`,
      flexDirection: "row",
      alignItems: "center",
      columnGap: "20%",
      width: "100%",
    },
    headingTextStyling: {
      color: `${textColor}`,
      fontSize: 20,
      fontWeight: "600",
      // fontFamily: "poppins"
    },
    contentTextStyling: {
      marginTop: 5,
      color: `${textColor}`,
      fontSize: 12,
      width: "25%",
      // fontFamily: "poppins"
    },
    btnView: {
      color: "#1d4ed8",
      fontSize: 11,
      fontWeight: "600",
      width: "100%",
      marginTop: "1%",

      borderColor: "#1d4ed8",
      borderRadius: 2,
    },
    boxWithShadow: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.10,
      shadowRadius: 6,
      elevation: 13,
    },
    customButtonStyle: {
      backgroundColor: "#03c9d7", // #03c9d7
      marginLeft: "17%",
      width: wp("20%"),
      marginTop: wp("1%"),
    },
    customTextStyle: {
      color: "white",
      fontSize: 12,
      textAlign: "center",
      fontWeight: "600",
      padding: "0% ",
    },
  });
  // const wrapContent = content
  return (
    <View style={style.container}>

    <View style={[style.cardContainer,style.boxWithShadow]}>
      
      <Image
        source={imageUrl}
        style={{
          width: "20%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      <View>
        <Text style={style.headingTextStyling}>
          {title.length > 18 ? title.substr(0, 22) + "..." : title}
        </Text>
        <Text style={style.contentTextStyling}>{content}</Text>
        <CustomButton
          title="View"
          onPress={() => navigation.navigate("FieldDetailScreen")}
          buttonStyle={style.customButtonStyle}
          textStyle={style.customTextStyle}
          />
      </View>
    </View>
          </View>
  );
}
