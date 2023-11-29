import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
export function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    fadeInAnimation.start();

    const timeout = setTimeout(() => {
      navigation.navigate('SignInScreen');
    }, 5000);

    return () => {
      clearTimeout(timeout);
      fadeAnim.setValue(0);
    };
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.img, { opacity: fadeAnim }]}
        resizeMode="contain"
        source={require('../Logos/SplashScreenLogo.png')}
      />
      <Animated.Text style={[styles.heading, { opacity: fadeAnim }]}>Interview Prep App</Animated.Text>
      <Text style={styles.subHeading}>(For Software Engineering Graduates)</Text>
      <View style={styles.activity}>
        <Image source={require('../Logos/spinner2.gif')} style={{ width: 300, height: 150 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F598C', // Adjusted color
    marginTop: hp('3%'),
    fontFamily: 'sans-serif',
  },
  subHeading: {
    fontSize: 18,
    color: '#1F598C', // Adjusted color
  },
  img: {
    width: wp('75%'),
    height: hp('30%'),
  },
  activity: {
    marginTop: hp('5%'),
  },
});
