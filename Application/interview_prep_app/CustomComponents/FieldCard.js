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
      width: "100%",
      height: hp("40%"), // Set the card height
      backgroundColor: "#5E6EBF",
      borderRadius:20
    },
    cardContainer: {
      backgroundColor: "#c69939",
      borderRadius: 10,
      padding: wp("5%"), // Adjust padding as needed
      marginBottom: hp("2%"), // Add margin to separate cards
      alignItems: "center", // Center the contents horizontally
      width: "100%",
      height: hp("40%"), // Set the card height
      flexDirection: "column", // Set flexDirection to column
      justifyContent: "center", // Center the contents vertically
      position: "relative", // Set position to relative
      shadowColor: "#5E6EBF",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.10,
      shadowRadius: 6,
      elevation: 13,
      borderRadius:20
    },
    headingTextStyling: {
      color: `${textColor}`,
      fontSize: 25,
      fontWeight: "600",
      textAlign: "center", // Center the text
    },
    contentTextStyling: {
      marginTop: 5,
      color: `${textColor}`,
      fontSize: 10,
      width: "80%", // Adjust the width as needed
      textAlign: "center", // Center the text
      flexWrap: "wrap",
    },
    btnView: {
      position: "absolute", // Set position to absolute
      bottom: 0,
      color: "#202540",
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
      backgroundColor: "#18a1b4",
      width: wp("70%"),
      marginTop: wp("10%"),
    },
    customTextStyle: {
      color: "white",
      fontSize: 14,
      textAlign: "center",
      fontWeight: "600",
      padding: "2%",
    },
  });

  return (
    <View style={style.container}>
      <View style={[style.cardContainer, style.boxWithShadow]}>
        <Image
          source={imageUrl}
          style={{
            width: "40%", // Adjust the width as needed
            height: "30%", // Adjust the height as needed
            objectFit: "contain",
          }}
        />
        <View>
          <Text style={style.headingTextStyling}>
            {title}
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
