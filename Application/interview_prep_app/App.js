import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image ,Dimensions} from 'react-native';
import StackNavigation from './Navigations/StackNavigation';

export default function App() {
  return (
      <StackNavigation/>
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
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    padding: 10,
  },
 
});
