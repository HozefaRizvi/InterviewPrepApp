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
  onPressButton
}) {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#eee",
    },
    cardContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: wp("5%"), // Adjust padding as needed
      marginBottom: hp("2%"), // Add margin to separate cards
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      position: "relative", // Set position to relative
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.10,
      shadowRadius: 6,
      elevation: 13,
    },
    headingTextStyling: {
      color: `${textColor}`,
      fontSize: 20,
      fontWeight: "600",
    },
    contentTextStyling: {
      marginTop: 5,
      color: `${textColor}`,
      fontSize: 10,
      width: "55%", // Adjust the width as needed
      flexWrap: "wrap",
    },
    btnView: {
      position: "absolute", // Set position to absolute
      bottom: 0,
      right: 0,
      color: "#1d4ed8",
      fontSize: 11,
      fontWeight: "600",
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
      width: wp("20%"),
      marginTop: wp("1%"),
      left:wp('40%')
    },
    customTextStyle: {
      color: "white",
      fontSize: 12,
      textAlign: "center",
      fontWeight: "600",
      padding: "0%",
    },
  });
  // const wrapContent = content
  const truncateText = (text, count) => {
    const words = text.split(' ');
    return words.slice(0, count).join(' ') + (words.length > count ? '...' : '');
  };

  return (
    <View style={style.container}>

    <View style={[style.cardContainer,style.boxWithShadow]}>
      
      <Image
        source={imageUrl}
        style={{
          width: "20%",
          height: "100%",
          objectFit: "contain",
          marginRight: wp("3%"), // Add margin to create space between image and text
        }}
      />
      <View>
        <Text style={style.headingTextStyling}>
          {title.length > 14 ? title.substr(0, 22) + "..." : title}
        </Text>
        <Text style={style.contentTextStyling} numberOfLines={2}>
        {truncateText(content, 10)}
          </Text>
        <CustomButton
          title="View"
          onPress={onPressButton}
          buttonStyle={style.customButtonStyle}
          textStyle={style.customTextStyle}
          />
      </View>
    </View>
          </View>
  );
}
