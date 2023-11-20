import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image ,Dimensions} from 'react-native';

export  function StudyQuestionsScreen() {
  
  return (
    <View style={styles.container}>
      <Text>Study Questions Screen</Text>
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
  text: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    padding: 10,
  },
 
});
