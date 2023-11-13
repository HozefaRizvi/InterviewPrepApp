import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import CustomButton from '../../CustomComponents/CustomButton';
import { TextInput } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export function SignInScreen({ navigation }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        resizeMode='contain'
        source={require('../../Logos/loginlogo.png')}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Sign In</Text>
        <TextInput
          label='Email'
          value={email}
          onChangeText={(text) => {
            setemail(text);
          }}
          mode='outlined'
          style={styles.input}
          theme={{
            colors: {
              primary: 'blue',
            },
          }}
        />
        <TextInput
          label='Password'
          value={password}
          onChangeText={(text) => {
            setpassword(text);
          }}
          mode='outlined'
          style={styles.input}
          theme={{
            colors: {
              primary: 'blue',
            },
          }}
        />
        <CustomButton
          title='Sign In'
          onPress={() => navigation.navigate('SetupProfile')}
          buttonStyle={styles.customButtonStyle}
          textStyle={styles.customTextStyle}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: wp('80%'),
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    alignSelf: 'flex-start',
    paddingLeft: wp('0%'),
    marginBottom: hp('2%'),
    fontWeight:'bold',
    color:'blue'
  },
  img: {
    width: wp('55%'),
    height: hp('26%'),
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: hp('2%'),
  },
  customButtonStyle: {
    backgroundColor: 'green',
    width: wp('80%'),
    marginBottom: hp('2%'),
  },
  customTextStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: hp('2%'),
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
  },
});
