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
import { Card as PaperCard } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
export default function ViewUserContributedAnswer({ route }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const navigation = useNavigation();
  const {Question,Answer,Author,Comments} = route.params;

 

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
       <Text style={styles.questionheading}>Question:</Text>
       <Text style={styles.question}>{Question}?</Text>
       <Text style={styles.questionheading}>Author:</Text>
       <Text style={styles.question}>{Author}</Text>
       <Text style={styles.questionheading}>Answer:</Text>
       <Text style={styles.answer}>{Answer}</Text>
       <Text style={styles.questionheading}>Comments:</Text>
       <ScrollView>
       {Array.isArray(Comments) && Comments.length > 0 ? (
          Comments.map((comment, index) => (
            <PaperCard key={index} style={styles.commentCard}>
              <PaperCard.Content>
                <Text style={styles.commentHeading}>Comment By: {comment.commentby}</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>
              </PaperCard.Content>
            </PaperCard>
          ))
        ) : (
          <Text style={styles.answer}>No comments</Text>
        )}
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
    backgroundColor: "white",
    borderTopStartRadius: wp("10%"),
    borderTopEndRadius: wp("10%"),
    padding: wp("5%"),
    height: hp("80%"),
  },
  tableContainer: {
    
  
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
  commentCard: {
    marginVertical: wp('2%'),
  },
  commentText: {
    fontSize: wp('4%'),
  },
  commentHeading: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: wp('4%'),
  },
});
