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
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
export default function FieldQuestions({ route }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const navigation = useNavigation();
  const { title, label } = route.params;

  useEffect(() => {
    const getQuestionSet = async () => {
      const role = title;
      const questionSet = label;

      try {
        const response = await fetch("http://192.168.18.5:5001/get_question_set", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role, question_set: questionSet }),
        });

        const data = await response.json();

        if (data) {
          // console.log("Result:", data);
          setResult(data);
        } else {
          console.error("Request failed.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getQuestionSet();
  }, []);

  if (loading || !result) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <BarIndicator color="#ffffff" />
      </View>
    );
  }

  const questionIds = Object.keys(result);

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
        <Text style={styles.heading}>{label}</Text>
        <ScrollView style={styles.tableContainer}>
        {[...new Set(questionIds.filter(id => id.startsWith('question')))].map((questionId) => (
          <Card key={questionId} style={styles.card}>
            <Card.Title
              title={result[`question${questionId.slice(8)}`]}
              subtitle={result[`answer${questionId.slice(8)}`]}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon={() => (
                    <FontAwesome
                      name="lightbulb-o"
                      size={wp("6%")}
                      color="white"
                    />
                  )}
                />
              )}
            />
            <Card.Actions>
              <Button
                onPress={() =>
                   navigation.navigate("ViewAnswer",{question:result[`question${questionId.slice(8)}`],answer:result[`answer${questionId.slice(8)}`]})
                }
              >
                View Complete Answer
              </Button>
            </Card.Actions>
          </Card>
        ))}

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
  heading: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    marginBottom: wp("3%"),
  },
  card: {
    marginBottom: wp("5%"),
  },
});
