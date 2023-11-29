import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image ,Dimensions} from 'react-native';


export default function MockInterview() {
  return (
      <View style = {styles.container}> 
        <Text style = {styles.text}>
            Mock Interview Screen to be made...
        </Text>
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
  text: {
    
    borderBottomColor: '#cccccc',
    padding: 10,
  },
 
});
