import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../../CustomComponents/CustomButton';
import { Button, Headline, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen()
 {
  const [notificationStatus, setNotificationStatus] = React.useState('on'); // 'on' or 'off'
  const navigation = useNavigation();
  const handleNotificationToggle = () => {
    setNotificationStatus((prevStatus) => (prevStatus === 'on' ? 'off' : 'on'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../Logos/settinglogo.png')} // Update the path accordingly
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.headline}>Settings</Text>

        <View style={styles.subSectionContainer}>
          <Text style={styles.subSectionHeading}>Customer Care</Text>
          <CustomButton
            title="Customer Care"
            onPress={()=>navigation.navigate('CustomerSupport')}
            buttonStyle={styles.customButton}
            textStyle={styles.customButtonText}
          />
        </View>

        <View style={styles.subSectionContainer}>
          <Text style={styles.subSectionHeading}>Notification</Text>
          
          <View style={styles.notificationContainer}>
          <RadioButton
              value="on"
              status={notificationStatus === 'on' ? 'checked' : 'unchecked'}
              onPress={handleNotificationToggle}
            />
            <Text>On</Text>
            <RadioButton
              value="off"
              status={notificationStatus === 'off' ? 'checked' : 'unchecked'}
              onPress={handleNotificationToggle}
            />
            <Text>Off</Text>
            </View>
        </View>

        <CustomButton
          title="Logout"
          onPress={() => navigation.navigate('SignInScreen')}
          buttonStyle={styles.logoutButton}
          textStyle={styles.customButtonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A68477',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: hp('5%'),
  },
  imageContainer: {
    borderBottomColor: '#cccccc',
    
    padding: 10,
  },
  image: {
    width: wp('50%'),
    height: hp('20%'),
  },
  sectionContainer: {
    width: '100%',
    flex:2,
    marginTop: hp('3%'),
    backgroundColor: '#FFF8F2',
    borderTopStartRadius: 25, 
    borderTopEndRadius:25,
    padding: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: hp('3%'),
  },
  subSectionContainer: {
    marginTop: hp('3%'),
  },
  subSectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  customButton: {
    backgroundColor: '#13678A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  customButtonSelected: {
    backgroundColor: '#4CAF50', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#2E5902',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
});
