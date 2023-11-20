import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image ,ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export  function SplashScreen() {
  const navigation  = useNavigation()
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('SignInScreen'); 
    }, 5000); 

    return () => clearTimeout(timeout); 
  }, [navigation]);

  return (
    <View style={styles.container}>
        <Image
        style = {styles.img}
        resizeMode='contain'
        source={require('../Logos/SplashScreenLogo.png')}
        />
        <Text style = {styles.heading}>Interview Preparation Application</Text>
        <Text style = {styles.text}>(For Software Engineering Graduates)</Text>
        <ActivityIndicator size="medium" color="#1F598C" style ={styles.activity}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    padding: 5,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: hp("5"),
    fontFamily:'sans-serif'
  },
  text:{
    padding: 5,
    fontSize: 18,
    color: '#333',
  },
  img:{
    width: wp('75%'),
    height: hp('50%')
  },
  activity:{
    padding:20,
    marginBottom: hp('5')
  }
 
});
