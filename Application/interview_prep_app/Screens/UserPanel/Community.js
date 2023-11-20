import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

export default function Community() {
    return (
        <View style={styles.container}>
          <Text> Community Engagement</Text>
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