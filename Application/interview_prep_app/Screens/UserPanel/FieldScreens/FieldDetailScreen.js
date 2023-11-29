import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SegmentedButtons } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
export default function FieldDetailScreen({ route }) {
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  const { title, content, imageUrl } = route.params;

  const handleSegmentPress = (selectedValue) => {
    switch (selectedValue) {
      case 'type1':
      case 'type2':
      case 'type3':
        navigation.navigate('FieldQuestions', {
          title: title,
          label: getLabelForValue(selectedValue),
        });
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  };

  const getLabelForValue = (value) => {
    switch (value) {
      case 'type1':
        return 'TechnicalQuestions';
      case 'type2':
        return 'SituationalQuestions';
      case 'type3':
        return 'BrainTeaserQuestions';
      default:
        return '';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
      <View style={styles.profileContainer}>
        <TouchableOpacity>
          <View style={styles.profileImageContainer}>
            <Image source={imageUrl} resizeMode="contain" style={styles.img} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.profileThings}>
        <View style={styles.tableContainer}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.description}>{content}</Text>
          <Text style={styles.label}>Type of Question:</Text>
          <SegmentedButtons
            value={value}
            onValueChange={(newValue) => {
              setValue(newValue);
              handleSegmentPress(newValue);
            }}
            buttons={[
              {
                value: 'type1',
                label: 'Technical',
                icon: () => <FontAwesome name="gear" size={wp("4%")} color="#526AF2" />,
              },
              {
                value: 'type2',
                label: 'Situational',
                icon: () => <FontAwesome name="users" size={wp("4%")} color="#526AF2" />,
              },
              {
                value: 'type3',
                label: 'Brain Teaser',
                icon: () => <FontAwesome name="lightbulb-o" size={wp("4%")} color="#526AF2" />,
              },
            ]}
            textStyle={{ fontSize: wp("3%") }}
            containerStyle={styles.segmentedContainer}
            activeButtonStyle={styles.activeButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#526AF2",
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
    marginTop: hp('13%'),
    width: wp("60%"),
    height: hp('20%'),
    borderRadius: wp("20%"), // Set borderRadius half of width to make it a circle
  },
  profileThings: {
    width: '100%',
    flex: 2,
    marginTop: hp('5%'),
    backgroundColor: '#ECEBF2',
    borderTopStartRadius: wp("10%"),
    borderTopEndRadius: wp("10%"),
    padding: wp("5%"),
    height: hp('80%'),
  },
  tableContainer: {
    flex: 1,
  },
  heading: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    marginBottom: wp("3%"),
  },
  description: {
    fontSize: wp("4%"),
    marginBottom: wp("3%"),
  },
  label: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    marginBottom: wp("3%"),
  },
  segmentedContainer: {
    backgroundColor: "#526AF2",
    borderRadius: wp("5%"),
    marginTop: wp("2%"),
  },
  activeButton: {
    backgroundColor: "#3F51B5", 
  }
});
