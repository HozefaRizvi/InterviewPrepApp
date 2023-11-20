import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FieldDetailScreen() {
  return (
        <View style={styles.container}>
          <Text>Field Related Data</Text>
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
