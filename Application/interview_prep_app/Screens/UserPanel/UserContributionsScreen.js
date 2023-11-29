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
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {WaveIndicator} from 'react-native-indicators';
export default function UserContributionScreen({ route }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [questions, setQuestions] = useState([]);
  const {field,value,selectedSegmentLabel} = route.params
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://192.168.18.5:5001/get_userbased_questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ChoosenField: field,
                    ChoosenType: value,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setQuestions(data.questions);
            } else {
                console.error('Failed to fetch questions:', data.error_message);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [field, value]);
  const navigation = useNavigation();
  return(
    <ScrollView
    contentContainerStyle={styles.container}
    scrollEnabled={false}
  >
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
      <Text style={styles.heading}>User Contributions:</Text>
      {loading ? (
        <WaveIndicator color="#716FA6" size={80} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.questionContainer}
          scrollEnabled={true}
        >
          {questions.map((question, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
              <Text style={styles.cardTitle}>
                    Question {index + 1}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    Question: {question.Question.length > 10 ? `${question.Question.slice(0, 10)}...` : question.Question}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    Answer: {question.Answer.length > 10 ? `${question.Answer.slice(0, 10)}...` : question.Answer}
                  </Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() => navigation.navigate("ViewUserContributedAnswer",{Question: question.Question , Answer: question.Answer, Author: question.Author })}
                >
                  View Complete Answer
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      )}
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
  heading: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    marginBottom: wp("3%"),
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
});
