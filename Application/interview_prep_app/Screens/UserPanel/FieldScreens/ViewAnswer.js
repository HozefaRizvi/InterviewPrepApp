import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Avatar, Card, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
export default function ViewAnswer({ route }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const navigation = useNavigation();
  const {question,answer} = route.params;

 

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
      <View style={styles.profileContainer}>
        <TouchableOpacity>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../../../Logos/questionlogo.png")}
              resizeMode="contain"
              style={styles.img}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.profileThings}>
        <Text style={styles.questionheading}>Question:</Text>
        <Text style={styles.question}>{question}?</Text>
        <Text style={styles.questionheading}>Answer:</Text>
        <ScrollView style={styles.tableContainer}>  
        <Text style={styles.answer}>{answer}</Text>
        </ScrollView>
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
  },
  profileThings: {
    width: "100%",
    flex: 2,
    marginTop: hp("2%"),
    backgroundColor: "#D0D9F2",
    borderTopStartRadius: wp("10%"),
    borderTopEndRadius: wp("10%"),
    padding: wp("5%"),
    height: hp("80%"),
  },
  tableContainer: {
    flex: 1,
  },
  questionheading: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    marginBottom: wp("2%"),
  },
  question: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginBottom: wp("2%"),
  },
  card: {
    marginBottom: wp("5%"),
  },
});
