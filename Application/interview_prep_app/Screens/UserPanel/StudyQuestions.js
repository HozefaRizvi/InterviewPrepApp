import React, { useContext,useState } from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity ,Image} from 'react-native';
import AuthContext from '../../ReactContext/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { FAB,TextInput,Provider,SegmentedButtons } from 'react-native-paper';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import CustomButton from '../../CustomComponents/CustomButton';
import  DropDown  from  'react-native-paper-dropdown';
export function StudyQuestionsScreen({navigation}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [value, setValue] = useState('');
  const [field, setfield] = useState();
  const [selectedSegmentLabel, setSelectedSegmentLabel] = useState('');
  const  fieldlist = [
  { label:  'CRM Project Manager', value:  'CRM Project Manager' },
  { label:  'Devops Engineer', value:  'Devops Engineer' },
  { label:  'Quality Assurance Engineer', value:  'Quality Assurance Engineer' },
  { label:  'Security Engineer', value:  'Security Engineer' },
  { label:  'Software Integration Engineer', value:  'Software Integration Engineer' },
  ];
  const handleSegmentPress = (selectedValue,selectedLabel) => {
    setValue(selectedValue);
    setSelectedSegmentLabel(selectedLabel);
  };
  const handleCheckUserContributions = () => {
    console.log(field,selectedSegmentLabel)
    navigation.navigate('UserContributionScreen', { field, value,selectedSegmentLabel });
  };
  const handlefabmethod = () => {
      navigation.navigate('Addquestion', { field, value,selectedSegmentLabel }); // Use the correct screen name here
  }
  return (
    <Provider>
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
    <View style={styles.profileContainer}>
      <TouchableOpacity>
        <View style={styles.profileImageContainer}>
          <Image source={require('../../Logos/studylogo2.png')} resizeMode="contain" style={styles.img} />
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.profileThings}>
      <View style={styles.tableContainer}>
         <Text style = {styles.heading}>User Contributions</Text>
         <Text style = {styles.subheading}>Choose Field</Text>
         <DropDown
            label={'Fields'}
            mode={'outlined'}
            value={field}
            setValue={setfield}
            list={fieldlist}
            visible={showDropDown}
            showDropDown={() =>  setShowDropDown(true)}
            onDismiss={() =>  setShowDropDown(false)}
            inputProps={{
            right:  <TextInput.Icon  name={'menu-down'}  />,
            }}
            />
         <Text style = {styles.subheading}>Choose Catogry</Text>
         <SegmentedButtons
            value={value}
            onValueChange={(newValue, newLabel) => {
              console.log('newLabel:', newLabel);
              setValue(newValue);
              setSelectedSegmentLabel(newLabel)
              handleSegmentPress(newValue, newLabel);
            }}
            buttons={[
              {
                value: 'TechnicalQuestions',
                label: 'TechnicalQuestions',
                icon: () => <FontAwesome name="gear" size={wp("4%")} color="#526AF2" />,
              },
              {
                value: 'SituationalQuestions',
                label: 'SituationalQuestions',
                icon: () => <FontAwesome name="users" size={wp("4%")} color="#526AF2" />,
              },
              {
                value: 'BrainTeaserQuestions',
                label: 'BrainTeaserQuestions',
                icon: () => <FontAwesome name="lightbulb-o" size={wp("4%")} color="#526AF2" />,
              },
            ]}
            textStyle={{ fontSize: wp("1%") }}
            containerStyle={styles.segmentedContainer}
            activeButtonStyle={styles.activeButton}
          />
              <CustomButton
              title="Check User Contributions"
              onPress={handleCheckUserContributions}
              buttonStyle={styles.customButtonStyle}
              textStyle={styles.customTextStyle}
            />
         <FAB
        style={styles.fab}
        icon="plus"
        onPress={handlefabmethod}
      />
      </View>
     
    </View>
     
  </ScrollView>
  </Provider>
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
    width: wp("40%"),
    height: hp('20%'),
    borderRadius: wp("20%"), // Set borderRadius half of width to make it a circle
  // Remove or reduce the marginBottom
     marginTop: hp('1%'),
  },
  profileThings: {
    width: '100%',
    flex: 2,
    marginBottom: hp('25%'), // Adjust this margin as needed
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
    borderRadius: wp("2%"),
    marginTop: wp("2%"),
   
  },
  activeButton: {
    backgroundColor: "#3F51B5", 
  },
    fab: {
   position:'absolute',
    margin: 16,
    padding:10,
    width: wp('20%'),
    borderRadius:20,
    marginTop:wp('110%'),
    marginLeft:wp('70%')
  },
  subheading:{
    fontSize: wp("6%"),
    fontWeight: "bold",
    marginBottom: wp("4%"),
    marginTop: wp("4%"),
  },
  customButtonStyle: {
    backgroundColor: "#526AF2",// #03c9d7
    width: wp("90%"),
    marginTop: hp("7%"),
    
  },
  customTextStyle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    
  },
  
});
